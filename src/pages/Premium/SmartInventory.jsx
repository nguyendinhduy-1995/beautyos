import { useState } from 'react'
import { FiPackage, FiAlertTriangle, FiZap, FiBarChart2, FiCamera, FiSearch } from 'react-icons/fi'

const products = [
    { id: 1, name: 'Serum Hyaluronic Acid', category: 'Serum', stock: 3, minStock: 10, expiry: '2026-04-15', usage: 45, status: 'critical' },
    { id: 2, name: 'Mask Collagen Gold', category: 'Mask', stock: 8, minStock: 15, expiry: '2026-03-20', status: 'low', usage: 30 },
    { id: 3, name: 'Gel Siêu âm', category: 'Gel', stock: 25, minStock: 10, expiry: '2026-08-01', status: 'ok', usage: 20 },
    { id: 4, name: 'Kem chống nắng SPF50', category: 'Kem', stock: 5, minStock: 8, expiry: '2026-05-30', status: 'low', usage: 35 },
    { id: 5, name: 'Toner Vitamin C', category: 'Toner', stock: 18, minStock: 10, expiry: '2026-12-01', status: 'ok', usage: 15 },
    { id: 6, name: 'Serum Retinol 0.5%', category: 'Serum', stock: 2, minStock: 8, expiry: '2026-03-10', status: 'expired', usage: 25 },
    { id: 7, name: 'Mask Than hoạt tính', category: 'Mask', stock: 12, minStock: 10, expiry: '2026-09-15', status: 'ok', usage: 18 },
    { id: 8, name: 'Oil Argan tự nhiên', category: 'Oil', stock: 0, minStock: 5, expiry: '2026-07-01', status: 'out', usage: 10 },
]

const aiSuggestions = [
    { product: 'Serum Hyaluronic Acid', qty: 50, reason: 'Tồn kho 3/10, usage TB 45/tháng', urgency: 'critical' },
    { product: 'Oil Argan tự nhiên', qty: 20, reason: 'Hết hàng, usage TB 10/tháng', urgency: 'critical' },
    { product: 'Mask Collagen Gold', qty: 30, reason: 'Tồn 8/15, hết hạn gần (20/03)', urgency: 'high' },
    { product: 'Kem chống nắng SPF50', qty: 25, reason: 'Tồn 5/8, mùa hè sắp tới +40% usage', urgency: 'high' },
    { product: 'Serum Retinol 0.5%', qty: 15, reason: 'Lô hiện tại hết hạn 10/03, cần thay mới', urgency: 'medium' },
]

const categories = [...new Set(products.map(p => p.category))]

export default function SmartInventory() {
    const [tab, setTab] = useState('stock')
    const [filter, setFilter] = useState('all')
    const filtered = filter === 'all' ? products : products.filter(p => p.status === filter)
    const critical = products.filter(p => p.status === 'critical' || p.status === 'out').length
    const low = products.filter(p => p.status === 'low').length
    const expiring = products.filter(p => p.status === 'expired').length

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiPackage size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Kho Thông minh</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Cảnh báo tồn kho • Hết hạn • AI đề xuất nhập • Quét mã vạch</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Hết hàng', v: critical, c: '#fef2f2' }, { l: 'Sắp hết', v: low, c: '#fffbeb' }, { l: 'Hết hạn', v: expiring, c: '#fff7ed' }, { l: 'Tổng SP', v: products.length }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'stock', label: '📦 Tồn kho' }, { id: 'suggest', label: '🤖 AI Đề xuất nhập' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#b45309' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'stock' && (
                <>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {[{ id: 'all', label: 'Tất cả' }, { id: 'critical', label: '🔴 Hết' }, { id: 'out', label: '⚫ Hết hàng' }, { id: 'low', label: '🟡 Sắp hết' }, { id: 'expired', label: '🟠 Hết hạn' }, { id: 'ok', label: '🟢 Bình thường' }].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '5px 10px', borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', background: filter === f.id ? '#b45309' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b' }}>{f.label}</button>
                        ))}
                    </div>
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead><tr style={{ background: '#f8fafc' }}>
                                {['Sản phẩm', 'Danh mục', 'Tồn kho', 'Min', 'Hết hạn', 'Usage/tháng', 'Trạng thái'].map(h => (
                                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{p.category}</td>
                                        <td style={{ padding: '10px 14px' }}>
                                            <span style={{ fontWeight: 700, color: p.stock <= 0 ? '#dc2626' : p.stock < p.minStock ? '#d97706' : '#059669' }}>{p.stock}</span>
                                        </td>
                                        <td style={{ padding: '10px 14px', color: '#94a3b8' }}>{p.minStock}</td>
                                        <td style={{ padding: '10px 14px', color: new Date(p.expiry) < new Date('2026-04-01') ? '#dc2626' : '#64748b', fontWeight: new Date(p.expiry) < new Date('2026-04-01') ? 700 : 400 }}>{p.expiry}</td>
                                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{p.usage}</td>
                                        <td style={{ padding: '10px 14px' }}>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                                background: p.status === 'critical' || p.status === 'out' ? '#fef2f2' : p.status === 'low' ? '#fffbeb' : p.status === 'expired' ? '#fff7ed' : '#ecfdf5',
                                                color: p.status === 'critical' || p.status === 'out' ? '#dc2626' : p.status === 'low' ? '#d97706' : p.status === 'expired' ? '#ea580c' : '#059669'
                                            }}>{p.status === 'critical' ? '🔴 Nguy hiểm' : p.status === 'out' ? '⚫ Hết hàng' : p.status === 'low' ? '🟡 Sắp hết' : p.status === 'expired' ? '🟠 Hết hạn' : '🟢 OK'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {tab === 'suggest' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ background: '#fffbeb', borderRadius: 12, padding: '12px 16px', border: '1px solid #fde68a', fontSize: 12, color: '#92400e', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FiZap size={14} /> AI phân tích usage 3 tháng gần → đề xuất số lượng nhập tối ưu
                    </div>
                    {aiSuggestions.map((s, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: `1px solid ${s.urgency === 'critical' ? '#fecaca' : s.urgency === 'high' ? '#fde68a' : '#e5e7eb'}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <span style={{ fontSize: 16 }}>{s.urgency === 'critical' ? '🚨' : s.urgency === 'high' ? '⚠️' : '📋'}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.product}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{s.reason}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#b45309' }}>{s.qty}</div>
                                <div style={{ fontSize: 10, color: '#94a3b8' }}>Đề xuất</div>
                            </div>
                            <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#b45309', color: 'white', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Đặt hàng</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
