import { useState } from 'react'
import { FiSave, FiMessageSquare, FiSettings, FiToggleLeft, FiToggleRight, FiSend, FiClock, FiAlertCircle } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

export default function ConfigSMS() {
    const toast = useToast()
    const [config, setConfig] = useState({
        provider: 'VIETTEL',
        brandName: 'BeautyOS',
        apiKey: '••••••••••••••••',
        smsBalance: 4520,
        autoAppointmentReminder: true,
        reminderHoursBefore: 2,
        autoBirthdayWish: true,
        autoPostCare: true,
        postCareHoursAfter: 24,
        autoExpireNotify: true,
        dailyLimit: 500,
        monthlyBudget: 5000000,
    })
    const [templates, setTemplates] = useState([
        { id: 1, name: 'Nhắc lịch hẹn', content: 'Xin chào {ten}, bạn có lịch hẹn vào {gio} ngày {ngay} tại {chinhanh}. Vui lòng đến đúng giờ!', active: true },
        { id: 2, name: 'Chúc sinh nhật', content: 'BeautyOS chúc mừng sinh nhật {ten}! 🎂 Tặng bạn ưu đãi 20% cho mọi dịch vụ. Áp dụng đến {hethan}.', active: true },
        { id: 3, name: 'Sau điều trị', content: 'Cảm ơn {ten} đã sử dụng dịch vụ {dichvu} tại BeautyOS. Nếu có bất kỳ vấn đề gì, vui lòng liên hệ: {hotline}', active: true },
        { id: 4, name: 'Hết hạn thẻ', content: 'Thẻ {mathe} của bạn sẽ hết hạn vào {ngay}. Liên hệ {hotline} để gia hạn.', active: false },
        { id: 5, name: 'Khuyến mãi', content: '{ten} ơi! BeautyOS có chương trình ưu đãi {tenkm}. Giảm {phantram}% cho {dichvu}. Liên hệ ngay!', active: true },
    ])

    const handleChange = (field, value) => setConfig(prev => ({ ...prev, [field]: value }))
    const toggleTemplate = (id) => setTemplates(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t))

    const Toggle = ({ on, onClick }) => (
        <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: on ? '#28a745' : '#ccc' }}>
            {on ? <FiToggleRight size={24} /> : <FiToggleLeft size={24} />}
        </button>
    )

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Cấu Hình SMS</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Cài đặt gửi tin nhắn SMS/ZNS tự động</p>
                </div>
                <button className="btn btn-primary" onClick={() => toast.success('Đã lưu cấu hình SMS')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiSave size={14} /> Lưu</button>
            </div>

            {/* SMS Balance Banner */}
            <div className="mobile-row" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', borderRadius: '16px', padding: '20px 24px', marginBottom: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Số dư SMS còn lại</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{config.smsBalance.toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Provider</div><div style={{ fontWeight: '700' }}>{config.provider}</div></div>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Brand</div><div style={{ fontWeight: '700' }}>{config.brandName}</div></div>
                </div>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }} onClick={() => toast.info('Liên hệ NCC để nạp thêm')}>Nạp thêm</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* Provider Config */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiSettings size={18} color="var(--color-primary)" /> Nhà cung cấp</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="form-group"><label>Provider</label><select className="form-control" value={config.provider} onChange={e => handleChange('provider', e.target.value)}><option>VIETTEL</option><option>FPT</option><option>VNPT</option><option>Zalo ZNS</option></select></div>
                        <div className="form-group"><label>Brand Name</label><input className="form-control" value={config.brandName} onChange={e => handleChange('brandName', e.target.value)} /></div>
                        <div className="form-group"><label>API Key</label><input className="form-control" type="password" value={config.apiKey} onChange={e => handleChange('apiKey', e.target.value)} /></div>
                    </div>
                </div>

                {/* Auto SMS Settings */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiSend size={18} color="#ff9800" /> Gửi tự động</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Nhắc lịch hẹn</span>
                            <Toggle on={config.autoAppointmentReminder} onClick={() => handleChange('autoAppointmentReminder', !config.autoAppointmentReminder)} />
                        </div>
                        <div className="form-group"><label>Nhắc trước (giờ)</label><input className="form-control" type="number" value={config.reminderHoursBefore} onChange={e => handleChange('reminderHoursBefore', parseInt(e.target.value))} /></div>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Chúc sinh nhật</span>
                            <Toggle on={config.autoBirthdayWish} onClick={() => handleChange('autoBirthdayWish', !config.autoBirthdayWish)} />
                        </div>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Sau điều trị</span>
                            <Toggle on={config.autoPostCare} onClick={() => handleChange('autoPostCare', !config.autoPostCare)} />
                        </div>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Thông báo hết hạn thẻ</span>
                            <Toggle on={config.autoExpireNotify} onClick={() => handleChange('autoExpireNotify', !config.autoExpireNotify)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* SMS Templates */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiMessageSquare size={18} color="#6f42c1" /> Mẫu tin nhắn</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {templates.map(t => (
                        <div key={t.id} style={{
                            padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)',
                            background: t.active ? '#f0fff4' : '#f8f9fa', transition: 'all 0.2s'
                        }}>
                            <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{t.name}</span>
                                    <span className={`badge badge-${t.active ? 'success' : 'secondary'}`} style={{ fontSize: '0.7rem' }}>{t.active ? 'Bật' : 'Tắt'}</span>
                                </div>
                                <Toggle on={t.active} onClick={() => toggleTemplate(t.id)} />
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', background: 'white', padding: '10px 12px', borderRadius: '8px', border: '1px dashed var(--color-border)' }}>{t.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
