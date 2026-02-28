import { useState, useMemo } from 'react'
import { FiUsers, FiDollarSign, FiAward, FiSearch, FiPlus, FiX, FiDownload, FiTrash2, FiToggleLeft, FiToggleRight, FiTrendingUp, FiStar } from 'react-icons/fi'
import { referrers as initialReferrers, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const tiers = [
    { name: 'Bạch Kim', min: 20, color: '#6366f1', bg: '#eef2ff', icon: '💎' },
    { name: 'Vàng', min: 10, color: '#f59e0b', bg: '#fffbeb', icon: '🥇' },
    { name: 'Bạc', min: 5, color: '#6b7280', bg: '#f3f4f6', icon: '🥈' },
    { name: 'Đồng', min: 0, color: '#b45309', bg: '#fef3c7', icon: '🥉' },
]

function getTier(count) {
    return tiers.find(t => count >= t.min) || tiers[tiers.length - 1]
}

export default function Referrers() {
    const [data, setData] = useState(initialReferrers)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [confirm, setConfirm] = useState(null)
    const [sortBy, setSortBy] = useState('referredCount')
    const toast = useToast()

    const filtered = useMemo(() => {
        let r = data.filter(ref => {
            const matchSearch = ref.name.toLowerCase().includes(search.toLowerCase()) || ref.phone.includes(search)
            const matchStatus = !statusFilter || ref.status === statusFilter
            return matchSearch && matchStatus
        })
        r.sort((a, b) => b[sortBy] - a[sortBy])
        return r
    }, [data, search, statusFilter, sortBy])

    const totalReferred = data.reduce((s, r) => s + r.referredCount, 0)
    const totalRevenue = data.reduce((s, r) => s + r.totalRevenue, 0)
    const totalCommission = data.reduce((s, r) => s + r.commission, 0)
    const avgRate = totalRevenue > 0 ? ((totalCommission / totalRevenue) * 100).toFixed(1) : 0

    const handleCreate = () => {
        const name = document.getElementById('ref-name')?.value?.trim()
        const phone = document.getElementById('ref-phone')?.value?.trim()
        const rate = parseInt(document.getElementById('ref-rate')?.value) || 5
        if (!name || !phone) return toast.warning('Vui lòng nhập đầy đủ thông tin')
        const newRef = {
            id: `REF${String(data.length + 1).padStart(3, '0')}`,
            name, phone, referredCount: 0, totalRevenue: 0, commission: 0, commissionRate: rate, status: 'active'
        }
        setData(prev => [newRef, ...prev])
        setShowModal(false)
        toast.success(`Đã thêm "${name}" thành công`)
    }

    const handleToggle = (id) => {
        setData(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r))
        toast.info('Đã cập nhật trạng thái')
    }

    const handleDelete = (id) => {
        setConfirm({
            title: 'Xoá người giới thiệu',
            message: 'Bạn có chắc muốn xoá người giới thiệu này?',
            onConfirm: () => { setData(prev => prev.filter(r => r.id !== id)); setConfirm(null); toast.success('Đã xoá') }
        })
    }

    const handleExport = () => {
        const csv = 'Tên,SĐT,Hạng,Số KH,Doanh thu,Hoa hồng,TT\n' + filtered.map(r => `${r.name},${r.phone},${getTier(r.referredCount).name},${r.referredCount},${r.totalRevenue},${r.commission},${r.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'nguoi-gioi-thieu.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Người Giới Thiệu</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Chương trình giới thiệu khách hàng & hoa hồng</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Thêm mới</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiUsers color="#28a745" /></div><div><div className="stat-label">Người GT</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiUsers color="#1a73e8" /></div><div><div className="stat-label">KH được GT</div><div className="stat-value">{totalReferred}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiDollarSign color="#ff9800" /></div><div><div className="stat-label">Doanh thu GT</div><div className="stat-value" style={{ fontSize: '0.95rem', color: '#1a73e8' }}>{formatCurrency(totalRevenue)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiAward color="#e91e63" /></div><div><div className="stat-label">Tổng hoa hồng</div><div className="stat-value" style={{ fontSize: '0.95rem', color: '#e91e63' }}>{formatCurrency(totalCommission)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiTrendingUp color="#9c27b0" /></div><div><div className="stat-label">Tỷ lệ HH</div><div className="stat-value" style={{ color: '#9c27b0' }}>{avgRate}%</div></div></div>
            </div>

            {/* Tier Distribution + Top Performer */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiAward size={14} color="#f59e0b" /> Phân bố hạng</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {tiers.map(t => {
                            const count = data.filter(r => getTier(r.referredCount).name === t.name).length
                            return (
                                <div key={t.name} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: '10px', background: t.bg }}>
                                    <div style={{ fontSize: '1.3rem' }}>{t.icon}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: t.color }}>{count}</div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>{t.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #fbbf24' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiStar size={14} color="#f59e0b" /> Top Performer</div>
                    {(() => {
                        const top = [...data].sort((a, b) => b.referredCount - a.referredCount)[0]
                        if (!top) return null
                        const tier = getTier(top.referredCount)
                        return (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: tier.bg, border: `3px solid ${tier.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏆</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{top.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{top.referredCount} khách • {formatCurrency(top.totalRevenue)} doanh thu</div>
                                    <div style={{ fontSize: '0.78rem', color: '#28a745', fontWeight: 600 }}>Hoa hồng: {formatCurrency(top.commission)}</div>
                                </div>
                                <span style={{ padding: '4px 12px', borderRadius: '12px', background: tier.bg, color: tier.color, fontWeight: 600, fontSize: '0.78rem' }}>{tier.icon} {tier.name}</span>
                            </div>
                        )
                    })()}
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '400px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="active">Hoạt động</option><option value="inactive">Ngưng</option>
                </select>
                <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="referredCount">Theo số KH</option>
                    <option value="totalRevenue">Theo doanh thu</option>
                    <option value="commission">Theo hoa hồng</option>
                </select>
            </div>

            {/* Table with ranking */}
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr><th>#</th><th>Hạng</th><th>Tên</th><th>SĐT</th><th>Số KH</th><th>Doanh thu</th><th>Hoa hồng</th><th>Trạng thái</th><th></th></tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => {
                            const tier = getTier(r.referredCount)
                            return (
                                <tr key={r.id} style={{ opacity: r.status === 'inactive' ? 0.6 : 1 }}>
                                    <td style={{ fontWeight: i < 3 ? '700' : '400', color: i === 0 ? '#f59e0b' : i === 1 ? '#6b7280' : i === 2 ? '#b45309' : 'inherit', fontSize: i < 3 ? '1rem' : '0.85rem' }}>
                                        {i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
                                    </td>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                                            padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600',
                                            background: tier.bg, color: tier.color
                                        }}>
                                            {tier.icon} {tier.name}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '600' }}>
                                        <div>{r.name}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{r.id}</div>
                                    </td>
                                    <td><span style={{ color: 'var(--color-primary)' }}>{r.phone}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontWeight: '700', fontSize: '1rem' }}>{r.referredCount}</span>
                                            <div style={{ width: '50px', height: '6px', background: '#e9ecef', borderRadius: '3px' }}>
                                                <div style={{ width: `${Math.min(r.referredCount / 30 * 100, 100)}%`, height: '100%', borderRadius: '3px', background: tier.color }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{formatCurrency(r.totalRevenue)}</td>
                                    <td style={{ color: '#28a745', fontWeight: '600' }}>{formatCurrency(r.commission)}</td>
                                    <td>
                                        <span className={`badge badge-${r.status === 'active' ? 'success' : 'secondary'}`} style={{ cursor: 'pointer' }} onClick={() => handleToggle(r.id)}>
                                            {r.status === 'active' ? <><FiToggleRight size={12} /> Hoạt động</> : <><FiToggleLeft size={12} /> Ngưng</>}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-secondary" title="Xoá" onClick={() => handleDelete(r.id)}><FiTrash2 size={13} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>👤 Thêm Người Giới Thiệu</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Họ tên *</label><input id="ref-name" className="form-control" placeholder="Nhập họ tên" /></div>
                            <div className="form-group"><label>Số điện thoại *</label><input id="ref-phone" className="form-control" placeholder="Nhập SĐT" /></div>
                            <div className="form-group"><label>Tỷ lệ hoa hồng (%)</label><input id="ref-rate" type="number" className="form-control" placeholder="5" defaultValue="5" /></div>
                            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                                <strong>Hệ thống hạng:</strong> Đồng (0-4 KH) → Bạc (5-9 KH) → Vàng (10-19 KH) → Bạch Kim (20+ KH)
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Thêm</button></div>
                    </div>
                </div>
            )}

            {confirm && <ConfirmDialog isOpen={true} title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
        </div>
    )
}
