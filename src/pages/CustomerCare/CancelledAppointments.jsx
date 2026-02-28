import { useState, useMemo } from 'react'
import { FiSearch, FiPhone, FiCalendar, FiRefreshCw, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { appointments as initialAppts } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const cancelledAppts = initialAppts.filter(a => a.status === 'Đã hủy').length > 0
    ? initialAppts.filter(a => a.status === 'Đã hủy')
    : initialAppts.slice(0, 5).map((a, i) => ({ ...a, id: `CANCEL_${i}`, status: 'Đã hủy', cancelReason: ['Khách bận', 'Thay đổi lịch', 'Không liên lạc được', 'Hết hạn voucher', 'Lý do khác'][i], cancelDate: '27/02/2026' }))

export default function CancelledAppointments() {
    const [data, setData] = useState(cancelledAppts)
    const [search, setSearch] = useState('')
    const toast = useToast()

    const filtered = useMemo(() => data.filter(a =>
        !search || a.customer.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase())
    ), [data, search])

    const handleRebook = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, status: 'Đã đặt lại', rebooked: true } : a))
        toast.success('Đã đặt lại lịch hẹn')
    }

    const handleCall = (name) => {
        toast.info(`Đang gọi cho ${name}...`)
    }

    const rebooked = data.filter(a => a.rebooked).length

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Lịch Hẹn Đã Hủy</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý và đặt lại lịch hẹn bị hủy</p>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #dc3545' }}>
                    <div className="stat-icon" style={{ background: '#ffebee' }}><FiAlertCircle color="#dc3545" /></div>
                    <div><div className="stat-label">Đã hủy</div><div className="stat-value" style={{ color: '#dc3545' }}>{data.length}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #28a745' }}>
                    <div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div>
                    <div><div className="stat-label">Đã đặt lại</div><div className="stat-value" style={{ color: '#28a745' }}>{rebooked}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ff9800' }}>
                    <div className="stat-icon" style={{ background: '#fff3e0' }}><FiRefreshCw color="#ff9800" /></div>
                    <div><div className="stat-label">Chưa xử lý</div><div className="stat-value" style={{ color: '#ff9800' }}>{data.length - rebooked}</div></div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm khách hàng, dịch vụ..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr><th>#</th><th>Khách hàng</th><th>Dịch vụ</th><th>Thời gian</th><th>Lý do hủy</th><th>Trạng thái</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {filtered.map((a, i) => (
                            <tr key={a.id} style={{ background: a.rebooked ? '#f0fff4' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{a.customer}</td>
                                <td>{a.service}</td>
                                <td>{a.time} · {a.cancelDate || '27/02/2026'}</td>
                                <td><span className="badge badge-danger" style={{ fontSize: '0.75rem' }}>{a.cancelReason || 'Không rõ'}</span></td>
                                <td>
                                    <span className={`badge badge-${a.rebooked ? 'success' : 'warning'}`}>
                                        {a.rebooked ? 'Đã đặt lại' : 'Đã hủy'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCall(a.customer)} title="Gọi"><FiPhone size={13} /></button>
                                        {!a.rebooked && (
                                            <button className="btn btn-sm btn-primary" onClick={() => handleRebook(a.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FiCalendar size={13} /> Đặt lại
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
