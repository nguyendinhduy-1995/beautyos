import { useState, useMemo } from 'react'
import { FiShoppingBag, FiStar, FiDownload, FiSearch, FiCheck, FiEye, FiX, FiFilter, FiTrendingUp, FiAward } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialTemplates = [
    { id: 1, name: 'Chào mừng khách mới', category: 'Onboarding', downloads: 234, rating: 4.8, desc: 'Template chăm sóc khách hàng lần đầu', used: false },
    { id: 2, name: 'Chúc mừng sinh nhật', category: 'Birthday', downloads: 189, rating: 4.5, desc: 'Template SMS/Zalo chúc sinh nhật kèm voucher', used: false },
    { id: 3, name: 'Nhắc lịch hẹn', category: 'Reminder', downloads: 456, rating: 4.9, desc: 'Template nhắc lịch hẹn tự động qua SMS', used: true },
    { id: 4, name: 'After-care follow up', category: 'Post-treatment', downloads: 167, rating: 4.3, desc: 'Template hỏi thăm sau điều trị', used: false },
    { id: 5, name: 'Khuyến mãi cuối tháng', category: 'Promotion', downloads: 312, rating: 4.6, desc: 'Template thông báo khuyến mãi', used: true },
    { id: 6, name: 'Re-engagement', category: 'Win-back', downloads: 98, rating: 4.1, desc: 'Template thu hút khách lâu không quay lại', used: false },
    { id: 7, name: 'Khảo sát hài lòng', category: 'Survey', downloads: 145, rating: 4.4, desc: 'Template khảo sát mức độ hài lòng', used: false },
    { id: 8, name: 'Thông báo lịch nghỉ', category: 'Announcement', downloads: 78, rating: 4.0, desc: 'Template thông báo lịch nghỉ lễ', used: false },
]

const categories = ['Tất cả', 'Onboarding', 'Birthday', 'Reminder', 'Post-treatment', 'Promotion', 'Win-back', 'Survey', 'Announcement']

export default function TicketStore() {
    const toast = useToast()
    const [data, setData] = useState(initialTemplates)
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('Tất cả')
    const [previewItem, setPreviewItem] = useState(null)

    const filtered = useMemo(() => {
        let r = data
        if (search) r = r.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
        if (catFilter !== 'Tất cả') r = r.filter(t => t.category === catFilter)
        return r
    }, [data, search, catFilter])

    const handleUse = (id) => {
        setData(prev => prev.map(t => t.id === id ? { ...t, used: true, downloads: t.downloads + 1 } : t))
        const template = data.find(t => t.id === id)
        toast.success(`Đã thêm "${template.name}" vào danh sách ticket`)
    }

    const handleRemove = (id) => {
        setData(prev => prev.map(t => t.id === id ? { ...t, used: false } : t))
        toast.info('Đã gỡ template')
    }

    const usedCount = data.filter(t => t.used).length

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Ticket Store</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Kho template ticket có sẵn để sử dụng • Đang dùng {usedCount}/{data.length}</p></div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiShoppingBag color="#1a73e8" /></div><div><div className="stat-label">Tổng template</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đang sử dụng</div><div className="stat-value" style={{ color: '#28a745' }}>{usedCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiDownload color="#ff9800" /></div><div><div className="stat-label">Tổng lượt tải</div><div className="stat-value" style={{ color: '#ff9800' }}>{data.reduce((s, t) => s + t.downloads, 0)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiStar color="#e91e63" /></div><div><div className="stat-label">TB đánh giá</div><div className="stat-value" style={{ color: '#e91e63' }}>{(data.reduce((s, t) => s + t.rating, 0) / data.length).toFixed(1)}</div></div></div>
            </div>

            {/* Category Stats Panel */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '14px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <FiTrendingUp size={14} color="var(--color-primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Phân bố theo danh mục</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {categories.filter(c => c !== 'Tất cả').map(cat => {
                        const catTemplates = data.filter(t => t.category === cat)
                        const catDownloads = catTemplates.reduce((s, t) => s + t.downloads, 0)
                        const isPopular = catDownloads > 300
                        return (
                            <div key={cat} onClick={() => setCatFilter(cat)}
                                style={{
                                    padding: '8px 14px', borderRadius: '10px', cursor: 'pointer',
                                    border: `1px solid ${catFilter === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                    background: catFilter === cat ? 'var(--color-primary-light)' : 'white',
                                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '6px'
                                }}>
                                <span style={{ fontSize: '0.78rem', fontWeight: catFilter === cat ? 700 : 400 }}>{cat}</span>
                                <span style={{ fontSize: '0.68rem', background: isPopular ? '#ffebee' : '#f0f0f0', color: isPopular ? '#e91e63' : 'var(--color-text-light)', padding: '1px 6px', borderRadius: '8px', fontWeight: 600 }}>{catTemplates.length}</span>
                                {isPopular && <FiAward size={11} color="#e91e63" />}
                            </div>
                        )
                    })}
                    <div onClick={() => setCatFilter('Tất cả')}
                        style={{
                            padding: '8px 14px', borderRadius: '10px', cursor: 'pointer',
                            border: `1px solid ${catFilter === 'Tất cả' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            background: catFilter === 'Tất cả' ? 'var(--color-primary-light)' : 'white',
                            transition: 'all 0.15s', fontSize: '0.78rem', fontWeight: catFilter === 'Tất cả' ? 700 : 400
                        }}>
                        Tất cả ({data.length})
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm template..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)', gridColumn: '1/-1' }}>Không tìm thấy template</div>}
                {filtered.map(t => (
                    <div key={t.id} style={{
                        background: 'white', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid ${t.used ? '#28a745' : 'var(--color-border)'}`,
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span className="badge badge-processing">{t.category}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {t.used && <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>✓ Đang dùng</span>}
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f39c12', fontSize: '0.85rem' }}>
                                        <FiStar fill="#f39c12" size={14} /> {t.rating}
                                    </span>
                                </div>
                            </div>
                            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>{t.name}</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginBottom: '16px', lineHeight: 1.5 }}>{t.desc}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '4px' }}><FiDownload size={12} /> {t.downloads} lượt tải</span>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button className="btn btn-sm btn-secondary" onClick={() => setPreviewItem(t)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}><FiEye size={12} /> Xem</button>
                                    {t.used ?
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleRemove(t.id)} style={{ padding: '4px 10px', fontSize: '0.78rem', color: '#dc3545' }}>Gỡ</button> :
                                        <button className="btn btn-sm btn-primary" onClick={() => handleUse(t.id)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}><FiShoppingBag size={12} /> Sử dụng</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {previewItem && (
                <div className="modal-overlay" onClick={() => setPreviewItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>👁️ Xem trước Template</h2><button className="btn-close" onClick={() => setPreviewItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '10px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span className="badge badge-processing">{previewItem.category}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f39c12', fontSize: '0.85rem' }}><FiStar fill="#f39c12" size={14} /> {previewItem.rating}</span>
                                </div>
                                <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>{previewItem.name}</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.6 }}>{previewItem.desc}</p>
                            </div>
                            <div style={{ border: '1px dashed var(--color-border)', borderRadius: '10px', padding: '16px', background: '#fffef7' }}>
                                <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--color-text-light)', margin: 0 }}>
                                    Xin chào [Tên khách hàng],<br /><br />
                                    Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. {previewItem.desc}<br /><br />
                                    Trân trọng,<br />
                                    [Tên cơ sở]
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                                <span><FiDownload size={12} /> {previewItem.downloads} lượt tải</span>
                                <span>{previewItem.used ? '✓ Đang sử dụng' : 'Chưa kích hoạt'}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setPreviewItem(null)}>Đóng</button>
                            {!previewItem.used && <button className="btn btn-primary" onClick={() => { handleUse(previewItem.id); setPreviewItem(null) }}><FiShoppingBag size={14} /> Sử dụng</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
