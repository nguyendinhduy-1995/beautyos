import { useState } from 'react'
import { FiMap, FiUsers, FiTrendingUp, FiTarget, FiChevronRight, FiDollarSign } from 'react-icons/fi'

const stages = [
    { name: 'Quảng cáo', icon: '📢', count: 10000, rate: 100 },
    { name: 'Tư vấn', icon: '💬', count: 2500, rate: 25 },
    { name: 'Đặt hẹn', icon: '📅', count: 1200, rate: 48 },
    { name: 'Điều trị', icon: '💊', count: 800, rate: 67 },
    { name: 'Homecare', icon: '🏠', count: 600, rate: 75 },
    { name: 'Tái khám', icon: '🔄', count: 420, rate: 70 },
    { name: 'Trung thành', icon: '⭐', count: 280, rate: 67 },
]

const dropoffs = [
    { from: 'Quảng cáo → Tư vấn', dropRate: 75, lost: 7500, suggestion: 'Tối ưu landing page + CTA rõ ràng hơn. A/B test tiêu đề quảng cáo.', impact: 'high' },
    { from: 'Đặt hẹn → Điều trị', dropRate: 33, lost: 400, suggestion: 'Gửi SMS nhắc hẹn 2 lần (24h + 1h trước). Giảm 15% drop-off.', impact: 'high' },
    { from: 'Điều trị → Homecare', dropRate: 25, lost: 200, suggestion: 'Gửi hướng dẫn homecare ngay sau điều trị. Push notification nhắc nhở.', impact: 'medium' },
    { from: 'Tái khám → Trung thành', dropRate: 33, lost: 140, suggestion: 'Tạo chương trình loyalty cho KH tái khám. Voucher lần tiếp theo.', impact: 'medium' },
]

const ltvSegments = [
    { segment: 'VIP', criteria: '>50M', count: 28, avgLtv: '68.5M', color: '#f59e0b' },
    { segment: 'Premium', criteria: '20-50M', count: 85, avgLtv: '32.1M', color: '#3b82f6' },
    { segment: 'Standard', criteria: '<20M', count: 167, avgLtv: '8.4M', color: '#94a3b8' },
]

const totalCustomers = stages[stages.length - 1].count
const maxCount = stages[0].count

export default function AICustomerJourney() {
    const [tab, setTab] = useState('journey')

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f766e, #2dd4bf)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiMap size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Hành trình Khách hàng 360°</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Bản đồ touchpoint • Phát hiện drop-off • LTV Analysis</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'journey', label: '🗺️ Hành trình' }, { id: 'dropoff', label: '📉 Drop-off' }, { id: 'ltv', label: '💰 LTV' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#0f766e' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'journey' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 24 }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700 }}>📊 Funnel chuyển đổi</h3>
                    {stages.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <div style={{ width: 80, textAlign: 'right', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                <span>{s.icon}</span>
                                <span style={{ fontWeight: 600, color: '#374151' }}>{s.name}</span>
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <div style={{ width: `${(s.count / maxCount) * 100}%`, height: 32, borderRadius: 6, background: `linear-gradient(90deg, #0f766e, #2dd4bf)`, opacity: 0.2 + (0.8 * s.count / maxCount), display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{s.count.toLocaleString()}</span>
                                </div>
                            </div>
                            {i > 0 && (
                                <span style={{ fontSize: 11, fontWeight: 600, color: s.rate >= 70 ? '#059669' : s.rate >= 40 ? '#d97706' : '#dc2626', width: 40, textAlign: 'right' }}>{s.rate}%</span>
                            )}
                        </div>
                    ))}
                    <div style={{ marginTop: 12, fontSize: 12, color: '#64748b', textAlign: 'center' }}>
                        Tổng chuyển đổi: {stages[0].count.toLocaleString()} → {stages[stages.length - 1].count.toLocaleString()} ({((stages[stages.length - 1].count / stages[0].count) * 100).toFixed(1)}%)
                    </div>
                </div>
            )}

            {tab === 'dropoff' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {dropoffs.map((d, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: `1px solid ${d.impact === 'high' ? '#fecaca' : '#e5e7eb'}`, padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <span style={{ fontSize: 16 }}>{d.impact === 'high' ? '🔴' : '🟡'}</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{d.from}</span>
                                <span style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 800, color: '#dc2626' }}>-{d.dropRate}%</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Mất {d.lost.toLocaleString()} khách tại bước này</div>
                            <div style={{ fontSize: 12, color: '#059669', background: '#ecfdf5', borderRadius: 8, padding: '8px 10px' }}>💡 {d.suggestion}</div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'ltv' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {ltvSegments.map((s, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20, textAlign: 'center' }}>
                            <div style={{ width: 56, height: 56, borderRadius: 14, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                                <FiDollarSign size={24} color={s.color} />
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.segment}</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>{s.criteria}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div><div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{s.count}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Khách</div></div>
                                <div><div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.avgLtv}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>LTV TB</div></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
