import { useState, useMemo } from 'react'
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiDownload, FiUsers, FiPieChart } from 'react-icons/fi'
import { cashFlow, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const customerSources = [
    { name: 'Facebook', customers: 45, revenue: 67500000, color: '#1877f2' },
    { name: 'TikTok', customers: 32, revenue: 38400000, color: '#000000' },
    { name: 'Instagram', customers: 18, revenue: 27000000, color: '#e4405f' },
    { name: 'Hotline', customers: 28, revenue: 42000000, color: '#28a745' },
    { name: 'Walk-in', customers: 15, revenue: 18750000, color: '#ff9800' },
    { name: 'Referral', customers: 22, revenue: 44000000, color: '#6f42c1' },
    { name: 'Website', customers: 12, revenue: 15600000, color: '#1a73e8' },
    { name: 'Zalo', customers: 8, revenue: 9600000, color: '#0068ff' },
]

export default function Revenue() {
    const { addToast } = useToast()
    const [period, setPeriod] = useState('month')
    const [hoveredBar, setHoveredBar] = useState(null)
    const [activeView, setActiveView] = useState('revenue')
    const [genderFilter, setGenderFilter] = useState({ male: true, female: true })
    const [ageFilter, setAgeFilter] = useState({ '18-25': true, '26-35': true, '36-45': true, '46+': true })

    const income = cashFlow.filter(c => c.type === 'Thu').reduce((s, c) => s + c.amount, 0)
    const expense = cashFlow.filter(c => c.type === 'Chi').reduce((s, c) => s + c.amount, 0)
    const profit = income - expense
    const marginPercent = income > 0 ? Math.round((profit / income) * 100) : 0

    const revenueByCategory = cashFlow.filter(c => c.type === 'Thu').reduce((acc, c) => { acc[c.category] = (acc[c.category] || 0) + c.amount; return acc }, {})
    const expenseByCategory = cashFlow.filter(c => c.type === 'Chi').reduce((acc, c) => { acc[c.category] = (acc[c.category] || 0) + c.amount; return acc }, {})

    const dailyData = [
        { day: '21/02', revenue: 8500000, expense: 2100000 },
        { day: '22/02', revenue: 12000000, expense: 3200000 },
        { day: '23/02', revenue: 9800000, expense: 1800000 },
        { day: '24/02', revenue: 15000000, expense: 4500000 },
        { day: '25/02', revenue: 11200000, expense: 2800000 },
        { day: '26/02', revenue: 25000000, expense: 5000000 },
        { day: '27/02', revenue: 1700000, expense: 7000000 },
    ]

    const maxVal = Math.max(...dailyData.map(d => Math.max(d.revenue, d.expense)))
    const catColors = ['#1a73e8', '#28a745', '#ff9800', '#6f42c1', '#e91e63']

    // Customer source donut chart
    const totalSourceRevenue = customerSources.reduce((s, c) => s + c.revenue, 0)
    const totalSourceCustomers = customerSources.reduce((s, c) => s + c.customers, 0)
    const donutGradient = useMemo(() => {
        let pct = 0
        const stops = customerSources.map(s => {
            const start = pct
            pct += (s.revenue / totalSourceRevenue) * 100
            return `${s.color} ${start}% ${pct}%`
        })
        return `conic-gradient(${stops.join(', ')})`
    }, [])

    const handleExport = () => {
        const csv = ['Ngày,Doanh thu,Chi phí,Lợi nhuận', ...dailyData.map(d => `${d.day},${d.revenue},${d.expense},${d.revenue - d.expense}`)].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'bao_cao_doanh_thu.csv'; link.click()
        addToast('Đã xuất báo cáo', 'success')
    }

    return (
        <div className="fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h2>Báo Cáo Doanh Thu</h2><p>Phân tích doanh thu, chi phí, lợi nhuận và nguồn khách hàng</p></div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', background: '#f1f3f5', borderRadius: '10px', padding: '2px' }}>
                        {[{ k: 'week', l: 'Tuần' }, { k: 'month', l: 'Tháng' }, { k: 'year', l: 'Năm' }].map(({ k, l }) => (
                            <button key={k} onClick={() => setPeriod(k)}
                                style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: period === k ? 'white' : 'transparent', fontWeight: period === k ? 600 : 400, cursor: 'pointer', fontSize: '0.82rem', boxShadow: period === k ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', fontFamily: 'inherit' }}>
                                {l}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-outline" onClick={handleExport}><FiDownload size={14} /> Xuất báo cáo</button>
                </div>
            </div>

            <div className="stat-cards">
                <div className="stat-card"><div className="stat-card-icon green"><FiTrendingUp /></div><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#28a745' }}>{formatCurrency(income)}</div><div className="stat-card-label">Tổng doanh thu</div></div></div>
                <div className="stat-card"><div className="stat-card-icon red"><FiTrendingDown /></div><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#dc3545' }}>{formatCurrency(expense)}</div><div className="stat-card-label">Tổng chi phí</div></div></div>
                <div className="stat-card"><div className="stat-card-icon blue"><FiDollarSign /></div><div className="stat-card-info"><div className="stat-card-value" style={{ color: profit >= 0 ? '#28a745' : '#dc3545' }}>{formatCurrency(profit)}</div><div className="stat-card-label">Lợi nhuận</div></div></div>
                <div className="stat-card"><div className="stat-card-icon purple"><FiTrendingUp /></div><div className="stat-card-info"><div className="stat-card-value">{marginPercent}%</div><div className="stat-card-label">Biên lợi nhuận</div></div></div>
            </div>

            {/* Revenue comparison bar chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '0.95rem' }}>📊 Doanh thu vs Chi phí (7 ngày)</h3>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28a745', display: 'inline-block' }} />Doanh thu</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc3545', display: 'inline-block' }} />Chi phí</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '220px' }}>
                        {dailyData.map((d, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', position: 'relative' }}
                                onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                                {hoveredBar === i && (
                                    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', color: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '0.72rem', whiteSpace: 'nowrap', zIndex: 10, pointerEvents: 'none', marginBottom: '4px' }}>
                                        <div>Thu: {formatCurrency(d.revenue)}</div>
                                        <div>Chi: {formatCurrency(d.expense)}</div>
                                        <div style={{ color: d.revenue - d.expense >= 0 ? '#6ee7b7' : '#fca5a5' }}>LN: {formatCurrency(d.revenue - d.expense)}</div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                                    <div style={{ width: '40%', height: `${(d.revenue / maxVal) * 180}px`, background: hoveredBar === i ? '#15803d' : 'linear-gradient(180deg, #28a745, #20c997)', borderRadius: '6px 6px 0 0', transition: 'all 0.3s', cursor: 'pointer' }} />
                                    <div style={{ width: '40%', height: `${(d.expense / maxVal) * 180}px`, background: hoveredBar === i ? '#b91c1c' : 'linear-gradient(180deg, #dc3545, #ff6b6b)', borderRadius: '6px 6px 0 0', transition: 'all 0.3s', cursor: 'pointer' }} />
                                </div>
                                <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--gray-600)' }}>{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue by category */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '0.95rem', marginBottom: '20px' }}>💰 Doanh thu theo danh mục</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {Object.entries(revenueByCategory).sort((a, b) => b[1] - a[1]).map(([cat, amount], idx) => {
                            const pct = Math.round((amount / income) * 100)
                            return (
                                <div key={cat}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{cat}</span>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: catColors[idx % catColors.length] }}>{pct}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: catColors[idx % catColors.length], borderRadius: '4px', transition: 'width 0.8s ease' }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{formatCurrency(amount)}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Customer source analytics - NEW section matching reference */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
                {/* Donut chart */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '0.95rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiPieChart size={16} color="var(--color-primary)" /> Doanh thu theo nguồn KH
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            width: '160px', height: '160px', borderRadius: '50%', background: donutGradient,
                            position: 'relative', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                position: 'absolute', inset: '35px', borderRadius: '50%', background: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{totalSourceCustomers}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--gray-500)' }}>Khách hàng</span>
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            {customerSources.map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', fontSize: '0.8rem' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color, flexShrink: 0 }} />
                                    <span style={{ flex: 1 }}>{s.name}</span>
                                    <span style={{ fontWeight: 600 }}>{s.customers}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Source data table */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiUsers size={16} color="var(--color-primary)" /> Chi tiết nguồn khách hàng
                        </h3>
                        {/* Filter checkboxes */}
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={genderFilter.male} onChange={() => setGenderFilter(p => ({ ...p, male: !p.male }))} /> Nam
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={genderFilter.female} onChange={() => setGenderFilter(p => ({ ...p, female: !p.female }))} /> Nữ
                            </label>
                            {Object.entries(ageFilter).map(([age, on]) => (
                                <label key={age} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={on} onChange={() => setAgeFilter(p => ({ ...p, [age]: !p[age] }))} /> {age}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nguồn</th>
                                    <th style={{ textAlign: 'right' }}>Khách hàng</th>
                                    <th style={{ textAlign: 'right' }}>Doanh thu</th>
                                    <th style={{ textAlign: 'right' }}>% DT</th>
                                    <th style={{ textAlign: 'right' }}>TB/Khách</th>
                                    <th>Tỷ lệ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerSources.sort((a, b) => b.revenue - a.revenue).map((s, i) => {
                                    const pct = Math.round((s.revenue / totalSourceRevenue) * 100)
                                    const avg = Math.round(s.revenue / s.customers)
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                                                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right', fontWeight: 600 }}>{s.customers}</td>
                                            <td style={{ textAlign: 'right', fontWeight: 600, color: '#28a745' }}>{formatCurrency(s.revenue)}</td>
                                            <td style={{ textAlign: 'right', fontWeight: 700, color: s.color }}>{pct}%</td>
                                            <td style={{ textAlign: 'right', fontSize: '0.82rem' }}>{formatCurrency(avg)}</td>
                                            <td>
                                                <div style={{ width: '100%', height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                                    <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: '4px', transition: 'width 0.5s' }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr style={{ fontWeight: 700, borderTop: '2px solid var(--color-border)' }}>
                                    <td>Tổng cộng</td>
                                    <td style={{ textAlign: 'right' }}>{totalSourceCustomers}</td>
                                    <td style={{ textAlign: 'right', color: '#28a745' }}>{formatCurrency(totalSourceRevenue)}</td>
                                    <td style={{ textAlign: 'right' }}>100%</td>
                                    <td style={{ textAlign: 'right', fontSize: '0.82rem' }}>{formatCurrency(Math.round(totalSourceRevenue / totalSourceCustomers))}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
