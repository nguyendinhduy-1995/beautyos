import { useState, useMemo } from 'react'
import { FiMessageCircle, FiSearch, FiStar, FiThumbsUp, FiThumbsDown, FiX, FiSend, FiFilter } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialFeedbacks = [
    { id: 1, customer: 'Nguyễn Thị Mai', rating: 5, content: 'Dịch vụ rất tốt, nhân viên thân thiện!', service: 'Nâng cơ Hifu', date: '27/02/2026', replied: true, reply: 'Cảm ơn chị đã tin tưởng! Hẹn gặp chị lần tới.' },
    { id: 2, customer: 'Trần Văn Hùng', rating: 4, content: 'Phòng sạch sẽ, bác sĩ tận tâm.', service: 'Botox', date: '26/02/2026', replied: true, reply: 'Cảm ơn anh đánh giá cao!' },
    { id: 3, customer: 'Lê Hoàng Anh', rating: 3, content: 'Chờ hơi lâu, nhưng kết quả tốt.', service: 'Triệt lông', date: '26/02/2026', replied: false, reply: '' },
    { id: 4, customer: 'Phạm Thu Trang', rating: 5, content: 'Rất hài lòng! Sẽ quay lại.', service: 'Chăm sóc da', date: '25/02/2026', replied: true, reply: 'Xin cảm ơn chị Trang! Chúc chị luôn xinh đẹp.' },
    { id: 5, customer: 'Kim Trang', rating: 2, content: 'Giá hơi cao so với mặt bằng chung.', service: 'PRP', date: '24/02/2026', replied: false, reply: '' },
    { id: 6, customer: 'Võ Minh Tuấn', rating: 1, content: 'Không hài lòng về thái độ tư vấn.', service: 'Filler', date: '23/02/2026', replied: false, reply: '' },
    { id: 7, customer: 'Đặng Thùy Linh', rating: 5, content: 'Tuyệt vời! Da đẹp lên thấy rõ sau 1 tuần.', service: 'Nâng cơ Hifu', date: '22/02/2026', replied: true, reply: 'Rất vui khi chị hài lòng!' },
]

export default function MobileFeedback() {
    const toast = useToast()
    const [data, setData] = useState(initialFeedbacks)
    const [search, setSearch] = useState('')
    const [ratingFilter, setRatingFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [replyModal, setReplyModal] = useState(null)
    const [replyText, setReplyText] = useState('')
    const [detailItem, setDetailItem] = useState(null)

    const filtered = useMemo(() => {
        let result = data
        if (search) { const q = search.toLowerCase(); result = result.filter(f => f.customer.toLowerCase().includes(q) || f.content.toLowerCase().includes(q) || f.service.toLowerCase().includes(q)) }
        if (ratingFilter !== 'all') result = result.filter(f => f.rating === +ratingFilter)
        if (statusFilter === 'replied') result = result.filter(f => f.replied)
        if (statusFilter === 'pending') result = result.filter(f => !f.replied)
        return result
    }, [data, search, ratingFilter, statusFilter])

    const avg = (data.reduce((s, f) => s + f.rating, 0) / data.length).toFixed(1)
    const positiveCount = data.filter(f => f.rating >= 4).length
    const negativeCount = data.filter(f => f.rating <= 2).length
    const pendingCount = data.filter(f => !f.replied).length

    const openReply = (f) => {
        setReplyModal(f)
        setReplyText(f.reply || `Cảm ơn ${f.customer.split(' ').pop()} đã phản hồi! Chúng tôi sẽ cải thiện để phục vụ tốt hơn.`)
    }
    const sendReply = () => {
        if (!replyText.trim()) return toast.warning('Nhập nội dung phản hồi')
        setData(prev => prev.map(f => f.id === replyModal.id ? { ...f, replied: true, reply: replyText } : f))
        toast.success(`Đã phản hồi cho ${replyModal.customer}`)
        setReplyModal(null)
    }
    const replyAll = () => {
        const pending = data.filter(f => !f.replied)
        if (pending.length === 0) return toast.info('Tất cả đã được phản hồi')
        setData(prev => prev.map(f => f.replied ? f : { ...f, replied: true, reply: `Cảm ơn ${f.customer.split(' ').pop()} đã phản hồi! Chúng tôi rất trân trọng ý kiến của bạn.` }))
        toast.success(`Đã phản hồi ${pending.length} đánh giá!`)
    }

    const renderStars = (rating) => [1, 2, 3, 4, 5].map(s =>
        <FiStar key={s} size={14} fill={s <= rating ? '#f39c12' : 'none'} color={s <= rating ? '#f39c12' : '#e0e0e0'} />
    )

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Phản Hồi Khách Hàng</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Đánh giá và phản hồi từ ứng dụng</p></div>
                <button className="btn btn-primary" onClick={replyAll}><FiSend size={14} /> Phản hồi tất cả ({pendingCount})</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiStar color="#f39c12" /></div><div><div className="stat-label">Điểm trung bình</div><div className="stat-value" style={{ color: '#f39c12' }}>{avg} ⭐</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiThumbsUp color="#28a745" /></div><div><div className="stat-label">Tích cực (4-5⭐)</div><div className="stat-value" style={{ color: '#28a745' }}>{positiveCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#ffebee' }}><FiThumbsDown color="#dc3545" /></div><div><div className="stat-label">Tiêu cực (1-2⭐)</div><div className="stat-value" style={{ color: '#dc3545' }}>{negativeCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiMessageCircle color="#1a73e8" /></div><div><div className="stat-label">Chưa phản hồi</div><div className="stat-value" style={{ color: '#1a73e8' }}>{pendingCount}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm theo tên, nội dung, dịch vụ..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
                    <option value="all">Tất cả sao</option>
                    <option value="5">5 sao</option><option value="4">4 sao</option><option value="3">3 sao</option><option value="2">2 sao</option><option value="1">1 sao</option>
                </select>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="replied">Đã trả lời</option>
                    <option value="pending">Chưa trả lời</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)', background: 'white', borderRadius: '10px' }}>Không tìm thấy phản hồi</div>}
                {filtered.map(f => (
                    <div key={f.id} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', background: 'white', borderLeft: `4px solid ${f.rating >= 4 ? '#28a745' : f.rating >= 3 ? '#ff9800' : '#dc3545'}` }}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{f.customer}</span>
                                <span className="badge badge-processing" style={{ marginLeft: '8px', fontSize: '0.7rem' }}>{f.service}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '2px' }}>{renderStars(f.rating)}</div>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '8px', lineHeight: 1.5 }}>"{f.content}"</p>
                        {f.replied && f.reply && (
                            <div style={{ background: '#f0fdf4', padding: '8px 12px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '8px', borderLeft: '3px solid #28a745' }}>
                                <strong style={{ color: '#28a745' }}>Phản hồi:</strong> {f.reply}
                            </div>
                        )}
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-light)', alignItems: 'center' }}>
                            <span>📅 {f.date}</span>
                            {f.replied ?
                                <span style={{ color: '#28a745', fontWeight: 600 }}>✓ Đã trả lời</span> :
                                <button className="btn btn-sm btn-primary" onClick={() => openReply(f)}><FiMessageCircle size={12} /> Trả lời</button>
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Modal */}
            {replyModal && (
                <div className="modal-overlay" onClick={() => setReplyModal(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>💬 Phản Hồi Đánh Giá</h2><button className="btn-close" onClick={() => setReplyModal(null)}><FiX /></button></div>
                        <div className="modal-body">
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '12px' }}>
                                <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <strong>{replyModal.customer}</strong>
                                    <div style={{ display: 'flex', gap: '2px' }}>{renderStars(replyModal.rating)}</div>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', margin: 0 }}>"{replyModal.content}"</p>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '4px' }}>{replyModal.service} • {replyModal.date}</div>
                            </div>
                            <div className="form-group">
                                <label>Nội dung phản hồi</label>
                                <textarea className="form-control" rows="4" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Nhập nội dung phản hồi..." style={{ resize: 'vertical' }} />
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{replyText.length} ký tự</div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setReplyModal(null)}>Huỷ</button><button className="btn btn-primary" onClick={sendReply}><FiSend size={14} /> Gửi phản hồi</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
