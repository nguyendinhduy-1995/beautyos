import { useState, useMemo } from 'react'
import { FiSearch, FiPhone, FiMessageSquare, FiCalendar, FiCheck, FiClock } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const periodicCare = customers.slice(0, 8).map((c, i) => ({
    id: i + 1, name: c.name, phone: c.phone, service: ['Chăm sóc da', 'Laser', 'Filler môi', 'Nâng cơ Hifu', 'Trị mụn', 'Trẻ hóa da', 'Botox', 'Massage'][i],
    lastVisit: `${15 + i}/02/2026`, nextSchedule: `${1 + i * 3}/03/2026`,
    frequency: ['2 tuần', '1 tháng', '2 tuần', '3 tuần', '1 tháng', '2 tuần', '1 tháng', '3 tuần'][i],
    status: i < 5 ? 'Sắp đến hạn' : 'Đã nhắc', contacted: i >= 5
}))

export default function PeriodicCare() {
    const [data, setData] = useState(periodicCare)
    const [search, setSearch] = useState('')
    const toast = useToast()

    const filtered = useMemo(() => data.filter(c =>
        !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
    ), [data, search])

    const handleRemind = (id) => {
        setData(prev => prev.map(c => c.id === id ? { ...c, contacted: true, status: 'Đã nhắc' } : c))
        toast.success('Đã gửi nhắc nhở')
    }

    const handleCall = (name) => toast.info(`Đang gọi ${name}...`)
    const handleSMS = (name) => toast.info(`Đã gửi SMS cho ${name}`)

    const upcoming = data.filter(c => !c.contacted).length
    const contacted = data.filter(c => c.contacted).length

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Chăm Sóc Định Kỳ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Nhắc nhở khách hàng theo lịch chăm sóc định kỳ</p>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #1a73e8' }}>
                    <div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCalendar color="#1a73e8" /></div>
                    <div><div className="stat-label">Tổng KH</div><div className="stat-value">{data.length}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ff9800' }}>
                    <div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div>
                    <div><div className="stat-label">Sắp đến hạn</div><div className="stat-value" style={{ color: '#ff9800' }}>{upcoming}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #28a745' }}>
                    <div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div>
                    <div><div className="stat-label">Đã nhắc</div><div className="stat-value" style={{ color: '#28a745' }}>{contacted}</div></div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr><th>#</th><th>Khách hàng</th><th>SĐT</th><th>Dịch vụ</th><th>Lần cuối</th><th>Lịch tiếp</th><th>Chu kỳ</th><th>Trạng thái</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {filtered.map((c, i) => (
                            <tr key={c.id} style={{ background: !c.contacted ? '#fffbeb' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{c.name}</td>
                                <td>{c.phone}</td>
                                <td>{c.service}</td>
                                <td>{c.lastVisit}</td>
                                <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{c.nextSchedule}</td>
                                <td><span className="badge badge-info">{c.frequency}</span></td>
                                <td><span className={`badge badge-${c.contacted ? 'success' : 'warning'}`}>{c.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCall(c.name)} title="Gọi"><FiPhone size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleSMS(c.name)} title="SMS"><FiMessageSquare size={13} /></button>
                                        {!c.contacted && (
                                            <button className="btn btn-sm btn-primary" onClick={() => handleRemind(c.id)}>Nhắc nhở</button>
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
