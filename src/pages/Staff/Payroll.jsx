import { useState, useMemo } from 'react'
import { FiDollarSign, FiSearch, FiX, FiDownload, FiCheck, FiUser, FiClock, FiCalendar } from 'react-icons/fi'
import { payroll as initialPayroll, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const subTabs = [
    { id: 'payroll', label: 'Bảng lương nhân viên' },
    { id: 'attendance', label: 'Lịch sử chấm công' },
    { id: 'schedule', label: 'Lịch làm việc' },
]

const attendanceData = [
    { id: 1, name: 'Nguyễn Văn An', date: '28/02/2026', checkIn: '07:55', checkOut: '17:05', status: 'Đúng giờ', hours: 8.1 },
    { id: 2, name: 'Trần Thị Bình', date: '28/02/2026', checkIn: '08:12', checkOut: '17:30', status: 'Muộn', hours: 8.3 },
    { id: 3, name: 'Lê Hoàng Chi', date: '28/02/2026', checkIn: '07:50', checkOut: '16:00', status: 'Về sớm', hours: 7.2 },
    { id: 4, name: 'Phạm Minh Đức', date: '28/02/2026', checkIn: '08:00', checkOut: '17:00', status: 'Đúng giờ', hours: 8.0 },
    { id: 5, name: 'Hoàng Thu Hà', date: '28/02/2026', checkIn: '—', checkOut: '—', status: 'Vắng', hours: 0 },
]

export default function Payroll() {
    const [payroll, setPayroll] = useState(initialPayroll)
    const [search, setSearch] = useState('')
    const [selectedIds, setSelectedIds] = useState([])
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('payroll')
    const [department, setDepartment] = useState('all')
    const [month, setMonth] = useState('2026-02')
    const toast = useToast()

    const filtered = useMemo(() => {
        if (!search) return payroll
        return payroll.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }, [payroll, search])

    const totals = useMemo(() => ({
        salary: payroll.reduce((s, p) => s + p.netSalary, 0),
        commission: payroll.reduce((s, p) => s + p.commission, 0),
        bonus: payroll.reduce((s, p) => s + p.bonus, 0)
    }), [payroll])

    const handleApprove = () => {
        setPayroll(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Đã thanh toán' } : p))
        toast.success(`Đã duyệt ${selectedIds.length} bảng lương`)
        setSelectedIds([])
    }

    const handleExport = () => {
        const csv = ['Tên,Lương CB,Thực lãnh,Hoa hồng,Phụ cấp,Trạng thái']
        payroll.forEach(p => csv.push(`${p.name},${p.baseSalary},${p.actualSalary},${p.commission},${p.bonus},${p.status}`))
        const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'bang_luong.csv'; a.click()
        URL.revokeObjectURL(url)
        toast.success('Đã xuất bảng lương')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Nhân Viên & User — Bảng Lương</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý lương, chấm công và lịch làm việc</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất dữ liệu</button>
                </div>
            </div>

            {/* Sub-tabs matching reference site */}
            <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--color-border)', marginBottom: '20px' }}>
                {subTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer',
                            fontSize: '0.88rem', fontWeight: activeTab === tab.id ? '700' : '400',
                            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-light)',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                            marginBottom: '-2px', transition: 'all 0.2s'
                        }}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <select className="filter-select" value={department} onChange={e => setDepartment(e.target.value)}>
                    <option value="all">Tất cả phòng ban</option>
                    <option value="kythuat">Kỹ thuật viên</option>
                    <option value="bacsi">Bác sĩ</option>
                    <option value="letan">Lễ Tân</option>
                </select>
                <input type="month" className="filter-select" value={month} onChange={e => setMonth(e.target.value)} style={{ maxWidth: '160px' }} />
                <div className="search-box" style={{ flex: 1, maxWidth: '300px' }}>
                    <FiSearch className="search-icon" />
                    <input className="search-input" placeholder="Tìm nhân viên..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            {/* TAB: Payroll */}
            {activeTab === 'payroll' && (
                <>
                    <div className="stat-cards">
                        <div className="stat-card"><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#28a745' }}>{formatCurrency(totals.salary)}</div><div className="stat-card-label">Tổng thực lãnh</div></div></div>
                        <div className="stat-card"><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#1a73e8' }}>{formatCurrency(totals.commission)}</div><div className="stat-card-label">Tổng hoa hồng</div></div></div>
                        <div className="stat-card"><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#ff9800' }}>{formatCurrency(totals.bonus)}</div><div className="stat-card-label">Tổng phụ cấp</div></div></div>
                        <div className="stat-card"><div className="stat-card-info"><div className="stat-card-value">{payroll.length}</div><div className="stat-card-label">Nhân viên</div></div></div>
                    </div>

                    {selectedIds.length > 0 && (
                        <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem' }}>{selectedIds.length} đã chọn</span>
                            <button className="btn btn-primary" onClick={() => setConfirmOpen(true)}><FiCheck size={14} /> Duyệt lương</button>
                        </div>
                    )}

                    <div className="table-container">
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" checked={selectedIds.length === payroll.length} onChange={e => setSelectedIds(e.target.checked ? payroll.map(p => p.id) : [])} /></th>
                                        <th>Nhân viên</th><th>Lương thỏa thuận</th><th>Hoa hồng</th><th>Tổng phụ cấp</th><th>Chế tài</th><th>Tổng thu nhập tháng</th><th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(p => (
                                        <tr key={p.id}>
                                            <td><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={e => setSelectedIds(prev => e.target.checked ? [...prev, p.id] : prev.filter(x => x !== p.id))} /></td>
                                            <td><div><span style={{ fontWeight: '600' }}>{p.name}</span><br /><span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{p.role}</span></div></td>
                                            <td style={{ fontWeight: '600' }}>{formatCurrency(p.baseSalary)}</td>
                                            <td style={{ color: '#1a73e8' }}>{formatCurrency(p.commission)}</td>
                                            <td style={{ color: '#ff9800' }}>{formatCurrency(p.bonus)}</td>
                                            <td style={{ color: '#e53e3e' }}>{formatCurrency(p.deductions || 0)}</td>
                                            <td style={{ fontWeight: '700', color: '#28a745' }}>{formatCurrency(p.netSalary)}</td>
                                            <td><span className={`badge ${p.status === 'Đã thanh toán' ? 'badge-success' : p.status === 'Chờ duyệt' ? 'badge-warning' : p.status === 'Nghỉ việc' ? 'badge-danger' : 'badge-info'}`}>{p.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* TAB: Attendance History */}
            {activeTab === 'attendance' && (
                <div className="table-container">
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr><th>#</th><th>Nhân viên</th><th>Ngày</th><th>Giờ vào</th><th>Giờ ra</th><th>Số giờ</th><th>Trạng thái</th></tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((a, i) => (
                                    <tr key={a.id}>
                                        <td>{i + 1}</td>
                                        <td style={{ fontWeight: '600' }}>{a.name}</td>
                                        <td>{a.date}</td>
                                        <td>{a.checkIn}</td>
                                        <td>{a.checkOut}</td>
                                        <td style={{ fontWeight: '600' }}>{a.hours > 0 ? `${a.hours}h` : '—'}</td>
                                        <td>
                                            <span className={`badge ${a.status === 'Đúng giờ' ? 'badge-success' : a.status === 'Muộn' ? 'badge-warning' : a.status === 'Vắng' ? 'badge-danger' : 'badge-info'}`}>
                                                {a.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB: Schedule overview */}
            {activeTab === 'schedule' && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                    <FiCalendar size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
                    <p>Để xem lịch làm việc chi tiết, vui lòng truy cập mục <strong>"Lịch Làm Việc"</strong> trên thanh bên.</p>
                    <a href="/staff/schedule" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Đi tới Lịch Làm Việc →</a>
                </div>
            )}

            {confirmOpen && <ConfirmDialog isOpen={true} title="Duyệt lương?" message={`Duyệt lương cho ${selectedIds.length} nhân viên?`} onConfirm={() => { handleApprove(); setConfirmOpen(false) }} onCancel={() => setConfirmOpen(false)} />}
        </div>
    )
}
