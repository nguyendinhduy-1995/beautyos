import { useState } from 'react'
import { FiZap, FiMail, FiMessageSquare, FiGift, FiClock, FiCheck, FiPause, FiPlay, FiUsers } from 'react-icons/fi'

const automations = [
    { id: 1, name: 'Welcome Series', trigger: 'KH mới đăng ký', actions: ['Gửi SMS chào mừng', 'Email giới thiệu DV', 'Voucher 20% sau 3 ngày'], active: true, sent: 234, converted: 45, rate: 19.2 },
    { id: 2, name: 'Nhắc tái khám', trigger: 'Sau liệu trình 30 ngày', actions: ['Zalo nhắc lịch', 'SMS nếu chưa đặt', 'Gọi telesales sau 7 ngày'], active: true, sent: 156, converted: 67, rate: 42.9 },
    { id: 3, name: 'Win-back Campaign', trigger: 'KH vắng > 60 ngày', actions: ['Email "Nhớ bạn"', 'Voucher 30% qua SMS', 'AI đề xuất DV phù hợp'], active: true, sent: 89, converted: 18, rate: 20.2 },
    { id: 4, name: 'Birthday Voucher', trigger: 'Sinh nhật KH', actions: ['SMS chúc mừng', 'Voucher giảm 25%', 'Email ưu đãi tuần sinh nhật'], active: true, sent: 42, converted: 28, rate: 66.7 },
    { id: 5, name: 'Review Request', trigger: 'Sau DV 24 giờ', actions: ['Zalo hỏi đánh giá', 'Link Google Review'], active: false, sent: 0, converted: 0, rate: 0 },
    { id: 6, name: 'Upsell AI', trigger: 'KH mua DV A chưa mua DV B', actions: ['Email đề xuất combo', 'SMS ưu đãi bundle'], active: true, sent: 67, converted: 12, rate: 17.9 },
]

const stats = {
    total: automations.length,
    active: automations.filter(a => a.active).length,
    totalSent: automations.reduce((s, a) => s + a.sent, 0),
    totalConverted: automations.reduce((s, a) => s + a.converted, 0),
}

export default function CRMAutomation() {
    const [tab, setTab] = useState('flows')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiZap size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>CRM Automation</h2>
                        <p>Auto nurture • Win-back • Birthday • Upsell AI</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Workflows', v: `${stats.active}/${stats.total}` }, { l: 'Đã gửi', v: stats.totalSent }, { l: 'Converted', v: stats.totalConverted }, { l: 'TB Rate', v: `${(stats.totalConverted / (stats.totalSent || 1) * 100).toFixed(0)}%` }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'flows', label: '⚡ Workflows' }, { id: 'stats', label: '📊 Hiệu quả' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#b45309' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'flows' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {automations.map(a => (
                        <div key={a.id} className="premium-card" style={{ padding: 16, opacity: a.active ? 1 : 0.6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{a.name}</div>
                                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: a.active ? '#ecfdf5' : '#fef2f2', color: a.active ? '#059669' : '#dc2626' }}>
                                    {a.active ? '▶ Active' : '⏸ Paused'}
                                </span>
                            </div>
                            <div style={{ fontSize: 12, color: '#b45309', fontWeight: 600, marginBottom: 8 }}>⚡ Trigger: {a.trigger}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                                {a.actions.map((act, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
                                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#b45309' }}>{j + 1}</div>
                                        {act}
                                    </div>
                                ))}
                            </div>
                            {a.active && (
                                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#94a3b8' }}>
                                    <span>📨 {a.sent} gửi</span>
                                    <span>✅ {a.converted} converted</span>
                                    <span style={{ fontWeight: 700, color: a.rate >= 30 ? '#059669' : '#d97706' }}>📈 {a.rate}%</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'stats' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-cards-grid">
                        {automations.filter(a => a.active).map((a, i) => (
                            <div key={i} className="premium-card" style={{ padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 20, fontWeight: 800, color: a.rate >= 30 ? '#059669' : '#d97706' }}>{a.rate}%</div>
                                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{a.name}</div>
                                <div style={{ fontSize: 10, color: '#94a3b8' }}>{a.sent} gửi → {a.converted} converted</div>
                            </div>
                        ))}
                    </div>
                    <div className="premium-card" style={{ padding: 16, background: '#fffbeb' }}>
                        <div style={{ fontSize: 13, color: '#92400e', fontWeight: 600 }}>💡 AI Insight: "Birthday Voucher" có conversion rate cao nhất (66.7%). Nên mở rộng thêm ưu đãi tuần sinh nhật để tăng doanh thu.</div>
                    </div>
                </div>
            )}
        </div>
    )
}
