import { useState, useMemo } from 'react'
import { staff as initialStaff, formatCurrency } from '../../data/mockData'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiUsers, FiX, FiDollarSign, FiBriefcase, FiUserCheck, FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import StaffEditModal from '../../components/StaffEditModal'
import ConfirmDialog from '../../components/ConfirmDialog'

const allDepartments = [
    { key: 'Kế Toán', label: 'Kế Toán' },
    { key: 'Lễ tân', label: 'Lễ Tân' },
    { key: 'Bác Sĩ', label: 'Bác Sĩ' },
    { key: 'Tư Vấn', label: 'Tư Vấn' },
    { key: 'Điều trị', label: 'Kỹ Thuật Viên' },
    { key: 'Thẩm mỹ', label: 'Thẩm Mỹ' },
    { key: 'Spa', label: 'Spa' },
    { key: 'Quản lý', label: 'Quản Lý' },
    { key: 'Marketing', label: 'Marketing' },
]

export default function StaffList() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialStaff)
    const [search, setSearch] = useState('')
    const [deptFilter, setDeptFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [editStaff, setEditStaff] = useState(null)
    const [showCreate, setShowCreate] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [activeTab, setActiveTab] = useState('all')
    const [sortCol, setSortCol] = useState(null)
    const [sortAsc, setSortAsc] = useState(true)

    const departments = [...new Set(data.map(s => s.department))]
    const totalSalary = data.filter(s => s.status === 'active').reduce((a, s) => a + (s.salary || 0), 0)
    const deptColors = { 'Điều trị': '#198754', 'Thẩm mỹ': '#8e44ad', 'Spa': '#3498db', 'Quản lý': '#e67e22', 'Lễ tân': '#e74c3c', 'Bác Sĩ': '#1a73e8', 'Tư Vấn': '#00bcd4', 'Kế Toán': '#607d8b', 'Marketing': '#ff5722' }

    // Count staff per department
    const deptCounts = useMemo(() => {
        const counts = {}
        data.forEach(s => { counts[s.department] = (counts[s.department] || 0) + 1 })
        return counts
    }, [data])

    const filtered = useMemo(() => {
        let result = data
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.phone?.includes(q))
        }
        if (deptFilter !== 'all') result = result.filter(s => s.department === deptFilter)
        if (statusFilter !== 'all') result = result.filter(s => s.status === statusFilter)
        if (activeTab === 'active') result = result.filter(s => s.status === 'active')
        else if (activeTab === 'inactive') result = result.filter(s => s.status === 'inactive')
        if (sortCol) {
            result = [...result].sort((a, b) => {
                const va = a[sortCol], vb = b[sortCol]
                if (typeof va === 'number') return sortAsc ? va - vb : vb - va
                return sortAsc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va))
            })
        }
        return result
    }, [data, search, deptFilter, statusFilter, activeTab, sortCol, sortAsc])

    const handleSort = (col) => {
        if (sortCol === col) setSortAsc(!sortAsc)
        else { setSortCol(col); setSortAsc(true) }
    }
    const SortIcon = ({ col }) => sortCol === col ? (sortAsc ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />) : null

    const handleSave = (form) => {
        if (editStaff) {
            setData(prev => prev.map(s => s.id === editStaff.id ? { ...s, ...form } : s))
            addToast(`Đã cập nhật nhân viên "${form.name}"`, 'success')
            setEditStaff(null)
        } else {
            const newStaff = { ...form, id: `NV${String(data.length + 1).padStart(3, '0')}`, department: form.role }
            setData(prev => [...prev, newStaff])
            addToast(`Đã thêm nhân viên "${form.name}"`, 'success')
            setShowCreate(false)
        }
    }

    const handleDelete = () => {
        setData(prev => prev.filter(s => s.id !== deleteTarget.id))
        addToast(`Đã xóa nhân viên "${deleteTarget.name}"`, 'success')
        setDeleteTarget(null)
    }

    const handleExport = () => {
        const csv = 'Mã NV,Tên,Chức vụ,Phòng ban,SĐT,Email,Lương,Phạm vi CN,Trạng thái\n' + data.map(s =>
            `${s.id},${s.name},${s.role},${s.department},${s.phone},${s.email},${s.salary || 0},Tất cả chi nhánh,${s.status === 'active' ? 'Đang làm việc' : 'Nghỉ việc'}`
        ).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'nhan-vien.csv'; a.click()
        addToast('Đã xuất file CSV', 'success')
    }

    const tabs = [
        { key: 'all', label: 'Tất cả', icon: <FiUsers size={14} />, count: data.length },
        { key: 'active', label: 'Đang làm', icon: <FiUserCheck size={14} />, count: data.filter(s => s.status === 'active').length },
        { key: 'inactive', label: 'Nghỉ việc', icon: <FiBriefcase size={14} />, count: data.filter(s => s.status === 'inactive').length },
    ]

    return (
        <div className="fade-in">
            <StaffEditModal isOpen={!!editStaff || showCreate} onClose={() => { setEditStaff(null); setShowCreate(false) }} staff={editStaff} onSave={handleSave} />
            <ConfirmDialog isOpen={!!deleteTarget} title="Xóa nhân viên?" message={`Bạn có chắc chắn muốn xoá nhân viên "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />

            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div><h2>Nhân Viên & User</h2><p>Nhân Viên — Danh sách nhân viên</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất file</button>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><FiPlus size={14} /> Thêm NV</button>
                </div>
            </div>

            {/* Layout: Sidebar + Content */}
            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Department Sidebar */}
                <div style={{
                    width: '200px', flexShrink: 0, background: 'white', borderRadius: '12px',
                    border: '1px solid var(--color-border)', overflow: 'hidden', alignSelf: 'flex-start'
                }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary)' }}>
                        Bộ phận
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {/* Total */}
                        <div
                            onClick={() => setDeptFilter('all')}
                            style={{
                                padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                                background: deptFilter === 'all' ? 'var(--color-primary-light)' : 'transparent',
                                fontWeight: deptFilter === 'all' ? 700 : 400,
                                color: deptFilter === 'all' ? 'var(--primary)' : 'var(--color-text)',
                                borderLeft: deptFilter === 'all' ? '3px solid var(--primary)' : '3px solid transparent'
                            }}>
                            <span>Tất cả</span>
                            <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>{data.length}</span>
                        </div>
                        {allDepartments.map(dept => {
                            const count = deptCounts[dept.key] || 0
                            const isActive = deptFilter === dept.key
                            return (
                                <div key={dept.key}
                                    onClick={() => setDeptFilter(isActive ? 'all' : dept.key)}
                                    style={{
                                        padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                                        background: isActive ? 'var(--color-primary-light)' : 'transparent',
                                        fontWeight: isActive ? 700 : 400,
                                        color: isActive ? 'var(--primary)' : 'var(--color-text)',
                                        borderLeft: isActive ? `3px solid ${deptColors[dept.key] || 'var(--primary)'}` : '3px solid transparent',
                                        transition: 'all 0.15s'
                                    }}
                                    onMouseOver={e => !isActive && (e.currentTarget.style.background = '#f8f9fa')}
                                    onMouseOut={e => !isActive && (e.currentTarget.style.background = 'transparent')}>
                                    <span>{dept.label}</span>
                                    <span style={{ color: deptColors[dept.key] || '#999', fontWeight: 600, fontSize: '0.8rem' }}>{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Stat Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                        <div className="stat-card">
                            <div className="stat-card-icon" style={{ background: '#e3f2fd', color: '#1976d2' }}><FiUsers /></div>
                            <div className="stat-card-info"><div className="stat-card-value">{data.length}</div><div className="stat-card-label">Tổng nhân viên</div></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-icon green"><FiUserCheck /></div>
                            <div className="stat-card-info"><div className="stat-card-value">{data.filter(s => s.status === 'active').length}</div><div className="stat-card-label">Đang làm việc</div></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-icon orange"><FiBriefcase /></div>
                            <div className="stat-card-info"><div className="stat-card-value">{departments.length}</div><div className="stat-card-label">Phòng ban</div></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-icon purple"><FiDollarSign /></div>
                            <div className="stat-card-info"><div className="stat-card-value">{formatCurrency(totalSalary)}</div><div className="stat-card-label">Tổng lương/tháng</div></div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: 'var(--gray-100)', borderRadius: '10px', padding: '3px', width: 'fit-content' }}>
                        {tabs.map(t => (
                            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                                padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600,
                                background: activeTab === t.key ? 'white' : 'transparent',
                                color: activeTab === t.key ? 'var(--primary)' : 'var(--gray-500)',
                                boxShadow: activeTab === t.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}>{t.icon} {t.label} <span style={{ fontSize: '0.72rem', fontWeight: 700, background: activeTab === t.key ? 'var(--primary)' : 'var(--gray-300)', color: 'white', borderRadius: '10px', padding: '1px 7px' }}>{t.count}</span></button>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="filter-bar">
                        <FiSearch style={{ color: 'var(--gray-400)' }} />
                        <div className="filter-search-wrapper">
                            <input type="text" placeholder="Tìm theo tên, mã nhân viên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} />
                            {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                        </div>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="all">Trạng thái</option>
                            <option value="active">Đang làm việc</option>
                            <option value="inactive">Nghỉ việc</option>
                        </select>
                        <button className="btn btn-ok" onClick={() => { setSearch(''); setDeptFilter('all'); setStatusFilter('all') }}>Xóa lọc</button>
                    </div>

                    {/* Table */}
                    <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                        <div className="table-header">
                            <span className="table-count">{filtered.length} / {data.length} nhân viên</span>
                        </div>
                        <div className="table-wrapper">
                            <table className="data-table" id="staff-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Hình ảnh</th>
                                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Tên <SortIcon col="name" /></th>
                                        <th>Bộ phận</th>
                                        <th>Phạm vi CN</th>
                                        <th>SĐT</th>
                                        <th onClick={() => handleSort('salary')} style={{ cursor: 'pointer' }}>Lương <SortIcon col="salary" /></th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy nhân viên</td></tr>
                                    ) : filtered.map((s, idx) => (
                                        <tr key={s.id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <div style={{
                                                    width: '38px', height: '38px', borderRadius: '50%',
                                                    background: `linear-gradient(135deg, ${deptColors[s.department] || 'var(--primary)'}, ${deptColors[s.department] || 'var(--primary)'}99)`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'white', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0
                                                }}>
                                                    {s.name.charAt(0)}
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 500 }}>
                                                <div>
                                                    <span className="link-blue" style={{ fontSize: '0.82rem' }}>{s.id}</span>
                                                    <div style={{ fontWeight: 600 }}>{s.name}</div>
                                                    <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>[{s.role}]</div>
                                                </div>
                                            </td>
                                            <td><span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.76rem', fontWeight: 600, background: `${deptColors[s.department] || 'var(--primary)'}15`, color: deptColors[s.department] || 'var(--primary)' }}>{s.department}</span></td>
                                            <td><span style={{ fontSize: '0.82rem', color: '#1a73e8' }}>Tất cả chi nhánh</span></td>
                                            <td><span className="link-green">{s.phone}</span></td>
                                            <td style={{ fontWeight: 500 }}>{formatCurrency(s.salary)}</td>
                                            <td><span className={`badge ${s.status === 'active' ? 'badge-arrived' : 'badge-cancelled'}`}>{s.status === 'active' ? 'Đang làm việc' : 'Nghỉ việc'}</span></td>
                                            <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-icon" title="Sửa" onClick={() => setEditStaff(s)}><FiEdit2 size={14} /></button><button className="btn-icon" title="Xóa" onClick={() => setDeleteTarget(s)}><FiTrash2 size={14} /></button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
