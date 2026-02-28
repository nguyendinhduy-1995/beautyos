import { useState, useMemo } from 'react'
import { FiSearch, FiDownload, FiCreditCard, FiDollarSign, FiClock, FiCalendar } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'

const initialHistory = [
    { id: 1, cardId: 'TTV001', cardType: 'VIP Gold', customer: 'Vũ Ngọc', phone: '0100018552', action: 'Thanh toán DV', amount: -2500000, service: 'Chăm sóc da', staff: 'Thu Hà', date: '27/02/2026 14:30', balanceBefore: 30000000, balanceAfter: 27500000 },
    { id: 2, cardId: 'TTV003', cardType: 'Platinum', customer: 'Nguyễn Tú Thảo', phone: '0100018554', action: 'Thanh toán DV', amount: -5000000, service: 'Botox', staff: 'Minh Anh', date: '27/02/2026 11:15', balanceBefore: 65000000, balanceAfter: 60000000 },
    { id: 3, cardId: 'TTV005', cardType: 'Member', customer: 'Phan Thị Kim Hồng', phone: '0100018555', action: 'Nạp tiền', amount: 5000000, service: '-', staff: 'Admin', date: '26/02/2026 16:00', balanceBefore: 6000000, balanceAfter: 11000000 },
    { id: 4, cardId: 'TTV002', cardType: 'Silver', customer: 'Phan Thị Ngân', phone: '0100018553', action: 'Thanh toán DV', amount: -1500000, service: 'Massage body', staff: 'Thanh Tùng', date: '26/02/2026 10:45', balanceBefore: 12000000, balanceAfter: 10500000 },
    { id: 5, cardId: 'TTV001', cardType: 'VIP Gold', customer: 'Vũ Ngọc', phone: '0100018552', action: 'Thanh toán DV', amount: -3000000, service: 'Triệt lông', staff: 'Phương Linh', date: '25/02/2026 09:30', balanceBefore: 33000000, balanceAfter: 30000000 },
    { id: 6, cardId: 'TTV006', cardType: 'VIP Gold', customer: 'Kim Trang', phone: '0100018557', action: 'Nạp tiền', amount: 20000000, service: '-', staff: 'Admin', date: '25/02/2026 08:00', balanceBefore: 18000000, balanceAfter: 38000000 },
    { id: 7, cardId: 'TTV003', cardType: 'Platinum', customer: 'Nguyễn Tú Thảo', phone: '0100018554', action: 'Hoàn tiền', amount: 1000000, service: 'Trị thâm (huỷ)', staff: 'Admin', date: '24/02/2026 15:20', balanceBefore: 64000000, balanceAfter: 65000000 },
    { id: 8, cardId: 'TTV004', cardType: 'Gold', customer: 'Hà Trọng Tú', phone: '0100018556', action: 'Thanh toán DV', amount: -4500000, service: 'Filler', staff: 'Thu Hà', date: '24/02/2026 13:00', balanceBefore: 4500000, balanceAfter: 0 },
]

export default function CardHistory() {
    const [search, setSearch] = useState('')
    const [actionFilter, setActionFilter] = useState('')
    const [dateFrom, setDateFrom] = useState('')

    const filtered = useMemo(() => initialHistory.filter(h => {
        const q = search.toLowerCase()
        const matchSearch = !search || h.customer.toLowerCase().includes(q) || h.cardId.toLowerCase().includes(q) || h.phone.includes(q)
        const matchAction = !actionFilter || h.action === actionFilter
        return matchSearch && matchAction
    }), [search, actionFilter])

    const totalDebit = initialHistory.filter(h => h.amount < 0).reduce((s, h) => s + Math.abs(h.amount), 0)
    const totalCredit = initialHistory.filter(h => h.amount > 0).reduce((s, h) => s + h.amount, 0)

    const handleExport = () => {
        const csv = 'Mã thẻ,Loại,KH,Thao tác,Số tiền,DV,NV,Ngày\n' + filtered.map(h => `${h.cardId},${h.cardType},${h.customer},${h.action},${h.amount},${h.service},${h.staff},${h.date}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lich-su-card.csv'; a.click()
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Lịch Sử Card</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Theo dõi tất cả giao dịch thẻ</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất CSV</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiClock color="#1a73e8" /></div><div><div className="stat-label">Tổng giao dịch</div><div className="stat-value">{initialHistory.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiDollarSign color="#dc3545" /></div><div><div className="stat-label">Tổng chi</div><div className="stat-value" style={{ color: '#dc3545', fontSize: '1rem' }}>{formatCurrency(totalDebit)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiDollarSign color="#28a745" /></div><div><div className="stat-label">Tổng nạp/hoàn</div><div className="stat-value" style={{ color: '#28a745', fontSize: '1rem' }}>{formatCurrency(totalCredit)}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '300px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã thẻ, tên KH..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="Thanh toán DV">Thanh toán DV</option><option value="Nạp tiền">Nạp tiền</option><option value="Hoàn tiền">Hoàn tiền</option>
                </select>
                <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="filter-select" style={{ maxWidth: '160px' }} />
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã thẻ</th><th>Loại</th><th>Khách hàng</th><th>Thao tác</th><th>Dịch vụ</th><th>Số tiền</th><th>Trước GD</th><th>Sau GD</th><th>NV</th><th>Thời gian</th></tr></thead>
                    <tbody>
                        {filtered.map(h => (
                            <tr key={h.id} style={{ background: h.amount > 0 ? '#f0fff4' : 'transparent' }}>
                                <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{h.cardId}</td>
                                <td><span className="badge badge-info">{h.cardType}</span></td>
                                <td style={{ fontWeight: '500' }}>{h.customer}</td>
                                <td><span className={`badge badge-${h.action === 'Nạp tiền' ? 'success' : h.action === 'Hoàn tiền' ? 'warning' : 'danger'}`}>{h.action}</span></td>
                                <td style={{ fontSize: '0.85rem' }}>{h.service}</td>
                                <td style={{ fontWeight: '700', color: h.amount > 0 ? '#28a745' : '#dc3545' }}>{h.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(h.amount))}</td>
                                <td style={{ fontSize: '0.85rem' }}>{formatCurrency(h.balanceBefore)}</td>
                                <td style={{ fontSize: '0.85rem', fontWeight: '600' }}>{formatCurrency(h.balanceAfter)}</td>
                                <td>{h.staff}</td>
                                <td style={{ fontSize: '0.8rem' }}><FiCalendar size={11} style={{ marginRight: 3 }} />{h.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
