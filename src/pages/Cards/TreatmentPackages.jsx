import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiEdit, FiTrash2, FiCheckCircle, FiClock, FiPackage } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialPackages = [
    { id: 'LT001', name: 'Liệu Trình Trẻ Hóa Da 12 Buổi', category: 'Da mặt', sessions: 12, completedSessions: 5, price: 25000000, services: ['PRP', 'Laser CO2', 'Mesotherapy'], customer: 'Vũ Ngọc', status: 'active', startDate: '01/01/2026' },
    { id: 'LT002', name: 'Liệu Trình Giảm Béo 20 Buổi', category: 'Body', sessions: 20, completedSessions: 12, price: 35000000, services: ['Cavitation', 'RF Body', 'Massage'], customer: 'Phan Thị Ngân', status: 'active', startDate: '10/12/2025' },
    { id: 'LT003', name: 'Liệu Trình Triệt Lông 8 Buổi', category: 'Triệt lông', sessions: 8, completedSessions: 8, price: 12000000, services: ['Triệt lông Diode'], customer: 'Nguyễn Tú Thảo', status: 'completed', startDate: '01/09/2025' },
    { id: 'LT004', name: 'Liệu Trình Botox Định Kỳ', category: 'Tiêm', sessions: 4, completedSessions: 1, price: 40000000, services: ['Botox', 'Filler HA'], customer: 'Kim Trang', status: 'active', startDate: '15/02/2026' },
    { id: 'LT005', name: 'Liệu Trình Điều Trị Mụn', category: 'Da mặt', sessions: 10, completedSessions: 0, price: 8000000, services: ['Điều trị mụn', 'Trị thâm', 'Chemical peel'], customer: 'Lê Thị Hoa', status: 'pending', startDate: '' },
    { id: 'LT006', name: 'Liệu Trình Nâng Cơ Ultherapy', category: 'Da mặt', sessions: 3, completedSessions: 2, price: 60000000, services: ['Ultherapy', 'Thermage'], customer: 'Phan Thị Kim Hồng', status: 'active', startDate: '20/01/2026' },
]

export default function TreatmentPackages() {
    const [packages, setPackages] = useState(initialPackages)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => packages.filter(p => {
        const q = search.toLowerCase()
        const matchSearch = !search || p.name.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
        const matchStatus = !statusFilter || p.status === statusFilter
        return matchSearch && matchStatus
    }), [packages, search, statusFilter])

    const active = packages.filter(p => p.status === 'active').length
    const totalValue = packages.reduce((s, p) => s + p.price, 0)
    const totalSessions = packages.reduce((s, p) => s + p.sessions, 0)
    const completedSessions = packages.reduce((s, p) => s + p.completedSessions, 0)

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Gói Liệu Trình</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý gói liệu trình cho khách hàng</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo Gói</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng gói</div><div className="stat-value">{packages.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">Đang hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{active}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Buổi hoàn thành</div><div className="stat-value" style={{ color: '#ff9800' }}>{completedSessions}/{totalSessions}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng giá trị</div><div className="stat-value" style={{ fontSize: '1rem' }}>{formatCurrency(totalValue)}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã, tên gói, KH..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="active">Đang chạy</option><option value="completed">Hoàn thành</option><option value="pending">Chờ bắt đầu</option>
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
                {filtered.map(p => {
                    const pct = p.sessions > 0 ? Math.round((p.completedSessions / p.sessions) * 100) : 0
                    return (
                        <div key={p.id} style={{
                            background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)',
                            overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            borderLeft: `4px solid ${p.status === 'active' ? '#28a745' : p.status === 'completed' ? '#1a73e8' : '#ff9800'}`
                        }}>
                            <div style={{ padding: '16px 20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '0.85rem' }}>{p.id}</span>
                                            <span className={`badge badge-${p.status === 'active' ? 'success' : p.status === 'completed' ? 'info' : 'warning'}`}>
                                                {p.status === 'active' ? 'Đang chạy' : p.status === 'completed' ? 'Hoàn thành' : 'Chờ'}
                                            </span>
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>{p.name}</h3>
                                    </div>
                                    <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '1.05rem' }}>{formatCurrency(p.price)}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '10px' }}>
                                    <span>👤 {p.customer}</span>
                                    <span>📂 {p.category}</span>
                                    {p.startDate && <span>📅 {p.startDate}</span>}
                                </div>

                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                                        <span>Tiến độ: {p.completedSessions}/{p.sessions} buổi</span>
                                        <span style={{ fontWeight: '600', color: pct === 100 ? '#28a745' : '#ff9800' }}>{pct}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: '#eee', borderRadius: '4px' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#28a745' : pct > 50 ? '#ff9800' : '#1a73e8', borderRadius: '4px', transition: 'width 0.5s' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                                    {p.services.map((s, j) => <span key={j} className="badge badge-info" style={{ fontSize: '0.72rem' }}>{s}</span>)}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                                    <button className="btn btn-sm btn-secondary" onClick={() => toast.info(`Sửa gói ${p.id}`)}><FiEdit size={13} /></button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => { setPackages(prev => prev.filter(x => x.id !== p.id)); toast.success('Đã xoá gói') }} style={{ color: '#dc3545' }}><FiTrash2 size={13} /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>Tạo Gói Liệu Trình</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên gói</label><input className="form-control" placeholder="VD: Liệu Trình Trẻ Hóa Da" /></div>
                            <div className="form-group"><label>Loại</label><select className="form-control"><option>Da mặt</option><option>Body</option><option>Triệt lông</option><option>Tiêm</option></select></div>
                            <div className="form-group"><label>Khách hàng</label><input className="form-control" placeholder="Tên khách hàng" /></div>
                            <div className="form-group"><label>Số buổi</label><input className="form-control" type="number" placeholder="VD: 12" /></div>
                            <div className="form-group"><label>Giá gói</label><input className="form-control" type="number" placeholder="VD: 25000000" /></div>
                            <div className="form-group"><label>Dịch vụ</label><textarea className="form-control" rows={2} placeholder="DV1, DV2, ..." /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={() => { setShowModal(false); toast.success('Đã tạo gói liệu trình') }}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
