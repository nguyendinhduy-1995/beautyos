import { useState } from 'react'
import { FiSave, FiSmartphone, FiImage, FiClock, FiMapPin, FiPhone, FiGlobe, FiCheck, FiBell, FiInstagram, FiLink } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

export default function MobileConfig() {
    const toast = useToast()
    const [config, setConfig] = useState({
        appName: 'BeautyOS Spa',
        primaryColor: '#1a73e8',
        enableBooking: true,
        enableProducts: true,
        enableLoyalty: true,
        enableChat: false,
        enableNotifications: true,
        enableSmsReminder: true,
        enableEmailReceipt: false,
        workHours: '08:00 - 20:00',
        address: '123 Nguyễn Huệ, Q.1, TP.HCM',
        phone: '0901234567',
        website: 'https://beautyos.vn',
        bookingNote: 'Vui lòng đặt trước 2 giờ',
        welcomeMsg: 'Chào mừng đến với BeautyOS Spa!',
        facebook: 'https://facebook.com/beautyos',
        instagram: '@beautyos_spa',
        zalo: '0901234567',
    })

    const handleChange = (key, value) => setConfig(prev => ({ ...prev, [key]: value }))
    const handleSave = () => toast.success('Đã lưu cấu hình')

    const Toggle = ({ checked, onChange }) => (
        <div onClick={() => onChange(!checked)} style={{ width: '48px', height: '26px', borderRadius: '13px', background: checked ? '#28a745' : '#ccc', cursor: 'pointer', padding: '3px', transition: 'all 0.2s' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', transform: checked ? 'translateX(22px)' : 'translateX(0)', transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
        </div>
    )

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Cấu Hình App & Website</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Thiết lập thông tin hiển thị trên ứng dụng</p></div>
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiSave size={14} /> Lưu cấu hình</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '20px' }}>
                {/* Thông tin chung */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiSmartphone color="var(--color-primary)" /> Thông tin chung</h3>
                    <div className="form-group"><label>Tên ứng dụng</label><input className="form-control" value={config.appName} onChange={e => handleChange('appName', e.target.value)} /></div>
                    <div className="form-group"><label>Màu chủ đạo</label><div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><input type="color" value={config.primaryColor} onChange={e => handleChange('primaryColor', e.target.value)} style={{ width: '40px', height: '36px', border: 'none', cursor: 'pointer' }} /><input className="form-control" value={config.primaryColor} readOnly style={{ flex: 1 }} /></div></div>
                    <div className="form-group"><label>Tin nhắn chào mừng</label><textarea className="form-control" rows="2" value={config.welcomeMsg} onChange={e => handleChange('welcomeMsg', e.target.value)} /></div>
                </div>

                {/* Tính năng */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiCheck color="var(--color-primary)" /> Tính năng App</h3>
                    {[
                        { key: 'enableBooking', label: 'Cho phép đặt lịch online' },
                        { key: 'enableProducts', label: 'Hiển thị sản phẩm' },
                        { key: 'enableLoyalty', label: 'Chương trình tích điểm' },
                        { key: 'enableChat', label: 'Chat trực tuyến' },
                    ].map(f => (
                        <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ fontWeight: '500' }}>{f.label}</span>
                            <Toggle checked={config[f.key]} onChange={v => handleChange(f.key, v)} />
                        </div>
                    ))}
                </div>

                {/* Liên hệ */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiMapPin color="var(--color-primary)" /> Thông tin liên hệ</h3>
                    <div className="form-group"><label><FiMapPin size={12} /> Địa chỉ</label><input className="form-control" value={config.address} onChange={e => handleChange('address', e.target.value)} /></div>
                    <div className="form-group"><label><FiPhone size={12} /> Số điện thoại</label><input className="form-control" value={config.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                    <div className="form-group"><label><FiGlobe size={12} /> Website</label><input className="form-control" value={config.website} onChange={e => handleChange('website', e.target.value)} /></div>
                </div>

                {/* Đặt lịch */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiClock color="var(--color-primary)" /> Thiết lập đặt lịch</h3>
                    <div className="form-group"><label>Giờ làm việc</label><input className="form-control" value={config.workHours} onChange={e => handleChange('workHours', e.target.value)} /></div>
                    <div className="form-group"><label>Lưu ý đặt lịch</label><textarea className="form-control" rows="2" value={config.bookingNote} onChange={e => handleChange('bookingNote', e.target.value)} /></div>
                </div>

                {/* Thông báo */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiBell color="var(--color-primary)" /> Cài đặt thông báo</h3>
                    {[
                        { key: 'enableNotifications', label: 'Đẩy thông báo (Push)' },
                        { key: 'enableSmsReminder', label: 'SMS nhắc lịch hẹn' },
                        { key: 'enableEmailReceipt', label: 'Gửi hóa đơn qua Email' },
                    ].map(f => (
                        <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ fontWeight: '500' }}>{f.label}</span>
                            <Toggle checked={config[f.key]} onChange={v => handleChange(f.key, v)} />
                        </div>
                    ))}
                </div>

                {/* Mạng xã hội */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiLink color="var(--color-primary)" /> Mạng xã hội</h3>
                    <div className="form-group"><label><FiGlobe size={12} /> Facebook</label><input className="form-control" value={config.facebook} onChange={e => handleChange('facebook', e.target.value)} /></div>
                    <div className="form-group"><label><FiInstagram size={12} /> Instagram</label><input className="form-control" value={config.instagram} onChange={e => handleChange('instagram', e.target.value)} /></div>
                    <div className="form-group"><label>💬 Zalo</label><input className="form-control" value={config.zalo} onChange={e => handleChange('zalo', e.target.value)} /></div>
                </div>

                {/* App Preview */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1rem' }}><FiSmartphone color="var(--color-primary)" /> Xem trước App</h3>
                    <div style={{ width: '220px', margin: '0 auto', border: '3px solid #333', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                        {/* Status bar */}
                        <div className="mobile-row" style={{ background: '#333', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.6rem' }}>
                            <span>9:41</span><span>●●●● 📶</span>
                        </div>
                        {/* Header */}
                        <div style={{ background: config.primaryColor, color: 'white', padding: '16px 14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{config.appName}</div>
                            <div style={{ fontSize: '0.62rem', marginTop: '4px', opacity: 0.85 }}>{config.welcomeMsg}</div>
                        </div>
                        {/* Menu grid */}
                        <div style={{ padding: '12px', background: '#f8f9fa', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[config.enableBooking && '📅 Đặt lịch', config.enableProducts && '🛒 Sản phẩm', config.enableLoyalty && '🌟 Tích điểm', config.enableChat && '💬 Chat'].filter(Boolean).map((item, i) => (
                                <div key={i} style={{ background: 'white', padding: '10px 8px', borderRadius: '8px', textAlign: 'center', fontSize: '0.68rem', fontWeight: 500, boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>{item}</div>
                            ))}
                        </div>
                        {/* Footer */}
                        <div style={{ padding: '8px 14px', background: '#f0f0f0', fontSize: '0.58rem', color: '#999', textAlign: 'center' }}>
                            {config.phone} • {config.workHours}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
