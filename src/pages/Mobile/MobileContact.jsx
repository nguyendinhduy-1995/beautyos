import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiSave, FiClock, FiGlobe, FiSmartphone, FiExternalLink } from 'react-icons/fi'

export default function MobileContact() {
    const [info, setInfo] = useState({
        name: 'BeautyOS Clinic', phone: '0901234567', hotline: '1900 1234',
        email: 'contact@beautyos.vn', address: '123 Nguyễn Huệ, Q.1, TP.HCM',
        hours: '08:00 - 20:00', mapUrl: 'https://maps.google.com', zalo: '0901234567',
        facebook: 'facebook.com/beautyos', instagram: '@beautyos_clinic', website: 'beautyos.vn'
    })
    const [saved, setSaved] = useState(false)
    const socialLinks = [
        { key: 'zalo', label: 'Zalo', icon: '💬', color: '#0068ff' },
        { key: 'facebook', label: 'Facebook', icon: '📘', color: '#1877f2' },
        { key: 'instagram', label: 'Instagram', icon: '📸', color: '#e4405f' }
    ]

    return (
        <div className="fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><h2>Thông Tin Liên Hệ</h2><p>Cấu hình thông tin liên hệ hiển thị trên app & website</p></div>
                <button className="btn btn-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}><FiSave size={14} /> Lưu thay đổi</button>
            </div>
            {saved && <div style={{ padding: '12px', background: 'var(--accent-green-light)', color: 'var(--accent-green)', borderRadius: '10px', marginBottom: '16px', fontWeight: 600, animation: 'fadeIn 0.3s' }}>✓ Đã lưu thành công!</div>}

            {/* Contact Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPhone color="#1a73e8" /></div><div><div className="stat-label">Hotline</div><div className="stat-value" style={{ fontSize: '0.9rem' }}>{info.hotline}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiMail color="#28a745" /></div><div><div className="stat-label">Email</div><div className="stat-value" style={{ fontSize: '0.78rem' }}>{info.email}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Giờ mở cửa</div><div className="stat-value" style={{ fontSize: '0.9rem' }}>{info.hours}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiGlobe color="#9c27b0" /></div><div><div className="stat-label">Website</div><div className="stat-value" style={{ fontSize: '0.82rem' }}>{info.website || 'N/A'}</div></div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Contact Info */}
                <div className="card">
                    <div className="card-header"><h3 className="card-title"><FiPhone style={{ marginRight: 8 }} />Liên hệ chính</h3></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[{ label: 'Tên cơ sở', key: 'name' }, { label: 'Số điện thoại', key: 'phone' }, { label: 'Hotline', key: 'hotline' }, { label: 'Email', key: 'email' }, { label: 'Website', key: 'website' }]
                            .map(f => (<div key={f.key}><label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label><input value={info[f.key]} onChange={e => setInfo(s => ({ ...s, [f.key]: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }} /></div>))}
                    </div>
                </div>
                {/* Address & Map */}
                <div className="card">
                    <div className="card-header"><h3 className="card-title"><FiMapPin style={{ marginRight: 8 }} />Địa chỉ & Bản đồ</h3></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div><label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Địa chỉ</label><input value={info.address} onChange={e => setInfo(s => ({ ...s, address: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }} /></div>
                        <div><label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Giờ mở cửa</label><input value={info.hours} onChange={e => setInfo(s => ({ ...s, hours: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }} /></div>
                        <div><label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Google Maps URL</label><input value={info.mapUrl} onChange={e => setInfo(s => ({ ...s, mapUrl: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }} /></div>
                        {/* Map Preview */}
                        <div style={{ border: '2px dashed var(--color-border)', borderRadius: '12px', padding: '20px', textAlign: 'center', background: '#f8f9fa' }}>
                            <FiMapPin size={24} color="var(--color-primary)" style={{ marginBottom: '6px' }} />
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>{info.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>{info.address}</div>
                            <a href={info.mapUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><FiExternalLink size={12} /> Xem trên Google Maps</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="card">
                    <div className="card-header"><h3 className="card-title"><FiSmartphone style={{ marginRight: 8 }} />Mạng xã hội</h3></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {socialLinks.map(s => (
                            <div key={s.key}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 4 }}><span>{s.icon}</span> {s.label}</label>
                                <input value={info[s.key]} onChange={e => setInfo(prev => ({ ...prev, [s.key]: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${s.color}30`, fontSize: '0.9rem' }} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile Preview */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiSmartphone size={14} color="var(--color-primary)" /> Xem trước trên app</div>
                    <div style={{ maxWidth: '280px', margin: '0 auto', border: '3px solid #333', borderRadius: '28px', padding: '12px', background: '#fafafa' }}>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
                            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), #28a745)', padding: '20px 16px', textAlign: 'center', color: 'white' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{info.name}</div>
                                <div style={{ fontSize: '0.72rem', opacity: 0.9, marginTop: '4px' }}>{info.address}</div>
                            </div>
                            <div style={{ padding: '12px', display: 'grid', gap: '8px' }}>
                                {[{ icon: '📞', label: info.phone }, { icon: '📱', label: info.hotline }, { icon: '✉️', label: info.email }, { icon: '🕐', label: info.hours }].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.75rem' }}>
                                        <span>{item.icon}</span><span>{item.label}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                    {socialLinks.map(s => (
                                        <div key={s.key} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', background: `${s.color}10`, borderRadius: '8px', fontSize: '0.68rem', fontWeight: 600, color: s.color }}>
                                            {s.icon} {s.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
