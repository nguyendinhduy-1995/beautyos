import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiCreditCard, FiDollarSign, FiUsers, FiDownload, FiPieChart, FiAlertTriangle } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialCards = [
    { id: 'TTV001', name: 'Thẻ VIP Gold', type: 'VIP', holder: 'Vũ Ngọc', phone: '0100018552', value: 50000000, used: 20000000, issueDate: '01/01/2026', expiry: '01/01/2027', status: 'active' },
    { id: 'TTV002', name: 'Thẻ Silver', type: 'Silver', holder: 'Phan Thị Ngân', phone: '0100018553', value: 20000000, used: 8000000, issueDate: '15/01/2026', expiry: '15/01/2027', status: 'active' },
    { id: 'TTV003', name: 'Thẻ VIP Platinum', type: 'Platinum', holder: 'Nguyễn Tú Thảo', phone: '0100018554', value: 100000000, used: 35000000, issueDate: '10/12/2025', expiry: '10/12/2026', status: 'active' },
    { id: 'TTV004', name: 'Thẻ Gold', type: 'Gold', holder: 'Hà Trọng Tú', phone: '0100018556', value: 30000000, used: 30000000, issueDate: '01/06/2025', expiry: '01/06/2026', status: 'expired' },
    { id: 'TTV005', name: 'Thẻ Member', type: 'Member', holder: 'Phan Thị Kim Hồng', phone: '0100018555', value: 10000000, used: 4000000, issueDate: '20/02/2026', expiry: '20/02/2027', status: 'active' },
    { id: 'TTV006', name: 'Thẻ VIP Gold', type: 'VIP', holder: 'Kim Trang', phone: '0100018557', value: 50000000, used: 12000000, issueDate: '05/01/2026', expiry: '05/01/2027', status: 'active' },
    { id: 'TTV007', name: 'Thẻ Silver', type: 'Silver', holder: 'Lê Thị Hoa', phone: '0100018558', value: 20000000, used: 20000000, issueDate: '01/09/2025', expiry: '01/09/2026', status: 'expired' },
    { id: 'TTV008', name: 'Thẻ Member', type: 'Member', holder: 'Trần Văn Minh', phone: '0100018559', value: 10000000, used: 2500000, issueDate: '28/02/2026', expiry: '28/02/2027', status: 'active' },
]

export default function CardList() {
    const [cards, setCards] = useState(initialCards)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => cards.filter(c => {
        const q = search.toLowerCase()
        const matchSearch = !search || c.holder.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.phone.includes(q)
        const matchType = !typeFilter || c.type === typeFilter
        const matchStatus = !statusFilter || c.status === statusFilter
        return matchSearch && matchType && matchStatus
    }), [cards, search, typeFilter, statusFilter])

    const totalValue = cards.reduce((s, c) => s + c.value, 0)
    const totalUsed = cards.reduce((s, c) => s + c.used, 0)
    const active = cards.filter(c => c.status === 'active').length

    const handleCreate = () => {
        toast.success('Đã tạo thẻ mới')
        setShowModal(false)
    }

    const typeColors = { VIP: '#dc3545', Platinum: '#6f42c1', Gold: '#ff9800', Silver: '#6c757d', Member: '#28a745' }

    const handleExport = () => {
        const csv = 'Mã thẻ,Loại,Chủ thẻ,SĐT,Giá trị,Đã dùng,Còn lại,Ngày PH,Hết hạn,Trạng thái\n' + filtered.map(c => `${c.id},${c.type},${c.holder},${c.phone},${c.value},${c.used},${c.value - c.used},${c.issueDate},${c.expiry},${c.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'danh-sach-the.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    // Type distribution
    const typeMap = {}
    cards.forEach(c => { typeMap[c.type] = (typeMap[c.type] || 0) + 1 })
    const typeEntries = Object.entries(typeMap).sort((a, b) => b[1] - a[1])
    const maxType = typeEntries[0]?.[1] || 1

    // Usage rate
    const usageRate = totalValue > 0 ? Math.round((totalUsed / totalValue) * 100) : 0

    // Expiring soon (parse dd/mm/yyyy and check within 30 days)
    const today = new Date()
    const parseDate = (d) => { const p = d.split('/'); return new Date(p[2], p[1] - 1, p[0]) }
    const expiringSoon = cards.filter(c => { const d = parseDate(c.expiry); const diff = (d - today) / 86400000; return diff >= 0 && diff <= 30 && c.status === 'active' })

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Danh Sách Thẻ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý tất cả thẻ thành viên</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo Thẻ</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCreditCard color="#1a73e8" /></div><div><div className="stat-label">Tổng thẻ</div><div className="stat-value">{cards.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiUsers color="#28a745" /></div><div><div className="stat-label">Đang hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{active}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiDollarSign color="#1a73e8" /></div><div><div className="stat-label">Tổng giá trị</div><div className="stat-value" style={{ fontSize: '1rem' }}>{formatCurrency(totalValue)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiDollarSign color="#ff9800" /></div><div><div className="stat-label">Đã sử dụng</div><div className="stat-value" style={{ fontSize: '1rem', color: '#ff9800' }}>{formatCurrency(totalUsed)}</div></div></div>
            </div>

            {/* Analytics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Type Distribution */}
                <div className="stat-card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <FiPieChart size={16} color="#1a73e8" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Phân bố loại thẻ</span>
                    </div>
                    {typeEntries.map(([type, cnt]) => (
                        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.8rem', minWidth: '70px', color: typeColors[type], fontWeight: '600' }}>{type}</span>
                            <div style={{ flex: 1, height: '14px', background: '#f0f0f0', borderRadius: '7px', overflow: 'hidden' }}>
                                <div style={{ width: `${(cnt / maxType) * 100}%`, height: '100%', background: typeColors[type], borderRadius: '7px', transition: 'width 0.5s' }} />
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '0.85rem', minWidth: '30px', textAlign: 'right' }}>{cnt}</span>
                        </div>
                    ))}
                    <div className="mobile-row" style={{ marginTop: '12px', padding: '8px 12px', background: '#f0f4ff', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Tỷ lệ sử dụng tổng</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '80px', height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${usageRate}%`, height: '100%', background: usageRate > 80 ? '#f44336' : usageRate > 50 ? '#ff9800' : '#4caf50', borderRadius: '3px' }} />
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '0.85rem', color: usageRate > 80 ? '#f44336' : '#333' }}>{usageRate}%</span>
                        </div>
                    </div>
                </div>

                {/* Expiring Soon */}
                <div className="stat-card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <FiAlertTriangle size={16} color={expiringSoon.length > 0 ? '#f44336' : '#4caf50'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Thẻ sắp hết hạn (30 ngày)</span>
                    </div>
                    {expiringSoon.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#4caf50', fontSize: '0.85rem' }}>✅ Không có thẻ nào sắp hết hạn</div>
                    ) : expiringSoon.map(c => (
                        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{c.holder}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{c.name} · {c.id}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.78rem', color: '#f44336', fontWeight: '600' }}>{c.expiry}</span>
                                <div style={{ fontSize: '0.72rem', color: '#999' }}>Còn lại: {formatCurrency(c.value - c.used)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '300px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã, tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="">Tất cả loại</option><option value="Platinum">Platinum</option><option value="VIP">VIP</option><option value="Gold">Gold</option><option value="Silver">Silver</option><option value="Member">Member</option>
                </select>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả TT</option><option value="active">Hoạt động</option><option value="expired">Hết hạn</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã thẻ</th><th>Loại</th><th>Chủ thẻ</th><th>SĐT</th><th>Giá trị</th><th>Đã dùng</th><th>Còn lại</th><th>Ngày phát hành</th><th>Hết hạn</th><th>Trạng thái</th></tr></thead>
                    <tbody>
                        {filtered.map(c => {
                            const remaining = c.value - c.used
                            const pct = Math.round((c.used / c.value) * 100)
                            return (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{c.id}</td>
                                    <td><span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', color: '#fff', background: typeColors[c.type] }}>{c.type}</span></td>
                                    <td style={{ fontWeight: '500' }}>{c.holder}</td>
                                    <td>{c.phone}</td>
                                    <td>{formatCurrency(c.value)}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>{formatCurrency(c.used)}</span>
                                            <div style={{ width: '50px', height: '4px', background: '#eee', borderRadius: '2px' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: pct > 80 ? '#dc3545' : '#28a745', borderRadius: '2px' }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 600, color: remaining > 0 ? '#28a745' : '#dc3545' }}>{formatCurrency(remaining)}</td>
                                    <td style={{ fontSize: '0.85rem' }}>{c.issueDate}</td>
                                    <td style={{ fontSize: '0.85rem' }}>{c.expiry}</td>
                                    <td><span className={`badge badge-${c.status === 'active' ? 'success' : 'danger'}`}>{c.status === 'active' ? 'Hoạt động' : 'Hết hạn'}</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>Tạo Thẻ Mới</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Loại thẻ</label><select className="form-control"><option>VIP</option><option>Platinum</option><option>Gold</option><option>Silver</option><option>Member</option></select></div>
                            <div className="form-group"><label>Khách hàng</label><input className="form-control" placeholder="Tên khách hàng" /></div>
                            <div className="form-group"><label>SĐT</label><input className="form-control" placeholder="Số điện thoại" /></div>
                            <div className="form-group"><label>Giá trị thẻ</label><input className="form-control" type="number" placeholder="VD: 50000000" /></div>
                            <div className="form-group"><label>Ngày hết hạn</label><input className="form-control" type="date" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
