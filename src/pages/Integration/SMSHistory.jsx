import { useState, useMemo } from 'react'
import { FiSearch, FiDownload, FiCheck, FiX, FiRefreshCw, FiSend, FiMessageSquare } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const initialSms = customers.slice(0, 10).map((c, i) => ({
    id: i + 1, name: c.name, code: `KH_00185${52 + i}`, phone: c.phone,
    content: 'Kính chào Quý Khách. Cảm ơn Quý khách đã sử dụng dịch vụ. Trong trường hợp Quý Khách cần sự trợ giúp có thể liên hệ 19006627. Xin cảm ơn!',
    status: i < 9 ? 'success' : 'failed', type: i < 7 ? 'SMS' : 'ZNS', date: '27/02/2026'
}))

export default function SMSHistory() {
    const [data, setData] = useState(initialSms)
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState('Lịch sử')
    const [statusFilter, setStatusFilter] = useState('')
    const toast = useToast()

    const filtered = useMemo(() => data.filter(s => {
        const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search) || s.phone.includes(search)
        const matchStatus = !statusFilter || s.status === statusFilter
        return matchSearch && matchStatus
    }), [data, search, statusFilter])

    const total = data.length
    const success = data.filter(s => s.status === 'success').length
    const failed = data.filter(s => s.status === 'failed').length

    const handleResend = (id) => {
        setData(prev => prev.map(s => s.id === id ? { ...s, status: 'success' } : s))
        toast.success('Đã gửi lại tin nhắn thành công')
    }

    const handleExport = () => {
        const csv = 'Tên,Mã KH,SĐT,Nội dung,TT gửi,Loại,Ngày\n' + filtered.map(s => `${s.name},${s.code},${s.phone},"${s.content}",${s.status},${s.type},${s.date}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lich-su-sms.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    const handleResendAll = () => {
        setData(prev => prev.map(s => s.status === 'failed' ? { ...s, status: 'success' } : s))
        toast.success(`Đã gửi lại ${failed} tin nhắn thất bại`)
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Tích Hợp — Lịch Sử SMS & ZNS</h1>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {['Lịch sử', 'Tình trạng đánh giá'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem' }}>Danh sách</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Danh sách SMS/ZNS đã gửi</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div className="search-box" style={{ maxWidth: '350px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm tên, mã KH, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">Tất cả</option>
                    <option value="success">Thành công</option>
                    <option value="failed">Thất bại</option>
                </select>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleExport}>
                    <FiDownload size={14} /> Xuất dữ liệu
                </button>
                {failed > 0 && (
                    <button className="btn btn-secondary" onClick={handleResendAll} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc3545' }}>
                        <FiRefreshCw size={14} /> Gửi lại {failed} tin thất bại
                    </button>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {[
                        { label: 'Tổng', value: total, bg: '#4caf50' },
                        { label: 'Thành công', value: success, bg: '#4caf50' },
                        { label: 'Thất bại', value: failed, bg: '#f44336' },
                    ].map(s => (
                        <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: s.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>{s.value}</span>
                            <span style={{ fontSize: '0.85rem' }}>{s.label}</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr><th>#</th><th>Tên</th><th>Mã KH</th><th>SĐT</th><th>Nội dung</th><th>Loại</th><th>Trạng thái</th><th>Thao tác</th></tr>
                    </thead>
                    <tbody>
                        {filtered.map((sms, i) => (
                            <tr key={sms.id} style={{ background: sms.status === 'failed' ? '#fff5f5' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '500' }}>{sms.name}</td>
                                <td><span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{sms.code}</span></td>
                                <td>{sms.phone}</td>
                                <td style={{ maxWidth: '300px', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{sms.content}</td>
                                <td><span className={`badge badge-${sms.type === 'SMS' ? 'info' : 'warning'}`}>{sms.type}</span></td>
                                <td style={{ textAlign: 'center' }}>
                                    {sms.status === 'success' ? (
                                        <FiCheck size={18} color="#4caf50" />
                                    ) : (
                                        <FiX size={18} color="#f44336" />
                                    )}
                                </td>
                                <td>
                                    {sms.status === 'failed' && (
                                        <button className="btn btn-sm btn-primary" onClick={() => handleResend(sms.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <FiSend size={12} /> Gửi lại
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
