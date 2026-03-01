import { useState } from 'react'
import { FiMap, FiUsers, FiTrendingUp, FiTarget, FiDollarSign, FiArrowRight, FiBarChart2 } from 'react-icons/fi'

const funnelSteps = [
    { name: 'Nhận biết (Awareness)', count: 5200, rate: '100%', color: '#3b82f6' },
    { name: 'Quan tâm (Interest)', count: 3100, rate: '59.6%', color: '#6366f1' },
    { name: 'Tư vấn (Consideration)', count: 1850, rate: '35.6%', color: '#8b5cf6' },
    { name: 'Đặt lịch (Intent)', count: 920, rate: '17.7%', color: '#a855f7' },
    { name: 'Mua hàng (Purchase)', count: 480, rate: '9.2%', color: '#c026d3' },
    { name: 'Quay lại (Retention)', count: 290, rate: '5.6%', color: '#db2777' },
    { name: 'Giới thiệu (Advocacy)', count: 85, rate: '1.6%', color: '#e11d48' },
]

const dropoffs = [
    { from: 'Quan tâm → Tư vấn', dropRate: '40.3%', count: 1250, reason: 'Không phản hồi tin nhắn tư vấn', suggestion: 'Gửi ZNS nhắc nhở sau 24h + chatbot auto-reply' },
    { from: 'Tư vấn → Đặt lịch', dropRate: '50.3%', count: 930, reason: 'Giá cao, chưa tin tưởng', suggestion: 'Gửi voucher first-visit 15% + video review KH cũ' },
    { from: 'Đặt lịch → Mua hàng', dropRate: '47.8%', count: 440, reason: 'No-show & hủy giờ cuối', suggestion: 'SMS nhắc 3 lần + deposit online 200K' },
    { from: 'Mua hàng → Quay lại', dropRate: '39.6%', count: 190, reason: 'Không có follow-up homecare', suggestion: 'AI Homecare tự động + loyalty points x2' },
]

const segments = [
    { name: 'Diamond (LTV > 20M)', count: 15, ltv: '32,500,000đ', avgVisit: 18, retention: '95%', color: '#6366f1' },
    { name: 'Gold (LTV 10-20M)', count: 42, ltv: '14,200,000đ', avgVisit: 10, retention: '82%', color: '#f59e0b' },
    { name: 'Silver (LTV 5-10M)', count: 85, ltv: '7,100,000đ', avgVisit: 6, retention: '68%', color: '#94a3b8' },
    { name: 'Bronze (LTV 2-5M)', count: 128, ltv: '3,400,000đ', avgVisit: 3, retention: '45%', color: '#cd7c2f' },
    { name: 'New (LTV < 2M)', count: 210, ltv: '850,000đ', avgVisit: 1.5, retention: '25%', color: '#10b981' },
]

export default function AICustomerJourney() {
    const [tab, setTab] = useState('funnel')
    const totalCustomers = segments.reduce((s, seg) => s + seg.count, 0)
    const conversionRate = ((funnelSteps[4].count / funnelSteps[0].count) * 100).toFixed(1)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #4f46e5, #818cf8)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiMap size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Hành trình KH 360°</h2>
                        <p>Funnel chuyển đổi • Phân tích drop-off • LTV Segmentation</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng KH', v: totalCustomers }, { l: 'Conversion', v: `${conversionRate}%` }, { l: 'Drop-off points', v: dropoffs.length }, { l: 'Segments', v: segments.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'funnel', label: '📊 Funnel' }, { id: 'dropoff', label: '📉 Drop-off' }, { id: 'ltv', label: '💎 LTV Segment' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#4f46e5' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'funnel' && (
                <div>
                    <div className="premium-alert" style={{ background: '#eef2ff', border: '1px solid #c7d2fe', color: '#3730a3' }}>
                        <FiBarChart2 size={14} /> Conversion funnel từ Awareness đến Advocacy
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {funnelSteps.map((step, i) => {
                            const width = Math.max(25, (step.count / funnelSteps[0].count) * 100)
                            return (
                                <div key={i} className="premium-card" style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{step.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontSize: 14, fontWeight: 800, color: step.color }}>{step.count.toLocaleString()}</span>
                                            <span style={{ fontSize: 10, color: '#94a3b8' }}>{step.rate}</span>
                                        </div>
                                    </div>
                                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${width}%`, background: step.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {tab === 'dropoff' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
                        <FiTrendingUp size={14} style={{ transform: 'rotate(180deg)' }} /> AI phát hiện điểm mất KH & đề xuất giải pháp
                    </div>
                    {dropoffs.map((d, i) => (
                        <div key={i} className="premium-card" style={{ borderLeft: '3px solid #ef4444' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#dc2626' }}>
                                    {d.dropRate}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{d.from}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>Mất {d.count} KH</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', padding: '8px 12px', background: '#fef2f2', borderRadius: 8, marginBottom: 8 }}>
                                ❌ Nguyên nhân: {d.reason}
                            </div>
                            <div style={{ fontSize: 12, color: '#059669', padding: '8px 12px', background: '#ecfdf5', borderRadius: 8, marginBottom: 10 }}>
                                ✅ AI đề xuất: {d.suggestion}
                            </div>
                            <button className="premium-action-btn" style={{ background: '#4f46e5', color: 'white' }}>
                                <FiArrowRight size={11} /> Áp dụng giải pháp
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'ltv' && (
                <div>
                    <div className="premium-alert" style={{ background: '#eef2ff', border: '1px solid #c7d2fe', color: '#3730a3' }}>
                        <FiDollarSign size={14} /> Phân khúc KH theo Lifetime Value (LTV)
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {segments.map((seg, i) => (
                            <div key={i} className="premium-card" style={{ borderLeft: `3px solid ${seg.color}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${seg.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                                        {i === 0 ? '💎' : i === 1 ? '🥇' : i === 2 ? '🥈' : i === 3 ? '🥉' : '🌱'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{seg.name}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{seg.count} khách hàng</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: seg.color }}>{seg.ltv}</div>
                                        <div style={{ fontSize: 10, color: '#94a3b8' }}>TB LTV</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                    <span>📊 TB visit: {seg.avgVisit}</span>
                                    <span>🔄 Retention: {seg.retention}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
