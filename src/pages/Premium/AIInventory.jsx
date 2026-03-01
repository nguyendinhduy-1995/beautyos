import { useState } from 'react'
import { FiPackage, FiTrendingUp, FiAlertCircle, FiRefreshCw, FiZap, FiBarChart2, FiCheck } from 'react-icons/fi'

const inventory = [
    { id: 1, name: 'Serum Vitamin C 15%', sku: 'SER-VC15', stock: 5, predicted: 45, daysLeft: 3, autoOrder: true, status: 'critical', trend: '+18%' },
    { id: 2, name: 'Mask Collagen Gold', sku: 'MSK-CG01', stock: 12, predicted: 30, daysLeft: 12, autoOrder: true, status: 'low', trend: '+5%' },
    { id: 3, name: 'Gel Siêu âm RF', sku: 'GEL-RF01', stock: 48, predicted: 20, daysLeft: 72, autoOrder: false, status: 'ok', trend: '-3%' },
    { id: 4, name: 'Kem chống nắng SPF50+', sku: 'KCN-50P', stock: 8, predicted: 55, daysLeft: 4, autoOrder: true, status: 'critical', trend: '+40%' },
    { id: 5, name: 'Acid Hyaluronic 2%', sku: 'ACD-HA02', stock: 0, predicted: 25, daysLeft: 0, autoOrder: true, status: 'out', trend: '+12%' },
    { id: 6, name: 'Retinol 0.5% Night', sku: 'RET-N05', stock: 22, predicted: 15, daysLeft: 44, autoOrder: false, status: 'ok', trend: '+2%' },
    { id: 7, name: 'Toner BHA 0.5%', sku: 'TNR-BH05', stock: 3, predicted: 18, daysLeft: 5, autoOrder: true, status: 'critical', trend: '+25%' },
]

const autoActions = [
    { item: 'Acid Hyaluronic 2%', action: 'Đã tạo PO tự động', qty: 50, supplier: 'MedSupply VN', eta: '03/03/2026', status: 'processing' },
    { item: 'Serum Vitamin C 15%', action: 'Đang xác nhận NCC', qty: 80, supplier: 'CosmeViet', eta: '05/03/2026', status: 'pending' },
    { item: 'Kem chống nắng SPF50+', action: 'Đã tạo PO tự động', qty: 100, supplier: 'SunCare Co.', eta: '04/03/2026', status: 'processing' },
    { item: 'Toner BHA 0.5%', action: 'Chờ duyệt', qty: 30, supplier: 'SkinLab', eta: '06/03/2026', status: 'waiting' },
]

const insights = [
    { title: 'Mùa hè sắp tới', detail: 'Kem chống nắng sẽ tăng 40% usage trong 30 ngày → đã điều chỉnh dự đoán', impact: '+40% demand' },
    { title: 'Serum VC trending', detail: 'Google Trends + doanh số Shopee cho thấy Vitamin C đang hot → stock up', impact: '+18% demand' },
    { title: 'Mask Collagen giảm nhẹ', detail: 'Tần suất sử dụng giảm 5% so với tháng trước → giảm lượng nhập', impact: '-5% demand' },
]

export default function AIInventory() {
    const [tab, setTab] = useState('overview')
    const critical = inventory.filter(i => i.status === 'critical' || i.status === 'out').length
    const autoOrders = inventory.filter(i => i.autoOrder).length

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiPackage size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Kho AI Tự động 100%</h2>
                        <p>AI dự đoán nhu cầu • Tự động đặt hàng • Phân tích xu hướng</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Cảnh báo', v: critical }, { l: 'Auto-order', v: autoOrders }, { l: 'Tổng SKU', v: inventory.length }, { l: 'PO đang xử lý', v: autoActions.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'overview', label: '📊 Tổng quan Kho' }, { id: 'auto', label: '🤖 Auto PO' }, { id: 'insights', label: '📈 AI Insights' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0369a1' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Sản phẩm', 'Tồn kho', 'Dự đoán/tháng', 'Còn (ngày)', 'Trend', 'Auto', 'Trạng thái'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {inventory.map(item => (
                                <tr key={item.id}>
                                    <td><div style={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>{item.sku}</div></td>
                                    <td><span style={{ fontWeight: 700, color: item.stock <= 5 ? '#dc2626' : item.stock <= 15 ? '#d97706' : '#059669' }}>{item.stock}</span></td>
                                    <td style={{ color: '#64748b' }}>{item.predicted}</td>
                                    <td><span style={{ fontWeight: 600, color: item.daysLeft <= 5 ? '#dc2626' : item.daysLeft <= 15 ? '#d97706' : '#059669' }}>{item.daysLeft}d</span></td>
                                    <td><span style={{ fontSize: 11, fontWeight: 600, color: item.trend.startsWith('+') ? '#dc2626' : '#059669' }}>{item.trend}</span></td>
                                    <td>{item.autoOrder ? <FiCheck size={14} color="#059669" /> : <span style={{ color: '#94a3b8' }}>—</span>}</td>
                                    <td>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: item.status === 'critical' ? '#fef2f2' : item.status === 'out' ? '#fee2e2' : item.status === 'low' ? '#fffbeb' : '#ecfdf5', color: item.status === 'critical' ? '#dc2626' : item.status === 'out' ? '#991b1b' : item.status === 'low' ? '#d97706' : '#059669' }}>
                                            {item.status === 'out' ? 'Hết hàng' : item.status === 'critical' ? 'Nguy hiểm' : item.status === 'low' ? 'Sắp hết' : 'OK'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'auto' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                        <FiRefreshCw size={14} /> AI tự động tạo PO khi tồn kho dưới ngưỡng an toàn
                    </div>
                    {autoActions.map((a, i) => (
                        <div key={i} className="premium-card" style={{ borderLeft: `3px solid ${a.status === 'processing' ? '#0ea5e9' : a.status === 'waiting' ? '#f59e0b' : '#94a3b8'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                <span style={{ fontSize: 16 }}>{a.status === 'processing' ? '🔄' : a.status === 'waiting' ? '⏳' : '📋'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{a.item}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.action} • NCC: {a.supplier}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0369a1' }}>{a.qty}</div>
                                    <div style={{ fontSize: 10, color: '#94a3b8' }}>units</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#64748b' }}>
                                <span>ETA: {a.eta}</span>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: a.status === 'processing' ? '#eff6ff' : '#fffbeb', color: a.status === 'processing' ? '#0369a1' : '#d97706' }}>
                                    {a.status === 'processing' ? 'Đang xử lý' : a.status === 'waiting' ? 'Chờ duyệt' : 'Chờ xác nhận'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'insights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-alert" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                        <FiBarChart2 size={14} /> AI phân tích xu hướng thị trường + lịch sử sử dụng
                    </div>
                    {insights.map((ins, i) => (
                        <div key={i} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <FiTrendingUp size={14} color="#0369a1" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{ins.title}</div>
                                </div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: ins.impact.startsWith('+') ? '#fef2f2' : '#ecfdf5', color: ins.impact.startsWith('+') ? '#dc2626' : '#059669' }}>{ins.impact}</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{ins.detail}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
