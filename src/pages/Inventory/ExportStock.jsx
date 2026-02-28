import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiPackage, FiCheck, FiDownload, FiClock, FiChevronDown, FiChevronRight, FiPrinter } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialSlips = [
    {
        id: 1, code: 'XK-001', target: 'Phòng điều trị 1', date: '27/02/2026', items: 3, total: 2500000, status: 'Đã xuất', staff: 'Nguyễn Văn A', note: 'Bổ sung vật tư tuần',
        signed: true, signedBy: 'BS. Nguyễn Thị Mai', signedAt: '27/02/2026 14:30',
        details: [
            { name: 'Serum Vitamin C 20ml', qty: 2, unit: 'Chai', price: 500000 },
            { name: 'Gel rửa mặt 150ml', qty: 1, unit: 'Tuýp', price: 350000 },
            { name: 'Mặt nạ Collagen', qty: 5, unit: 'Miếng', price: 250000 },
        ]
    },
    {
        id: 2, code: 'XK-002', target: 'Phòng điều trị 2', date: '26/02/2026', items: 5, total: 4200000, status: 'Chờ xuất', staff: 'Trần Thị B', note: 'Yêu cầu bổ sung gấp',
        signed: false, signedBy: null, signedAt: null,
        details: [
            { name: 'Kem chống nắng SPF50', qty: 3, unit: 'Tuýp', price: 450000 },
            { name: 'Tinh dầu Lavender 10ml', qty: 5, unit: 'Lọ', price: 180000 },
            { name: 'Bông tẩy trang', qty: 10, unit: 'Hộp', price: 85000 },
            { name: 'Găng tay y tế', qty: 5, unit: 'Hộp', price: 120000 },
            { name: 'Khăn giấy ướt', qty: 8, unit: 'Gói', price: 45000 },
        ]
    },
    {
        id: 3, code: 'XK-003', target: 'Quầy lễ tân', date: '25/02/2026', items: 2, total: 1800000, status: 'Đã xuất', staff: 'Lê Văn C', note: '',
        signed: true, signedBy: 'Admin', signedAt: '25/02/2026 10:00',
        details: [
            { name: 'Kem dưỡng ẩm 50ml', qty: 4, unit: 'Hũ', price: 350000 },
            { name: 'Sữa rửa mặt 200ml', qty: 2, unit: 'Chai', price: 200000 },
        ]
    },
    {
        id: 4, code: 'XK-004', target: 'Phòng laser', date: '24/02/2026', items: 4, total: 6500000, status: 'Chờ xuất', staff: 'Phạm Thị D', note: 'Thiết bị mới',
        signed: false, signedBy: null, signedAt: null,
        details: [
            { name: 'Gel laser cooling', qty: 5, unit: 'Tuýp', price: 650000 },
            { name: 'Kính bảo hộ IPL', qty: 2, unit: 'Cái', price: 500000 },
            { name: 'Đầu tip laser', qty: 1, unit: 'Cái', price: 2500000 },
            { name: 'Khăn lạnh', qty: 20, unit: 'Chiếc', price: 25000 },
        ]
    },
    {
        id: 5, code: 'XK-005', target: 'Phòng phẫu thuật', date: '23/02/2026', items: 7, total: 12000000, status: 'Đã xuất', staff: 'Nguyễn Văn A', note: 'Ca phẫu thuật ngày mai',
        signed: true, signedBy: 'BS. Trần Văn Hùng', signedAt: '23/02/2026 08:15',
        details: [
            { name: 'Kim tiêm các loại', qty: 20, unit: 'Cái', price: 50000 },
            { name: 'Gạc vô trùng', qty: 10, unit: 'Gói', price: 120000 },
            { name: 'Dung dịch sát trùng', qty: 3, unit: 'Chai', price: 280000 },
            { name: 'Chỉ khâu thẩm mỹ', qty: 5, unit: 'Cuộn', price: 1500000 },
            { name: 'Thuốc tê', qty: 10, unit: 'Ống', price: 350000 },
        ]
    },
]

export default function ExportStock() {
    const [data, setData] = useState(initialSlips)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [expandedId, setExpandedId] = useState(null)
    const toast = useToast()

    const handleSign = (id) => {
        setData(prev => prev.map(s => s.id === id ? { ...s, signed: true, signedBy: 'Admin', signedAt: '28/02/2026 ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) } : s))
        toast.success('Đã ký phiếu xuất')
    }

    const filtered = useMemo(() => data.filter(s => {
        const matchSearch = !search || s.code.toLowerCase().includes(search.toLowerCase()) || s.target.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'all' || s.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const exported = data.filter(s => s.status === 'Đã xuất').length
    const pending = data.filter(s => s.status === 'Chờ xuất').length
    const totalValue = data.reduce((s, d) => s + d.total, 0)
    const totalItems = data.reduce((s, d) => s + d.items, 0)

    const handleExportSlip = (id) => {
        setData(prev => prev.map(s => s.id === id ? { ...s, status: 'Đã xuất' } : s))
        toast.success('Đã xuất kho')
    }

    const handleCreate = () => {
        const target = document.getElementById('es-target')?.value?.trim()
        const items = parseInt(document.getElementById('es-items')?.value) || 1
        const total = parseInt(document.getElementById('es-total')?.value) || 0
        const note = document.getElementById('es-note')?.value?.trim() || ''
        if (!target) return toast.warning('Nhập nơi nhận')
        setData(prev => [...prev, {
            id: Date.now(), code: `XK-${String(prev.length + 1).padStart(3, '0')}`, target, date: '27/02/2026',
            items, total, status: 'Chờ xuất', staff: 'Admin', note, details: []
        }])
        setShowModal(false); toast.success('Đã tạo phiếu xuất')
    }

    const handlePrint = (slip) => {
        toast.info(`In phiếu ${slip.code}...`)
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Xuất Vật Tư</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý phiếu xuất vật tư cho các phòng · Click vào phiếu để xem chi tiết</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => toast.success('Đã xuất CSV')}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo phiếu xuất</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiPackage color="#1a73e8" /></div><div><div className="stat-label">Tổng phiếu</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đã xuất</div><div className="stat-value" style={{ color: '#28a745' }}>{exported}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Chờ xuất</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiPackage color="#9c27b0" /></div><div><div className="stat-label">Tổng VT</div><div className="stat-value">{totalItems}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiPackage color="#dc3545" /></div><div><div className="stat-label">Tổng giá trị</div><div className="stat-value" style={{ fontSize: '0.95rem' }}>{formatCurrency(totalValue)}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã phiếu, nơi nhận..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option><option value="Đã xuất">Đã xuất</option><option value="Chờ xuất">Chờ xuất</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th></th><th>Mã</th><th>Nơi nhận</th><th>Ngày</th><th>Số VT</th><th>Tổng tiền</th><th>NV</th><th>Ghi chú</th><th>Ký tên</th><th>Trạng thái</th><th></th></tr></thead>
                    <tbody>
                        {filtered.map(s => (
                            <>
                                <tr key={s.id} style={{ background: s.status === 'Chờ xuất' ? '#fffbe6' : undefined, cursor: 'pointer' }}
                                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}>
                                    <td style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                                        {expandedId === s.id ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                                    </td>
                                    <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{s.code}</td>
                                    <td style={{ fontWeight: '500' }}>{s.target}</td>
                                    <td>{s.date}</td>
                                    <td><span className="badge badge-info">{s.items}</span></td>
                                    <td style={{ fontWeight: '600' }}>{formatCurrency(s.total)}</td>
                                    <td>{s.staff}</td>
                                    <td style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.note || '—'}</td>
                                    <td>
                                        {s.signed ? (
                                            <span className="badge badge-arrived" style={{ fontSize: '0.72rem' }}>✓ Đã ký</span>
                                        ) : (
                                            <span className="badge badge-cancelled" style={{ fontSize: '0.72rem', background: '#fff3e0', color: '#e65100' }}>Chưa ký tên</span>
                                        )}
                                    </td>
                                    <td><span className={`badge badge-${s.status === 'Đã xuất' ? 'success' : 'warning'}`}>{s.status}</span></td>
                                    <td onClick={e => e.stopPropagation()}>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {s.status === 'Chờ xuất' && <button className="btn btn-sm btn-primary" onClick={() => handleExportSlip(s.id)}><FiCheck size={13} /> Xuất</button>}
                                            {!s.signed && <button className="btn btn-sm btn-secondary" style={{ color: '#1a73e8' }} onClick={() => handleSign(s.id)}>✍️ Ký</button>}
                                            <button className="btn btn-sm btn-secondary" onClick={() => handlePrint(s)}><FiPrinter size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedId === s.id && (
                                    <tr key={`${s.id}-detail`}>
                                        <td colSpan="11" style={{ background: '#f8f9fa', padding: '16px 32px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                                                <div>
                                                    <h4 style={{ fontSize: '0.82rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Chi tiết vật tư ({s.details.length} mục)</h4>
                                                    <table style={{ width: '100%', fontSize: '0.82rem' }}>
                                                        <thead><tr style={{ background: '#e9ecef' }}>
                                                            <th style={{ padding: '6px 10px', textAlign: 'left' }}>Tên vật tư</th>
                                                            <th style={{ padding: '6px 10px', textAlign: 'center' }}>SL</th>
                                                            <th style={{ padding: '6px 10px', textAlign: 'center' }}>ĐVT</th>
                                                            <th style={{ padding: '6px 10px', textAlign: 'right' }}>Đơn giá</th>
                                                            <th style={{ padding: '6px 10px', textAlign: 'right' }}>Thành tiền</th>
                                                        </tr></thead>
                                                        <tbody>
                                                            {s.details.map((d, i) => (
                                                                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                                                    <td style={{ padding: '6px 10px' }}>{d.name}</td>
                                                                    <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: '600' }}>{d.qty}</td>
                                                                    <td style={{ padding: '6px 10px', textAlign: 'center' }}>{d.unit}</td>
                                                                    <td style={{ padding: '6px 10px', textAlign: 'right' }}>{formatCurrency(d.price)}</td>
                                                                    <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: '600' }}>{formatCurrency(d.qty * d.price)}</td>
                                                                </tr>
                                                            ))}
                                                            <tr style={{ background: '#e8f5e9', fontWeight: '700' }}>
                                                                <td colSpan="4" style={{ padding: '8px 10px', textAlign: 'right' }}>Tổng cộng:</td>
                                                                <td style={{ padding: '8px 10px', textAlign: 'right', color: '#28a745' }}>{formatCurrency(s.details.reduce((sum, d) => sum + d.qty * d.price, 0))}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '0.82rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Thông tin phiếu</h4>
                                                    {[
                                                        { label: 'Mã phiếu', value: s.code },
                                                        { label: 'Ngày tạo', value: s.date },
                                                        { label: 'Nơi nhận', value: s.target },
                                                        { label: 'Người tạo', value: s.staff },
                                                        { label: 'Trạng thái', value: s.status },
                                                        { label: 'Ký tên', value: s.signed ? `✓ ${s.signedBy}` : '⚠ Chưa ký tên' },
                                                        ...(s.signedAt ? [{ label: 'Ký lúc', value: s.signedAt }] : []),
                                                    ].map((info, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '0.82rem' }}>
                                                            <span style={{ color: 'var(--color-text-light)' }}>{info.label}</span>
                                                            <span style={{ fontWeight: '500', color: info.label === 'Ký tên' && !s.signed ? '#e65100' : undefined }}>{info.value}</span>
                                                        </div>
                                                    ))}
                                                    {s.note && (
                                                        <div style={{ marginTop: '10px', padding: '8px', background: '#fff3e0', borderRadius: '6px', fontSize: '0.78rem', color: '#e65100' }}>
                                                            📝 {s.note}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>📦 Tạo Phiếu Xuất</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Nơi nhận *</label><input id="es-target" className="form-control" placeholder="VD: Phòng điều trị 1" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Số vật tư</label><input id="es-items" type="number" className="form-control" placeholder="3" /></div>
                                <div className="form-group"><label>Tổng tiền</label><input id="es-total" type="number" className="form-control" placeholder="1000000" /></div>
                            </div>
                            <div className="form-group"><label>Ghi chú</label><textarea id="es-note" className="form-control" placeholder="Ghi chú thêm..." style={{ minHeight: '60px' }} /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
