import { useState, useMemo } from 'react'
import { FiSearch, FiDownload, FiRefreshCw, FiCheckCircle, FiAlertCircle, FiClock, FiStar, FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const smsStatusData = customers.slice(0, 10).map((c, i) => ({
    id: i + 1, name: c.name, phone: c.phone,
    content: 'Kính chào Quý Khách. Nhắc nhở lịch hẹn ngày 28/02/2026. Xin cảm ơn!',
    sentAt: `27/02/2026 ${10 + i}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    deliveredAt: i < 7 ? `27/02/2026 ${10 + i}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : null,
    status: i < 7 ? 'delivered' : i < 9 ? 'pending' : 'failed',
    provider: i % 2 === 0 ? 'VIETTEL' : 'VNPT', cost: 350,
    rating: i < 5 ? (i < 3 ? 5 : 4) : i < 7 ? 3 : null,
    feedback: i === 0 ? 'Rất hài lòng, dịch vụ tốt' : i === 1 ? 'Nhân viên thân thiện' : i === 3 ? 'Bình thường' : ''
}))

export default function SMSStatus() {
    const [data, setData] = useState(smsStatusData)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [activeTab, setActiveTab] = useState('status')
    const toast = useToast()

    const filtered = useMemo(() => data.filter(s => {
        const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search)
        const matchStatus = !statusFilter || s.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const delivered = data.filter(s => s.status === 'delivered').length
    const pending = data.filter(s => s.status === 'pending').length
    const failed = data.filter(s => s.status === 'failed').length
    const totalCost = data.length * 350
    const rated = data.filter(s => s.rating).length
    const avgRating = rated > 0 ? (data.filter(s => s.rating).reduce((sum, s) => sum + s.rating, 0) / rated).toFixed(1) : '—'

    const handleRetry = (id) => {
        setData(prev => prev.map(s => s.id === id ? { ...s, status: 'delivered', deliveredAt: 'Vừa xong' } : s))
        toast.success('Đã gửi lại thành công')
    }

    const handleExport = () => toast.success('Đã xuất CSV')

    // Status breakdown percentages
    const deliveredPct = data.length > 0 ? Math.round((delivered / data.length) * 100) : 0
    const pendingPct = data.length > 0 ? Math.round((pending / data.length) * 100) : 0
    const failedPct = data.length > 0 ? Math.round((failed / data.length) * 100) : 0

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Trạng Thái Gửi SMS</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Theo dõi trạng thái gửi tin nhắn và đánh giá</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất CSV</button>
            </div>

            {/* Tabs: Trạng thái / Đánh giá */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[
                    { key: 'status', label: 'Trạng thái gửi', icon: <FiCheckCircle size={14} /> },
                    { key: 'rating', label: 'Tình trạng đánh giá', icon: <FiStar size={14} /> }
                ].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiClock color="#1a73e8" /></div><div><div className="stat-label">Tổng tin</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">Đã gửi</div><div className="stat-value" style={{ color: '#28a745' }}>{delivered}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Đang chờ</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiAlertCircle color="#dc3545" /></div><div><div className="stat-label">Thất bại</div><div className="stat-value" style={{ color: '#dc3545' }}>{failed}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff8e1' }}><FiStar color="#ffc107" /></div><div><div className="stat-label">TB đánh giá</div><div className="stat-value" style={{ color: '#ffc107' }}>{avgRating} ⭐</div></div></div>
            </div>

            {/* Status breakdown chart */}
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '16px 20px', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>Tỷ lệ gửi tin</h4>
                <div style={{ height: '28px', borderRadius: '8px', overflow: 'hidden', display: 'flex', background: '#f0f0f0' }}>
                    <div style={{ width: `${deliveredPct}%`, background: 'linear-gradient(90deg, #28a745, #34d058)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, transition: 'width 0.5s' }}>
                        {deliveredPct > 10 && `${deliveredPct}%`}
                    </div>
                    <div style={{ width: `${pendingPct}%`, background: '#ff9800', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, transition: 'width 0.5s' }}>
                        {pendingPct > 10 && `${pendingPct}%`}
                    </div>
                    <div style={{ width: `${failedPct}%`, background: '#dc3545', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, transition: 'width 0.5s' }}>
                        {failedPct > 10 && `${failedPct}%`}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px', fontSize: '0.8rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#28a745' }} /> Đã gửi ({deliveredPct}%)</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#ff9800' }} /> Đang chờ ({pendingPct}%)</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#dc3545' }} /> Thất bại ({failedPct}%)</span>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option>
                    <option value="delivered">Đã gửi</option>
                    <option value="pending">Đang chờ</option>
                    <option value="failed">Thất bại</option>
                </select>
                <span style={{ marginLeft: 'auto', fontWeight: '600', fontSize: '0.9rem' }}>Chi phí: {totalCost.toLocaleString()}₫</span>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th><th>Khách hàng</th><th>SĐT</th><th>Nội dung</th><th>Nhà mạng</th>
                            <th>Gửi lúc</th><th>Nhận lúc</th><th>Trạng thái</th>
                            {activeTab === 'rating' && <th>Đánh giá</th>}
                            {activeTab === 'rating' && <th>Phản hồi</th>}
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s, i) => (
                            <tr key={s.id} style={{ background: s.status === 'failed' ? '#fff5f5' : s.status === 'pending' ? '#fffbeb' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{s.name}</td>
                                <td>{s.phone}</td>
                                <td style={{ maxWidth: '250px', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{s.content}</td>
                                <td><span className="badge badge-info">{s.provider}</span></td>
                                <td style={{ fontSize: '0.8rem' }}>{s.sentAt}</td>
                                <td style={{ fontSize: '0.8rem' }}>{s.deliveredAt || '—'}</td>
                                <td>
                                    <span className={`badge badge-${s.status === 'delivered' ? 'success' : s.status === 'pending' ? 'warning' : 'danger'}`}>
                                        {s.status === 'delivered' ? 'Đã gửi' : s.status === 'pending' ? 'Đang chờ' : 'Thất bại'}
                                    </span>
                                </td>
                                {activeTab === 'rating' && (
                                    <td>
                                        {s.rating ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <FiStar key={star} size={14}
                                                        fill={star <= s.rating ? '#ffc107' : 'none'}
                                                        color={star <= s.rating ? '#ffc107' : '#ddd'} />
                                                ))}
                                            </div>
                                        ) : <span style={{ color: '#ccc', fontSize: '0.78rem' }}>Chưa đánh giá</span>}
                                    </td>
                                )}
                                {activeTab === 'rating' && (
                                    <td style={{ maxWidth: '180px', fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                                        {s.feedback || '—'}
                                    </td>
                                )}
                                <td>
                                    {s.status === 'failed' && (
                                        <button className="btn btn-sm btn-primary" onClick={() => handleRetry(s.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <FiRefreshCw size={13} /> Gửi lại
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
