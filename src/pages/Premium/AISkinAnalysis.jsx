import { useState } from 'react'
import { FiCamera, FiStar, FiDroplet, FiSun, FiActivity, FiTrendingUp } from 'react-icons/fi'

const skinResults = [
    { zone: 'Trán', acne: 25, spots: 15, aging: 10, moisture: 72, pores: 30 },
    { zone: 'Má phải', acne: 40, spots: 20, aging: 15, moisture: 60, pores: 45 },
    { zone: 'Má trái', acne: 35, spots: 18, aging: 12, moisture: 65, pores: 40 },
    { zone: 'Mũi', acne: 15, spots: 5, aging: 5, moisture: 80, pores: 55 },
    { zone: 'Cằm', acne: 50, spots: 10, aging: 8, moisture: 55, pores: 35 },
]

const treatments = [
    { name: 'Laser Fractional CO2', match: 92, target: 'Sẹo mụn + lỗ chân lông', sessions: 3, price: '3,500,000đ/lần' },
    { name: 'Chemical Peel AHA 30%', match: 85, target: 'Thâm mụn + tone da', sessions: 5, price: '800,000đ/lần' },
    { name: 'Hydrafacial + Serum HA', match: 88, target: 'Cấp ẩm + se khít lỗ chân lông', sessions: 4, price: '1,200,000đ/lần' },
    { name: 'LED Light Therapy', match: 78, target: 'Giảm viêm + kích thích collagen', sessions: 8, price: '500,000đ/lần' },
    { name: 'Mesotherapy Vitamin C', match: 82, target: 'Sáng da + chống oxy hóa', sessions: 4, price: '1,500,000đ/lần' },
]

const skincare = [
    { name: 'Cleanser Gentle Foam', step: 'Bước 1: Rửa mặt', reason: 'pH 5.5, phù hợp da mụn nhạy cảm', time: 'Sáng + Tối' },
    { name: 'Toner BHA 2%', step: 'Bước 2: Toner', reason: 'Giảm bã nhờn, ngừa mụn ẩn', time: 'Tối' },
    { name: 'Serum Niacinamide 10%', step: 'Bước 3: Serum', reason: 'Thu nhỏ lỗ chân lông, giảm thâm', time: 'Sáng + Tối' },
    { name: 'Moisturizer Gel Cream', step: 'Bước 4: Dưỡng', reason: 'Cấp ẩm không gây bít tắc', time: 'Sáng + Tối' },
    { name: 'Sunscreen SPF50+ PA++++', step: 'Bước 5: Chống nắng', reason: 'Bảo vệ khỏi tia UV, ngừa thâm', time: 'Sáng' },
]

export default function AISkinAnalysis() {
    const [tab, setTab] = useState('analysis')
    const overallScore = 68

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #db2777, #f472b6)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiCamera size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Phân tích Da</h2>
                        <p>Scan 5 vùng • Đề xuất liệu trình • Skincare routine AI</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Điểm da', v: `${overallScore}/100` }, { l: 'Vùng scan', v: skinResults.length }, { l: 'Liệu trình', v: treatments.length }, { l: 'Skincare', v: `${skincare.length} bước` }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'analysis', label: '🔬 Phân tích' }, { id: 'treatments', label: '💉 Liệu trình' }, { id: 'skincare', label: '🧴 Skincare' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#db2777' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'analysis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-card" style={{ padding: 20, textAlign: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `conic-gradient(#db2777 ${overallScore}%, #f1f5f9 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#db2777' }}>{overallScore}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Điểm sức khỏe da tổng thể</div>
                        <div style={{ fontSize: 12, color: '#d97706' }}>⚠️ Cần cải thiện — Mụn + Lỗ chân lông</div>
                    </div>
                    {skinResults.map((s, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>📍 {s.zone}</div>
                            {[{ l: 'Mụn', v: s.acne, c: '#dc2626' }, { l: 'Thâm', v: s.spots, c: '#d97706' }, { l: 'Lão hóa', v: s.aging, c: '#7c3aed' }, { l: 'Độ ẩm', v: s.moisture, c: '#0ea5e9' }, { l: 'Lỗ chân lông', v: s.pores, c: '#059669' }].map((m, j) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ width: 80, fontSize: 11, color: '#64748b' }}>{m.l}</span>
                                    <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                        <div style={{ width: `${m.v}%`, height: '100%', borderRadius: 3, background: m.c, transition: 'width 0.5s' }} />
                                    </div>
                                    <span style={{ width: 30, fontSize: 11, fontWeight: 700, color: m.c, textAlign: 'right' }}>{m.v}%</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'treatments' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', color: '#9d174d' }}>
                        <FiStar size={14} /> AI đề xuất liệu trình dựa trên kết quả scan
                    </div>
                    {treatments.map((t, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: t.match >= 90 ? '#ecfdf5' : t.match >= 80 ? '#eff6ff' : '#fffbeb', color: t.match >= 90 ? '#059669' : t.match >= 80 ? '#2563eb' : '#d97706' }}>{t.match}% match</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>🎯 {t.target}</div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#94a3b8', flexWrap: 'wrap' }}>
                                <span>📅 {t.sessions} buổi</span>
                                <span>💰 {t.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'skincare' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', color: '#9d174d' }}>
                        <FiDroplet size={14} /> Routine 5 bước AI tối ưu cho tình trạng da hiện tại
                    </div>
                    {skincare.map((s, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: '3px solid #db2777' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#db2777' }}>{i + 1}</span>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                            </div>
                            <div style={{ fontSize: 12, color: '#db2777', fontWeight: 600, marginBottom: 2 }}>{s.step}</div>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{s.reason}</div>
                            <span style={{ fontSize: 11, color: '#94a3b8' }}>⏰ {s.time}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
