import { useState, useMemo } from 'react'
import { FiAlertTriangle, FiSearch, FiPlus, FiX, FiMessageSquare, FiDownload, FiPieChart, FiClock } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialComplaints = [
    { id: 1, customerName: 'Lê Thị Hoa', phone: '0100018558', service: 'Trị mụn chuyên sâu', date: '25-02-2026', type: 'Dịch vụ', priority: 'Cao', status: 'Đang xử lý', description: 'Da nổi mẩn đỏ sau khi điều trị', handler: 'Nguyễn Thị Mai', reply: '' },
    { id: 2, customerName: 'Phan Thị Kim Hồng', phone: '0100018555', service: 'Chăm sóc da', date: '24-02-2026', type: 'Thái độ', priority: 'Trung bình', status: 'Đã xử lý', description: 'Nhân viên tư vấn không nhiệt tình', handler: 'Đỗ Minh Tuấn', reply: 'Đã nhắc nhở nhân viên, xin lỗi khách hàng' },
    { id: 3, customerName: 'Trần Văn Minh', phone: '0100018559', service: 'Massage body', date: '26-02-2026', type: 'Cơ sở vật chất', priority: 'Thấp', status: 'Mới', description: 'Phòng lạnh, thiếu nước uống', handler: null, reply: '' },
]

export default function Complaints() {
    const { addToast } = useToast()
    const [data, setData] = useState(initialComplaints)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showCreate, setShowCreate] = useState(false)
    const [replyId, setReplyId] = useState(null)
    const [replyText, setReplyText] = useState('')
    const [form, setForm] = useState({ customerName: '', phone: '', service: '', type: 'Dịch vụ', priority: 'Trung bình', description: '' })
    const [typeFilter, setTypeFilter] = useState('all')
    const [priorityFilter, setPriorityFilter] = useState('all')

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(c => c.customerName.toLowerCase().includes(q) || c.phone.includes(q)) }
        if (statusFilter !== 'all') r = r.filter(c => c.status === statusFilter)
        if (typeFilter !== 'all') r = r.filter(c => c.type === typeFilter)
        if (priorityFilter !== 'all') r = r.filter(c => c.priority === priorityFilter)
        return r
    }, [data, search, statusFilter, typeFilter, priorityFilter])

    const handleCreate = () => {
        if (!form.customerName || !form.description) return
        setData(prev => [...prev, { id: prev.length + 1, ...form, date: new Date().toLocaleDateString('vi-VN'), status: 'Mới', handler: null, reply: '' }])
        setShowCreate(false); setForm({ customerName: '', phone: '', service: '', type: 'Dịch vụ', priority: 'Trung bình', description: '' })
        addToast('Đã tạo khiếu nại mới', 'success')
    }

    const handleResolve = (id) => {
        setData(prev => prev.map(c => c.id === id ? { ...c, status: 'Đã xử lý', handler: c.handler || 'TM Demo' } : c))
        addToast('Đã đánh dấu xử lý xong', 'success')
    }

    const handleReply = () => {
        if (!replyText) return
        setData(prev => prev.map(c => c.id === replyId ? { ...c, reply: replyText, status: 'Đang xử lý', handler: c.handler || 'TM Demo' } : c))
        setReplyId(null); setReplyText('')
        addToast('Đã thêm phản hồi', 'success')
    }

    return (
        <div className="fade-in">
            {/* Create modal */}
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '90%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--color-border)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Tạo Khiếu Nại</h3>
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
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>SĐT</label>
                                    <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Dịch vụ liên quan</label>
                                <input type="text" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Loại</label>
                                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', background: 'white' }}>
                                        <option>Dịch vụ</option><option>Thái độ</option><option>Cơ sở vật chất</option><option>Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Mức độ</label>
                                    <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '10px', background: 'white' }}>
                                        <option>Thấp</option><option>Trung bình</option><option>Cao</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Nội dung khiếu nại *</label>
                                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--color-border)' }}>
                            <button onClick={() => setShowCreate(false)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleCreate} className="btn btn-primary">Tạo khiếu nại</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            {/* Reply modal */}
            {replyId && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeIn 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '420px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' }}>
                        <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Phản hồi khiếu nại #{replyId}</h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--gray-500)', marginBottom: '16px' }}>{data.find(c => c.id === replyId)?.description}</p>
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Nhập nội dung phản hồi..."
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical', marginBottom: '16px' }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setReplyId(null)} className="btn btn-secondary">Hủy</button>
                            <button onClick={handleReply} className="btn btn-primary">Gửi phản hồi</button>
                        </div>
                    </div>
                    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
                </div>
            )}

            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h2>Khiếu Nại</h2><p>Quản lý và xử lý khiếu nại khách hàng</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = '#,Khách hàng,SĐT,Dịch vụ,Loại,Mức độ,Ngày,Mô tả,Phản hồi,Trạng thái\n' + data.map((c, i) =>
                            `${i + 1},${c.customerName},${c.phone},${c.service},${c.type},${c.priority},${c.date},"${c.description}","${c.reply}",${c.status}`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' })
                        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'khieu-nai.csv'; a.click()
                        addToast('Đã xuất file CSV', 'success')
                    }}><FiDownload size={14} /> Xuất dữ liệu</button>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><FiPlus size={14} /> Tạo khiếu nại</button>
                </div>
            </div>

            {/* Analytics Cards */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiAlertTriangle color="#dc3545" /></div><div><div className="stat-label">Mới</div><div className="stat-value" style={{ color: '#dc3545' }}>{data.filter(c => c.status === 'Mới').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Đang xử lý</div><div className="stat-value" style={{ color: '#ff9800' }}>{data.filter(c => c.status === 'Đang xử lý').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiMessageSquare color="#28a745" /></div><div><div className="stat-label">Đã xử lý</div><div className="stat-value" style={{ color: '#28a745' }}>{data.filter(c => c.status === 'Đã xử lý').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiAlertTriangle color="#e91e63" /></div><div><div className="stat-label">Ưu tiên cao</div><div className="stat-value" style={{ color: '#e91e63' }}>{data.filter(c => c.priority === 'Cao').length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPieChart color="#1a73e8" /></div><div><div className="stat-label">Tỉ lệ xử lý</div><div className="stat-value" style={{ color: '#1a73e8' }}>{data.length > 0 ? Math.round(data.filter(c => c.status === 'Đã xử lý').length / data.length * 100) : 0}%</div></div></div>
            </div>

            {/* Type Distribution + Priority Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Phân bố loại khiếu nại</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {['Dịch vụ', 'Thái độ', 'Cơ sở vật chất', 'Khác'].map(type => {
                            const count = data.filter(c => c.type === type).length
                            const maxCount = Math.max(...['Dịch vụ', 'Thái độ', 'Cơ sở vật chất', 'Khác'].map(t => data.filter(c => c.type === t).length), 1)
                            const colors = { 'Dịch vụ': '#1a73e8', 'Thái độ': '#ff9800', 'Cơ sở vật chất': '#9c27b0', 'Khác': '#6c757d' }
                            return (
                                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setTypeFilter(type)}>
                                    <span style={{ width: '90px', fontSize: '0.75rem', fontWeight: 500 }}>{type}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%`, height: '100%', borderRadius: '4px', background: colors[type], transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 600, minWidth: '20px', textAlign: 'right' }}>{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiAlertTriangle size={14} color="#dc3545" /> Khiếu nại cần xử lý gấp</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {data.filter(c => c.priority === 'Cao' && c.status !== 'Đã xử lý').length === 0 ? (
                            <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '8px', fontSize: '0.82rem', color: '#28a745', textAlign: 'center' }}>✅ Không có khiếu nại ưu tiên cao chưa xử lý</div>
                        ) : (
                            data.filter(c => c.priority === 'Cao' && c.status !== 'Đã xử lý').map(c => (
                                <div key={c.id} style={{ padding: '10px 12px', background: '#fff5f5', borderRadius: '8px', border: '1px solid #ffcdd2' }}>
                                    <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{c.customerName}</div>
                                        <span className="badge badge-cancelled" style={{ fontSize: '0.68rem' }}>{c.status}</span>
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginTop: '2px' }}>{c.description}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '300px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm khách hàng, SĐT..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option><option value="Mới">Mới</option><option value="Đang xử lý">Đang xử lý</option><option value="Đã xử lý">Đã xử lý</option>
                </select>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">Tất cả loại</option><option value="Dịch vụ">Dịch vụ</option><option value="Thái độ">Thái độ</option><option value="Cơ sở vật chất">Cơ sở vật chất</option><option value="Khác">Khác</option>
                </select>
                <select className="filter-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                    <option value="all">Tất cả mức độ</option><option value="Cao">Cao</option><option value="Trung bình">Trung bình</option><option value="Thấp">Thấp</option>
                </select>
                {(typeFilter !== 'all' || priorityFilter !== 'all' || statusFilter !== 'all') && <button className="btn btn-secondary" onClick={() => { setTypeFilter('all'); setPriorityFilter('all'); setStatusFilter('all') }}><FiX size={14} /> Xoá lọc</button>}
            </div>

            <div className="table-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className="table-header"><span className="table-count">{filtered.length} khiếu nại</span></div>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead><tr><th>#</th><th>Khách Hàng</th><th>Dịch vụ</th><th>Loại</th><th>Mức độ</th><th>Ngày</th><th>Mô tả</th><th>Phản hồi</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                        <tbody>
                            {filtered.map((c, i) => (
                                <tr key={c.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: 600 }}>{c.customerName}</td>
                                    <td>{c.service}</td><td>{c.type}</td>
                                    <td><span className={`badge ${c.priority === 'Cao' ? 'badge-cancelled' : c.priority === 'Trung bình' ? 'badge-pending' : 'badge-processing'}`}>{c.priority}</span></td>
                                    <td>{c.date}</td>
                                    <td style={{ maxWidth: '180px', fontSize: '0.8rem' }}>{c.description}</td>
                                    <td style={{ maxWidth: '180px', fontSize: '0.8rem', color: c.reply ? 'var(--accent-green)' : 'var(--gray-400)' }}>{c.reply || '—'}</td>
                                    <td><span className={`badge badge-${c.status === 'Đã xử lý' ? 'arrived' : c.status === 'Đang xử lý' ? 'pending' : 'cancelled'}`}>{c.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" title="Phản hồi" onClick={() => { setReplyId(c.id); setReplyText(c.reply || '') }}><FiMessageSquare size={14} /></button>
                                            {c.status !== 'Đã xử lý' && <button className="btn btn-outline btn-sm" onClick={() => handleResolve(c.id)} style={{ fontSize: '0.72rem' }}>✓ Xong</button>}
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
