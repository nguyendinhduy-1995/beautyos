import { useState, useMemo } from 'react'
import { FiLock, FiUnlock, FiCalendar, FiCheckCircle, FiAlertCircle, FiDownload, FiEye, FiX, FiTrendingUp, FiTrendingDown, FiBarChart2 } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialClosings = [
    { id: 1, date: '27/02/2026', warehouse: 'Kho chính', openQty: 1250, importQty: 180, exportQty: 95, closeQty: 1335, diff: 0, status: 'pending', staff: 'Nguyễn Văn A', note: '' },
    { id: 2, date: '26/02/2026', warehouse: 'Kho chính', openQty: 1180, importQty: 120, exportQty: 50, closeQty: 1250, diff: 0, status: 'closed', staff: 'Nguyễn Văn A', note: 'Đã kiểm kê đầy đủ' },
    { id: 3, date: '25/02/2026', warehouse: 'Kho phụ', openQty: 380, importQty: 50, exportQty: 30, closeQty: 400, diff: 0, status: 'closed', staff: 'Trần Thị B', note: '' },
    { id: 4, date: '24/02/2026', warehouse: 'Kho chính', openQty: 1150, importQty: 80, exportQty: 50, closeQty: 1180, diff: 0, status: 'closed', staff: 'Nguyễn Văn A', note: '' },
    { id: 5, date: '23/02/2026', warehouse: 'Kho chính', openQty: 1100, importQty: 100, exportQty: 50, closeQty: 1150, diff: 0, status: 'closed', staff: 'Nguyễn Văn A', note: 'Chênh lệch 0' },
]

export default function WarehouseClosing() {
    const toast = useToast()
    const [data, setData] = useState(initialClosings)
    const [confirmAction, setConfirmAction] = useState(null)
    const [detailItem, setDetailItem] = useState(null)

    const handleClose = (id) => {
        setConfirmAction({
            title: '🔒 Chốt kho?', message: 'Sau khi chốt, số liệu kho sẽ không thể thay đổi. Bạn có chắc?',
            onConfirm: () => { setData(prev => prev.map(d => d.id === id ? { ...d, status: 'closed' } : d)); setConfirmAction(null); toast.success('Đã chốt kho thành công!') }
        })
    }
    const handleReopen = (id) => {
        setConfirmAction({
            title: '🔓 Mở lại phiếu?', message: 'Phiếu chốt sẽ được mở lại để chỉnh sửa. Tiếp tục?',
            onConfirm: () => { setData(prev => prev.map(d => d.id === id ? { ...d, status: 'pending' } : d)); setConfirmAction(null); toast.info('Đã mở lại phiếu chốt') }
        })
    }
    const handleCloseToday = () => {
        const pending = data.filter(d => d.status === 'pending')
        if (pending.length === 0) return toast.info('Không có phiếu nào cần chốt')
        setConfirmAction({
            title: '🔒 Chốt tất cả hôm nay?', message: `Sẽ chốt ${pending.length} phiếu đang chờ. Tiếp tục?`,
            onConfirm: () => { setData(prev => prev.map(d => d.status === 'pending' ? { ...d, status: 'closed' } : d)); setConfirmAction(null); toast.success(`Đã chốt ${pending.length} phiếu!`) }
        })
    }
    const handleExport = () => {
        const csv = 'Ngày,Kho,Tồn đầu,Nhập,Xuất,Tồn cuối,Chênh lệch,Trạng thái,Người chốt\n' + data.map(d =>
            `${d.date},${d.warehouse},${d.openQty},${d.importQty},${d.exportQty},${d.closeQty},${d.diff},${d.status === 'closed' ? 'Đã chốt' : 'Chờ'},${d.staff}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'chot-kho.csv'; a.click()
        toast.success('Đã xuất file CSV')
    }

    const closedCount = data.filter(d => d.status === 'closed').length
    const pendingCount = data.filter(d => d.status === 'pending').length
    const totalImport = data.reduce((s, d) => s + d.importQty, 0)
    const totalExport = data.reduce((s, d) => s + d.exportQty, 0)

    return (
        <div className="page-container">
            {confirmAction && <ConfirmDialog isOpen={true} title={confirmAction.title} message={confirmAction.message} onConfirm={confirmAction.onConfirm} onCancel={() => setConfirmAction(null)} />}

            <div className="page-header">
                <div><h1 className="page-title">Chốt Kho</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Đối soát và chốt số liệu kho cuối ngày</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExport}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-primary" onClick={handleCloseToday}><FiLock size={14} /> Chốt kho hôm nay</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheckCircle color="#28a745" /></div><div><div className="stat-label">Đã chốt</div><div className="stat-value">{closedCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiAlertCircle color="#ff9800" /></div><div><div className="stat-label">Chờ chốt</div><div className="stat-value" style={{ color: '#ff9800' }}>{pendingCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiTrendingUp color="#1a73e8" /></div><div><div className="stat-label">Tổng nhập</div><div className="stat-value" style={{ color: '#28a745' }}>+{totalImport}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiTrendingDown color="#e91e63" /></div><div><div className="stat-label">Tổng xuất</div><div className="stat-value" style={{ color: '#dc3545' }}>-{totalExport}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: totalImport - totalExport >= 0 ? '#e8f5e9' : '#ffebee' }}><FiBarChart2 color={totalImport - totalExport >= 0 ? '#28a745' : '#dc3545'} /></div><div><div className="stat-label">Biến động ròng</div><div className="stat-value" style={{ color: totalImport - totalExport >= 0 ? '#28a745' : '#dc3545' }}>{totalImport - totalExport >= 0 ? '+' : ''}{totalImport - totalExport}</div></div></div>
            </div>

            {/* Inventory Flow Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiBarChart2 size={14} color="var(--color-primary)" /> Lưu lượng nhập/xuất theo ngày</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {data.slice(0, 5).map(d => {
                            const maxVal = Math.max(...data.map(x => Math.max(x.importQty, x.exportQty)))
                            return (
                                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '70px', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-light)' }}>{d.date.substring(0, 5)}</span>
                                    <div style={{ flex: 1, display: 'flex', gap: '2px', alignItems: 'center' }}>
                                        <div style={{ width: `${(d.importQty / maxVal) * 50}%`, height: '14px', background: 'linear-gradient(90deg, #a8e6c2, #28a745)', borderRadius: '3px', minWidth: '4px' }} />
                                        <div style={{ width: `${(d.exportQty / maxVal) * 50}%`, height: '14px', background: 'linear-gradient(90deg, #f8a8a8, #dc3545)', borderRadius: '3px', minWidth: '4px' }} />
                                    </div>
                                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', minWidth: '60px' }}>+{d.importQty} / -{d.exportQty}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.72rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#28a745' }} /> Nhập</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#dc3545' }} /> Xuất</span>
                    </div>
                </div>

                {/* Warehouse Summary */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiCalendar size={14} color="var(--color-primary)" /> Tồn kho theo kho</div>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {(() => {
                            const whMap = {}
                            data.forEach(d => {
                                if (!whMap[d.warehouse]) whMap[d.warehouse] = { latest: 0, entries: 0 }
                                whMap[d.warehouse].entries++
                                if (d.closeQty > whMap[d.warehouse].latest) whMap[d.warehouse].latest = d.closeQty
                            })
                            return Object.entries(whMap).map(([wh, info]) => (
                                <div key={wh} style={{ padding: '10px 14px', background: '#f8f9fa', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{wh}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{info.entries} phiếu chốt</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{info.latest.toLocaleString()}</div>
                                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>tồn cao nhất</div>
                                    </div>
                                </div>
                            ))
                        })()}
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>Ngày</th><th>Kho</th><th>Tồn đầu</th><th>Nhập</th><th>Xuất</th><th>Tồn cuối</th><th>Chênh lệch</th><th>Trạng thái</th><th>Người chốt</th><th></th></tr></thead>
                    <tbody>
                        {data.map(d => (
                            <tr key={d.id} style={{ background: d.status === 'pending' ? '#fffbeb' : undefined }}>
                                <td style={{ fontWeight: 600 }}><FiCalendar size={12} style={{ marginRight: 4 }} />{d.date}</td>
                                <td>{d.warehouse}</td>
                                <td>{d.openQty.toLocaleString()}</td>
                                <td style={{ color: '#28a745', fontWeight: 600 }}>+{d.importQty}</td>
                                <td style={{ color: '#dc3545', fontWeight: 600 }}>-{d.exportQty}</td>
                                <td style={{ fontWeight: 700 }}>{d.closeQty.toLocaleString()}</td>
                                <td>{d.diff === 0 ? <span style={{ color: '#28a745' }}>✓ Khớp</span> : <span style={{ color: '#dc3545' }}>Lệch {d.diff}</span>}</td>
                                <td>{d.status === 'closed' ? <span className="badge badge-success">Đã chốt</span> : <span className="badge badge-warning">Chờ chốt</span>}</td>
                                <td>{d.staff}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => setDetailItem(d)} title="Chi tiết"><FiEye size={13} /></button>
                                        {d.status === 'pending' ?
                                            <button className="btn btn-sm btn-primary" onClick={() => handleClose(d.id)} title="Chốt"><FiLock size={13} /></button> :
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleReopen(d.id)} title="Mở lại"><FiUnlock size={13} /></button>
                                        }
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>📋 Chi Tiết Chốt Kho</h2><button className="btn-close" onClick={() => setDetailItem(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { label: 'Ngày', value: detailItem.date },
                                    { label: 'Kho', value: detailItem.warehouse },
                                    { label: 'Tồn đầu kỳ', value: detailItem.openQty.toLocaleString() },
                                    { label: 'Tồn cuối kỳ', value: detailItem.closeQty.toLocaleString() },
                                    { label: 'Tổng nhập', value: `+${detailItem.importQty}` },
                                    { label: 'Tổng xuất', value: `-${detailItem.exportQty}` },
                                    { label: 'Chênh lệch', value: detailItem.diff === 0 ? '✓ Khớp' : `Lệch ${detailItem.diff}` },
                                    { label: 'Người chốt', value: detailItem.staff },
                                ].map((item, i) => (
                                    <div key={i}><div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{item.label}</div><div style={{ fontWeight: 600 }}>{item.value}</div></div>
                                ))}
                            </div>
                            {detailItem.note && <div style={{ marginTop: '12px', padding: '10px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem' }}><strong>Ghi chú:</strong> {detailItem.note}</div>}
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setDetailItem(null)}>Đóng</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
