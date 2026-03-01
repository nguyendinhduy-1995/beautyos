import { useState } from 'react'
import { FiGift, FiStar, FiAward, FiSettings, FiUsers, FiTrendingUp, FiRotateCcw, FiClock, FiAlertCircle, FiChevronUp } from 'react-icons/fi'
import { customers } from '../../data/mockData'

const tiers = [
    { name: 'Bronze', color: '#cd7f32', bg: '#fef3e2', min: 0, max: 499, icon: '🥉', discount: '5%' },
    { name: 'Silver', color: '#94a3b8', bg: '#f1f5f9', min: 500, max: 1999, icon: '🥈', discount: '10%' },
    { name: 'Gold', color: '#d97706', bg: '#fffbeb', min: 2000, max: 4999, icon: '🥇', discount: '15%' },
    { name: 'Platinum', color: '#7c3aed', bg: '#f5f3ff', min: 5000, max: 99999, icon: '💎', discount: '20%' },
]

const members = customers.slice(0, 20).map((c, i) => {
    const points = Math.floor(c.totalSpent / 10000)
    const tier = tiers.find(t => points >= t.min && points <= t.max) || tiers[0]
    return {
        ...c, points, tier: tier.name, tierColor: tier.color, tierBg: tier.bg, tierIcon: tier.icon,
        pointsToNext: tier.name === 'Platinum' ? 0 : tiers[tiers.findIndex(t => t.name === tier.name) + 1]?.min - points,
        redeemed: Math.floor(Math.random() * points * 0.4),
        expiring: Math.floor(Math.random() * 200),
        expiryDate: `${15 + Math.floor(Math.random() * 15)}/04/2026`,
    }
})

const rewards = [
    { id: 1, name: 'Voucher giảm 100K', cost: 100, type: 'Voucher', stock: 50, redeemed: 23 },
    { id: 2, name: 'Chăm sóc da miễn phí', cost: 500, type: 'Dịch vụ', stock: 10, redeemed: 7 },
    { id: 3, name: 'Voucher giảm 500K', cost: 400, type: 'Voucher', stock: 30, redeemed: 12 },
    { id: 4, name: 'Massage body 60 phút', cost: 300, type: 'Dịch vụ', stock: 20, redeemed: 15 },
    { id: 5, name: 'Nâng cơ Hifu 1 vùng', cost: 800, type: 'Dịch vụ', stock: 5, redeemed: 2 },
    { id: 6, name: 'Gift set skincare', cost: 600, type: 'Quà tặng', stock: 15, redeemed: 9 },
]

const statsData = { totalPoints: 287400, totalRedeemed: 89200, activeMembers: 47, avgPointsPerMember: 6115 }

export default function LoyaltyProgram() {
    const [tab, setTab] = useState('dashboard')
    const [showConfig, setShowConfig] = useState(false)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiGift size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Chương trình Loyalty</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Tích điểm • Nâng hạng tự động • Đổi thưởng</p>
                    </div>
                    <button onClick={() => setShowConfig(true)} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiSettings size={14} /> Cấu hình
                    </button>
                </div>
                {/* Stats */}
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ label: 'Tổng điểm phát', value: statsData.totalPoints.toLocaleString(), icon: FiStar },
                    { label: 'Đã đổi', value: statsData.totalRedeemed.toLocaleString(), icon: FiRotateCcw },
                    { label: 'Thành viên', value: statsData.activeMembers, icon: FiUsers },
                    { label: 'TB/thành viên', value: statsData.avgPointsPerMember.toLocaleString(), icon: FiTrendingUp }].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <s.icon size={14} color="rgba(255,255,255,0.7)" />
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.value}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'dashboard', label: '👥 Thành viên' }, { id: 'rewards', label: '🎁 Đổi thưởng' }, { id: 'tiers', label: '🏅 Cấp bậc' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                        fontSize: 13, fontWeight: 600, background: tab === t.id ? '#d97706' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* Members */}
            {tab === 'dashboard' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                {['Thành viên', 'Hạng', 'Điểm', 'Đã đổi', 'Sắp hết hạn', 'Tiến trình'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m, i) => {
                                const tierIdx = tiers.findIndex(t => t.name === m.tier)
                                const currentMin = tiers[tierIdx]?.min || 0
                                const nextMin = tiers[tierIdx + 1]?.min || m.points
                                const progress = m.tier === 'Platinum' ? 100 : Math.min(100, ((m.points - currentMin) / (nextMin - currentMin)) * 100)
                                return (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{m.name}</div>
                                            <div style={{ fontSize: 11, color: '#64748b' }}>{m.phone}</div>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: m.tierBg, color: m.tierColor }}>
                                                {m.tierIcon} {m.tier}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>{m.points.toLocaleString()}</td>
                                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{m.redeemed.toLocaleString()}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            {m.expiring > 0 && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: m.expiring > 100 ? '#dc2626' : '#d97706' }}>
                                                    <FiAlertCircle size={12} /> {m.expiring} điểm ({m.expiryDate})
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                                    <div style={{ width: `${progress}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${m.tierColor}, ${m.tierColor}80)` }} />
                                                </div>
                                                {m.pointsToNext > 0 && <span style={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>còn {m.pointsToNext.toLocaleString()}</span>}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rewards */}
            {tab === 'rewards' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {rewards.map(r => (
                        <div key={r.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20, textAlign: 'center' }}>
                            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #fef3e2, #fffbeb)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>🎁</div>
                            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{r.name}</h4>
                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: r.type === 'Voucher' ? '#ecfdf5' : r.type === 'Dịch vụ' ? '#eff6ff' : '#f5f3ff', color: r.type === 'Voucher' ? '#059669' : r.type === 'Dịch vụ' ? '#2563eb' : '#7c3aed' }}>{r.type}</span>
                            <div style={{ fontSize: 24, fontWeight: 800, color: '#d97706', margin: '12px 0 4px' }}>{r.cost}</div>
                            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>điểm cần đổi</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 6 }}>
                                <span>Còn lại: {r.stock - r.redeemed}</span>
                                <span>Đã đổi: {r.redeemed}</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                <div style={{ width: `${(r.redeemed / r.stock) * 100}%`, height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tiers */}
            {tab === 'tiers' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    {tiers.map((t, i) => {
                        const count = members.filter(m => m.tier === t.name).length
                        return (
                            <div key={i} style={{ background: 'white', borderRadius: 14, border: `2px solid ${t.color}30`, padding: 24, textAlign: 'center', position: 'relative' }}>
                                <div style={{ fontSize: 40, marginBottom: 8 }}>{t.icon}</div>
                                <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800, color: t.color }}>{t.name}</h3>
                                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>{t.min.toLocaleString()} — {t.max >= 99999 ? '∞' : t.max.toLocaleString()} điểm</div>
                                <div style={{ background: t.bg, borderRadius: 10, padding: '12px 16px', marginBottom: 12 }}>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: t.color }}>{count}</div>
                                    <div style={{ fontSize: 11, color: '#64748b' }}>thành viên</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center', fontSize: 13, fontWeight: 700, color: t.color }}>
                                    <FiAward size={14} /> Giảm {t.discount}
                                </div>
                                {i < tiers.length - 1 && (
                                    <div style={{ position: 'absolute', top: '50%', right: -16, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FiChevronUp size={16} color="#94a3b8" style={{ transform: 'rotate(90deg)' }} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Config Modal */}
            {showConfig && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowConfig(false)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 480, maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>⚙️ Cấu hình Loyalty</h3>
                        {[{ label: 'Tỉ lệ quy đổi', value: '10.000đ = 1 điểm' }, { label: 'Thời hạn điểm', value: '12 tháng' }, { label: 'Nhắc hết hạn trước', value: '30 ngày' }].map((f, i) => (
                            <div key={i} style={{ marginBottom: 16 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                                <input defaultValue={f.value} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                        ))}
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '20px 0 12px' }}>Ngưỡng nâng hạng</h4>
                        {tiers.map((t, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ width: 80, fontSize: 13, fontWeight: 600, color: t.color }}>{t.icon} {t.name}</span>
                                <input defaultValue={t.min} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                                <span style={{ color: '#94a3b8', fontSize: 12 }}>~</span>
                                <input defaultValue={t.max >= 99999 ? '∞' : t.max} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
                            <button onClick={() => setShowConfig(false)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Hủy</button>
                            <button onClick={() => setShowConfig(false)} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#d97706', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Lưu cấu hình</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
