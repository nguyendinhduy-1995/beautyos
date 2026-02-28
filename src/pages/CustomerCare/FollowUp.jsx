import { useState, useMemo } from 'react'
import { followUps as initialFollowUps } from '../../data/mockData'
import { FiPhone, FiMessageSquare, FiSearch, FiX, FiEdit2, FiCheck, FiDownload, FiPieChart, FiAlertTriangle } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

export default function FollowUp() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialFollowUps)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [editingNote, setEditingNote] = useState(null)
    const [noteText, setNoteText] = useState('')

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(i => i.customerName.toLowerCase().includes(q) || i.phone.includes(q)) }
        if (statusFilter !== 'all') r = r.filter(i => i.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    const handleStatusChange = (id, newStatus) => {
        setData(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i))
        addToast(`Đã cập nhật trạng thái → ${newStatus}`, 'success')
    }

    const handleSaveNote = (id) => {
        setData(prev => prev.map(i => i.id === id ? { ...i, note: noteText } : i))
        setEditingNote(null)
        addToast('Đã lưu ghi chú', 'success')
    }

    const handleCall = (name, phone) => addToast(`Đang gọi ${name}: ${phone}...`, 'info')
    const handleSms = (name) => addToast(`Gửi tin nhắn cho ${name}`, 'info')

    const handleExport = () => {
        const csv = 'Khách Hàng,SĐT,Lần khám cuối,Dịch vụ,Ngày follow-up,Trạng thái,Ghi chú\n' + filtered.map(i => `${i.customerName},${i.phone},${i.lastVisit},${i.service},${i.nextFollowUp},${i.status},"${i.note}"`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'nhac-lich-hen.csv'; a.click()
        addToast('Đã xuất CSV', 'success')
    }

    // Service distribution
    const serviceMap = {}
    data.forEach(i => { serviceMap[i.service] = (serviceMap[i.service] || 0) + 1 })
    const serviceEntries = Object.entries(serviceMap).sort((a, b) => b[1] - a[1])
    const maxSvc = serviceEntries[0]?.[1] || 1
    const svcColors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336']

    // Overdue count
    const today = new Date()
    const parseDate = (d) => { if (!d) return null; const p = d.split(/[-/]/); return new Date(p[2], p[1] - 1, p[0]) }
    const overdue = data.filter(i => { const d = parseDate(i.nextFollowUp); return d && d < today && i.status === 'Chưa liên hệ' }).length

    return (
        <div className="fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2>Nhắc lịch hẹn</h2>
                    <p>Danh sách khách hàng cần follow-up và nhắc lịch</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiDownload size={14} /> Xuất dữ liệu
                </button>
            </div>

            <div className="stat-cards">
                <div className="stat-card"><div className="stat-card-icon orange"><FiPhone /></div><div className="stat-card-info"><div className="stat-card-value">{data.filter(i => i.status === 'Chưa liên hệ').length}</div><div className="stat-card-label">Chưa liên hệ</div></div></div>
                <div className="stat-card"><div className="stat-card-icon blue"><FiMessageSquare /></div><div className="stat-card-info"><div className="stat-card-value">{data.filter(i => i.status === 'Đã liên hệ').length}</div><div className="stat-card-label">Đã liên hệ</div></div></div>
                <div className="stat-card"><div className="stat-card-icon green"><FiCheck /></div><div className="stat-card-info"><div className="stat-card-value">{data.filter(i => i.status === 'Đã hẹn').length}</div><div className="stat-card-label">Đã hẹn</div></div></div>
                {overdue > 0 && (
                    <div className="stat-card" style={{ borderLeft: '3px solid #f44336' }}><div className="stat-card-icon" style={{ background: '#ffebee' }}><FiAlertTriangle color="#f44336" /></div><div className="stat-card-info"><div className="stat-card-value" style={{ color: '#f44336' }}>{overdue}</div><div className="stat-card-label">Quá hạn</div></div></div>
                )}
            </div>

            {/* Analytics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', marginBottom: '20px' }}>
                <div className="stat-card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <FiPieChart size={16} color="#4caf50" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Dịch vụ cần follow-up</span>
                    </div>
                    {serviceEntries.map(([svc, cnt], i) => (
                        <div key={svc} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.8rem', minWidth: '140px', color: 'var(--color-text-light)' }}>{svc}</span>
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
                    <input type="text" placeholder="Tìm theo tên, số điện thoại..." value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="Chưa liên hệ">Chưa liên hệ</option><option value="Đã liên hệ">Đã liên hệ</option><option value="Đã hẹn">Đã hẹn</option>
                </select>
                <button className="btn btn-ok" onClick={() => { setSearch(''); setStatusFilter('all') }}>Xóa lọc</button>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header"><span className="table-count">{filtered.length} / {data.length} khách hàng</span></div>
                <div className="table-wrapper">
                    <table className="data-table" id="followup-table">
                        <thead><tr><th>#</th><th>Khách Hàng</th><th>Số Điện Thoại</th><th>Lần khám cuối</th><th>Dịch vụ</th><th>Ngày follow-up</th><th>Trạng thái</th><th>Ghi chú</th><th>Thao tác</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? (<tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy</td></tr>) :
                                filtered.map((item, idx) => (
                                    <tr key={item.id} style={{ background: (() => { const d = parseDate(item.nextFollowUp); return d && d < today && item.status === 'Chưa liên hệ' ? '#fff5f5' : 'transparent' })() }}>
                                        <td>{idx + 1}</td>
                                        <td style={{ fontWeight: 500 }}>{item.customerName}</td>
                                        <td><span className="link-green">{item.phone}</span></td>
                                        <td>{item.lastVisit}</td>
                                        <td>{item.service}</td>
                                        <td>{item.nextFollowUp}</td>
                                        <td>
                                            <select value={item.status} onChange={e => handleStatusChange(item.id, e.target.value)}
                                                style={{
                                                    padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', background: 'white',
                                                    color: item.status === 'Chưa liên hệ' ? 'var(--accent-orange)' : item.status === 'Đã hẹn' ? 'var(--accent-green)' : 'var(--primary)'
                                                }}>
                                                <option value="Chưa liên hệ">Chưa liên hệ</option><option value="Đã liên hệ">Đã liên hệ</option><option value="Đã hẹn">Đã hẹn</option>
                                            </select>
                                        </td>
                                        <td style={{ maxWidth: '180px' }}>
                                            {editingNote === item.id ? (
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <input type="text" value={noteText} onChange={e => setNoteText(e.target.value)}
                                                        style={{ width: '100%', padding: '4px 8px', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.8rem' }} />
                                                    <button className="btn-icon" onClick={() => handleSaveNote(item.id)}><FiCheck size={14} color="var(--accent-green)" /></button>
                                                    <button className="btn-icon" onClick={() => setEditingNote(null)}><FiX size={14} /></button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                                                    <span>{item.note}</span>
                                                    <button className="btn-icon" onClick={() => { setEditingNote(item.id); setNoteText(item.note) }}><FiEdit2 size={12} /></button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn-icon" title="Gọi điện" onClick={() => handleCall(item.customerName, item.phone)}><FiPhone size={14} /></button>
                                                <button className="btn-icon" title="Nhắn tin" onClick={() => handleSms(item.customerName)}><FiMessageSquare size={14} /></button>
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
