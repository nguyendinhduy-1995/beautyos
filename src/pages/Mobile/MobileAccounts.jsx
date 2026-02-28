import { useState, useMemo } from 'react'
import { FiUser, FiSearch, FiCheckCircle, FiLock, FiUnlock, FiEye, FiX, FiMail, FiPhone, FiStar } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialAccounts = [
    { id: 1, name: 'Nguyễn Thị Mai', phone: '0901234567', email: 'mai@email.com', registered: '15/01/2026', lastLogin: '27/02/2026', status: 'active', points: 1200 },
    { id: 2, name: 'Trần Văn Hùng', phone: '0912345678', email: 'hung@email.com', registered: '20/01/2026', lastLogin: '26/02/2026', status: 'active', points: 850 },
    { id: 3, name: 'Lê Hoàng Anh', phone: '0923456789', email: 'anh@email.com', registered: '01/02/2026', lastLogin: '25/02/2026', status: 'active', points: 450 },
    { id: 4, name: 'Phạm Thu Trang', phone: '0934567890', email: 'trang@email.com', registered: '10/02/2026', lastLogin: '20/02/2026', status: 'inactive', points: 200 },
    { id: 5, name: 'Kim Trang', phone: '0945678901', email: 'kimtrang@email.com', registered: '25/02/2026', lastLogin: '27/02/2026', status: 'active', points: 50 },
    { id: 6, name: 'Võ Minh Tuấn', phone: '0956789012', email: 'tuan@email.com', registered: '05/02/2026', lastLogin: '24/02/2026', status: 'active', points: 680 },
    { id: 7, name: 'Đặng Thùy Linh', phone: '0967890123', email: 'linh@email.com', registered: '18/02/2026', lastLogin: '28/02/2026', status: 'active', points: 320 },
]

export default function MobileAccounts() {
    const toast = useToast()
    const [data, setData] = useState(initialAccounts)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [lockId, setLockId] = useState(null)
    const [detailItem, setDetailItem] = useState(null)

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(a => a.name.toLowerCase().includes(q) || a.phone.includes(q) || a.email.toLowerCase().includes(q)) }
        if (statusFilter !== 'all') r = r.filter(a => a.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    const handleLock = () => {
        const acc = data.find(a => a.id === lockId)
        setData(prev => prev.map(a => a.id === lockId ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a))
        toast.success(acc?.status === 'active' ? `Đã khóa tài khoản ${acc.name}` : `Đã mở khóa tài khoản ${acc.name}`)
        setLockId(null)
    }

    const totalPoints = data.reduce((s, a) => s + a.points, 0)

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!lockId} title={data.find(a => a.id === lockId)?.status === 'active' ? 'Khóa tài khoản?' : 'Mở khóa tài khoản?'}
                message={`Bạn có chắc chắn muốn ${data.find(a => a.id === lockId)?.status === 'active' ? 'khóa' : 'mở khóa'} tài khoản ${data.find(a => a.id === lockId)?.name || ''}?`}
                onConfirm={handleLock} onCancel={() => setLockId(null)} type={data.find(a => a.id === lockId)?.status === 'active' ? 'danger' : 'info'} />

            <div className="page-header">
                <div><h1 className="page-title">Tài Khoản App</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý tài khoản người dùng trên ứng dụng</p></div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiUser color="#1a73e8" /></div><div><div className="stat-label">Tổng tài khoản</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">Hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{data.filter(a => a.status === 'active').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiLock color="#dc3545" /></div><div><div className="stat-label">Tạm khóa</div><div className="stat-value" style={{ color: '#dc3545' }}>{data.filter(a => a.status === 'inactive').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiStar color="#ff9800" /></div><div><div className="stat-label">Tổng điểm</div><div className="stat-value" style={{ color: '#ff9800' }}>{totalPoints.toLocaleString()}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm tài khoản..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm khóa</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Tên</th><th>SĐT</th><th>Email</th><th>Đăng ký</th><th>Đăng nhập cuối</th><th>Điểm</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy</td></tr>}
                        {filtered.map(a => (
                            <tr key={a.id} style={{ opacity: a.status === 'inactive' ? 0.6 : 1 }}>
                                <td style={{ fontWeight: 600 }}><FiUser size={12} style={{ marginRight: 4 }} />{a.name}</td>
                                <td>{a.phone}</td><td>{a.email}</td><td>{a.registered}</td><td>{a.lastLogin}</td>
                                <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{a.points.toLocaleString()}</td>
                                <td>{a.status === 'active' ? <span className="badge badge-success">Hoạt động</span> : <span className="badge badge-danger">Tạm khóa</span>}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn-icon" onClick={() => setDetailItem(a)} title="Xem"><FiEye size={14} /></button>
                                        {a.status === 'active' ?
                                            <button className="btn btn-sm btn-secondary" onClick={() => setLockId(a.id)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}><FiLock size={12} /> Khóa</button> :
                                            <button className="btn btn-sm btn-primary" onClick={() => setLockId(a.id)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}><FiUnlock size={12} /> Mở</button>
                                        }
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>👤 Chi Tiết Tài Khoản</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                    {detailItem.name.charAt(0)}
                                </div>
                                <h3 style={{ margin: 0 }}>{detailItem.name}</h3>
                                <span className={`badge badge-${detailItem.status === 'active' ? 'success' : 'danger'}`} style={{ marginTop: '4px' }}>
                                    {detailItem.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {[['📱 SĐT', detailItem.phone], ['📧 Email', detailItem.email], ['📅 Đăng ký', detailItem.registered], ['🕐 Đăng nhập cuối', detailItem.lastLogin], ['⭐ Điểm tích lũy', `${detailItem.points.toLocaleString()} điểm`]].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
