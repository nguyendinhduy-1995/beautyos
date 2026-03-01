import { useState } from 'react'
import { FiCamera, FiStar, FiTrendingUp, FiActivity, FiDroplet, FiSun } from 'react-icons/fi'

const skinResults = [
    { zone: 'Trán', acne: 25, spots: 15, aging: 10, moisture: 72, pores: 30 },
    { zone: 'Má trái', acne: 40, spots: 20, aging: 15, moisture: 65, pores: 35 },
    { zone: 'Má phải', acne: 35, spots: 18, aging: 12, moisture: 68, pores: 32 },
    { zone: 'Cằm', acne: 55, spots: 10, aging: 8, moisture: 60, pores: 45 },
]

const overallScore = { acne: 39, spots: 16, aging: 11, moisture: 66, pores: 36 }
const prevScore = { acne: 48, spots: 22, aging: 14, moisture: 58, pores: 42 }

const treatments = [
    { name: 'Laser trị mụn CO2', match: 95, reason: 'Mụn vùng cằm & má cao, laser giúp giảm 60% sau 3 buổi', sessions: 3, price: '3.500.000đ/buổi' },
    { name: 'Mesotherapy cấp ẩm', match: 88, reason: 'Độ ẩm TB 66% (thấp), cần cấp ẩm sâu liệu trình 4 tuần', sessions: 4, price: '2.800.000đ/buổi' },
    { name: 'Peel da hóa chất AHA/BHA', match: 82, reason: 'Lỗ chân lông to vùng cằm, peel giúp se khít & làm sạch', sessions: 6, price: '1.500.000đ/buổi' },
    { name: 'LED Light Therapy', match: 75, reason: 'Hỗ trợ phục hồi sau laser, giảm viêm, kích thích collagen', sessions: 8, price: '800.000đ/buổi' },
]

const history = [
    { date: '15/01/2026', score: 52, note: 'Lần đầu phân tích' },
    { date: '15/02/2026', score: 61, note: 'Sau 1 tháng điều trị laser' },
    { date: '01/03/2026', score: 71, note: 'Cải thiện rõ sau mesotherapy' },
]

const metrics = [
    { key: 'acne', label: 'Mụn', color: '#dc2626' },
    { key: 'spots', label: 'Nám', color: '#d97706' },
    { key: 'aging', label: 'Lão hóa', color: '#7c3aed' },
    { key: 'moisture', label: 'Độ ẩm', color: '#0891b2', invert: true },
    { key: 'pores', label: 'Lỗ chân lông', color: '#ea580c' },
]

export default function AISkinAnalysis() {
    const [tab, setTab] = useState('analysis')

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #db2777, #f472b6)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCamera size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Phân tích Da</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Chụp ảnh → AI phân tích → Gợi ý liệu trình cá nhân hóa</p>
                    </div>
                    <button style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiCamera size={14} /> Chụp ảnh mới
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'analysis', label: '🔬 Phân tích' }, { id: 'treatments', label: '💊 Gợi ý liệu trình' }, { id: 'history', label: '📈 Theo dõi' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#db2777' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'analysis' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {/* Overall radar-like display */}
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📊 Tổng quan da</h3>
                        {metrics.map((m, i) => {
                            const val = overallScore[m.key]
                            const prev = prevScore[m.key]
                            const improved = m.invert ? val > prev : val < prev
                            const diff = m.invert ? val - prev : prev - val
                            return (
                                <div key={i} style={{ marginBottom: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 600, color: '#374151' }}>{m.label}</span>
                                        <span style={{ fontWeight: 700, color: improved ? '#059669' : '#dc2626' }}>
                                            {m.invert ? `${val}%` : `${val}/100`} {improved ? `↑${Math.abs(diff)}` : `↓${Math.abs(diff)}`}
                                        </span>
                                    </div>
                                    <div style={{ height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                                        <div style={{ width: `${m.invert ? val : 100 - val}%`, height: '100%', borderRadius: 4, background: m.color, transition: 'width 0.5s' }} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Zone analysis */}
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>🔍 Phân tích theo vùng</h3>
                        {skinResults.map((z, i) => (
                            <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{z.zone}</div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {[{ l: 'Mụn', v: z.acne, c: '#dc2626' }, { l: 'Nám', v: z.spots, c: '#d97706' }, { l: 'Ẩm', v: z.moisture, c: '#0891b2' }, { l: 'Lỗ', v: z.pores, c: '#ea580c' }].map((m, j) => (
                                        <div key={j} style={{ flex: 1, textAlign: 'center', background: `${m.c}10`, borderRadius: 6, padding: '4px 0' }}>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: m.c }}>{m.v}</div>
                                            <div style={{ fontSize: 9, color: '#94a3b8' }}>{m.l}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'treatments' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {treatments.map((t, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, #db277720, #f472b610)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#db2777' }}>
                                {t.match}%
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t.reason}</div>
                                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{t.sessions} buổi • {t.price}</div>
                            </div>
                            <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#db2777', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Đặt lịch</button>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'history' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📈 Timeline cải thiện</h3>
                    {history.map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${h.score >= 70 ? '#05966920' : h.score >= 55 ? '#d9770620' : '#dc262620'}, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: h.score >= 70 ? '#059669' : h.score >= 55 ? '#d97706' : '#dc2626' }}>
                                {h.score}
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{h.date}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{h.note}</div>
                            </div>
                            {i > 0 && <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#059669' }}>+{h.score - history[i - 1].score} điểm</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
