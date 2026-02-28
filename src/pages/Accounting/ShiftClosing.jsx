import { useState } from 'react'
import { FiDollarSign, FiClock, FiCheck, FiLock, FiCreditCard, FiDownload, FiFilter } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialData = [
    {
        id: 1, shift: 'Ca sáng', date: '27-02-2026', staff: 'Phạm Thu Hà', openTime: '07:00', closeTime: '--:--', cashStart: 5000000, cashIn: 12500000, cashOut: 2000000, cashEnd: 15500000, status: 'Đang mở',
        payments: { tienMat: 6500000, chuyenKhoan: 3000000, pos: 2000000, khac: 1000000 }, orders: 8, returns: 1
    },
    {
        id: 2, shift: 'Ca chiều', date: '26-02-2026', staff: 'Đỗ Minh Tuấn', openTime: '14:00', closeTime: '21:00', cashStart: 5000000, cashIn: 18000000, cashOut: 3500000, cashEnd: 19500000, status: 'Đã chốt',
        payments: { tienMat: 8000000, chuyenKhoan: 5000000, pos: 3500000, khac: 1500000 }, orders: 12, returns: 0
    },
    {
        id: 3, shift: 'Ca sáng', date: '26-02-2026', staff: 'Phạm Thu Hà', openTime: '07:00', closeTime: '14:00', cashStart: 5000000, cashIn: 9800000, cashOut: 1500000, cashEnd: 13300000, status: 'Đã chốt',
        payments: { tienMat: 5800000, chuyenKhoan: 2000000, pos: 1500000, khac: 500000 }, orders: 6, returns: 0
    },
    {
        id: 4, shift: 'Ca chiều', date: '25-02-2026', staff: 'Đỗ Minh Tuấn', openTime: '14:00', closeTime: '21:00', cashStart: 5000000, cashIn: 22000000, cashOut: 5000000, cashEnd: 22000000, status: 'Đã chốt',
        payments: { tienMat: 10000000, chuyenKhoan: 6000000, pos: 4000000, khac: 2000000 }, orders: 15, returns: 2
    },
]

export default function ShiftClosing() {
    const toast = useToast()
    const [data, setData] = useState(initialData)
    const [closeId, setCloseId] = useState(null)
    const [showOpen, setShowOpen] = useState(false)
    const [expandedId, setExpandedId] = useState(null)
    const [newShift, setNewShift] = useState({ shift: 'Ca sáng', staff: '', cashStart: 5000000 })

    const handleClose = () => {
        setData(prev => prev.map(c => c.id === closeId ? { ...c, status: 'Đã chốt', closeTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) } : c))
        toast.success(`Đã chốt ${data.find(c => c.id === closeId)?.shift} - ${data.find(c => c.id === closeId)?.staff}`)
        setCloseId(null)
    }

    const handleOpenShift = () => {
        if (!newShift.staff) return toast.warning('Nhập tên nhân viên')
        const id = Math.max(...data.map(d => d.id)) + 1
        setData(prev => [{ id, ...newShift, date: '27-02-2026', openTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }), closeTime: '--:--', cashIn: 0, cashOut: 0, cashEnd: newShift.cashStart, status: 'Đang mở', payments: { tienMat: 0, chuyenKhoan: 0, pos: 0, khac: 0 }, orders: 0, returns: 0 }, ...prev])
        toast.success(`Đã mở ${newShift.shift} cho ${newShift.staff}`)
        setShowOpen(false); setNewShift({ shift: 'Ca sáng', staff: '', cashStart: 5000000 })
    }

    const totalCashIn = data.reduce((s, c) => s + c.cashIn, 0)
    const totalCashOut = data.reduce((s, c) => s + c.cashOut, 0)
    const openShifts = data.filter(c => c.status === 'Đang mở')
    const [branchFilter, setBranchFilter] = useState('CN_1834')
    const [dateRange, setDateRange] = useState('')
    const [staffFilter, setStaffFilter] = useState('all')
    const staffList = [...new Set(data.map(d => d.staff))]
    const totalPayments = {
        tienMat: data.reduce((s, c) => s + c.payments.tienMat, 0),
        chuyenKhoan: data.reduce((s, c) => s + c.payments.chuyenKhoan, 0),
        pos: data.reduce((s, c) => s + c.payments.pos, 0),
        khac: data.reduce((s, c) => s + c.payments.khac, 0)
    }
    const totalPaymentSum = Object.values(totalPayments).reduce((s, v) => s + v, 0)

    const handleExport = () => {
        const csv = 'Ca,Ngày,Nhân viên,Giờ mở,Giờ đóng,Tiền đầu ca,Thu,Chi,Tiền cuối ca,Trạng thái\n' + data.map(c =>
            `${c.shift},${c.date},${c.staff},${c.openTime},${c.closeTime},${c.cashStart},${c.cashIn},${c.cashOut},${c.cashEnd},${c.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'chot-ca.csv'; a.click()
        toast.success('Đã xuất file CSV')
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!closeId} title="Chốt ca?" message={`Xác nhận chốt ${data.find(c => c.id === closeId)?.shift} - ${data.find(c => c.id === closeId)?.staff}?`} onConfirm={handleClose} onCancel={() => setCloseId(null)} type="warning" />

            <div className="page-header">
                <div>
                    <h1 className="page-title">Chốt Ca</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý mở/đóng ca và kiểm soát tiền mặt</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất dữ liệu</button>
                    {openShifts.length > 0 && (
                        <button className="btn btn-danger" onClick={() => setCloseId(openShifts[0].id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', padding: '10px 20px', fontWeight: '700', animation: 'pulse 2s infinite' }}>
                            <FiLock size={16} /> Chốt ca hiện tại
                        </button>
                    )}
                    <button className="btn btn-primary" onClick={() => setShowOpen(true)}>+ Mở ca mới</button>
                </div>
            </div>

            <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(220,53,69,0.4)} 50%{box-shadow:0 0 0 8px rgba(220,53,69,0)} }`}</style>

            {/* Filters */}
            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <select className="filter-select" value={branchFilter} onChange={e => setBranchFilter(e.target.value)}>
                    <option value="CN_1834">CN_1834</option>
                    <option value="CN_1835">CN_1835</option>
                </select>
                <select className="filter-select" value={staffFilter} onChange={e => setStaffFilter(e.target.value)}>
                    <option value="all">Người chốt</option>
                    {staffList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="date" className="filter-select" value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ padding: '6px 10px' }} />
            </div>

            {/* Summary Cards */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Ca đang mở</div><div className="stat-value" style={{ color: '#ff9800' }}>{openShifts.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đã chốt</div><div className="stat-value" style={{ color: '#28a745' }}>{data.filter(c => c.status === 'Đã chốt').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiDollarSign color="#1a73e8" /></div><div><div className="stat-label">Tổng thu</div><div className="stat-value" style={{ color: '#28a745', fontSize: '1rem' }}>{formatCurrency(totalCashIn)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiDollarSign color="#dc3545" /></div><div><div className="stat-label">Tổng chi</div><div className="stat-value" style={{ color: '#dc3545', fontSize: '1rem' }}>{formatCurrency(totalCashOut)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiCreditCard color="#9c27b0" /></div><div><div className="stat-label">Còn lại</div><div className="stat-value" style={{ color: '#9c27b0', fontSize: '1rem' }}>{formatCurrency(totalCashIn - totalCashOut)}</div></div></div>
            </div>

            {/* Payment Method Chart */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiCreditCard size={14} color="var(--color-primary)" /> Phân bổ phương thức thanh toán</div>
                <div style={{ display: 'flex', height: '14px', borderRadius: '7px', overflow: 'hidden', marginBottom: '10px' }}>
                    {[{ label: 'Tiền mặt', value: totalPayments.tienMat, color: '#28a745' },
                    { label: 'Chuyển khoản', value: totalPayments.chuyenKhoan, color: '#1a73e8' },
                    { label: 'POS', value: totalPayments.pos, color: '#ff9800' },
                    { label: 'Khác', value: totalPayments.khac, color: '#6c757d' }
                    ].map(pm => (
                        <div key={pm.label} style={{ width: `${totalPaymentSum > 0 ? (pm.value / totalPaymentSum) * 100 : 25}%`, background: pm.color, transition: 'width 0.4s' }} title={`${pm.label}: ${formatCurrency(pm.value)}`} />
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {[{ label: 'Tiền mặt', value: totalPayments.tienMat, color: '#28a745' },
                    { label: 'Chuyển khoản', value: totalPayments.chuyenKhoan, color: '#1a73e8' },
                    { label: 'POS', value: totalPayments.pos, color: '#ff9800' },
                    { label: 'Khác', value: totalPayments.khac, color: '#6c757d' }
                    ].map(pm => (
                        <div key={pm.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: pm.color }} />
                            <span>{pm.label}</span>
                            <span style={{ fontWeight: 600, color: pm.color }}>{formatCurrency(pm.value)}</span>
                            <span style={{ color: 'var(--color-text-light)', fontSize: '0.68rem' }}>({totalPaymentSum > 0 ? Math.round((pm.value / totalPaymentSum) * 100) : 0}%)</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table with expandable rows */}
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th></th><th>Ca</th><th>Ngày</th><th>Nhân viên</th><th>Giờ mở</th><th>Giờ đóng</th>
                            <th>Tiền đầu ca</th><th>Thu</th><th>Chi</th><th>Tiền cuối ca</th><th>Trạng thái</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(c => (
                            <>
                                <tr key={c.id} style={{ background: c.status === 'Đang mở' ? '#fffbe6' : undefined, cursor: 'pointer' }}
                                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                                    <td style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{expandedId === c.id ? '▼' : '▶'}</td>
                                    <td style={{ fontWeight: 600 }}>{c.shift}</td>
                                    <td>{c.date}</td>
                                    <td>{c.staff}</td>
                                    <td>{c.openTime}</td>
                                    <td>{c.closeTime}</td>
                                    <td>{formatCurrency(c.cashStart)}</td>
                                    <td style={{ color: '#28a745', fontWeight: 600 }}>{formatCurrency(c.cashIn)}</td>
                                    <td style={{ color: '#dc3545' }}>{formatCurrency(c.cashOut)}</td>
                                    <td style={{ fontWeight: 700 }}>{formatCurrency(c.cashEnd)}</td>
                                    <td><span className={`badge badge-${c.status === 'Đã chốt' ? 'success' : 'warning'}`}>{c.status}</span></td>
                                    <td onClick={e => e.stopPropagation()}>
                                        {c.status === 'Đang mở' &&
                                            <button className="btn btn-sm btn-danger" onClick={() => setCloseId(c.id)} style={{ fontSize: '0.72rem' }}><FiLock size={12} /> Chốt</button>}
                                    </td>
                                </tr>
                                {expandedId === c.id && (
                                    <tr key={`${c.id}-detail`}>
                                        <td colSpan="12" style={{ background: '#f8f9fa', padding: '16px 32px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                                {/* Payment methods */}
                                                <div>
                                                    <h4 style={{ fontSize: '0.82rem', marginBottom: '10px', color: 'var(--color-primary)' }}>Hình thức thanh toán</h4>
                                                    {[
                                                        { label: 'Tiền mặt', value: c.payments.tienMat, color: '#28a745' },
                                                        { label: 'Chuyển khoản', value: c.payments.chuyenKhoan, color: '#1a73e8' },
                                                        { label: 'POS', value: c.payments.pos, color: '#ff9800' },
                                                        { label: 'Khác', value: c.payments.khac, color: '#6c757d' },
                                                    ].map((pm, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                                                            <span style={{ fontSize: '0.82rem' }}>{pm.label}</span>
                                                            <span style={{ fontWeight: '600', color: pm.color, fontSize: '0.82rem' }}>{formatCurrency(pm.value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Orders summary */}
                                                <div>
                                                    <h4 style={{ fontSize: '0.82rem', marginBottom: '10px', color: 'var(--color-primary)' }}>Đơn hàng</h4>
                                                    <div style={{ display: 'grid', gap: '8px' }}>
                                                        <div className="mobile-row" style={{ padding: '10px', background: '#e8f5e9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ fontSize: '0.82rem' }}>Số đơn</span>
                                                            <span style={{ fontWeight: '700', color: '#28a745' }}>{c.orders}</span>
                                                        </div>
                                                        <div className="mobile-row" style={{ padding: '10px', background: '#fff3e0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ fontSize: '0.82rem' }}>Trả hàng</span>
                                                            <span style={{ fontWeight: '700', color: '#ff9800' }}>{c.returns}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Balance check */}
                                                <div>
                                                    <h4 style={{ fontSize: '0.82rem', marginBottom: '10px', color: 'var(--color-primary)' }}>Kiểm tra tiền</h4>
                                                    <div style={{ display: 'grid', gap: '8px' }}>
                                                        {[
                                                            { label: 'Tiền đầu ca', value: c.cashStart },
                                                            { label: '+ Thu trong ca', value: c.cashIn, color: '#28a745' },
                                                            { label: '- Chi trong ca', value: c.cashOut, color: '#dc3545' },
                                                            { label: '= Tiền cuối ca', value: c.cashEnd, bold: true },
                                                        ].map((item, i) => (
                                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: i < 3 ? '1px solid #eee' : 'none' }}>
                                                                <span style={{ fontSize: '0.82rem', fontWeight: item.bold ? '700' : '400' }}>{item.label}</span>
                                                                <span style={{ fontWeight: item.bold ? '700' : '600', color: item.color || 'inherit', fontSize: '0.82rem' }}>{formatCurrency(item.value)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Open shift modal */}
            {showOpen && (
                <div className="modal-overlay" onClick={() => setShowOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>🕐 Mở ca mới</h2><button className="btn-close" onClick={() => setShowOpen(false)}>×</button></div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Ca làm việc</label>
                                <select value={newShift.shift} onChange={e => setNewShift(p => ({ ...p, shift: e.target.value }))} className="form-control">
                                    <option>Ca sáng</option><option>Ca chiều</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nhân viên trực *</label>
                                <input type="text" placeholder="Nhập tên nhân viên..." value={newShift.staff} onChange={e => setNewShift(p => ({ ...p, staff: e.target.value }))} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Tiền đầu ca</label>
                                <input type="number" value={newShift.cashStart} onChange={e => setNewShift(p => ({ ...p, cashStart: Number(e.target.value) }))} className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowOpen(false)}>Hủy</button>
                            <button className="btn btn-primary" onClick={handleOpenShift}>Mở ca</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
