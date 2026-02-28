import { useState, useMemo } from 'react'
import { FiTrendingUp, FiDollarSign, FiTarget, FiUsers, FiSearch, FiX, FiPlus, FiPlay, FiPause, FiDownload, FiBarChart2 } from 'react-icons/fi'
import { campaigns as initialCampaigns, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function Campaigns() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialCampaigns)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showCreate, setShowCreate] = useState(false)
    const [form, setForm] = useState({ name: '', channel: 'Facebook', budget: 5000000, startDate: '', endDate: '' })

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(c => c.name.toLowerCase().includes(q) || c.channel.toLowerCase().includes(q)) }
        if (statusFilter !== 'all') r = r.filter(c => c.status === statusFilter)
        return r
    }, [data, search, statusFilter])

    const totalBudget = data.reduce((s, c) => s + c.budget, 0)
    const totalSpent = data.reduce((s, c) => s + c.spent, 0)
    const totalLeads = data.reduce((s, c) => s + c.leads, 0)
    const totalConversions = data.reduce((s, c) => s + c.conversions, 0)

    const handleCreate = () => {
        if (!form.name) return
        const id = `MKT${String(data.length + 1).padStart(3, '0')}`
        setData(prev => [...prev, { id, ...form, spent: 0, leads: 0, conversions: 0, status: 'active' }])
        addToast(`Đã tạo chiến dịch "${form.name}"`, 'success')
        setShowCreate(false); setForm({ name: '', channel: 'Facebook', budget: 5000000, startDate: '', endDate: '' })
    }

    const toggleStatus = (id) => {
        setData(prev => prev.map(c => {
            if (c.id !== id) return c
            const newStatus = c.status === 'active' ? 'completed' : 'active'
            addToast(`${c.name} → ${newStatus === 'active' ? 'Đang chạy' : 'Tạm dừng'}`, 'info')
            return { ...c, status: newStatus }
        }))
    }

    const handleExport = () => {
        const csv = 'Mã,Chiến dịch,Kênh,Ngân sách,Đã chi,Leads,CĐ,Trạng thái\n' + filtered.map(c =>
            `${c.id},${c.name},${c.channel},${c.budget},${c.spent},${c.leads},${c.conversions},${c.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'chien-dich-marketing.csv'; a.click()
        addToast('Đã xuất file CSV', 'success')
    }

    const channelColors = { 'Facebook': { bg: '#e3f2fd', color: '#1565c0' }, 'Google': { bg: '#fff8e1', color: '#e65100' }, 'TikTok': { bg: '#fce4ec', color: '#c62828' }, 'Zalo': { bg: '#e8f5e9', color: '#2e7d32' }, 'SMS/ZNS': { bg: '#e8f5e9', color: '#2e7d32' }, 'Multi-channel': { bg: '#f3e5f5', color: '#7b1fa2' } }
    const channelStats = [...new Set(data.map(c => c.channel))].map(ch => {
        const items = data.filter(c => c.channel === ch)
        return { channel: ch, count: items.length, budget: items.reduce((s, c) => s + c.budget, 0), spent: items.reduce((s, c) => s + c.spent, 0), leads: items.reduce((s, c) => s + c.leads, 0), conversions: items.reduce((s, c) => s + c.conversions, 0) }
    })
    const cpl = totalLeads > 0 ? Math.round(totalSpent / totalLeads) : 0
    const cpc = totalConversions > 0 ? Math.round(totalSpent / totalConversions) : 0

    return (
        <div className="fade-in">
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '480px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>🎯 Tạo chiến dịch mới</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input type="text" placeholder="Tên chiến dịch *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                            <select value={form.channel} onChange={e => setForm(p => ({ ...p, channel: e.target.value }))} style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }}>
                                <option>Facebook</option><option>Google</option><option>TikTok</option><option>Zalo</option>
                            </select>
                            <input type="number" placeholder="Ngân sách" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: Number(e.target.value) }))} style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} style={{ flex: 1, padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                                <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} style={{ flex: 1, padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <button onClick={() => setShowCreate(false)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleCreate} className="btn btn-primary">Tạo</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h2>Chiến Dịch Marketing</h2><p>Quản lý và theo dõi hiệu quả chiến dịch</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất dữ liệu</button>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><FiPlus size={14} /> Tạo chiến dịch</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiDollarSign color="#1a73e8" /></div><div><div className="stat-label">Ngân sách</div><div className="stat-value" style={{ fontSize: '0.9rem' }}>{formatCurrency(totalBudget)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiTrendingUp color="#ff9800" /></div><div><div className="stat-label">Đã chi</div><div className="stat-value" style={{ fontSize: '0.9rem', color: '#ff9800' }}>{formatCurrency(totalSpent)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiUsers color="#28a745" /></div><div><div className="stat-label">Leads</div><div className="stat-value">{totalLeads}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiTarget color="#9c27b0" /></div><div><div className="stat-label">Chuyển đổi</div><div className="stat-value">{totalConversions} ({totalLeads > 0 ? Math.round(totalConversions / totalLeads * 100) : 0}%)</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e0f7fa' }}><FiDollarSign color="#00838f" /></div><div><div className="stat-label">CPL</div><div className="stat-value" style={{ fontSize: '0.85rem', color: '#00838f' }}>{formatCurrency(cpl)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiDollarSign color="#c62828" /></div><div><div className="stat-label">CPC</div><div className="stat-value" style={{ fontSize: '0.85rem', color: '#c62828' }}>{formatCurrency(cpc)}</div></div></div>
            </div>

            {/* Channel Analytics */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiBarChart2 size={14} color="var(--color-primary)" /> Hiệu suất theo kênh</div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${channelStats.length}, 1fr)`, gap: '12px' }}>
                    {channelStats.map(ch => {
                        const cc = channelColors[ch.channel] || { bg: '#f0f0f0', color: '#666' }
                        const cplCh = ch.leads > 0 ? Math.round(ch.spent / ch.leads) : 0
                        return (
                            <div key={ch.channel} style={{ padding: '12px', borderRadius: '10px', background: cc.bg, border: `1px solid ${cc.color}20` }}>
                                <div style={{ fontWeight: 600, fontSize: '0.82rem', color: cc.color, marginBottom: '6px' }}>{ch.channel}</div>
                                <div style={{ display: 'grid', gap: '3px', fontSize: '0.72rem' }}>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Chiến dịch</span><span style={{ fontWeight: 600 }}>{ch.count}</span></div>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Leads</span><span style={{ fontWeight: 600 }}>{ch.leads}</span></div>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between' }}><span>CĐ</span><span style={{ fontWeight: 600, color: '#28a745' }}>{ch.conversions}</span></div>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between' }}><span>CPL</span><span style={{ fontWeight: 600, color: cc.color }}>{formatCurrency(cplCh)}</span></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="Tìm chiến dịch..." value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option><option value="active">Đang chạy</option><option value="completed">Hoàn thành</option>
                </select>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header"><span className="table-count">{filtered.length} chiến dịch</span></div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead><tr><th>Mã</th><th>Chiến dịch</th><th>Kênh</th><th>Ngân sách</th><th>Đã chi</th><th>Leads</th><th>CĐ</th><th>Trạng thái</th><th>TT</th></tr></thead>
                        <tbody>
                            {filtered.map(c => {
                                const pct = Math.round((c.spent / c.budget) * 100)
                                return (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                                        <td><span style={{ padding: '3px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600, background: (channelColors[c.channel] || { bg: '#f0f0f0' }).bg, color: (channelColors[c.channel] || { color: '#666' }).color }}>{c.channel}</span></td>
                                        <td>{formatCurrency(c.budget)}</td>
                                        <td>
                                            <div>{formatCurrency(c.spent)}</div>
                                            <div style={{ width: '60px', height: '4px', background: '#e9ecef', borderRadius: '2px', marginTop: '4px' }}>
                                                <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: pct > 90 ? '#dc3545' : '#28a745', borderRadius: '2px', transition: 'width 0.5s' }} />
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{c.leads}</td>
                                        <td style={{ fontWeight: 600, color: '#28a745' }}>{c.conversions}</td>
                                        <td><span className={`badge badge-${c.status === 'active' ? 'arrived' : 'pending'}`}>{c.status === 'active' ? 'Đang chạy' : 'Hoàn thành'}</span></td>
                                        <td>
                                            <button className="btn btn-outline btn-sm" onClick={() => toggleStatus(c.id)} style={{ fontSize: '0.72rem' }}>
                                                {c.status === 'active' ? <><FiPause size={12} /> Dừng</> : <><FiPlay size={12} /> Chạy</>}
                                            </button>
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
