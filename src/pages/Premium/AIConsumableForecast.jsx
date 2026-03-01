import { useState } from 'react'
import { FiDroplet, FiCalendar, FiAlertTriangle, FiTrendingDown, FiBarChart2, FiPackage } from 'react-icons/fi'

const consumables = [
    { name: 'Serum HA', unit: 'ml', stock: 450, predicted: 620, shortage: 170, bookings: 28, perUse: 5, status: 'shortage' },
    { name: 'Mask Collagen', unit: 'miếng', stock: 35, predicted: 22, shortage: 0, bookings: 22, perUse: 1, status: 'ok' },
    { name: 'Gel Siêu âm', unit: 'ml', stock: 800, predicted: 540, shortage: 0, bookings: 18, perUse: 30, status: 'ok' },
    { name: 'Kim Meso', unit: 'cái', stock: 15, predicted: 24, shortage: 9, bookings: 12, perUse: 2, status: 'shortage' },
    { name: 'Kem tê EMLA', unit: 'tuýp', stock: 8, predicted: 14, shortage: 6, bookings: 14, perUse: 1, status: 'shortage' },
    { name: 'Bông tẩy trang', unit: 'miếng', stock: 200, predicted: 120, shortage: 0, bookings: 40, perUse: 3, status: 'ok' },
    { name: 'Serum Vitamin C', unit: 'ml', stock: 180, predicted: 200, shortage: 20, bookings: 10, perUse: 3, status: 'low' },
]

const weeklyForecast = [
    { week: 'Tuần 1 (1-7/3)', serum: 155, mask: 6, gel: 135 },
    { week: 'Tuần 2 (8-14/3)', serum: 180, mask: 8, gel: 150 },
    { week: 'Tuần 3 (15-21/3)', serum: 140, mask: 5, gel: 120 },
    { week: 'Tuần 4 (22-28/3)', serum: 145, mask: 3, gel: 135 },
]

const savings = { monthly: '3.200.000đ', wasteReduction: 22, accuracy: 91 }
const maxSerum = Math.max(...weeklyForecast.map(w => w.serum))

export default function AIConsumableForecast() {
    const [tab, setTab] = useState('forecast')

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #7e22ce, #c084fc)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiDroplet size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Dự đoán Vật tư Tiêu hao</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Dự đoán theo booking • Cảnh báo thiếu • Tiết kiệm lãng phí</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Tiết kiệm/tháng', v: savings.monthly }, { l: 'Giảm lãng phí', v: `${savings.wasteReduction}%` }, { l: 'Độ chính xác', v: `${savings.accuracy}%` }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'forecast', label: '📊 Dự đoán tuần tới' }, { id: 'weekly', label: '📅 Forecast 4 tuần' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#7e22ce' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'forecast' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    {consumables.filter(c => c.status === 'shortage').length > 0 && (
                        <div style={{ padding: '10px 16px', background: '#fef2f2', borderBottom: '1px solid #fecaca', fontSize: 12, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <FiAlertTriangle size={14} /> {consumables.filter(c => c.status === 'shortage').length} vật tư cần đặt hàng ngay!
                        </div>
                    )}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#f8fafc' }}>
                            {['Vật tư', 'Tồn kho', 'Dự đoán cần', 'Thiếu', 'Bookings', 'Trạng thái'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11 }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {consumables.map((c, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: c.status === 'shortage' ? '#fef2f220' : 'white' }}>
                                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                                    <td style={{ padding: '10px 14px' }}>{c.stock} {c.unit}</td>
                                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#7e22ce' }}>{c.predicted} {c.unit}</td>
                                    <td style={{ padding: '10px 14px', fontWeight: 700, color: c.shortage > 0 ? '#dc2626' : '#059669' }}>{c.shortage > 0 ? `-${c.shortage}` : '✓'}</td>
                                    <td style={{ padding: '10px 14px', color: '#64748b' }}>{c.bookings} lịch</td>
                                    <td style={{ padding: '10px 14px' }}>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                            background: c.status === 'shortage' ? '#fef2f2' : c.status === 'low' ? '#fffbeb' : '#ecfdf5',
                                            color: c.status === 'shortage' ? '#dc2626' : c.status === 'low' ? '#d97706' : '#059669'
                                        }}>{c.status === 'shortage' ? '🔴 Thiếu' : c.status === 'low' ? '🟡 Sắp hết' : '🟢 Đủ'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'weekly' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📅 Dự đoán Serum (ml) theo tuần</h3>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 150, marginBottom: 8 }}>
                        {weeklyForecast.map((w, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#7e22ce' }}>{w.serum}</span>
                                <div style={{ width: '80%', height: `${(w.serum / maxSerum) * 120}px`, borderRadius: 6, background: 'linear-gradient(to top, #7e22ce, #c084fc)' }} />
                                <span style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center' }}>{w.week.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700 }}>Tổng hợp 4 tuần</h4>
                        {[{ l: 'Serum tổng', v: `${weeklyForecast.reduce((a, w) => a + w.serum, 0)} ml` },
                        { l: 'Mask tổng', v: `${weeklyForecast.reduce((a, w) => a + w.mask, 0)} miếng` },
                        { l: 'Gel tổng', v: `${weeklyForecast.reduce((a, w) => a + w.gel, 0)} ml` }].map((s, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc', fontSize: 13 }}>
                                <span style={{ color: '#64748b' }}>{s.l}</span>
                                <span style={{ fontWeight: 700, color: '#7e22ce' }}>{s.v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
