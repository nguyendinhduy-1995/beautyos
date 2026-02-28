import { useState, useMemo } from 'react'
import { FiSearch, FiFilter, FiDownload, FiPackage, FiArrowUp, FiArrowDown, FiRefreshCw, FiX, FiCalendar, FiEye } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialMovements = [
    { id: 'BD001', date: '27/02/2026', type: 'Nhập kho', product: 'Serum Vitamin C 20ml', qty: 50, before: 120, after: 170, staff: 'Nguyễn Văn A', ref: 'PN-2026-042', note: 'Nhập hàng từ ABC Cosmetics' },
    { id: 'BD002', date: '27/02/2026', type: 'Xuất kho', product: 'Kem chống nắng SPF50', qty: 10, before: 85, after: 75, staff: 'Trần Thị B', ref: 'PX-2026-018', note: 'Xuất cho dịch vụ chăm sóc' },
    { id: 'BD003', date: '26/02/2026', type: 'Xuất kho', product: 'Gel rửa mặt 150ml', qty: 5, before: 200, after: 195, staff: 'KTV Mai', ref: 'PX-2026-017', note: 'Sử dụng cho khách hàng' },
    { id: 'BD004', date: '26/02/2026', type: 'Nhập kho', product: 'Mặt nạ Collagen', qty: 100, before: 50, after: 150, staff: 'Nguyễn Văn A', ref: 'PN-2026-041', note: 'Đợt nhập hàng tháng 2' },
    { id: 'BD005', date: '25/02/2026', type: 'Chuyển kho', product: 'Tinh dầu Lavender 10ml', qty: 20, before: 60, after: 40, staff: 'Lê Văn C', ref: 'CK-2026-005', note: 'Chuyển sang chi nhánh 2' },
    { id: 'BD006', date: '25/02/2026', type: 'Xuất kho', product: 'Bông tẩy trang (hộp)', qty: 15, before: 300, after: 285, staff: 'KTV Trang', ref: 'PX-2026-016', note: 'Tiêu hao hàng ngày' },
    { id: 'BD007', date: '24/02/2026', type: 'Nhập kho', product: 'AHA/BHA Toner 200ml', qty: 30, before: 25, after: 55, staff: 'Nguyễn Văn A', ref: 'PN-2026-040', note: 'Bổ sung hàng thiếu' },
    { id: 'BD008', date: '24/02/2026', type: 'Hủy', product: 'Kem dưỡng ẩm (hết hạn)', qty: 8, before: 42, after: 34, staff: 'Trần Thị B', ref: 'HK-2026-003', note: 'Hết hạn sử dụng 20/02/2026' },
]

export default function InventoryLookup() {
    const toast = useToast()
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [dateFilter, setDateFilter] = useState('')
    const [staffFilter, setStaffFilter] = useState('all')
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [showDetail, setShowDetail] = useState(false)

    const staffList = [...new Set(initialMovements.map(m => m.staff))]

    const filtered = useMemo(() => {
        return initialMovements.filter(m =>
            (typeFilter === 'all' || m.type === typeFilter) &&
            (staffFilter === 'all' || m.staff === staffFilter) &&
            (!dateFilter || m.date.includes(dateFilter)) &&
            (m.product.toLowerCase().includes(search.toLowerCase()) || m.ref.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search, typeFilter, staffFilter, dateFilter])

    const stats = useMemo(() => ({
        nhap: filtered.filter(m => m.type === 'Nhập kho').length,
        xuat: filtered.filter(m => m.type === 'Xuất kho').length,
        chuyen: filtered.filter(m => m.type === 'Chuyển kho').length,
        huy: filtered.filter(m => m.type === 'Hủy').length,
        totalQty: filtered.reduce((s, m) => s + m.qty, 0),
    }), [filtered])

    const getTypeBadge = (type) => {
        const styles = { 'Nhập kho': 'badge-success', 'Xuất kho': 'badge-warning', 'Chuyển kho': 'badge-processing', 'Hủy': 'badge-cancelled' }
        return <span className={`badge ${styles[type] || ''}`}>{type}</span>
    }
    const getIcon = (type) => {
        if (type === 'Nhập kho') return <FiArrowDown color="#28a745" />
        if (type === 'Xuất kho') return <FiArrowUp color="#ff9800" />
        if (type === 'Chuyển kho') return <FiRefreshCw color="#1a73e8" />
        return <FiPackage color="#dc3545" />
    }

    const handleExport = () => {
        const csv = 'Mã,Ngày,Loại,Sản phẩm,SL,Trước,Sau,Người TH,Mã phiếu,Ghi chú\n' + filtered.map(m =>
            `${m.id},${m.date},${m.type},${m.product},${m.qty},${m.before},${m.after},${m.staff},${m.ref},${m.note || ''}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'bien-dong-kho.csv'; a.click()
        toast.success('Đã xuất file Excel (CSV)')
    }

    const clearFilters = () => {
        setSearch(''); setTypeFilter('all'); setDateFilter(''); setStaffFilter('all')
        toast.info('Đã xóa bộ lọc')
    }

    const viewDetail = (m) => { setSelectedRow(m); setShowDetail(true) }

    const hasFilters = search || typeFilter !== 'all' || dateFilter || staffFilter !== 'all'

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Tra Cứu Biến Động Kho</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Theo dõi lịch sử nhập xuất và biến động tồn kho</p></div>
                <button className="btn btn-primary" onClick={handleExport}><FiDownload size={14} /> Xuất Excel</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiArrowDown color="#28a745" /></div><div><div className="stat-label">Phiếu nhập</div><div className="stat-value">{stats.nhap}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiArrowUp color="#ff9800" /></div><div><div className="stat-label">Phiếu xuất</div><div className="stat-value">{stats.xuat}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiRefreshCw color="#1a73e8" /></div><div><div className="stat-label">Chuyển kho</div><div className="stat-value">{stats.chuyen}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiPackage color="#dc3545" /></div><div><div className="stat-label">Hủy</div><div className="stat-value">{stats.huy}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiPackage color="#9c27b0" /></div><div><div className="stat-label">Tổng SL</div><div className="stat-value">{stats.totalQty}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '12px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm sản phẩm, mã phiếu..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">Tất cả loại</option><option value="Nhập kho">Nhập kho</option><option value="Xuất kho">Xuất kho</option><option value="Chuyển kho">Chuyển kho</option><option value="Hủy">Hủy</option>
                </select>
                <button className={`btn ${showAdvanced ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setShowAdvanced(!showAdvanced)}><FiFilter size={14} /> Lọc nâng cao</button>
                {hasFilters && <button className="btn btn-secondary" onClick={clearFilters}><FiX size={14} /> Xóa lọc</button>}
            </div>

            {/* Advanced Filter Panel */}
            {showAdvanced && (
                <div style={{ background: 'white', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid var(--color-border)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ margin: 0, flex: '1 1 200px' }}><label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Ngày</label><input type="text" className="form-control" placeholder="dd/mm/yyyy" value={dateFilter} onChange={e => setDateFilter(e.target.value)} /></div>
                    <div className="form-group" style={{ margin: 0, flex: '1 1 200px' }}><label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Nhân viên</label><select className="form-control" value={staffFilter} onChange={e => setStaffFilter(e.target.value)}>
                        <option value="all">Tất cả</option>
                        {staffList.map(s => <option key={s}>{s}</option>)}
                    </select></div>
                </div>
            )}

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Mã</th><th>Ngày</th><th>Loại</th><th>Sản phẩm</th><th>SL</th><th>Trước</th><th>Sau</th><th>Người TH</th><th>Mã phiếu</th><th></th></tr></thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>Không tìm thấy kết quả</td></tr>
                        ) : filtered.map(m => (
                            <tr key={m.id} onClick={() => viewDetail(m)} style={{ cursor: 'pointer', background: selectedRow?.id === m.id ? '#f0f9ff' : undefined }}>
                                <td style={{ fontWeight: 600 }}>{m.id}</td>
                                <td>{m.date}</td>
                                <td>{getTypeBadge(m.type)}</td>
                                <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{getIcon(m.type)} {m.product}</div></td>
                                <td style={{ fontWeight: 600 }}>{m.qty}</td>
                                <td>{m.before}</td>
                                <td style={{ fontWeight: 600, color: m.after > m.before ? '#28a745' : '#dc3545' }}>{m.after}</td>
                                <td>{m.staff}</td>
                                <td><span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{m.ref}</span></td>
                                <td><button className="btn btn-sm btn-secondary" onClick={(e) => { e.stopPropagation(); viewDetail(m) }}><FiEye size={13} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {showDetail && selectedRow && (
                <div className="modal-overlay" onClick={() => setShowDetail(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>📋 Chi Tiết Biến Động</h2><button className="btn-close" onClick={() => setShowDetail(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { label: 'Mã biến động', value: selectedRow.id },
                                    { label: 'Ngày', value: selectedRow.date },
                                    { label: 'Loại', value: selectedRow.type },
                                    { label: 'Mã phiếu', value: selectedRow.ref },
                                    { label: 'Sản phẩm', value: selectedRow.product },
                                    { label: 'Số lượng', value: selectedRow.qty },
                                    { label: 'Trước', value: selectedRow.before },
                                    { label: 'Sau', value: selectedRow.after },
                                    { label: 'Người thực hiện', value: selectedRow.staff },
                                ].map((item, i) => (
                                    <div key={i} style={{ padding: '8px 0' }}>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginBottom: '2px' }}>{item.label}</div>
                                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            {selectedRow.note && (
                                <div style={{ marginTop: '12px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>Ghi chú</div>
                                    <div style={{ fontSize: '0.85rem' }}>{selectedRow.note}</div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowDetail(false)}>Đóng</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
