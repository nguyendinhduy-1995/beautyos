import { useState } from 'react'
import { FiTrendingUp, FiDollarSign, FiTarget, FiCalendar, FiZap, FiBarChart2 } from 'react-icons/fi'
import { services } from '../../data/mockData'

const forecast = [
    { month: 'T3/2026', predicted: 520, actual: null, confidence: 88, factors: 'Mùa cưới + KM tháng 3' },
    { month: 'T4/2026', predicted: 480, actual: null, confidence: 82, factors: 'Hết mùa cao, giảm nhẹ' },
    { month: 'T5/2026', predicted: 510, actual: null, confidence: 75, factors: 'Mùa hè, skincare tăng' },
]
const history = [
    { month: 'T12/2025', predicted: 500, actual: 520, gap: '+4%' },
    { month: 'T1/2026', predicted: 440, actual: 450, gap: '+2.3%' },
    { month: 'T2/2026', predicted: 400, actual: 390, gap: '-2.5%' },
]

const serviceRevenue = services.filter(s => s.status === 'active').slice(0, 8).map((s, i) => ({
    name: s.name, revenue: Math.floor(Math.random() * 80 + 20) * 1000000,
    growth: Math.floor(Math.random() * 40) - 10,
    customers: Math.floor(Math.random() * 30 + 5),
})).sort((a, b) => b.revenue - a.revenue)
const topSvc = serviceRevenue[0]?.revenue || 1

const opportunities = [
    { title: 'Upsell Combo Trẻ hóa cho nhóm Gold', value: '45M', probability: 78, reason: '23 KH Gold chưa dùng Combo, tỉ lệ chuyển đổi dự kiến 35%' },
    { title: 'Tăng giá Hifu +10% theo mùa', value: '32M', probability: 65, reason: 'Nhu cầu tăng 25% vào T3-T4, đối thủ đã tăng giá' },
    { title: 'Re-activate 15 KH vắng 60 ngày', value: '28M', probability: 55, reason: 'Gửi voucher 20% có tỉ lệ quay lại 40%' },
    { title: 'Cross-sell skincare cho KH filler', value: '18M', probability: 70, reason: '67% KH filler cần skincare dưỡng da, chưa được giới thiệu' },
]

export default function AIRevenue() {
    const [tab, setTab] = useState('forecast')
    const totalRevenue = serviceRevenue.reduce((s, r) => s + r.revenue, 0)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #059669, #34d399)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiTrendingUp size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Doanh thu</h2>
                        <p>Dự báo doanh thu • Cơ hội tăng trưởng • Phân tích dịch vụ</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'DT tháng', v: `${(totalRevenue / 1000000).toFixed(0)}M` }, { l: 'Dự báo T3', v: '520M' }, { l: 'Cơ hội', v: `${opportunities.length} mục` }, { l: 'Độ CX', v: '88%' }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'forecast', label: '📈 Dự báo' }, { id: 'services', label: '💰 Theo DV' }, { id: 'opportunities', label: '🎯 Cơ hội' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#059669' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'forecast' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>🔮 Dự báo 3 tháng tới</h3>
                        {forecast.map((f, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                    <FiCalendar size={14} color="#059669" />
                                    <span style={{ width: 70, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{f.month}</span>
                                    <div style={{ flex: 1, height: 24, borderRadius: 6, background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{ width: `${(f.predicted / 600) * 100}%`, height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, #059669, #34d399)' }} />
                                        <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 700, color: 'white' }}>{f.predicted}M</span>
                                    </div>
                                    <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>{f.confidence}%</span>
                                </div>
                                <div style={{ fontSize: 10, color: '#94a3b8', marginLeft: 32 }}>💡 {f.factors}</div>
                            </div>
                        ))}
                    </div>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📊 Độ chính xác (3 tháng gần)</h3>
                        {history.map((h, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ width: 70, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{h.month}</span>
                                <div style={{ flex: 1, display: 'flex', gap: 16, fontSize: 12 }}>
                                    <span><span style={{ color: '#94a3b8' }}>Dự báo:</span> <strong>{h.predicted}M</strong></span>
                                    <span><span style={{ color: '#94a3b8' }}>Thực tế:</span> <strong>{h.actual}M</strong></span>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 700, color: h.gap.startsWith('+') ? '#059669' : '#dc2626' }}>{h.gap}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'services' && (
                <div className="premium-card" style={{ padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>💰 Doanh thu theo Dịch vụ</h3>
                    {serviceRevenue.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <span style={{ width: 20, fontSize: 13 }}>{i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{s.name}</div>
                                <div style={{ height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{ width: `${(s.revenue / topSvc) * 100}%`, height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #059669, #34d399)' }} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{(s.revenue / 1000000).toFixed(0)}M</div>
                                <div style={{ fontSize: 10, fontWeight: 600, color: s.growth >= 0 ? '#059669' : '#dc2626' }}>{s.growth >= 0 ? '+' : ''}{s.growth}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'opportunities' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ background: '#ecfdf5', borderRadius: 12, padding: '10px 14px', border: '1px solid #bbf7d0', fontSize: 12, color: '#065f46', fontWeight: 600 }}>
                        🎯 AI phát hiện {opportunities.length} cơ hội tăng trưởng, tổng giá trị ~{opportunities.reduce((s, o) => s + parseInt(o.value), 0)}M
                    </div>
                    {opportunities.map((o, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 20, fontWeight: 800, color: '#059669' }}>{o.value}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ width: 40, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                        <div style={{ width: `${o.probability}%`, height: '100%', borderRadius: 3, background: o.probability >= 70 ? '#059669' : '#d97706' }} />
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: o.probability >= 70 ? '#059669' : '#d97706' }}>{o.probability}%</span>
                                </div>
                            </div>
                            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{o.title}</h4>
                            <p style={{ margin: '0 0 10px', fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{o.reason}</p>
                            <button className="premium-action-btn" style={{ background: '#059669', color: 'white' }}>Thực hiện</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
