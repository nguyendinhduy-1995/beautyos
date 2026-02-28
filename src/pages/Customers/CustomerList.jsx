import { useState, useMemo } from 'react'
import { customers as initialCustomers, formatCurrency } from '../../data/mockData'
import { FiSearch, FiDownload, FiUsers, FiUserPlus, FiStar, FiX, FiTrash2, FiCalendar, FiDollarSign, FiActivity, FiCreditCard, FiFolder, FiList, FiGrid, FiFilter } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import CreateCustomerModal from '../../components/CreateCustomerModal'
import ConfirmDialog from '../../components/ConfirmDialog'

const CUSTOMER_TABS = [
    { key: 'all', label: 'Tất cả', icon: FiUsers },
    { key: 'appointments', label: 'Lịch hẹn', icon: FiCalendar },
    { key: 'services', label: 'Dịch vụ', icon: FiActivity },
    { key: 'treatment', label: 'Điều trị', icon: FiCreditCard },
    { key: 'payment', label: 'Thanh toán', icon: FiDollarSign },
    { key: 'profile', label: 'Hồ sơ', icon: FiFolder },
]

export default function CustomerList() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialCustomers)
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')
    const [groupFilter, setGroupFilter] = useState('all')
    const [genderFilter, setGenderFilter] = useState('all')
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [activeTab, setActiveTab] = useState('all')
    const [viewMode, setViewMode] = useState('list')

    const filtered = useMemo(() => {
        let result = data
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(c => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.phone.includes(q))
        }
        if (groupFilter !== 'all') result = result.filter(c => c.group === groupFilter)
        if (genderFilter !== 'all') result = result.filter(c => c.gender === genderFilter)
        return result
    }, [data, search, groupFilter, genderFilter])

    const handleDelete = () => {
        setData(prev => prev.filter(c => c.id !== deleteTarget.id))
        addToast(`Đã xóa khách hàng "${deleteTarget.name}"`, 'success')
        setDeleteTarget(null)
    }

    const handleExport = () => {
        const csv = [
            ['#', 'Mã KH', 'Tên', 'SĐT', 'Giới tính', 'Nhóm', 'Tổng chi tiêu', 'Số lần đến', 'Lần cuối'].join(','),
            ...filtered.map((c, i) => [i + 1, c.id, c.name, c.phone, c.gender, c.group, c.totalSpent, c.visits, c.lastVisit].join(','))
        ].join('\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = url; a.download = 'khach-hang.csv'; a.click()
        URL.revokeObjectURL(url)
        addToast('Đã xuất file CSV thành công', 'info')
    }

    const getGroupBadge = (group) => {
        const styles = {
            VIP: { background: '#e8daef', color: '#6f42c1' },
            Gold: { background: '#fff3cd', color: '#856404' },
            Thường: { background: '#d4edda', color: '#155724' },
        }
        return <span className="badge" style={{ ...styles[group], fontSize: '11px', fontWeight: 600 }}>{group}</span>
    }

    return (
        <div className="fade-in">
            <CreateCustomerModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <ConfirmDialog
                isOpen={!!deleteTarget}
                title="Xóa khách hàng?"
                message={`Bạn có chắc chắn muốn xoá khách hàng "${deleteTarget?.name}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
            <div className="page-header">
                <h2>Danh sách Khách Hàng</h2>
                <p>Quản lý thông tin khách hàng của cơ sở</p>
            </div>

            {/* Stat Cards */}
            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-card-icon blue"><FiUsers /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{data.length}</div>
                        <div className="stat-card-label">Tổng khách hàng</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon purple"><FiStar /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{data.filter(c => c.group === 'VIP').length}</div>
                        <div className="stat-card-label">Khách VIP</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon green"><FiUserPlus /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">3</div>
                        <div className="stat-card-label">Khách mới hôm nay</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: '#fff3cd', color: '#856404' }}><FiDollarSign /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{formatCurrency(data.reduce((s, c) => s + c.totalSpent, 0))}</div>
                        <div className="stat-card-label">Tổng doanh số</div>
                    </div>
                </div>
            </div>

            {/* Tab Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', borderRadius: '10px', padding: '4px', marginBottom: '16px' }}>
                {CUSTOMER_TABS.map(tab => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.key
                    return (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                            fontSize: '13px', fontWeight: isActive ? 600 : 400,
                            background: isActive ? '#fff' : 'transparent',
                            color: isActive ? '#198754' : 'var(--gray-500)',
                            boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s'
                        }}>
                            <Icon size={14} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Search + Filter Bar */}
            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="Tìm theo tên, mã KH, số điện thoại..." id="search-customer"
                        value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={groupFilter} onChange={e => setGroupFilter(e.target.value)}>
                    <option value="all">Tất cả nhóm</option>
                    <option value="VIP">VIP</option>
                    <option value="Gold">Gold</option>
                    <option value="Thường">Thường</option>
                </select>
                <select className="filter-select" value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                    <option value="all">Giới tính</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Nam">Nam</option>
                </select>
                <button className="btn btn-ok" onClick={() => { setSearch(''); setGroupFilter('all'); setGenderFilter('all') }}>Xóa lọc</button>
            </div>

            {/* Data Table */}
            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header">
                    <div className="table-header-left">
                        <span className="table-count">{filtered.length} / {data.length} khách hàng</span>
                    </div>
                    <div className="table-header-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', borderRadius: '6px', border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
                            <button onClick={() => setViewMode('list')} style={{ padding: '4px 8px', background: viewMode === 'list' ? '#198754' : '#fff', color: viewMode === 'list' ? '#fff' : 'var(--gray-500)', border: 'none', cursor: 'pointer' }}><FiList size={14} /></button>
                            <button onClick={() => setViewMode('grid')} style={{ padding: '4px 8px', background: viewMode === 'grid' ? '#198754' : '#fff', color: viewMode === 'grid' ? '#fff' : 'var(--gray-500)', border: 'none', cursor: 'pointer' }}><FiGrid size={14} /></button>
                        </div>
                        <button className="btn btn-outline btn-sm" onClick={handleExport}><FiDownload size={12} /> Xuất file</button>
                        <button className="btn btn-success btn-sm" onClick={() => setShowModal(true)}><FiUserPlus size={12} /> Thêm KH</button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="customer-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã KH ↕</th>
                                <th>Tên Khách Hàng ↕</th>
                                <th>Số Điện Thoại</th>
                                <th>Giới tính</th>
                                <th>Nhóm</th>
                                <th>Tổng chi tiêu ↕</th>
                                <th>Số lần đến ↕</th>
                                <th>Lần cuối ↕</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy khách hàng</td></tr>
                            ) : filtered.map((c, idx) => (
                                <tr key={c.id}>
                                    <td>{idx + 1}</td>
                                    <td><span className="link-blue">{c.id}</span></td>
                                    <td style={{ fontWeight: 500 }}>{c.name}</td>
                                    <td><span className="link-green">{c.phone}</span></td>
                                    <td>{c.gender}</td>
                                    <td>{getGroupBadge(c.group)}</td>
                                    <td style={{ fontWeight: 500 }}>{formatCurrency(c.totalSpent)}</td>
                                    <td style={{ textAlign: 'center' }}>{c.visits}</td>
                                    <td>{c.lastVisit}</td>
                                    <td>
                                        <button className="btn-icon" title="Xóa" onClick={() => setDeleteTarget(c)}><FiTrash2 size={14} /></button>
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
