import { useState, useMemo } from 'react'
import { FiSearch, FiAlertTriangle, FiPlus, FiX, FiCheck, FiClock } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialRecords = [
    { id: 1, staff: 'Nguyễn Văn A', type: 'Đi trễ', date: '25/02/2026', severity: 'Nhẹ', fine: 100000, note: 'Đi trễ 30 phút', resolved: false },
    { id: 2, staff: 'Trần Thị B', type: 'Nghỉ không phép', date: '23/02/2026', severity: 'Nặng', fine: 500000, note: 'Nghỉ 1 ngày không báo', resolved: true },
    { id: 3, staff: 'Lê Văn C', type: 'Vi phạm quy định', date: '20/02/2026', severity: 'Trung bình', fine: 200000, note: 'Không mặc đồng phục', resolved: false },
    { id: 4, staff: 'Phạm Thị D', type: 'Đi trễ', date: '18/02/2026', severity: 'Nhẹ', fine: 100000, note: 'Đi trễ 15 phút', resolved: true },
    { id: 5, staff: 'Hoàng Văn E', type: 'Phản hồi KH kém', date: '15/02/2026', severity: 'Trung bình', fine: 300000, note: 'Khách hàng phàn nàn', resolved: false },
]

export default function StaffDiscipline() {
    const [data, setData] = useState(initialRecords)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(r =>
        !search || r.staff.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase())
    ), [data, search])

    const pending = data.filter(r => !r.resolved).length
    const resolved = data.filter(r => r.resolved).length
    const totalFine = data.reduce((s, r) => s + r.fine, 0)

    const handleResolve = (id) => {
        setData(prev => prev.map(r => r.id === id ? { ...r, resolved: true } : r))
        toast.success('Đã giải quyết')
    }

    const handleCreate = () => {
        const staff = document.getElementById('d-staff')?.value?.trim()
        const type = document.getElementById('d-type')?.value?.trim()
        const fine = parseInt(document.getElementById('d-fine')?.value) || 0
        if (!staff || !type) return toast.warning('Vui lòng nhập đủ thông tin')
        setData(prev => [...prev, { id: Date.now(), staff, type, date: new Date().toLocaleDateString('vi-VN'), severity: 'Trung bình', fine, note: '', resolved: false }])
        setShowModal(false)
        toast.success('Đã thêm chế tài')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Chế Tài Nhân Viên</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý vi phạm và xử phạt</p></div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Thêm</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiAlertTriangle color="#ff9800" /></div><div><div className="stat-label">Chưa xử lý</div><div className="stat-value" style={{ color: '#ff9800' }}>{pending}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đã xử lý</div><div className="stat-value" style={{ color: '#28a745' }}>{resolved}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiClock color="#dc3545" /></div><div><div className="stat-label">Tổng phạt</div><div className="stat-value" style={{ color: '#dc3545' }}>{totalFine.toLocaleString()}₫</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm nhân viên..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead><tr><th>#</th><th>NV</th><th>Vi phạm</th><th>Ngày</th><th>Mức độ</th><th>Phạt</th><th>Ghi chú</th><th>TT</th><th></th></tr></thead>
                    <tbody>
                        {filtered.map((r, i) => (
                            <tr key={r.id} style={{ background: !r.resolved ? '#fffbeb' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{r.staff}</td>
                                <td>{r.type}</td>
                                <td>{r.date}</td>
                                <td><span className={`badge badge-${r.severity === 'Nhẹ' ? 'info' : r.severity === 'Trung bình' ? 'warning' : 'danger'}`}>{r.severity}</span></td>
                                <td style={{ fontWeight: '600', color: '#dc3545' }}>{r.fine.toLocaleString()}₫</td>
                                <td style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{r.note}</td>
                                <td><span className={`badge badge-${r.resolved ? 'success' : 'warning'}`}>{r.resolved ? 'Xong' : 'Chờ'}</span></td>
                                <td>{!r.resolved && <button className="btn btn-sm btn-primary" onClick={() => handleResolve(r.id)}><FiCheck size={13} /></button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>Thêm Chế Tài</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Nhân viên *</label><input id="d-staff" className="form-control" placeholder="Tên" /></div>
                            <div className="form-group"><label>Vi phạm *</label><input id="d-type" className="form-control" placeholder="VD: Đi trễ" /></div>
                            <div className="form-group"><label>Phạt (₫)</label><input id="d-fine" type="number" className="form-control" placeholder="100000" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Thêm</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
