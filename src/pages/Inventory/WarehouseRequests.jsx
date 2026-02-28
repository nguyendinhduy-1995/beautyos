import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiCheck, FiClock, FiPackage, FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import { formatCurrency } from '../../data/mockData'

const initialRequests = [
    { id: 'YC001', type: 'Nhập từ NCC', requester: 'Thu Hà', date: '27/02/2026', status: 'pending', items: [{ name: 'Serum Vitamin C', qty: 20, unit: 'chai', price: 150000 }, { name: 'Kem dưỡng', qty: 10, unit: 'hộp', price: 250000 }], note: 'Cần gấp trong tuần này' },
    { id: 'YC002', type: 'Chuyển kho', requester: 'Minh Anh', date: '26/02/2026', status: 'approved', items: [{ name: 'Gel rửa mặt', qty: 30, unit: 'chai', price: 80000 }], note: 'Chuyển từ CN1 sang CN2' },
    { id: 'YC003', type: 'Nhập từ NCC', requester: 'Thanh Tùng', date: '25/02/2026', status: 'completed', items: [{ name: 'Mặt nạ collagen', qty: 50, unit: 'gói', price: 35000 }, { name: 'Toner', qty: 15, unit: 'chai', price: 120000 }, { name: 'Bông tẩy trang', qty: 100, unit: 'gói', price: 15000 }], note: '' },
    { id: 'YC004', type: 'Chuyển kho', requester: 'Phương Linh', date: '24/02/2026', status: 'rejected', items: [{ name: 'Kim tiêm Botox', qty: 100, unit: 'cái', price: 25000 }], note: 'Kho CN2 đã đủ hàng' },
    { id: 'YC005', type: 'Nhập từ NCC', requester: 'Thu Hà', date: '23/02/2026', status: 'pending', items: [{ name: 'Filler HA', qty: 10, unit: 'ống', price: 800000 }, { name: 'Lidocaine cream', qty: 20, unit: 'tuýp', price: 95000 }], note: 'NCC Galaxy Med' },
]

export default function WarehouseRequests() {
    const [data, setData] = useState(initialRequests)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [expanded, setExpanded] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(r => {
        const q = search.toLowerCase()
        const matchSearch = !search || r.id.toLowerCase().includes(q) || r.requester.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)
        const matchStatus = !statusFilter || r.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const pending = data.filter(r => r.status === 'pending').length
    const approved = data.filter(r => r.status === 'approved').length
    const completed = data.filter(r => r.status === 'completed').length

    const handleApprove = (id) => {
        setData(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
        toast.success('Đã duyệt phiếu yêu cầu')
    }

    const handleReject = (id) => {
        setData(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
        toast.warning('Đã từ chối phiếu')
    }

    const handleCreate = () => {
        const type = document.getElementById('req-type')?.value
        const note = document.getElementById('req-note')?.value?.trim()
        const newReq = {
            id: `YC${String(data.length + 1).padStart(3, '0')}`,
            type, requester: 'Admin', date: new Date().toLocaleDateString('vi-VN'),
            status: 'pending', items: [{ name: 'Sản phẩm mới', qty: 1, unit: 'cái', price: 100000 }], note: note || ''
        }
        setData(prev => [newReq, ...prev])
        setShowModal(false)
        toast.success('Đã tạo phiếu yêu cầu')
    }

    const statusLabel = { pending: 'Chờ duyệt', approved: 'Đã duyệt', completed: 'Hoàn thành', rejected: 'Từ chối' }
    const statusBadge = { pending: 'warning', approved: 'info', completed: 'success', rejected: 'danger' }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Phiếu Yêu Cầu</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý phiếu yêu cầu nhập kho, chuyển kho</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Tạo phiếu</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng phiếu</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chờ duyệt</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCheck color="#1a73e8" /></div><div><div className="stat-label">Đã duyệt</div><div className="stat-value" style={{ color: '#1a73e8' }}>{approved}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Hoàn thành</div><div className="stat-value" style={{ color: '#28a745' }}>{completed}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã, người tạo..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="pending">Chờ duyệt</option><option value="approved">Đã duyệt</option><option value="completed">Hoàn thành</option><option value="rejected">Từ chối</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map(r => {
                    const totalAmount = r.items.reduce((s, it) => s + it.qty * it.price, 0)
                    const isExpanded = expanded === r.id
                    return (
                        <div key={r.id} style={{
                            background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'all 0.2s',
                            borderLeft: `4px solid ${r.status === 'pending' ? '#ff9800' : r.status === 'approved' ? '#1a73e8' : r.status === 'completed' ? '#28a745' : '#dc3545'}`
                        }}>
                            <div className="mobile-row" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => setExpanded(isExpanded ? null : r.id)}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{r.id}</span>
                                            <span className={`badge badge-${r.type === 'Nhập từ NCC' ? 'success' : 'info'}`} style={{ fontSize: '0.7rem' }}>{r.type}</span>
                                            <span className={`badge badge-${statusBadge[r.status]}`}>{statusLabel[r.status]}</span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{r.requester} · {r.date} · {r.items.length} sản phẩm · {formatCurrency(totalAmount)}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {r.status === 'pending' && (
                                        <>
                                            <button className="btn btn-sm btn-primary" onClick={e => { e.stopPropagation(); handleApprove(r.id) }} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCheck size={13} /> Duyệt</button>
                                            <button className="btn btn-sm btn-secondary" onClick={e => { e.stopPropagation(); handleReject(r.id) }} style={{ color: '#dc3545' }}><FiX size={13} /></button>
                                        </>
                                    )}
                                    {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </div>
                            </div>
                            {isExpanded && (
                                <div style={{ borderTop: '1px solid var(--color-border)', padding: '16px 20px', background: '#f8f9fa' }}>
                                    <table className="data-table" style={{ fontSize: '0.85rem' }}>
                                        <thead><tr><th>Sản phẩm</th><th>SL</th><th>ĐVT</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead>
                                        <tbody>
                                            {r.items.map((it, j) => (
                                                <tr key={j}><td style={{ fontWeight: '500' }}>{it.name}</td><td>{it.qty}</td><td>{it.unit}</td><td>{formatCurrency(it.price)}</td><td style={{ fontWeight: '600' }}>{formatCurrency(it.qty * it.price)}</td></tr>
                                            ))}
                                            <tr style={{ fontWeight: '700' }}><td colSpan={4} style={{ textAlign: 'right' }}>Tổng:</td><td>{formatCurrency(totalAmount)}</td></tr>
                                        </tbody>
                                    </table>
                                    {r.note && <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>📝 {r.note}</div>}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>Tạo Phiếu Yêu Cầu</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Loại phiếu</label><select id="req-type" className="form-control"><option>Nhập từ NCC</option><option>Chuyển kho</option></select></div>
                            <div className="form-group"><label>Ghi chú</label><textarea id="req-note" className="form-control" rows={3} placeholder="Ghi chú..." /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
