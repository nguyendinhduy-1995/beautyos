import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiEdit, FiTrash2, FiStar, FiPackage } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialCards = [
    { id: 1, name: 'Thẻ Chăm Sóc Da 10 Buổi', services: ['Chăm sóc da cơ bản', 'Đắp mặt nạ'], price: 5000000, sessions: 10, used: 3, validMonths: 12, status: 'active', sold: 15 },
    { id: 2, name: 'Thẻ Triệt Lông 6 Buổi', services: ['Triệt lông Diode'], price: 8000000, sessions: 6, used: 0, validMonths: 6, status: 'active', sold: 8 },
    { id: 3, name: 'Thẻ Massage Body VIP', services: ['Massage body', 'Xông hơi', 'Đá nóng'], price: 12000000, sessions: 15, used: 7, validMonths: 12, status: 'active', sold: 22 },
    { id: 4, name: 'Thẻ Điều Trị Mụn', services: ['Điều trị mụn', 'Trị thâm'], price: 3500000, sessions: 8, used: 8, validMonths: 6, status: 'completed', sold: 30 },
    { id: 5, name: 'Thẻ Botox Premium', services: ['Botox', 'Filler'], price: 25000000, sessions: 4, used: 1, validMonths: 12, status: 'active', sold: 5 },
    { id: 6, name: 'Thẻ PRP Trẻ Hóa', services: ['PRP', 'Mesotherapy'], price: 15000000, sessions: 6, used: 2, validMonths: 12, status: 'active', sold: 12 },
]

export default function CustomCards() {
    const [cards, setCards] = useState(initialCards)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => cards.filter(c => {
        const q = search.toLowerCase()
        return !search || c.name.toLowerCase().includes(q) || c.services.some(s => s.toLowerCase().includes(q))
    }), [cards, search])

    const handleDelete = (id) => {
        setCards(prev => prev.filter(c => c.id !== id))
        toast.success('Đã xoá thẻ')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản Lý Thẻ Tự Chọn</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Tạo và quản lý các loại thẻ dịch vụ tự chọn</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo Thẻ</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Loại thẻ</div><div className="stat-value">{cards.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiStar color="#28a745" /></div><div><div className="stat-label">Đang hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{cards.filter(c => c.status === 'active').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiStar color="#ff9800" /></div><div><div className="stat-label">Tổng bán ra</div><div className="stat-value" style={{ color: '#ff9800' }}>{cards.reduce((s, c) => s + c.sold, 0)}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm tên thẻ, dịch vụ..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {filtered.map(c => (
                    <div key={c.id} style={{
                        background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)',
                        overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s',
                    }}>
                        <div style={{
                            background: c.status === 'active' ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)',
                            color: 'white', padding: '16px 20px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>{c.name}</h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', opacity: 0.9 }}>{c.sessions} buổi · {c.validMonths} tháng</p>
                                </div>
                                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>
                                    {c.status === 'active' ? 'Hoạt động' : 'Kết thúc'}
                                </span>
                            </div>
                        </div>
                        <div style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-primary)' }}>{formatCurrency(c.price)}</span>
                                <span style={{ fontSize: '0.8rem', color: '#999' }}>Đã bán: {c.sold}</span>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '6px' }}>Dịch vụ bao gồm:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {c.services.map((s, j) => <span key={j} className="badge badge-info" style={{ fontSize: '0.72rem' }}>{s}</span>)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                                <button className="btn btn-sm btn-secondary" onClick={() => toast.info('Sửa thẻ')}><FiEdit size={13} /></button>
                                <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(c.id)} style={{ color: '#dc3545' }}><FiTrash2 size={13} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>Tạo Thẻ Tự Chọn</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên thẻ</label><input className="form-control" placeholder="VD: Thẻ Chăm Sóc Da 10 Buổi" /></div>
                            <div className="form-group"><label>Giá</label><input className="form-control" type="number" placeholder="VD: 5000000" /></div>
                            <div className="form-group"><label>Số buổi</label><input className="form-control" type="number" placeholder="VD: 10" /></div>
                            <div className="form-group"><label>Thời hạn (tháng)</label><input className="form-control" type="number" placeholder="VD: 12" /></div>
                            <div className="form-group"><label>Dịch vụ</label><textarea className="form-control" rows={2} placeholder="Nhập dịch vụ, cách nhau bởi dấu phẩy" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={() => { setShowModal(false); toast.success('Đã tạo thẻ tự chọn') }}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
