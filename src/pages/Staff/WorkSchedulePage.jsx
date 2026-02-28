import { useState } from 'react'
import { workSchedule } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import { FiUpload, FiRefreshCw, FiChevronLeft, FiChevronRight, FiDownload, FiBarChart2 } from 'react-icons/fi'

const timeSlots = [
    { id: 'S1', label: '08:00 - 12:00', color: '#28a745', bg: '#e8f5e9' },
    { id: 'S2', label: '12:00 - 17:00', color: '#1565c0', bg: '#e3f2fd' },
    { id: 'S3', label: '17:00 - 21:00', color: '#ff9800', bg: '#fff3e0' },
    { id: 'OFF', label: 'Nghỉ', color: '#9e9e9e', bg: '#f5f5f5' },
]

const departments = ['Tất cả', 'Bác sĩ', 'Kỹ thuật viên', 'Lễ tân', 'Tư vấn']

export default function WorkSchedule() {
    const { addToast } = useToast()
    const days = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN']
    const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    const shifts = ['S1', 'S2', 'S3', 'OFF']

    const [data, setData] = useState(() => workSchedule.map(ws => ({
        ...ws,
        // Add time slots to existing shift data
        shifts: dayKeys.reduce((acc, dk) => {
            acc[dk] = ws[dk] === 'S' ? 'S1' : ws[dk] === 'C' ? 'S2' : 'OFF'
            return acc
        }, {})
    })))
    const [weekOffset, setWeekOffset] = useState(0)
    const [department, setDepartment] = useState('Tất cả')
    const [staffSidebar, setStaffSidebar] = useState(null)

    const getSlot = (id) => timeSlots.find(s => s.id === id) || timeSlots[3]

    const cycleShift = (staffId, dayKey) => {
        setData(prev => prev.map(ws => {
            if (ws.id !== staffId) return ws
            const curr = ws.shifts[dayKey]
            const idx = shifts.indexOf(curr)
            const next = shifts[(idx + 1) % shifts.length]
            const slot = getSlot(next)
            addToast(`${ws.name} ${days[dayKeys.indexOf(dayKey)]}: ${slot.label}`, 'info')
            return { ...ws, shifts: { ...ws.shifts, [dayKey]: next } }
        }))
    }

    // Calc dates for current week
    const baseDate = new Date(2026, 1, 23) // Mon 23/02
    baseDate.setDate(baseDate.getDate() + weekOffset * 7)
    const weekDates = dayKeys.map((_, i) => {
        const d = new Date(baseDate)
        d.setDate(d.getDate() + i)
        return `${d.getDate()}/${d.getMonth() + 1}`
    })

    const totalShifts = data.reduce((s, ws) => s + dayKeys.filter(dk => ws.shifts[dk] !== 'OFF').length, 0)

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Lịch Làm Việc</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý ca làm việc nhân viên theo tuần</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = 'Nhân viên,' + days.join(',') + ',Tổng\n' + data.map(ws => `${ws.name},${dayKeys.map(dk => getSlot(ws.shifts[dk]).label).join(',')},${dayKeys.filter(dk => ws.shifts[dk] !== 'OFF').length}/7`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lich-lam-viec.csv'; a.click()
                        addToast('Đã xuất file CSV', 'success')
                    }}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-secondary" onClick={() => addToast('Đã cập nhật lịch làm việc nhanh', 'success')}><FiRefreshCw size={14} /> Cập nhật nhanh</button>
                    <button className="btn btn-secondary" onClick={() => addToast('Chức năng tải tệp đang phát triển', 'info')}><FiUpload size={14} /> Tải tệp lên</button>
                </div>
            </div>

            {/* Filters Row */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <select className="filter-select" value={department} onChange={e => setDepartment(e.target.value)}>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginLeft: 'auto' }}>
                    <button className="btn btn-secondary" onClick={() => setWeekOffset(w => w - 1)} style={{ padding: '6px 10px' }}><FiChevronLeft size={16} /></button>
                    <button className="btn btn-secondary" onClick={() => setWeekOffset(0)} style={{ padding: '6px 14px', fontSize: '0.85rem', fontWeight: '600' }}>Tuần này</button>
                    <button className="btn btn-secondary" onClick={() => setWeekOffset(w => w + 1)} style={{ padding: '6px 10px' }}><FiChevronRight size={16} /></button>
                </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {timeSlots.map(s => (
                    <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: s.bg, border: `1px solid ${s.color}40`, display: 'inline-block' }} />
                        <span style={{ color: s.color, fontWeight: '500' }}>{s.label}</span>
                    </span>
                ))}
            </div>

            {/* Stats Row */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiBarChart2 color="#1a73e8" /></div><div><div className="stat-label">Tổng ca</div><div className="stat-value">{totalShifts}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiBarChart2 color="#28a745" /></div><div><div className="stat-label">Ca sáng (08-12h)</div><div className="stat-value" style={{ color: '#28a745' }}>{data.reduce((s, ws) => s + dayKeys.filter(dk => ws.shifts[dk] === 'S1').length, 0)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiBarChart2 color="#1565c0" /></div><div><div className="stat-label">Ca chiều (12-17h)</div><div className="stat-value" style={{ color: '#1565c0' }}>{data.reduce((s, ws) => s + dayKeys.filter(dk => ws.shifts[dk] === 'S2').length, 0)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiBarChart2 color="#ff9800" /></div><div><div className="stat-label">Ca tối (17-21h)</div><div className="stat-value" style={{ color: '#ff9800' }}>{data.reduce((s, ws) => s + dayKeys.filter(dk => ws.shifts[dk] === 'S3').length, 0)}</div></div></div>
            </div>

            {/* Shift Distribution Chart */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiBarChart2 size={14} color="var(--color-primary)" /> Phân bố ca làm việc theo ngày</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '60px' }}>
                    {dayKeys.map((dk, i) => {
                        const total = data.length
                        const working = data.filter(ws => ws.shifts[dk] !== 'OFF').length
                        const pct = total > 0 ? (working / total) * 100 : 0
                        return (
                            <div key={dk} style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ height: `${pct * 0.6}px`, minHeight: '4px', background: `linear-gradient(180deg, #28a745, #1a73e8)`, borderRadius: '4px 4px 0 0', transition: 'height 0.3s', margin: '0 auto', width: '70%' }} />
                                <div style={{ fontSize: '0.68rem', fontWeight: 600, marginTop: '4px' }}>{days[i]}</div>
                                <div style={{ fontSize: '0.62rem', color: 'var(--color-text-light)' }}>{working}/{total}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Schedule Grid */}
            <div className="table-container">
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ minWidth: '140px' }}>Nhân viên</th>
                                {days.map((d, i) => (
                                    <th key={d} style={{ textAlign: 'center', minWidth: '100px' }}>
                                        <div>{d}</div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '400', color: 'var(--color-text-light)' }}>{weekDates[i]}</div>
                                    </th>
                                ))}
                                <th style={{ textAlign: 'center' }}>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(ws => {
                                const totalForStaff = dayKeys.filter(dk => ws.shifts[dk] !== 'OFF').length
                                return (
                                    <tr key={ws.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{
                                                    width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)',
                                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.75rem', fontWeight: '700', flexShrink: 0
                                                }}>{ws.name.split(' ').pop()[0]}</div>
                                                <div>
                                                    <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{ws.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>{ws.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {dayKeys.map(dk => {
                                            const slot = getSlot(ws.shifts[dk])
                                            return (
                                                <td key={dk} style={{ textAlign: 'center', padding: '6px' }}>
                                                    <div onClick={() => cycleShift(ws.id, dk)}
                                                        style={{
                                                            padding: '6px 4px', borderRadius: '6px', background: slot.bg,
                                                            color: slot.color, fontWeight: '600', fontSize: '0.72rem',
                                                            cursor: 'pointer', transition: 'all 0.15s',
                                                            border: `1px solid ${slot.color}25`, lineHeight: '1.4'
                                                        }}
                                                        onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = `0 2px 6px ${slot.color}30` }}
                                                        onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none' }}>
                                                        {slot.label}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                        <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                                            <span style={{
                                                background: totalForStaff >= 5 ? '#e8f5e9' : totalForStaff >= 3 ? '#fff3e0' : '#ffebee',
                                                padding: '4px 10px', borderRadius: '8px'
                                            }}>{totalForStaff}/7</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
