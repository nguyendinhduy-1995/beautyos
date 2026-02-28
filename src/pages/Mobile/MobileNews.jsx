import { useState, useMemo } from 'react'
import { FiFileText, FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiX, FiTrendingUp, FiClock } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialArticles = [
    { id: 1, title: '5 cách chăm sóc da sau Hifu', category: 'Chăm sóc da', status: 'published', date: '27/02/2026', views: 1234, author: 'Admin', excerpt: 'Tìm hiểu cách chăm sóc da sau liệu trình Hifu để đạt hiệu quả tốt nhất.' },
    { id: 2, title: 'Xu hướng làm đẹp 2026', category: 'Xu hướng', status: 'published', date: '26/02/2026', views: 890, author: 'Admin', excerpt: 'Những xu hướng làm đẹp nổi bật nhất trong năm 2026.' },
    { id: 3, title: 'Botox vs Filler: Sự khác biệt', category: 'Kiến thức', status: 'draft', date: '25/02/2026', views: 0, author: 'BS My', excerpt: 'So sánh chi tiết giữa Botox và Filler để giúp bạn đưa ra lựa chọn phù hợp.' },
    { id: 4, title: 'Hướng dẫn sau triệt lông', category: 'Chăm sóc da', status: 'published', date: '24/02/2026', views: 567, author: 'Admin', excerpt: 'Những điều cần lưu ý sau khi triệt lông để da mịn màng nhất.' },
    { id: 5, title: 'Dinh dưỡng cho làn da đẹp', category: 'Sức khỏe', status: 'scheduled', date: '01/03/2026', views: 0, author: 'BS Tuấn Anh', excerpt: 'Chế độ dinh dưỡng ảnh hưởng trực tiếp đến làn da của bạn.' },
]

const CATEGORIES = ['Chăm sóc da', 'Xu hướng', 'Kiến thức', 'Sức khỏe']

export default function MobileNews() {
    const toast = useToast()
    const [data, setData] = useState(initialArticles)
    const [search, setSearch] = useState('')
    const [catFilter, setCatFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [previewItem, setPreviewItem] = useState(null)
    const [form, setForm] = useState({ title: '', category: 'Chăm sóc da', status: 'draft', author: 'Admin', excerpt: '', content: '' })

    const filtered = useMemo(() => {
        let r = data.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
        if (catFilter !== 'all') r = r.filter(a => a.category === catFilter)
        if (statusFilter !== 'all') r = r.filter(a => a.status === statusFilter)
        return r
    }, [data, search, catFilter, statusFilter])

    const openCreate = () => { setEditItem(null); setForm({ title: '', category: 'Chăm sóc da', status: 'draft', author: 'Admin', excerpt: '', content: '' }); setShowModal(true) }
    const openEdit = (a) => { setEditItem(a); setForm({ title: a.title, category: a.category, status: a.status, author: a.author, excerpt: a.excerpt || '', content: '' }); setShowModal(true) }

    const handleSave = () => {
        if (!form.title.trim()) return toast.warning('Nhập tiêu đề bài viết')
        if (editItem) {
            setData(prev => prev.map(a => a.id === editItem.id ? { ...a, ...form } : a))
            toast.success(`Đã cập nhật "${form.title}"`)
        } else {
            setData(prev => [...prev, { id: Date.now(), ...form, date: new Date().toLocaleDateString('vi-VN'), views: 0 }])
            toast.success(`Đã tạo bài viết "${form.title}"`)
        }
        setShowModal(false)
    }
    const handleDelete = () => { setData(prev => prev.filter(a => a.id !== deleteId)); setDeleteId(null); toast.info('Đã xóa bài viết') }
    const togglePublish = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a))
        toast.info('Đã cập nhật trạng thái')
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa bài viết?" message="Bạn có chắc muốn xóa bài viết này?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />
            <div className="page-header">
                <div><h1 className="page-title">Tin Tức & Blog</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý bài viết trên app và website</p></div>
                <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Viết bài mới</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiFileText color="#1a73e8" /></div><div><div className="stat-label">Tổng bài viết</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiFileText color="#28a745" /></div><div><div className="stat-label">Đã xuất bản</div><div className="stat-value">{data.filter(a => a.status === 'published').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiFileText color="#ff9800" /></div><div><div className="stat-label">Bản nháp</div><div className="stat-value">{data.filter(a => a.status === 'draft').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiEye color="#e91e63" /></div><div><div className="stat-label">Tổng lượt xem</div><div className="stat-value">{data.reduce((s, a) => s + a.views, 0).toLocaleString()}</div></div></div>
            </div>

            {/* Popular Articles + Category Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiTrendingUp size={14} color="#e91e63" /> Bài viết phổ biến</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {[...data].sort((a, b) => b.views - a.views).slice(0, 3).map((a, i) => (
                            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: i === 0 ? '#fef3c7' : '#f8f9fa', borderRadius: '8px', border: i === 0 ? '1px solid #fbbf24' : 'none' }}>
                                <span style={{ fontSize: '1.1rem' }}>{['🥇', '🥈', '🥉'][i]}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{a.title}</div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>{a.category} • {a.author}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700, color: '#e91e63' }}>{a.views.toLocaleString()}</div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>lượt xem</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiFileText size={14} color="var(--color-primary)" /> Phân bố danh mục</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {CATEGORIES.map(cat => {
                            const count = data.filter(a => a.category === cat).length
                            const views = data.filter(a => a.category === cat).reduce((s, a) => s + a.views, 0)
                            const maxCount = Math.max(...CATEGORIES.map(c => data.filter(a => a.category === c).length), 1)
                            return (
                                <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setCatFilter(cat)}>
                                    <span style={{ width: '80px', fontSize: '0.75rem', fontWeight: 500 }}>{cat}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${(count / maxCount) * 100}%`, height: '100%', borderRadius: '4px', background: 'var(--color-primary)', transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 600, minWidth: '16px' }}>{count}</span>
                                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', minWidth: '50px' }}>{views.toLocaleString()} views</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm bài viết..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                    <option value="all">Tất cả danh mục</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="draft">Bản nháp</option>
                    <option value="scheduled">Hẹn giờ</option>
                </select>
                {(catFilter !== 'all' || statusFilter !== 'all') && <button className="btn btn-secondary" onClick={() => { setCatFilter('all'); setStatusFilter('all') }}><FiX size={14} /> Xoá lọc</button>}
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Tiêu đề</th><th>Danh mục</th><th>Trạng thái</th><th>Ngày</th><th>Lượt xem</th><th><FiClock size={12} /> Đọc</th><th>Tác giả</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.map(a => (
                            <tr key={a.id} style={{ opacity: a.status === 'draft' ? 0.7 : 1 }}>
                                <td style={{ fontWeight: 600 }}><FiFileText size={12} style={{ marginRight: 4 }} />{a.title}</td>
                                <td><span className="badge badge-processing">{a.category}</span></td>
                                <td>
                                    <span className={`badge badge-${a.status === 'published' ? 'success' : a.status === 'draft' ? 'secondary' : 'warning'}`}
                                        style={{ cursor: 'pointer' }} onClick={() => togglePublish(a.id)}>
                                        {a.status === 'published' ? 'Đã xuất bản' : a.status === 'draft' ? 'Bản nháp' : 'Hẹn giờ'}
                                    </span>
                                </td>
                                <td>{a.date}</td>
                                <td>{a.views.toLocaleString()}</td>
                                <td style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>~{Math.max(1, Math.ceil((a.excerpt?.length || 50) / 100))} phút</td>
                                <td>{a.author}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setPreviewItem(a)} title="Xem"><FiEye size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => openEdit(a)} title="Sửa"><FiEdit2 size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setDeleteId(a.id)} title="Xóa"><FiTrash2 size={13} color="#dc3545" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Preview Modal */}
            {previewItem && (
                <div className="modal-overlay" onClick={() => setPreviewItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>📄 Xem Bài Viết</h2><button className="btn-close" onClick={() => setPreviewItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <h3 style={{ marginBottom: '8px' }}>{previewItem.title}</h3>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>
                                <span>📂 {previewItem.category}</span><span>👤 {previewItem.author}</span><span>📅 {previewItem.date}</span><span>👁 {previewItem.views}</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-text)' }}>{previewItem.excerpt || 'Không có mô tả.'}</p>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setPreviewItem(null)}>Đóng</button><button className="btn btn-primary" onClick={() => { setPreviewItem(null); openEdit(previewItem) }}>Sửa bài viết</button></div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px' }}>
                        <div className="modal-header"><h2>{editItem ? '✏️ Sửa Bài Viết' : '📝 Viết Bài Mới'}</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tiêu đề *</label><input className="form-control" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Nhập tiêu đề bài viết" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Danh mục</label><select className="form-control" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
                                <div className="form-group"><label>Trạng thái</label><select className="form-control" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}><option value="draft">Bản nháp</option><option value="published">Xuất bản</option><option value="scheduled">Hẹn giờ</option></select></div>
                                <div className="form-group"><label>Tác giả</label><input className="form-control" value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} /></div>
                            </div>
                            <div className="form-group"><label>Mô tả ngắn</label><textarea className="form-control" value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} rows="2" placeholder="Tóm tắt nội dung..." /></div>
                            <div className="form-group"><label>Nội dung</label><textarea className="form-control" value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows="6" placeholder="Viết nội dung bài viết..." /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleSave}>{editItem ? 'Cập nhật' : 'Đăng bài'}</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
