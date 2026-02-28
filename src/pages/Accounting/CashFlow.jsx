import { useState, useMemo } from 'react'
import { cashFlow as initialCashFlow, formatCurrency } from '../../data/mockData'
import { FiArrowUpCircle, FiArrowDownCircle, FiDollarSign, FiSearch, FiDownload, FiPlus, FiX, FiTrash2, FiCalendar } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function CashFlow() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialCashFlow)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [catFilter, setCatFilter] = useState('all')
    const [methodFilter, setMethodFilter] = useState('all')
    const [showAddModal, setShowAddModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [newTx, setNewTx] = useState({ type: 'Thu', category: 'Dịch vụ', description: '', amount: 0, method: 'Tiền mặt', staff: '' })

    const filtered = useMemo(() => {
        let result = data
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(i => i.description.toLowerCase().includes(q) || i.staff.toLowerCase().includes(q) || String(i.id).toLowerCase().includes(q))
        }
        if (typeFilter !== 'all') result = result.filter(i => i.type === typeFilter)
        if (catFilter !== 'all') result = result.filter(i => i.category === catFilter)
        if (methodFilter !== 'all') result = result.filter(i => i.method === methodFilter)
        return result
    }, [data, search, typeFilter, catFilter, methodFilter])

    const income = data.filter(c => c.type === 'Thu').reduce((sum, c) => sum + c.amount, 0)
    const expense = data.filter(c => c.type === 'Chi').reduce((sum, c) => sum + c.amount, 0)
    const categories = [...new Set(data.map(c => c.category))]
    const txCount = data.length

    const handleAdd = () => {
        if (!newTx.description || !newTx.amount) return
        const tx = {
            id: `GD${String(data.length + 1).padStart(3, '0')}`,
            date: new Date().toLocaleDateString('vi-VN'),
            ...newTx
        }
        setData(prev => [tx, ...prev])
        setShowAddModal(false)
        setNewTx({ type: 'Thu', category: 'Dịch vụ', description: '', amount: 0, method: 'Tiền mặt', staff: '' })
        addToast(`Đã thêm giao dịch ${tx.type} - ${formatCurrency(tx.amount)}`, 'success')
    }

    const handleDelete = () => {
        setData(prev => prev.filter(i => i.id !== deleteId))
        addToast('Đã xóa giao dịch', 'info')
        setDeleteId(null)
    }

    const handleExport = () => {
        const csv = [
            ['#', 'Ngày', 'Loại', 'Danh mục', 'Mô tả', 'Số tiền', 'PT', 'NV'].join(','),
            ...filtered.map((item, i) => [i + 1, item.date, item.type, item.category, item.description, item.amount, item.method, item.staff].join(','))
        ].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = url; a.download = 'thu-chi.csv'; a.click()
        URL.revokeObjectURL(url)
        addToast('Đã xuất file CSV', 'info')
    }

    const QuickAddButton = ({ color }) => (
        <button onClick={() => setShowAddModal(true)} style={{
            position: 'absolute', top: '12px', right: '12px',
            width: '28px', height: '28px', borderRadius: '50%',
            background: color, color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
        }}><FiPlus size={14} /></button>
    )

    return (
        <div className="fade-in">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa giao dịch?" message="Bạn có chắc chắn muốn xóa giao dịch này không?"
                onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />

            {showAddModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '90%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Tạo Giao Dịch Mới</h2>
                            <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Loại *</label>
                                    <select value={newTx.type} onChange={e => setNewTx(p => ({ ...p, type: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        <option value="Thu">Thu</option>
                                        <option value="Chi">Chi</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Danh mục</label>
                                    <select value={newTx.category} onChange={e => setNewTx(p => ({ ...p, category: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        {categories.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Mô tả *</label>
                                <input type="text" placeholder="Nhập mô tả giao dịch" value={newTx.description}
                                    onChange={e => setNewTx(p => ({ ...p, description: e.target.value }))}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Số tiền (VNĐ) *</label>
                                    <input type="number" value={newTx.amount} onChange={e => setNewTx(p => ({ ...p, amount: Number(e.target.value) }))}
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Phương thức</label>
                                    <select value={newTx.method} onChange={e => setNewTx(p => ({ ...p, method: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        <option>Tiền mặt</option><option>Chuyển khoản</option><option>Thẻ</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Nhân viên</label>
                                <input type="text" placeholder="Tên nhân viên" value={newTx.staff}
                                    onChange={e => setNewTx(p => ({ ...p, staff: e.target.value }))}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                            <button onClick={() => setShowAddModal(false)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleAdd} className="btn btn-primary">Tạo giao dịch</button>
                        </div>
                    </div>
                    <style>{`
                        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
                    `}</style>
                </div>
            )}

            <div className="page-header">
                <h2>Lịch Sử Thu Chi</h2>
                <p>Theo dõi dòng tiền thu chi của cơ sở</p>
            </div>

            {/* Enhanced Stat Cards with Colored Borders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '24px', borderLeft: '4px solid #198754', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <QuickAddButton color="#198754" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FiArrowUpCircle size={22} color="#198754" />
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500 }}>Tổng thu</span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#198754' }}>{formatCurrency(income)}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '4px' }}>{data.filter(c => c.type === 'Thu').length} giao dịch</div>
                </div>

                <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '24px', borderLeft: '4px solid #e53e3e', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <QuickAddButton color="#e53e3e" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FiArrowDownCircle size={22} color="#e53e3e" />
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500 }}>Tổng chi</span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#e53e3e' }}>{formatCurrency(expense)}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '4px' }}>{data.filter(c => c.type === 'Chi').length} giao dịch</div>
                </div>

                <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '24px', borderLeft: '4px solid #ed8936', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffaf0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FiDollarSign size={22} color="#ed8936" />
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500 }}>Còn lại</span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#ed8936' }}>{formatCurrency(income - expense)}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '4px' }}>{txCount} tổng giao dịch</div>
                </div>
            </div>

            {/* Multi-row Filter Bar */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <select className="filter-select" style={{ minWidth: '120px' }}>
                        <option>CN_1834</option>
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--gray-200)', borderRadius: '8px', background: '#fff' }}>
                        <FiCalendar size={14} color="var(--gray-400)" />
                        <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>27-02-2026 đến 27-03-2026</span>
                    </div>
                    <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                        <option value="all">Tất cả loại</option>
                        <option value="Thu">Thu</option>
                        <option value="Chi">Chi</option>
                    </select>
                    <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                        <option value="all">Tất cả danh mục</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select className="filter-select" value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
                        <option value="all">Phương thức TT</option>
                        <option value="Tiền mặt">Tiền mặt</option>
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Thẻ">Thẻ</option>
                    </select>
                    <button className="btn btn-ok" onClick={() => { setSearch(''); setTypeFilter('all'); setCatFilter('all'); setMethodFilter('all') }}>Xóa lọc</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                    <FiSearch size={14} style={{ color: 'var(--gray-400)' }} />
                    <input type="text" placeholder="Tìm kiếm giao dịch..." id="search-cashflow"
                        value={search} onChange={e => setSearch(e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', padding: '6px 0' }} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header">
                    <span className="table-count">{filtered.length} / {data.length} giao dịch</span>
                    <div className="table-header-right">
                        <button className="btn btn-outline btn-sm" onClick={handleExport}><FiDownload size={12} /> Xuất file</button>
                        <button className="btn btn-success btn-sm" onClick={() => setShowAddModal(true)}><FiPlus size={12} /> Thêm giao dịch</button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="cashflow-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Ngày ↕</th><th>Loại</th><th>Danh mục ↕</th>
                                <th>Mô tả</th><th>Số tiền ↕</th><th>Phương thức</th><th>Nhân viên ↕</th><th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy giao dịch</td></tr>
                            ) : filtered.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td>{item.date}</td>
                                    <td><span className={`badge ${item.type === 'Thu' ? 'badge-arrived' : 'badge-cancelled'}`}>{item.type}</span></td>
                                    <td>{item.category}</td>
                                    <td style={{ maxWidth: '250px', fontSize: '12px' }}>{item.description}</td>
                                    <td style={{ fontWeight: 600, color: item.type === 'Thu' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                        {item.type === 'Chi' ? '-' : '+'}{formatCurrency(item.amount)}
                                    </td>
                                    <td>{item.method}</td>
                                    <td>{item.staff}</td>
                                    <td>
                                        <button className="btn-icon" onClick={() => setDeleteId(item.id)} title="Xóa">
                                            <FiTrash2 size={14} color="var(--accent-red)" />
                                        </button>
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
