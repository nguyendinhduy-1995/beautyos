import { useState, useMemo } from 'react'
import { FiFilter, FiSearch, FiTag, FiCalendar, FiUser, FiClock, FiX, FiPlus, FiMessageSquare } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialTickets = [
    { id: 'TK-1290', customer: 'Nguyễn Thị Mai', phone: '0901234567', tags: ['VIP', 'Facebook'], service: 'Nâng cơ Hifu', status: 'open', date: '27/02/2026', staff: 'KTV Lan', note: 'KH hỏi về gói combo', priority: 'high' },
    { id: 'TK-1285', customer: 'Trần Văn Hùng', phone: '0912345678', tags: ['Mới', 'Zalo'], service: 'Botox', status: 'processing', date: '27/02/2026', staff: 'BS Công Vũ', note: 'Đã tư vấn, chờ phản hồi', priority: 'medium' },
    { id: 'TK-1280', customer: 'Lê Hoàng Anh', phone: '0923456789', tags: ['Tiềm năng'], service: 'Triệt lông Laser', status: 'open', date: '26/02/2026', staff: 'KTV Trang', note: '', priority: 'low' },
    { id: 'TK-1275', customer: 'Phạm Thu Trang', phone: '0934567890', tags: ['VIP', 'Giới thiệu'], service: 'PRP trẻ hoá', status: 'closed', date: '26/02/2026', staff: 'BS My', note: 'Đã đặt lịch hẹn', priority: 'high' },
    { id: 'TK-1270', customer: 'Kim Trang', phone: '0945678901', tags: ['Facebook', 'Quan tâm Hifu'], service: 'Chăm sóc da', status: 'open', date: '25/02/2026', staff: 'KTV Mai', note: 'Inbox hỏi giá', priority: 'medium' },
    { id: 'TK-1265', customer: 'Hoàng Minh Tú', phone: '0956789012', tags: ['Zalo', 'Tiềm năng'], service: 'Trị nám', status: 'processing', date: '25/02/2026', staff: 'BS Công Vũ', note: 'Gửi hình ảnh tham khảo', priority: 'low' },
]

const tagColors = { VIP: '#e74c3c', 'Mới': '#27ae60', 'Tiềm năng': '#f39c12', 'Facebook': '#3498db', Zalo: '#198754', 'Giới thiệu': '#1abc9c', 'Quan tâm Hifu': '#8e44ad' }
const priConfig = { high: { label: '🔴 Cao', color: '#dc3545' }, medium: { label: '🟡 TB', color: '#ff9800' }, low: { label: '🟢 Thấp', color: '#28a745' } }

export default function TicketFilter() {
    const [data, setData] = useState(initialTickets)
    const [search, setSearch] = useState('')
    const [tagFilter, setTagFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [priFilter, setPriFilter] = useState('all')
    const [selectedId, setSelectedId] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(t =>
        (tagFilter === 'all' || t.tags.includes(tagFilter)) &&
        (statusFilter === 'all' || t.status === statusFilter) &&
        (priFilter === 'all' || t.priority === priFilter) &&
        (t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search))
    ), [data, search, tagFilter, statusFilter, priFilter])

    const selected = data.find(t => t.id === selectedId)
    const open = data.filter(t => t.status === 'open').length
    const processing = data.filter(t => t.status === 'processing').length
    const closed = data.filter(t => t.status === 'closed').length

    const handleStatusChange = (id, newStatus) => {
        setData(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
        toast.success('Đã cập nhật trạng thái')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Lọc & Quản Lý Ticket</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Tìm kiếm, lọc và xử lý ticket theo nhiều tiêu chí</p></div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiMessageSquare color="#1a73e8" /></div><div><div className="stat-label">Tổng ticket</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiClock color="#28a745" /></div><div><div className="stat-label">Đang mở</div><div className="stat-value" style={{ color: '#28a745' }}>{open}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiFilter color="#ff9800" /></div><div><div className="stat-label">Đang xử lý</div><div className="stat-value" style={{ color: '#ff9800' }}>{processing}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiTag color="#9c27b0" /></div><div><div className="stat-label">Đã đóng</div><div className="stat-value" style={{ color: '#9c27b0' }}>{closed}</div></div></div>
            </div>

            {/* Multi-filter bar */}
            <div className="filter-bar" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
                <div className="search-box" style={{ flex: 1, minWidth: '250px', maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm ticket, khách hàng..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
                    <option value="all">Tất cả tag</option>
                    {Object.keys(tagColors).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả TT</option><option value="open">Mở</option><option value="processing">Đang XL</option><option value="closed">Đã đóng</option>
                </select>
                <select className="filter-select" value={priFilter} onChange={e => setPriFilter(e.target.value)}>
                    <option value="all">Ưu tiên</option><option value="high">Cao</option><option value="medium">Trung bình</option><option value="low">Thấp</option>
                </select>
                {(tagFilter !== 'all' || statusFilter !== 'all' || priFilter !== 'all' || search) && (
                    <button className="btn btn-sm btn-secondary" onClick={() => { setTagFilter('all'); setStatusFilter('all'); setPriFilter('all'); setSearch('') }}><FiX size={12} /> Xóa bộ lọc</button>
                )}
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Table */}
                <div style={{ flex: 1 }}>
                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Mã</th><th>Khách hàng</th><th>Tags</th><th>Dịch vụ</th><th>ƯT</th><th>Trạng thái</th><th>Ngày</th><th>NV</th></tr></thead>
                            <tbody>
                                {filtered.map(t => {
                                    const pri = priConfig[t.priority]
                                    return (
                                        <tr key={t.id} onClick={() => setSelectedId(t.id)}
                                            style={{ cursor: 'pointer', background: selectedId === t.id ? '#f0f7ff' : t.priority === 'high' && t.status !== 'closed' ? '#fff8f8' : undefined }}>
                                            <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{t.id}</td>
                                            <td>
                                                <div style={{ fontWeight: '500' }}>{t.customer}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{t.phone}</div>
                                            </td>
                                            <td><div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>{t.tags.map(tag => <span key={tag} style={{ background: (tagColors[tag] || '#999') + '20', color: tagColors[tag] || '#999', padding: '1px 6px', borderRadius: '8px', fontSize: '0.68rem', fontWeight: 600 }}>{tag}</span>)}</div></td>
                                            <td style={{ fontSize: '0.82rem' }}>{t.service}</td>
                                            <td><span style={{ color: pri.color, fontSize: '0.75rem', fontWeight: '600' }}>{pri.label}</span></td>
                                            <td>
                                                {t.status === 'open' ? <span className="badge badge-success">Mở</span>
                                                    : t.status === 'processing' ? <span className="badge badge-warning">Đang XL</span>
                                                        : <span className="badge badge-secondary">Đã đóng</span>}
                                            </td>
                                            <td style={{ fontSize: '0.82rem' }}>{t.date}</td>
                                            <td style={{ fontSize: '0.82rem' }}>{t.staff}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail panel */}
                {selected && (
                    <div style={{ width: '300px', background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px', alignSelf: 'flex-start', flexShrink: 0 }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '0.95rem', margin: 0 }}>{selected.id}</h3>
                            <button className="btn-icon" onClick={() => setSelectedId(null)}><FiX size={14} /></button>
                        </div>
                        {[
                            { label: 'Khách hàng', value: selected.customer },
                            { label: 'SĐT', value: selected.phone },
                            { label: 'Dịch vụ', value: selected.service },
                            { label: 'Nhân viên', value: selected.staff },
                            { label: 'Ngày tạo', value: selected.date },
                        ].map((info, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.82rem' }}>
                                <span style={{ color: 'var(--color-text-light)' }}>{info.label}</span>
                                <span style={{ fontWeight: '500' }}>{info.value}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>Tags</div>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {selected.tags.map(tag => <span key={tag} style={{ background: (tagColors[tag] || '#999') + '20', color: tagColors[tag] || '#999', padding: '3px 8px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 600 }}>{tag}</span>)}
                            </div>
                        </div>
                        {selected.note && (
                            <div style={{ marginTop: '10px', padding: '8px', background: '#f8f9fa', borderRadius: '6px', fontSize: '0.78rem' }}>📝 {selected.note}</div>
                        )}
                        <div style={{ marginTop: '12px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '6px' }}>Chuyển trạng thái</div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {['open', 'processing', 'closed'].map(s => (
                                    <button key={s} className={`btn btn-sm ${selected.status === s ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={() => handleStatusChange(selected.id, s)}>
                                        {s === 'open' ? 'Mở' : s === 'processing' ? 'Xử lý' : 'Đóng'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
