import { useState } from 'react'
import { FiCalendar, FiClock, FiUsers, FiAlertTriangle, FiTrendingUp, FiGrid } from 'react-icons/fi'

const heatmapData = [
    { day: 'T2', hours: [20, 35, 50, 75, 90, 85, 70, 55, 40, 30, 15, 10] },
    { day: 'T3', hours: [15, 30, 45, 65, 80, 75, 60, 50, 35, 25, 10, 5] },
    { day: 'T4', hours: [25, 40, 55, 80, 95, 90, 75, 60, 45, 35, 20, 15] },
    { day: 'T5', hours: [18, 32, 48, 70, 85, 80, 65, 52, 38, 28, 12, 8] },
    { day: 'T6', hours: [30, 45, 60, 85, 98, 95, 80, 65, 50, 40, 25, 18] },
    { day: 'T7', hours: [40, 55, 70, 90, 100, 98, 85, 72, 58, 45, 30, 22] },
    { day: 'CN', hours: [35, 50, 65, 88, 95, 92, 78, 65, 52, 40, 28, 20] },
]
const timeSlots = ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h']

const noshowList = [
    { name: 'Trần Thị Mai', phone: '0912345678', service: 'Hifu', time: '10:00 T6', prob: 45, history: '3/10 no-show' },
    { name: 'Lê Văn Hoàng', phone: '0987654321', service: 'Filler', time: '14:00 T6', prob: 38, history: '2/8 no-show' },
    { name: 'Phạm Thị Lan', phone: '0909123456', service: 'Laser', time: '11:00 T7', prob: 32, history: '2/6 no-show' },
    { name: 'Đỗ Hữu Nghĩa', phone: '0933456789', service: 'Mesotherapy', time: '15:00 T7', prob: 25, history: '1/5 no-show' },
]

const stats = { fillRate: 78, avgWait: '12 phút', emptySlots: 15, overbookRate: '8%' }

export default function AIScheduleOptimize() {
    const [tab, setTab] = useState('heatmap')

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #4338ca, #818cf8)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCalendar size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Tối ưu Lịch hẹn</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Peak hours • Dự đoán no-show • Tối ưu phòng & nhân viên</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Tỉ lệ lấp đầy', v: `${stats.fillRate}%` }, { l: 'Chờ TB', v: stats.avgWait }, { l: 'Slot trống', v: stats.emptySlots }, { l: 'Overbook', v: stats.overbookRate }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'heatmap', label: '🔥 Heatmap' }, { id: 'noshow', label: '⚠️ Dự đoán No-show' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#4338ca' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'heatmap' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📊 Heatmap giờ × ngày (% lấp đầy)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(12, 1fr)', gap: 2 }}>
                        <div></div>
                        {timeSlots.map(t => <div key={t} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#94a3b8', padding: '4px 0' }}>{t}</div>)}
                        {heatmapData.map(d => (
                            <>
                                <div key={d.day} style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center' }}>{d.day}</div>
                                {d.hours.map((v, i) => (
                                    <div key={i} style={{ height: 28, borderRadius: 4, background: v >= 90 ? '#dc2626' : v >= 70 ? '#f59e0b' : v >= 40 ? '#3b82f6' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: v >= 40 ? 'white' : '#94a3b8' }}>{v}</div>
                                ))}
                            </>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 12, justifyContent: 'center' }}>
                        {[{ c: '#e2e8f0', l: '<40%' }, { c: '#3b82f6', l: '40-70%' }, { c: '#f59e0b', l: '70-90%' }, { c: '#dc2626', l: '>90%' }].map((lg, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#64748b' }}>
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: lg.c }} />{lg.l}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'noshow' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {noshowList.map((n, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: `1px solid ${n.prob >= 40 ? '#fecaca' : n.prob >= 30 ? '#fde68a' : '#e5e7eb'}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: n.prob >= 40 ? '#fef2f2' : n.prob >= 30 ? '#fffbeb' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: n.prob >= 40 ? '#dc2626' : n.prob >= 30 ? '#d97706' : '#64748b' }}>
                                {n.prob}%
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{n.name}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{n.service} • {n.time} • {n.history}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', color: '#374151' }}>📞 Nhắc</button>
                                <button style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#4338ca', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', color: 'white' }}>Overbook</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
