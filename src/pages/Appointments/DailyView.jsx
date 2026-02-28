import { useState, useMemo } from 'react'
import { FiCalendar, FiCheckCircle, FiXCircle, FiFilter, FiDownload, FiSearch, FiX, FiPlus, FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi'
import { appointments as initialAppointments } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import CreateAppointmentModal from '../../components/CreateAppointmentModal'
import ConfirmDialog from '../../components/ConfirmDialog'

const TIME_SLOTS = [
    { label: '07:00 - 10:00', start: 7, end: 10 },
    { label: '10:00 - 13:00', start: 10, end: 13 },
    { label: '13:00 - 17:00', start: 13, end: 17 },
    { label: '17:00 - 20:00', start: 17, end: 20 },
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
    const arrivedCount = data.filter(a => a.status === 'arrived').length
    const cancelledCount = data.filter(a => a.status === 'cancelled').length

    // Compute time slot counts
    const slotCounts = useMemo(() => {
        return TIME_SLOTS.map(slot => {
            const count = data.filter(a => {
                const h = getHourFromTime(a.time)
                return h >= slot.start && h < slot.end
            }).length
            return { ...slot, count }
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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <span className="badge badge-pending">CHƯA ĐẾN</span>
            case 'arrived': return <span className="badge badge-arrived">ĐÃ ĐẾN</span>
            case 'cancelled': return <span className="badge badge-cancelled">ĐÃ HỦY</span>
            default: return null
        }
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
            <div className="mobile-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={handlePrevDay} style={{ background: 'none', border: '1px solid var(--gray-200)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--gray-600)' }}>
                        <FiChevronLeft size={18} />
                    </button>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '16px', fontWeight: 600 }}>{dayOfWeek} , {dateStr}</div>
                        <div style={{ fontSize: '13px', color: '#e53e3e', fontWeight: 600 }}>HÔM NAY</div>
                    </div>
                    <button onClick={handleNextDay} style={{ background: 'none', border: '1px solid var(--gray-200)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--gray-600)' }}>
                        <FiChevronRight size={18} />
                    </button>
                </div>
                {/* Summary Badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ background: '#198754', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>{totalCount}</span>
                        <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Lịch hẹn</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ background: '#3182ce', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>{arrivedCount}</span>
                        <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Đã đến</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ background: '#e53e3e', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>{cancelledCount}</span>
                        <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Hủy</span>
                    </div>
                </div>
            </div>

            {/* Time Slot Badges */}
            <div className="filter-bar" style={{ gap: '0', padding: '0', background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', borderRadius: '10px', padding: '6px', width: '100%' }}>
                    {slotCounts.map((slot, idx) => (
                        <div key={idx} style={{
                            flex: 1, display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 16px', borderRadius: '8px',
                            background: slot.count > 0 ? (idx === 0 ? '#e8f5e9' : '#f5f5f5') : '#f5f5f5',
                            border: slot.count > 0 ? '1px solid #c8e6c9' : '1px solid transparent',
                            transition: 'all 0.2s'
                        }}>
                            <span style={{
                                fontSize: '20px', fontWeight: 700,
                                color: slot.count > 0 ? '#198754' : 'var(--gray-400)',
                                minWidth: '30px'
                            }}>{slot.count}</span>
                            <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{slot.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search + Filter Bar */}
            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="eg .lọc dữ liệu" id="search-appointments"
                        value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <FiFilter style={{ color: 'var(--gray-400)', cursor: 'pointer' }} />
                <select className="filter-select" id="filter-status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ marginLeft: 'auto' }}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Chưa đến</option>
                    <option value="arrived">Đã đến</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
                <button className="btn btn-outline" onClick={() => setShowCreateModal(true)} style={{ whiteSpace: 'nowrap' }}>
                    Tạo lịch hẹn
                </button>
            </div>

            {/* Data Table */}
            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header">
                    <div className="table-header-left">
                        <span className="table-count">{filtered.length} / {totalCount}</span>
                    </div>
                    <div className="table-header-right">
                        <button className="btn btn-outline btn-sm" onClick={handleExport}>
                            <FiDownload size={12} /> Xuất file
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
                            <FiPlus size={12} /> Tạo lịch hẹn
                        </button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="appointments-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Thời Gian ↕</th>
                                <th>Mã Khách Hàng ↕</th>
                                <th>Khách Hàng ↕</th>
                                <th>Số Điện Thoại ↕</th>
                                <th>Nội Dung ↕</th>
                                <th>Trạng Thái ↕</th>
                                <th>Hủy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy kết quả</td></tr>
                            ) : filtered.map((apt, idx) => (
                                <tr key={apt.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#e53e3e' }}>{apt.time}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{apt.date}</div>
                                    </td>
                                    <td><span className="link-blue">{apt.customerId}</span></td>
                                    <td>{apt.customerName || apt.customer}</td>
                                    <td><span className="link-green">{apt.phone}</span></td>
                                    <td style={{ maxWidth: '280px', fontSize: '12px' }}>{apt.content || apt.service}</td>
                                    <td>{getStatusBadge(apt.status)}</td>
                                    <td>
                                        {apt.status === 'cancelled' ? (
                                            <span className="badge badge-cancelled" style={{ fontSize: '10px', padding: '2px 6px' }}>ĐÃ HỦY</span>
                                        ) : (
                                            <button className="cancel-icon" title="Hủy lịch hẹn" onClick={() => setConfirmCancel(apt)}>
                                                <FiX size={14} />
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
