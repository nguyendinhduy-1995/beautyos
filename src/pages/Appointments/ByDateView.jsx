import { useState, useMemo } from 'react'
import { FiSearch, FiCalendar, FiChevronLeft, FiChevronRight, FiPlus, FiX, FiClock, FiUser } from 'react-icons/fi'
import { appointments as allAppts } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function ByDateView() {
    const [date, setDate] = useState('2026-02-27')
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(allAppts)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(a => {
        const q = search.toLowerCase()
        return !search || a.customerName.toLowerCase().includes(q) || a.type.toLowerCase().includes(q) || a.customerId.toLowerCase().includes(q)
    }), [data, search])

    const arrived = data.filter(a => a.status === 'arrived').length
    const pending = data.filter(a => a.status === 'pending').length
    const cancelled = data.filter(a => a.status === 'cancelled').length

    const dateLabel = new Date(date).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })

    const shiftDate = (d) => {
        const dt = new Date(date)
        dt.setDate(dt.getDate() + d)
        setDate(dt.toISOString().split('T')[0])
    }

    const statusMap = { pending: { label: 'Chờ', badge: 'warning' }, arrived: { label: 'Đã đến', badge: 'success' }, cancelled: { label: 'Đã huỷ', badge: 'danger' } }

    const handleCreate = () => {
        const name = document.getElementById('bd-name')?.value?.trim()
        const svc = document.getElementById('bd-svc')?.value?.trim()
        const time = document.getElementById('bd-time')?.value?.trim() || '10:00'
        if (!name || !svc) return toast.warning('Nhập đủ thông tin')
        setData(prev => [...prev, { id: Date.now(), customerName: name, customerId: `KH_new_${Date.now()}`, phone: '', content: svc, type: svc, time: `${time} - ${time}`, status: 'pending', date: '27-02-2026' }])
        setShowModal(false); toast.success('Đã tạo lịch hẹn')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Lịch Hẹn Theo Ngày</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Xem và quản lý lịch hẹn theo từng ngày</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo lịch hẹn</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', background: 'white', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                <button className="btn btn-sm btn-secondary" onClick={() => shiftDate(-1)}><FiChevronLeft /></button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCalendar color="var(--color-primary)" />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ border: 'none', fontSize: '1rem', fontWeight: '600', color: 'var(--color-primary)', cursor: 'pointer' }} />
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => shiftDate(1)}><FiChevronRight /></button>
                <span style={{ marginLeft: '8px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{dateLabel}</span>
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCalendar color="#1a73e8" /></div><div><div className="stat-label">Tổng</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chờ</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiUser color="#28a745" /></div><div><div className="stat-label">Đã đến</div><div className="stat-value" style={{ color: '#28a745' }}>{arrived}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiX color="#dc3545" /></div><div><div className="stat-label">Đã huỷ</div><div className="stat-value" style={{ color: '#dc3545' }}>{cancelled}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm khách, mã KH, loại..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>Giờ</th><th>Mã KH</th><th>Khách hàng</th><th>SĐT</th><th>Loại</th><th>Nội dung</th><th>Trạng thái</th></tr></thead>
                    <tbody>
                        {filtered.map((a, i) => (
                            <tr key={a.id}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{a.time}</td>
                                <td><span style={{ fontSize: '0.8rem', color: '#888' }}>{a.customerId}</span></td>
                                <td style={{ fontWeight: '500' }}>{a.customerName}</td>
                                <td>{a.phone}</td>
                                <td><span className="badge badge-info">{a.type}</span></td>
                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.content}</td>
                                <td><span className={`badge badge-${statusMap[a.status]?.badge || 'secondary'}`}>{statusMap[a.status]?.label || a.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>Tạo Lịch Hẹn</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Khách hàng *</label><input id="bd-name" className="form-control" placeholder="Tên" /></div>
                            <div className="form-group"><label>Loại dịch vụ *</label><input id="bd-svc" className="form-control" placeholder="VD: Chăm sóc da" /></div>
                            <div className="form-group"><label>Giờ</label><input id="bd-time" type="time" className="form-control" defaultValue="10:00" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
