import { useState } from 'react'
import { FiSave, FiX, FiUser, FiCamera, FiPhone, FiMail, FiMapPin, FiFileText, FiCalendar, FiTag, FiGlobe, FiBriefcase, FiCreditCard } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ToastProvider'

export default function CreateCustomer() {
    const navigate = useNavigate()
    const toast = useToast()
    const [activeTab, setActiveTab] = useState('general')
    const [form, setForm] = useState({
        gender: 'female', fullName: '', dob: '', phone: '', countryCode: '+84',
        branch: 'Chi nhánh chính', group: '', email: '',
        source: 'Khách Vãng Lai', sourceDetail: '', nationality: 'Việt Nam', occupation: '',
        address: '', city: '', district: '', ward: '', oldCustomer: '',
        createdDate: '', note: '',
        cmnd: '', cmndDate: '', cmndPlace: '',
        consent: true, createAppointment: false,
    })

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const handleSave = () => {
        if (!form.fullName || !form.phone) return toast.warning('Vui lòng nhập họ tên và số điện thoại')
        toast.success(`Đã tạo khách hàng: ${form.fullName}`)
        navigate('/customers/list')
    }

    const Field = ({ label, icon: Icon, required, children }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                {Icon && <Icon size={13} color="#94a3b8" />}
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>
            {children}
        </div>
    )

    const inputStyle = {
        width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
        borderRadius: 10, fontSize: '0.88rem', fontFamily: 'inherit',
        outline: 'none', transition: 'all 0.2s', background: '#fafbfc',
    }

    const focusProps = {
        onFocus: e => { e.target.style.borderColor = '#20c997'; e.target.style.boxShadow = '0 0 0 3px rgba(32,201,151,0.08)'; e.target.style.background = 'white' },
        onBlur: e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#fafbfc' }
    }

    const SectionTitle = ({ icon: Icon, title, desc }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid #f1f5f9' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #20c997, #198754)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} color="white" />
            </div>
            <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{title}</div>
                {desc && <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{desc}</div>}
            </div>
        </div>
    )

    return (
        <div className="page-container">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Tạo Hồ Sơ Khách Hàng</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0' }}>Điền thông tin để tạo hồ sơ khách hàng mới</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => navigate('/customers/list')} style={{
                        padding: '10px 20px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                        background: 'white', color: '#475569', fontSize: '0.88rem', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
                    }}><FiX size={15} /> Hủy</button>
                    <button onClick={handleSave} style={{
                        padding: '10px 24px', borderRadius: 10, border: 'none',
                        background: 'linear-gradient(135deg, #198754, #20c997)', color: 'white',
                        fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
                        boxShadow: '0 4px 14px rgba(25,135,84,0.25)',
                    }}><FiSave size={15} /> Lưu hồ sơ</button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                {[{ key: 'general', label: 'Thông tin chung', icon: FiUser }, { key: 'identity', label: 'Giấy tờ tùy thân', icon: FiCreditCard }].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                        padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                        background: activeTab === tab.key ? 'linear-gradient(135deg, #198754, #20c997)' : 'transparent',
                        color: activeTab === tab.key ? 'white' : '#64748b',
                        borderRadius: 10, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
                        boxShadow: activeTab === tab.key ? '0 4px 12px rgba(25,135,84,0.2)' : 'none',
                    }}><tab.icon size={14} />{tab.label}</button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28 }}>
                {/* Left - Avatar & Options */}
                <div style={{
                    background: 'white', borderRadius: 16, padding: 24, border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                }}>
                    {/* Gender toggle */}
                    <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1.5px solid #e2e8f0', width: '100%' }}>
                        {[{ k: 'male', l: '👨 Nam' }, { k: 'female', l: '👩 Nữ' }].map(g => (
                            <button key={g.k} onClick={() => handleChange('gender', g.k)} style={{
                                flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
                                background: form.gender === g.k ? '#20c997' : 'white',
                                color: form.gender === g.k ? 'white' : '#64748b',
                                transition: 'all 0.2s',
                            }}>{g.l}</button>
                        ))}
                    </div>

                    {/* Avatar */}
                    <div style={{
                        width: 140, height: 140, borderRadius: 16, background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', border: '2.5px dashed #cbd5e1', transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#20c997'; e.currentTarget.style.background = '#f0fdf4' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }}>
                        <FiCamera size={28} color="#94a3b8" />
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 6 }}>Tải ảnh lên</span>
                    </div>

                    {/* Quick options */}
                    <label style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: '100%', padding: '10px 12px', borderRadius: 10, background: '#f8fafc' }}>
                        <input type="checkbox" checked={form.createAppointment} onChange={e => handleChange('createAppointment', e.target.checked)} style={{ accentColor: '#20c997', width: 16, height: 16 }} />
                        <span style={{ fontWeight: 500 }}>Tạo lịch hẹn ngay</span>
                    </label>
                </div>

                {/* Right - Form */}
                <div style={{
                    background: 'white', borderRadius: 16, padding: 28, border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    {activeTab === 'general' ? (
                        <>
                            <SectionTitle icon={FiUser} title="Thông tin cá nhân" desc="Họ tên, ngày sinh, liên hệ" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                                <Field label="Họ và tên" icon={FiUser} required>
                                    <input style={inputStyle} placeholder="Nguyễn Văn A" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Ngày sinh" icon={FiCalendar}>
                                    <input type="date" style={inputStyle} value={form.dob} onChange={e => handleChange('dob', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Số điện thoại" icon={FiPhone} required>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <select style={{ ...inputStyle, maxWidth: 85, padding: '10px 8px' }} value={form.countryCode} onChange={e => handleChange('countryCode', e.target.value)} {...focusProps}>
                                            <option value="+84">🇻🇳 +84</option>
                                            <option value="+1">🇺🇸 +1</option>
                                            <option value="+82">🇰🇷 +82</option>
                                        </select>
                                        <input style={inputStyle} placeholder="0912 345 678" value={form.phone} onChange={e => handleChange('phone', e.target.value)} {...focusProps} />
                                    </div>
                                </Field>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
                                <Field label="Chi nhánh" icon={FiMapPin}>
                                    <select style={inputStyle} value={form.branch} onChange={e => handleChange('branch', e.target.value)} {...focusProps}>
                                        <option>Chi nhánh chính</option><option>Chi nhánh 2</option><option>Chi nhánh 3</option>
                                    </select>
                                </Field>
                                <Field label="Nhóm khách hàng" icon={FiTag}>
                                    <select style={inputStyle} value={form.group} onChange={e => handleChange('group', e.target.value)} {...focusProps}>
                                        <option value="">— Chọn nhóm —</option><option>VIP</option><option>Gold</option><option>Silver</option><option>Thường</option>
                                    </select>
                                </Field>
                                <Field label="Email" icon={FiMail}>
                                    <input type="email" style={inputStyle} placeholder="email@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} {...focusProps} />
                                </Field>
                            </div>

                            <SectionTitle icon={FiGlobe} title="Nguồn & Nghề nghiệp" desc="Thông tin bổ sung" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
                                <Field label="Nguồn khách hàng" icon={FiGlobe}>
                                    <select style={inputStyle} value={form.source} onChange={e => handleChange('source', e.target.value)} {...focusProps}>
                                        {['Khách Vãng Lai', 'Facebook', 'Google', 'Giới thiệu', 'Zalo', 'TikTok', 'Website', 'Hotline'].map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </Field>
                                <Field label="Nguồn chi tiết">
                                    <input style={inputStyle} placeholder="VD: Fanpage ABC" value={form.sourceDetail} onChange={e => handleChange('sourceDetail', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Quốc tịch" icon={FiGlobe}>
                                    <input style={inputStyle} placeholder="VD: Việt Nam" value={form.nationality} onChange={e => handleChange('nationality', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Nghề nghiệp" icon={FiBriefcase}>
                                    <input style={inputStyle} placeholder="VD: Kinh doanh" value={form.occupation} onChange={e => handleChange('occupation', e.target.value)} {...focusProps} />
                                </Field>
                            </div>

                            <SectionTitle icon={FiMapPin} title="Địa chỉ" desc="Nơi ở hiện tại" />
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                                <Field label="Địa chỉ" icon={FiMapPin}>
                                    <input style={inputStyle} placeholder="Số nhà, tên đường" value={form.address} onChange={e => handleChange('address', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Tỉnh/Thành phố">
                                    <input style={inputStyle} placeholder="VD: TP. Hồ Chí Minh" value={form.city} onChange={e => handleChange('city', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Quận/Huyện">
                                    <input style={inputStyle} placeholder="VD: Quận 1" value={form.district} onChange={e => handleChange('district', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Phường/Xã">
                                    <input style={inputStyle} placeholder="VD: Phường Bến Nghé" value={form.ward} onChange={e => handleChange('ward', e.target.value)} {...focusProps} />
                                </Field>
                            </div>

                            {/* Note */}
                            <Field label="Ghi chú" icon={FiFileText}>
                                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} placeholder="Ghi chú thêm về khách hàng..." value={form.note} onChange={e => handleChange('note', e.target.value)} {...focusProps} />
                            </Field>
                        </>
                    ) : (
                        <>
                            <SectionTitle icon={FiCreditCard} title="CMND / CCCD" desc="Thông tin giấy tờ tùy thân" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                                <Field label="Số CMND/CCCD" icon={FiCreditCard}>
                                    <input style={inputStyle} placeholder="VD: 079123456789" value={form.cmnd} onChange={e => handleChange('cmnd', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Ngày cấp" icon={FiCalendar}>
                                    <input type="date" style={inputStyle} value={form.cmndDate} onChange={e => handleChange('cmndDate', e.target.value)} {...focusProps} />
                                </Field>
                                <Field label="Nơi cấp" icon={FiMapPin}>
                                    <input style={inputStyle} placeholder="VD: Cục CSQLHC" value={form.cmndPlace} onChange={e => handleChange('cmndPlace', e.target.value)} {...focusProps} />
                                </Field>
                            </div>

                            <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 16, border: '1px solid #bbf7d0' }}>
                                <label style={{ fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.consent} onChange={e => handleChange('consent', e.target.checked)} style={{ accentColor: '#20c997', width: 18, height: 18 }} />
                                    <span style={{ fontWeight: 600 }}>Khách hàng đồng ý với chính sách bảo mật thông tin cá nhân</span>
                                </label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
