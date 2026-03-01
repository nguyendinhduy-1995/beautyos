import { useState } from 'react'
import { FiTarget, FiTrendingUp, FiAward, FiUsers, FiStar, FiBarChart2 } from 'react-icons/fi'
import { staff as staffData } from '../../data/mockData'

const kpiData = staffData.filter(s => s.status === 'active').slice(0, 8).map((s, i) => ({
    id: s.id, name: s.name, role: s.role || 'KTV', avatar: s.avatar,
    revenue: Math.floor(Math.random() * 60 + 20) * 1000000,
    customers: Math.floor(Math.random() * 30 + 10),
    satisfaction: Math.floor(Math.random() * 20 + 80),
    onTime: Math.floor(Math.random() * 15 + 85),
    upsell: Math.floor(Math.random() * 25 + 5),
    kpiScore: Math.floor(Math.random() * 30 + 70),
})).sort((a, b) => b.kpiScore - a.kpiScore)

const teamMetrics = [
    { label: 'Doanh thu TB/NV', value: `${Math.round(kpiData.reduce((s, k) => s + k.revenue, 0) / kpiData.length / 1000000)}M`, trend: '+12%' },
    { label: 'Satisfaction TB', value: `${Math.round(kpiData.reduce((s, k) => s + k.satisfaction, 0) / kpiData.length)}%`, trend: '+3%' },
    { label: 'On-time TB', value: `${Math.round(kpiData.reduce((s, k) => s + k.onTime, 0) / kpiData.length)}%`, trend: '+5%' },
    { label: 'Upsell rate TB', value: `${Math.round(kpiData.reduce((s, k) => s + k.upsell, 0) / kpiData.length)}%`, trend: '+8%' },
]

export default function StaffKPI() {
    const [tab, setTab] = useState('ranking')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiTarget size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>KPI Nhân viên</h2>
                        <p>Xếp hạng • Doanh thu • Satisfaction • Upsell tracking</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Nhân viên', v: kpiData.length }, { l: 'Top score', v: `${kpiData[0]?.kpiScore}%` }, { l: 'TB Score', v: `${Math.round(kpiData.reduce((s, k) => s + k.kpiScore, 0) / kpiData.length)}%` }, { l: 'Tháng', v: 'T3/2026' }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'ranking', label: '🏆 Xếp hạng' }, { id: 'team', label: '📊 Team' }, { id: 'detail', label: '📋 Chi tiết' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0369a1' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'ranking' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {kpiData.map((k, i) => (
                        <div key={k.id} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, background: i < 3 ? ['#fffbeb', '#f1f5f9', '#fff7ed'][i] : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{k.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{k.role}</div>
                                </div>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: `conic-gradient(${k.kpiScore >= 90 ? '#059669' : k.kpiScore >= 75 ? '#0369a1' : '#d97706'} ${k.kpiScore}%, #f1f5f9 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: k.kpiScore >= 90 ? '#059669' : k.kpiScore >= 75 ? '#0369a1' : '#d97706' }}>{k.kpiScore}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                <span>💰 {(k.revenue / 1000000).toFixed(0)}M</span>
                                <span>👥 {k.customers} KH</span>
                                <span>⭐ {k.satisfaction}%</span>
                                <span>⏰ {k.onTime}%</span>
                                <span>📈 {k.upsell}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'team' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-cards-grid">
                        {teamMetrics.map((m, i) => (
                            <div key={i} className="premium-card" style={{ padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#0369a1' }}>{m.value}</div>
                                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{m.label}</div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: '#059669' }}>{m.trend}</span>
                            </div>
                        ))}
                    </div>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>📊 Phân bổ KPI Score</h3>
                        {[{ range: '90-100%', label: 'Xuất sắc', count: kpiData.filter(k => k.kpiScore >= 90).length, color: '#059669', bg: '#ecfdf5' },
                        { range: '75-89%', label: 'Tốt', count: kpiData.filter(k => k.kpiScore >= 75 && k.kpiScore < 90).length, color: '#0369a1', bg: '#eff6ff' },
                        { range: '60-74%', label: 'Trung bình', count: kpiData.filter(k => k.kpiScore >= 60 && k.kpiScore < 75).length, color: '#d97706', bg: '#fffbeb' },
                        { range: '<60%', label: 'Cần cải thiện', count: kpiData.filter(k => k.kpiScore < 60).length, color: '#dc2626', bg: '#fef2f2' }].map((r, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ width: 70, fontSize: 12, fontWeight: 600, color: r.color }}>{r.range}</span>
                                <div style={{ flex: 1, height: 20, borderRadius: 6, background: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{ width: `${(r.count / kpiData.length) * 100}%`, height: '100%', borderRadius: 6, background: r.color, minWidth: r.count > 0 ? 20 : 0 }} />
                                </div>
                                <span style={{ width: 50, fontSize: 12, fontWeight: 700, color: r.color }}>{r.count} NV</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'detail' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['NV', 'Doanh thu', 'KH', 'Satisfaction', 'On-time', 'Upsell', 'KPI Score'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {kpiData.map(k => (
                                <tr key={k.id}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{k.name}</td>
                                    <td style={{ fontWeight: 600, color: '#059669' }}>{(k.revenue / 1000000).toFixed(0)}M</td>
                                    <td style={{ textAlign: 'center' }}>{k.customers}</td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: k.satisfaction >= 90 ? '#ecfdf5' : '#fffbeb', color: k.satisfaction >= 90 ? '#059669' : '#d97706' }}>{k.satisfaction}%</span></td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: k.onTime >= 90 ? '#ecfdf5' : '#fffbeb', color: k.onTime >= 90 ? '#059669' : '#d97706' }}>{k.onTime}%</span></td>
                                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{k.upsell}%</td>
                                    <td><span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 800, background: k.kpiScore >= 90 ? '#ecfdf5' : k.kpiScore >= 75 ? '#eff6ff' : '#fffbeb', color: k.kpiScore >= 90 ? '#059669' : k.kpiScore >= 75 ? '#0369a1' : '#d97706' }}>{k.kpiScore}%</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
