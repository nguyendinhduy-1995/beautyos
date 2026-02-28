import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { formatCurrency } from '../data/mockData'

export default function ServiceEditModal({ isOpen, onClose, service, onSave }) {
    const [form, setForm] = useState(service || {
        name: '', category: '', price: 0, duration: 30, description: '', status: 'active'
    })

    if (!isOpen) return null

    const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }))

    const handleSubmit = () => {
        onSave && onSave(form)
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', width: '90%', maxWidth: '600px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{service ? 'Chỉnh Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới'}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Tên dịch vụ *</label>
                        <input type="text" placeholder="Nhập tên dịch vụ" value={form.name}
                            onChange={e => handleChange('name', e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Danh mục</label>
                            <select value={form.category} onChange={e => handleChange('category', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                <option value="Da liễu">Da liễu</option>
                                <option value="Thẩm mỹ">Thẩm mỹ</option>
                                <option value="Spa">Spa</option>
                                <option value="Laser">Laser</option>
                                <option value="Tóc">Tóc</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Trạng thái</label>
                            <select value={form.status} onChange={e => handleChange('status', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                <option value="active">Đang hoạt động</option>
                                <option value="inactive">Ngừng hoạt động</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Giá dịch vụ (VNĐ) *</label>
                            <input type="number" placeholder="0" value={form.price}
                                onChange={e => handleChange('price', Number(e.target.value))}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Thời lượng (phút)</label>
                            <input type="number" placeholder="30" value={form.duration}
                                onChange={e => handleChange('duration', Number(e.target.value))}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Mô tả</label>
                        <textarea placeholder="Mô tả dịch vụ..." value={form.description || ''}
                            onChange={e => handleChange('description', e.target.value)}
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                    <button onClick={onClose} className="btn btn-secondary">Hủy</button>
                    <button onClick={handleSubmit} className="btn btn-primary">Lưu</button>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
            `}</style>
        </div>
    )
}
