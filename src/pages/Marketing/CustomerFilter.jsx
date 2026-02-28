import { useState, useMemo } from 'react'
import { FiSearch, FiDownload, FiSend, FiFilter, FiUsers, FiCheckCircle } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const serviceOptions = ['Triệt lông', 'Chăm sóc da', 'Botox', 'Filler', 'Nâng mũi', 'Massage', 'Điều trị mụn', 'Trị thâm', 'PRP', 'Laser']
const sourceOptions = ['Facebook', 'Google', 'Zalo', 'Giới thiệu', 'Khách vãng lai']
const groupOptions = ['VIP', 'Gold', 'Silver', 'Thường']

const allCustomers = customers.map((c, i) => ({
    ...c,
    services: [serviceOptions[i % 10], serviceOptions[(i + 3) % 10]],
    source: sourceOptions[i % 5],
    group: groupOptions[i % 4],
    totalSpent: (Math.floor(Math.random() * 20) + 1) * 500000,
    visits: Math.floor(Math.random() * 15) + 1,
    lastVisit: `${25 - (i % 20)}/02/2026`,
    status: i % 5 === 0 ? 'inactive' : 'active'
}))

export default function CustomerFilter() {
    const [serviceFilter, setServiceFilter] = useState('')
    const [sourceFilter, setSourceFilter] = useState('')
    const [groupFilter, setGroupFilter] = useState('')
    const [minVisits, setMinVisits] = useState('')
    const [maxDays, setMaxDays] = useState('')
    const [search, setSearch] = useState('')
    const toast = useToast()

    const filtered = useMemo(() => allCustomers.filter(c => {
        if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false
        if (serviceFilter && !c.services.includes(serviceFilter)) return false
        if (sourceFilter && c.source !== sourceFilter) return false
        if (groupFilter && c.group !== groupFilter) return false
        if (minVisits && c.visits < parseInt(minVisits)) return false
        return true
    }), [search, serviceFilter, sourceFilter, groupFilter, minVisits])

    const handleExport = () => {
        const csv = 'Tên,SĐT,Nhóm,Nguồn,Lần cuối,Tổng chi\n' + filtered.map(c => `${c.name},${c.phone},${c.group},${c.source},${c.lastVisit},${c.totalSpent}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'loc-khach-hang.csv'; a.click()
        toast.success(`Đã xuất ${filtered.length} khách hàng`)
    }

    const handleSendSMS = () => {
        toast.info(`Gửi SMS cho ${filtered.length} khách hàng`)
    }

    const clearFilters = () => {
        setServiceFilter(''); setSourceFilter(''); setGroupFilter(''); setMinVisits(''); setMaxDays(''); setSearch('')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Lọc Khách Hàng</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Phân loại và lọc khách hàng theo tiêu chí</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={handleSendSMS} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiSend size={14} /> Gửi SMS ({filtered.length})</button>
                    <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất CSV</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiUsers color="#1a73e8" /></div><div><div className="stat-label">Tổng KH phù hợp</div><div className="stat-value">{filtered.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">KH hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{filtered.filter(c => c.status === 'active').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiFilter color="#ff9800" /></div><div><div className="stat-label">Bộ lọc đang dùng</div><div className="stat-value" style={{ color: '#ff9800' }}>{[serviceFilter, sourceFilter, groupFilter, minVisits].filter(Boolean).length}</div></div></div>
            </div>

            {/* Advanced Filters */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '1px solid var(--color-border)' }}>
                <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}><FiFilter size={16} /> Bộ lọc nâng cao</h3>
                    <button className="btn btn-sm btn-secondary" onClick={clearFilters}>Xoá bộ lọc</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                    <div className="form-group"><label style={{ fontSize: '0.8rem' }}>Dịch vụ</label>
                        <select className="form-control" value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}>
                            <option value="">Tất cả DV</option>{serviceOptions.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label style={{ fontSize: '0.8rem' }}>Nguồn</label>
                        <select className="form-control" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
                            <option value="">Tất cả nguồn</option>{sourceOptions.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label style={{ fontSize: '0.8rem' }}>Nhóm KH</label>
                        <select className="form-control" value={groupFilter} onChange={e => setGroupFilter(e.target.value)}>
                            <option value="">Tất cả nhóm</option>{groupOptions.map(g => <option key={g}>{g}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label style={{ fontSize: '0.8rem' }}>Lần đến tối thiểu</label>
                        <input className="form-control" type="number" placeholder="VD: 3" value={minVisits} onChange={e => setMinVisits(e.target.value)} />
                    </div>
                    <div className="form-group"><label style={{ fontSize: '0.8rem' }}>Tìm kiếm</label>
                        <input className="form-control" placeholder="Tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>Khách Hàng</th><th>SĐT</th><th>Nhóm</th><th>Nguồn</th><th>Dịch vụ</th><th>Số lần đến</th><th>Lần cuối</th><th>Tổng chi</th></tr></thead>
                    <tbody>
                        {filtered.slice(0, 20).map((c, i) => (
                            <tr key={c.id || i}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{c.name}</td>
                                <td style={{ color: 'var(--color-primary)' }}>{c.phone}</td>
                                <td><span className={`badge badge-${c.group === 'VIP' ? 'danger' : c.group === 'Gold' ? 'warning' : 'info'}`}>{c.group}</span></td>
                                <td style={{ fontSize: '0.85rem' }}>{c.source}</td>
                                <td>{c.services.map((s, j) => <span key={j} className="badge badge-info" style={{ marginRight: '4px', fontSize: '0.75rem' }}>{s}</span>)}</td>
                                <td style={{ fontWeight: '600' }}>{c.visits}</td>
                                <td style={{ fontSize: '0.85rem' }}>{c.lastVisit}</td>
                                <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{c.totalSpent.toLocaleString()}₫</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length > 20 && <div style={{ padding: '12px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Hiển thị 20/{filtered.length} kết quả</div>}
            </div>
        </div>
    )
}
