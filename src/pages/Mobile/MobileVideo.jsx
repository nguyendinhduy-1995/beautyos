import { useState, useMemo } from 'react'
import { FiVideo, FiPlus, FiSearch, FiEdit2, FiTrash2, FiPlay, FiEye, FiClock, FiX, FiUpload, FiGrid, FiList } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialVideos = [
    { id: 1, title: 'Quy trình nâng cơ Hifu', category: 'Điều trị', duration: '05:32', views: 2345, status: 'published', date: '25/02/2026', thumbnail: '🎬', desc: 'Hướng dẫn chi tiết quy trình nâng cơ Hifu từ A-Z' },
    { id: 2, title: 'Hướng dẫn chăm sóc sau laser', category: 'Hướng dẫn', duration: '03:15', views: 1890, status: 'published', date: '23/02/2026', thumbnail: '📹', desc: 'Cách chăm sóc da sau khi điều trị laser' },
    { id: 3, title: 'Review khách hàng - Botox', category: 'Review', duration: '02:48', views: 3456, status: 'published', date: '20/02/2026', thumbnail: '⭐', desc: 'Khách hàng chia sẻ trải nghiệm tiêm Botox' },
    { id: 4, title: 'Tour chi nhánh mới', category: 'Giới thiệu', duration: '04:20', views: 567, status: 'draft', date: '27/02/2026', thumbnail: '🏢', desc: 'Tham quan chi nhánh mới khai trương' },
    { id: 5, title: 'Massage mặt cổ điển', category: 'Điều trị', duration: '06:10', views: 4521, status: 'published', date: '18/02/2026', thumbnail: '💆', desc: 'Kỹ thuật massage mặt thư giãn cao cấp' },
    { id: 6, title: 'Peel da hoá học an toàn', category: 'Hướng dẫn', duration: '04:45', views: 1230, status: 'published', date: '15/02/2026', thumbnail: '🧪', desc: 'Quy trình peel da đúng cách tại spa' },
]

const catColors = { 'Điều trị': '#e91e63', 'Hướng dẫn': '#1a73e8', 'Review': '#ff9800', 'Giới thiệu': '#9c27b0' }

export default function MobileVideo() {
    const [data, setData] = useState(initialVideos)
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('all')
    const [viewMode, setViewMode] = useState('grid')
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(v => v.title.toLowerCase().includes(q)) }
        if (catFilter !== 'all') r = r.filter(v => v.category === catFilter)
        return r
    }, [data, search, catFilter])

    const totalViews = data.reduce((s, v) => s + v.views, 0)
    const published = data.filter(v => v.status === 'published').length
    const categories = [...new Set(data.map(v => v.category))]

    const handleDelete = (id) => {
        setData(prev => prev.filter(v => v.id !== id))
        toast.success('Đã xóa video')
    }

    const handleToggle = (id) => {
        setData(prev => prev.map(v => v.id === id ? { ...v, status: v.status === 'published' ? 'draft' : 'published' } : v))
        toast.info('Đã cập nhật trạng thái')
    }

    const handleCreate = () => {
        const title = document.getElementById('vid-title')?.value?.trim()
        const category = document.getElementById('vid-cat')?.value
        if (!title) return toast.warning('Nhập tiêu đề')
        setData(prev => [...prev, { id: Date.now(), title, category, duration: '00:00', views: 0, status: 'draft', date: '28/02/2026', thumbnail: '🎥', desc: '' }])
        setShowModal(false); toast.success('Đã thêm video')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Quản Lý Video</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Video trên ứng dụng và website</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <button onClick={() => setViewMode('grid')} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', background: viewMode === 'grid' ? 'var(--color-primary)' : 'white', color: viewMode === 'grid' ? 'white' : 'var(--color-text)' }}><FiGrid size={13} /> Grid</button>
                        <button onClick={() => setViewMode('list')} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', background: viewMode === 'list' ? 'var(--color-primary)' : 'white', color: viewMode === 'list' ? 'white' : 'var(--color-text)' }}><FiList size={13} /> List</button>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiUpload size={14} /> Thêm video</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiVideo color="#1a73e8" /></div><div><div className="stat-label">Tổng video</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiPlay color="#28a745" /></div><div><div className="stat-label">Đã xuất bản</div><div className="stat-value" style={{ color: '#28a745' }}>{published}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiEye color="#ff9800" /></div><div><div className="stat-label">Tổng lượt xem</div><div className="stat-value" style={{ color: '#ff9800' }}>{totalViews.toLocaleString()}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiClock color="#e91e63" /></div><div><div className="stat-label">Bản nháp</div><div className="stat-value" style={{ color: '#e91e63' }}>{data.length - published}</div></div></div>
            </div>

            {/* Filters */}
            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm video..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                    <option value="all">Tất cả danh mục</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {viewMode === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                    {filtered.map(v => {
                        const color = catColors[v.category] || '#666'
                        return (
                            <div key={v.id} style={{
                                background: 'white', borderRadius: '12px', overflow: 'hidden',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)',
                                opacity: v.status === 'draft' ? 0.75 : 1, transition: 'all 0.2s'
                            }}
                                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                                onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
                                {/* Video thumbnail placeholder */}
                                <div style={{
                                    height: '160px', background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
                                }}>
                                    <span style={{ fontSize: '3rem' }}>{v.thumbnail}</span>
                                    <div style={{
                                        position: 'absolute', bottom: '8px', right: '8px',
                                        background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px',
                                        borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'monospace'
                                    }}>{v.duration}</div>
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                                        width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                    }}>
                                        <FiPlay color="white" size={18} />
                                    </div>
                                    {v.status === 'draft' && (
                                        <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#ff9800', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600' }}>Nháp</span>
                                    )}
                                </div>
                                <div style={{ padding: '14px 16px' }}>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                        <h3 style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0, flex: 1, lineHeight: '1.3' }}>{v.title}</h3>
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', margin: '0 0 8px', lineHeight: '1.4' }}>{v.desc}</p>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                                            <span style={{ background: color + '20', color, padding: '2px 8px', borderRadius: '8px', fontWeight: '600', fontSize: '0.72rem' }}>{v.category}</span>
                                            <span><FiEye size={11} /> {v.views.toLocaleString()}</span>
                                            <span>{v.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" onClick={() => handleToggle(v.id)} title={v.status === 'published' ? 'Gỡ' : 'Xuất bản'}><FiPlay size={13} color={v.status === 'published' ? '#28a745' : '#999'} /></button>
                                            <button className="btn-icon" onClick={() => handleDelete(v.id)}><FiTrash2 size={13} color="#dc3545" /></button>
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
                        <thead><tr><th></th><th>Tiêu đề</th><th>Danh mục</th><th>Thời lượng</th><th>Lượt xem</th><th>Trạng thái</th><th>Ngày</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(v => (
                                <tr key={v.id} style={{ opacity: v.status === 'draft' ? 0.65 : 1 }}>
                                    <td style={{ fontSize: '1.5rem' }}>{v.thumbnail}</td>
                                    <td><div style={{ fontWeight: '600' }}>{v.title}</div><div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{v.desc}</div></td>
                                    <td><span style={{ background: (catColors[v.category] || '#666') + '20', color: catColors[v.category] || '#666', padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>{v.category}</span></td>
                                    <td style={{ fontFamily: 'monospace' }}>{v.duration}</td>
                                    <td><FiEye size={12} style={{ marginRight: '3px' }} />{v.views.toLocaleString()}</td>
                                    <td>{v.status === 'published' ? <span className="badge badge-success">Đã xuất bản</span> : <span className="badge badge-warning">Bản nháp</span>}</td>
                                    <td>{v.date}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleToggle(v.id)}><FiPlay size={13} /></button>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(v.id)}><FiTrash2 size={13} color="#dc3545" /></button>
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>🎬 Thêm Video</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tiêu đề *</label><input id="vid-title" className="form-control" placeholder="VD: Quy trình điều trị laser" /></div>
                            <div className="form-group"><label>Danh mục</label><select id="vid-cat" className="form-control"><option>Điều trị</option><option>Hướng dẫn</option><option>Review</option><option>Giới thiệu</option></select></div>
                            <div className="form-group">
                                <label>Upload video</label>
                                <div style={{ border: '2px dashed var(--color-border)', borderRadius: '10px', padding: '30px', textAlign: 'center', color: 'var(--color-text-light)', cursor: 'pointer' }}>
                                    <FiUpload size={24} style={{ marginBottom: '8px' }} /><br />
                                    <span style={{ fontSize: '0.82rem' }}>Kéo thả hoặc click để tải video</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Thêm</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
