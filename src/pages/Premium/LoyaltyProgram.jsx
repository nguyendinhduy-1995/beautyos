import { useState } from 'react'
import { FiGift, FiStar, FiUsers, FiTrendingUp, FiAward, FiPercent, FiArrowUp } from 'react-icons/fi'

const tiers = [
    { name: 'Silver', icon: '🥈', minSpend: 0, discount: '5%', members: 342, color: '#94a3b8', benefits: ['Tích điểm x1', 'Giảm 5% DV'] },
    { name: 'Gold', icon: '🥇', minSpend: 10, discount: '10%', members: 124, color: '#f59e0b', benefits: ['Tích điểm x2', 'Giảm 10%', 'Ưu tiên đặt lịch'] },
    { name: 'Platinum', icon: '👑', minSpend: 30, discount: '15%', members: 45, color: '#8b5cf6', benefits: ['Tích điểm x3', 'Giảm 15%', 'VIP Lounge', 'Free 1 DV/tháng'] },
    { name: 'Diamond', icon: '💎', minSpend: 80, discount: '20%', members: 12, color: '#06b6d4', benefits: ['Tích điểm x5', 'Giảm 20%', 'Personal stylist', 'Birthday party'] },
]

const rewards = [
    { name: 'Giảm 100K DV bất kỳ', points: 500, redeemed: 89, stock: 'Unlimited', popular: true },
    { name: 'Free facial cơ bản', points: 1500, redeemed: 34, stock: '50/tháng', popular: true },
    { name: 'Upgrade lên Gold', points: 3000, redeemed: 12, stock: 'Unlimited', popular: false },
    { name: 'Combo 3 buổi massage', points: 5000, redeemed: 8, stock: '20/tháng', popular: false },
    { name: 'Voucher 1,000,000đ', points: 8000, redeemed: 3, stock: '10/tháng', popular: false },
    { name: 'Trọn gói VIP 1 ngày', points: 12000, redeemed: 1, stock: '5/tháng', popular: false },
]

const recentActivity = [
    { customer: 'Nguyễn Thị Hoa', action: 'Tích 500 điểm', service: 'Nâng cơ Hifu', time: '5 phút trước' },
    { customer: 'Trần Văn Minh', action: 'Đổi "Giảm 100K"', points: -500, time: '15 phút trước' },
    { customer: 'Lê Thị Lan', action: 'Lên hạng Gold', service: 'Tổng chi 10M', time: '1 giờ trước' },
    { customer: 'Phạm Đức Anh', action: 'Tích 800 điểm', service: 'Trị mụn Laser', time: '2 giờ trước' },
    { customer: 'Hoàng Thị Mai', action: 'Đổi "Free facial"', points: -1500, time: '3 giờ trước' },
]

const totalMembers = tiers.reduce((s, t) => s + t.members, 0)

export default function LoyaltyProgram() {
    const [tab, setTab] = useState('tiers')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiGift size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Chương trình Loyalty</h2>
                        <p>Tích điểm • 4 hạng thẻ • Đổi quà • Giữ chân KH</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Thành viên', v: totalMembers }, { l: 'Hạng', v: `${tiers.length} cấp` }, { l: 'Quà', v: rewards.length }, { l: 'Đã đổi', v: rewards.reduce((s, r) => s + r.redeemed, 0) }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'tiers', label: '🏆 Hạng thẻ' }, { id: 'rewards', label: '🎁 Đổi quà' }, { id: 'activity', label: '📋 Hoạt động' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#d97706' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'tiers' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {tiers.map((t, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: `4px solid ${t.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 24 }}>{t.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: t.color }}>{t.name}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.minSpend > 0 ? `Chi từ ${t.minSpend}M` : 'Mặc định'}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{t.members}</div>
                                    <div style={{ fontSize: 10, color: '#94a3b8' }}>thành viên</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {t.benefits.map((b, j) => (
                                    <span key={j} style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: `${t.color}15`, color: t.color }}>✓ {b}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'rewards' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {rewards.map((r, i) => (
                        <div key={i} className="premium-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎁</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{r.name}</span>
                                    {r.popular && <span style={{ padding: '1px 5px', borderRadius: 4, fontSize: 8, fontWeight: 700, background: '#dc2626', color: 'white' }}>HOT</span>}
                                </div>
                                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                                    <span>📦 {r.stock}</span>
                                    <span>✅ {r.redeemed} đã đổi</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#d97706' }}>{r.points.toLocaleString()}</div>
                                <div style={{ fontSize: 9, color: '#94a3b8' }}>điểm</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'activity' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {recentActivity.map((a, i) => (
                        <div key={i} className="premium-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.points ? '#fef2f2' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                                {a.points ? '🎁' : a.action.includes('Lên hạng') ? '⬆️' : '⭐'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.customer}</div>
                                <div style={{ fontSize: 11, color: '#64748b' }}>{a.action}</div>
                            </div>
                            <span style={{ fontSize: 10, color: '#94a3b8' }}>{a.time}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
