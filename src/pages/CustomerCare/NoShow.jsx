import { useState, useMemo } from 'react'
import { FiPhone, FiSearch, FiX, FiCalendar, FiAlertCircle, FiDownload, FiPieChart, FiRefreshCw } from 'react-icons/fi'
import { appointments } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function NoShow() {
    const { addToast } = useToast()
    const [search, setSearch] = useState('')
    const [reasonFilter, setReasonFilter] = useState('all')
    const [rescheduleId, setRescheduleId] = useState(null)
    const [rescheduleDate, setRescheduleDate] = useState('')
    const [data, setData] = useState(() =>
        appointments.filter(a => a.status === 'cancelled' || a.status === 'pending').map(a => ({
            ...a,
            reason: a.status === 'cancelled' ? 'Đã huỷ' : 'Không đến',
            attempts: Math.floor(Math.random() * 3) + 1,
            rescheduled: false
        }))
    )

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(n => n.customerName.toLowerCase().includes(q) || n.phone.includes(q)) }
        if (reasonFilter !== 'all') r = r.filter(n => n.reason === reasonFilter)
        return r
    }, [data, search, reasonFilter])

    const handleReschedule = () => {
        if (!rescheduleDate) return
        setData(prev => prev.map(n => n.id === rescheduleId ? { ...n, rescheduled: true, date: rescheduleDate } : n))
        addToast(`Đã đặt lại lịch cho ${data.find(n => n.id === rescheduleId)?.customerName}`, 'success')
        setRescheduleId(null); setRescheduleDate('')
    }

    return (
        <div className="fade-in">
            {rescheduleId && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '400px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>📅 Đặt lại lịch hẹn</h3>
                        <p style={{ fontSize: '0.85rem', marginBottom: '12px', color: 'var(--gray-600)' }}>
                            Khách hàng: <b>{data.find(n => n.id === rescheduleId)?.customerName}</b>
                        </p>
                        <input type="date" value={rescheduleDate} onChange={e => setRescheduleDate(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', marginBottom: '16px', fontSize: '0.9rem' }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setRescheduleId(null)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleReschedule} className="btn btn-primary">Đặt lịch</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h2>Khách Không Đến</h2><p>Theo dõi và xử lý khách hàng không đến</p></div>
                <button className="btn btn-secondary" onClick={() => {
                    const csv = '#,Khách hàng,SĐT,Ngày hẹn,Giờ,Lý do,Liên hệ,Đặt lại\n' + data.map((n, i) => `${i + 1},${n.customerName},${n.phone},${n.date},${n.time},${n.reason},${n.attempts},${n.rescheduled ? 'Có' : 'Không'}`).join('\n')
                    const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'khach-khong-den.csv'; a.click()
                    addToast('Đã xuất CSV', 'success')
                }}><FiDownload size={14} /> Xuất dữ liệu</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiAlertCircle color="#dc3545" /></div><div><div className="stat-label">Tổng KH không đến</div><div className="stat-value" style={{ color: '#dc3545' }}>{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiAlertCircle color="#ff9800" /></div><div><div className="stat-label">Đã huỷ lịch</div><div className="stat-value" style={{ color: '#ff9800' }}>{data.filter(n => n.reason === 'Đã huỷ').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiAlertCircle color="#e91e63" /></div><div><div className="stat-label">Không đến</div><div className="stat-value" style={{ color: '#e91e63' }}>{data.filter(n => n.reason === 'Không đến').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCalendar color="#1a73e8" /></div><div><div className="stat-label">Đã đặt lại</div><div className="stat-value" style={{ color: '#1a73e8' }}>{data.filter(n => n.rescheduled).length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiRefreshCw color="#28a745" /></div><div><div className="stat-label">Tỉ lệ phục hồi</div><div className="stat-value" style={{ color: '#28a745' }}>{data.length > 0 ? Math.round(data.filter(n => n.rescheduled).length / data.length * 100) : 0}%</div></div></div>
            </div>

            {/* Reason Distribution + High Contact Attempts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Phân bố lý do</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {['Đã huỷ', 'Không đến'].map(reason => {
                            const count = data.filter(n => n.reason === reason).length
                            const colors = { 'Đã huỷ': '#ff9800', 'Không đến': '#dc3545' }
                            return (
                                <div key={reason} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '80px', fontSize: '0.78rem', fontWeight: 500 }}>{reason}</span>
                                    <div style={{ flex: 1, height: '10px', background: '#e9ecef', borderRadius: '5px' }}>
                                        <div style={{ width: `${data.length > 0 ? (count / data.length) * 100 : 0}%`, height: '100%', borderRadius: '5px', background: colors[reason], transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, minWidth: '30px', textAlign: 'right' }}>{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPhone size={14} color="#dc3545" /> Cần liên hệ thêm</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {data.filter(n => !n.rescheduled && n.attempts >= 2).length === 0 ? (
                            <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '8px', fontSize: '0.82rem', color: '#28a745', textAlign: 'center' }}>✅ Tất cả đã được xử lý</div>
                        ) : (
                            data.filter(n => !n.rescheduled && n.attempts >= 2).slice(0, 3).map(n => (
                                <div key={n.id} style={{ padding: '8px 12px', background: '#fff5f5', borderRadius: '8px', border: '1px solid #ffcdd2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div><div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{n.customerName}</div><div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Đã gọi {n.attempts} lần</div></div>
                                    <button className="btn btn-sm btn-primary" onClick={() => setRescheduleId(n.id)} style={{ fontSize: '0.72rem' }}><FiCalendar size={12} /> Đặt lại</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '300px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={reasonFilter} onChange={e => setReasonFilter(e.target.value)}>
                    <option value="all">Tất cả lý do</option><option value="Đã huỷ">Đã huỷ</option><option value="Không đến">Không đến</option>
                </select>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header"><span className="table-count">{filtered.length} khách hàng</span></div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead><tr><th>#</th><th>Khách Hàng</th><th>SĐT</th><th>Ngày hẹn</th><th>Giờ</th><th>Lý do</th><th>Liên hệ</th><th>Thao tác</th></tr></thead>
                        <tbody>
                            {filtered.map((n, i) => (
                                <tr key={n.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: 600 }}>{n.customerName}</td>
                                    <td style={{ color: 'var(--primary)' }}>{n.phone}</td>
                                    <td>{n.date}</td>
                                    <td>{n.time}</td>
                                    <td><span className={`badge badge-${n.reason === 'Đã huỷ' ? 'cancelled' : 'pending'}`}>{n.reason}</span></td>
                                    <td>{n.attempts} lần</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn btn-outline btn-sm" onClick={() => { setData(prev => prev.map(x => x.id === n.id ? { ...x, attempts: x.attempts + 1 } : x)); addToast(`Đang gọi ${n.customerName}...`, 'info') }} style={{ fontSize: '0.72rem' }}><FiPhone size={12} /> Gọi lại</button>
                                            {!n.rescheduled ?
                                                <button className="btn btn-primary btn-sm" onClick={() => setRescheduleId(n.id)} style={{ fontSize: '0.72rem' }}><FiCalendar size={12} /> Đặt lại</button> :
                                                <span style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 600 }}>✓ Đã đặt lại</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
