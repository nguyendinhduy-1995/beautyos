import { useState } from 'react'
import { FiSave, FiX, FiUser, FiCamera } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ToastProvider'

export default function CreateCustomer() {
    const navigate = useNavigate()
    const toast = useToast()
    const [activeTab, setActiveTab] = useState('general')
    const [form, setForm] = useState({
        gender: 'female', fullName: '', dob: '', phone: '', countryCode: '+84',
        branch: 'CN_1834', group: '', email: '',
        source: 'Khách Vãng Lai', sourceDetail: '', nationality: 'Vietnam', occupation: '',
        address: '', city: '', ward: '', oldCustomer: '',
        createdDate: '', note: '',
        cmnd: '', cmndDate: '', cmndPlace: '',
        consent: true
    })

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const handleSave = () => {
        if (!form.fullName || !form.phone) return toast.warning('Vui lòng nhập họ tên và số điện thoại')
        toast.success(`Đã tạo khách hàng: ${form.fullName}`)
        navigate('/customers/list')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Hồ Sơ Khách Hàng</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Thông tin cá nhân</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/customers/list')}><FiX size={14} /> Đóng</button>
                    <button className="btn btn-primary" onClick={handleSave}><FiSave size={14} /> Lưu</button>
                </div>
            </div>

            {/* Tab nav */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '2px solid var(--color-border)' }}>
                {[{ key: 'general', label: 'Thông tin chung' }, { key: 'other', label: 'Khác' }].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                        padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500',
                        background: activeTab === tab.key ? 'var(--color-primary)' : 'transparent',
                        color: activeTab === tab.key ? 'white' : 'var(--color-text-light)',
                        borderRadius: '8px 8px 0 0', transition: 'all 0.2s'
                    }}>{tab.label}</button>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input type="checkbox" checked={true} readOnly style={{ accentColor: 'var(--color-primary)' }} /> Cho phép chỉnh sửa
                    </label>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '24px' }}>
                {/* Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    {/* Gender */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                        <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <input type="radio" name="gender" checked={form.gender === 'male'} onChange={() => handleChange('gender', 'male')} style={{ accentColor: 'var(--color-primary)' }} /> Nam
                        </label>
                        <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <input type="radio" name="gender" checked={form.gender === 'female'} onChange={() => handleChange('gender', 'female')} style={{ accentColor: 'var(--color-primary)' }} /> Nữ
                        </label>
                    </div>
                    <div style={{ width: '120px', height: '120px', borderRadius: '12px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed var(--color-border)' }}>
                        <FiCamera size={24} color="#999" />
                    </div>
                    <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={false} readOnly style={{ accentColor: 'var(--color-primary)' }} /> Tạo lịch hẹn
                    </label>
                </div>

                {/* Form fields */}
                <div style={{ display: 'grid', gap: '16px' }}>
                    {/* Row 1: Name, DOB, Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div className="form-group"><label>Họ và tên *</label><input className="form-control" placeholder="eg. họ và tên" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} /></div>
                        <div className="form-group"><label>Ngày sinh</label><input className="form-control" type="date" value={form.dob} onChange={e => handleChange('dob', e.target.value)} /></div>
                        <div className="form-group"><label>Số điện thoại *</label>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <select className="form-control" style={{ maxWidth: '80px' }} value={form.countryCode} onChange={e => handleChange('countryCode', e.target.value)}>
                                    <option value="+84">🇻🇳 +84</option><option value="+1">🇺🇸 +1</option><option value="+82">🇰🇷 +82</option>
                                </select>
                                <input className="form-control" placeholder="Số điện thoại" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {/* Row 2: Branch, Group, Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div className="form-group"><label>Chi nhánh</label><select className="form-control" value={form.branch} onChange={e => handleChange('branch', e.target.value)}><option>CN_1834</option></select></div>
                        <div className="form-group"><label>Nhóm khách hàng</label><select className="form-control" value={form.group} onChange={e => handleChange('group', e.target.value)}><option value="">nhóm khách hàng</option><option>VIP</option><option>Gold</option><option>Thường</option></select></div>
                        <div className="form-group"><label>Email</label><input className="form-control" type="email" placeholder="eg. email" value={form.email} onChange={e => handleChange('email', e.target.value)} /></div>
                    </div>
                    {/* Row 3: Source, Source Detail, Nationality, Occupation */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                        <div className="form-group"><label>Nguồn khách hàng</label><select className="form-control" value={form.source} onChange={e => handleChange('source', e.target.value)}><option>Khách Vãng Lai</option><option>Facebook</option><option>Google</option><option>Giới thiệu</option><option>Zalo</option></select></div>
                        <div className="form-group"><label>Nguồn chi tiết</label><input className="form-control" placeholder="nguồn chi tiết" value={form.sourceDetail} onChange={e => handleChange('sourceDetail', e.target.value)} /></div>
                        <div className="form-group"><label>Quốc tịch</label><select className="form-control" value={form.nationality} onChange={e => handleChange('nationality', e.target.value)}><option>Vietnam</option><option>Korea</option><option>Japan</option><option>USA</option></select></div>
                        <div className="form-group"><label>Nghề nghiệp</label><input className="form-control" placeholder="nghề nghiệp" value={form.occupation} onChange={e => handleChange('occupation', e.target.value)} /></div>
                    </div>
                    {/* Row 4: Address, City, Ward, Old customer */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                        <div className="form-group"><label>Địa chỉ</label><input className="form-control" placeholder="eg .địa chỉ" value={form.address} onChange={e => handleChange('address', e.target.value)} /></div>
                        <div className="form-group"><label>Tỉnh/Thành phố</label><select className="form-control" value={form.city} onChange={e => handleChange('city', e.target.value)}><option value="">eg .tỉnh/thành phố</option><option>TP.HCM</option><option>Hà Nội</option><option>Đà Nẵng</option></select></div>
                        <div className="form-group"><label>Phường xã</label><input className="form-control" placeholder="eg .phường xã" value={form.ward} onChange={e => handleChange('ward', e.target.value)} /></div>
                        <div className="form-group"><label>Khách cũ</label><input className="form-control" placeholder="eg. mã khách hàng cũ" value={form.oldCustomer} onChange={e => handleChange('oldCustomer', e.target.value)} /></div>
                    </div>
                    {/* Row 5: Created date */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }}>
                        <div className="form-group"><label>Chỉnh sửa ngày tạo</label><input className="form-control" type="date" value={form.createdDate} onChange={e => handleChange('createdDate', e.target.value)} /></div>
                    </div>
                    {/* Row 6: Note */}
                    <div className="form-group"><label>Ghi chú</label><textarea className="form-control" rows={3} placeholder="eg. ghi chú" value={form.note} onChange={e => handleChange('note', e.target.value)} style={{ resize: 'vertical' }} /></div>

                    {/* CMND/CC Section */}
                    <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid var(--color-border)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>CMND/CC</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>Thông tin CMND/CC</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                            <div className="form-group"><label>CMND/CC</label><input className="form-control" placeholder="eg. cmnd/cc" value={form.cmnd} onChange={e => handleChange('cmnd', e.target.value)} /></div>
                            <div className="form-group"><label>Ngày cấp</label><input className="form-control" type="date" value={form.cmndDate} onChange={e => handleChange('cmndDate', e.target.value)} /></div>
                            <div className="form-group"><label>Nơi cấp</label><input className="form-control" placeholder="eg. nơi cấp" value={form.cmndPlace} onChange={e => handleChange('cmndPlace', e.target.value)} /></div>
                        </div>
                    </div>

                    {/* Consent */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.consent} onChange={e => handleChange('consent', e.target.checked)} style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
                        Thỏa thuận khách hàng ...
                    </label>
                </div>
            </div>
        </div>
    )
}
