import { useState } from 'react'
import { FiX, FiCamera } from 'react-icons/fi'

export default function CreateCustomerModal({ isOpen, onClose }) {
    const [tab, setTab] = useState('Thông tin chung')
    const [form, setForm] = useState({
        gender: 'Nam', name: '', dob: '', phone: '', email: '',
        branch: 'CN_1834', group: '', source: 'Khách Vãng Lai', sourceDetail: '',
        nationality: 'Vietnam', occupation: '', address: '', city: '', ward: '',
        oldCustomer: false, oldCustomerCode: '', editDate: false, createDate: '',
        note: '', cmnd: '', cmndDate: '', cmndPlace: '',
        createAppointment: false, allowEdit: true
    })

    if (!isOpen) return null

    const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }))

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
        }}>
            <div style={{
                background: 'white', borderRadius: '12px', width: '90%', maxWidth: '900px',
                maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                animation: 'slideUp 0.3s ease'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Hồ sơ khách hàng</h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Thông tin cá nhân</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {['Thông tin chung', 'Khác'].map(t => (
                                <button key={t} onClick={() => setTab(t)}
                                    style={{
                                        padding: '6px 16px', borderRadius: '6px', border: '1px solid var(--color-border)',
                                        background: tab === t ? 'var(--color-primary)' : 'white',
                                        color: tab === t ? 'white' : 'var(--color-text)',
                                        cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500'
                                    }}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                            <FiX size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                    {tab === 'Thông tin chung' && (
                        <>
                            {/* Avatar + Gender + options row */}
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div style={{
                                    width: '100px', height: '100px', background: '#f0f0f0', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                    flexShrink: 0, border: '2px dashed #ddd'
                                }}>
                                    <FiCamera size={24} color="#999" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                        {['Nam', 'Nữ'].map(g => (
                                            <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                                <input type="radio" name="gender" checked={form.gender === g} onChange={() => handleChange('gender', g)} />
                                                {g}
                                            </label>
                                        ))}
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.85rem', marginLeft: '16px' }}>
                                            <input type="checkbox" checked={form.createAppointment} onChange={e => handleChange('createAppointment', e.target.checked)} />
                                            Tạo lịch hẹn
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                            <input type="checkbox" checked={form.allowEdit} onChange={e => handleChange('allowEdit', e.target.checked)} />
                                            Cho phép chỉnh sửa
                                        </label>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                        <InputField label="Họ và tên" placeholder="Họ và tên" value={form.name} onChange={v => handleChange('name', v)} />
                                        <InputField label="Ngày sinh" placeholder="dd-mm-yyyy" type="date" value={form.dob} onChange={v => handleChange('dob', v)} />
                                        <InputField label="Số điện thoại" placeholder="Số điện thoại" value={form.phone} onChange={v => handleChange('phone', v)} />
                                    </div>
                                </div>
                            </div>

                            {/* Info hint */}
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginBottom: '16px' }}>ℹ️ Hướng dẫn</p>

                            {/* Row 2 */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                <SelectField label="Chi nhánh" value={form.branch} options={['CN_1834']} onChange={v => handleChange('branch', v)} />
                                <SelectField label="Nhóm khách hàng" value={form.group} options={['nhóm khách hàng']} onChange={v => handleChange('group', v)} />
                                <InputField label="Email" placeholder="email" value={form.email} onChange={v => handleChange('email', v)} />
                            </div>

                            {/* Row 3 */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                <SelectField label="Nguồn khách hàng" value={form.source} options={['Khách Vãng Lai', 'Facebook', 'Google', 'Giới thiệu']} onChange={v => handleChange('source', v)} />
                                <InputField label="Nguồn chi tiết" placeholder="nguồn chi tiết" value={form.sourceDetail} onChange={v => handleChange('sourceDetail', v)} />
                                <SelectField label="Quốc tịch" value={form.nationality} options={['Vietnam', 'Other']} onChange={v => handleChange('nationality', v)} />
                                <SelectField label="Nghề nghiệp" value={form.occupation} options={['nghề nghiệp']} onChange={v => handleChange('occupation', v)} />
                            </div>

                            {/* Row 4 - Address */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                <InputField label="Địa chỉ" placeholder="địa chỉ" value={form.address} onChange={v => handleChange('address', v)} />
                                <SelectField label="Tỉnh/Thành phố" value={form.city} options={['Tỉnh/thành phố']} onChange={v => handleChange('city', v)} />
                                <InputField label="Phường xã" placeholder="phường xã" value={form.ward} onChange={v => handleChange('ward', v)} />
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Khách cũ</label>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <input type="checkbox" checked={form.oldCustomer} onChange={e => handleChange('oldCustomer', e.target.checked)} />
                                        <input type="text" placeholder="mã khách hàng cũ" disabled={!form.oldCustomer}
                                            value={form.oldCustomerCode} onChange={e => handleChange('oldCustomerCode', e.target.value)}
                                            style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Edit date */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Chỉnh sửa ngày tạo</label>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
                                    <input type="checkbox" checked={form.editDate} onChange={e => handleChange('editDate', e.target.checked)} />
                                    <input type="date" disabled={!form.editDate}
                                        value={form.createDate} onChange={e => handleChange('createDate', e.target.value)}
                                        style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', flex: 1 }}
                                    />
                                </div>
                            </div>

                            {/* Note */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Ghi chú</label>
                                <textarea placeholder="ghi chú" value={form.note} onChange={e => handleChange('note', e.target.value)}
                                    style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                                />
                            </div>

                            {/* CMND/CC section */}
                            <div style={{ background: '#f8fafb', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                                <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>CMND/CC</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>Thông tin CMND/CC</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                    <InputField label="CMND/CC" placeholder="cmnd/cc" value={form.cmnd} onChange={v => handleChange('cmnd', v)} />
                                    <InputField label="Ngày cấp" placeholder="dd-mm-yyyy" type="date" value={form.cmndDate} onChange={v => handleChange('cmndDate', v)} />
                                    <InputField label="Nơi cấp" placeholder="nơi cấp" value={form.cmndPlace} onChange={v => handleChange('cmndPlace', v)} />
                                </div>
                            </div>

                            {/* Agreement */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
                                <span style={{ fontSize: '0.85rem' }}>Thỏa thuận khách hàng ...</span>
                            </label>
                        </>
                    )}

                    {tab === 'Khác' && (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-light)' }}>
                            <p>Thông tin bổ sung sẽ được thêm ở đây</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                    <button onClick={onClose} className="btn btn-secondary">Đóng</button>
                    <button className="btn btn-primary">Lưu</button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
            `}</style>
        </div>
    )
}

function InputField({ label, placeholder, value, onChange, type = 'text' }) {
    return (
        <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'inherit' }}
            />
        </div>
    )
}

function SelectField({ label, value, options, onChange }) {
    return (
        <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>{label}</label>
            <select value={value} onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem', background: 'white', fontFamily: 'inherit' }}>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    )
}
