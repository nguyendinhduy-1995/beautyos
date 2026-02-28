import { useState, useMemo } from 'react'
import { FiSearch, FiDownload, FiPhone, FiPhoneIncoming, FiPhoneOutgoing, FiPhoneMissed, FiClock, FiPlay, FiEye, FiX } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const callHistory = customers.slice(0, 12).map((c, i) => ({
    id: i + 1, name: c.name, phone: c.phone,
    type: i % 3 === 0 ? 'incoming' : i % 3 === 1 ? 'outgoing' : 'missed',
    duration: i % 3 === 2 ? '0:00' : `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    durationSec: i % 3 === 2 ? 0 : Math.floor(Math.random() * 600) + 60,
    date: `27/02/2026 ${9 + i}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    staff: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'][i % 4],
    hasRecording: i % 3 !== 2 && i % 2 === 0,
    notes: i === 0 ? 'Khách hỏi về dịch vụ trị mụn' : i === 3 ? 'Đặt lịch hẹn ngày 01/03' : ''
}))

export default function CallHistory() {
    const [data] = useState(callHistory)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [detailItem, setDetailItem] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(c => {
        const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
        const matchType = !typeFilter || c.type === typeFilter
        return matchSearch && matchType
    }), [data, search, typeFilter])

    const incoming = data.filter(c => c.type === 'incoming').length
    const outgoing = data.filter(c => c.type === 'outgoing').length
    const missed = data.filter(c => c.type === 'missed').length
    const totalDuration = data.reduce((s, c) => s + (c.durationSec || 0), 0)
    const avgDuration = data.filter(c => c.durationSec > 0).length > 0
        ? Math.round(totalDuration / data.filter(c => c.durationSec > 0).length) : 0
    const avgMin = Math.floor(avgDuration / 60)
    const avgSec = avgDuration % 60

    const handleCallback = (name) => toast.info(`Đang gọi lại cho ${name}...`)
    const handlePlayRecording = (name) => toast.info(`Đang phát ghi âm cuộc gọi với ${name}...`)

    const handleExport = () => {
        const csv = 'Tên,SĐT,Loại,Thời lượng,Thời gian,NV,Ghi chú\n' + filtered.map(c =>
            `${c.name},${c.phone},${c.type === 'incoming' ? 'Gọi đến' : c.type === 'outgoing' ? 'Gọi đi' : 'Nhỡ'},${c.duration},${c.date},${c.staff},${c.notes || ''}`
        ).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lich-su-goi.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    const TypeIcon = ({ type }) => {
        if (type === 'incoming') return <FiPhoneIncoming size={16} color="#28a745" />
        if (type === 'outgoing') return <FiPhoneOutgoing size={16} color="#1a73e8" />
        return <FiPhoneMissed size={16} color="#dc3545" />
    }
    const typeLabel = (t) => t === 'incoming' ? 'Gọi đến' : t === 'outgoing' ? 'Gọi đi' : 'Nhỡ'

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Lịch Sử Cuộc Gọi</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý cuộc gọi đến, đi và nhỡ</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất CSV</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPhone color="#1a73e8" /></div><div><div className="stat-label">Tổng</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiPhoneIncoming color="#28a745" /></div><div><div className="stat-label">Gọi đến</div><div className="stat-value" style={{ color: '#28a745' }}>{incoming}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPhoneOutgoing color="#1a73e8" /></div><div><div className="stat-label">Gọi đi</div><div className="stat-value" style={{ color: '#1a73e8' }}>{outgoing}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiPhoneMissed color="#dc3545" /></div><div><div className="stat-label">Nhỡ</div><div className="stat-value" style={{ color: '#dc3545' }}>{missed}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">TB thời lượng</div><div className="stat-value" style={{ color: '#ff9800', fontSize: '1rem' }}>{avgMin}:{String(avgSec).padStart(2, '0')}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="">Tất cả</option>
                    <option value="incoming">Gọi đến</option>
                    <option value="outgoing">Gọi đi</option>
                    <option value="missed">Nhỡ</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr><th>#</th><th>Loại</th><th>Khách hàng</th><th>SĐT</th><th>Thời lượng</th><th>Thời gian</th><th>Nhân viên</th><th>Ghi âm</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {filtered.map((c, i) => (
                            <tr key={c.id} style={{ background: c.type === 'missed' ? '#fff5f5' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <TypeIcon type={c.type} />
                                        <span style={{ fontSize: '0.78rem', color: c.type === 'missed' ? '#dc3545' : 'var(--color-text-light)' }}>{typeLabel(c.type)}</span>
                                    </div>
                                </td>
                                <td style={{ fontWeight: '500' }}>{c.name}</td>
                                <td>{c.phone}</td>
                                <td><span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace' }}><FiClock size={12} /> {c.duration}</span></td>
                                <td style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{c.date}</td>
                                <td>{c.staff}</td>
                                <td>
                                    {c.hasRecording ? (
                                        <button className="btn btn-sm btn-secondary" onClick={() => handlePlayRecording(c.name)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                                            <FiPlay size={12} /> Phát
                                        </button>
                                    ) : <span style={{ color: '#ccc', fontSize: '0.78rem' }}>—</span>}
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn-icon" title="Chi tiết" onClick={() => setDetailItem(c)}><FiEye size={14} /></button>
                                        {c.type === 'missed' && (
                                            <button className="btn btn-sm btn-primary" onClick={() => handleCallback(c.name)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FiPhone size={13} /> Gọi lại
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {detailItem && (
                <div className="modal-overlay" onClick={() => setDetailItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>📞 Chi Tiết Cuộc Gọi</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '50%', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: detailItem.type === 'incoming' ? '#e8f5e9' : detailItem.type === 'outgoing' ? '#e3f2fd' : '#ffebee'
                                }}>
                                    <TypeIcon type={detailItem.type} />
                                </div>
                                <h3 style={{ margin: 0 }}>{detailItem.name}</h3>
                                <span className={`badge badge-${detailItem.type === 'missed' ? 'danger' : 'success'}`} style={{ marginTop: '4px' }}>{typeLabel(detailItem.type)}</span>
                            </div>
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {[['📱 SĐT', detailItem.phone], ['🕐 Thời gian', detailItem.date], ['⏱️ Thời lượng', detailItem.duration], ['👤 Nhân viên', detailItem.staff], ['🎙️ Ghi âm', detailItem.hasRecording ? 'Có' : 'Không']].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                            {detailItem.notes && (
                                <div style={{ marginTop: '12px', padding: '10px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem' }}>
                                    <strong>Ghi chú:</strong> {detailItem.notes}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
