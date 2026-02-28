import { useState, useMemo } from 'react'
import { FiTag, FiSearch, FiX, FiPlus, FiToggleLeft, FiToggleRight, FiGift, FiPercent, FiCalendar, FiUsers, FiDownload, FiPieChart } from 'react-icons/fi'
import { promotions as initialPromotions } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function Promotions() {
    const toast = useToast()
    const [data, setData] = useState(initialPromotions)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [viewMode, setViewMode] = useState('card')
    const [showCreate, setShowCreate] = useState(false)
    const [form, setForm] = useState({ name: '', type: 'Giảm giá', value: '10%', appliesTo: 'Tất cả dịch vụ', startDate: '', endDate: '', maxUsage: 100 })
    const [typeFilter, setTypeFilter] = useState('all')

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) }
        if (statusFilter !== 'all') r = r.filter(p => p.status === statusFilter)
        if (typeFilter !== 'all') r = r.filter(p => p.type === typeFilter)
        return r
    }, [data, search, statusFilter, typeFilter])

    const handleCreate = () => {
        if (!form.name) return toast.warning('Nhập tên khuyến mãi')
        const id = `KM${String(data.length + 1).padStart(3, '0')}`
        setData(prev => [...prev, { id, ...form, usageCount: 0, status: 'active' }])
        toast.success(`Đã tạo khuyến mãi "${form.name}"`)
        setShowCreate(false); setForm({ name: '', type: 'Giảm giá', value: '10%', appliesTo: 'Tất cả dịch vụ', startDate: '', endDate: '', maxUsage: 100 })
    }

    const toggleStatus = (id) => {
        setData(prev => prev.map(p => {
            if (p.id !== id) return p
            const ns = p.status === 'active' ? 'expired' : 'active'
            toast.info(`${p.name} → ${ns === 'active' ? 'Hoạt động' : 'Tắt'}`)
            return { ...p, status: ns }
        }))
    }

    const typeConfig = {
        'Giảm giá': { color: '#e91e63', bg: '#fce4ec', icon: <FiPercent /> },
        'Tặng kèm': { color: '#9c27b0', bg: '#f3e5f5', icon: <FiGift /> },
        'Mua X tặng Y': { color: '#ff9800', bg: '#fff3e0', icon: <FiTag /> },
    }

    const activeCount = data.filter(p => p.status === 'active').length
    const totalUsage = data.reduce((s, p) => s + p.usageCount, 0)

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Khuyến Mãi</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý chương trình khuyến mãi & ưu đãi</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <button onClick={() => setViewMode('card')} style={{
                            padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem',
                            background: viewMode === 'card' ? 'var(--color-primary)' : 'white',
                            color: viewMode === 'card' ? 'white' : 'var(--color-text)'
                        }}>▦ Card</button>
                        <button onClick={() => setViewMode('table')} style={{
                            padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem',
                            background: viewMode === 'table' ? 'var(--color-primary)' : 'white',
                            color: viewMode === 'table' ? 'white' : 'var(--color-text)'
                        }}>☰ Table</button>
                    </div>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = 'Mã,Tên,Loại,Giá trị,Áp dụng,Bắt đầu,Kết thúc,Đã dùng,Giới hạn,Trạng thái\n' + data.map(p => `${p.id},${p.name},${p.type},${p.value},${p.appliesTo},${p.startDate},${p.endDate},${p.usageCount},${p.maxUsage},${p.status}`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'khuyen-mai.csv'; a.click()
                        toast.success('Đã xuất file CSV')
                    }}><FiDownload size={14} /> Xuất dữ liệu</button>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><FiPlus size={14} /> Tạo khuyến mãi</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiTag color="#28a745" /></div><div><div className="stat-label">Đang hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{activeCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiTag color="#dc3545" /></div><div><div className="stat-label">Đã hết hạn</div><div className="stat-value" style={{ color: '#dc3545' }}>{data.length - activeCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiUsers color="#1a73e8" /></div><div><div className="stat-label">Tổng lượt dùng</div><div className="stat-value">{totalUsage}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiGift color="#9c27b0" /></div><div><div className="stat-label">Tổng KM</div><div className="stat-value">{data.length}</div></div></div>
            </div>

            {/* Type Distribution Analytics */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Phân bố loại khuyến mãi</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    {Object.entries(typeConfig).map(([type, cfg]) => {
                        const count = data.filter(p => p.type === type).length
                        const activeOfType = data.filter(p => p.type === type && p.status === 'active').length
                        return (
                            <div key={type} style={{ flex: 1, padding: '12px', background: cfg.bg, borderRadius: '10px', textAlign: 'center', cursor: 'pointer', border: typeFilter === type ? `2px solid ${cfg.color}` : '2px solid transparent', transition: 'border 0.2s' }} onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}>
                                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{cfg.icon}</div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: cfg.color }}>{count}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{type}</div>
                                <div style={{ fontSize: '0.68rem', color: cfg.color, marginTop: '4px' }}>{activeOfType} hoạt động</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm khuyến mãi..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option><option value="active">Hoạt động</option><option value="expired">Hết hạn</option>
                </select>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">Tất cả loại</option><option value="Giảm giá">Giảm giá</option><option value="Tặng kèm">Tặng kèm</option><option value="Mua X tặng Y">Mua X tặng Y</option>
                </select>
                {(typeFilter !== 'all' || statusFilter !== 'all') && <button className="btn btn-secondary" onClick={() => { setTypeFilter('all'); setStatusFilter('all') }} style={{ fontSize: '0.82rem' }}><FiX size={12} /> Xoá lọc</button>}
            </div>

            {viewMode === 'card' ? (
                /* CARD VIEW */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                    {filtered.map(p => {
                        const cfg = typeConfig[p.type] || typeConfig['Giảm giá']
                        const usagePercent = p.maxUsage ? (p.usageCount / p.maxUsage) * 100 : 0
                        return (
                            <div key={p.id} style={{
                                background: 'white', borderRadius: '12px', overflow: 'hidden',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)',
                                opacity: p.status === 'expired' ? 0.65 : 1, transition: 'all 0.2s'
                            }}
                                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                                onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
                                {/* Color header strip */}
                                <div style={{ height: '4px', background: cfg.color }} />
                                <div style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginBottom: '2px' }}>{p.id}</div>
                                            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{p.name}</div>
                                        </div>
                                        {/* Discount badge */}
                                        <div style={{
                                            background: cfg.bg, color: cfg.color, padding: '6px 12px',
                                            borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem',
                                            display: 'flex', alignItems: 'center', gap: '4px'
                                        }}>
                                            {cfg.icon} {p.value}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: cfg.bg, color: cfg.color }}>{p.type}</span>
                                        <span className={`badge badge-${p.status === 'active' ? 'success' : 'danger'}`} style={{ fontSize: '0.72rem' }}>
                                            {p.status === 'active' ? '● Hoạt động' : '○ Hết hạn'}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                                        <div style={{ marginBottom: '2px' }}>📋 {p.appliesTo}</div>
                                        <div><FiCalendar size={11} style={{ marginRight: '4px' }} />{p.startDate} → {p.endDate}</div>
                                    </div>

                                    {/* Usage progress */}
                                    <div style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>
                                            <span>Đã dùng: {p.usageCount}/{p.maxUsage}</span>
                                            <span>{Math.round(usagePercent)}%</span>
                                        </div>
                                        <div style={{ height: '6px', background: '#e9ecef', borderRadius: '3px' }}>
                                            <div style={{ width: `${usagePercent}%`, height: '100%', borderRadius: '3px', background: usagePercent > 80 ? '#dc3545' : usagePercent > 50 ? '#ff9800' : '#28a745', transition: 'width 0.3s' }} />
                                        </div>
                                    </div>

                                    {/* Toggle */}
                                    <button className={`btn btn-sm ${p.status === 'active' ? 'btn-secondary' : 'btn-primary'}`}
                                        onClick={() => toggleStatus(p.id)}
                                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                        {p.status === 'active' ? <><FiToggleRight size={14} color="#28a745" /> Đang bật</> : <><FiToggleLeft size={14} /> Đã tắt</>}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                /* TABLE VIEW */
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th>Mã</th><th>Tên</th><th>Loại</th><th>Giá trị</th><th>Áp dụng</th><th>Bắt đầu</th><th>Kết thúc</th><th>Đã dùng</th><th>Giới hạn</th><th>TT</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id} style={{ opacity: p.status === 'expired' ? 0.6 : 1 }}>
                                    <td>{p.id}</td>
                                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                                    <td><span className="badge badge-info">{p.type}</span></td>
                                    <td style={{ fontWeight: 700, color: '#e91e63' }}>{p.value}</td>
                                    <td>{p.appliesTo}</td>
                                    <td>{p.startDate}</td>
                                    <td>{p.endDate}</td>
                                    <td>{p.usageCount}</td>
                                    <td>{p.maxUsage}</td>
                                    <td><span className={`badge badge-${p.status === 'active' ? 'success' : 'danger'}`}>{p.status === 'active' ? 'Hoạt động' : 'Hết hạn'}</span></td>
                                    <td><button className="btn btn-sm btn-secondary" onClick={() => toggleStatus(p.id)}>{p.status === 'active' ? <FiToggleRight size={14} color="#28a745" /> : <FiToggleLeft size={14} />}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Modal */}
            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>🎁 Tạo khuyến mãi mới</h2><button className="btn-close" onClick={() => setShowCreate(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên khuyến mãi *</label><input type="text" className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="VD: Giảm 20% dịch vụ facial" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Loại</label><select className="form-control" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}><option>Giảm giá</option><option>Tặng kèm</option><option>Mua X tặng Y</option></select></div>
                                <div className="form-group"><label>Giá trị</label><input type="text" className="form-control" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} placeholder="10%, 50k..." /></div>
                            </div>
                            <div className="form-group"><label>Áp dụng cho</label><input type="text" className="form-control" value={form.appliesTo} onChange={e => setForm(p => ({ ...p, appliesTo: e.target.value }))} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Bắt đầu</label><input type="date" className="form-control" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} /></div>
                                <div className="form-group"><label>Kết thúc</label><input type="date" className="form-control" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} /></div>
                            </div>
                            <div className="form-group"><label>Giới hạn sử dụng</label><input type="number" className="form-control" value={form.maxUsage} onChange={e => setForm(p => ({ ...p, maxUsage: Number(e.target.value) }))} /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Hủy</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
