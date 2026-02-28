import { useState, useMemo } from 'react'
import { FiEdit3, FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiGrid, FiList, FiX, FiClock, FiBookOpen, FiUpload, FiHeart } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialPosts = [
    { id: 1, title: 'Bí quyết chăm sóc da mùa đông', excerpt: 'Mùa đông da thường khô và bong tróc. Hãy áp dụng những tips sau để giữ da luôn ẩm mượt...', category: 'Skincare', status: 'published', date: '27/02/2026', author: 'Admin', views: 456, likes: 32, thumbnail: '🧴', readTime: '5 phút' },
    { id: 2, title: 'Top 5 liệu trình hot 2026', excerpt: 'Xu hướng làm đẹp 2026 với các liệu trình nâng cơ Hifu, PRP trẻ hoá, Botox thế hệ mới...', category: 'Xu hướng', status: 'published', date: '25/02/2026', author: 'BS My', views: 789, likes: 58, thumbnail: '🔥', readTime: '8 phút' },
    { id: 3, title: 'FAQ: Botox có đau không?', excerpt: 'Nhiều khách hàng lo lắng khi tiêm Botox lần đầu. Bài viết giải đáp tất cả thắc mắc...', category: 'FAQ', status: 'published', date: '23/02/2026', author: 'BS Tuấn Anh', views: 1023, likes: 87, thumbnail: '❓', readTime: '4 phút' },
    { id: 4, title: 'Câu chuyện khách hàng: Chị Mai', excerpt: 'Hành trình lấy lại thanh xuân của chị Mai sau 3 tháng điều trị tại spa...', category: 'Story', status: 'draft', date: '27/02/2026', author: 'Admin', views: 0, likes: 0, thumbnail: '💎', readTime: '6 phút' },
    { id: 5, title: 'Cách chọn kem chống nắng phù hợp', excerpt: 'Hướng dẫn chọn kem chống nắng theo loại da và mục đích sử dụng...', category: 'Skincare', status: 'published', date: '22/02/2026', author: 'KTV Lan', views: 650, likes: 41, thumbnail: '☀️', readTime: '7 phút' },
    { id: 6, title: 'Trẻ hoá da bằng PRP', excerpt: 'Phương pháp PRP sử dụng tiểu cầu từ chính máu của bạn để tái tạo da...', category: 'Điều trị', status: 'published', date: '20/02/2026', author: 'BS Công Vũ', views: 892, likes: 63, thumbnail: '💉', readTime: '10 phút' },
]

const catColors = { Skincare: '#1abc9c', 'Xu hướng': '#e91e63', FAQ: '#3498db', Story: '#ff9800', 'Điều trị': '#9c27b0' }

export default function MobileBlog() {
    const [data, setData] = useState(initialPosts)
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('all')
    const [viewMode, setViewMode] = useState('grid')
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => {
        let r = data
        if (search) r = r.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        if (catFilter !== 'all') r = r.filter(p => p.category === catFilter)
        return r
    }, [data, search, catFilter])

    const totalViews = data.reduce((s, p) => s + p.views, 0)
    const totalLikes = data.reduce((s, p) => s + p.likes, 0)
    const published = data.filter(p => p.status === 'published').length
    const categories = [...new Set(data.map(p => p.category))]

    const handleDelete = (id) => { setData(prev => prev.filter(p => p.id !== id)); toast.success('Đã xóa bài viết') }
    const handleToggle = (id) => {
        setData(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p))
        toast.info('Đã cập nhật trạng thái')
    }
    const handleCreate = () => {
        const t = document.getElementById('blog-title')?.value?.trim()
        if (!t) return toast.warning('Nhập tiêu đề')
        setData(prev => [...prev, { id: Date.now(), title: t, excerpt: '', category: document.getElementById('blog-cat')?.value || 'Skincare', status: 'draft', date: '28/02/2026', author: 'Admin', views: 0, likes: 0, thumbnail: '📝', readTime: '3 phút' }])
        setShowModal(false); toast.success('Đã tạo bài viết')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Blog & Tin Tức</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý bài viết blog trên app và website</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <button onClick={() => setViewMode('grid')} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', background: viewMode === 'grid' ? 'var(--color-primary)' : 'white', color: viewMode === 'grid' ? 'white' : 'var(--color-text)' }}><FiGrid size={13} /></button>
                        <button onClick={() => setViewMode('list')} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', background: viewMode === 'list' ? 'var(--color-primary)' : 'white', color: viewMode === 'list' ? 'white' : 'var(--color-text)' }}><FiList size={13} /></button>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Viết bài mới</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiBookOpen color="#1a73e8" /></div><div><div className="stat-label">Tổng bài viết</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiEdit3 color="#28a745" /></div><div><div className="stat-label">Đã xuất bản</div><div className="stat-value" style={{ color: '#28a745' }}>{published}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiEye color="#ff9800" /></div><div><div className="stat-label">Tổng lượt xem</div><div className="stat-value" style={{ color: '#ff9800' }}>{totalViews.toLocaleString()}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiHeart color="#e91e63" /></div><div><div className="stat-label">Tổng lượt thích</div><div className="stat-value" style={{ color: '#e91e63' }}>{totalLikes}</div></div></div>
            </div>

            {/* Filters */}
            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm bài viết..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                    <option value="all">Tất cả danh mục</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {viewMode === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                    {filtered.map(p => {
                        const color = catColors[p.category] || '#666'
                        return (
                            <div key={p.id} style={{
                                background: 'white', borderRadius: '12px', overflow: 'hidden',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--color-border)',
                                opacity: p.status === 'draft' ? 0.8 : 1, transition: 'all 0.2s'
                            }}
                                onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)'}
                                onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}>
                                {/* Thumbnail area */}
                                <div style={{
                                    height: '120px', background: `linear-gradient(135deg, ${color}15, ${color}35)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                                }}>
                                    <span style={{ fontSize: '2.8rem' }}>{p.thumbnail}</span>
                                    {p.status === 'draft' && <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#ff9800', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600' }}>Nháp</span>}
                                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: color + '20', color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600' }}>{p.category}</span>
                                </div>
                                <div style={{ padding: '16px' }}>
                                    <h3 style={{ fontSize: '0.92rem', fontWeight: '600', margin: '0 0 6px', lineHeight: '1.3' }}>{p.title}</h3>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', margin: '0 0 10px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.excerpt}</p>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
                                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                                            <span>✍ {p.author}</span>
                                            <span><FiClock size={10} /> {p.readTime}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                                            <span><FiEye size={10} /> {p.views}</span>
                                            <span><FiHeart size={10} color="#e91e63" /> {p.likes}</span>
                                        </div>
                                    </div>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{p.date}</span>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" onClick={() => handleToggle(p.id)} title={p.status === 'published' ? 'Gỡ' : 'Xuất bản'}><FiEdit3 size={13} color={p.status === 'published' ? '#28a745' : '#999'} /></button>
                                            <button className="btn-icon" onClick={() => handleDelete(p.id)}><FiTrash2 size={13} color="#dc3545" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th></th><th>Tiêu đề</th><th>Danh mục</th><th>Tác giả</th><th>Ngày</th><th>Xem</th><th>♥</th><th>TT</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id} style={{ opacity: p.status === 'draft' ? 0.65 : 1 }}>
                                    <td style={{ fontSize: '1.3rem' }}>{p.thumbnail}</td>
                                    <td><div style={{ fontWeight: '600' }}>{p.title}</div><div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.excerpt}</div></td>
                                    <td><span style={{ background: (catColors[p.category] || '#666') + '20', color: catColors[p.category] || '#666', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '600' }}>{p.category}</span></td>
                                    <td>{p.author}</td>
                                    <td>{p.date}</td>
                                    <td><FiEye size={11} style={{ marginRight: '2px' }} />{p.views}</td>
                                    <td><FiHeart size={11} color="#e91e63" style={{ marginRight: '2px' }} />{p.likes}</td>
                                    <td>{p.status === 'published' ? <span className="badge badge-success">Xuất bản</span> : <span className="badge badge-warning">Nháp</span>}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleToggle(p.id)}><FiEdit3 size={13} /></button>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(p.id)}><FiTrash2 size={13} color="#dc3545" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>📝 Viết Bài Mới</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tiêu đề *</label><input id="blog-title" className="form-control" placeholder="VD: Bí quyết chăm sóc da sau điều trị" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Danh mục</label><select id="blog-cat" className="form-control"><option>Skincare</option><option>Xu hướng</option><option>FAQ</option><option>Story</option><option>Điều trị</option></select></div>
                                <div className="form-group"><label>Tác giả</label><input className="form-control" defaultValue="Admin" /></div>
                            </div>
                            <div className="form-group">
                                <label>Nội dung</label>
                                <textarea className="form-control" rows="4" placeholder="Nội dung bài viết..." style={{ resize: 'vertical' }} />
                            </div>
                            <div className="form-group">
                                <label>Ảnh bìa</label>
                                <div style={{ border: '2px dashed var(--color-border)', borderRadius: '10px', padding: '24px', textAlign: 'center', color: 'var(--color-text-light)', cursor: 'pointer' }}>
                                    <FiUpload size={20} style={{ marginBottom: '6px' }} /><br />
                                    <span style={{ fontSize: '0.82rem' }}>Kéo thả hoặc click để chọn ảnh</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo bài viết</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
