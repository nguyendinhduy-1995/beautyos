import { useState } from 'react'
import { FiSettings, FiSave, FiMail, FiMessageSquare, FiTarget } from 'react-icons/fi'

export default function MarketingSettings() {
    const [settings, setSettings] = useState({
        autoAssign: true, autoReply: false, defaultStaff: 'Tự động phân',
        smsTemplate: 'default', zaloNotify: true, emailNotify: false,
        ticketExpiry: 30, autoClose: true, autoCloseAfter: 7,
    })
    const [saved, setSaved] = useState(false)
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

    const Toggle = ({ checked, onChange }) => (
        <div onClick={() => onChange(!checked)} style={{ width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer', background: checked ? 'var(--primary)' : 'var(--gray-300)', transition: 'all 0.3s', position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: checked ? '22px' : '2px', transition: 'all 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        </div>
    )

    return (
        <div className="fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div><h2>Cài Đặt Marketing</h2><p>Cấu hình thông số chung cho module Marketing</p></div>
                <button className="btn btn-primary" onClick={handleSave}><FiSave size={14} /> Lưu cài đặt</button>
            </div>
            {saved && <div style={{ padding: '12px 16px', background: 'var(--accent-green-light)', color: 'var(--accent-green)', borderRadius: '10px', marginBottom: '16px', fontWeight: 600 }}>✓ Đã lưu!</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="card">
                    <div className="card-header"><h3 className="card-title"><FiTarget style={{ marginRight: 8 }} />Ticket</h3></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Tự động phân ticket</div><div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Phân ticket cho nhân viên tự động</div></div><Toggle checked={settings.autoAssign} onChange={v => setSettings(s => ({ ...s, autoAssign: v }))} /></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Tự động trả lời</div><div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Gửi tin nhắn tự động khi nhận ticket</div></div><Toggle checked={settings.autoReply} onChange={v => setSettings(s => ({ ...s, autoReply: v }))} /></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Tự đóng ticket</div><div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Đóng ticket không phản hồi</div></div><Toggle checked={settings.autoClose} onChange={v => setSettings(s => ({ ...s, autoClose: v }))} /></div>
                        <div><label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Hết hạn ticket (ngày)</label><input type="number" value={settings.ticketExpiry} onChange={e => setSettings(s => ({ ...s, ticketExpiry: +e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }} /></div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><h3 className="card-title"><FiMessageSquare style={{ marginRight: 8 }} />Thông báo</h3></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Thông báo Zalo</div><div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Gửi ZNS khi có ticket mới</div></div><Toggle checked={settings.zaloNotify} onChange={v => setSettings(s => ({ ...s, zaloNotify: v }))} /></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Thông báo Email</div><div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Gửi email khi có ticket mới</div></div><Toggle checked={settings.emailNotify} onChange={v => setSettings(s => ({ ...s, emailNotify: v }))} /></div>
                        <div><label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Template SMS mặc định</label><select value={settings.smsTemplate} onChange={e => setSettings(s => ({ ...s, smsTemplate: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}><option value="default">Mẫu mặc định</option><option value="promo">Mẫu khuyến mãi</option><option value="care">Mẫu chăm sóc</option></select></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
