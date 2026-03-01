import { useState } from 'react'
import { FiClock, FiAlertTriangle, FiPhone, FiTrendingUp, FiUsers, FiCalendar } from 'react-icons/fi'

const hours = Array.from({ length: 12 }, (_, i) => i + 7)
const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
const heatmapData = days.map(d => hours.map(h => {
    const peak = (h >= 9 && h <= 11) || (h >= 14 && h <= 16)
    const sat = d === 'T7' || d === 'CN'
    return Math.min(100, Math.round((peak ? 70 : 30) + (sat ? 20 : 0) + Math.random() * 20))
}))

const noShowRisks = [
    { name: 'Nguyễn Văn A', time: '09:00', service: 'Laser CO2', risk: 75, reason: 'Đã no-show 2 lần gần đây', phone: '0901234567' },
    { name: 'Trần Thị B', time: '10:30', service: 'Hydrafacial', risk: 62, reason: 'Hủy lần trước 30p trước giờ hẹn', phone: '0912345678' },
    { name: 'Lê Văn C', time: '14:00', service: 'PRP', risk: 45, reason: 'Khách vãng lai, ít lịch sử', phone: '0923456789' },
    { name: 'Phạm Thị D', time: '15:30', service: 'Chemical Peel', risk: 35, reason: 'Compliance TB, 1 lần đổi lịch', phone: '0934567890' },
    { name: 'Hoàng Văn E', time: '16:00', service: 'Mesotherapy', risk: 20, reason: 'Khách VIP, luôn đúng hẹn', phone: '0945678901' },
]

const suggestions = [
    { action: 'Gọi nhắc lịch', target: 'Nguyễn Văn A', detail: 'Risk 75% → Gọi trước 24h + SMS xác nhận', impact: '+40% giảm no-show', type: 'call' },
    { action: 'Overbooking slot 09:00', target: 'T6 tuần này', detail: 'Slot 09:00 T6 trống 35% → thêm 1 KH standby', impact: '+15% utilization', type: 'overbook' },
    { action: 'Dời lịch gợi ý', target: 'Trần Thị B', detail: 'Đổi sang T4 10:00 (trống) thay vì T5 10:30 (full)', impact: 'Cân bằng load', type: 'move' },
    { action: 'SMS nhắc hẹn tự động', target: '5 KH ngày mai', detail: 'Gửi SMS trước 12h cho lịch hẹn ngày mai', impact: '+25% confirm rate', type: 'sms' },
]

export default function AIScheduleOptimize() {
    const [tab, setTab] = useState('heatmap')
    const utilization = 72
    const noShowRate = 12

    const getColor = (v) => {
        if (v >= 80) return '#dc2626'
        if (v >= 60) return '#f59e0b'
        if (v >= 40) return '#10b981'
        return '#e2e8f0'
    }

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiClock size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Tối ưu Lịch hẹn</h2>
                        <p>Heatmap lịch • Dự đoán no-show • Đề xuất tối ưu slot</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Utilization', v: `${utilization}%` }, { l: 'No-show rate', v: `${noShowRate}%` }, { l: 'Lịch hôm nay', v: 24 }, { l: 'AI đề xuất', v: suggestions.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'heatmap', label: '🗓️ Heatmap Occupancy' }, { id: 'noshow', label: '⚠️ No-show Risk' }, { id: 'actions', label: '🤖 AI Đề xuất' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#7c3aed' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'heatmap' && (
                <div className="premium-card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 16 }}>Mức độ lấp đầy lịch hẹn theo giờ</h3>
                    <div className="premium-table-wrap" style={{ border: 'none' }}>
                        <table style={{ minWidth: 500 }}>
                            <thead><tr>
                                <th style={{ padding: '6px 10px', fontSize: 10, color: '#94a3b8', fontWeight: 600, background: 'transparent' }}></th>
                                {hours.map(h => <th key={h} style={{ padding: '6px 4px', fontSize: 10, textAlign: 'center', color: '#94a3b8', fontWeight: 600, background: 'transparent' }}>{h}:00</th>)}
                            </tr></thead>
                            <tbody>
                                {days.map((d, di) => (
                                    <tr key={d} style={{ border: 'none' }}>
                                        <td style={{ padding: '4px 8px', fontSize: 11, fontWeight: 600, color: '#64748b' }}>{d}</td>
                                        {heatmapData[di].map((v, hi) => (
                                            <td key={hi} style={{ padding: 2, textAlign: 'center' }}>
                                                <div style={{ width: '100%', minWidth: 28, height: 28, borderRadius: 4, background: getColor(v), opacity: 0.15 + (v / 130), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: v >= 60 ? 'white' : '#64748b' }}>
                                                    {v}%
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[{ c: '#e2e8f0', l: '<40% Trống' }, { c: '#10b981', l: '40-60% Tốt' }, { c: '#f59e0b', l: '60-80% Gần đầy' }, { c: '#dc2626', l: '>80% Quá tải' }].map((lg, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#64748b' }}>
                                <div style={{ width: 12, height: 12, borderRadius: 2, background: lg.c }} /> {lg.l}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'noshow' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
                        <FiAlertTriangle size={14} /> AI phân tích hành vi → dự đoán xác suất no-show
                    </div>
                    {noShowRisks.map((r, i) => (
                        <div key={i} className="premium-card" style={{ borderLeft: `3px solid ${r.risk >= 60 ? '#dc2626' : r.risk >= 40 ? '#f59e0b' : '#10b981'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: r.risk >= 60 ? '#fef2f2' : r.risk >= 40 ? '#fffbeb' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: r.risk >= 60 ? '#dc2626' : r.risk >= 40 ? '#d97706' : '#059669' }}>
                                    {r.risk}%
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{r.name} — {r.time}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.service} • {r.reason}</div>
                                </div>
                                <a href={`tel:${r.phone}`} className="premium-action-btn" style={{ background: '#7c3aed', color: 'white', display: 'inline-flex', alignItems: 'center', gap: 4, width: 'auto' }}>
                                    <FiPhone size={12} /> Gọi
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'actions' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#5b21b6' }}>
                        <FiTrendingUp size={14} /> AI đề xuất hành động tối ưu dựa trên dữ liệu lịch sử
                    </div>
                    {suggestions.map((s, i) => (
                        <div key={i} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <span style={{ fontSize: 16 }}>{s.type === 'call' ? '📞' : s.type === 'overbook' ? '📈' : s.type === 'move' ? '↔️' : '💬'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.action}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.target}</div>
                                </div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: '#ecfdf5', color: '#059669' }}>{s.impact}</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>{s.detail}</div>
                            <button className="premium-action-btn" style={{ background: '#7c3aed', color: 'white' }}>Thực hiện</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
