import { useState, useMemo } from 'react'
import { FiPackage, FiStar, FiPlus, FiX, FiEdit2, FiTrash2, FiSearch, FiDollarSign, FiCalendar, FiTrendingUp, FiAward, FiBarChart2 } from 'react-icons/fi'
import { combos as initialCombos, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const soldCounts = { CB001: 45, CB002: 32, CB003: 28, CB004: 15, CB005: 8 }

export default function Combos() {
    const toast = useToast()
    const [data, setData] = useState(initialCombos.map(c => ({ ...c, sold: soldCounts[c.id] || Math.floor(Math.random() * 50) })))
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editCombo, setEditCombo] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [form, setForm] = useState({ name: '', services: '', price: 0, originalPrice: 0, sessions: 1, status: 'active' })

    const filtered = useMemo(() => {
        if (!search) return data
        const q = search.toLowerCase()
        return data.filter(c => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
    }, [data, search])

    const openCreate = () => {
        setEditCombo(null)
        setForm({ name: '', services: '', price: 0, originalPrice: 0, sessions: 1, status: 'active' })
        setShowModal(true)
    }

    const openEdit = (combo) => {
        setEditCombo(combo)
        setForm({ name: combo.name, services: combo.services.join(', '), price: combo.price, originalPrice: combo.originalPrice, sessions: combo.sessions, status: combo.status })
        setShowModal(true)
    }

    const handleSave = () => {
        if (!form.name) return toast.warning('Nhập tên combo')
        const services = form.services.split(',').map(s => s.trim()).filter(Boolean)
        if (editCombo) {
            setData(prev => prev.map(c => c.id === editCombo.id ? { ...c, ...form, services } : c))
            toast.success(`Đã cập nhật combo "${form.name}"`)
        } else {
            const newCombo = { id: `CB${String(data.length + 1).padStart(3, '0')}`, ...form, services, sold: 0 }
            setData(prev => [...prev, newCombo])
            toast.success(`Đã tạo combo "${form.name}"`)
        }
        setShowModal(false)
    }

    const handleDelete = () => {
        setData(prev => prev.filter(c => c.id !== deleteId))
        toast.info('Đã xóa combo')
        setDeleteId(null)
    }

    const totalRevenue = data.reduce((s, c) => s + (c.price * (c.sold || 0)), 0)
    const totalSold = data.reduce((s, c) => s + (c.sold || 0), 0)
    const avgDiscount = data.length > 0 ? Math.round(data.reduce((s, c) => s + (c.originalPrice > 0 ? (1 - c.price / c.originalPrice) * 100 : 0), 0) / data.length) : 0

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa combo?" message="Bạn có chắc chắn muốn xóa combo này?"
                onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />

            <div className="page-header">
                <div>
                    <h1 className="page-title">Combo Dịch Vụ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý các gói combo dịch vụ ưu đãi</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Tạo combo mới</button>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng combo</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiTrendingUp color="#28a745" /></div><div><div className="stat-label">Đã bán</div><div className="stat-value" style={{ color: '#28a745' }}>{totalSold}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiDollarSign color="#ff9800" /></div><div><div className="stat-label">Doanh thu</div><div className="stat-value" style={{ fontSize: '1rem', color: '#ff9800' }}>{formatCurrency(totalRevenue)}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiStar color="#e91e63" /></div><div><div className="stat-label">TB giảm giá</div><div className="stat-value" style={{ color: '#e91e63' }}>{avgDiscount}%</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '20px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '400px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm combo..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={''} onChange={e => { if (e.target.value === 'active') setSearch(''); if (e.target.value === 'inactive') setSearch(''); }}>
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Đang bán</option>
                    <option value="inactive">Ngưng</option>
                </select>
            </div>

            {/* Best Sellers + Sales Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiAward size={14} color="#f59e0b" /> Top combo bán chạy</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {[...data].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 3).map((c, i) => (
                            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: i === 0 ? '#fffbeb' : '#f8f9fa', borderRadius: '8px', border: i === 0 ? '1px solid #fbbf24' : 'none' }}>
                                <span style={{ fontSize: '1.1rem' }}>{['🥇', '🥈', '🥉'][i]}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{c.services?.length || 0} dịch vụ • {formatCurrency(c.price)}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{c.sold || 0}</div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>đã bán</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiBarChart2 size={14} color="var(--color-primary)" /> Doanh số theo combo</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {data.map(c => {
                            const maxSold = Math.max(...data.map(x => x.sold || 0), 1)
                            return (
                                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '80px', fontSize: '0.72rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name.split(' ').slice(0, 2).join(' ')}</span>
                                    <div style={{ flex: 1, height: '10px', background: '#e9ecef', borderRadius: '5px' }}>
                                        <div style={{ width: `${((c.sold || 0) / maxSold) * 100}%`, height: '100%', borderRadius: '5px', background: 'linear-gradient(90deg, var(--color-primary), #2a5a8c)', transition: 'width 0.4s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 600, minWidth: '24px', textAlign: 'right' }}>{c.sold || 0}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)', gridColumn: '1/-1' }}>Không tìm thấy combo</div>}
                {filtered.map(combo => {
                    const discount = combo.originalPrice > 0 ? Math.round((1 - combo.price / combo.originalPrice) * 100) : 0
                    const saving = combo.originalPrice - combo.price
                    return (
                        <div key={combo.id} style={{
                            background: 'white', borderRadius: '16px', overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid var(--color-border)',
                            opacity: combo.status === 'inactive' ? 0.6 : 1,
                            transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)' }}>
                            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), #2a5a8c)', padding: '16px 20px', color: 'white', position: 'relative' }}>
                                <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontSize: '0.72rem', opacity: 0.7 }}>{combo.id}</div>
                                        <h3 style={{ margin: '4px 0 0', fontSize: '1rem' }}>{combo.name}</h3>
                                    </div>
                                    {discount > 0 && (
                                        <span style={{ background: '#ff4444', padding: '4px 10px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: '700', whiteSpace: 'nowrap' }}>-{discount}%</span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '0.78rem', opacity: 0.85 }}>
                                    <span><FiCalendar size={11} style={{ marginRight: '3px' }} />{combo.sessions} buổi</span>
                                    <span><FiTrendingUp size={11} style={{ marginRight: '3px' }} />Đã bán: {combo.sold || 0}</span>
                                </div>
                            </div>
                            <div style={{ padding: '16px 20px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Dịch vụ bao gồm</div>
                                    {combo.services.map((s, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '4px' }}>
                                            <FiStar size={10} color="#ff9800" /> {s}
                                        </div>
                                    ))}
                                </div>
                                {/* Price section with saving highlight */}
                                <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                                    <div>
                                        <div style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{formatCurrency(combo.originalPrice)}</div>
                                        <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#dc3545' }}>{formatCurrency(combo.price)}</div>
                                        {saving > 0 && <div style={{ fontSize: '0.72rem', color: '#28a745', fontWeight: '600' }}>Tiết kiệm {formatCurrency(saving)}</div>}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        <span className={`badge badge-${combo.status === 'active' ? 'success' : 'secondary'}`} style={{ fontSize: '0.72rem' }}>
                                            {combo.status === 'active' ? '● Đang bán' : '○ Ngưng'}
                                        </span>
                                        <button className="btn-icon" onClick={(e) => { e.stopPropagation(); openEdit(combo) }} title="Sửa">
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button className="btn-icon" onClick={(e) => { e.stopPropagation(); setDeleteId(combo.id) }} title="Xóa">
                                            <FiTrash2 size={14} color="var(--accent-red)" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                        <div className="modal-header"><h2>{editCombo ? '✏️ Sửa Combo' : '📦 Tạo Combo Mới'}</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên combo *</label><input type="text" className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="VD: Combo chăm sóc da toàn diện" /></div>
                            <div className="form-group"><label>Dịch vụ bao gồm (phân cách bằng dấu phẩy)</label><textarea className="form-control" value={form.services} onChange={e => setForm(p => ({ ...p, services: e.target.value }))} placeholder="VD: Chăm sóc da cơ bản, Trị mụn, Massage" style={{ minHeight: '60px' }} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Giá gốc (VNĐ)</label><input type="number" className="form-control" value={form.originalPrice} onChange={e => setForm(p => ({ ...p, originalPrice: Number(e.target.value) }))} /></div>
                                <div className="form-group"><label>Giá combo (VNĐ)</label><input type="number" className="form-control" value={form.price} onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))} /></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Số buổi</label><input type="number" className="form-control" value={form.sessions} onChange={e => setForm(p => ({ ...p, sessions: Number(e.target.value) }))} /></div>
                                <div className="form-group"><label>Trạng thái</label><select className="form-control" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}><option value="active">Đang bán</option><option value="inactive">Ngưng</option></select></div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button><button className="btn btn-primary" onClick={handleSave}>{editCombo ? 'Cập nhật' : 'Tạo combo'}</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
