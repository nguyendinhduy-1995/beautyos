import { useState, useMemo } from 'react'
import { FiTrendingUp, FiUsers, FiDollarSign, FiCalendar, FiBarChart2, FiPieChart, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'

const monthlyRevenue = [
    { month: 'T1', value: 98000000 }, { month: 'T2', value: 112000000 },
    { month: 'T3', value: 125000000 }, { month: 'T4', value: 108000000 },
    { month: 'T5', value: 135000000 }, { month: 'T6', value: 142000000 },
    { month: 'T7', value: 128000000 }, { month: 'T8', value: 151000000 },
    { month: 'T9', value: 139000000 }, { month: 'T10', value: 148000000 },
    { month: 'T11', value: 156000000 }, { month: 'T12', value: 163000000 },
]

const weeklyAppointments = [
    { day: 'T2', total: 18, done: 14 }, { day: 'T3', total: 22, done: 19 },
    { day: 'T4', total: 15, done: 12 }, { day: 'T5', total: 25, done: 21 },
    { day: 'T6', total: 28, done: 24 }, { day: 'T7', total: 20, done: 16 },
    { day: 'CN', total: 12, done: 10 },
]

const topServices = [
    { name: 'Chăm sóc da cơ bản', count: 156, pct: 35, color: '#198754' },
    { name: 'Trị mụn chuyên sâu', count: 112, pct: 25, color: '#27ae60' },
    { name: 'Nâng cơ Hifu', count: 89, pct: 20, color: '#e67e22' },
    { name: 'Triệt lông Laser', count: 54, pct: 12, color: '#8e44ad' },
    { name: 'Khác', count: 36, pct: 8, color: '#95a5a6' },
]

const topStaff = [
    { name: 'Nguyễn Thị Mai', revenue: 45000000, clients: 52, growth: 8.5 },
    { name: 'Trần Văn Hùng', revenue: 38000000, clients: 41, growth: 5.2 },
    { name: 'Lê Hoàng Anh', revenue: 28000000, clients: 35, growth: -2.1 },
    { name: 'Phạm Thu Trang', revenue: 22000000, clients: 28, growth: 12.0 },
    { name: 'Đặng Minh Tuấn', revenue: 18000000, clients: 22, growth: 3.7 },
]

const recentActivities = [
    { time: '14:30', action: 'Lịch hẹn mới', detail: 'Nguyễn Thị Lan - Chăm sóc da', type: 'appointment' },
    { time: '14:15', action: 'Thanh toán', detail: 'Kim Trang - 2.500.000đ', type: 'payment' },
    { time: '13:50', action: 'Khách đến', detail: 'Phan Thị Kim Hồng - Nâng cơ Hifu', type: 'arrival' },
    { time: '13:30', action: 'Hủy lịch', detail: 'Trần Văn B - Triệt lông Laser', type: 'cancel' },
    { time: '12:45', action: 'Xong điều trị', detail: 'Lê Thị C - Trị mụn chuyên sâu', type: 'done' },
]

export default function Dashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState('month')
    const [hoveredBar, setHoveredBar] = useState(null)

    const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value))
    const totalPieCount = topServices.reduce((a, b) => a + b.count, 0)

    // Build conic gradient for pie chart
    const pieGradient = useMemo(() => {
        let cumPct = 0
        const stops = topServices.map(s => {
            const start = cumPct
            cumPct += s.pct
            return `${s.color} ${start}% ${cumPct}%`
        })
        return `conic-gradient(${stops.join(', ')})`
    }, [])

    return (
        <div className="fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2>Báo Cáo Tổng Quát</h2>
                    <p>Tổng quan hoạt động kinh doanh của cơ sở</p>
                </div>
                <div style={{ display: 'flex', gap: '4px', background: 'var(--gray-100)', borderRadius: '10px', padding: '3px' }}>
                    {[{ key: 'week', label: 'Tuần' }, { key: 'month', label: 'Tháng' }, { key: 'year', label: 'Năm' }].map(p => (
                        <button key={p.key} onClick={() => setSelectedPeriod(p.key)}
                            style={{
                                padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                fontSize: '0.8rem', fontWeight: '600', fontFamily: 'inherit',
                                background: selectedPeriod === p.key ? 'white' : 'transparent',
                                color: selectedPeriod === p.key ? 'var(--primary)' : 'var(--gray-500)',
                                boxShadow: selectedPeriod === p.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            }}>
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat Cards */}
            <div className="stat-cards">
                {[
                    { icon: <FiDollarSign />, value: formatCurrency(156000000), label: 'Doanh thu tháng', cls: 'green', change: '+12.5%', up: true },
                    { icon: <FiCalendar />, value: '245', label: 'Lịch hẹn tháng', cls: 'green', change: '+8', up: true },
                    { icon: <FiUsers />, value: '89', label: 'Khách mới', cls: 'purple', change: '+15', up: true },
                    { icon: <FiTrendingUp />, value: '92%', label: 'Tỉ lệ hoàn thành', cls: 'orange', change: '+3%', up: true },
                ].map((card, i) => (
                    <div className="stat-card" key={i} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div className={`stat-card-icon ${card.cls}`}>{card.icon}</div>
                        <div className="stat-card-info">
                            <div className="stat-card-value">{card.value}</div>
                            <div className="stat-card-label">{card.label}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: '600', color: card.up ? 'var(--accent-green)' : 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            {card.up ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />} {card.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="report-grid">
                {/* Revenue Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title"><FiBarChart2 style={{ marginRight: '8px' }} />Doanh thu theo tháng</h3>
                    </div>
                    <div style={{ padding: '16px 16px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '200px', position: 'relative' }}>
                            {/* Y-axis labels */}
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: '24px', width: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                {[160, 120, 80, 40, 0].map(v => (
                                    <span key={v} style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{v}tr</span>
                                ))}
                            </div>
                            {/* Grid lines */}
                            <div style={{ position: 'absolute', left: '55px', right: 0, top: 0, bottom: '24px' }}>
                                {[0, 1, 2, 3, 4].map(i => (
                                    <div key={i} style={{ position: 'absolute', top: `${i * 25}%`, left: 0, right: 0, borderBottom: '1px dashed var(--gray-200)' }} />
                                ))}
                            </div>
                            {/* Bars */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', flex: 1, marginLeft: '55px', height: '176px' }}>
                                {monthlyRevenue.map((m, i) => {
                                    const h = (m.value / maxRevenue) * 100
                                    const isHovered = hoveredBar === i
                                    return (
                                        <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                                            onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                                            {isHovered && (
                                                <div style={{
                                                    position: 'absolute', bottom: `${h + 5}%`, background: '#1a1a2e', color: 'white',
                                                    padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600',
                                                    whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                                }}>
                                                    {formatCurrency(m.value)}
                                                </div>
                                            )}
                                            <div style={{
                                                width: '100%', height: `${h}%`, borderRadius: '4px 4px 0 0',
                                                background: isHovered
                                                    ? 'linear-gradient(180deg, #146c43, #198754)'
                                                    : i === monthlyRevenue.length - 1
                                                        ? 'linear-gradient(180deg, #27ae60, #2ecc71)'
                                                        : 'linear-gradient(180deg, #198754, #20c997)',
                                                transition: 'all 0.3s ease', cursor: 'pointer',
                                                transform: isHovered ? 'scaleX(1.1)' : 'scaleX(1)',
                                                opacity: hoveredBar !== null && !isHovered ? 0.5 : 1,
                                            }} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/* X-axis labels */}
                        <div style={{ display: 'flex', marginLeft: '55px', marginTop: '4px' }}>
                            {monthlyRevenue.map(m => (
                                <div key={m.month} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--gray-500)', fontWeight: '500' }}>{m.month}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pie Chart - Service Distribution */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title"><FiPieChart style={{ marginRight: '8px' }} />Dịch vụ phổ biến</h3>
                    </div>
                    <div style={{ padding: '20px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                        {/* Actual pie chart using conic gradient */}
                        <div style={{
                            width: '140px', height: '140px', borderRadius: '50%',
                            background: pieGradient, flexShrink: 0, position: 'relative',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                position: 'absolute', inset: '30px', borderRadius: '50%',
                                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}>{totalPieCount}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--gray-500)' }}>Lượt DV</span>
                            </div>
                        </div>
                        {/* Legend */}
                        <div style={{ flex: 1 }}>
                            {topServices.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: i < topServices.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color, flexShrink: 0 }} />
                                    <span style={{ flex: 1, fontSize: '0.8rem' }}>{item.name}</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--gray-600)' }}>{item.count}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: item.color, minWidth: '35px', textAlign: 'right' }}>{item.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Staff */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">🏆 Top Nhân Viên</h3>
                    </div>
                    <div style={{ padding: '12px 16px' }}>
                        {topStaff.map((emp, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0',
                                borderBottom: i < topStaff.length - 1 ? '1px solid var(--gray-100)' : 'none'
                            }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: i === 0 ? 'linear-gradient(135deg, #f39c12, #e74c3c)' :
                                        i === 1 ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)' :
                                            i === 2 ? 'linear-gradient(135deg, #e67e22, #d35400)' : 'var(--primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 700, fontSize: '12px', flexShrink: 0
                                }}>
                                    {i + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{emp.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{emp.clients} khách</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-green)' }}>{formatCurrency(emp.revenue)}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '600', color: emp.growth > 0 ? 'var(--accent-green)' : 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                                        {emp.growth > 0 ? <FiArrowUp size={10} /> : <FiArrowDown size={10} />} {Math.abs(emp.growth)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Appointments Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">📅 Lịch hẹn tuần này</h3>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {weeklyAppointments.map((day, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0' }}>
                                <span style={{ width: '28px', fontWeight: 600, fontSize: '0.8rem', color: i === 4 ? 'var(--accent-green)' : 'var(--gray-600)' }}>{day.day}</span>
                                <div style={{ flex: 1, height: '28px', background: 'var(--gray-100)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{
                                        height: '100%', width: `${(day.total / 30) * 100}%`, borderRadius: '6px',
                                        background: i === 4 ? 'linear-gradient(90deg, #27ae60, #2ecc71)' : 'linear-gradient(90deg, #198754, #20c997)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px',
                                        transition: 'width 0.5s ease'
                                    }}>
                                        <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>{day.done}/{day.total}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card" style={{ marginTop: '20px' }}>
                <div className="card-header">
                    <h3 className="card-title">⚡ Hoạt Động Gần Đây</h3>
                </div>
                <div style={{ padding: '12px 16px' }}>
                    {recentActivities.map((a, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0',
                            borderBottom: i < recentActivities.length - 1 ? '1px solid var(--gray-100)' : 'none'
                        }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                                background: a.type === 'appointment' ? '#e3f2fd' : a.type === 'payment' ? '#e8f5e9' :
                                    a.type === 'arrival' ? '#fff8e1' : a.type === 'cancel' ? '#ffebee' : '#f3e5f5'
                            }}>
                                {a.type === 'appointment' ? '📋' : a.type === 'payment' ? '💰' :
                                    a.type === 'arrival' ? '👋' : a.type === 'cancel' ? '❌' : '✅'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{a.action}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>{a.detail}</div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: '500' }}>{a.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
