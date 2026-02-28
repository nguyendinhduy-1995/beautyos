import { useState, useMemo } from 'react'
import { inventory as initialInventory, formatCurrency } from '../../data/mockData'
import { FiSearch, FiAlertTriangle, FiPackage, FiPlus, FiDownload, FiX, FiEdit2 } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

export default function StockManagement() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialInventory)
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [showAddModal, setShowAddModal] = useState(false)
    const [newItem, setNewItem] = useState({ name: '', category: 'Mỹ phẩm', unit: 'Hộp', quantity: 0, price: 0 })

    const filtered = useMemo(() => {
        let result = data
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(i => i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q))
        }
        if (categoryFilter !== 'all') result = result.filter(i => i.category === categoryFilter)
        return result
    }, [data, search, categoryFilter])

    const categories = [...new Set(data.map(i => i.category))]
    const lowStock = data.filter(i => i.quantity < i.minStock)

    const handleAddStock = (id, amount) => {
        setData(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + amount } : i))
        addToast(`Đã nhập thêm ${amount} sản phẩm`, 'success')
    }

    const handleExport = () => {
        const csv = [
            ['#', 'Mã VT', 'Tên', 'Danh mục', 'ĐVT', 'Tồn kho', 'Tối thiểu', 'Giá nhập', 'NCC', 'Hạn SD'].join(','),
            ...filtered.map((item, i) => [i + 1, item.id, item.name, item.category, item.unit, item.quantity, item.minStock, item.price, item.supplier, item.expiry].join(','))
        ].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = url; a.download = 'ton-kho.csv'; a.click()
        URL.revokeObjectURL(url)
        addToast('Đã xuất file CSV thành công', 'info')
    }

    const handleAddNewItem = () => {
        if (!newItem.name) return
        const item = {
            id: `VT${String(data.length + 1).padStart(3, '0')}`,
            ...newItem, minStock: 10, supplier: 'NCC Mới', expiry: '12/2027'
        }
        setData(prev => [...prev, item])
        setShowAddModal(false)
        setNewItem({ name: '', category: 'Mỹ phẩm', unit: 'Hộp', quantity: 0, price: 0 })
        addToast(`Đã thêm "${item.name}" vào kho`, 'success')
    }

    return (
        <div className="fade-in">
            {/* Add Stock Modal */}
            {showAddModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Thêm Sản Phẩm</h2>
                            <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Tên vật tư *</label>
                                <input type="text" placeholder="Nhập tên" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Danh mục</label>
                                    <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        {categories.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>ĐVT</label>
                                    <select value={newItem.unit} onChange={e => setNewItem(p => ({ ...p, unit: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        {['Hộp', 'Chai', 'Tuýp', 'Bộ', 'Cái', 'Lọ'].map(u => <option key={u}>{u}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Số lượng</label>
                                    <input type="number" value={newItem.quantity} onChange={e => setNewItem(p => ({ ...p, quantity: Number(e.target.value) }))}
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Giá nhập (VNĐ)</label>
                                    <input type="number" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: Number(e.target.value) }))}
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                            <button onClick={() => setShowAddModal(false)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleAddNewItem} className="btn btn-primary">Thêm</button>
                        </div>
                    </div>
                    <style>{`
                        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
                    `}</style>
                </div>
            )}

            <div className="page-header">
                <h2>Tồn kho</h2>
                <p>Quản lý số lượng và tình trạng vật tư, sản phẩm</p>
            </div>

            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-card-icon blue"><FiPackage /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{data.length}</div>
                        <div className="stat-card-label">Tổng sản phẩm</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon red"><FiAlertTriangle /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{lowStock.length}</div>
                        <div className="stat-card-label">Sắp hết hàng</div>
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="Tìm theo tên vật tư, mã..." id="search-inventory"
                        value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    <option value="all">Tất cả danh mục</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button className="btn btn-ok" onClick={() => { setSearch(''); setCategoryFilter('all') }}>Xóa lọc</button>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header">
                    <span className="table-count">{filtered.length} / {data.length} sản phẩm</span>
                    <div className="table-header-right">
                        <button className="btn btn-outline btn-sm" onClick={handleExport}><FiDownload size={12} /> Xuất file</button>
                        <button className="btn btn-success btn-sm" onClick={() => setShowAddModal(true)}><FiPlus size={12} /> Nhập kho</button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="inventory-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã VT</th>
                                <th>Tên Vật Tư</th>
                                <th>Danh mục</th>
                                <th>ĐVT</th>
                                <th>Tồn kho</th>
                                <th>Tối thiểu</th>
                                <th>Giá nhập</th>
                                <th>NCC</th>
                                <th>Trạng thái</th>
                                <th>Nhập thêm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={11} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy sản phẩm</td></tr>
                            ) : filtered.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td><span className="link-blue">{item.id}</span></td>
                                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.unit}</td>
                                    <td style={{ fontWeight: 600, color: item.quantity < item.minStock ? 'var(--accent-red)' : 'inherit' }}>
                                        {item.quantity}
                                    </td>
                                    <td>{item.minStock}</td>
                                    <td>{formatCurrency(item.price)}</td>
                                    <td>{item.supplier}</td>
                                    <td>
                                        {item.quantity < item.minStock ? (
                                            <span className="badge badge-cancelled">⚠ Sắp hết</span>
                                        ) : (
                                            <span className="badge badge-arrived">Đủ hàng</span>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                            onClick={() => handleAddStock(item.id, 10)}>
                                            +10
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
