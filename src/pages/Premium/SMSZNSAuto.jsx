import { useState } from 'react'
import { FiMessageSquare, FiSend, FiClock, FiUsers, FiZap, FiCheck, FiAlertCircle, FiPlus, FiBarChart2 } from 'react-icons/fi'

const templates = [
    { id: 1, name: 'Nhắc lịch hẹn', type: 'ZNS', channel: 'Zalo', content: 'Chào {name}, bạn có lịch hẹn {service} vào {time} ngày {date} tại {branch}. Vui lòng xác nhận...', sent: 456, delivered: 445, read: 380, link_click: 120, status: 'active' },
    { id: 2, name: 'Chúc mừng sinh nhật', type: 'SMS', channel: 'SMS', content: 'HBD {name}! {spa} tặng bạn voucher giảm 25% mọi DV trong tuần sinh nhật. Nhập mã: BD{code}', sent: 89, delivered: 86, read: null, link_click: 34, status: 'active' },
    { id: 3, name: 'Khuyến mãi tháng', type: 'ZNS', channel: 'Zalo', content: 'SALE T3! Giảm đến 30% Combo trẻ hóa da. Chỉ còn {slots} suất. Đặt lịch ngay...', sent: 234, delivered: 228, read: 195, link_click: 67, status: 'active' },
    { id: 4, name: 'Win-back khách vắng', type: 'SMS', channel: 'SMS', content: '{name} ơi, {spa} nhớ bạn! Quay lại nhận ưu đãi 20% + quà tặng đặc biệt. Hạn: {date}', sent: 156, delivered: 148, read: null, link_click: 28, status: 'active' },
    { id: 5, name: 'Nhắc tái khám', type: 'ZNS', channel: 'Zalo', content: 'Chào {name}, đã 30 ngày từ buổi {service}. Để duy trì kết quả, bạn nên tái khám...', sent: 178, delivered: 172, read: 145, link_click: 56, status: 'active' },
    { id: 6, name: 'Review sau DV', type: 'ZNS', channel: 'Zalo', content: '{name} ơi, cảm ơn bạn đã tin tưởng! Chia sẻ trải nghiệm tại {link} để nhận 100 điểm...', sent: 0, delivered: 0, read: 0, link_click: 0, status: 'draft' },
]

const automationRules = [
    { name: 'Nhắc lịch hẹn trước 24h', template: 'Nhắc lịch hẹn', trigger: 'Auto, trước hẹn 24h', audience: 'Tất cả KH có hẹn', active: true },
    { name: 'Sinh nhật tự động', template: 'Chúc mừng sinh nhật', trigger: 'Auto, ngày sinh nhật', audience: 'Tất cả KH', active: true },
    { name: 'Win-back sau 45 ngày', template: 'Win-back khách vắng', trigger: 'Auto, vắng 45 ngày', audience: 'KH không đến 45 ngày', active: true },
    { name: 'Tái khám sau 30 ngày', template: 'Nhắc tái khám', trigger: 'Auto, sau DV 30 ngày', audience: 'KH làm liệu trình', active: true },
]

const totalSent = templates.reduce((s, t) => s + t.sent, 0)
const totalDelivered = templates.reduce((s, t) => s + t.delivered, 0)

export default function SMSZNSAuto() {
    const [tab, setTab] = useState('templates')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiMessageSquare size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>SMS & ZNS Tự động</h2>
                        <p>Template • Automation rules • Tracking hiệu quả</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Template', v: templates.length }, { l: 'Đã gửi', v: totalSent }, { l: 'Delivered', v: `${Math.round(totalDelivered / totalSent * 100)}%` }, { l: 'Rules', v: automationRules.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'templates', label: '📝 Templates' }, { id: 'rules', label: '⚡ Automation' }, { id: 'stats', label: '📊 Thống kê' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#7c3aed' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'templates' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {templates.map(t => (
                        <div key={t.id} className="premium-card" style={{ padding: 16, opacity: t.status === 'draft' ? 0.6 : 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: t.channel === 'Zalo' ? '#eff6ff' : '#f1f5f9', color: t.channel === 'Zalo' ? '#1d4ed8' : '#64748b' }}>{t.channel}</span>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</span>
                                </div>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: t.status === 'active' ? '#ecfdf5' : '#f1f5f9', color: t.status === 'active' ? '#059669' : '#94a3b8' }}>
                                    {t.status === 'active' ? '✅ Active' : '📝 Draft'}
                                </span>
                            </div>
                            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px', fontSize: 11, color: '#64748b', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 8 }}>{t.content}</div>
                            {t.sent > 0 && (
                                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8', flexWrap: 'wrap' }}>
                                    <span>📨 {t.sent} gửi</span>
                                    <span>✅ {t.delivered} nhận</span>
                                    {t.read !== null && <span>👁️ {t.read} đọc</span>}
                                    <span style={{ fontWeight: 600, color: '#7c3aed' }}>🔗 {t.link_click} click</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'rules' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ background: '#f5f3ff', borderRadius: 12, padding: '10px 14px', border: '1px solid #ddd6fe', fontSize: 12, color: '#6d28d9', fontWeight: 600 }}>
                        <FiZap size={12} /> {automationRules.filter(r => r.active).length} automation rules đang chạy tự động 24/7
                    </div>
                    {automationRules.map((r, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: `3px solid ${r.active ? '#059669' : '#dc2626'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{r.name}</span>
                                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: r.active ? '#ecfdf5' : '#fef2f2', color: r.active ? '#059669' : '#dc2626' }}>
                                    {r.active ? '▶ Active' : '⏸ Off'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#64748b' }}>
                                <span>📝 Template: <strong style={{ color: '#7c3aed' }}>{r.template}</strong></span>
                                <span>⚡ Trigger: {r.trigger}</span>
                                <span>👥 Audience: {r.audience}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'stats' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-cards-grid">
                        {templates.filter(t => t.sent > 0).map((t, i) => (
                            <div key={i} className="premium-card" style={{ padding: 14, textAlign: 'center' }}>
                                <div style={{ fontSize: 9, fontWeight: 700, color: t.channel === 'Zalo' ? '#1d4ed8' : '#64748b', marginBottom: 4 }}>{t.channel}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{t.name}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#7c3aed' }}>{Math.round(t.delivered / t.sent * 100)}%</div>
                                <div style={{ fontSize: 10, color: '#94a3b8' }}>delivery rate</div>
                                {t.read !== null && (
                                    <div style={{ fontSize: 10, color: '#059669', fontWeight: 600, marginTop: 2 }}>👁️ {Math.round(t.read / t.delivered * 100)}% đọc</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
