import { useState } from 'react'
import { FiPackage, FiAlertTriangle, FiTrendingDown, FiTrendingUp, FiRefreshCw, FiShoppingCart, FiClock, FiCheck } from 'react-icons/fi'

const inventory = [
    { id: 1, name: 'Serum Vitamin C', category: 'Mỹ phẩm', stock: 12, min: 20, usage: 8, daysLeft: 2, cost: 180000, status: 'critical' },
    { id: 2, name: 'Kem chống nắng SPF50', category: 'Mỹ phẩm', stock: 15, min: 15, usage: 5, daysLeft: 3, cost: 120000, status: 'low' },
    { id: 3, name: 'Kim tiêm filler 27G', category: 'Vật tư', stock: 8, min: 30, usage: 6, daysLeft: 1, cost: 45000, status: 'critical' },
    { id: 4, name: 'Filler HA 1ml', category: 'Dược phẩm', stock: 25, min: 20, usage: 3, daysLeft: 8, cost: 2500000, status: 'ok' },
    { id: 5, name: 'Gel siêu âm 250ml', category: 'Vật tư', stock: 6, min: 10, usage: 4, daysLeft: 2, cost: 85000, status: 'critical' },
    { id: 6, name: 'Retinol 0.5%', category: 'Mỹ phẩm', stock: 45, min: 20, usage: 2, daysLeft: 22, cost: 350000, status: 'ok' },
    { id: 7, name: 'Mặt nạ Collagen', category: 'Mỹ phẩm', stock: 18, min: 25, usage: 7, daysLeft: 3, cost: 65000, status: 'low' },
    { id: 8, name: 'Botox 50 units', category: 'Dược phẩm', stock: 30, min: 15, usage: 2, daysLeft: 15, cost: 4200000, status: 'ok' },
    { id: 9, name: 'Tẩy trang dầu 200ml', category: 'Mỹ phẩm', stock: 5, min: 15, usage: 5, daysLeft: 1, cost: 95000, status: 'critical' },
    { id: 10, name: 'Gạc y tế vô trùng', category: 'Vật tư', stock: 50, min: 30, usage: 10, daysLeft: 5, cost: 12000, status: 'ok' },
]

const aiPredictions = [
    { item: 'Kim tiêm filler 27G', action: 'Đặt ngay 50 cái', urgency: 'critical', reason: 'Hết trong 1 ngày, 3 lịch filler ngày mai' },
    { item: 'Serum Vitamin C', action: 'Đặt 30 chai', urgency: 'high', reason: 'Dưới mức tối thiểu, nhu cầu tăng 20% tháng này' },
    { item: 'Gel siêu âm 250ml', action: 'Đặt 10 chai', urgency: 'high', reason: 'Hết trong 2 ngày, 8 lịch Hifu tuần tới' },
    { item: 'Mặt nạ Collagen', action: 'Đặt 50 miếng', urgency: 'medium', reason: 'AI dự đoán nhu cầu tăng vào tháng 3 (mùa cưới)' },
]

export default function AIInventory() {
    const [filter, setFilter] = useState('all')
    const critical = inventory.filter(i => i.status === 'critical').length
    const low = inventory.filter(i => i.status === 'low').length

    const filtered = filter === 'all' ? inventory : inventory.filter(i => i.status === filter)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #9333ea, #c084fc)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiPackage size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Kho vận</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Dự báo tồn kho • Cảnh báo hết hàng • Đề xuất đặt hàng tự động</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: '🔴 Nguy hiểm', v: critical }, { l: '🟡 Sắp hết', v: low }, { l: '🟢 Đủ hàng', v: inventory.length - critical - low }, { l: 'Tổng SKU', v: inventory.length }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 16 }}>
                <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        {[{ id: 'all', label: 'Tất cả' }, { id: 'critical', label: '🔴 Nguy hiểm' }, { id: 'low', label: '🟡 Sắp hết' }].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} style={{
                                padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                                fontSize: 12, fontWeight: 600, background: filter === f.id ? '#9333ea' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b',
                            }}>{f.label}</button>
                        ))}
                    </div>
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead><tr style={{ background: '#f8fafc' }}>
                                {['Vật tư', 'Loại', 'Tồn', 'Min', 'Dùng/ngày', 'Còn', 'TT'].map(h => (
                                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {filtered.map((item, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: item.status === 'critical' ? '#fef2f208' : 'white' }}>
                                        <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                                        <td style={{ padding: '10px 12px' }}><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#f1f5f9', color: '#64748b' }}>{item.category}</span></td>
                                        <td style={{ padding: '10px 12px', fontWeight: 700, color: item.stock < item.min ? '#dc2626' : '#0f172a' }}>{item.stock}</td>
                                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.min}</td>
                                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{item.usage}</td>
                                        <td style={{ padding: '10px 12px', fontWeight: 700, color: item.daysLeft <= 2 ? '#dc2626' : item.daysLeft <= 5 ? '#d97706' : '#059669' }}>{item.daysLeft} ngày</td>
                                        <td style={{ padding: '10px 12px' }}>
                                            <span style={{ width: 8, height: 8, borderRadius: '50%', display: 'inline-block', background: item.status === 'critical' ? '#dc2626' : item.status === 'low' ? '#f59e0b' : '#059669' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>🤖 AI Đề xuất đặt hàng</h3>
                    {aiPredictions.map((p, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 12, border: `1px solid ${p.urgency === 'critical' ? '#fecaca' : p.urgency === 'high' ? '#fde68a' : '#e5e7eb'}`, padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 700, background: p.urgency === 'critical' ? '#fef2f2' : p.urgency === 'high' ? '#fffbeb' : '#f1f5f9', color: p.urgency === 'critical' ? '#dc2626' : p.urgency === 'high' ? '#d97706' : '#64748b' }}>
                                    {p.urgency === 'critical' ? '🔴 KHẨN' : p.urgency === 'high' ? '🟡 CAO' : '🟢 TB'}
                                </span>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{p.item}</div>
                            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>{p.reason}</div>
                            <button style={{ width: '100%', padding: '8px', borderRadius: 8, border: 'none', background: '#9333ea', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>
                                <FiShoppingCart size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} /> {p.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
