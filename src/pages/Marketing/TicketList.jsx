import { useState, useMemo } from 'react'
import { tickets as initialTickets } from '../../data/mockData'
import { FiSearch, FiPlus, FiMessageSquare, FiPhone, FiX, FiTrash2, FiEdit2 } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function TicketList() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialTickets)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sourceFilter, setSourceFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [form, setForm] = useState({ customerName: '', phone: '', source: 'Facebook', service: '', assignee: '', note: '' })

    const filtered = useMemo(() => {
        let result = data
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(t => t.customerName.toLowerCase().includes(q) || t.phone.includes(q) || t.id.toLowerCase().includes(q))
        }
        if (statusFilter !== 'all') result = result.filter(t => t.status === statusFilter)
        if (sourceFilter !== 'all') result = result.filter(t => t.source === sourceFilter)
        return result
    }, [data, search, statusFilter, sourceFilter])

    const sources = [...new Set(data.map(t => t.source))]

    const handleCreate = () => {
        if (!form.customerName || !form.phone) return
        const ticket = {
            id: `TK${String(data.length + 1).padStart(3, '0')}`,
            ...form, status: 'Mới', created: new Date().toLocaleDateString('vi-VN')
        }
        setData(prev => [ticket, ...prev])
        setShowModal(false)
        setForm({ customerName: '', phone: '', source: 'Facebook', service: '', assignee: '', note: '' })
        addToast(`Đã tạo ticket cho "${form.customerName}"`, 'success')
    }

    const handleStatusChange = (id, newStatus) => {
        setData(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
        addToast(`Đã cập nhật trạng thái → ${newStatus}`, 'info')
    }

    const handleDelete = () => {
        setData(prev => prev.filter(t => t.id !== deleteId))
        addToast('Đã xóa ticket', 'info')
        setDeleteId(null)
    }

    return (
        <div className="fade-in">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa ticket?" message="Bạn có chắc chắn muốn xóa ticket này?"
                onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '90%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Tạo Ticket Mới</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Tên khách hàng *</label>
                                    <input type="text" value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))}
                                        placeholder="Nhập tên" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Số điện thoại *</label>
                                    <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                        placeholder="0xxx xxx xxx" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Nguồn</label>
                                    <select value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', background: 'white' }}>
                                        {sources.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>NV phụ trách</label>
                                    <input type="text" value={form.assignee} onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))}
                                        placeholder="Tên NV" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Dịch vụ quan tâm</label>
                                <input type="text" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                                    placeholder="VD: Nâng cơ Hifu" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Ghi chú</label>
                                <textarea value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                                    placeholder="Ghi chú thêm..." style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit', minHeight: '60px', resize: 'vertical' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                            <button onClick={() => setShowModal(false)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleCreate} className="btn btn-primary">Tạo ticket</button>
                        </div>
                    </div>
                    <style>{`
                        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
                    `}</style>
                </div>
            )}

            <div className="page-header">
                <h2>Ticket List</h2>
                <p>Quản lý leads và tickets từ các kênh marketing</p>
            </div>

            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-card-icon blue"><FiMessageSquare /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{data.length}</div>
                        <div className="stat-card-label">Tổng Ticket</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon orange"><FiMessageSquare /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{data.filter(t => t.status === 'Mới').length}</div>
                        <div className="stat-card-label">Ticket mới</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon green"><FiMessageSquare /></div>
                    <div className="stat-card-info">
                        <div className="stat-card-value">{data.filter(t => t.status === 'Chốt').length}</div>
                        <div className="stat-card-label">Đã chốt</div>
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <FiSearch style={{ color: 'var(--gray-400)' }} />
                <div className="filter-search-wrapper">
                    <input type="text" placeholder="Tìm theo tên, SĐT..." id="search-tickets"
                        value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <FiX style={{ color: 'var(--gray-400)', cursor: 'pointer' }} onClick={() => setSearch('')} />}
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="Mới">Mới</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Chốt">Chốt</option>
                </select>
                <select className="filter-select" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
                    <option value="all">Nguồn</option>
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="btn btn-ok" onClick={() => { setSearch(''); setStatusFilter('all'); setSourceFilter('all') }}>Xóa lọc</button>
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header">
                    <span className="table-count">{filtered.length} / {data.length} tickets</span>
                    <button className="btn btn-success btn-sm" onClick={() => setShowModal(true)}><FiPlus size={12} /> Tạo Ticket</button>
                </div>
                <div className="table-wrapper">
                    <table className="data-table" id="tickets-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Mã TK</th><th>Khách Hàng</th><th>SĐT</th>
                                <th>Nguồn</th><th>Dịch vụ quan tâm</th><th>NV phụ trách</th>
                                <th>Trạng thái</th><th>Ngày tạo</th><th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không tìm thấy ticket</td></tr>
                            ) : filtered.map((tk, idx) => (
                                <tr key={tk.id}>
                                    <td>{idx + 1}</td>
                                    <td><span className="link-blue">{tk.id}</span></td>
                                    <td style={{ fontWeight: 500 }}>{tk.customerName}</td>
                                    <td><span className="link-green">{tk.phone}</span></td>
                                    <td>{tk.source}</td>
                                    <td>{tk.service}</td>
                                    <td>{tk.assignee}</td>
                                    <td>
                                        <select value={tk.status} onChange={e => handleStatusChange(tk.id, e.target.value)}
                                            style={{
                                                padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--color-border)',
                                                fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', background: 'white',
                                                color: tk.status === 'Mới' ? 'var(--accent-orange)' : tk.status === 'Chốt' ? 'var(--accent-green)' : 'var(--primary)'
                                            }}>
                                            <option value="Mới">Mới</option>
                                            <option value="Đang xử lý">Đang xử lý</option>
                                            <option value="Chốt">Chốt</option>
                                        </select>
                                    </td>
                                    <td>{tk.created}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" title="Gọi" onClick={() => addToast(`Gọi cho ${tk.customerName}: ${tk.phone}`, 'info')}><FiPhone size={14} /></button>
                                            <button className="btn-icon" title="Nhắn" onClick={() => addToast(`Gửi tin nhắn cho ${tk.customerName}`, 'info')}><FiMessageSquare size={14} /></button>
                                            <button className="btn-icon" onClick={() => setDeleteId(tk.id)} title="Xóa"><FiTrash2 size={14} color="var(--accent-red)" /></button>
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
