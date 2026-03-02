import { useState, useMemo } from 'react'
import { FiCalendar, FiCheckCircle, FiXCircle, FiFilter, FiDownload, FiSearch, FiX, FiPlus, FiChevronLeft, FiChevronRight, FiClock, FiPhone, FiUser } from 'react-icons/fi'
import { appointments as initialAppointments } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import CreateAppointmentModal from '../../components/CreateAppointmentModal'
import ConfirmDialog from '../../components/ConfirmDialog'

const TIME_SLOTS = [
    { label: '07:00 - 10:00', start: 7, end: 10, emoji: '🌅' },
    { label: '10:00 - 13:00', start: 10, end: 13, emoji: '☀️' },
    { label: '13:00 - 17:00', start: 13, end: 17, emoji: '🌤️' },
    { label: '17:00 - 20:00', start: 17, end: 20, emoji: '🌙' },
]

function getHourFromTime(timeStr) {
    if (!timeStr) return 0
    const parts = timeStr.split(' - ')[0]
    const [h] = parts.split(':').map(Number)
    return h
}

export default function DailyView() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialAppointments)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [confirmCancel, setConfirmCancel] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 27))

    const filtered = useMemo(() => {
        let result = data
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(a =>
                a.customerName?.toLowerCase().includes(q) ||
                a.customer?.toLowerCase().includes(q) ||
                a.phone?.includes(q) ||
                a.customerId?.toLowerCase().includes(q)
            )
        }
        if (statusFilter !== 'all') {
            result = result.filter(a => a.status === statusFilter)
        }
        return result
    }, [data, search, statusFilter])

    const totalCount = data.length
    const pendingCount = data.filter(a => a.status === 'pending').length
    const arrivedCount = data.filter(a => a.status === 'arrived').length
    const cancelledCount = data.filter(a => a.status === 'cancelled').length

    // Compute time slot counts
    const slotCounts = useMemo(() => {
        return TIME_SLOTS.map(slot => {
            const slotAppts = data.filter(a => {
                const h = getHourFromTime(a.time)
                return h >= slot.start && h < slot.end
            })
            return { ...slot, count: slotAppts.length, arrived: slotAppts.filter(a => a.status === 'arrived').length }
        })
    }, [data])

    const dayOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][currentDate.getDay()]
    const dateStr = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`

    const handlePrevDay = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n })
    const handleNextDay = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n })

    const handleCancelAppointment = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
        setConfirmCancel(null)
        addToast('Đã hủy lịch hẹn thành công', 'success')
    }

    const handleToggleStatus = (apt) => {
        if (apt.status === 'cancelled') return
        const nextStatus = apt.status === 'pending' ? 'arrived' : 'pending'
        setData(prev => prev.map(a => a.id === apt.id ? { ...a, status: nextStatus } : a))
        addToast(nextStatus === 'arrived' ? `✅ ${apt.customerName || apt.customer} — Đã đến` : `↩️ ${apt.customerName || apt.customer} — Chuyển về Chưa đến`, 'success')
    }

    const handleCreateAppointment = (form) => {
        const newApt = {
            id: `APT${String(data.length + 1).padStart(3, '0')}`,
            time: form.time,
            date: form.date.split('-').reverse().join('-'),
            customerId: `KH_00${18552 + data.length}`,
            customerName: form.customer,
            customer: form.customer,
            phone: form.phone || '0900000000',
            content: form.service,
            service: form.service,
            type: 'Điều trị',
            status: 'pending',
            staff: form.staff
        }
        setData(prev => [newApt, ...prev])
        setShowCreateModal(false)
        addToast(`Đã tạo lịch hẹn cho ${form.customer}`, 'success')
    }

    const handleExport = () => {
        const csv = [
            ['#', 'Thời Gian', 'Ngày Hẹn', 'Mã KH', 'Khách Hàng', 'SĐT', 'Nội Dung', 'Loại', 'Trạng Thái'].join(','),
            ...filtered.map((a, i) => [i + 1, a.time, a.date, a.customerId, a.customerName || a.customer, a.phone, a.content || a.service, a.type, a.status].join(','))
        ].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'lich-hen.csv'; a.click()
        URL.revokeObjectURL(url)
        addToast('Đã xuất file CSV thành công', 'info')
    }

    return (
        <div className="fade-in">
            <CreateAppointmentModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSave={handleCreateAppointment} />
            <ConfirmDialog
                isOpen={!!confirmCancel}
                title="Hủy lịch hẹn?"
                message={`Bạn có chắc chắn muốn hủy lịch hẹn của ${confirmCancel?.customerName || confirmCancel?.customer || ''}?`}
                onConfirm={() => handleCancelAppointment(confirmCancel.id)}
                onCancel={() => setConfirmCancel(null)}
            />

            {/* Date Navigation Header */}
            <div data-no-mobile-fix="true" style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div data-no-mobile-fix="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
                    <button onClick={handlePrevDay} style={{
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                        border: 'none', borderRadius: '12px', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--gray-600)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s ease'
                    }}>
                        <FiChevronLeft size={18} />
                    </button>
                    <div>
                        <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gray-800)' }}>{dayOfWeek}, {dateStr}</div>
                        <div style={{ fontSize: '12px', color: '#e53e3e', fontWeight: 600, marginTop: '2px' }}>HÔM NAY</div>
                    </div>
                    <button onClick={handleNextDay} style={{
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                        border: 'none', borderRadius: '12px', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--gray-600)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s ease'
                    }}>
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Status Summary Cards — clickable filters */}
            <div data-no-mobile-fix="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
                {[
                    { label: 'Tổng lịch hẹn', count: totalCount, color: '#0f172a', bg: '#f8fafc', filter: 'all' },
                    { label: 'Chờ đến', count: pendingCount, color: '#d97706', bg: '#fffbeb', filter: 'pending' },
                    { label: 'Đã đến', count: arrivedCount, color: '#059669', bg: '#ecfdf5', filter: 'arrived' },
                    { label: 'Đã hủy', count: cancelledCount, color: '#dc2626', bg: '#fef2f2', filter: 'cancelled' },
                ].map((s, i) => (
                    <div key={i} onClick={() => setStatusFilter(s.filter)} style={{
                        textAlign: 'center', padding: '12px 8px', borderRadius: 12,
                        background: statusFilter === s.filter ? s.color : s.bg,
                        cursor: 'pointer', transition: 'all 0.2s ease',
                        border: `1px solid ${statusFilter === s.filter ? s.color : '#e5e7eb'}`,
                    }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: statusFilter === s.filter ? 'white' : s.color }}>{s.count}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: statusFilter === s.filter ? 'rgba(255,255,255,0.8)' : '#94a3b8' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Time Slot Distribution */}
            <div data-no-mobile-fix="true" style={{ display: 'flex', gap: 6, marginBottom: 14, overflow: 'auto' }}>
                {slotCounts.map((slot, i) => (
                    <div key={i} style={{
                        flex: '1 0 auto', minWidth: 100, padding: '8px 12px', borderRadius: 10,
                        background: 'white', border: '1px solid #e5e7eb',
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <span style={{ fontSize: 18 }}>{slot.emoji}</span>
                        <div>
                            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{slot.label}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{slot.count}</span>
                                <span style={{ fontSize: 10, color: '#059669', fontWeight: 600 }}>{slot.arrived}/{slot.count}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Bar */}
            <div data-no-mobile-fix="true" style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <button onClick={() => setShowCreateModal(true)} style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, #20c997 100%)',
                    color: 'white', border: 'none', borderRadius: '50px',
                    padding: '10px 20px', fontWeight: 600, fontSize: '13px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    cursor: 'pointer', boxShadow: '0 3px 12px rgba(25,135,84,0.25)',
                    transition: 'all 0.2s ease', fontFamily: 'var(--font-family)',
                }}>
                    <FiPlus size={15} /> Tạo lịch hẹn
                </button>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', minWidth: 150 }}>
                    <FiSearch size={14} style={{ position: 'absolute', left: 12, color: '#94a3b8' }} />
                    <input type="text" placeholder="Tìm tên, SĐT, mã KH..." id="search-appointments"
                        value={search} onChange={e => setSearch(e.target.value)}
                        style={{
                            width: '100%', padding: '10px 12px 10px 34px', borderRadius: 50,
                            border: '1px solid #e5e7eb', fontSize: 13, outline: 'none',
                            background: '#f8fafc', fontFamily: 'var(--font-family)',
                            transition: 'border 0.2s ease',
                        }}
                    />
                    {search && <FiX size={14} style={{ position: 'absolute', right: 12, color: '#94a3b8', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <button onClick={handleExport} style={{
                    background: '#f1f5f9', border: 'none', borderRadius: 50,
                    padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#64748b',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    fontFamily: 'var(--font-family)', transition: 'all 0.2s ease',
                }}>
                    <FiDownload size={13} /> CSV
                </button>
            </div>

            {/* Data Table */}
            <div className="table-container" style={{ marginTop: 0 }}>
                <div className="table-header">
                    <div className="table-header-left">
                        <span className="table-count">{filtered.length} / {totalCount}</span>
                        {statusFilter !== 'all' && (
                            <button onClick={() => setStatusFilter('all')} style={{
                                background: '#fef2f2', border: 'none', borderRadius: 6, padding: '2px 8px',
                                fontSize: 10, color: '#dc2626', cursor: 'pointer', fontWeight: 600,
                                fontFamily: 'var(--font-family)',
                            }}>
                                ✕ Bỏ lọc
                            </button>
                        )}
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="appointments-table">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>#</th>
                                <th>Giờ hẹn</th>
                                <th>Khách hàng</th>
                                <th>SĐT</th>
                                <th>Dịch vụ</th>
                                <th style={{ width: 110, textAlign: 'center' }}>Trạng thái</th>
                                <th style={{ width: 50, textAlign: 'center' }}>Hủy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy kết quả</td></tr>
                            ) : filtered.map((apt, idx) => (
                                <tr key={apt.id} style={{ opacity: apt.status === 'cancelled' ? 0.5 : 1 }}>
                                    <td style={{ color: '#94a3b8', fontSize: 12 }}>{idx + 1}</td>
                                    <td>
                                        <div style={{ fontWeight: 700, color: '#e53e3e', fontSize: 13 }}>{apt.time}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{apt.date}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{apt.customerName || apt.customer}</div>
                                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{apt.customerId}</div>
                                    </td>
                                    <td>
                                        <a href={`tel:${apt.phone}`} style={{ color: '#059669', textDecoration: 'none', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <FiPhone size={10} /> {apt.phone}
                                        </a>
                                    </td>
                                    <td style={{ maxWidth: '200px', fontSize: '12px', color: '#475569' }}>{apt.content || apt.service}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {apt.status === 'cancelled' ? (
                                            <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: '#fef2f2', color: '#dc2626' }}>ĐÃ HỦY</span>
                                        ) : (
                                            <button onClick={() => handleToggleStatus(apt)} title={apt.status === 'pending' ? 'Click → Đã đến' : 'Click → Chưa đến'} style={{
                                                padding: '5px 12px', borderRadius: 20, border: 'none',
                                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                                transition: 'all 0.2s ease', fontFamily: 'var(--font-family)',
                                                background: apt.status === 'arrived' ? '#ecfdf5' : '#eff6ff',
                                                color: apt.status === 'arrived' ? '#059669' : '#3b82f6',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                            }}>
                                                {apt.status === 'arrived' ? '✅ ĐÃ ĐẾN' : '🔵 CHƯA ĐẾN'}
                                            </button>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {apt.status !== 'cancelled' && (
                                            <button onClick={() => setConfirmCancel(apt)} title="Hủy lịch hẹn" style={{
                                                border: 'none', background: '#fef2f2', borderRadius: '50%',
                                                width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: '#dc2626', transition: 'all 0.2s ease',
                                            }}>
                                                <FiX size={12} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
