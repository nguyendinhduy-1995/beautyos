import { useState, useMemo } from 'react'
import { FiGift, FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiCopy, FiShare2, FiBarChart2, FiDownload } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialVouchers = [
    { id: 'VC001', code: 'WELCOME50', name: 'Giảm 50% lần đầu', type: 'Phần trăm', value: '50%', minOrder: '500.000đ', maxDiscount: '200.000đ', used: 45, total: 100, expiry: '31/03/2026', status: 'active' },
    { id: 'VC002', code: 'HIFU100K', name: 'Giảm 100K dịch vụ Hifu', type: 'Cố định', value: '100.000đ', minOrder: '1.000.000đ', maxDiscount: '100.000đ', used: 23, total: 50, expiry: '28/02/2026', status: 'active' },
    { id: 'VC003', code: 'VIP20', name: 'Ưu đãi VIP 20%', type: 'Phần trăm', value: '20%', minOrder: '0đ', maxDiscount: '500.000đ', used: 12, total: 200, expiry: '30/06/2026', status: 'active' },
    { id: 'VC004', code: 'TETMOI', name: 'Tết Nguyên Đán', type: 'Cố định', value: '200.000đ', minOrder: '500.000đ', maxDiscount: '200.000đ', used: 89, total: 100, expiry: '15/02/2026', status: 'expired' },
]

export default function MobileVoucher() {
    const toast = useToast()
    const [data, setData] = useState(initialVouchers)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [form, setForm] = useState({ code: '', name: '', type: 'Phần trăm', value: '', minOrder: '', maxDiscount: '', total: 100, expiry: '' })

    const filtered = useMemo(() => data.filter(v => v.code.toLowerCase().includes(search.toLowerCase()) || v.name.toLowerCase().includes(search.toLowerCase())), [data, search])

    const openCreate = () => { setEditItem(null); setForm({ code: '', name: '', type: 'Phần trăm', value: '', minOrder: '', maxDiscount: '', total: 100, expiry: '' }); setShowModal(true) }
    const openEdit = (v) => { setEditItem(v); setForm({ code: v.code, name: v.name, type: v.type, value: v.value, minOrder: v.minOrder, maxDiscount: v.maxDiscount, total: v.total, expiry: v.expiry }); setShowModal(true) }

    const handleSave = () => {
        if (!form.code.trim() || !form.name.trim()) return toast.warning('Nhập đầy đủ thông tin')
        if (editItem) {
            setData(prev => prev.map(v => v.id === editItem.id ? { ...v, ...form } : v))
            toast.success(`Đã cập nhật "${form.code}"`)
        } else {
            setData(prev => [...prev, { id: `VC${String(prev.length + 1).padStart(3, '0')}`, ...form, used: 0, status: 'active' }])
            toast.success(`Đã tạo voucher "${form.code}"`)
        }
        setShowModal(false)
    }
    const handleDelete = () => { setData(prev => prev.filter(v => v.id !== deleteId)); setDeleteId(null); toast.info('Đã xóa voucher') }
    const copyCode = (code) => { navigator.clipboard?.writeText(code); toast.success(`Đã copy mã "${code}"`) }

    const totalUsed = data.reduce((s, v) => s + v.used, 0)
    const activeCount = data.filter(v => v.status === 'active').length
    const totalCapacity = data.reduce((s, v) => s + v.total, 0)
    const usageRate = totalCapacity > 0 ? Math.round((totalUsed / totalCapacity) * 100) : 0

    const [statusFilter, setStatusFilter] = useState('all')
    const [detailVoucher, setDetailVoucher] = useState(null)

    const finalFiltered = useMemo(() => {
        let r = filtered
        if (statusFilter !== 'all') r = r.filter(v => v.status === statusFilter)
        return r
    }, [filtered, statusFilter])

    const shareVoucher = (v) => {
        const link = `https://beautyos.app/voucher/${v.code}`
        navigator.clipboard?.writeText(link)
        toast.success(`Đã copy link chia sẻ "${v.code}"`)
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa voucher?" message="Bạn có chắc muốn xóa voucher này?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />
            <div className="page-header">
                <div><h1 className="page-title">Voucher Mobile</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý voucher trên ứng dụng di động</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = 'Mã,Tên,Loại,Giá trị,Đã dùng,Tổng,Hạn,Trạng thái\n' + data.map(v => `${v.code},${v.name},${v.type},${v.value},${v.used},${v.total},${v.expiry},${v.status}`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'voucher.csv'; a.click()
                        toast.success('Đã xuất file CSV')
                    }}><FiDownload size={14} /> Xuất dữ liệu</button>
                    <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Tạo voucher</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiGift color="#28a745" /></div><div><div className="stat-label">Tổng voucher</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiGift color="#1a73e8" /></div><div><div className="stat-label">Đang hoạt động</div><div className="stat-value">{activeCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiGift color="#ff9800" /></div><div><div className="stat-label">Đã sử dụng</div><div className="stat-value">{totalUsed}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiGift color="#e91e63" /></div><div><div className="stat-label">Hết hạn</div><div className="stat-value">{data.filter(v => v.status === 'expired').length}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm mã voucher..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="expired">Hết hạn</option>
                </select>
                <select className="filter-select" onChange={e => { if (e.target.value) setSearch(e.target.value); else setSearch('') }}>
                    <option value="">Tất cả loại</option>
                    <option value="Phần trăm">Phần trăm</option>
                    <option value="Cố định">Cố định</option>
                </select>
            </div>

            {/* Usage Analytics Bar */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><FiBarChart2 size={14} color="var(--color-primary)" /> Tỷ lệ sử dụng voucher</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: usageRate >= 70 ? '#dc3545' : usageRate >= 40 ? '#ff9800' : '#28a745' }}>{usageRate}%</span>
                </div>
                <div style={{ height: '12px', background: '#e9ecef', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${usageRate}%`, height: '100%', borderRadius: '6px', background: `linear-gradient(90deg, #28a745, ${usageRate >= 70 ? '#dc3545' : '#ff9800'})`, transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                    <span>Đã dùng: {totalUsed}</span>
                    <span>Tổng số lượng: {totalCapacity}</span>
                </div>
                {/* Per-voucher mini bars */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {data.map(v => {
                        const pct = v.total > 0 ? Math.round((v.used / v.total) * 100) : 0
                        return (
                            <div key={v.id} style={{ flex: '1 1 120px', minWidth: '120px' }}>
                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.code}</div>
                                <div style={{ height: '6px', background: '#e9ecef', borderRadius: '3px' }}>
                                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', background: pct >= 80 ? '#dc3545' : pct >= 50 ? '#ff9800' : '#28a745' }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã</th><th>Tên</th><th>Loại</th><th>Giá trị</th><th>Đã dùng</th><th>Còn lại</th><th>Hạn</th><th>Trạng thái</th><th></th></tr></thead>
                    <tbody>
                        {finalFiltered.map(v => (
                            <tr key={v.id} style={{ opacity: v.status === 'expired' ? 0.6 : 1 }}>
                                <td><span style={{ fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => copyCode(v.code)}><FiGift size={12} style={{ marginRight: 4 }} />{v.code} <FiCopy size={10} /></span></td>
                                <td>{v.name}</td>
                                <td><span className="badge badge-processing">{v.type}</span></td>
                                <td style={{ fontWeight: 600 }}>{v.value}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {v.used}/{v.total}
                                        <div style={{ width: '50px', height: '5px', background: '#e9ecef', borderRadius: '3px' }}>
                                            <div style={{ width: `${(v.used / v.total) * 100}%`, height: '100%', borderRadius: '3px', background: v.used >= v.total ? '#dc3545' : '#28a745' }} />
                                        </div>
                                    </div>
                                </td>
                                <td style={{ fontWeight: 600, color: v.total - v.used > 0 ? '#28a745' : '#dc3545' }}>{v.total - v.used}</td>
                                <td>{v.expiry}</td>
                                <td>{v.status === 'active' ? <span className="badge badge-success">Hoạt động</span> : <span className="badge badge-secondary">Hết hạn</span>}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setDetailVoucher(v)} title="Xem"><FiGift size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => shareVoucher(v)} title="Chia sẻ"><FiShare2 size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => openEdit(v)} title="Sửa"><FiEdit2 size={13} /></button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setDeleteId(v.id)} title="Xóa"><FiTrash2 size={13} color="#dc3545" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                        <div className="modal-header"><h2>{editItem ? '✏️ Sửa Voucher' : '🎁 Tạo Voucher Mới'}</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Mã voucher *</label><input className="form-control" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="VD: WELCOME50" /></div>
                                <div className="form-group"><label>Loại</label><select className="form-control" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}><option>Phần trăm</option><option>Cố định</option></select></div>
                            </div>
                            <div className="form-group"><label>Tên voucher *</label><input className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="VD: Giảm 50% lần đầu" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Giá trị</label><input className="form-control" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} placeholder="50% hoặc 100.000đ" /></div>
                                <div className="form-group"><label>Đơn tối thiểu</label><input className="form-control" value={form.minOrder} onChange={e => setForm(p => ({ ...p, minOrder: e.target.value }))} /></div>
                                <div className="form-group"><label>Giảm tối đa</label><input className="form-control" value={form.maxDiscount} onChange={e => setForm(p => ({ ...p, maxDiscount: e.target.value }))} /></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Số lượng</label><input type="number" className="form-control" value={form.total} onChange={e => setForm(p => ({ ...p, total: +e.target.value }))} /></div>
                                <div className="form-group"><label>Ngày hết hạn</label><input className="form-control" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: e.target.value }))} placeholder="dd/mm/yyyy" /></div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleSave}>{editItem ? 'Cập nhật' : 'Tạo voucher'}</button></div>
                    </div>
                </div>
            )}

            {/* Voucher Detail Modal with QR */}
            {detailVoucher && (
                <div className="modal-overlay" onClick={() => setDetailVoucher(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>🎁 Chi Tiết Voucher</h2><button className="btn-close" onClick={() => setDetailVoucher(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                {/* QR Code Placeholder */}
                                <div style={{ width: '120px', height: '120px', margin: '0 auto 8px', background: 'linear-gradient(135deg, #f0f7ff, #e0e7ff)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-primary)' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem' }}>📱</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 600 }}>QR Code</div>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-primary)' }}>{detailVoucher.code}</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)' }}>{detailVoucher.name}</div>
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {[['Loại', detailVoucher.type], ['Giá trị', detailVoucher.value], ['Đơn tối thiểu', detailVoucher.minOrder], ['Giảm tối đa', detailVoucher.maxDiscount], ['Đã dùng', `${detailVoucher.used}/${detailVoucher.total}`], ['Hết hạn', detailVoucher.expiry]].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.82rem' }}>{l}</span>
                                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => { copyCode(detailVoucher.code); setDetailVoucher(null) }}><FiCopy size={14} /> Copy mã</button>
                            <button className="btn btn-primary" onClick={() => { shareVoucher(detailVoucher); setDetailVoucher(null) }}><FiShare2 size={14} /> Chia sẻ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
