import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiPackage, FiEdit2, FiTrash2, FiFilter, FiDownload, FiX, FiAlertTriangle, FiTruck } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialMaterials = [
    { id: 'NVL001', name: 'Serum Vitamin C nguyên chất', unit: 'Lít', stock: 15, minStock: 5, price: 850000, supplier: 'ABC Cosmetics', category: 'Serum' },
    { id: 'NVL002', name: 'Hyaluronic Acid nguyên liệu', unit: 'Kg', stock: 3, minStock: 2, price: 2500000, supplier: 'Korea Bio', category: 'Dưỡng ẩm' },
    { id: 'NVL003', name: 'Collagen bột cá biển', unit: 'Kg', stock: 8, minStock: 3, price: 1800000, supplier: 'Japan Import', category: 'Collagen' },
    { id: 'NVL004', name: 'Retinol 0.5%', unit: 'Lít', stock: 2, minStock: 2, price: 3200000, supplier: 'ABC Cosmetics', category: 'Chống lão hoá' },
    { id: 'NVL005', name: 'Niacinamide tinh khiết', unit: 'Kg', stock: 5, minStock: 2, price: 1200000, supplier: 'Korea Bio', category: 'Trắng da' },
    { id: 'NVL006', name: 'AHA/BHA hỗn hợp', unit: 'Lít', stock: 10, minStock: 4, price: 950000, supplier: 'VN Pharma', category: 'Peel' },
    { id: 'NVL007', name: 'Tinh dầu Lavender', unit: 'Lít', stock: 1, minStock: 2, price: 4500000, supplier: 'France Import', category: 'Tinh dầu' },
    { id: 'NVL008', name: 'Chiết xuất trà xanh', unit: 'Kg', stock: 6, minStock: 3, price: 780000, supplier: 'VN Pharma', category: 'Thảo dược' },
    { id: 'NVL009', name: 'Glycolic Acid 70%', unit: 'Lít', stock: 4, minStock: 3, price: 1500000, supplier: 'ABC Cosmetics', category: 'Peel' },
    { id: 'NVL010', name: 'Bơ hạt mỡ tinh luyện', unit: 'Kg', stock: 12, minStock: 5, price: 650000, supplier: 'VN Pharma', category: 'Dưỡng ẩm' },
]

const categoryColors = {
    'Serum': '#ff9800', 'Dưỡng ẩm': '#2196f3', 'Collagen': '#e91e63', 'Chống lão hoá': '#f44336',
    'Trắng da': '#9c27b0', 'Peel': '#ff5722', 'Tinh dầu': '#009688', 'Thảo dược': '#4caf50'
}

export default function RawMaterials() {
    const toast = useToast()
    const [data, setData] = useState(initialMaterials)
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Tất cả')
    const [supplierFilter, setSupplierFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [form, setForm] = useState({ name: '', unit: 'Lít', stock: 0, minStock: 0, price: 0, supplier: '', category: 'Serum' })

    const suppliers = [...new Set(data.map(m => m.supplier))]
    const categories = ['Tất cả', ...new Set(data.map(m => m.category))]
    const catCounts = categories.reduce((acc, c) => { acc[c] = c === 'Tất cả' ? data.length : data.filter(m => m.category === c).length; return acc }, {})

    const filtered = useMemo(() => {
        let result = data
        if (search) { const q = search.toLowerCase(); result = result.filter(m => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) }
        if (activeCategory !== 'Tất cả') result = result.filter(m => m.category === activeCategory)
        if (supplierFilter !== 'all') result = result.filter(m => m.supplier === supplierFilter)
        return result
    }, [data, search, activeCategory, supplierFilter])

    const formatCurrency = v => new Intl.NumberFormat('vi-VN').format(v) + ' đ'
    const lowStock = data.filter(m => m.stock <= m.minStock).length

    const openCreate = () => {
        setEditItem(null)
        setForm({ name: '', unit: 'Lít', stock: 0, minStock: 0, price: 0, supplier: '', category: 'Serum' })
        setShowModal(true)
    }

    const openEdit = (item) => {
        setEditItem(item)
        setForm({ name: item.name, unit: item.unit, stock: item.stock, minStock: item.minStock, price: item.price, supplier: item.supplier, category: item.category })
        setShowModal(true)
    }

    const handleSave = () => {
        if (!form.name.trim()) return toast.warning('Nhập tên nguyên vật liệu')
        if (!form.supplier.trim()) return toast.warning('Nhập nhà cung cấp')
        if (editItem) {
            setData(prev => prev.map(m => m.id === editItem.id ? { ...m, ...form } : m))
            toast.success(`Đã cập nhật "${form.name}"`)
        } else {
            const newItem = { id: `NVL${String(data.length + 1).padStart(3, '0')}`, ...form }
            setData(prev => [...prev, newItem])
            toast.success(`Đã thêm "${form.name}"`)
        }
        setShowModal(false)
    }

    const handleDelete = () => {
        const name = data.find(m => m.id === deleteId)?.name
        setData(prev => prev.filter(m => m.id !== deleteId))
        setDeleteId(null)
        toast.info(`Đã xóa "${name}"`)
    }

    const handleExport = () => {
        const csv = 'Mã,Tên NVL,ĐVT,Tồn kho,Tồn tối thiểu,Đơn giá,NCC,Nhóm\n' + filtered.map(m =>
            `${m.id},${m.name},${m.unit},${m.stock},${m.minStock},${m.price},${m.supplier},${m.category}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'nguyen-vat-lieu.csv'; a.click()
        toast.success('Đã xuất file CSV')
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa nguyên vật liệu?" message="Bạn có chắc muốn xóa nguyên vật liệu này? Hành động không thể hoàn tác."
                onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />

            <div className="page-header">
                <div><h1 className="page-title">Nguyên Vật Liệu</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý danh mục nguyên vật liệu sản xuất</p></div>
                <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Thêm nguyên liệu</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
                {/* Left Panel */}
                <div>
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiFilter size={14} /> Nhóm NVL</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                    background: activeCategory === cat ? 'var(--color-primary)' : 'transparent',
                                    color: activeCategory === cat ? 'white' : 'var(--color-text)',
                                    fontWeight: activeCategory === cat ? 600 : 400, fontSize: '0.82rem', textAlign: 'left',
                                    transition: 'all 0.2s', fontFamily: 'inherit'
                                }}>
                                    <span>{cat}</span>
                                    <span style={{
                                        fontSize: '0.7rem', fontWeight: 600, borderRadius: '10px', padding: '1px 7px', minWidth: '22px', textAlign: 'center',
                                        background: activeCategory === cat ? 'rgba(255,255,255,0.25)' : 'var(--color-border)',
                                        color: activeCategory === cat ? 'white' : 'var(--color-text-light)'
                                    }}>{catCounts[cat] || 0}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginTop: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '10px' }}>Thống kê</div>
                        {[
                            { label: 'Tổng NVL', value: data.length, color: '#333' },
                            { label: 'Sắp hết', value: lowStock, color: '#e53e3e' },
                            { label: 'Nhà cung cấp', value: suppliers.length, color: '#1a73e8' },
                            { label: 'Giá trị kho', value: formatCurrency(data.reduce((s, m) => s + m.stock * m.price, 0)), color: '#28a745' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem' }}>
                                <span style={{ color: 'var(--color-text-light)' }}>{s.label}</span>
                                <span style={{ fontWeight: 600, color: s.color }}>{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content */}
                <div>
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '16px' }}>
                        <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiPackage color="#28a745" /></div><div><div className="stat-label">Sản phẩm</div><div className="stat-value">{filtered.length}</div></div></div>
                        <div className="stat-card"><div className="stat-icon" style={{ background: '#fef2f2' }}><FiPackage color="#e53e3e" /></div><div><div className="stat-label">Sắp hết</div><div className="stat-value" style={{ color: '#e53e3e' }}>{lowStock}</div></div></div>
                        <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Giá trị kho</div><div className="stat-value" style={{ fontSize: '0.9rem' }}>{formatCurrency(data.reduce((s, m) => s + m.stock * m.price, 0))}</div></div></div>
                    </div>

                    {/* Low Stock Alert */}
                    {lowStock > 0 && (
                        <div style={{ padding: '10px 14px', background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', borderRadius: '10px', marginBottom: '12px', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiAlertTriangle size={16} color="#dc2626" />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#dc2626' }}>{lowStock} NVL sắp hết</div>
                                <div style={{ fontSize: '0.72rem', color: '#666' }}>Cần đặt hàng bổ sung</div>
                            </div>
                        </div>
                    )}

                    {/* Supplier Breakdown */}
                    <div style={{ background: 'white', borderRadius: '10px', padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)', marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiTruck size={13} /> NCC</div>
                        {suppliers.map(s => {
                            const items = data.filter(m => m.supplier === s)
                            const val = items.reduce((sum, m) => sum + m.stock * m.price, 0)
                            return (
                                <div key={s} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.78rem' }}>
                                    <div style={{ fontWeight: 500 }}>{s}</div>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-light)', fontSize: '0.72rem' }}>
                                        <span>{items.length} NVL</span>
                                        <span style={{ color: '#28a745', fontWeight: 600 }}>{formatCurrency(val)}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Stock Level Bars */}
                    <div style={{ background: 'white', borderRadius: '10px', padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px' }}>Mức tồn kho</div>
                        {data.slice(0, 6).map(m => {
                            const maxStock = Math.max(...data.map(x => x.stock), 1)
                            const pct = (m.stock / maxStock) * 100
                            return (
                                <div key={m.id} style={{ marginBottom: '6px' }}>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '2px' }}>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{m.name.split(' ').slice(0, 2).join(' ')}</span>
                                        <span style={{ fontWeight: 600, color: m.stock <= m.minStock ? '#e53e3e' : '#28a745' }}>{m.stock}</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#e9ecef', borderRadius: '3px' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: m.stock <= m.minStock ? '#e53e3e' : '#28a745', transition: 'width 0.3s' }} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="filter-bar" style={{ marginBottom: '16px', marginTop: '12px' }}>
                        <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm nguyên vật liệu..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                        <select className="filter-select" value={supplierFilter} onChange={e => setSupplierFilter(e.target.value)}>
                            <option value="all">Tất cả NCC</option>
                            {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất file</button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Mã</th><th>Tên NVL</th><th>ĐVT</th><th>Tồn kho</th><th>Tồn tối thiểu</th><th>Đơn giá</th><th>NCC</th><th>Nhóm</th><th></th></tr></thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy nguyên vật liệu</td></tr>
                                ) : filtered.map(m => (
                                    <tr key={m.id} style={{ background: m.stock <= m.minStock ? '#fff5f5' : undefined }}>
                                        <td style={{ fontWeight: 600 }}>{m.id}</td>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{m.name}</div>
                                            {m.stock <= m.minStock && <div style={{ fontSize: '0.68rem', color: '#e53e3e', fontWeight: 600 }}>⚠ Sắp hết hàng</div>}
                                        </td>
                                        <td>{m.unit}</td>
                                        <td style={{ fontWeight: 600, color: m.stock <= m.minStock ? '#e53e3e' : '#28a745' }}>{m.stock}</td>
                                        <td>{m.minStock}</td>
                                        <td>{formatCurrency(m.price)}</td>
                                        <td>{m.supplier}</td>
                                        <td><span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 600, background: `${categoryColors[m.category] || '#666'}18`, color: categoryColors[m.category] || '#666' }}>{m.category}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn btn-sm btn-secondary" onClick={() => openEdit(m)} title="Sửa"><FiEdit2 size={13} /></button>
                                                <button className="btn btn-sm btn-secondary" onClick={() => setDeleteId(m.id)} title="Xóa"><FiTrash2 size={13} color="#dc3545" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px' }}>
                        <div className="modal-header"><h2>{editItem ? '✏️ Sửa Nguyên Liệu' : '📦 Thêm Nguyên Liệu'}</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên nguyên liệu *</label><input className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="VD: Serum Vitamin C" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Nhóm</label><select className="form-control" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                                    {Object.keys(categoryColors).map(c => <option key={c}>{c}</option>)}
                                </select></div>
                                <div className="form-group"><label>Đơn vị tính</label><select className="form-control" value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}>
                                    <option>Lít</option><option>Kg</option><option>Hộp</option><option>Chai</option><option>Tuýp</option>
                                </select></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Tồn kho</label><input type="number" className="form-control" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: +e.target.value }))} /></div>
                                <div className="form-group"><label>Tồn tối thiểu</label><input type="number" className="form-control" value={form.minStock} onChange={e => setForm(p => ({ ...p, minStock: +e.target.value }))} /></div>
                                <div className="form-group"><label>Đơn giá (VNĐ)</label><input type="number" className="form-control" value={form.price} onChange={e => setForm(p => ({ ...p, price: +e.target.value }))} /></div>
                            </div>
                            <div className="form-group"><label>Nhà cung cấp *</label><input className="form-control" value={form.supplier} onChange={e => setForm(p => ({ ...p, supplier: e.target.value }))} placeholder="VD: ABC Cosmetics" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleSave}>{editItem ? 'Cập nhật' : 'Thêm'}</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
