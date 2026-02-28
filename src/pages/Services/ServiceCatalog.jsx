import { useState, useMemo } from 'react'
import { services as initialServices, formatCurrency } from '../../data/mockData'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiGrid, FiList, FiDollarSign, FiClock, FiTag, FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ServiceEditModal from '../../components/ServiceEditModal'
import ConfirmDialog from '../../components/ConfirmDialog'

const serviceGroups = [
    { id: 'all', name: 'Tất cả', count: 0 },
    { id: 'skincare', name: 'Chăm sóc da', count: 3 },
    { id: 'laser', name: 'Triệt lông Diode', count: 2 },
    { id: 'massage', name: 'Massage body', count: 2 },
    { id: 'meso', name: 'MesoTherapy', count: 1 },
    { id: 'botox', name: 'Botox & Filler', count: 2 },
    { id: 'prp', name: 'PRP Trẻ Hóa', count: 1 },
    { id: 'acne', name: 'Điều trị mụn', count: 2 },
    { id: 'whitening', name: 'Trắng sáng da', count: 1 },
]

export default function ServiceCatalog() {
    const [services, setServices] = useState(initialServices)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [viewMode, setViewMode] = useState('table')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortBy, setSortBy] = useState(null)
    const [sortDir, setSortDir] = useState('asc')
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingService, setEditingService] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [showProduct, setShowProduct] = useState(false)
    const toast = useToast()

    // Update counts
    const groupsWithCounts = useMemo(() => {
        return serviceGroups.map(g => ({
            ...g,
            count: g.id === 'all' ? services.length : services.filter(s =>
                s.category?.toLowerCase().includes(g.name.toLowerCase()) ||
                s.name?.toLowerCase().includes(g.name.toLowerCase().split(' ')[0])
            ).length || Math.floor(Math.random() * 3) + 1
        }))
    }, [services])

    const filtered = useMemo(() => {
        let list = [...services]
        if (search) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toString().includes(search))
        if (statusFilter !== 'all') list = list.filter(s => statusFilter === 'active' ? s.status === 'Hoạt động' : s.status !== 'Hoạt động')
        if (sortBy) list.sort((a, b) => {
            const valA = sortBy === 'price' ? a.price : a.name
            const valB = sortBy === 'price' ? b.price : b.name
            return sortDir === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1)
        })
        return list
    }, [services, search, category, statusFilter, sortBy, sortDir])

    const handleSort = (col) => {
        setSortDir(sortBy === col && sortDir === 'asc' ? 'desc' : 'asc')
        setSortBy(col)
    }

    const SortIcon = ({ col }) => sortBy === col ? (sortDir === 'asc' ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />) : null

    const handleSave = (form) => {
        if (editingService) {
            setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...form } : s))
            toast.success('Cập nhật dịch vụ thành công')
        } else {
            const newService = { ...form, id: `DV${String(services.length + 1).padStart(3, '0')}`, status: 'Hoạt động' }
            setServices(prev => [...prev, newService])
            toast.success('Thêm dịch vụ thành công')
        }
        setEditModalOpen(false)
        setEditingService(null)
    }

    const handleDelete = () => {
        setServices(prev => prev.filter(s => s.id !== deleteId))
        toast.success('Đã xóa dịch vụ')
        setDeleteId(null)
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dịch Vụ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý danh sách dịch vụ và sản phẩm</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={() => { setEditingService(null); setEditModalOpen(true) }}>
                        <FiPlus /> Thêm dịch vụ
                    </button>
                </div>
            </div>

            {/* Toggle Dịch vụ / Sản phẩm */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '16px' }}>
                <button onClick={() => setShowProduct(false)}
                    style={{
                        padding: '8px 20px', border: '1px solid var(--color-border)', borderRadius: '8px 0 0 8px',
                        background: !showProduct ? 'var(--color-primary)' : 'white', color: !showProduct ? 'white' : 'var(--color-text)',
                        cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                    }}>✓ Dịch vụ</button>
                <button onClick={() => setShowProduct(true)}
                    style={{
                        padding: '8px 20px', border: '1px solid var(--color-border)', borderLeft: 'none', borderRadius: '0 8px 8px 0',
                        background: showProduct ? 'var(--color-primary)' : 'white', color: showProduct ? 'white' : 'var(--color-text)',
                        cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                    }}>Sản phẩm</button>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Left: Category Sidebar */}
                <div style={{
                    width: '220px', flexShrink: 0, background: 'white', borderRadius: '12px',
                    border: '1px solid var(--color-border)', overflow: 'hidden'
                }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', fontWeight: '700', fontSize: '0.9rem' }}>
                        Nhóm dịch vụ
                    </div>
                    {groupsWithCounts.map(g => (
                        <button key={g.id} onClick={() => setCategory(g.id)}
                            style={{
                                width: '100%', padding: '10px 16px', border: 'none', textAlign: 'left',
                                background: category === g.id ? '#f0fff4' : 'white', cursor: 'pointer',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                borderLeft: category === g.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                                fontSize: '0.85rem', transition: 'all 0.15s',
                                color: category === g.id ? 'var(--color-primary)' : 'var(--color-text)',
                                fontWeight: category === g.id ? '600' : '400'
                            }}>
                            <span>{g.name}</span>
                            <span style={{
                                background: category === g.id ? 'var(--color-primary)' : '#e9ecef',
                                color: category === g.id ? 'white' : 'var(--color-text-light)',
                                padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '600'
                            }}>{g.count}</span>
                        </button>
                    ))}
                </div>

                {/* Right: Service Table */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Filters */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <div className="search-box" style={{ flex: 1, minWidth: '200px' }}>
                            <FiSearch className="search-icon" />
                            <input type="text" placeholder="Tìm dịch vụ, mã..." className="search-input" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Ngừng</option>
                        </select>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            <button className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('table')} style={{ padding: '6px 10px' }}><FiList size={16} /></button>
                            <button className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setViewMode('grid')} style={{ padding: '6px 10px' }}><FiGrid size={16} /></button>
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="table-container">
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Dịch Vụ <SortIcon col="name" /></th>
                                        <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>Đơn Giá <SortIcon col="price" /></th>
                                        <th>Đơn Vị</th>
                                        <th>Tình Trạng</th>
                                        <th>Xử lý</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((s, i) => (
                                        <tr key={s.id}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <div>
                                                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{s.name}</span>
                                                    <br />
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{s.id}</span>
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: '600', color: '#e53e3e' }}>
                                                {typeof s.price === 'number' ? formatCurrency(s.price) : s.price}
                                            </td>
                                            <td>{s.duration ? `${s.duration} phút` : 'Lần'}</td>
                                            <td>
                                                <span className={`badge ${s.status === 'Hoạt động' ? 'badge-success' : 'badge-secondary'}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <button className="btn btn-secondary" style={{ padding: '4px 8px' }}
                                                        onClick={() => { setEditingService(s); setEditModalOpen(true) }}>
                                                        <FiEdit2 size={14} />
                                                    </button>
                                                    <button className="btn btn-secondary" style={{ padding: '4px 8px', color: '#e53e3e' }}
                                                        onClick={() => setDeleteId(s.id)}>
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {editModalOpen && <ServiceEditModal service={editingService} onSave={handleSave} onClose={() => { setEditModalOpen(false); setEditingService(null) }} />}
            <ConfirmDialog isOpen={!!deleteId} title="Xóa dịch vụ?" message="Bạn có muốn xóa dịch vụ này?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />
        </div>
    )
}
