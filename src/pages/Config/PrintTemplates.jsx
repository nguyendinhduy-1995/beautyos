import { useState } from 'react'
import { FiPrinter, FiDownload, FiToggleLeft, FiToggleRight, FiEdit2, FiPlus, FiX, FiEye } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialTemplates = [
    { id: 1, name: 'Phiếu thu', description: 'Mẫu in phiếu thu tiền', size: 'A5', status: 'active' },
    { id: 2, name: 'Phiếu chi', description: 'Mẫu in phiếu chi', size: 'A5', status: 'active' },
    { id: 3, name: 'Hoá đơn dịch vụ', description: 'Mẫu hoá đơn cho khách hàng', size: 'A4', status: 'active' },
    { id: 4, name: 'Phiếu xuất kho', description: 'Mẫu phiếu xuất vật tư', size: 'A4', status: 'active' },
    { id: 5, name: 'Phiếu nhập kho', description: 'Mẫu phiếu nhập kho', size: 'A4', status: 'active' },
    { id: 6, name: 'Đơn thuốc', description: 'Mẫu đơn / toa thuốc', size: 'A5', status: 'active' },
    { id: 7, name: 'Phiếu bảo hành', description: 'Mẫu phiếu bảo hành DV', size: 'A5', status: 'inactive' },
    { id: 8, name: 'Thẻ thành viên', description: 'Mẫu in thẻ thành viên', size: 'Custom', status: 'active' },
]

export default function PrintTemplates() {
    const [templates, setTemplates] = useState(initialTemplates)
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const active = templates.filter(t => t.status === 'active').length

    const handleToggle = (id) => {
        setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t))
        toast.info('Đã cập nhật trạng thái mẫu in')
    }

    const handleCreate = () => {
        const name = document.getElementById('tpl-name')?.value?.trim()
        const desc = document.getElementById('tpl-desc')?.value?.trim()
        const size = document.getElementById('tpl-size')?.value
        if (!name) return toast.warning('Vui lòng nhập tên mẫu in')
        const newTpl = {
            id: templates.length + 1, name, description: desc || '', size: size || 'A4', status: 'active'
        }
        setTemplates(prev => [...prev, newTpl])
        setShowModal(false)
        toast.success(`Đã tạo mẫu "${name}"`)
    }

    const handlePreview = (t) => {
        toast.info(`Xem trước mẫu: ${t.name}`)
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Cấu Hình Mẫu In</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý các mẫu in hoá đơn, phiếu thu chi</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Tạo mẫu mới</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPrinter color="#1a73e8" /></div><div><div className="stat-label">Tổng mẫu in</div><div className="stat-value">{templates.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiToggleRight color="#28a745" /></div><div><div className="stat-label">Đang sử dụng</div><div className="stat-value" style={{ color: '#28a745' }}>{active}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiToggleLeft color="#ff9800" /></div><div><div className="stat-label">Đã tắt</div><div className="stat-value" style={{ color: '#ff9800' }}>{templates.length - active}</div></div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {templates.map(t => (
                    <div key={t.id} style={{
                        background: 'white', borderRadius: '12px', padding: '20px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)',
                        opacity: t.status === 'inactive' ? 0.6 : 1, transition: 'all 0.2s'
                    }}
                        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)' }}
                        onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiPrinter color="#1a73e8" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '0.95rem' }}>{t.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{t.size}</span>
                                </div>
                            </div>
                            <span className={`badge badge-${t.status === 'active' ? 'success' : 'secondary'}`}
                                style={{ cursor: 'pointer' }} onClick={() => handleToggle(t.id)}>
                                {t.status === 'active' ? '✓ Đang dùng' : 'Tắt'}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>{t.description}</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-sm btn-secondary" onClick={() => handlePreview(t)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiEye size={12} /> Xem trước</button>
                            <button className="btn btn-sm btn-secondary" onClick={() => toast.info(`Mở chỉnh sửa: ${t.name}`)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiEdit2 size={12} /> Sửa</button>
                            <button className="btn btn-sm btn-secondary" onClick={() => toast.success(`Đã tải mẫu: ${t.name}`)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiDownload size={12} /> Tải</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>Tạo Mẫu In Mới</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên mẫu in *</label><input id="tpl-name" className="form-control" placeholder="VD: Phiếu thanh toán" /></div>
                            <div className="form-group"><label>Mô tả</label><input id="tpl-desc" className="form-control" placeholder="Mô tả mẫu in" /></div>
                            <div className="form-group"><label>Kích thước</label><select id="tpl-size" className="form-control"><option>A4</option><option>A5</option><option>Custom</option></select></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button>
                            <button className="btn btn-primary" onClick={handleCreate}>Tạo mẫu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
