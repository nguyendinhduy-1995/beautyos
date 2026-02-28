import { useState, useMemo } from 'react'
import { FiSearch, FiPhone, FiAlertCircle, FiDownload, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialData = customers.slice(0, 8).map((c, i) => ({
    id: i + 1, name: c.name, phone: c.phone,
    checkinTime: `${8 + Math.floor(i / 2)}:${String(i * 7 % 60).padStart(2, '0')}`,
    checkinDate: '27/02/2026',
    reason: ['Chờ lâu', 'Đổi ý', 'Giá cao', 'Không hài lòng', 'Bận việc', 'Chờ bạn', 'Không tìm được DV', 'Lý do khác'][i],
    staff: ['Thu Hà', 'Minh Anh', 'Thanh Tùng', 'Phương Linh', 'Thu Hà', 'Minh Anh', 'Thanh Tùng', 'Phương Linh'][i],
    note: '', contacted: i < 3, branch: 'CN_1834'
}))

export default function NoServiceCheckIn() {
    const [data, setData] = useState(initialData)
    const [search, setSearch] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const toast = useToast()

    const filtered = useMemo(() => data.filter(d => {
        const q = search.toLowerCase()
        return !search || d.name.toLowerCase().includes(q) || d.phone.includes(q) || d.reason.toLowerCase().includes(q)
    }), [data, search])

    const contacted = data.filter(d => d.contacted).length
    const notContacted = data.filter(d => !d.contacted).length

    const handleContact = (id) => {
        setData(prev => prev.map(d => d.id === id ? { ...d, contacted: true } : d))
        toast.success('Đã liên hệ khách hàng')
    }

    const handleExport = () => {
        const csv = 'Tên,SĐT,Checkin,Lý do,NV,Đã liên hệ\n' + data.map(d => `${d.name},${d.phone},${d.checkinTime} ${d.checkinDate},${d.reason},${d.staff},${d.contacted ? 'Có' : 'Chưa'}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'khong-lam-dv.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Không Làm Dịch Vụ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Khách check-in nhưng không sử dụng dịch vụ</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất hiển thị</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiAlertCircle color="#dc3545" /></div><div><div className="stat-label">Tổng KH</div><div className="stat-value" style={{ color: '#dc3545' }}>{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiPhone color="#28a745" /></div><div><div className="stat-label">Đã liên hệ</div><div className="stat-value" style={{ color: '#28a745' }}>{contacted}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chưa liên hệ</div><div className="stat-value" style={{ color: '#ff9800' }}>{notContacted}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm tên, SĐT, lý do..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="filter-select" style={{ maxWidth: '180px' }} />
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{filtered.length} khách</span>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>Khách Hàng</th><th>SĐT</th><th>Check-in</th><th>Lý do</th><th>NV phụ trách</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.map((d, i) => (
                            <tr key={d.id} style={{ background: !d.contacted ? '#fffbeb' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}><FiUser size={12} style={{ marginRight: 4 }} />{d.name}</td>
                                <td style={{ color: 'var(--color-primary)' }}>{d.phone}</td>
                                <td><FiClock size={12} style={{ marginRight: 4 }} />{d.checkinTime} - {d.checkinDate}</td>
                                <td><span className="badge badge-warning">{d.reason}</span></td>
                                <td>{d.staff}</td>
                                <td>{d.contacted ? <span className="badge badge-success">Đã liên hệ</span> : <span className="badge badge-danger">Chưa LH</span>}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {!d.contacted && <button className="btn btn-sm btn-primary" onClick={() => handleContact(d.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiPhone size={12} /> Gọi</button>}
                                        <button className="btn btn-sm btn-secondary" onClick={() => toast.info(`Gửi SMS cho ${d.name}`)}><FiMessageSquare size={12} /></button>
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
