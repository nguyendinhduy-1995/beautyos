import { useState, useMemo } from 'react'
import { memberCards as initialCards, formatCurrency } from '../../data/mockData'
import { FiSearch, FiCreditCard, FiPlus, FiX, FiDollarSign, FiTrash2 } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function MembershipCards() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialCards)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [showTopUp, setShowTopUp] = useState(null)
    const [topUpAmount, setTopUpAmount] = useState(5000000)
    const [showCreate, setShowCreate] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [newCard, setNewCard] = useState({ customerName: '', type: 'VIP Gold' })

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(c => c.customerName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.customerId.toLowerCase().includes(q)) }
        if (typeFilter !== 'all') r = r.filter(c => c.type === typeFilter)
        return r
    }, [data, search, typeFilter])

    const totalBalance = data.reduce((s, c) => s + c.balance, 0)
    const types = [...new Set(data.map(c => c.type))]

    const handleTopUp = () => {
        if (!topUpAmount || topUpAmount <= 0) return
        setData(prev => prev.map(c => c.id === showTopUp ? { ...c, balance: c.balance + topUpAmount, totalDeposit: c.totalDeposit + topUpAmount } : c))
        addToast(`Đã nạp ${formatCurrency(topUpAmount)} vào thẻ ${showTopUp}`, 'success')
        setShowTopUp(null); setTopUpAmount(5000000)
    }

    const handleCreate = () => {
        if (!newCard.customerName) return
        const card = { id: `THE${String(data.length + 1).padStart(3, '0')}`, customerId: `KH_${String(Math.floor(Math.random() * 100000)).padStart(7, '0')}`, ...newCard, balance: 0, totalDeposit: 0, status: 'active', created: new Date().toLocaleDateString('vi-VN'), expiry: '27/02/2028' }
        setData(prev => [...prev, card]); setShowCreate(false); setNewCard({ customerName: '', type: 'VIP Gold' })
        addToast(`Đã tạo thẻ ${card.type} cho ${card.customerName}`, 'success')
    }

    const handleDelete = () => { setData(prev => prev.filter(c => c.id !== deleteId)); addToast('Đã hủy thẻ', 'info'); setDeleteId(null) }

    return (
        <div className="fade-in">
            <ConfirmDialog isOpen={!!deleteId} title="Hủy thẻ?" message="Thẻ sẽ bị hủy vĩnh viễn, không thể hoàn tác."
                onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />

            {/* Top-up Modal */}
            {showTopUp && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '380px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Nạp tiền vào thẻ {showTopUp}</h3>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                            {[2000000, 5000000, 10000000, 20000000].map(v => (
                                <button key={v} onClick={() => setTopUpAmount(v)}
                                    style={{ padding: '8px 14px', borderRadius: '10px', border: topUpAmount === v ? '2px solid var(--primary)' : '1px solid var(--color-border)', background: topUpAmount === v ? '#e3f2fd' : 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                    {formatCurrency(v)}
                                </button>
                            ))}
                        </div>
                        <input type="number" value={topUpAmount} onChange={e => setTopUpAmount(Number(e.target.value))}
                            style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '16px' }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowTopUp(null)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleTopUp} className="btn btn-primary">Nạp tiền</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            {/* Create Card Modal */}
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Tạo Thẻ Mới</h3>
                            <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Tên khách hàng *</label>
                                <input type="text" value={newCard.customerName} onChange={e => setNewCard(p => ({ ...p, customerName: e.target.value }))}
                                    placeholder="Nhập tên" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Loại thẻ</label>
                                <select value={newCard.type} onChange={e => setNewCard(p => ({ ...p, type: e.target.value }))}
                                    style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                    <option>VIP Gold</option><option>VIP Platinum</option><option>Silver</option>
                                </select>
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

            <div className="page-header">
                <h2>Thẻ thành viên</h2>
                <p>Quản lý thẻ thành viên và số dư thẻ</p>
            </div>

            <div className="stat-cards">
                <div className="stat-card"><div className="stat-card-icon blue"><FiCreditCard /></div><div className="stat-card-info"><div className="stat-card-value">{data.length}</div><div className="stat-card-label">Tổng thẻ</div></div></div>
                <div className="stat-card"><div className="stat-card-icon green"><FiDollarSign /></div><div className="stat-card-info"><div className="stat-card-value">{formatCurrency(totalBalance)}</div><div className="stat-card-label">Tổng số dư</div></div></div>
            </div>

            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="Tìm theo tên, mã thẻ..." value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">Tất cả loại</option>
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header">
                    <span className="table-count">{filtered.length} / {data.length} thẻ</span>
                    <button className="btn btn-success btn-sm" onClick={() => setShowCreate(true)}><FiPlus size={12} /> Tạo thẻ mới</button>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="cards-table">
                        <thead><tr><th>#</th><th>Mã thẻ</th><th>Khách Hàng</th><th>Loại thẻ</th><th>Số dư</th><th>Tổng nạp</th><th>Ngày tạo</th><th>Hết hạn</th><th>Thao tác</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 ? (<tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy</td></tr>) :
                                filtered.map((card, idx) => (
                                    <tr key={card.id}>
                                        <td>{idx + 1}</td>
                                        <td><span className="link-blue">{card.id}</span></td>
                                        <td style={{ fontWeight: 500 }}>{card.customerName}</td>
                                        <td><span className={`badge ${card.type.includes('Platinum') ? 'badge-processing' : card.type.includes('Gold') ? 'badge-arrived' : 'badge-pending'}`} style={card.type.includes('Platinum') ? { background: '#e8daef', color: '#6f42c1' } : {}}>{card.type}</span></td>
                                        <td style={{ fontWeight: 600 }}>{formatCurrency(card.balance)}</td>
                                        <td>{formatCurrency(card.totalDeposit)}</td>
                                        <td>{card.created}</td>
                                        <td>{card.expiry}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn btn-outline btn-sm" onClick={() => setShowTopUp(card.id)} style={{ fontSize: '0.72rem' }}><FiDollarSign size={12} /> Nạp</button>
                                                <button className="btn-icon" onClick={() => setDeleteId(card.id)} title="Hủy thẻ"><FiTrash2 size={14} color="var(--accent-red)" /></button>
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
