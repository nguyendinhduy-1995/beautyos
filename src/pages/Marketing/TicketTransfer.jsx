import { useState, useMemo } from 'react'
import { FiRepeat, FiSearch, FiUser, FiArrowRight, FiCheck, FiX, FiPlus, FiEye, FiClock, FiCheckCircle } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialTransfers = [
    { id: 'CT001', date: '27/02/2026', ticket: 'TK-1234', customer: 'Nguyễn Thị Mai', phone: '0901234567', from: 'KTV Lan', to: 'KTV Trang', reason: 'Nhân viên nghỉ phép', status: 'done', note: '' },
    { id: 'CT002', date: '27/02/2026', ticket: 'TK-1250', customer: 'Trần Văn Hùng', phone: '0912345678', from: 'BS Công Vũ', to: 'BS Tuấn Anh', reason: 'Yêu cầu khách hàng', status: 'done', note: 'KH muốn đổi BS' },
    { id: 'CT003', date: '26/02/2026', ticket: 'TK-1189', customer: 'Lê Hoàng Anh', phone: '0923456789', from: 'KTV Mai', to: 'KTV Lan', reason: 'Chuyển ca', status: 'pending', note: '' },
    { id: 'CT004', date: '26/02/2026', ticket: 'TK-1201', customer: 'Phạm Thu Trang', phone: '0934567890', from: 'BS My', to: 'BS Hằng', reason: 'Chuyên môn phù hợp', status: 'done', note: '' },
    { id: 'CT005', date: '25/02/2026', ticket: 'TK-1178', customer: 'Kim Trang', phone: '0945678901', from: 'KTV Trang', to: 'KTV Mai', reason: 'Nhân viên nghỉ phép', status: 'pending', note: 'Chờ xác nhận KTV' },
    { id: 'CT006', date: '25/02/2026', ticket: 'TK-1165', customer: 'Hoàng Minh Tuệ', phone: '0956789012', from: 'BS Hằng', to: 'BS Công Vũ', reason: 'Lịch trùng', status: 'rejected', note: 'BS Công Vũ đã đầy lịch' },
]

export default function TicketTransfer() {
    const [data, setData] = useState(initialTransfers)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [detailItem, setDetailItem] = useState(null)
    const [rejectId, setRejectId] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(t => {
        const q = search.toLowerCase()
        const matchSearch = !search || t.customer.toLowerCase().includes(q) || t.ticket.includes(search) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q)
        const matchStatus = !statusFilter || t.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const pending = data.filter(t => t.status === 'pending').length
    const done = data.filter(t => t.status === 'done').length
    const rejected = data.filter(t => t.status === 'rejected').length

    const handleApprove = (id) => {
        setData(prev => prev.map(t => t.id === id ? { ...t, status: 'done' } : t))
        toast.success('Đã duyệt chuyển ticket')
    }

    const handleReject = () => {
        setData(prev => prev.map(t => t.id === rejectId ? { ...t, status: 'rejected' } : t))
        toast.info('Đã từ chối chuyển ticket')
        setRejectId(null)
    }

    const handleCreate = () => {
        const ticket = document.getElementById('ct-ticket')?.value?.trim()
        const customer = document.getElementById('ct-customer')?.value?.trim()
        const from = document.getElementById('ct-from')?.value?.trim()
        const to = document.getElementById('ct-to')?.value?.trim()
        const reason = document.getElementById('ct-reason')?.value?.trim()
        if (!ticket || !customer || !from || !to) return toast.warning('Vui lòng nhập đủ thông tin')
        const id = `CT${String(data.length + 1).padStart(3, '0')}`
        setData(prev => [...prev, { id, date: new Date().toLocaleDateString('vi-VN'), ticket, customer, phone: '', from, to, reason: reason || '', status: 'pending', note: '' }])
        setShowModal(false)
        toast.success('Đã tạo yêu cầu chuyển ticket')
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!rejectId} title="Từ chối chuyển?" message="Bạn có chắc muốn từ chối yêu cầu chuyển ticket này?"
                onConfirm={handleReject} onCancel={() => setRejectId(null)} type="danger" />

            <div className="page-header">
                <div>
                    <h1 className="page-title">Chuyển Ticket</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý chuyển ticket giữa các nhân viên</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo yêu cầu</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiRepeat color="#1a73e8" /></div><div><div className="stat-label">Tổng chuyển</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chờ duyệt</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">Hoàn thành</div><div className="stat-value" style={{ color: '#28a745' }}>{done}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiX color="#dc3545" /></div><div><div className="stat-label">Từ chối</div><div className="stat-value" style={{ color: '#dc3545' }}>{rejected}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm ticket, khách hàng, NV..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="pending">Chờ duyệt</option><option value="done">Hoàn thành</option><option value="rejected">Từ chối</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã</th><th>Ngày</th><th>Ticket</th><th>Khách hàng</th><th>Từ</th><th></th><th>Đến</th><th>Lý do</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 && <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy</td></tr>}
                        {filtered.map(t => (
                            <tr key={t.id} style={{ background: t.status === 'pending' ? '#fffde7' : t.status === 'rejected' ? '#fff5f5' : 'transparent' }}>
                                <td style={{ fontWeight: 600 }}>{t.id}</td>
                                <td>{t.date}</td>
                                <td><span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{t.ticket}</span></td>
                                <td><FiUser size={12} style={{ marginRight: 4 }} />{t.customer}</td>
                                <td>{t.from}</td>
                                <td><FiArrowRight color="var(--color-primary)" /></td>
                                <td style={{ fontWeight: 600 }}>{t.to}</td>
                                <td style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{t.reason}</td>
                                <td>
                                    <span className={`badge badge-${t.status === 'done' ? 'success' : t.status === 'pending' ? 'warning' : 'danger'}`}>
                                        {t.status === 'done' ? '✓ Hoàn thành' : t.status === 'pending' ? '⏳ Chờ duyệt' : '✕ Từ chối'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn-icon" onClick={() => setDetailItem(t)} title="Chi tiết"><FiEye size={14} /></button>
                                        {t.status === 'pending' && (
                                            <>
                                                <button className="btn btn-sm btn-primary" style={{ padding: '4px 10px', fontSize: '0.78rem' }} onClick={() => handleApprove(t.id)}><FiCheck size={12} /> Duyệt</button>
                                                <button className="btn-icon" onClick={() => setRejectId(t.id)} title="Từ chối"><FiX size={14} color="#dc3545" /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {detailItem && (
                <div className="modal-overlay" onClick={() => setDetailItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>📋 Chi Tiết Chuyển Ticket</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {[['Mã', detailItem.id], ['Ngày', detailItem.date], ['Ticket', detailItem.ticket], ['Khách hàng', detailItem.customer]].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Từ</div>
                                        <div style={{ fontWeight: 600, color: '#dc3545' }}>{detailItem.from}</div>
                                    </div>
                                    <FiArrowRight size={20} color="var(--color-primary)" />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Đến</div>
                                        <div style={{ fontWeight: 600, color: '#28a745' }}>{detailItem.to}</div>
                                    </div>
                                </div>
                                {[['Lý do', detailItem.reason], ['Ghi chú', detailItem.note || '—']].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Trạng thái</span>
                                    <span className={`badge badge-${detailItem.status === 'done' ? 'success' : detailItem.status === 'pending' ? 'warning' : 'danger'}`}>
                                        {detailItem.status === 'done' ? 'Hoàn thành' : detailItem.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {detailItem.status === 'pending' && <button className="btn btn-primary" onClick={() => { handleApprove(detailItem.id); setDetailItem(null) }}><FiCheck size={14} /> Duyệt</button>}
                            <button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>🔄 Tạo Yêu Cầu Chuyển</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Mã Ticket *</label><input id="ct-ticket" className="form-control" placeholder="VD: TK-1300" /></div>
                            <div className="form-group"><label>Khách hàng *</label><input id="ct-customer" className="form-control" placeholder="Tên khách hàng" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Từ NV *</label><input id="ct-from" className="form-control" placeholder="NV hiện tại" /></div>
                                <div className="form-group"><label>Đến NV *</label><input id="ct-to" className="form-control" placeholder="NV mới" /></div>
                            </div>
                            <div className="form-group"><label>Lý do</label><input id="ct-reason" className="form-control" placeholder="Lý do chuyển" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
