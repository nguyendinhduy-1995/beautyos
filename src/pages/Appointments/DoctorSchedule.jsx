import { useState } from 'react'
import { appointments } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const doctors = [
    { id: 1, name: 'Dr. Thọ', color: '#e8f5e9' },
    { id: 2, name: 'BS Công Vũ', color: '#fce4ec' },
    { id: 3, name: 'BS Tuấn Anh', color: '#e3f2fd' },
    { id: 4, name: 'BS My', color: '#fff3e0' },
    { id: 5, name: 'BS Hằng', color: '#f3e5f5' },
]

const timeSlots = []
for (let h = 7; h <= 18; h++) {
    for (let m = 0; m < 60; m += 15) {
        timeSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
}

const doctorAppointments = [
    { doctor: 0, time: '07:00', duration: 2, customer: 'Vũ Ngọc', service: 'Chăm sóc da', color: '#c8e6c9' },
    { doctor: 0, time: '09:00', duration: 2, customer: 'Hà Trọng Tú', service: 'Filler môi', color: '#bbdefb' },
    { doctor: 0, time: '11:30', duration: 2, customer: 'Khánh An', service: 'Nâng cơ Hifu', color: '#d1c4e9' },
    { doctor: 1, time: '09:30', duration: 2, customer: 'Hà Trọng Tú', service: 'Botox', color: '#f8bbd0' },
    { doctor: 1, time: '09:33', duration: 2, customer: 'Khánh An', service: 'Tiêm filler', color: '#f8bbd0' },
    { doctor: 2, time: '07:30', duration: 2, customer: 'Phan Thị Ngân', service: 'Laser', color: '#c8e6c9' },
    { doctor: 2, time: '10:00', duration: 2, customer: 'Tấn Vương', service: 'PRP', color: '#e1bee7' },
    { doctor: 3, time: '08:00', duration: 2, customer: 'Nguyễn Tú Thảo', service: 'Mesotherapy', color: '#ffe0b2' },
    { doctor: 3, time: '10:30', duration: 2, customer: 'Võ Kim Yến', service: 'Peel da', color: '#c8e6c9' },
    { doctor: 4, time: '08:30', duration: 2, customer: 'Phan Thị Kim Hồng', service: 'Triệt lông', color: '#f8bbd0' },
    { doctor: 4, time: '11:00', duration: 2, customer: 'Mi', service: 'Trẻ hoá da', color: '#f8bbd0' },
]

export default function DoctorSchedule() {
    const toast = useToast()
    const today = new Date()
    const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const [viewMode, setViewMode] = useState('mine')
    const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0])

    const getSlotIndex = (time) => {
        const [h, m] = time.split(':').map(Number)
        return (h - 7) * 4 + Math.floor(m / 15)
    }

    const handleExport = () => {
        const csv = 'Bác sĩ,Giờ,Khách hàng,Dịch vụ\n' + doctorAppointments.map(a =>
            `${doctors[a.doctor].name},${a.time},${a.customer},${a.service}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const el = document.createElement('a'); el.href = URL.createObjectURL(blob); el.download = 'lich-bac-si.csv'; el.click()
        toast.success('Đã xuất file lịch bác sĩ')
    }

    return (
        <div className="page-container" style={{ padding: '0' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid var(--color-border)', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <select className="filter-select"><option>CN_1834</option></select>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button className={`btn ${viewMode === 'mine' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => { setViewMode('mine'); toast.info('Hiển thị lịch của tôi') }}>Của tôi</button>
                        <button className={`btn ${viewMode === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => { setViewMode('all'); toast.info('Hiển thị tất cả') }}>Tất cả</button>
                    </div>
                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.85rem' }} />
                    <button className="btn btn-secondary" onClick={() => { setSelectedDate(new Date().toISOString().split('T')[0]); toast.info('Đã chuyển về hôm nay') }}>HÔM NAY</button>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={() => toast.success('Đã cập nhật lịch')}>Ok</button>
                    <button className="btn btn-secondary" onClick={() => toast.info('Mở cài đặt lịch...')}>Cài đặt</button>
                    <button className="btn btn-secondary" onClick={() => toast.info('Mở sắp xếp bác sĩ...')}>Sắp xếp bác sĩ</button>
                    <button className="btn btn-secondary" onClick={handleExport}>Xuất file</button>
                </div>
            </div>

            {/* Doctor columns header */}
            <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(5, 1fr)', borderBottom: '2px solid var(--color-border)', background: 'white' }}>
                <div style={{ padding: '12px 8px', borderRight: '1px solid var(--color-border)' }}></div>
                {doctors.map(doc => (
                    <div key={doc.id} style={{ padding: '12px 16px', borderRight: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: doc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '600' }}>
                            {doc.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{doc.name}</span>
                    </div>
                ))}
            </div>

            {/* Time grid */}
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 180px)', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(5, 1fr)', minHeight: `${timeSlots.length * 28}px` }}>
                    {/* Time labels column */}
                    <div style={{ borderRight: '1px solid var(--color-border)' }}>
                        {timeSlots.map((slot, i) => (
                            <div key={i} style={{
                                height: '28px', padding: '0 8px', fontSize: '0.7rem', color: 'var(--color-text-light)',
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                                borderBottom: slot.endsWith(':00') ? '1px solid var(--color-border)' : '1px solid #f0f0f0',
                                fontWeight: slot.endsWith(':00') ? '600' : '400',
                                background: slot.endsWith(':00') ? '#fafafa' : 'white'
                            }}>
                                {slot}
                            </div>
                        ))}
                    </div>

                    {/* Doctor columns */}
                    {doctors.map((doc, di) => (
                        <div key={doc.id} style={{ borderRight: '1px solid var(--color-border)', position: 'relative' }}>
                            {/* Grid lines */}
                            {timeSlots.map((slot, i) => (
                                <div key={i} style={{
                                    height: '28px',
                                    borderBottom: slot.endsWith(':00') ? '1px solid var(--color-border)' : '1px solid #f5f5f5',
                                    cursor: 'pointer'
                                }}
                                    onMouseOver={e => e.currentTarget.style.background = '#f0f7ff'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                />
                            ))}
                            {/* Appointment blocks */}
                            {doctorAppointments.filter(a => a.doctor === di).map((apt, ai) => {
                                const topIndex = getSlotIndex(apt.time)
                                return (
                                    <div key={ai} style={{
                                        position: 'absolute',
                                        top: `${topIndex * 28}px`,
                                        left: '2px', right: '2px',
                                        height: `${apt.duration * 28}px`,
                                        background: apt.color,
                                        borderRadius: '6px',
                                        padding: '4px 8px',
                                        fontSize: '0.72rem',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        borderLeft: '3px solid rgba(0,0,0,0.15)',
                                        zIndex: 2,
                                        transition: 'transform 0.15s'
                                    }}
                                        onClick={() => toast.info(`${apt.customer} - ${apt.service} (${apt.time})`)}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <div style={{ fontWeight: '600', fontSize: '0.7rem' }}>{apt.time}</div>
                                        <div>{apt.customer}</div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
