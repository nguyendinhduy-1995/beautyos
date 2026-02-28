import { useState, useMemo } from 'react'
import { FiSearch, FiDollarSign, FiTrendingUp, FiTrendingDown, FiCalendar, FiLock, FiPlus, FiX } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialEntries = [
    { id: 1, type: 'income', category: 'Doanh thu dịch vụ', amount: 5200000, date: '27/02/2026', note: 'Thu từ dịch vụ chăm sóc da', staff: 'Nguyễn Văn A' },
    { id: 2, type: 'income', category: 'Bán sản phẩm', amount: 1800000, date: '27/02/2026', note: 'Bán mỹ phẩm', staff: 'Trần Thị B' },
    { id: 3, type: 'expense', category: 'Tiền điện', amount: 3500000, date: '27/02/2026', note: 'Thanh toán tiền điện tháng 2', staff: 'Admin' },
    { id: 4, type: 'income', category: 'Doanh thu dịch vụ', amount: 8500000, date: '26/02/2026', note: 'Thu từ Filler, Botox', staff: 'Lê Văn C' },
    { id: 5, type: 'expense', category: 'Lương NV', amount: 15000000, date: '25/02/2026', note: 'Tạm ứng lương kỳ 1', staff: 'Admin' },
    { id: 6, type: 'income', category: 'Thẻ trả trước', amount: 10000000, date: '25/02/2026', note: 'KH nạp thẻ', staff: 'Phạm Thị D' },
    { id: 7, type: 'expense', category: 'Vật tư', amount: 2200000, date: '24/02/2026', note: 'Mua vật tư y tế', staff: 'Trần Thị B' },
]

export default function CashBook() {
    const [data, setData] = useState(initialEntries)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [closed, setClosed] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(e => {
        const ms = !search || e.category.toLowerCase().includes(search.toLowerCase()) || e.note.toLowerCase().includes(search.toLowerCase())
        const mt = !typeFilter || e.type === typeFilter
        return ms && mt
    }), [data, search, typeFilter])

    const income = data.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0)
    const expense = data.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0)
    const balance = income - expense

    const handleClose = () => { setClosed(true); toast.success('Đã chốt sổ quỹ') }

    const handleCreate = () => {
        const cat = document.getElementById('cb-cat')?.value?.trim()
        const amount = parseInt(document.getElementById('cb-amount')?.value) || 0
        const type = document.getElementById('cb-type')?.value || 'income'
        if (!cat || !amount) return toast.warning('Nhập đủ thông tin')
        setData(prev => [...prev, { id: Date.now(), type, category: cat, amount, date: '27/02/2026', note: '', staff: 'Admin' }])
        setShowModal(false); toast.success('Đã thêm')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Sổ Quỹ & Chốt Sổ</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý thu chi và chốt sổ hàng ngày</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Thêm</button>
                    <button className="btn btn-secondary" onClick={handleClose} disabled={closed} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiLock size={14} /> {closed ? 'Đã chốt' : 'Chốt sổ'}</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #28a745' }}><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiTrendingUp color="#28a745" /></div><div><div className="stat-label">Tổng thu</div><div className="stat-value" style={{ color: '#28a745' }}>{formatCurrency(income)}</div></div></div>
                <div className="stat-card" style={{ borderLeft: '4px solid #dc3545' }}><div className="stat-icon" style={{ background: '#ffebee' }}><FiTrendingDown color="#dc3545" /></div><div><div className="stat-label">Tổng chi</div><div className="stat-value" style={{ color: '#dc3545' }}>{formatCurrency(expense)}</div></div></div>
                <div className="stat-card" style={{ borderLeft: '4px solid #1a73e8' }}><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiDollarSign color="#1a73e8" /></div><div><div className="stat-label">Số dư</div><div className="stat-value" style={{ color: balance >= 0 ? '#28a745' : '#dc3545' }}>{formatCurrency(balance)}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}><option value="">Tất cả</option><option value="income">Thu</option><option value="expense">Chi</option></select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>Loại</th><th>Danh mục</th><th>Số tiền</th><th>Ngày</th><th>Ghi chú</th><th>NV</th></tr></thead>
                    <tbody>
                        {filtered.map((e, i) => (
                            <tr key={e.id}>
                                <td>{i + 1}</td>
                                <td>{e.type === 'income' ? <span style={{ color: '#28a745', fontWeight: '600' }}>↑ Thu</span> : <span style={{ color: '#dc3545', fontWeight: '600' }}>↓ Chi</span>}</td>
                                <td style={{ fontWeight: '500' }}>{e.category}</td>
                                <td style={{ fontWeight: '700', color: e.type === 'income' ? '#28a745' : '#dc3545' }}>{formatCurrency(e.amount)}</td>
                                <td>{e.date}</td>
                                <td style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{e.note}</td>
                                <td>{e.staff}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>Thêm Thu/Chi</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Loại</label><select id="cb-type" className="form-control"><option value="income">Thu</option><option value="expense">Chi</option></select></div>
                            <div className="form-group"><label>Danh mục *</label><input id="cb-cat" className="form-control" placeholder="VD: Dịch vụ" /></div>
                            <div className="form-group"><label>Số tiền *</label><input id="cb-amount" type="number" className="form-control" placeholder="1000000" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Thêm</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
