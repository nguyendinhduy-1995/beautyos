import { useState } from 'react'
import { FiImage, FiPlus, FiEdit2, FiTrash2, FiMove, FiEye, FiX, FiUpload } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialBanners = [
    { id: 1, title: 'Khuyến mãi tháng 3', position: 'Trang chủ', status: 'active', order: 1, views: 1520, clicks: 234, link: '/promo/thang3', image: '🖼️' },
    { id: 2, title: 'Combo Nâng cơ Hifu', position: 'Trang chủ', status: 'active', order: 2, views: 890, clicks: 156, link: '/service/hifu', image: '💆' },
    { id: 3, title: 'Ưu đãi thẻ thành viên', position: 'Dịch vụ', status: 'active', order: 1, views: 650, clicks: 89, link: '/cards', image: '💳' },
    { id: 4, title: 'Tết Nguyên Đán 2026', position: 'Trang chủ', status: 'inactive', order: 3, views: 3200, clicks: 456, link: '/tet2026', image: '🧧' },
    { id: 5, title: 'Khai trương chi nhánh 2', position: 'Pop-up', status: 'scheduled', order: 1, views: 0, clicks: 0, link: '/branch2', image: '🎉' },
]

export default function MobileBanner() {
    const toast = useToast()
    const [data, setData] = useState(initialBanners)
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [form, setForm] = useState({ title: '', position: 'Trang chủ', status: 'active', link: '' })

    const openCreate = () => { setEditItem(null); setForm({ title: '', position: 'Trang chủ', status: 'active', link: '' }); setShowModal(true) }
    const openEdit = (b) => { setEditItem(b); setForm({ title: b.title, position: b.position, status: b.status, link: b.link || '' }); setShowModal(true) }

    const handleSave = () => {
        if (!form.title.trim()) return toast.warning('Nhập tiêu đề banner')
        if (editItem) {
            setData(prev => prev.map(b => b.id === editItem.id ? { ...b, ...form } : b))
            toast.success(`Đã cập nhật "${form.title}"`)
        } else {
            setData(prev => [...prev, { id: Date.now(), ...form, order: prev.length + 1, views: 0, clicks: 0, image: '🖼️' }])
            toast.success(`Đã thêm banner "${form.title}"`)
        }
        setShowModal(false)
    }
    const handleDelete = () => {
        setData(prev => prev.filter(b => b.id !== deleteId))
        setDeleteId(null); toast.info('Đã xóa banner')
    }
    const toggleStatus = (id) => {
        setData(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b))
        toast.info('Đã cập nhật trạng thái')
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa banner?" message="Bạn có chắc muốn xóa banner này?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />
            <div className="page-header">
                <div><h1 className="page-title">Quản Lý Banner</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Cấu hình banner hiển thị trên app và website</p></div>
                <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Thêm banner</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiImage color="#28a745" /></div><div><div className="stat-label">Đang hiển thị</div><div className="stat-value">{data.filter(b => b.status === 'active').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiEye color="#ff9800" /></div><div><div className="stat-label">Tổng lượt xem</div><div className="stat-value">{data.reduce((s, b) => s + b.views, 0).toLocaleString()}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiImage color="#1a73e8" /></div><div><div className="stat-label">Tổng click</div><div className="stat-value">{data.reduce((s, b) => s + b.clicks, 0).toLocaleString()}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiImage color="#e91e63" /></div><div><div className="stat-label">Tổng banner</div><div className="stat-value">{data.length}</div></div></div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>Tiêu đề</th><th>Vị trí</th><th>Trạng thái</th><th>Lượt xem</th><th>Lượt click</th><th>CTR</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {data.map(b => (
                            <tr key={b.id} style={{ opacity: b.status === 'inactive' ? 0.6 : 1 }}>
                                <td><FiMove color="var(--color-text-light)" style={{ cursor: 'grab' }} /></td>
                                <td style={{ fontWeight: 600 }}><span style={{ marginRight: '6px' }}>{b.image}</span>{b.title}</td>
                                <td><span className="badge badge-processing">{b.position}</span></td>
                                <td>
                                    <span className={`badge badge-${b.status === 'active' ? 'success' : b.status === 'scheduled' ? 'warning' : 'secondary'}`}
                                        style={{ cursor: 'pointer' }} onClick={() => toggleStatus(b.id)}>
                                        {b.status === 'active' ? 'Hiển thị' : b.status === 'scheduled' ? 'Hẹn giờ' : 'Ẩn'}
                                    </span>
                                </td>
                                <td>{b.views.toLocaleString()}</td>
                                <td>{b.clicks.toLocaleString()}</td>
                                <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{b.views ? ((b.clicks / b.views) * 100).toFixed(1) + '%' : '—'}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => openEdit(b)} title="Sửa"><FiEdit2 size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setDeleteId(b.id)} title="Xóa"><FiTrash2 size={13} color="#dc3545" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>{editItem ? '✏️ Sửa Banner' : '🖼️ Thêm Banner'}</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tiêu đề *</label><input className="form-control" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="VD: Khuyến mãi tháng 3" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Vị trí</label><select className="form-control" value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}><option>Trang chủ</option><option>Dịch vụ</option><option>Pop-up</option><option>Sidebar</option></select></div>
                                <div className="form-group"><label>Trạng thái</label><select className="form-control" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}><option value="active">Hiển thị</option><option value="inactive">Ẩn</option><option value="scheduled">Hẹn giờ</option></select></div>
                            </div>
                            <div className="form-group"><label>Link liên kết</label><input className="form-control" value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))} placeholder="/promo/example" /></div>
                            <div style={{ border: '2px dashed var(--color-border)', borderRadius: '10px', padding: '30px', textAlign: 'center', color: 'var(--color-text-light)' }}>
                                <FiUpload size={24} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '0.85rem' }}>Kéo thả hoặc click để tải ảnh banner</div><div style={{ fontSize: '0.72rem' }}>PNG, JPG tối đa 2MB • Kích thước khuyến nghị: 1200x400</div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleSave}>{editItem ? 'Cập nhật' : 'Thêm'}</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
