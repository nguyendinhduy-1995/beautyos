import { useState, useMemo } from 'react'
import { FiCalendar, FiSearch, FiCheckCircle, FiClock, FiUser, FiPhone, FiXCircle, FiEye, FiX, FiFilter, FiMessageSquare, FiSend, FiBell, FiDownload, FiPieChart } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialBookings = [
    { id: 'BK001', customer: 'Nguyễn Thị Hoa', phone: '0901234567', service: 'Nâng cơ Hifu', date: '28/02/2026', time: '09:00', status: 'confirmed', source: 'App', note: '' },
    { id: 'BK002', customer: 'Trần Minh Đức', phone: '0912345678', service: 'Chăm sóc da', date: '28/02/2026', time: '10:30', status: 'pending', source: 'Website', note: 'Lần đầu đến' },
    { id: 'BK003', customer: 'Lê Thị Lan', phone: '0923456789', service: 'Botox', date: '01/03/2026', time: '14:00', status: 'pending', source: 'App', note: 'Muốn BS Thọ' },
    { id: 'BK004', customer: 'Phạm Quốc Bảo', phone: '0934567890', service: 'Triệt lông', date: '01/03/2026', time: '15:30', status: 'confirmed', source: 'App', note: '' },
    { id: 'BK005', customer: 'Hoàng Thị Mai', phone: '0945678901', service: 'PRP', date: '02/03/2026', time: '09:00', status: 'cancelled', source: 'Website', note: 'Bận công việc' },
    { id: 'BK006', customer: 'Trần Thu Hà', phone: '0956789012', service: 'Filler', date: '02/03/2026', time: '11:00', status: 'pending', source: 'App', note: '' },
    { id: 'BK007', customer: 'Nguyễn Văn Minh', phone: '0967890123', service: 'Laser', date: '03/03/2026', time: '08:30', status: 'confirmed', source: 'Website', note: '' },
]

export default function MobileBooking() {
    const toast = useToast()
    const [data, setData] = useState(initialBookings)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [detailItem, setDetailItem] = useState(null)
    const [cancelId, setCancelId] = useState(null)

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(b => b.customer.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.service.toLowerCase().includes(q)) }
        if (statusFilter !== 'all') r = r.filter(b => b.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    const handleApprove = (id) => {
        setData(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b))
        toast.success('Đã xác nhận đặt lịch')
    }

    const handleApproveAll = () => {
        const pending = data.filter(b => b.status === 'pending')
        if (pending.length === 0) return toast.info('Không có lịch chờ duyệt')
        setData(prev => prev.map(b => b.status === 'pending' ? { ...b, status: 'confirmed' } : b))
        toast.success(`Đã duyệt ${pending.length} lịch hẹn`)
    }

    const handleCancel = () => {
        setData(prev => prev.map(b => b.id === cancelId ? { ...b, status: 'cancelled' } : b))
        toast.info('Đã hủy lịch hẹn')
        setCancelId(null)
    }

    const handleCall = (phone, name) => {
        toast.info(`Đang gọi ${name} (${phone})...`)
    }

    const handleSendReminder = (b) => {
        toast.success(`Đã gửi SMS nhắc lịch cho ${b.customer}`)
    }

    const handleSendAllReminders = () => {
        const upcoming = data.filter(b => b.status === 'confirmed')
        if (upcoming.length === 0) return toast.info('Không có lịch cần nhắc')
        toast.success(`Đã gửi ${upcoming.length} SMS nhắc lịch`)
    }

    const [dateFilter, setDateFilter] = useState('all')
    const today = '28/02/2026'
    const tomorrow = '01/03/2026'

    const dateFiltered = useMemo(() => {
        if (dateFilter === 'today') return filtered.filter(b => b.date === today)
        if (dateFilter === 'tomorrow') return filtered.filter(b => b.date === tomorrow)
        return filtered
    }, [filtered, dateFilter])

    /* Calendar mini — count bookings per date */
    const dateCounts = useMemo(() => {
        const map = {}
        data.forEach(b => { map[b.date] = (map[b.date] || 0) + 1 })
        return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]))
    }, [data])

    const pending = data.filter(b => b.status === 'pending').length
    const confirmed = data.filter(b => b.status === 'confirmed').length
    const cancelled = data.filter(b => b.status === 'cancelled').length
    const todayCount = data.filter(b => b.date === today).length

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!cancelId} title="Hủy đặt lịch?" message="Bạn có chắc chắn muốn hủy lịch hẹn này?"
                onConfirm={handleCancel} onCancel={() => setCancelId(null)} type="danger" />

            <div className="page-header">
                <div><h1 className="page-title">Đặt Lịch Online</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý lịch hẹn đặt từ App và Website</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = 'Mã,Khách hàng,SĐT,Dịch vụ,Ngày,Giờ,Nguồn,Trạng thái,Ghi chú\n' + data.map(b => `${b.id},${b.customer},${b.phone},${b.service},${b.date},${b.time},${b.source},${b.status},${b.note || ''}`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'dat-lich-online.csv'; a.click()
                        toast.success('Đã xuất CSV')
                    }}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-secondary" onClick={handleSendAllReminders} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiBell size={14} /> Nhắc lịch ({confirmed})</button>
                    <button className="btn btn-primary" onClick={handleApproveAll}><FiCheckCircle size={14} /> Duyệt tất cả ({pending})</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCalendar color="#1a73e8" /></div><div><div className="stat-label">Tổng đặt lịch</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chờ xác nhận</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">Đã xác nhận</div><div className="stat-value" style={{ color: '#28a745' }}>{confirmed}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiXCircle color="#dc3545" /></div><div><div className="stat-label">Đã hủy</div><div className="stat-value" style={{ color: '#dc3545' }}>{cancelled}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e8ff' }}><FiCalendar color="#7c3aed" /></div><div><div className="stat-label">Hôm nay</div><div className="stat-value" style={{ color: '#7c3aed' }}>{todayCount}</div></div></div>
            </div>

            {/* Source & Conversion Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Nguồn đặt lịch</div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {['App', 'Website'].map(src => {
                            const count = data.filter(b => b.source === src).length
                            const confirmedSrc = data.filter(b => b.source === src && b.status === 'confirmed').length
                            const colors = { App: '#1a73e8', Website: '#28a745' }
                            return (
                                <div key={src} style={{ flex: 1, padding: '12px', background: src === 'App' ? '#e3f2fd' : '#e8f5e9', borderRadius: '10px', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.3rem', color: colors[src] }}>{count}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>từ {src}</div>
                                    <div style={{ fontSize: '0.68rem', color: colors[src], marginTop: '4px' }}>{confirmedSrc} đã xác nhận</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiCheckCircle size={14} color="#28a745" /> Tỉ lệ chuyển đổi</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '80px', fontSize: '0.78rem' }}>Xác nhận</span>
                            <div style={{ flex: 1, height: '10px', background: '#e9ecef', borderRadius: '5px' }}>
                                <div style={{ width: `${data.length > 0 ? (confirmed / data.length) * 100 : 0}%`, height: '100%', borderRadius: '5px', background: '#28a745', transition: 'width 0.3s' }} />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#28a745' }}>{data.length > 0 ? Math.round(confirmed / data.length * 100) : 0}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '80px', fontSize: '0.78rem' }}>Hủy</span>
                            <div style={{ flex: 1, height: '10px', background: '#e9ecef', borderRadius: '5px' }}>
                                <div style={{ width: `${data.length > 0 ? (cancelled / data.length) * 100 : 0}%`, height: '100%', borderRadius: '5px', background: '#dc3545', transition: 'width 0.3s' }} />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#dc3545' }}>{data.length > 0 ? Math.round(cancelled / data.length * 100) : 0}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm đặt lịch..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {[{ key: 'all', label: 'Tất cả ngày' }, { key: 'today', label: 'Hôm nay' }, { key: 'tomorrow', label: 'Ngày mai' }].map(d => (
                        <button key={d.key} onClick={() => setDateFilter(d.key)}
                            className={`btn btn-sm ${dateFilter === d.key ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ fontSize: '0.78rem', padding: '5px 12px' }}>{d.label}</button>
                    ))}
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>

            {/* Mini Calendar Sidebar */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {dateCounts.map(([date, count]) => (
                    <button key={date} onClick={() => { setDateFilter('all'); setSearch(''); }}
                        style={{
                            padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--color-border)',
                            background: date === today ? 'var(--color-primary)' : 'white',
                            color: date === today ? 'white' : 'var(--color-text)',
                            cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.15s',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', minWidth: '70px'
                        }}>
                        <span>{date.substring(0, 5)}</span>
                        <span style={{ fontSize: '0.68rem', opacity: 0.7 }}>{count} lịch</span>
                    </button>
                ))}
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã</th><th>Khách hàng</th><th>SĐT</th><th>Dịch vụ</th><th>Ngày</th><th>Giờ</th><th>Nguồn</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {dateFiltered.length === 0 && <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy</td></tr>}
                        {dateFiltered.map(b => (
                            <tr key={b.id} style={{ background: b.status === 'pending' ? '#fffde7' : b.status === 'cancelled' ? '#fafafa' : 'transparent' }}>
                                <td style={{ fontWeight: 600 }}>{b.id}</td>
                                <td><FiUser size={12} style={{ marginRight: 4 }} />{b.customer}</td>
                                <td>{b.phone}</td>
                                <td>{b.service}</td>
                                <td>{b.date}</td>
                                <td style={{ fontWeight: 600 }}>{b.time}</td>
                                <td><span className="badge badge-processing">{b.source}</span></td>
                                <td>
                                    {b.status === 'confirmed' ? <span className="badge badge-success">✓ Xác nhận</span> :
                                        b.status === 'pending' ? <span className="badge badge-warning">⏳ Chờ</span> :
                                            <span className="badge badge-danger">✕ Hủy</span>}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn-icon" onClick={() => setDetailItem(b)} title="Xem"><FiEye size={14} /></button>
                                        <button className="btn-icon" onClick={() => handleCall(b.phone, b.customer)} title="Gọi"><FiPhone size={14} /></button>
                                        {b.status === 'confirmed' && <button className="btn-icon" onClick={() => handleSendReminder(b)} title="Nhắc lịch" style={{ color: '#7c3aed' }}><FiSend size={14} /></button>}
                                        {b.status === 'pending' && (
                                            <>
                                                <button className="btn btn-sm btn-primary" style={{ padding: '4px 10px', fontSize: '0.78rem' }} onClick={() => handleApprove(b.id)}><FiCheckCircle size={12} /> Duyệt</button>
                                                <button className="btn-icon" onClick={() => setCancelId(b.id)} title="Hủy"><FiXCircle size={14} color="#dc3545" /></button>
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>📋 Chi Tiết Đặt Lịch</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {[['Mã', detailItem.id], ['Khách hàng', detailItem.customer], ['SĐT', detailItem.phone], ['Dịch vụ', detailItem.service], ['Ngày', detailItem.date], ['Giờ', detailItem.time], ['Nguồn', detailItem.source], ['Ghi chú', detailItem.note || '—']].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Trạng thái</span>
                                    <span className={`badge badge-${detailItem.status === 'confirmed' ? 'success' : detailItem.status === 'pending' ? 'warning' : 'danger'}`}>
                                        {detailItem.status === 'confirmed' ? 'Đã xác nhận' : detailItem.status === 'pending' ? 'Chờ' : 'Đã hủy'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {detailItem.status === 'pending' && <button className="btn btn-primary" onClick={() => { handleApprove(detailItem.id); setDetailItem(null) }}><FiCheckCircle size={14} /> Duyệt</button>}
                            <button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
