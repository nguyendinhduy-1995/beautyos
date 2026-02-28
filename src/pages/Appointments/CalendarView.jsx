import { useState, useMemo } from 'react'
import { FiChevronLeft, FiChevronRight, FiPlus, FiCalendar, FiClock, FiUser, FiX } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

function generateCalendarDays(year, month, todayDate) {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    const days = []
    for (let i = firstDay - 1; i >= 0; i--) days.push({ day: daysInPrevMonth - i, otherMonth: true })
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, otherMonth: false, today: i === todayDate.getDate() && month === todayDate.getMonth() && year === todayDate.getFullYear() })
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) days.push({ day: i, otherMonth: true })
    return days
}

const initialEvents = {
    1: [{ text: 'BS My - Tư vấn', time: '08:30', color: '#3498db' }],
    3: [{ text: 'Vũ Ngọc - Điều trị', time: '09:00', color: '#27ae60' }],
    5: [{ text: 'Kim Trang - Tư vấn', time: '10:00', color: '#8e44ad' }, { text: 'Hà My - Spa', time: '14:00', color: '#e67e22' }],
    7: [{ text: 'Nguyễn Lan - Botox', time: '09:30', color: '#e74c3c' }],
    10: [{ text: 'Lê Thị Hoa - Spa', time: '08:00', color: '#3498db' }, { text: 'Trần Minh - Nha khoa', time: '10:00', color: '#27ae60' }, { text: 'Kim Chi - PRP', time: '15:00', color: '#e74c3c' }],
    12: [{ text: 'Phạm Hà - Hifu', time: '09:00', color: '#8e44ad' }],
    15: [{ text: 'Phan Ngân - Trị mụn', time: '11:00', color: '#3498db' }],
    18: [{ text: 'Trần Bảo - Laser', time: '14:30', color: '#e67e22' }, { text: 'Lê Hạnh - Filler', time: '16:00', color: '#27ae60' }],
    20: [{ text: 'Hà Tú - Hifu', time: '10:00', color: '#27ae60' }],
    22: [{ text: 'Mai Anh - Spa', time: '08:00', color: '#3498db' }],
    25: [{ text: 'Hoàng Yến - Botox', time: '09:00', color: '#e74c3c' }, { text: 'Thanh Hà - Filler', time: '13:00', color: '#8e44ad' }],
    27: [{ text: 'Vũ Ngọc - Tư vấn', time: '07:00', color: '#3498db' }, { text: 'Kim Trang - Spa', time: '09:30', color: '#27ae60' }, { text: 'Tú Thảo - Điều trị', time: '10:00', color: '#e67e22' }],
    28: [{ text: 'Đặng Hoa - Laser', time: '08:30', color: '#e74c3c' }],
}

const eventColors = ['#3498db', '#27ae60', '#e74c3c', '#8e44ad', '#e67e22']

export default function CalendarView() {
    const toast = useToast()
    const today = new Date(2026, 1, 28)
    const [year, setYear] = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth())
    const [selectedDay, setSelectedDay] = useState(null)
    const [events, setEvents] = useState(initialEvents)
    const [showAddModal, setShowAddModal] = useState(false)
    const [addForDay, setAddForDay] = useState(null)
    const [form, setForm] = useState({ customer: '', service: '', time: '09:00' })

    const days = useMemo(() => generateCalendarDays(year, month, today), [year, month])

    const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
    const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }
    const goToday = () => { setYear(today.getFullYear()); setMonth(today.getMonth()) }

    const totalEvents = Object.values(events).reduce((s, e) => s + e.length, 0)
    const selectedEvents = selectedDay && !selectedDay.otherMonth ? (events[selectedDay.day] || []) : []

    const openAddModal = (day) => {
        setAddForDay(day || (selectedDay && !selectedDay.otherMonth ? selectedDay.day : today.getDate()))
        setForm({ customer: '', service: '', time: '09:00' })
        setShowAddModal(true)
    }

    const handleAdd = () => {
        if (!form.customer || !form.service) return toast.warning('Nhập tên khách hàng và dịch vụ')
        const day = addForDay
        const color = eventColors[Math.floor(Math.random() * eventColors.length)]
        const newEvent = { text: `${form.customer} - ${form.service}`, time: form.time, color }
        setEvents(prev => ({ ...prev, [day]: [...(prev[day] || []), newEvent] }))
        toast.success(`Đã thêm lịch hẹn cho ngày ${day}/${month + 1}`)
        setShowAddModal(false)
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Lịch Hẹn - Calendar</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Xem lịch hẹn theo tháng • Tổng {totalEvents} lịch hẹn</p></div>
                <button className="btn btn-primary" onClick={() => openAddModal()}><FiPlus size={14} /> Thêm lịch hẹn</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCalendar color="#28a745" /></div><div><div className="stat-label">Tổng lịch hẹn tháng</div><div className="stat-value">{totalEvents}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiClock color="#1976d2" /></div><div><div className="stat-label">Ngày có lịch</div><div className="stat-value">{Object.keys(events).length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiUser color="#ff9800" /></div><div><div className="stat-label">Hôm nay</div><div className="stat-value">{(events[today.getDate()] || []).length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiCalendar color="#8e44ad" /></div><div><div className="stat-label">{monthNames[month]}</div><div className="stat-value">{year}</div></div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
                <div className="card">
                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 10px' }} onClick={prevMonth}><FiChevronLeft size={16} /></button>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, minWidth: '160px', textAlign: 'center' }}>{monthNames[month]} {year}</h3>
                            <button className="btn btn-secondary" style={{ padding: '6px 10px' }} onClick={nextMonth}><FiChevronRight size={16} /></button>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.82rem' }} onClick={goToday}>Hôm nay</button>
                    </div>

                    <div style={{ padding: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                            {daysOfWeek.map(d => (
                                <div key={d} style={{ padding: '8px', textAlign: 'center', fontWeight: 700, fontSize: '0.78rem', color: d === 'CN' ? 'var(--accent-red)' : 'var(--gray-500)', background: 'var(--gray-50)', borderRadius: '6px' }}>{d}</div>
                            ))}
                            {days.map((d, i) => {
                                const evts = !d.otherMonth ? (events[d.day] || []) : []
                                const isSelected = selectedDay && selectedDay.day === d.day && selectedDay.otherMonth === d.otherMonth
                                return (
                                    <div key={i} onClick={() => !d.otherMonth && setSelectedDay(d)}
                                        style={{
                                            minHeight: '85px', padding: '6px', borderRadius: '8px', cursor: d.otherMonth ? 'default' : 'pointer',
                                            background: d.today ? 'var(--accent-green-light)' : isSelected ? '#e3f2fd' : 'transparent',
                                            border: d.today ? '2px solid var(--primary)' : isSelected ? '2px solid #1976d2' : '1px solid var(--gray-100)',
                                            transition: 'all 0.15s', opacity: d.otherMonth ? 0.3 : 1,
                                        }}>
                                        <div style={{ fontSize: '0.82rem', fontWeight: d.today ? 800 : 600, color: d.today ? 'var(--primary)' : d.otherMonth ? 'var(--gray-300)' : 'var(--gray-700)', marginBottom: '4px' }}>{d.day}</div>
                                        {evts.slice(0, 2).map((evt, j) => (
                                            <div key={j} style={{ fontSize: '0.65rem', padding: '2px 4px', borderRadius: '4px', marginBottom: '2px', background: evt.color + '15', color: evt.color, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderLeft: `3px solid ${evt.color}` }}>{evt.text}</div>
                                        ))}
                                        {evts.length > 2 && <div style={{ fontSize: '0.6rem', color: 'var(--gray-500)', fontWeight: 600 }}>+{evts.length - 2} thêm</div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Day Detail */}
                <div className="card" style={{ alignSelf: 'start' }}>
                    <div className="card-header"><h3 className="card-title" style={{ fontSize: '0.85rem' }}>📋 {selectedDay && !selectedDay.otherMonth ? `Ngày ${selectedDay.day}/${month + 1}` : 'Chi tiết ngày'}</h3></div>
                    <div style={{ padding: '12px' }}>
                        {selectedEvents.length > 0 ? selectedEvents.map((evt, i) => (
                            <div key={i} style={{ padding: '10px 12px', borderRadius: '8px', marginBottom: '8px', background: evt.color + '10', borderLeft: `4px solid ${evt.color}` }}>
                                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: evt.color, marginBottom: '4px' }}>{evt.time}</div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{evt.text}</div>
                            </div>
                        )) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.82rem' }}>
                                {selectedDay ? 'Không có lịch hẹn' : 'Chọn một ngày để xem chi tiết'}
                            </div>
                        )}
                        {selectedDay && !selectedDay.otherMonth && (
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '8px', fontSize: '0.82rem' }} onClick={() => openAddModal(selectedDay.day)}><FiPlus size={12} /> Thêm lịch hẹn</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Appointment Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>📅 Thêm Lịch Hẹn - Ngày {addForDay}/{month + 1}/{year}</h2><button className="btn-close" onClick={() => setShowAddModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Khách hàng *</label><input className="form-control" value={form.customer} onChange={e => setForm(p => ({ ...p, customer: e.target.value }))} placeholder="VD: Nguyễn Thị Mai" /></div>
                            <div className="form-group"><label>Dịch vụ *</label><input className="form-control" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} placeholder="VD: Nâng cơ Hifu" /></div>
                            <div className="form-group"><label>Giờ hẹn</label><input type="time" className="form-control" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleAdd}><FiPlus size={14} /> Thêm</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
