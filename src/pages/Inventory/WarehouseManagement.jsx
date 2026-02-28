import { useState, useMemo } from 'react'
import { FiSearch, FiFilter, FiRefreshCw, FiPlus, FiX, FiCheck, FiDownload, FiPackage, FiTrendingUp, FiTrendingDown, FiClock, FiAlertCircle } from 'react-icons/fi'
import { warehouseSlips as initialSlips, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function WarehouseManagement() {
    const [data, setData] = useState(initialSlips)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [confirm, setConfirm] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(s => {
        const matchSearch = s.id.toLowerCase().includes(search.toLowerCase()) || s.creator.toLowerCase().includes(search.toLowerCase())
        const matchType = !typeFilter || s.type === typeFilter
        return matchSearch && matchType
    }), [data, search, typeFilter])

    const importSlips = data.filter(s => s.type === 'Nhập')
    const exportSlips = data.filter(s => s.type === 'Xuất')
    const totalImport = importSlips.reduce((s, x) => s + (x.amount || 0), 0)
    const totalExport = exportSlips.reduce((s, x) => s + (x.amount || 0), 0)
    const pendingSlips = data.filter(s => s.status === 'Chờ duyệt')
    const approvedSlips = data.filter(s => s.status === 'Đã duyệt' || s.status === 'Đã xử lý')
    const [statusFilter, setStatusFilter] = useState('all')

    const finalFiltered = useMemo(() => {
        let r = filtered
        if (statusFilter !== 'all') r = r.filter(s => s.status === statusFilter)
        return r
    }, [filtered, statusFilter])

    const handleCreate = () => {
        const type = document.getElementById('slip-type')?.value
        const creator = document.getElementById('slip-creator')?.value?.trim()
        const amount = parseInt(document.getElementById('slip-amount')?.value) || 0
        if (!creator) return toast.warning('Vui lòng nhập người tạo')
        const newSlip = {
            id: `PK${String(data.length + 20).padStart(4, '0')}`,
            type, creator, amount, date: new Date().toLocaleDateString('vi-VN'),
            status: 'Chờ duyệt', tag: type === 'Nhập' ? 'Nhập kho' : 'Xuất kho'
        }
        setData(prev => [newSlip, ...prev])
        setShowModal(false)
        toast.success(`Đã tạo phiếu ${type.toLowerCase()} kho`)
    }

    const handleApprove = (id) => {
        setData(prev => prev.map(s => s.id === id ? { ...s, status: 'Đã duyệt' } : s))
        toast.success('Đã duyệt phiếu')
    }

    const handleExport = () => {
        const csv = 'Mã,Loại,Người tạo,Ngày,Số tiền,Trạng thái\n' + filtered.map(s => `${s.id},${s.type},${s.creator},${s.date},${s.amount || 0},${s.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'phieu-kho.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản Lý Kho</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Phiếu nhập kho, phiếu xuất kho</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Tạo phiếu</button>
                    <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiDownload size={14} /> Xuất CSV</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng phiếu</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiTrendingDown color="#28a745" /></div><div><div className="stat-label">Nhập kho</div><div className="stat-value" style={{ color: '#28a745' }}>{importSlips.length} — {formatCurrency(totalImport)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiTrendingUp color="#ff9800" /></div><div><div className="stat-label">Xuất kho</div><div className="stat-value" style={{ color: '#ff9800' }}>{exportSlips.length} — {formatCurrency(totalExport)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiClock color="#e91e63" /></div><div><div className="stat-label">Chờ duyệt</div><div className="stat-value" style={{ color: '#e91e63' }}>{pendingSlips.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiCheck color="#9c27b0" /></div><div><div className="stat-label">Đã duyệt</div><div className="stat-value" style={{ color: '#9c27b0' }}>{approvedSlips.length}</div></div></div>
            </div>

            {/* Pending Approvals + Import/Export Balance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {pendingSlips.length > 0 && (
                    <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiAlertCircle size={14} color="#e91e63" /> Phiếu chờ duyệt</div>
                        <div style={{ display: 'grid', gap: '6px' }}>
                            {pendingSlips.map(s => (
                                <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff5f5', borderRadius: '8px', border: '1px solid #ffcdd2' }}>
                                    <div>
                                        <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.82rem' }}>{s.id}</span>
                                        <span className={`badge badge-${s.type === 'Nhập' ? 'success' : 'warning'}`} style={{ fontSize: '0.68rem', marginLeft: '6px' }}>{s.type}</span>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{s.creator} · {s.date}</div>
                                    </div>
                                    <button className="btn btn-sm btn-primary" onClick={() => handleApprove(s.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCheck size={13} /> Duyệt</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', gridColumn: pendingSlips.length > 0 ? 'auto' : '1 / -1' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPackage size={14} color="var(--color-primary)" /> Cân đối nhập/xuất</div>
                    <div style={{ display: 'flex', height: '14px', borderRadius: '7px', overflow: 'hidden', marginBottom: '10px' }}>
                        <div style={{ width: `${totalImport + totalExport > 0 ? (totalImport / (totalImport + totalExport)) * 100 : 50}%`, background: '#28a745', transition: 'width 0.4s' }} title={`Nhập: ${formatCurrency(totalImport)}`} />
                        <div style={{ width: `${totalImport + totalExport > 0 ? (totalExport / (totalImport + totalExport)) * 100 : 50}%`, background: '#ff9800', transition: 'width 0.4s' }} title={`Xuất: ${formatCurrency(totalExport)}`} />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28a745' }} /><span>Nhập</span><span style={{ fontWeight: 600, color: '#28a745' }}>{formatCurrency(totalImport)}</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff9800' }} /><span>Xuất</span><span style={{ fontWeight: 600, color: '#ff9800' }}>{formatCurrency(totalExport)}</span></div>
                        <div style={{ marginLeft: 'auto', fontWeight: 700, color: totalImport >= totalExport ? '#28a745' : '#dc3545' }}>Chênh lệch: {formatCurrency(totalImport - totalExport)}</div>
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm mã phiếu, người tạo..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="">Tất cả loại</option>
                    <option value="Nhập">Nhập kho</option>
                    <option value="Xuất">Xuất kho</option>
                </select>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="Chờ duyệt">Chờ duyệt</option>
                    <option value="Đã duyệt">Đã duyệt</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                </select>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{finalFiltered.length} phiếu</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
                {finalFiltered.map(slip => (
                    <div key={slip.id} style={{ background: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseOut={e => e.currentTarget.style.background = 'white'}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontWeight: '600', color: 'var(--color-primary)', fontSize: '0.95rem' }}>{slip.id}</span>
                                {slip.tag && <span className={`badge badge-${slip.type === 'Nhập' ? 'success' : 'warning'}`} style={{ fontSize: '0.7rem' }}>{slip.tag}</span>}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{slip.creator} · {slip.date}</div>
                            {slip.amount > 0 && <div style={{ fontSize: '0.9rem', fontWeight: '600', marginTop: '4px' }}>{formatCurrency(slip.amount)}</div>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={`badge badge-${slip.status === 'Đã duyệt' || slip.status === 'Đã xử lý' ? 'success' : 'warning'}`}>{slip.status}</span>
                            {(slip.status === 'Chờ duyệt') && (
                                <button className="btn btn-sm btn-primary" onClick={() => handleApprove(slip.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <FiCheck size={13} /> Duyệt
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>Tạo Phiếu Kho</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Loại phiếu</label><select id="slip-type" className="form-control"><option value="Nhập">Nhập kho</option><option value="Xuất">Xuất kho</option></select></div>
                            <div className="form-group"><label>Người tạo *</label><input id="slip-creator" className="form-control" placeholder="Nhập tên" /></div>
                            <div className="form-group"><label>Giá trị (₫)</label><input id="slip-amount" type="number" className="form-control" placeholder="0" /></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button>
                            <button className="btn btn-primary" onClick={handleCreate}>Tạo phiếu</button>
                        </div>
                    </div>
                </div>
            )}

            {confirm && <ConfirmDialog isOpen={true} title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
        </div>
    )
}
