import { useState, useMemo } from 'react'
import { FiDollarSign, FiAlertCircle, FiSearch, FiX, FiDownload, FiClock, FiTrendingDown, FiCheck } from 'react-icons/fi'
import { supplierDebts as initialDebts, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function SupplierDebt() {
    const toast = useToast()
    const [data, setData] = useState(initialDebts)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [payId, setPayId] = useState(null)
    const [payAmount, setPayAmount] = useState(0)
    const [activeTab, setActiveTab] = useState('table')

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(d => d.supplier.toLowerCase().includes(q)) }
        if (statusFilter !== 'all') r = r.filter(d => d.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    const totalDebt = data.reduce((s, d) => s + d.totalDebt, 0)
    const totalPaid = data.reduce((s, d) => s + d.paid, 0)
    const totalRemaining = data.reduce((s, d) => s + d.remaining, 0)
    const overdue = data.filter(d => d.status === 'Quá hạn')
    const paidPct = totalDebt > 0 ? Math.round((totalPaid / totalDebt) * 100) : 0

    const handlePay = () => {
        if (!payAmount || payAmount <= 0) return
        const item = data.find(d => d.id === payId)
        if (payAmount > item.remaining) { toast.error('Số tiền vượt quá công nợ còn lại'); return }
        setData(prev => prev.map(d => {
            if (d.id !== payId) return d
            const newPaid = d.paid + payAmount
            const newRemaining = d.remaining - payAmount
            return { ...d, paid: newPaid, remaining: newRemaining, status: newRemaining <= 0 ? 'Đã thanh toán' : d.status }
        }))
        toast.success(`Đã thanh toán ${formatCurrency(payAmount)} cho ${item.supplier}`)
        setPayId(null); setPayAmount(0)
    }

    const handleExport = () => {
        const csv = ['Nhà cung cấp,Tổng nợ,Đã TT,Còn lại,Hạn TT,Trạng thái', ...data.map(d => `${d.supplier},${d.totalDebt},${d.paid},${d.remaining},${d.dueDate},${d.status}`)].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'cong_no_ncc.csv'; link.click()
        toast.success('Đã xuất file CSV')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Công Nợ Nhà Cung Cấp</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Theo dõi, phân tích & thanh toán công nợ</p></div>
                <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất CSV</button>
            </div>

            {/* Enhanced Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #1a73e8' }}><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiDollarSign color="#1a73e8" /></div><div><div className="stat-label">Tổng công nợ</div><div className="stat-value" style={{ fontSize: '0.95rem' }}>{formatCurrency(totalDebt)}</div></div></div>
                <div className="stat-card" style={{ borderLeft: '4px solid #28a745' }}><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đã thanh toán</div><div className="stat-value" style={{ fontSize: '0.95rem', color: '#28a745' }}>{formatCurrency(totalPaid)}</div></div></div>
                <div className="stat-card" style={{ borderLeft: '4px solid #dc3545' }}><div className="stat-icon" style={{ background: '#ffebee' }}><FiTrendingDown color="#dc3545" /></div><div><div className="stat-label">Còn lại</div><div className="stat-value" style={{ fontSize: '0.95rem', color: '#dc3545' }}>{formatCurrency(totalRemaining)}</div></div></div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ff9800' }}><div className="stat-icon" style={{ background: '#fff3e0' }}><FiAlertCircle color="#ff9800" /></div><div><div className="stat-label">Quá hạn</div><div className="stat-value" style={{ color: '#ff9800' }}>{overdue.length}</div></div></div>
                <div className="stat-card" style={{ borderLeft: '4px solid #9c27b0' }}><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiClock color="#9c27b0" /></div><div><div className="stat-label">Tỷ lệ TT</div><div className="stat-value" style={{ color: '#9c27b0' }}>{paidPct}%</div></div></div>
            </div>

            {/* Payment progress overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                        <span style={{ fontWeight: '600' }}>Tiến độ thanh toán tổng</span>
                        <span style={{ color: '#28a745', fontWeight: '600' }}>{paidPct}% hoàn thành</span>
                    </div>
                    <div style={{ height: '10px', background: '#e9ecef', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${paidPct}%`, height: '100%', borderRadius: '5px', background: 'linear-gradient(90deg, #28a745, #20c997)', transition: 'width 0.5s' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                        <span>Đã TT: {formatCurrency(totalPaid)}</span>
                        <span>Còn lại: {formatCurrency(totalRemaining)}</span>
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiTrendingDown size={14} color="#dc3545" /> Phân bố công nợ theo NCC</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {data.sort((a, b) => b.remaining - a.remaining).slice(0, 4).map((d, i) => {
                            const colors = ['#dc3545', '#ff9800', '#1a73e8', '#9c27b0']
                            return (
                                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '90px', fontSize: '0.75rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.supplier}</span>
                                    <div style={{ flex: 1, height: '7px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${totalRemaining > 0 ? (d.remaining / totalRemaining) * 100 : 0}%`, height: '100%', borderRadius: '4px', background: colors[i], transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 600, minWidth: '65px', textAlign: 'right', color: colors[i] }}>{formatCurrency(d.remaining)}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Overdue warning */}
            {overdue.length > 0 && (
                <div style={{ background: '#fff3e0', border: '1px solid #ffcc80', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiAlertCircle color="#e65100" size={18} />
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#e65100' }}>⚠️ {overdue.length} nhà cung cấp quá hạn thanh toán</div>
                        <div style={{ fontSize: '0.78rem', color: '#bf360c' }}>{overdue.map(o => o.supplier).join(', ')} — Tổng: {formatCurrency(overdue.reduce((s, o) => s + o.remaining, 0))}</div>
                    </div>
                </div>
            )}

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm nhà cung cấp..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option><option value="Chưa thanh toán">Chưa TT</option><option value="Quá hạn">Quá hạn</option><option value="Đã thanh toán">Đã TT</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>Nhà Cung Cấp</th><th>Tổng nợ</th><th>Đã TT</th><th>Còn lại</th><th>Tiến độ</th><th>Hạn TT</th><th>Trạng thái</th><th></th></tr></thead>
                    <tbody>
                        {filtered.map((d, i) => {
                            const pct = d.totalDebt > 0 ? Math.round((d.paid / d.totalDebt) * 100) : 0
                            const isOverdue = d.status === 'Quá hạn'
                            return (
                                <tr key={d.id} style={{ background: isOverdue ? '#fff8e1' : d.status === 'Đã thanh toán' ? '#f1f8e9' : undefined }}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{d.supplier}</div>
                                        {isOverdue && <span style={{ fontSize: '0.68rem', color: '#e65100', fontWeight: '500' }}>⚠ QUÁ HẠN</span>}
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{formatCurrency(d.totalDebt)}</td>
                                    <td style={{ color: '#28a745' }}>{formatCurrency(d.paid)}</td>
                                    <td style={{ color: d.remaining > 0 ? '#dc3545' : '#28a745', fontWeight: '600' }}>{formatCurrency(d.remaining)}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '70px', height: '6px', background: '#e9ecef', borderRadius: '3px' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? '#28a745' : isOverdue ? '#ff9800' : 'var(--color-primary)', borderRadius: '3px', transition: 'width 0.5s' }} />
                                            </div>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', minWidth: '30px' }}>{pct}%</span>
                                        </div>
                                    </td>
                                    <td style={{ color: isOverdue ? '#e65100' : undefined, fontWeight: isOverdue ? '600' : '400' }}>{d.dueDate}</td>
                                    <td><span className={`badge badge-${d.status === 'Đã thanh toán' ? 'success' : d.status === 'Quá hạn' ? 'danger' : 'warning'}`}>{d.status}</span></td>
                                    <td>
                                        {d.remaining > 0 ? (
                                            <button className="btn btn-sm btn-primary" onClick={() => { setPayId(d.id); setPayAmount(0) }}><FiDollarSign size={12} /> Thanh toán</button>
                                        ) : <span style={{ fontSize: '0.85rem', color: '#28a745' }}>✓ Hoàn tất</span>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pay modal */}
            {payId && (
                <div className="modal-overlay" onClick={() => setPayId(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>💳 Thanh toán công nợ</h2><button className="btn-close" onClick={() => setPayId(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '16px' }}>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{data.find(d => d.id === payId)?.supplier}</div>
                                <div style={{ fontSize: '0.82rem', color: '#dc3545', marginTop: '4px' }}>Còn nợ: {formatCurrency(data.find(d => d.id === payId)?.remaining || 0)}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                {[1000000, 5000000, 10000000].map(v => (
                                    <button key={v} onClick={() => setPayAmount(v)}
                                        className={`btn btn-sm ${payAmount === v ? 'btn-primary' : 'btn-secondary'}`}>
                                        {formatCurrency(v)}
                                    </button>
                                ))}
                                <button onClick={() => setPayAmount(data.find(d => d.id === payId)?.remaining || 0)}
                                    className="btn btn-sm" style={{ background: '#e8f5e9', color: '#28a745', border: '1px solid #28a745' }}>
                                    Tất toán
                                </button>
                            </div>
                            <div className="form-group"><label>Số tiền thanh toán</label><input type="number" className="form-control" value={payAmount} onChange={e => setPayAmount(Number(e.target.value))} placeholder="Nhập số tiền" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setPayId(null)}>Hủy</button><button className="btn btn-primary" onClick={handlePay}>Thanh toán</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
