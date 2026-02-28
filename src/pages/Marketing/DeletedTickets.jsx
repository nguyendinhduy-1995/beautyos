import { useState } from 'react'
import { FiTrash2, FiRefreshCw, FiSearch, FiAlertTriangle } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const deleted = [
    { id: 'TK-0890', customer: 'Nguyễn Thị Hoa', service: 'Triệt lông Laser', deletedDate: '27/02/2026', deletedBy: 'Admin', reason: 'Khách hủy dịch vụ' },
    { id: 'TK-0823', customer: 'Trần Minh Đức', service: 'Botox', deletedDate: '26/02/2026', deletedBy: 'KTV Lan', reason: 'Duplicate ticket' },
    { id: 'TK-0801', customer: 'Lê Thị Lan', service: 'Mesotherapy', deletedDate: '25/02/2026', deletedBy: 'Admin', reason: 'Test ticket' },
    { id: 'TK-0789', customer: 'Phạm Quốc Bảo', service: 'PRP trẻ hoá', deletedDate: '24/02/2026', deletedBy: 'BS My', reason: 'Sai thông tin' },
    { id: 'TK-0750', customer: 'Hoàng Thị Mai', service: 'Chăm sóc da', deletedDate: '23/02/2026', deletedBy: 'KTV Trang', reason: 'Khách không đến' },
]

export default function DeletedTickets() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(deleted)
    const [deleteId, setDeleteId] = useState(null)
    const toast = useToast()
    const filtered = data.filter(t => t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search))

    const handleRestore = (id) => { setData(d => d.filter(t => t.id !== id)); toast.success('Đã khôi phục ticket') }
    const handlePermanentDelete = () => {
        setData(d => d.filter(t => t.id !== deleteId))
        toast.info('Đã xóa vĩnh viễn')
        setDeleteId(null)
    }

    return (
        <div className="fade-in">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa vĩnh viễn?" message="Ticket sẽ bị xóa vĩnh viễn, không thể hoàn tác!"
                onConfirm={handlePermanentDelete} onCancel={() => setDeleteId(null)} type="danger" />

            <div className="page-header"><h2>Ticket Đã Xóa</h2><p>Danh sách ticket đã bị xóa — có thể khôi phục</p></div>
            <div style={{ padding: '12px 16px', background: '#fff3cd', borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#856404', fontSize: '0.85rem' }}>
                <FiAlertTriangle /> Ticket đã xóa sẽ bị xóa vĩnh viễn sau 30 ngày
            </div>
            <div className="card">
                <div className="card-header">
                    <div className="search-box"><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm ticket đã xóa..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>
                <table className="data-table">
                    <thead><tr><th>Mã ticket</th><th>Khách hàng</th><th>Dịch vụ</th><th>Ngày xóa</th><th>Người xóa</th><th>Lý do</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        {filtered.map(t => (
                            <tr key={t.id} style={{ opacity: 0.7 }}>
                                <td style={{ fontWeight: 600, textDecoration: 'line-through' }}>{t.id}</td>
                                <td>{t.customer}</td>
                                <td>{t.service}</td>
                                <td>{t.deletedDate}</td>
                                <td>{t.deletedBy}</td>
                                <td>{t.reason}</td>
                                <td style={{ display: 'flex', gap: '6px' }}>
                                    <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleRestore(t.id)}><FiRefreshCw size={12} /> Khôi phục</button>
                                    <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem', color: 'var(--accent-red)' }} onClick={() => setDeleteId(t.id)}><FiTrash2 size={12} /> Xóa vĩnh viễn</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
