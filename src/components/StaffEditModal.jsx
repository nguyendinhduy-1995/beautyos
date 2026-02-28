import { useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function StaffEditModal({ isOpen, onClose, staff, onSave }) {
    const [form, setForm] = useState(staff || {
        name: '', phone: '', email: '', role: 'Kỹ thuật viên',
        branch: 'CN_1834', startDate: '', salary: 0, status: 'Đang làm'
    })

    if (!isOpen) return null

    const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }))

    const handleSubmit = () => {
        if (!form.name) return
        onSave && onSave(form)
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', width: '90%', maxWidth: '650px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{staff ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên Mới'}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Họ và tên *</label>
                            <input type="text" placeholder="Nhập họ tên" value={form.name}
                                onChange={e => handleChange('name', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Số điện thoại</label>
                            <input type="tel" placeholder="Nhập số điện thoại" value={form.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Email</label>
                            <input type="email" placeholder="Nhập email" value={form.email}
                                onChange={e => handleChange('email', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Chức danh</label>
                            <select value={form.role} onChange={e => handleChange('role', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                <option value="Bác sĩ">Bác sĩ</option>
                                <option value="Kỹ thuật viên">Kỹ thuật viên</option>
                                <option value="Lễ tân">Lễ tân</option>
                                <option value="Quản lý">Quản lý</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Chi nhánh</label>
                            <select value={form.branch} onChange={e => handleChange('branch', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                <option value="CN_1834">CN_1834</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Ngày vào làm</label>
                            <input type="date" value={form.startDate}
                                onChange={e => handleChange('startDate', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Lương cơ bản (VNĐ)</label>
                            <input type="number" placeholder="0" value={form.salary}
                                onChange={e => handleChange('salary', Number(e.target.value))}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Trạng thái</label>
                            <select value={form.status} onChange={e => handleChange('status', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                <option value="Đang làm">Đang làm</option>
                                <option value="Nghỉ việc">Nghỉ việc</option>
                            </select>
                        </div>
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
