import { useState, useMemo } from 'react'
import { FiSearch, FiPackage, FiAlertTriangle, FiCheck, FiClock, FiPlus, FiX, FiEye, FiCalendar, FiDownload, FiFilter } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialBatches = [
    { id: 'LO001', product: 'Serum Vitamin C', sku: 'SP-001', quantity: 200, remaining: 145, mfgDate: '01/01/2026', expDate: '01/01/2027', supplier: 'Hàn Quốc Import', warehouse: 'Kho chính', status: 'active' },
    { id: 'LO002', product: 'Kem chống nắng SPF50', sku: 'SP-005', quantity: 150, remaining: 8, mfgDate: '15/06/2025', expDate: '15/06/2026', supplier: 'La Roche-Posay', warehouse: 'Kho chính', status: 'low' },
    { id: 'LO003', product: 'Filler HA 1ml', sku: 'SP-010', quantity: 50, remaining: 50, mfgDate: '01/02/2026', expDate: '01/08/2026', supplier: 'Medica Korea', warehouse: 'Kho lạnh', status: 'active' },
    { id: 'LO004', product: 'Botox 100U', sku: 'SP-011', quantity: 30, remaining: 12, mfgDate: '10/12/2025', expDate: '10/03/2026', supplier: 'Allergan', warehouse: 'Kho lạnh', status: 'expiring' },
    { id: 'LO005', product: 'Mặt nạ collagen', sku: 'SP-003', quantity: 500, remaining: 0, mfgDate: '01/03/2025', expDate: '01/03/2026', supplier: 'JM Solution', warehouse: 'Kho chính', status: 'expired' },
    { id: 'LO006', product: 'Toner AHA/BHA', sku: 'SP-007', quantity: 300, remaining: 220, mfgDate: '20/01/2026', expDate: '20/01/2027', supplier: 'COSRX', warehouse: 'Kho chính', status: 'active' },
    { id: 'LO007', product: 'Tinh chất Niacinamide', sku: 'SP-008', quantity: 100, remaining: 5, mfgDate: '01/11/2025', expDate: '01/05/2026', supplier: 'The Ordinary', warehouse: 'Kho chính', status: 'low' },
]

const statusMap = { active: { label: 'Bình thường', badge: 'success' }, low: { label: 'Sắp hết', badge: 'warning' }, expiring: { label: 'Sắp hạn', badge: 'danger' }, expired: { label: 'Hết hạn', badge: 'secondary' } }

export default function BatchManagement() {
    const [data, setData] = useState(initialBatches)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [detailItem, setDetailItem] = useState(null)
    const [disposeId, setDisposeId] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(b => {
        const q = search.toLowerCase()
        const matchSearch = !search || b.product.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.sku.toLowerCase().includes(q)
        const matchStatus = !statusFilter || b.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const active = data.filter(b => b.status === 'active').length
    const low = data.filter(b => b.status === 'low').length
    const expiring = data.filter(b => b.status === 'expiring').length
    const expired = data.filter(b => b.status === 'expired').length
    const totalRemaining = data.reduce((s, b) => s + b.remaining, 0)

    const handleDispose = () => {
        setData(prev => prev.filter(b => b.id !== disposeId))
        toast.info('Đã xử lý lô hàng')
        setDisposeId(null)
    }

    const handleCreate = () => {
        const product = document.getElementById('bm-product')?.value?.trim()
        const quantity = parseInt(document.getElementById('bm-qty')?.value) || 0
        const supplier = document.getElementById('bm-supplier')?.value?.trim()
        if (!product || !quantity) return toast.warning('Vui lòng nhập đủ thông tin')
        const id = `LO${String(data.length + 1).padStart(3, '0')}`
        setData(prev => [...prev, { id, product, sku: `SP-${String(data.length + 12).padStart(3, '0')}`, quantity, remaining: quantity, mfgDate: new Date().toLocaleDateString('vi-VN'), expDate: '—', supplier: supplier || '', warehouse: 'Kho chính', status: 'active' }])
        setShowModal(false)
        toast.success('Đã thêm lô hàng mới')
    }

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!disposeId} title="Xử lý lô hàng?" message="Lô hàng này sẽ được ghi nhận đã xử lý (hủy/trả hàng). Tiếp tục?"
                onConfirm={handleDispose} onCancel={() => setDisposeId(null)} type="warning" />

            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản Lý Lô Hàng</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Theo dõi lô hàng, hạn sử dụng và tồn kho</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => toast.success('Đã xuất dữ liệu lô hàng')} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiDownload size={14} /> Xuất</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Thêm lô</button>
                </div>
            </div>

            {/* Expiry Alert Banner */}
            {(expiring > 0 || expired > 0) && (
                <div style={{ background: 'linear-gradient(90deg, #fff5f5, #ffebee)', border: '1px solid #ffcdd2', borderRadius: '10px', padding: '12px 18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiAlertTriangle size={18} color="#dc3545" />
                    <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, color: '#dc3545', fontSize: '0.88rem' }}>⚠️ Cảnh báo hạn sử dụng</span>
                        <span style={{ fontSize: '0.82rem', marginLeft: '8px', color: 'var(--color-text)' }}>
                            {expiring > 0 && <span>{expiring} lô <strong>sắp hết hạn</strong></span>}
                            {expiring > 0 && expired > 0 && ' • '}
                            {expired > 0 && <span>{expired} lô <strong>đã hết hạn</strong></span>}
                        </span>
                    </div>
                    <button className="btn btn-sm" onClick={() => setStatusFilter('expiring')} style={{ padding: '4px 12px', fontSize: '0.75rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Xem ngay</button>
                </div>
            )}

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Bình thường</div><div className="stat-value" style={{ color: '#28a745' }}>{active}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiAlertTriangle color="#ff9800" /></div><div><div className="stat-label">Sắp hết</div><div className="stat-value" style={{ color: '#ff9800' }}>{low}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiClock color="#dc3545" /></div><div><div className="stat-label">Sắp hạn</div><div className="stat-value" style={{ color: '#dc3545' }}>{expiring}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f5f5f5' }}><FiX color="#999" /></div><div><div className="stat-label">Hết hạn</div><div className="stat-value" style={{ color: '#999' }}>{expired}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tồn kho</div><div className="stat-value">{totalRemaining.toLocaleString()}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm sản phẩm, mã lô..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả trạng thái</option><option value="active">Bình thường</option><option value="low">Sắp hết</option><option value="expiring">Sắp hạn</option><option value="expired">Hết hạn</option>
                </select>
                <select className="filter-select" value={''} onChange={e => { if (e.target.value) setSearch(e.target.value) }}>
                    <option value="">Tất cả kho</option>
                    <option value="Kho chính">Kho chính</option>
                    <option value="Kho lạnh">Kho lạnh</option>
                </select>
                <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--color-text-light)' }}>{filtered.length}/{data.length} lô</span>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã lô</th><th>Sản phẩm</th><th>SKU</th><th>SL nhập</th><th>Còn lại</th><th>NSX</th><th>HSD</th><th>NCC</th><th>Kho</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.length === 0 && <tr><td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy</td></tr>}
                        {filtered.map(b => (
                            <tr key={b.id} style={{ background: b.status === 'expired' ? '#fafafa' : b.status === 'expiring' ? '#fff5f5' : b.status === 'low' ? '#fffde7' : 'transparent', opacity: b.status === 'expired' ? 0.7 : 1 }}>
                                <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{b.id}</td>
                                <td style={{ fontWeight: 500 }}>{b.product}</td>
                                <td style={{ fontSize: '0.82rem', color: 'var(--color-text-light)' }}>{b.sku}</td>
                                <td>{b.quantity}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontWeight: 600, color: b.remaining <= 10 ? '#dc3545' : '#28a745' }}>{b.remaining}</span>
                                        <div style={{ width: '40px', height: '4px', background: '#e9ecef', borderRadius: '2px' }}>
                                            <div style={{ width: `${Math.min((b.remaining / b.quantity) * 100, 100)}%`, height: '100%', borderRadius: '2px', background: b.remaining <= 10 ? '#dc3545' : '#28a745' }} />
                                        </div>
                                    </div>
                                </td>
                                <td style={{ fontSize: '0.82rem' }}>{b.mfgDate}</td>
                                <td style={{ fontSize: '0.82rem', fontWeight: b.status === 'expiring' ? 700 : 400, color: b.status === 'expiring' ? '#dc3545' : 'inherit' }}>{b.expDate}</td>
                                <td style={{ fontSize: '0.82rem' }}>{b.supplier}</td>
                                <td><span className="badge badge-info">{b.warehouse}</span></td>
                                <td><span className={`badge badge-${statusMap[b.status]?.badge}`}>{statusMap[b.status]?.label}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn-icon" onClick={() => setDetailItem(b)} title="Chi tiết"><FiEye size={14} /></button>
                                        {(b.status === 'expired' || b.status === 'expiring') && (
                                            <button className="btn btn-sm btn-secondary" onClick={() => setDisposeId(b.id)} style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#dc3545' }}>Xử lý</button>
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>📦 Chi Tiết Lô {detailItem.id}</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {[['Sản phẩm', detailItem.product], ['SKU', detailItem.sku], ['Nhà cung cấp', detailItem.supplier], ['Kho', detailItem.warehouse]].map(([l, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{l}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>SL nhập</div><div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{detailItem.quantity}</div></div>
                                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Còn lại</div><div style={{ fontSize: '1.2rem', fontWeight: 700, color: detailItem.remaining <= 10 ? '#dc3545' : '#28a745' }}>{detailItem.remaining}</div></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}><FiCalendar size={12} /> NSX</span><span style={{ fontSize: '0.85rem' }}>{detailItem.mfgDate}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}><FiCalendar size={12} /> HSD</span><span style={{ fontSize: '0.85rem', fontWeight: 600, color: detailItem.status === 'expiring' || detailItem.status === 'expired' ? '#dc3545' : 'inherit' }}>{detailItem.expDate}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Trạng thái</span>
                                    <span className={`badge badge-${statusMap[detailItem.status]?.badge}`}>{statusMap[detailItem.status]?.label}</span>
                                </div>
                                <div style={{ padding: '8px', background: detailItem.remaining > 0 ? '#f0fff4' : '#fff5f5', borderRadius: '8px' }}>
                                    <div style={{ width: '100%', height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${(detailItem.remaining / detailItem.quantity) * 100}%`, height: '100%', borderRadius: '4px', background: detailItem.remaining <= 10 ? '#dc3545' : '#28a745', transition: 'width 0.3s' }} />
                                    </div>
                                    <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-light)', marginTop: '4px' }}>{Math.round((detailItem.remaining / detailItem.quantity) * 100)}% còn lại</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button></div>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>📦 Thêm Lô Hàng</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Sản phẩm *</label><input id="bm-product" className="form-control" placeholder="Tên sản phẩm" /></div>
                            <div className="form-group"><label>Số lượng *</label><input id="bm-qty" type="number" className="form-control" placeholder="0" /></div>
                            <div className="form-group"><label>Nhà cung cấp</label><input id="bm-supplier" className="form-control" placeholder="Tên NCC" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Thêm</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
