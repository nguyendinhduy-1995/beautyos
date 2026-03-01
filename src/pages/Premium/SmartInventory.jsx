import { useState } from 'react'
import { FiPackage, FiAlertTriangle, FiZap, FiBarChart2, FiSearch, FiCheck } from 'react-icons/fi'

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
    { product: 'Kem chống nắng SPF50', qty: 25, reason: 'Tồn 5/8, mùa hè sắp tới +40%', urgency: 'high' },
    { product: 'Serum Retinol 0.5%', qty: 15, reason: 'Lô hiện tại hết hạn 10/03', urgency: 'medium' },
]

export default function SmartInventory() {
    const [tab, setTab] = useState('stock')
    const [filter, setFilter] = useState('all')
    const filtered = filter === 'all' ? products : products.filter(p => p.status === filter)
    const critical = products.filter(p => p.status === 'critical' || p.status === 'out').length
    const low = products.filter(p => p.status === 'low').length
    const expiring = products.filter(p => p.status === 'expired').length

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiPackage size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Kho Thông minh</h2>
                        <p>Cảnh báo tồn kho • Hết hạn • AI đề xuất nhập • Quét mã vạch</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Hết hàng', v: critical }, { l: 'Sắp hết', v: low }, { l: 'Hết hạn', v: expiring }, { l: 'Tổng SP', v: products.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'stock', label: '📦 Tồn kho' }, { id: 'suggest', label: '🤖 AI Đề xuất' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#b45309' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'stock' && (
                <>
                    <div className="premium-filters">
                        {[{ id: 'all', label: 'Tất cả' }, { id: 'critical', label: '🔴 Nguy hiểm' }, { id: 'out', label: '⚫ Hết hàng' }, { id: 'low', label: '🟡 Sắp hết' }, { id: 'expired', label: '🟠 Hết hạn' }, { id: 'ok', label: '🟢 OK' }].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} className="premium-filter-btn" style={{ background: filter === f.id ? '#b45309' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b' }}>{f.label}</button>
                        ))}
                    </div>
                    <div className="premium-table-wrap">
                        <table>
                            <thead><tr>
                                {['Sản phẩm', 'Danh mục', 'Tồn kho', 'Min', 'Hết hạn', 'Usage/tháng', 'Trạng thái'].map(h => <th key={h}>{h}</th>)}
                            </tr></thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id}>
                                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                                        <td style={{ color: '#64748b' }}>{p.category}</td>
                                        <td><span style={{ fontWeight: 700, color: p.stock <= 0 ? '#dc2626' : p.stock < p.minStock ? '#d97706' : '#059669' }}>{p.stock}</span></td>
                                        <td style={{ color: '#94a3b8' }}>{p.minStock}</td>
                                        <td style={{ color: new Date(p.expiry) < new Date('2026-04-01') ? '#dc2626' : '#64748b', fontWeight: new Date(p.expiry) < new Date('2026-04-01') ? 700 : 400 }}>{p.expiry}</td>
                                        <td style={{ color: '#64748b' }}>{p.usage}</td>
                                        <td>
                                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: p.status === 'critical' || p.status === 'out' ? '#fef2f2' : p.status === 'low' ? '#fffbeb' : p.status === 'expired' ? '#fff7ed' : '#ecfdf5', color: p.status === 'critical' || p.status === 'out' ? '#dc2626' : p.status === 'low' ? '#d97706' : p.status === 'expired' ? '#ea580c' : '#059669' }}>
                                                {p.status === 'critical' ? '🔴 Nguy hiểm' : p.status === 'out' ? '⚫ Hết hàng' : p.status === 'low' ? '🟡 Sắp hết' : p.status === 'expired' ? '🟠 Hết hạn' : '🟢 OK'}
                                            </span>
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
                    <div className="premium-alert" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
                        <FiZap size={14} /> AI phân tích usage 3 tháng → đề xuất số lượng nhập tối ưu
                    </div>
                    {aiSuggestions.map((s, i) => (
                        <div key={i} className="premium-suggestion" style={{ borderColor: s.urgency === 'critical' ? '#fecaca' : s.urgency === 'high' ? '#fde68a' : '#e5e7eb' }}>
                            <span style={{ fontSize: 16 }}>{s.urgency === 'critical' ? '🚨' : s.urgency === 'high' ? '⚠️' : '📋'}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.product}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{s.reason}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#b45309' }}>{s.qty}</div>
                                <div style={{ fontSize: 10, color: '#94a3b8' }}>Đề xuất</div>
                            </div>
                            <button className="premium-action-btn" style={{ background: '#b45309', color: 'white' }}>Đặt hàng</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
