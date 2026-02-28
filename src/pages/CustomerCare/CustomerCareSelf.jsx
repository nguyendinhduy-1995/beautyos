import { useState, useMemo } from 'react'
import { FiSearch, FiDownload, FiRepeat, FiUser, FiCheckSquare, FiSquare, FiPhone, FiCalendar } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialData = customers.slice(0, 12).map((c, i) => ({
    id: i + 1, name: c.name, phone: c.phone,
    assignedTo: ['Thu Hà', 'Minh Anh', 'Thanh Tùng', 'Phương Linh'][i % 4],
    lastVisit: `${25 - i}/02/2026`,
    daysSince: i * 3 + 1,
    serviceUsed: ['Triệt lông', 'Chăm sóc da', 'Botox', 'Filler', 'Nâng mũi', 'Massage', 'Điều trị mụn', 'Trị thâm', 'PRP', 'Laser', 'Ultherapy', 'Thermage'][i],
    status: i < 4 ? 'pending' : i < 8 ? 'contacted' : 'completed',
    note: ''
}))

export default function CustomerCareSelf() {
    const [data, setData] = useState(initialData)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [selected, setSelected] = useState([])
    const toast = useToast()

    const filtered = useMemo(() => data.filter(d => {
        const q = search.toLowerCase()
        const matchSearch = !search || d.name.toLowerCase().includes(q) || d.phone.includes(q)
        const matchStatus = !statusFilter || d.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    const toggleAll = () => setSelected(prev => prev.length === filtered.length ? [] : filtered.map(d => d.id))

    const handleTransfer = () => {
        if (selected.length === 0) return toast.warning('Chọn ít nhất 1 khách hàng')
        toast.success(`Đã chuyển ${selected.length} khách cho nhân viên khác`)
        setSelected([])
    }

    const handleExport = () => {
        const rows = (selected.length > 0 ? data.filter(d => selected.includes(d.id)) : data)
        const csv = 'Tên,SĐT,NV,Lần cuối,DV,Trạng thái\n' + rows.map(d => `${d.name},${d.phone},${d.assignedTo},${d.lastVisit},${d.serviceUsed},${d.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cham-soc-kh.csv'; a.click()
        toast.success(`Đã xuất ${rows.length} khách hàng`)
    }

    const handleMarkDone = (id) => {
        setData(prev => prev.map(d => d.id === id ? { ...d, status: 'completed' } : d))
        toast.success('Đã hoàn thành chăm sóc')
    }

    const pending = data.filter(d => d.status === 'pending').length
    const contacted = data.filter(d => d.status === 'contacted').length
    const completed = data.filter(d => d.status === 'completed').length

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Khách Hàng Chăm Sóc</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý danh sách khách hàng cần chăm sóc</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleTransfer} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiRepeat size={14} /> Chuyển ({selected.length})</button>
                    <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất hiển thị</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiUser color="#1a73e8" /></div><div><div className="stat-label">Tổng KH</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiCalendar color="#ff9800" /></div><div><div className="stat-label">Chờ chăm sóc</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPhone color="#1a73e8" /></div><div><div className="stat-label">Đã liên hệ</div><div className="stat-value" style={{ color: '#1a73e8' }}>{contacted}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckSquare color="#28a745" /></div><div><div className="stat-label">Hoàn thành</div><div className="stat-value" style={{ color: '#28a745' }}>{completed}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="pending">Chờ CS</option><option value="contacted">Đã LH</option><option value="completed">Hoàn thành</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr>
                        <th style={{ width: '40px' }}><button onClick={toggleAll} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{selected.length === filtered.length ? <FiCheckSquare size={16} color="var(--color-primary)" /> : <FiSquare size={16} />}</button></th>
                        <th>#</th><th>Khách Hàng</th><th>SĐT</th><th>NV phụ trách</th><th>Lần cuối</th><th>Dịch vụ gần nhất</th><th>Trạng thái</th><th>Thao tác</th>
                    </tr></thead>
                    <tbody>
                        {filtered.map((d, i) => (
                            <tr key={d.id} style={{ background: selected.includes(d.id) ? 'var(--color-primary-light)' : d.status === 'pending' ? '#fffbeb' : 'transparent' }}>
                                <td><button onClick={() => toggleSelect(d.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{selected.includes(d.id) ? <FiCheckSquare size={16} color="var(--color-primary)" /> : <FiSquare size={16} />}</button></td>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{d.name}</td>
                                <td style={{ color: 'var(--color-primary)' }}>{d.phone}</td>
                                <td>{d.assignedTo}</td>
                                <td>{d.lastVisit} <span style={{ fontSize: '0.75rem', color: d.daysSince > 7 ? '#dc3545' : '#999' }}>({d.daysSince} ngày)</span></td>
                                <td><span className="badge badge-info">{d.serviceUsed}</span></td>
                                <td><span className={`badge badge-${d.status === 'completed' ? 'success' : d.status === 'contacted' ? 'info' : 'warning'}`}>{d.status === 'completed' ? 'Xong' : d.status === 'contacted' ? 'Đã LH' : 'Chờ'}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {d.status !== 'completed' && <button className="btn btn-sm btn-primary" onClick={() => handleMarkDone(d.id)}>✓</button>}
                                        <button className="btn btn-sm btn-secondary" onClick={() => toast.info(`Gọi ${d.name}`)}><FiPhone size={12} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
