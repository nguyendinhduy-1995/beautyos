import { useState } from 'react'
import { FiBell, FiSend, FiPlus, FiX, FiUsers, FiCheck, FiClock } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialNotifs = [
    { id: 1, title: 'Khuyến mãi cuối tháng 2', content: 'Giảm 20% tất cả dịch vụ từ 25-28/02!', target: 'Tất cả KH', sentAt: '25/02/2026 09:00', status: 'sent', recipients: 245 },
    { id: 2, title: 'Nhắc lịch hẹn', content: 'Quý khách có lịch hẹn lúc...', target: 'KH có lịch hẹn', sentAt: '27/02/2026 07:00', status: 'sent', recipients: 12 },
    { id: 3, title: 'Dịch vụ mới', content: 'Trải nghiệm dịch vụ Hifu mới nhất!', target: 'KH VIP', sentAt: null, status: 'draft', recipients: 0 },
    { id: 4, title: 'Sinh nhật tháng 3', content: 'Chúc mừng sinh nhật! Tặng voucher 100K', target: 'KH sinh nhật T3', sentAt: null, status: 'scheduled', recipients: 18 },
]

export default function MobileNotifications() {
    const [data, setData] = useState(initialNotifs)
    const [showModal, setShowModal] = useState(false)
    const toast = useToast()

    const sent = data.filter(n => n.status === 'sent').length
    const draft = data.filter(n => n.status === 'draft').length
    const scheduled = data.filter(n => n.status === 'scheduled').length

    const handleSend = (id) => {
        setData(prev => prev.map(n => n.id === id ? { ...n, status: 'sent', sentAt: 'Vừa gửi', recipients: n.recipients || 50 } : n))
        toast.success('Đã gửi thông báo')
    }

    const handleCreate = () => {
        const title = document.getElementById('mn-title')?.value?.trim()
        const content = document.getElementById('mn-content')?.value?.trim()
        if (!title || !content) return toast.warning('Nhập đủ thông tin')
        setData(prev => [...prev, { id: Date.now(), title, content, target: 'Tất cả KH', sentAt: null, status: 'draft', recipients: 0 }])
        setShowModal(false); toast.success('Đã tạo thông báo')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Gửi Thông Báo</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Gửi push notification đến app khách hàng</p></div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo thông báo</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div><div><div className="stat-label">Đã gửi</div><div className="stat-value" style={{ color: '#28a745' }}>{sent}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiBell color="#1a73e8" /></div><div><div className="stat-label">Nháp</div><div className="stat-value" style={{ color: '#1a73e8' }}>{draft}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiClock color="#ff9800" /></div><div><div className="stat-label">Đã hẹn</div><div className="stat-value" style={{ color: '#ff9800' }}>{scheduled}</div></div></div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {data.map(n => (
                    <div key={n.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,.06)', borderLeft: `4px solid ${n.status === 'sent' ? '#28a745' : n.status === 'scheduled' ? '#ff9800' : '#1a73e8'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 6px', fontSize: '1rem' }}>{n.title}</h3>
                                <p style={{ margin: '0 0 8px', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>{n.content}</p>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: '#888' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUsers size={12} /> {n.target}</span>
                                    {n.sentAt && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiClock size={12} /> {n.sentAt}</span>}
                                    <span>{n.recipients} người nhận</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className={`badge badge-${n.status === 'sent' ? 'success' : n.status === 'scheduled' ? 'warning' : 'info'}`}>{n.status === 'sent' ? 'Đã gửi' : n.status === 'scheduled' ? 'Đã hẹn' : 'Nháp'}</span>
                                {n.status !== 'sent' && <button className="btn btn-sm btn-primary" onClick={() => handleSend(n.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiSend size={13} /> Gửi</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>Tạo Thông Báo</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tiêu đề *</label><input id="mn-title" className="form-control" placeholder="Tiêu đề thông báo" /></div>
                            <div className="form-group"><label>Nội dung *</label><textarea id="mn-content" className="form-control" rows="3" placeholder="Nội dung..." /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleCreate}>Tạo</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
