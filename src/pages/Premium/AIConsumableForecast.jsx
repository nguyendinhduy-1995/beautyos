import { useState } from 'react'
import { FiDroplet, FiAlertTriangle, FiTrendingUp, FiCalendar, FiBarChart2, FiPackage } from 'react-icons/fi'

const consumables = [
    { id: 1, name: 'Bông tẩy trang', unit: 'gói', stock: 15, weeklyUsage: 8, prediction: [8, 10, 9, 12], shortage: false, category: 'Cleansing' },
    { id: 2, name: 'Gel siêu âm 500ml', unit: 'chai', stock: 3, weeklyUsage: 5, prediction: [5, 6, 7, 6], shortage: true, category: 'Treatment' },
    { id: 3, name: 'Mask giấy compressed', unit: 'hộp', stock: 8, weeklyUsage: 4, prediction: [4, 5, 5, 6], shortage: false, category: 'Mask' },
    { id: 4, name: 'Kem dưỡng ẩm sample', unit: 'lọ', stock: 2, weeklyUsage: 6, prediction: [6, 7, 8, 7], shortage: true, category: 'Sample' },
    { id: 5, name: 'Găng tay y tế M', unit: 'hộp', stock: 25, weeklyUsage: 3, prediction: [3, 3, 4, 3], shortage: false, category: 'Protection' },
    { id: 6, name: 'Kim tiêm meso 32G', unit: 'hộp', stock: 4, weeklyUsage: 3, prediction: [3, 4, 5, 5], shortage: true, category: 'Treatment' },
    { id: 7, name: 'Giấy bạc quấn tóc', unit: 'cuộn', stock: 12, weeklyUsage: 2, prediction: [2, 2, 3, 2], shortage: false, category: 'Accessory' },
    { id: 8, name: 'Serum HA mini 5ml', unit: 'lọ', stock: 1, weeklyUsage: 10, prediction: [10, 12, 14, 11], shortage: true, category: 'Treatment' },
]

const alerts = [
    { item: 'Serum HA mini 5ml', severity: 'critical', message: 'Chỉ còn 1 lọ — hết trong <1 ngày', action: 'Đặt hàng ngay 100 lọ' },
    { item: 'Kem dưỡng ẩm sample', severity: 'critical', message: 'Còn 2 lọ — hết trong 2 ngày', action: 'Đặt hàng 50 lọ' },
    { item: 'Gel siêu âm 500ml', severity: 'high', message: 'Còn 3 chai — hết trong 4 ngày', action: 'Đặt hàng 20 chai' },
    { item: 'Kim tiêm meso 32G', severity: 'medium', message: 'Còn 4 hộp — hết trong 1 tuần', action: 'Đặt hàng 10 hộp' },
]

export default function AIConsumableForecast() {
    const [tab, setTab] = useState('overview')
    const totalItems = consumables.length
    const shortageCount = consumables.filter(c => c.shortage).length
    const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiDroplet size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Dự đoán Vật tư Tiêu hao</h2>
                        <p>Dự đoán usage 4 tuần • Cảnh báo hết hàng • Auto đặt hàng</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng vật tư', v: totalItems }, { l: 'Sắp hết', v: shortageCount }, { l: 'Cảnh báo', v: alerts.length }, { l: 'Dự đoán', v: '4 tuần' }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'overview', label: '📦 Tổng quan' }, { id: 'forecast', label: '📈 Dự đoán 4 tuần' }, { id: 'alerts', label: '🚨 Cảnh báo' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0d9488' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Vật tư', 'Đơn vị', 'Tồn kho', 'Usage/tuần', 'Còn (ngày)', 'Trạng thái'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {consumables.map(c => {
                                const daysLeft = c.weeklyUsage > 0 ? Math.round((c.stock / c.weeklyUsage) * 7) : 999
                                return (
                                    <tr key={c.id}>
                                        <td><div style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>{c.category}</div></td>
                                        <td style={{ color: '#64748b' }}>{c.unit}</td>
                                        <td><span style={{ fontWeight: 700, color: c.shortage ? '#dc2626' : '#059669' }}>{c.stock}</span></td>
                                        <td style={{ color: '#64748b' }}>{c.weeklyUsage}</td>
                                        <td><span style={{ fontWeight: 600, color: daysLeft <= 3 ? '#dc2626' : daysLeft <= 7 ? '#d97706' : '#059669' }}>{daysLeft}d</span></td>
                                        <td>
                                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: c.shortage ? '#fef2f2' : '#ecfdf5', color: c.shortage ? '#dc2626' : '#059669' }}>
                                                {c.shortage ? '⚠️ Hết sớm' : '✅ OK'}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'forecast' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46' }}>
                        <FiBarChart2 size={14} /> AI dự đoán nhu cầu dựa trên lịch hẹn + mùa vụ + trend
                    </div>
                    {consumables.filter(c => c.shortage).map(c => (
                        <div key={c.id} className="premium-card" style={{ borderLeft: '3px solid #0d9488' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{c.name}</div>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                                {weeks.map((w, i) => (
                                    <div key={i} style={{ flex: 1, minWidth: 60, textAlign: 'center', padding: '8px 6px', background: '#f8fafc', borderRadius: 8 }}>
                                        <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>{w}</div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: c.prediction[i] > c.stock ? '#dc2626' : '#0d9488' }}>{c.prediction[i]}</div>
                                        <div style={{ fontSize: 9, color: '#94a3b8' }}>{c.unit}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 11, color: '#64748b' }}>Tồn hiện tại: <strong>{c.stock}</strong> {c.unit}</span>
                                <button className="premium-action-btn" style={{ background: '#0d9488', color: 'white' }}>Đặt hàng</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {alerts.map((a, i) => (
                        <div key={i} className="premium-card" style={{ borderLeft: `3px solid ${a.severity === 'critical' ? '#dc2626' : a.severity === 'high' ? '#f59e0b' : '#0d9488'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                <span style={{ fontSize: 16 }}>{a.severity === 'critical' ? '🚨' : a.severity === 'high' ? '⚠️' : '📋'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{a.item}</div>
                                    <div style={{ fontSize: 11, color: '#64748b' }}>{a.message}</div>
                                </div>
                            </div>
                            <button className="premium-action-btn" style={{ background: a.severity === 'critical' ? '#dc2626' : '#0d9488', color: 'white' }}>{a.action}</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
