import { useState, useMemo } from 'react'
import { FiCreditCard, FiDollarSign, FiSearch, FiX, FiPlus, FiTrash2, FiDownload, FiPieChart } from 'react-icons/fi'
import { prepaidCards as initialCards, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function PrepaidCards() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialCards)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [deleteId, setDeleteId] = useState(null)
    const [showCreate, setShowCreate] = useState(false)
    const [useCardId, setUseCardId] = useState(null)
    const [useAmount, setUseAmount] = useState(0)
    const [form, setForm] = useState({ customerName: '', phone: '', cardType: 'Spa', totalValue: 5000000 })

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(c => c.customerName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.phone.includes(q)) }
        if (statusFilter !== 'all') r = r.filter(c => c.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    const totalValue = data.reduce((s, c) => s + c.totalValue, 0)
    const totalUsed = data.reduce((s, c) => s + c.usedValue, 0)
    const totalRemaining = data.reduce((s, c) => s + c.remaining, 0)

    const handleCreate = () => {
        if (!form.customerName || !form.phone) return
        const card = { id: `TT${String(data.length + 1).padStart(3, '0')}`, ...form, usedValue: 0, remaining: form.totalValue, status: 'active', created: new Date().toLocaleDateString('vi-VN'), expiry: '27/02/2028' }
        setData(prev => [...prev, card]); setShowCreate(false); setForm({ customerName: '', phone: '', cardType: 'Spa', totalValue: 5000000 })
        addToast(`Đã tạo thẻ trả trước cho ${card.customerName}`, 'success')
    }

    const handleUse = () => {
        if (!useAmount || useAmount <= 0) return
        const card = data.find(c => c.id === useCardId)
        if (useAmount > card.remaining) { addToast('Số tiền vượt quá số dư', 'error'); return }
        setData(prev => prev.map(c => c.id === useCardId ? { ...c, usedValue: c.usedValue + useAmount, remaining: c.remaining - useAmount } : c))
        addToast(`Đã sử dụng ${formatCurrency(useAmount)} từ thẻ ${useCardId}`, 'success')
        setUseCardId(null); setUseAmount(0)
    }

    const handleDelete = () => { setData(prev => prev.filter(c => c.id !== deleteId)); addToast('Đã hủy thẻ', 'info'); setDeleteId(null) }

    return (
        <div className="fade-in">
            <ConfirmDialog isOpen={!!deleteId} title="Hủy thẻ trả trước?" message="Hành động này không thể hoàn tác."
                onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />

            {/* Use card modal */}
            {useCardId && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '380px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Sử dụng thẻ {useCardId}</h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginBottom: '16px' }}>Số dư: {formatCurrency(data.find(c => c.id === useCardId)?.remaining || 0)}</p>
                        <input type="number" value={useAmount} onChange={e => setUseAmount(Number(e.target.value))} placeholder="Số tiền sử dụng"
                            style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', marginBottom: '16px', fontSize: '0.9rem' }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setUseCardId(null)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleUse} className="btn btn-primary">Xác nhận</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            {/* Create modal */}
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '460px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Tạo Thẻ Trả Trước</h3>
                            <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Tên KH *</label>
                                    <input type="text" value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))}
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>SĐT *</label>
                                    <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Loại thẻ</label>
                                    <select value={form.cardType} onChange={e => setForm(p => ({ ...p, cardType: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        <option>Spa</option><option>Triệt lông</option><option>Combo</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Giá trị (VNĐ)</label>
                                    <input type="number" value={form.totalValue} onChange={e => setForm(p => ({ ...p, totalValue: Number(e.target.value) }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                            <button onClick={() => setShowCreate(false)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleCreate} className="btn btn-primary">Tạo thẻ</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h2>Thẻ Trả Trước</h2><p>Quản lý thẻ trả trước và số dư</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = 'Mã,Khách hàng,SĐT,Loại,Tổng GT,Đã dùng,Còn lại,Trạng thái\n' + data.map(c => `${c.id},${c.customerName},${c.phone},${c.cardType},${c.totalValue},${c.usedValue},${c.remaining},${c.status}`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'the-tra-truoc.csv'; a.click()
                        addToast('Đã xuất CSV', 'success')
                    }}><FiDownload size={14} /> Xuất dữ liệu</button>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><FiPlus size={14} /> Tạo thẻ mới</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiCreditCard color="#1a73e8" /></div><div><div className="stat-label">Tổng thẻ</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiDollarSign color="#28a745" /></div><div><div className="stat-label">Tổng giá trị</div><div className="stat-value" style={{ color: '#28a745', fontSize: '0.9rem' }}>{formatCurrency(totalValue)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiDollarSign color="#ff9800" /></div><div><div className="stat-label">Đã sử dụng</div><div className="stat-value" style={{ color: '#ff9800', fontSize: '0.9rem' }}>{formatCurrency(totalUsed)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiDollarSign color="#9c27b0" /></div><div><div className="stat-label">Còn lại</div><div className="stat-value" style={{ color: '#9c27b0', fontSize: '0.9rem' }}>{formatCurrency(totalRemaining)}</div></div></div>
            </div>

            {/* Usage Analytics + Type Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><FiCreditCard size={14} color="var(--color-primary)" /> Tỉ lệ sử dụng tổng</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: totalValue > 0 && (totalUsed / totalValue * 100) >= 70 ? '#dc3545' : '#28a745' }}>{totalValue > 0 ? Math.round(totalUsed / totalValue * 100) : 0}%</span>
                    </div>
                    <div style={{ height: '12px', background: '#e9ecef', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${totalValue > 0 ? (totalUsed / totalValue) * 100 : 0}%`, height: '100%', borderRadius: '6px', background: 'linear-gradient(90deg, #28a745, #ff9800)', transition: 'width 0.5s' }} />
                    </div>
                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                        <span>Đã dùng: {formatCurrency(totalUsed)}</span>
                        <span>Tổng: {formatCurrency(totalValue)}</span>
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Phân bố loại thẻ</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {['Spa', 'Triệt lông', 'Combo'].map(type => {
                            const count = data.filter(c => c.cardType === type).length
                            const colors = { Spa: '#1a73e8', 'Triệt lông': '#e91e63', Combo: '#ff9800' }
                            return (
                                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '70px', fontSize: '0.78rem', fontWeight: 500 }}>{type}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${data.length > 0 ? (count / data.length) * 100 : 0}%`, height: '100%', borderRadius: '4px', background: colors[type] || '#999', transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 600, minWidth: '20px', textAlign: 'right' }}>{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm theo tên, mã, SĐT..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option><option value="active">Hoạt động</option><option value="expired">Hết hạn</option>
                </select>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header"><span className="table-count">{filtered.length} / {data.length} thẻ</span></div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead><tr><th>Mã thẻ</th><th>Khách hàng</th><th>SĐT</th><th>Loại</th><th>Tổng giá trị</th><th>Đã dùng</th><th>Còn lại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                        <tbody>{filtered.length === 0 ? (<tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy</td></tr>) :
                            filtered.map(c => {
                                const pct = Math.round((c.usedValue / c.totalValue) * 100)
                                return (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 600 }}>{c.id}</td>
                                        <td>{c.customerName}</td><td>{c.phone}</td><td>{c.cardType}</td>
                                        <td>{formatCurrency(c.totalValue)}</td>
                                        <td>
                                            <div>{formatCurrency(c.usedValue)}</div>
                                            <div style={{ width: '60px', height: '4px', background: '#e9ecef', borderRadius: '2px', marginTop: '4px' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: pct > 80 ? '#dc3545' : '#28a745', borderRadius: '2px' }} />
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 600, color: c.remaining > 0 ? '#28a745' : '#dc3545' }}>{formatCurrency(c.remaining)}</td>
                                        <td><span className={`badge badge-${c.status === 'active' ? 'arrived' : 'cancelled'}`}>{c.status === 'active' ? 'Hoạt động' : 'Hết hạn'}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn btn-outline btn-sm" onClick={() => { setUseCardId(c.id); setUseAmount(0) }} style={{ fontSize: '0.72rem' }}>Sử dụng</button>
                                                <button className="btn-icon" onClick={() => setDeleteId(c.id)}><FiTrash2 size={14} color="var(--accent-red)" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
