import { useState, useMemo } from 'react'
import { FiGift, FiPhone, FiSearch, FiX, FiMessageSquare, FiSend, FiDownload, FiCalendar, FiUsers } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function Birthday() {
    const toast = useToast()
    const [search, setSearch] = useState('')
    const [monthFilter, setMonthFilter] = useState('current')
    const [sent, setSent] = useState({})
    const [showSmsModal, setShowSmsModal] = useState(null)
    const [smsText, setSmsText] = useState('')

    const birthdayCustomers = customers.map(c => ({
        ...c,
        birthdayMonth: parseInt(c.dob.split('/')[1]),
        birthdayDay: parseInt(c.dob.split('/')[0])
    }))

    const currentMonth = new Date().getMonth() + 1
    const targetMonth = monthFilter === 'current' ? currentMonth : monthFilter === 'next' ? (currentMonth % 12) + 1 : null

    const filtered = useMemo(() => {
        let r = targetMonth ? birthdayCustomers.filter(c => c.birthdayMonth === targetMonth) : birthdayCustomers
        if (search) { const q = search.toLowerCase(); r = r.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q)) }
        return r.sort((a, b) => a.birthdayDay - b.birthdayDay)
    }, [search, targetMonth])

    const thisMonth = birthdayCustomers.filter(c => c.birthdayMonth === currentMonth)
    const nextMonth = birthdayCustomers.filter(c => c.birthdayMonth === (currentMonth % 12) + 1)
    const sentCount = Object.values(sent).filter(Boolean).length

    const handleCall = (c) => toast.info(`📞 Đang gọi ${c.name} (${c.phone})...`)
    const handleGift = (c) => {
        setSent(p => ({ ...p, [c.id]: true }))
        toast.success(`🎁 Đã gửi quà sinh nhật cho ${c.name}!`)
    }
    const openSms = (c) => {
        setShowSmsModal(c)
        setSmsText(`Chúc mừng sinh nhật ${c.name}! 🎂 Salon Beauty gửi tặng bạn voucher giảm 20% cho lần chăm sóc tiếp theo. HSD: 30 ngày.`)
    }
    const sendSms = () => {
        toast.success(`📱 Đã gửi SMS chúc mừng đến ${showSmsModal.name}`)
        setSent(p => ({ ...p, [showSmsModal.id]: true }))
        setShowSmsModal(null)
    }
    const sendAll = () => {
        const unsent = filtered.filter(c => !sent[c.id])
        unsent.forEach(c => setSent(p => ({ ...p, [c.id]: true })))
        toast.success(`🎉 Đã gửi lời chúc đến ${unsent.length} khách hàng!`)
    }
    const handleExport = () => {
        const csv = 'Mã KH,Tên,Ngày sinh,SĐT,Nhóm,Đã gửi\n' + filtered.map(c =>
            `${c.id},${c.name},${c.dob},${c.phone},${c.group},${sent[c.id] ? 'Có' : 'Chưa'}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sinh-nhat-khach-hang.csv'; a.click()
        toast.success('Đã xuất file CSV')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">🎂 Sinh Nhật Khách Hàng</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý chúc mừng sinh nhật và tặng quà</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-primary" onClick={sendAll}><FiSend size={14} /> Gửi tất cả ({filtered.filter(c => !sent[c.id]).length})</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiGift color="#e91e63" /></div><div><div className="stat-label">🎂 Tháng {currentMonth}</div><div className="stat-value" style={{ color: '#e91e63' }}>{thisMonth.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCalendar color="#1a73e8" /></div><div><div className="stat-label">📅 Tháng {(currentMonth % 12) + 1}</div><div className="stat-value">{nextMonth.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiUsers color="#9c27b0" /></div><div><div className="stat-label">Tổng KH</div><div className="stat-value">{customers.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiSend color="#28a745" /></div><div><div className="stat-label">Đã gửi</div><div className="stat-value" style={{ color: '#28a745' }}>{sentCount}</div></div></div>
            </div>

            {/* Birthday Calendar + Upcoming */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {/* Monthly Distribution */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>📅 Phân bố sinh nhật theo tháng</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
                            const count = birthdayCustomers.filter(c => c.birthdayMonth === m).length
                            const maxCount = Math.max(...Array.from({ length: 12 }, (_, i) => birthdayCustomers.filter(c => c.birthdayMonth === i + 1).length), 1)
                            const intensity = count / maxCount
                            return (
                                <div key={m} onClick={() => { setMonthFilter('all'); setSearch('') }} style={{
                                    padding: '8px 4px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer',
                                    background: m === currentMonth ? '#fce4ec' : `rgba(26, 115, 232, ${intensity * 0.2 + 0.05})`,
                                    border: m === currentMonth ? '2px solid #e91e63' : '1px solid transparent',
                                    transition: 'all 0.2s'
                                }}>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>T{m}</div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: m === currentMonth ? '#e91e63' : 'var(--color-text)' }}>{count}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Upcoming 7 days */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>🎉 Sắp sinh nhật (7 ngày tới)</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {(() => {
                            const today = new Date()
                            const upcoming = birthdayCustomers.filter(c => {
                                const bd = new Date(today.getFullYear(), c.birthdayMonth - 1, c.birthdayDay)
                                const diff = (bd - today) / (1000 * 60 * 60 * 24)
                                return diff >= 0 && diff <= 7
                            }).slice(0, 4)
                            return upcoming.length > 0 ? upcoming.map(c => (
                                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#fffbeb', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                                    <span style={{ fontSize: '1.3rem' }}>🎂</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.name}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{c.dob} • {c.phone}</div>
                                    </div>
                                    <span className={`badge badge-${c.group === 'VIP' ? 'cancelled' : 'success'}`} style={{ fontSize: '0.68rem' }}>{c.group}</span>
                                </div>
                            )) : (
                                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-light)', fontSize: '0.82rem' }}>
                                    ✅ Không có sinh nhật trong 7 ngày tới
                                </div>
                            )
                        })()}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm tên, SĐT..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={monthFilter} onChange={e => setMonthFilter(e.target.value)}>
                    <option value="current">Tháng {currentMonth}</option>
                    <option value="next">Tháng {(currentMonth % 12) + 1}</option>
                    <option value="all">Tất cả</option>
                </select>
                {search && <button className="btn btn-secondary" onClick={() => setSearch('')}><FiX size={14} /> Xóa lọc</button>}
            </div>

            <div className="table-container">
                <div style={{ padding: '8px 16px', fontSize: '0.82rem', color: 'var(--color-text-light)', borderBottom: '1px solid var(--color-border)' }}>{filtered.length} khách hàng</div>
                <table className="data-table">
                    <thead><tr><th>#</th><th>Mã KH</th><th>Tên</th><th>Ngày sinh</th><th>SĐT</th><th>Nhóm</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy khách hàng</td></tr>
                        ) : filtered.map((c, i) => (
                            <tr key={c.id} style={{ background: sent[c.id] ? '#f0fdf4' : undefined }}>
                                <td>{i + 1}</td>
                                <td style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{c.id}</td>
                                <td style={{ fontWeight: 600 }}>{c.name}</td>
                                <td>🎂 {c.dob}</td>
                                <td style={{ color: 'var(--color-primary)' }}>{c.phone}</td>
                                <td><span className={`badge badge-${c.group === 'VIP' ? 'cancelled' : c.group === 'Gold' ? 'warning' : 'success'}`}>{c.group}</span></td>
                                <td>{sent[c.id] ? <span className="badge badge-success">✓ Đã gửi</span> : <span className="badge badge-secondary">Chưa gửi</span>}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCall(c)} title="Gọi điện"><FiPhone size={12} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => openSms(c)} title="Gửi SMS"><FiMessageSquare size={12} /></button>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleGift(c)} title="Gửi quà" disabled={sent[c.id]}><FiGift size={12} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* SMS Modal */}
            {showSmsModal && (
                <div className="modal-overlay" onClick={() => setShowSmsModal(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>📱 Gửi SMS Chúc Sinh Nhật</h2><button className="btn-close" onClick={() => setShowSmsModal(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '12px', fontSize: '0.85rem' }}>
                                <strong>{showSmsModal.name}</strong> — {showSmsModal.phone}<br />
                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>Sinh nhật: {showSmsModal.dob}</span>
                            </div>
                            <div className="form-group">
                                <label>Nội dung SMS</label>
                                <textarea className="form-control" rows="4" value={smsText} onChange={e => setSmsText(e.target.value)} style={{ resize: 'vertical' }} />
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{smsText.length} ký tự</div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowSmsModal(null)}>Huỷ</button><button className="btn btn-primary" onClick={sendSms}><FiSend size={14} /> Gửi SMS</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
