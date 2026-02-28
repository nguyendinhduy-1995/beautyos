import { useState } from 'react'
import { FiX, FiCalendar, FiClock, FiUser } from 'react-icons/fi'

const services = [
    'Nâng cơ Hifu', 'Chăm sóc da mặt', 'Triệt lông laser', 'Filler môi',
    'Botox', 'Mesotherapy', 'PRP trẻ hoá', 'Peel da', 'Laser CO2', 'Điều trị mụn'
]

const staff = [
    'Dr. Thọ', 'BS Công Vũ', 'BS Tuấn Anh', 'BS My', 'BS Hằng',
    'KTV Lan', 'KTV Trang', 'KTV Mai'
]

export default function CreateAppointmentModal({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState({
        customer: '', phone: '', service: services[0], staff: staff[0],
        date: new Date().toISOString().split('T')[0],
        time: '09:00', duration: '60', note: '', isNewCustomer: false
    })

    if (!isOpen) return null

    const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }))

    const handleSubmit = () => {
        if (!form.customer) return
        onSave && onSave(form)
        setForm({
            customer: '', phone: '', service: services[0], staff: staff[0],
            date: new Date().toISOString().split('T')[0],
            time: '09:00', duration: '60', note: '', isNewCustomer: false
        })
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', width: '90%', maxWidth: '700px',
                maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                animation: 'slideUp 0.3s ease'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 24px', borderBottom: '1px solid var(--color-border)',
                    background: 'linear-gradient(135deg, #198754, #20c997)', borderRadius: '16px 16px 0 0', color: 'white'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiCalendar /> Tạo Lịch Hẹn Mới
                        </h2>
                        <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>Đặt lịch hẹn cho khách hàng</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: 'white' }}>
                        <FiX size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                    {/* Customer section */}
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FiUser size={16} /> Thông tin khách hàng
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Tên khách hàng *</label>
                                <input type="text" placeholder="Nhập tên khách hàng" value={form.customer}
                                    onChange={e => handleChange('customer', e.target.value)}
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
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={form.isNewCustomer} onChange={e => handleChange('isNewCustomer', e.target.checked)} />
                            Khách hàng mới
                        </label>
                    </div>

                    {/* Service & Staff */}
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px' }}>Dịch vụ & Nhân viên</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Dịch vụ *</label>
                                <select value={form.service} onChange={e => handleChange('service', e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Nhân viên thực hiện</label>
                                <select value={form.staff} onChange={e => handleChange('staff', e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                    {staff.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FiClock size={16} /> Thời gian
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Ngày hẹn *</label>
                                <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Giờ hẹn *</label>
                                <select value={form.time} onChange={e => handleChange('time', e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                    {Array.from({ length: 24 }, (_, h) => [0, 15, 30, 45].map(m => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)).flat()
                                        .filter(t => t >= '07:00' && t <= '20:00')
                                        .map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Thời lượng (phút)</label>
                                <select value={form.duration} onChange={e => handleChange('duration', e.target.value)}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white', fontFamily: 'inherit' }}>
                                    {['15', '30', '45', '60', '90', '120'].map(d => <option key={d} value={d}>{d} phút</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Ghi chú</label>
                        <textarea placeholder="Thêm ghi chú..." value={form.note}
                            onChange={e => handleChange('note', e.target.value)}
                            style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', minHeight: '70px', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--color-border)', background: '#fafafa', borderRadius: '0 0 16px 16px' }}>
                    <button onClick={onClose} className="btn btn-secondary">Đóng</button>
                    <button onClick={handleSubmit} className="btn btn-primary">Tạo Lịch Hẹn</button>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
            `}</style>
        </div>
    )
}
