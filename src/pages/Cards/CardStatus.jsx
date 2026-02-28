import { useState, useMemo } from 'react'
import { FiSearch, FiCreditCard, FiDollarSign, FiTrendingUp, FiAlertCircle } from 'react-icons/fi'
import { prepaidCards as initialCards, formatCurrency } from '../../data/mockData'

export default function CardStatus() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const data = initialCards

    const filtered = useMemo(() => data.filter(c => {
        const q = search.toLowerCase()
        const matchSearch = !search || c.customerName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.phone.includes(q)
        const matchStatus = !statusFilter || c.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const totalValue = data.reduce((s, c) => s + c.totalValue, 0)
    const totalUsed = data.reduce((s, c) => s + c.usedValue, 0)
    const totalRemaining = data.reduce((s, c) => s + c.remaining, 0)
    const active = data.filter(c => c.status === 'active').length
    const expired = data.filter(c => c.status === 'expired').length
    const avgUsageRate = data.length > 0 ? Math.round(data.reduce((s, c) => s + (c.usedValue / c.totalValue) * 100, 0) / data.length) : 0

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Tình Trạng Thẻ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Tổng quan tình trạng sử dụng thẻ trả trước</p>
                </div>
            </div>

            {/* Financial overview */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCreditCard color="#1a73e8" /></div><div><div className="stat-label">Tổng số thẻ</div><div className="stat-value">{data.length}</div><div style={{ fontSize: '0.75rem', color: '#28a745' }}>{active} hoạt động · {expired} hết hạn</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiDollarSign color="#28a745" /></div><div><div className="stat-label">Tổng giá trị</div><div className="stat-value" style={{ color: '#28a745', fontSize: '1rem' }}>{formatCurrency(totalValue)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiTrendingUp color="#ff9800" /></div><div><div className="stat-label">Đã sử dụng</div><div className="stat-value" style={{ color: '#ff9800', fontSize: '1rem' }}>{formatCurrency(totalUsed)}</div><div style={{ fontSize: '0.75rem', color: '#999' }}>Tỷ lệ: {avgUsageRate}%</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiDollarSign color="#1a73e8" /></div><div><div className="stat-label">Còn lại</div><div className="stat-value" style={{ color: '#1a73e8', fontSize: '1rem' }}>{formatCurrency(totalRemaining)}</div></div></div>
            </div>

            {/* Usage chart visual */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '16px' }}>Phân bổ sử dụng thẻ</h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '120px' }}>
                    {data.map((c, i) => {
                        const pct = Math.round((c.usedValue / c.totalValue) * 100)
                        return (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '0.7rem', color: pct > 80 ? '#dc3545' : '#28a745', fontWeight: '600' }}>{pct}%</span>
                                <div style={{ width: '100%', background: '#f0f0f0', borderRadius: '4px', position: 'relative', height: '80px' }}>
                                    <div style={{
                                        position: 'absolute', bottom: 0, width: '100%', borderRadius: '4px',
                                        height: `${pct}%`, background: pct > 80 ? '#dc3545' : pct > 50 ? '#ff9800' : '#28a745',
                                        transition: 'height 0.5s'
                                    }} />
                                </div>
                                <span style={{ fontSize: '0.65rem', color: '#999', textAlign: 'center' }}>{c.id}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã thẻ, tên KH..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="active">Hoạt động</option><option value="expired">Hết hạn</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã thẻ</th><th>Khách hàng</th><th>SĐT</th><th>Loại</th><th>Giá trị</th><th>Đã dùng</th><th>Còn lại</th><th>Tỷ lệ dùng</th><th>Trạng thái</th></tr></thead>
                    <tbody>
                        {filtered.map(c => {
                            const pct = Math.round((c.usedValue / c.totalValue) * 100)
                            return (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{c.id}</td>
                                    <td style={{ fontWeight: '500' }}>{c.customerName}</td>
                                    <td>{c.phone}</td>
                                    <td><span className="badge badge-info">{c.cardType}</span></td>
                                    <td>{formatCurrency(c.totalValue)}</td>
                                    <td style={{ color: '#ff9800' }}>{formatCurrency(c.usedValue)}</td>
                                    <td style={{ fontWeight: 600, color: c.remaining > 0 ? '#28a745' : '#dc3545' }}>{formatCurrency(c.remaining)}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '80px', height: '6px', background: '#eee', borderRadius: '3px' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: pct > 80 ? '#dc3545' : pct > 50 ? '#ff9800' : '#28a745', borderRadius: '3px' }} />
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{pct}%</span>
                                        </div>
                                    </td>
                                    <td><span className={`badge badge-${c.status === 'active' ? 'success' : 'danger'}`}>{c.status === 'active' ? 'Hoạt động' : 'Hết hạn'}</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
