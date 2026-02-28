import { useState, useMemo } from 'react'
import { FiSearch, FiCheck, FiClock, FiX, FiPhone, FiMessageSquare, FiEdit2, FiDownload, FiPieChart, FiAlertTriangle } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialData = [
    { id: 1, customerName: 'Vũ Ngọc', phone: '0100018552', service: 'Chăm sóc da cơ bản', treatmentDate: '25-02-2026', followUpDate: '04-03-2026', status: 'Chưa liên hệ', note: 'Kiểm tra tình trạng da sau 1 tuần' },
    { id: 2, customerName: 'Phan Thị Ngân', phone: '0100018553', service: 'Trị mụn chuyên sâu', treatmentDate: '22-02-2026', followUpDate: '01-03-2026', status: 'Đã liên hệ', note: 'KH phản hồi tích cực, da cải thiện' },
    { id: 3, customerName: 'Hà Trọng Tú', phone: '0100018556', service: 'Nâng cơ Hifu', treatmentDate: '20-02-2026', followUpDate: '06-03-2026', status: 'Chưa liên hệ', note: 'Theo dõi hiệu quả sau 2 tuần' },
    { id: 4, customerName: 'Kim Trang', phone: '0100018557', service: 'Filler môi', treatmentDate: '24-02-2026', followUpDate: '28-02-2026', status: 'Đã liên hệ', note: 'Hết sưng, hài lòng' },
    { id: 5, customerName: 'Nguyễn Tú Thảo', phone: '0100018554', service: 'Combo trẻ hóa da', treatmentDate: '26-02-2026', followUpDate: '05-03-2026', status: 'Chưa liên hệ', note: 'Liệu trình 3/5' },
]

export default function PostCare() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialData)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [editNote, setEditNote] = useState(null)

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(p => p.customerName.toLowerCase().includes(q) || p.phone.includes(q)) }
        if (statusFilter !== 'all') r = r.filter(p => p.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    // Date helpers
    const today = new Date()
    const parseDate = (d) => { if (!d) return null; const p = d.split(/[-/]/); return new Date(p[2], p[1] - 1, p[0]) }
    const daysSince = (d) => { const dt = parseDate(d); if (!dt) return 0; return Math.floor((today - dt) / 86400000) }
    const overdue = data.filter(p => { const d = parseDate(p.followUpDate); return d && d < today && p.status === 'Chưa liên hệ' }).length

    // Service analytics
    const svcMap = {}
    data.forEach(p => { svcMap[p.service] = (svcMap[p.service] || 0) + 1 })
    const svcEntries = Object.entries(svcMap).sort((a, b) => b[1] - a[1])
    const maxSvc = svcEntries[0]?.[1] || 1
    const svcColors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336']

    const handleExport = () => {
        const csv = 'Khách Hàng,SĐT,Dịch vụ,Ngày điều trị,Ngày follow-up,Trạng thái,Ghi chú\n' + filtered.map(p => `${p.customerName},${p.phone},${p.service},${p.treatmentDate},${p.followUpDate},${p.status},"${p.note}"`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cham-soc-sau-dieu-tri.csv'; a.click()
        addToast('Đã xuất CSV', 'success')
    }

    return (
        <div className="fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2>Chăm Sóc Sau Điều Trị</h2>
                    <p>Theo dõi tình trạng khách hàng sau điều trị</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiDownload size={14} /> Xuất dữ liệu
                </button>
            </div>

            <div className="stat-cards">
                <div className="stat-card"><div className="stat-card-icon orange"><FiClock /></div><div className="stat-card-info"><div className="stat-card-value">{data.filter(p => p.status === 'Chưa liên hệ').length}</div><div className="stat-card-label">Chưa liên hệ</div></div></div>
                <div className="stat-card"><div className="stat-card-icon green"><FiCheck /></div><div className="stat-card-info"><div className="stat-card-value">{data.filter(p => p.status === 'Đã liên hệ').length}</div><div className="stat-card-label">Đã liên hệ</div></div></div>
                <div className="stat-card"><div className="stat-card-icon blue"><FiCheck /></div><div className="stat-card-info"><div className="stat-card-value">{data.length}</div><div className="stat-card-label">Tổng cần chăm sóc</div></div></div>
                {overdue > 0 && (
                    <div className="stat-card" style={{ borderLeft: '3px solid #f44336' }}><div className="stat-card-icon" style={{ background: '#ffebee' }}><FiAlertTriangle color="#f44336" /></div><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#f44336' }}>{overdue}</div><div className="stat-card-label">Quá hạn</div></div></div>
                )}
            </div>

            {/* Service Analytics */}
            <div style={{ marginBottom: '20px' }}>
                <div className="stat-card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <FiPieChart size={16} color="#4caf50" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Dịch vụ cần chăm sóc</span>
                    </div>
                    {svcEntries.map(([svc, cnt], i) => (
                        <div key={svc} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.8rem', minWidth: '160px', color: 'var(--color-text-light)' }}>{svc}</span>
                            <div style={{ flex: 1, height: '12px', background: '#f0f0f0', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${(cnt / maxSvc) * 100}%`, height: '100%', background: svcColors[i % svcColors.length], borderRadius: '6px', transition: 'width 0.5s' }} />
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '0.85rem', minWidth: '30px', textAlign: 'right' }}>{cnt}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="Tìm khách hàng..." value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option><option value="Chưa liên hệ">Chưa liên hệ</option><option value="Đã liên hệ">Đã liên hệ</option>
                </select>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header"><span className="table-count">{filtered.length} khách hàng</span></div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead><tr><th>#</th><th>Khách Hàng</th><th>SĐT</th><th>Dịch vụ</th><th>Ngày điều trị</th><th>Số ngày</th><th>Ngày follow-up</th><th>Trạng thái</th><th>Ghi chú</th><th>Thao tác</th></tr></thead>
                        <tbody>
                            {filtered.map((p, i) => (
                                <tr key={p.id} style={{ background: (() => { const d = parseDate(p.followUpDate); return d && d < today && p.status === 'Chưa liên hệ' ? '#fff5f5' : 'transparent' })() }}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: 600 }}>{p.customerName}</td>
                                    <td style={{ color: 'var(--primary)' }}>{p.phone}</td>
                                    <td>{p.service}</td>
                                    <td>{p.treatmentDate}</td>
                                    <td><span className="badge badge-info" style={{ fontSize: '0.72rem' }}>{daysSince(p.treatmentDate)} ngày</span></td>
                                    <td>{p.followUpDate}</td>
                                    <td>
                                        <select value={p.status} onChange={e => {
                                            setData(prev => prev.map(x => x.id === p.id ? { ...x, status: e.target.value } : x))
                                            addToast(`Cập nhật trạng thái → ${e.target.value}`, 'success')
                                        }} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '0.78rem', background: p.status === 'Đã liên hệ' ? '#e8f5e9' : '#fff3e0', fontFamily: 'inherit', cursor: 'pointer' }}>
                                            <option value="Chưa liên hệ">Chưa liên hệ</option>
                                            <option value="Đã liên hệ">Đã liên hệ</option>
                                        </select>
                                    </td>
                                    <td style={{ maxWidth: '180px' }}>
                                        {editNote === p.id ? (
                                            <input type="text" defaultValue={p.note} autoFocus
                                                onBlur={e => { setData(prev => prev.map(x => x.id === p.id ? { ...x, note: e.target.value } : x)); setEditNote(null); addToast('Đã cập nhật ghi chú', 'success') }}
                                                onKeyDown={e => { if (e.key === 'Enter') e.target.blur() }}
                                                style={{ width: '100%', padding: '4px 8px', border: '1px solid var(--primary)', borderRadius: '6px', fontSize: '0.78rem' }} />
                                        ) : (
                                            <span style={{ fontSize: '0.78rem', cursor: 'pointer' }} onClick={() => setEditNote(p.id)}>
                                                {p.note} <FiEdit2 size={10} style={{ opacity: 0.5 }} />
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn btn-outline btn-sm" onClick={() => addToast(`Đang gọi ${p.customerName}...`, 'info')} style={{ fontSize: '0.72rem' }}><FiPhone size={12} /></button>
                                            <button className="btn btn-outline btn-sm" onClick={() => addToast(`Đã gửi SMS đến ${p.customerName}`, 'success')} style={{ fontSize: '0.72rem' }}><FiMessageSquare size={12} /></button>
                                        </div>
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
