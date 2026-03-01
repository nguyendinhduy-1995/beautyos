import { useState } from 'react'
import { FiBarChart2, FiDownload, FiFilter, FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiTrendingDown, FiAward, FiFileText } from 'react-icons/fi'
import { staff, cashFlow, services, customers } from '../../data/mockData'

const months = ['T9', 'T10', 'T11', 'T12', 'T1', 'T2']
const revenueData = [{ month: 'T9', rev: 320, cost: 180 }, { month: 'T10', rev: 380, cost: 200 }, { month: 'T11', rev: 410, cost: 210 }, { month: 'T12', rev: 520, cost: 240 }, { month: 'T1', rev: 450, cost: 220 }, { month: 'T2', rev: 390, cost: 195 }]
const maxVal = 520

const staffPerf = staff.filter(s => s.status === 'active').slice(0, 12).map((s, i) => ({
    ...s, revenue: Math.floor(Math.random() * 40 + 10) * 1000000,
    clients: Math.floor(Math.random() * 30 + 5),
    rating: (Math.random() * 2 + 3).toFixed(1),
    rank: i + 1,
})).sort((a, b) => b.revenue - a.revenue).map((s, i) => ({ ...s, rank: i + 1 }))

const topRev = staffPerf[0]?.revenue || 1

const plData = [
    { label: 'Doanh thu dịch vụ', value: 478000000, type: 'income' },
    { label: 'Doanh thu thẻ', value: 125000000, type: 'income' },
    { label: 'Doanh thu khác', value: 32000000, type: 'income' },
    { label: 'Lương nhân viên', value: -210000000, type: 'expense' },
    { label: 'Vật tư tiêu hao', value: -85000000, type: 'expense' },
    { label: 'Mặt bằng', value: -65000000, type: 'expense' },
    { label: 'Marketing', value: -45000000, type: 'expense' },
    { label: 'Điện nước & khác', value: -22000000, type: 'expense' },
]
const totalIncome = plData.filter(d => d.type === 'income').reduce((a, d) => a + d.value, 0)
const totalExpense = Math.abs(plData.filter(d => d.type === 'expense').reduce((a, d) => a + d.value, 0))
const netProfit = totalIncome - totalExpense

const exportSchedules = [
    { name: 'Báo cáo doanh thu tuần', freq: 'Hàng tuần', format: 'PDF', email: 'admin@beautyos.vn', active: true },
    { name: 'Báo cáo P&L tháng', freq: 'Hàng tháng', format: 'Excel', email: 'ketoan@beautyos.vn', active: true },
    { name: 'Bảng xếp hạng NV', freq: 'Hàng tuần', format: 'PDF', email: 'hr@beautyos.vn', active: false },
]

export default function AdvancedReports() {
    const [period, setPeriod] = useState('month')

    return (
        <div className="premium-page fade-in">
            {/* Header */}
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiBarChart2 size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>Báo cáo Nâng cao</h2>
                        <p>Phân tích doanh thu, hiệu suất nhân viên, P&L chuyên sâu</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['week', 'month', 'quarter'].map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                                fontSize: 12, fontWeight: 600, background: period === p ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                                color: 'white',
                            }}>{p === 'week' ? 'Tuần' : p === 'month' ? 'Tháng' : 'Quý'}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {/* Revenue Chart */}
                <div className="premium-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>📈 Doanh thu vs Chi phí</h3>
                        <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#2563eb' }} /> Doanh thu</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#f59e0b' }} /> Chi phí</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 180 }}>
                        {revenueData.map((d, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                                    <div style={{ width: '40%', height: (d.rev / maxVal) * 140, borderRadius: '4px 4px 2px 2px', background: 'linear-gradient(180deg, #2563eb, #60a5fa)' }} />
                                    <div style={{ width: '40%', height: (d.cost / maxVal) * 140, borderRadius: '4px 4px 2px 2px', background: 'linear-gradient(180deg, #f59e0b, #fbbf24)' }} />
                                </div>
                                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Staff Ranking */}
                <div className="premium-card" style={{ padding: 20 }}>
                    <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>🏆 Bảng xếp hạng Nhân viên</h3>
                    <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                        {staffPerf.slice(0, 8).map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <span style={{ width: 22, fontSize: 13, fontWeight: 800, color: i < 3 ? '#f59e0b' : '#94a3b8', textAlign: 'center' }}>
                                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.name}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#2563eb' }}>{(s.revenue / 1000000).toFixed(0)}M</span>
                                    </div>
                                    <div style={{ height: 5, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                        <div style={{ width: `${(s.revenue / topRev) * 100}%`, height: '100%', borderRadius: 3, background: i < 3 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #2563eb, #60a5fa)' }} />
                                    </div>
                                </div>
                                <span style={{ fontSize: 12, color: '#64748b' }}>⭐ {s.rating}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {/* P&L */}
                <div className="premium-card" style={{ padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>💰 P&L — Lãi / Lỗ</h3>
                    {plData.map((d, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                            <span style={{ color: '#374151' }}>{d.label}</span>
                            <span style={{ fontWeight: 700, color: d.type === 'income' ? '#059669' : '#dc2626' }}>
                                {d.type === 'income' ? '+' : ''}{(d.value / 1000000).toFixed(0)}M
                            </span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', marginTop: 8, borderTop: '2px solid #0f172a', fontSize: 15 }}>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>Lợi nhuận ròng</span>
                        <span style={{ fontWeight: 800, color: netProfit > 0 ? '#059669' : '#dc2626' }}>
                            {netProfit > 0 ? '+' : ''}{(netProfit / 1000000).toFixed(0)}M ({Math.round(netProfit / totalIncome * 100)}%)
                        </span>
                    </div>
                </div>

                {/* Export */}
                <div className="premium-card" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>📤 Xuất báo cáo tự động</h3>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: 'none', background: '#2563eb', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>
                            <FiDownload size={13} /> Xuất ngay
                        </button>
                    </div>
                    {exportSchedules.map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < exportSchedules.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: e.format === 'PDF' ? '#fef2f2' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiFileText size={16} color={e.format === 'PDF' ? '#dc2626' : '#059669'} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{e.name}</div>
                                <div style={{ fontSize: 11, color: '#64748b' }}>{e.freq} • {e.format} • {e.email}</div>
                            </div>
                            <div style={{
                                width: 36, height: 20, borderRadius: 10, background: e.active ? '#059669' : '#cbd5e1',
                                position: 'relative', cursor: 'pointer',
                            }}>
                                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: e.active ? 18 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                            </div>
                        </div>
                    ))}
                    {/* Quick KPIs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
                        {[{ icon: FiDollarSign, label: 'Doanh thu', value: '635M', color: '#059669', bg: '#ecfdf5' },
                        { icon: FiUsers, label: 'Khách mới', value: '127', color: '#2563eb', bg: '#eff6ff' },
                        { icon: FiTrendingUp, label: 'Tăng trưởng', value: '+18%', color: '#7c3aed', bg: '#f5f3ff' }].map((k, i) => (
                            <div key={i} style={{ background: k.bg, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                                <k.icon size={16} color={k.color} style={{ marginBottom: 4 }} />
                                <div style={{ fontSize: 16, fontWeight: 800, color: k.color }}>{k.value}</div>
                                <div style={{ fontSize: 10, color: '#64748b' }}>{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
