import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiPackage, FiCheck, FiDownload, FiClock, FiEye, FiPrinter, FiPieChart, FiTrendingUp } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialSlips = [
    { id: 1, code: 'NK-001', supplier: 'Cty Mỹ Phẩm ABC', date: '27/02/2026', items: [{ name: 'Serum Vitamin C', qty: 50, price: 120000 }, { name: 'Kem dưỡng ẩm', qty: 100, price: 80000 }, { name: 'Toner AHA', qty: 30, price: 60000 }], total: 15800000, status: 'Đã duyệt', staff: 'Nguyễn Văn A', note: 'Lô hàng đợt 1 tháng 2' },
    { id: 2, code: 'NK-002', supplier: 'Cty Thiết Bị Y Tế XYZ', date: '26/02/2026', items: [{ name: 'Filler HA 1ml', qty: 20, price: 200000 }, { name: 'Botox 100U', qty: 10, price: 350000 }], total: 7500000, status: 'Chờ duyệt', staff: 'Trần Thị B', note: '' },
    { id: 3, code: 'NK-003', supplier: 'Cty Dược Phẩm DEF', date: '25/02/2026', items: [{ name: 'Kem chống nắng SPF50', qty: 200, price: 45000 }, { name: 'Mặt nạ collagen', qty: 300, price: 15000 }], total: 13500000, status: 'Đã duyệt', staff: 'Lê Văn C', note: 'Hàng bổ sung' },
    { id: 4, code: 'NK-004', supplier: 'Cty Mỹ Phẩm ABC', date: '24/02/2026', items: [{ name: 'Tinh chất Niacinamide', qty: 40, price: 105000 }], total: 4200000, status: 'Chờ duyệt', staff: 'Phạm Thị D', note: 'Đơn bổ sung gấp' },
    { id: 5, code: 'NK-005', supplier: 'Cty Bao Bì GHI', date: '23/02/2026', items: [{ name: 'Hộp đựng mỹ phẩm', qty: 500, price: 8000 }, { name: 'Túi quà tặng', qty: 200, price: 12000 }], total: 6400000, status: 'Đã duyệt', staff: 'Nguyễn Văn A', note: '' },
]

export default function ImportStock() {
    const [data, setData] = useState(initialSlips)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [detailItem, setDetailItem] = useState(null)
    const [expandedId, setExpandedId] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(s => {
        const q = search.toLowerCase()
        const matchSearch = !search || s.code.toLowerCase().includes(q) || s.supplier.toLowerCase().includes(q) || s.staff.toLowerCase().includes(q)
        const matchStatus = !statusFilter || s.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const approved = data.filter(s => s.status === 'Đã duyệt').length
    const pending = data.filter(s => s.status === 'Chờ duyệt').length
    const totalValue = data.reduce((s, d) => s + d.total, 0)
    const totalItems = data.reduce((s, d) => s + d.items.length, 0)

    const handleApprove = (id) => { setData(prev => prev.map(s => s.id === id ? { ...s, status: 'Đã duyệt' } : s)); toast.success('Đã duyệt phiếu nhập') }
    const handleExport = () => toast.success('Đã xuất CSV')
    const handlePrint = (code) => toast.info(`Đang in phiếu ${code}...`)

    const handleCreate = () => {
        const supplier = document.getElementById('is-supplier')?.value?.trim()
        const itemsCount = parseInt(document.getElementById('is-items')?.value) || 1
        const total = parseInt(document.getElementById('is-total')?.value) || 0
        const note = document.getElementById('is-note')?.value?.trim()
        if (!supplier) return toast.warning('Nhập tên NCC')
        setData(prev => [...prev, { id: Date.now(), code: `NK-${String(prev.length + 1).padStart(3, '0')}`, supplier, date: new Date().toLocaleDateString('vi-VN'), items: Array.from({ length: itemsCount }, (_, i) => ({ name: `Sản phẩm ${i + 1}`, qty: 10, price: Math.round(total / itemsCount / 10) })), total, status: 'Chờ duyệt', staff: 'Admin', note: note || '' }])
        setShowModal(false); toast.success('Đã tạo phiếu nhập')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Phiếu Nhập Kho</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý phiếu nhập hàng từ nhà cung cấp</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo phiếu nhập</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng phiếu</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đã duyệt</div><div className="stat-value" style={{ color: '#28a745' }}>{approved}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chờ duyệt</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiPackage color="#28a745" /></div><div><div className="stat-label">Tổng giá trị</div><div className="stat-value" style={{ fontSize: '1rem' }}>{formatCurrency(totalValue)}</div></div></div>
            </div>

            {/* Supplier Distribution + Approval Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Phân bố NCC</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {[...new Set(data.map(s => s.supplier))].map((sup, i) => {
                            const count = data.filter(s => s.supplier === sup).length
                            const value = data.filter(s => s.supplier === sup).reduce((s, d) => s + d.total, 0)
                            const colors = ['#1a73e8', '#28a745', '#ff9800', '#9c27b0', '#e91e63']
                            return (
                                <div key={sup} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '120px', fontSize: '0.75rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sup}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${totalValue > 0 ? (value / totalValue) * 100 : 0}%`, height: '100%', borderRadius: '4px', background: colors[i % colors.length], transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.68rem', fontWeight: 600, minWidth: '50px', textAlign: 'right' }}>{count} phiếu</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiTrendingUp size={14} color="#28a745" /> Tỉ lệ duyệt phiếu</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#28a745' }}>{data.length > 0 ? Math.round(approved / data.length * 100) : 0}%</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                            <div>{approved} đã duyệt / {data.length} tổng</div>
                            <div style={{ marginTop: '2px' }}>{pending} đang chờ duyệt</div>
                        </div>
                    </div>
                    <div style={{ height: '10px', background: '#e9ecef', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${data.length > 0 ? (approved / data.length) * 100 : 0}%`, height: '100%', borderRadius: '5px', background: 'linear-gradient(90deg, #28a745, #20c997)', transition: 'width 0.5s' }} />
                    </div>
                    {pending > 0 && <div style={{ marginTop: '8px', padding: '8px 12px', background: '#fffde7', borderRadius: '8px', border: '1px solid #fff176', fontSize: '0.78rem', color: '#f57f17' }}>⚠ {pending} phiếu đang chờ duyệt — cần xử lý</div>}
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã phiếu, NCC..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option><option value="Đã duyệt">Đã duyệt</option><option value="Chờ duyệt">Chờ duyệt</option>
                </select>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{totalItems} sản phẩm · {filtered.length} phiếu</span>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th></th><th>Mã</th><th>Nhà cung cấp</th><th>Ngày</th><th>Số SP</th><th>Tổng tiền</th><th>NV</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 && <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy</td></tr>}
                        {filtered.map(s => (
                            <>
                                <tr key={s.id} style={{ background: s.status === 'Chờ duyệt' ? '#fffde7' : 'transparent', cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}>
                                    <td style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', width: '30px' }}>{expandedId === s.id ? '▼' : '▶'}</td>
                                    <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{s.code}</td>
                                    <td style={{ fontWeight: '500' }}>{s.supplier}</td>
                                    <td>{s.date}</td>
                                    <td><span className="badge badge-info">{s.items.length} SP</span></td>
                                    <td style={{ fontWeight: '600' }}>{formatCurrency(s.total)}</td>
                                    <td>{s.staff}</td>
                                    <td><span className={`badge badge-${s.status === 'Đã duyệt' ? 'success' : 'warning'}`}>{s.status}</span></td>
                                    <td onClick={e => e.stopPropagation()}>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" onClick={() => setDetailItem(s)} title="Chi tiết"><FiEye size={14} /></button>
                                            <button className="btn-icon" onClick={() => handlePrint(s.code)} title="In"><FiPrinter size={14} /></button>
                                            {s.status === 'Chờ duyệt' && <button className="btn btn-sm btn-primary" onClick={() => handleApprove(s.id)} style={{ padding: '4px 10px', fontSize: '0.78rem' }}><FiCheck size={12} /> Duyệt</button>}
                                        </div>
                                    </td>
                                </tr>
                                {expandedId === s.id && (
                                    <tr key={`${s.id}-detail`}>
                                        <td colSpan="9" style={{ background: '#f8f9fa', padding: '16px 32px' }}>
                                            <h4 style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '8px' }}>Chi tiết sản phẩm — {s.code}</h4>
                                            {s.note && <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', marginBottom: '8px', fontStyle: 'italic' }}>📝 {s.note}</p>}
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead><tr style={{ background: '#e9ecef' }}><th style={{ padding: '6px 10px', textAlign: 'left', fontSize: '0.8rem' }}>#</th><th style={{ padding: '6px 10px', textAlign: 'left', fontSize: '0.8rem' }}>Sản phẩm</th><th style={{ padding: '6px 10px', textAlign: 'right', fontSize: '0.8rem' }}>SL</th><th style={{ padding: '6px 10px', textAlign: 'right', fontSize: '0.8rem' }}>Đơn giá</th><th style={{ padding: '6px 10px', textAlign: 'right', fontSize: '0.8rem' }}>Thành tiền</th></tr></thead>
                                                <tbody>
                                                    {s.items.map((item, i) => (
                                                        <tr key={i} style={{ borderBottom: '1px solid #e9ecef' }}>
                                                            <td style={{ padding: '6px 10px', fontSize: '0.82rem' }}>{i + 1}</td>
                                                            <td style={{ padding: '6px 10px', fontSize: '0.82rem', fontWeight: 500 }}>{item.name}</td>
                                                            <td style={{ padding: '6px 10px', fontSize: '0.82rem', textAlign: 'right' }}>{item.qty}</td>
                                                            <td style={{ padding: '6px 10px', fontSize: '0.82rem', textAlign: 'right' }}>{formatCurrency(item.price)}</td>
                                                            <td style={{ padding: '6px 10px', fontSize: '0.82rem', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(item.qty * item.price)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr style={{ background: '#e3f2fd' }}>
                                                        <td colSpan="4" style={{ padding: '8px 10px', fontSize: '0.85rem', fontWeight: 700, textAlign: 'right' }}>Tổng cộng:</td>
                                                        <td style={{ padding: '8px 10px', fontSize: '0.85rem', fontWeight: 700, textAlign: 'right', color: 'var(--color-primary)' }}>{formatCurrency(s.total)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {detailItem && (
                <div className="modal-overlay" onClick={() => setDetailItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                        <div className="modal-header"><h2>📋 Phiếu Nhập {detailItem.code}</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {[['Mã phiếu', detailItem.code], ['Nhà cung cấp', detailItem.supplier], ['Ngày nhập', detailItem.date], ['Nhân viên', detailItem.staff]].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Số sản phẩm</div><div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{detailItem.items.length}</div></div>
                                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Tổng giá trị</div><div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#28a745' }}>{formatCurrency(detailItem.total)}</div></div>
                                </div>
                                {detailItem.note && <div style={{ padding: '10px', background: '#fffde7', borderRadius: '8px', fontSize: '0.85rem' }}>📝 {detailItem.note}</div>}
                                <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Trạng thái</span>
                                    <span className={`badge badge-${detailItem.status === 'Đã duyệt' ? 'success' : 'warning'}`}>{detailItem.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {detailItem.status === 'Chờ duyệt' && <button className="btn btn-primary" onClick={() => { handleApprove(detailItem.id); setDetailItem(null) }}><FiCheck size={14} /> Duyệt</button>}
                            <button className="btn btn-secondary" onClick={() => handlePrint(detailItem.code)}><FiPrinter size={14} /> In</button>
                            <button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>📦 Tạo Phiếu Nhập</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Nhà cung cấp *</label><input id="is-supplier" className="form-control" placeholder="Tên NCC" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Số sản phẩm</label><input id="is-items" type="number" className="form-control" placeholder="5" /></div>
                                <div className="form-group"><label>Tổng tiền</label><input id="is-total" type="number" className="form-control" placeholder="1000000" /></div>
                            </div>
                            <div className="form-group"><label>Ghi chú</label><textarea id="is-note" className="form-control" rows="2" placeholder="Ghi chú phiếu nhập..." /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
