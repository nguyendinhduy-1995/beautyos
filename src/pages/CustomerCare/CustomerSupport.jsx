import { useState, useMemo } from 'react'
import { FiSearch, FiPhone, FiMessageSquare, FiUser, FiClock, FiPlus, FiX, FiAlertTriangle, FiCheckCircle, FiEye, FiBarChart2, FiDownload, FiActivity } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialTickets = [
    { id: 'CS001', customer: 'Nguyễn Thị Mai', phone: '0901234567', issue: 'Hỏi về lịch hẹn kế tiếp', channel: 'Zalo', priority: 'normal', status: 'resolved', date: '27/02/2026', staff: 'KTV Lan', note: 'Đã tư vấn lịch hẹn tuần tới', responseTime: 1.5, satisfaction: 5 },
    { id: 'CS002', customer: 'Trần Văn Hùng', phone: '0912345678', issue: 'Muốn đổi dịch vụ', channel: 'Phone', priority: 'high', status: 'open', date: '27/02/2026', staff: 'KTV Trang', note: '', responseTime: null, satisfaction: null },
    { id: 'CS003', customer: 'Lê Hoàng Anh', phone: '0923456789', issue: 'Phản ứng sau điều trị', channel: 'Phone', priority: 'urgent', status: 'open', date: '27/02/2026', staff: 'BS Công Vũ', note: 'Khách bị đỏ nhẹ vùng điều trị', responseTime: null, satisfaction: null },
    { id: 'CS004', customer: 'Phạm Thu Trang', phone: '0934567890', issue: 'Hỏi về khuyến mãi', channel: 'Facebook', priority: 'low', status: 'resolved', date: '26/02/2026', staff: 'KTV Lan', note: 'Đã gửi thông tin combo tháng 3', responseTime: 3, satisfaction: 4 },
    { id: 'CS005', customer: 'Kim Trang', phone: '0945678901', issue: 'Yêu cầu hoàn tiền thẻ', channel: 'Zalo', priority: 'high', status: 'processing', date: '26/02/2026', staff: 'Admin', note: 'Đang chờ duyệt từ quản lý', responseTime: 2, satisfaction: null },
    { id: 'CS006', customer: 'Hoàng Minh Tuệ', phone: '0956789012', issue: 'Không hài lòng kết quả', channel: 'Phone', priority: 'urgent', status: 'processing', date: '26/02/2026', staff: 'BS My', note: '', responseTime: 0.5, satisfaction: null },
    { id: 'CS007', customer: 'Đặng Thị Hoa', phone: '0967890123', issue: 'Đặt lịch tái khám', channel: 'Zalo', priority: 'normal', status: 'resolved', date: '25/02/2026', staff: 'KTV Trang', note: 'Đã đặt lịch 01/03', responseTime: 4, satisfaction: 5 },
    { id: 'CS008', customer: 'Vũ Ngọc', phone: '0100018552', issue: 'Hỏi về combo dịch vụ tháng 3', channel: 'Email', priority: 'low', status: 'resolved', date: '25/02/2026', staff: 'KTV Lan', note: 'Đã gửi brochure qua email', responseTime: 6, satisfaction: 4 },
]

const priorityConfig = {
    urgent: { label: 'Khẩn cấp', color: '#dc3545', bg: '#ffebee' },
    high: { label: 'Cao', color: '#ff9800', bg: '#fff3e0' },
    normal: { label: 'Bình thường', color: '#1a73e8', bg: '#e3f2fd' },
    low: { label: 'Thấp', color: '#28a745', bg: '#e8f5e9' },
}

const statusConfig = {
    open: { label: 'Mở', color: '#ff9800', badge: 'warning' },
    processing: { label: 'Đang xử lý', color: '#1a73e8', badge: 'info' },
    resolved: { label: 'Đã giải quyết', color: '#28a745', badge: 'success' },
}

export default function CustomerSupport() {
    const [data, setData] = useState(initialTickets)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [priorityFilter, setPriorityFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [showDetail, setShowDetail] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(t =>
        (statusFilter === 'all' || t.status === statusFilter) &&
        (priorityFilter === 'all' || t.priority === priorityFilter) &&
        (t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search) || t.issue.toLowerCase().includes(search.toLowerCase()))
    ), [data, search, statusFilter, priorityFilter])

    const openCount = data.filter(t => t.status === 'open').length
    const processingCount = data.filter(t => t.status === 'processing').length
    const resolvedCount = data.filter(t => t.status === 'resolved').length
    const urgentCount = data.filter(t => t.priority === 'urgent' && t.status !== 'resolved').length

    const responded = data.filter(t => t.responseTime !== null)
    const avgResponseTime = responded.length > 0 ? (responded.reduce((s, t) => s + t.responseTime, 0) / responded.length).toFixed(1) : '—'
    const slaTarget = 4 // hours
    const withinSLA = responded.filter(t => t.responseTime <= slaTarget).length
    const slaRate = responded.length > 0 ? Math.round((withinSLA / responded.length) * 100) : 0

    /* Channel distribution */
    const channels = useMemo(() => {
        const map = {}
        data.forEach(t => { map[t.channel] = (map[t.channel] || 0) + 1 })
        return Object.entries(map).sort((a, b) => b[1] - a[1])
    }, [data])
    const channelColors = { Zalo: '#0068ff', Phone: '#28a745', Facebook: '#1877f2', Email: '#ff9800' }

    const handleExportTickets = () => toast.success('Đã xuất danh sách ticket')

    const handleCall = (t) => toast.info(`📞 Đang gọi ${t.customer} (${t.phone})...`)
    const handleSms = (t) => toast.info(`💬 Gửi tin nhắn cho ${t.customer}`)

    const handleStatusChange = (id, newStatus) => {
        setData(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
        const labels = { open: 'Mở', processing: 'Đang xử lý', resolved: 'Đã giải quyết' }
        toast.success(`Chuyển trạng thái → ${labels[newStatus]}`)
    }

    const handleCreate = () => {
        const customer = document.getElementById('cs-customer')?.value?.trim()
        const phone = document.getElementById('cs-phone')?.value?.trim()
        const issue = document.getElementById('cs-issue')?.value?.trim()
        const channel = document.getElementById('cs-channel')?.value || 'Phone'
        const priority = document.getElementById('cs-priority')?.value || 'normal'
        if (!customer || !issue) return toast.warning('Nhập đầy đủ thông tin')
        const newTicket = {
            id: `CS${String(data.length + 1).padStart(3, '0')}`,
            customer, phone: phone || '', issue, channel, priority,
            status: 'open', date: new Date().toLocaleDateString('vi-VN'),
            staff: 'Admin', note: ''
        }
        setData(prev => [newTicket, ...prev])
        setShowModal(false)
        toast.success('Đã tạo ticket hỗ trợ mới')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Chăm Sóc Khách Hàng</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý ticket hỗ trợ khách hàng</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExportTickets} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiDownload size={14} /> Xuất</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo ticket</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #ff9800' }}>
                    <div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div>
                    <div><div className="stat-label">Đang mở</div><div className="stat-value" style={{ color: '#ff9800' }}>{openCount}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #1a73e8' }}>
                    <div className="stat-icon" style={{ background: '#e3f2fd' }}><FiMessageSquare color="#1a73e8" /></div>
                    <div><div className="stat-label">Đang xử lý</div><div className="stat-value" style={{ color: '#1a73e8' }}>{processingCount}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #28a745' }}>
                    <div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div>
                    <div><div className="stat-label">Đã giải quyết</div><div className="stat-value" style={{ color: '#28a745' }}>{resolvedCount}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #dc3545' }}>
                    <div className="stat-icon" style={{ background: '#ffebee' }}><FiAlertTriangle color="#dc3545" /></div>
                    <div><div className="stat-label">Khẩn cấp</div><div className="stat-value" style={{ color: '#dc3545' }}>{urgentCount}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #7c3aed' }}>
                    <div className="stat-icon" style={{ background: '#f3e8ff' }}><FiActivity color="#7c3aed" /></div>
                    <div><div className="stat-label">TB phản hồi</div><div className="stat-value" style={{ color: '#7c3aed' }}>{avgResponseTime}h</div></div>
                </div>
            </div>

            {/* SLA + Channel Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* SLA Indicator */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><FiActivity size={14} color="var(--color-primary)" /> SLA Compliance</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: slaRate >= 80 ? '#28a745' : slaRate >= 50 ? '#ff9800' : '#dc3545' }}>{slaRate}%</span>
                    </div>
                    <div style={{ height: '10px', background: '#e9ecef', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${slaRate}%`, height: '100%', borderRadius: '5px', background: slaRate >= 80 ? '#28a745' : slaRate >= 50 ? '#ff9800' : '#dc3545', transition: 'width 0.5s ease' }} />
                    </div>
                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                        <span>{withinSLA}/{responded.length} trong SLA ({slaTarget}h)</span>
                        <span>Mục tiêu: ≥ 80%</span>
                    </div>
                </div>
                {/* Channel Distribution */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiBarChart2 size={14} color="var(--color-primary)" /> Phân bố kênh</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {channels.map(([ch, count]) => (
                            <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '60px', fontSize: '0.78rem', fontWeight: 500 }}>{ch}</span>
                                <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                    <div style={{ width: `${(count / data.length) * 100}%`, height: '100%', borderRadius: '4px', background: channelColors[ch] || '#999' }} />
                                </div>
                                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', minWidth: '20px', textAlign: 'right' }}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input className="search-input" placeholder="Tìm ticket, khách hàng..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="open">Đang mở</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="resolved">Đã giải quyết</option>
                </select>
                <select className="filter-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                    <option value="all">Tất cả ưu tiên</option>
                    <option value="urgent">Khẩn cấp</option>
                    <option value="high">Cao</option>
                    <option value="normal">Bình thường</option>
                    <option value="low">Thấp</option>
                </select>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{filtered.length} ticket</span>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã</th><th>Khách hàng</th><th>Vấn đề</th><th>Kênh</th><th>Ưu tiên</th><th>Trạng thái</th><th>Ngày</th><th>NV</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.map(t => {
                            const pc = priorityConfig[t.priority]
                            const sc = statusConfig[t.status]
                            return (
                                <tr key={t.id} style={{ background: t.priority === 'urgent' && t.status !== 'resolved' ? '#fff5f5' : 'transparent' }}>
                                    <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{t.id}</td>
                                    <td><div style={{ fontWeight: 500 }}><FiUser size={12} style={{ marginRight: 4 }} />{t.customer}</div><div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{t.phone}</div></td>
                                    <td style={{ maxWidth: '200px' }}>{t.issue}</td>
                                    <td><span style={{ background: '#f0f0f0', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{t.channel}</span></td>
                                    <td><span style={{ background: pc.bg, color: pc.color, padding: '2px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{pc.label}</span></td>
                                    <td>
                                        <select value={t.status} onChange={e => handleStatusChange(t.id, e.target.value)} style={{ border: 'none', background: 'transparent', color: sc.color, fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
                                            <option value="open">⬤ Mở</option>
                                            <option value="processing">⬤ Đang XL</option>
                                            <option value="resolved">⬤ Đã XQ</option>
                                        </select>
                                    </td>
                                    <td style={{ fontSize: '0.82rem' }}>{t.date}</td>
                                    <td>{t.staff}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleCall(t)} title="Gọi"><FiPhone size={12} /></button>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleSms(t)} title="Nhắn"><FiMessageSquare size={12} /></button>
                                            <button className="btn btn-sm btn-secondary" onClick={() => setShowDetail(t)} title="Chi tiết"><FiEye size={12} /></button>
                                        </div>
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>Tạo Ticket Hỗ Trợ</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Khách hàng *</label><input id="cs-customer" className="form-control" placeholder="Tên khách hàng" /></div>
                            <div className="form-group"><label>SĐT</label><input id="cs-phone" className="form-control" placeholder="Số điện thoại" /></div>
                            <div className="form-group"><label>Vấn đề *</label><textarea id="cs-issue" className="form-control" placeholder="Mô tả vấn đề..." rows="3" style={{ resize: 'vertical' }} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group">
                                    <label>Kênh</label>
                                    <select id="cs-channel" className="form-control"><option>Phone</option><option>Zalo</option><option>Facebook</option><option>Email</option></select>
                                </div>
                                <div className="form-group">
                                    <label>Ưu tiên</label>
                                    <select id="cs-priority" className="form-control"><option value="normal">Bình thường</option><option value="low">Thấp</option><option value="high">Cao</option><option value="urgent">Khẩn cấp</option></select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo ticket</button></div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetail && (
                <div className="modal-overlay" onClick={() => setShowDetail(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>Chi Tiết Ticket {showDetail.id}</h2><button className="btn-close" onClick={() => setShowDetail(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>Khách hàng</div>
                                    <div style={{ fontWeight: 600 }}>{showDetail.customer}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)' }}>{showDetail.phone}</div>
                                </div>
                                <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>Thông tin</div>
                                    <div><span style={{ background: priorityConfig[showDetail.priority].bg, color: priorityConfig[showDetail.priority].color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{priorityConfig[showDetail.priority].label}</span></div>
                                    <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>Kênh: {showDetail.channel} · {showDetail.date}</div>
                                </div>
                            </div>
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>Vấn đề</div>
                                <div style={{ fontWeight: 500 }}>{showDetail.issue}</div>
                            </div>
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '12px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>Ghi chú xử lý</div>
                                <div>{showDetail.note || 'Chưa có ghi chú'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button className="btn btn-secondary" onClick={() => handleCall(showDetail)}><FiPhone size={14} /> Gọi</button>
                                <button className="btn btn-secondary" onClick={() => handleSms(showDetail)}><FiMessageSquare size={14} /> Nhắn</button>
                                {showDetail.status !== 'resolved' && (
                                    <button className="btn btn-primary" onClick={() => { handleStatusChange(showDetail.id, 'resolved'); setShowDetail(prev => ({ ...prev, status: 'resolved' })) }}><FiCheckCircle size={14} /> Đã giải quyết</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
