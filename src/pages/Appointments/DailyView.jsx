import { useState, useMemo } from 'react'
import { appointments as initialAppointments } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import CreateAppointmentModal from '../../components/CreateAppointmentModal'

const TIME_SLOTS = [
    { label: '07-10h', start: 7, end: 10 },
    { label: '10-13h', start: 10, end: 13 },
    { label: '13-17h', start: 13, end: 17 },
    { label: '17-20h', start: 17, end: 20 },
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
    const [showSearch, setShowSearch] = useState(false)

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

    const slotCounts = useMemo(() => {
        return TIME_SLOTS.map(slot => {
            const slotAppts = data.filter(a => {
                const h = getHourFromTime(a.time)
                return h >= slot.start && h < slot.end
            })
            return { ...slot, count: slotAppts.length, arrived: slotAppts.filter(a => a.status === 'arrived').length }
        })
    }, [data])

    const dayOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][currentDate.getDay()]
    const dateStr = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`

    const handlePrevDay = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n })
    const handleNextDay = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n })

    const handleCancelAppointment = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
        setConfirmCancel(null)
        addToast('Đã hủy lịch hẹn', 'success')
    }

    const handleToggleStatus = (apt) => {
        if (apt.status === 'cancelled') return
        const nextStatus = apt.status === 'pending' ? 'arrived' : 'pending'
        setData(prev => prev.map(a => a.id === apt.id ? { ...a, status: nextStatus } : a))
        addToast(nextStatus === 'arrived' ? `${apt.customerName || apt.customer} — Đã đến` : `${apt.customerName || apt.customer} — Chưa đến`, 'success')
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
            ['#', 'Thời Gian', 'Mã KH', 'Khách Hàng', 'SĐT', 'Nội Dung', 'Trạng Thái'].join(','),
            ...filtered.map((a, i) => [i + 1, a.time, a.customerId, a.customerName || a.customer, a.phone, a.content || a.service, a.status].join(','))
        ].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'lich-hen.csv'; a.click()
        URL.revokeObjectURL(url)
        addToast('Đã xuất CSV', 'info')
    }

    const statusBtnStyle = (status) => ({
        padding: '4px 12px', borderRadius: 20, border: 'none',
        fontSize: 11, fontWeight: 700, cursor: status === 'cancelled' ? 'default' : 'pointer',
        whiteSpace: 'nowrap', fontFamily: 'var(--font-family)',
        transition: 'all 0.15s ease',
        background: status === 'arrived' ? '#ecfdf5' : status === 'cancelled' ? '#fef2f2' : '#eff6ff',
        color: status === 'arrived' ? '#059669' : status === 'cancelled' ? '#dc2626' : '#3b82f6',
    })

    const statusLabel = (s) => s === 'arrived' ? 'ĐÃ ĐẾN' : s === 'cancelled' ? 'ĐÃ HỦY' : 'CHƯA ĐẾN'

    return (
        <div className="fade-in">
            <CreateAppointmentModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSave={handleCreateAppointment} />

            {/* Compact Header: Date Nav + Stats in one strip */}
            <div className="daily-header" data-no-mobile-fix="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                <div data-no-mobile-fix="true" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={handlePrevDay} style={navBtnStyle}>‹</button>
                    <div style={{ textAlign: 'center', minWidth: 100 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{dayOfWeek}, {dateStr}</div>
                        <div style={{ fontSize: 10, color: '#e53e3e', fontWeight: 600 }}>HÔM NAY</div>
                    </div>
                    <button onClick={handleNextDay} style={navBtnStyle}>›</button>
                </div>
                <div data-no-mobile-fix="true" style={{ display: 'flex', gap: 6 }}>
                    {[
                        { v: totalCount, c: '#0f172a', f: 'all' },
                        { v: pendingCount, c: '#d97706', f: 'pending' },
                        { v: arrivedCount, c: '#059669', f: 'arrived' },
                        { v: cancelledCount, c: '#dc2626', f: 'cancelled' },
                    ].map((s, i) => (
                        <button key={i} onClick={() => setStatusFilter(s.f === statusFilter ? 'all' : s.f)} style={{
                            width: 36, height: 36, borderRadius: 10, border: 'none',
                            background: statusFilter === s.f ? s.c : '#f1f5f9',
                            color: statusFilter === s.f ? 'white' : s.c,
                            fontSize: 14, fontWeight: 800, cursor: 'pointer',
                            transition: 'all 0.15s ease', fontFamily: 'var(--font-family)',
                        }}>{s.v}</button>
                    ))}
                </div>
            </div>

            {/* Time Slots — compact horizontal row */}
            <div data-no-mobile-fix="true" style={{ display: 'flex', gap: 4, marginBottom: 10, overflow: 'auto' }}>
                {slotCounts.map((slot, i) => (
                    <div key={i} style={{
                        flex: '1 0 0', padding: '6px 8px', borderRadius: 8,
                        background: 'white', border: '1px solid #f1f5f9', textAlign: 'center', minWidth: 0,
                    }}>
                        <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600 }}>{slot.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{slot.count} <span style={{ fontSize: 9, color: '#059669', fontWeight: 600 }}>{slot.arrived}/{slot.count}</span></div>
                    </div>
                ))}
            </div>

            {/* Action Row */}
            <div data-no-mobile-fix="true" style={{ display: 'flex', gap: 6, marginBottom: 10, alignItems: 'center' }}>
                <button onClick={() => setShowCreateModal(true)} className="daily-create-btn" style={{
                    background: 'linear-gradient(135deg, var(--primary), #20c997)',
                    color: 'white', border: 'none', borderRadius: 50,
                    padding: '8px 16px', fontWeight: 600, fontSize: 12,
                    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-family)',
                    boxShadow: '0 2px 8px rgba(25,135,84,0.2)',
                }}>+ Tạo lịch hẹn</button>

                {showSearch ? (
                    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input type="text" autoFocus placeholder="Tìm tên, SĐT..." id="search-appointments"
                            value={search} onChange={e => setSearch(e.target.value)}
                            style={{
                                width: '100%', padding: '8px 28px 8px 10px', borderRadius: 50,
                                border: '1px solid #e5e7eb', fontSize: 12, outline: 'none',
                                background: '#f8fafc', fontFamily: 'var(--font-family)',
                            }}
                        />
                        <span style={{ position: 'absolute', right: 8, color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}
                            onClick={() => { setSearch(''); setShowSearch(false) }}>×</span>
                    </div>
                ) : (
                    <button onClick={() => setShowSearch(true)} style={actionBtnStyle}>Tìm</button>
                )}

                <button onClick={handleExport} style={actionBtnStyle}>CSV</button>

                {statusFilter !== 'all' && (
                    <button onClick={() => setStatusFilter('all')} style={{
                        ...actionBtnStyle, background: '#fef2f2', color: '#dc2626', fontSize: 10,
                    }}>Bỏ lọc</button>
                )}
            </div>

            {/* Desktop: Table | Mobile: Cards */}
            <div className="daily-table-desktop">
                <div className="table-container" style={{ marginTop: 0 }}>
                    <div className="table-header">
                        <div className="table-header-left">
                            <span className="table-count">{filtered.length} / {totalCount}</span>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <table className="data-table" id="appointments-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 36 }}>#</th>
                                    <th>Giờ hẹn</th>
                                    <th>Khách hàng</th>
                                    <th>SĐT</th>
                                    <th>Dịch vụ</th>
                                    <th style={{ width: 100, textAlign: 'center' }}>Trạng thái</th>
                                    <th style={{ width: 44, textAlign: 'center' }}>Hủy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Không có kết quả</td></tr>
                                ) : filtered.map((apt, idx) => (
                                    <tr key={apt.id} style={{ opacity: apt.status === 'cancelled' ? 0.5 : 1 }}>
                                        <td style={{ color: '#94a3b8', fontSize: 11 }}>{idx + 1}</td>
                                        <td>
                                            <div style={{ fontWeight: 700, color: '#e53e3e', fontSize: 13 }}>{apt.time}</div>
                                            <div style={{ fontSize: 10, color: '#94a3b8' }}>{apt.date}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{apt.customerName || apt.customer}</div>
                                            <div style={{ fontSize: 10, color: '#94a3b8' }}>{apt.customerId}</div>
                                        </td>
                                        <td><a href={`tel:${apt.phone}`} style={{ color: '#059669', textDecoration: 'none', fontWeight: 600, fontSize: 12 }}>{apt.phone}</a></td>
                                        <td style={{ maxWidth: 200, fontSize: 12, color: '#475569' }}>{apt.content || apt.service}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            {apt.status === 'cancelled' ? (
                                                <span style={statusBtnStyle('cancelled')}>ĐÃ HỦY</span>
                                            ) : (
                                                <button onClick={() => handleToggleStatus(apt)} style={statusBtnStyle(apt.status)}>{statusLabel(apt.status)}</button>
                                            )}
                                        </td>
                                        <td style={{ textAlign: 'center', position: 'relative' }}>
                                            {apt.status !== 'cancelled' && confirmCancel?.id !== apt.id && (
                                                <button onClick={() => setConfirmCancel(apt)} style={cancelBtnStyle}>×</button>
                                            )}
                                            {confirmCancel?.id === apt.id && <InlineConfirm onConfirm={() => handleCancelAppointment(apt.id)} onCancel={() => setConfirmCancel(null)} />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Mobile Card List */}
            <div className="daily-cards-mobile">
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>{filtered.length} lịch hẹn</div>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8', fontSize: 13 }}>Không có kết quả</div>
                ) : filtered.map((apt, idx) => (
                    <div key={apt.id} style={{
                        background: 'white', borderRadius: 12, padding: '12px 14px', marginBottom: 8,
                        border: '1px solid #f1f5f9', opacity: apt.status === 'cancelled' ? 0.5 : 1,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}>
                        {/* Row 1: Time + Name + Status */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#e53e3e', minWidth: 80 }}>{apt.time}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{apt.customerName || apt.customer}</span>
                            </div>
                            {apt.status === 'cancelled' ? (
                                <span style={statusBtnStyle('cancelled')}>ĐÃ HỦY</span>
                            ) : (
                                <button onClick={() => handleToggleStatus(apt)} style={statusBtnStyle(apt.status)}>{statusLabel(apt.status)}</button>
                            )}
                        </div>
                        {/* Row 2: Details + Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: 11, color: '#64748b' }}>
                                <a href={`tel:${apt.phone}`} style={{ color: '#059669', textDecoration: 'none', fontWeight: 600 }}>{apt.phone}</a>
                                <span style={{ margin: '0 6px', color: '#e2e8f0' }}>|</span>
                                <span>{apt.content || apt.service}</span>
                            </div>
                            {apt.status !== 'cancelled' && (
                                <div style={{ position: 'relative' }}>
                                    {confirmCancel?.id !== apt.id ? (
                                        <button onClick={() => setConfirmCancel(apt)} style={{ ...cancelBtnStyle, width: 24, height: 24, fontSize: 11 }}>×</button>
                                    ) : (
                                        <div style={{
                                            display: 'flex', gap: 4, alignItems: 'center',
                                        }}>
                                            <button onClick={() => handleCancelAppointment(apt.id)} style={{
                                                border: 'none', background: '#dc2626', color: 'white', borderRadius: 6,
                                                padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                                                fontFamily: 'var(--font-family)',
                                            }}>Hủy</button>
                                            <button onClick={() => setConfirmCancel(null)} style={{
                                                border: '1px solid #e5e7eb', background: 'white', color: '#94a3b8', borderRadius: 6,
                                                padding: '3px 8px', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                                                fontFamily: 'var(--font-family)',
                                            }}>×</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function InlineConfirm({ onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'white', border: '1px solid #fecaca', borderRadius: 10,
            padding: '6px 10px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            zIndex: 10, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
        }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>Hủy?</span>
            <button onClick={onConfirm} style={{
                border: 'none', background: '#dc2626', color: 'white', borderRadius: 6,
                padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-family)',
            }}>OK</button>
            <button onClick={onCancel} style={{
                border: '1px solid #e5e7eb', background: 'white', color: '#64748b', borderRadius: 6,
                padding: '3px 8px', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)',
            }}>×</button>
        </div>
    )
}

const navBtnStyle = {
    background: '#f1f5f9', border: 'none', borderRadius: 10,
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#64748b', fontSize: 16, transition: 'all 0.15s ease',
}

const actionBtnStyle = {
    background: '#f1f5f9', border: 'none', borderRadius: 50,
    padding: '8px 12px', fontSize: 11, fontWeight: 600, color: '#64748b',
    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-family)',
    transition: 'all 0.15s ease',
}

const cancelBtnStyle = {
    border: 'none', background: '#fef2f2', borderRadius: '50%',
    width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#dc2626', fontSize: 13, lineHeight: 1, transition: 'all 0.15s ease',
}
