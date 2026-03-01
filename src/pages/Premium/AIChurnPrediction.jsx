import { useState } from 'react'
import { FiAlertTriangle, FiUsers, FiTrendingDown, FiMail, FiPhone, FiGift, FiArrowRight } from 'react-icons/fi'

const customers = [
    { id: 1, name: 'Nguyễn Thị Mai', lastVisit: '45 ngày', ltv: '12,500,000đ', risk: 92, visits: 8, reason: 'Không quay lại sau liệu trình, giảm tương tác', segment: 'VIP' },
    { id: 2, name: 'Trần Văn Hùng', lastVisit: '38 ngày', ltv: '8,200,000đ', risk: 78, visits: 5, reason: 'Hủy 2 lịch hẹn gần đây, phàn nàn về giá', segment: 'Regular' },
    { id: 3, name: 'Lê Thị Lan', lastVisit: '60 ngày', ltv: '15,800,000đ', risk: 88, visits: 12, reason: 'Chuyển sang đối thủ gần nhà, feedback giảm', segment: 'VIP' },
    { id: 4, name: 'Phạm Minh Tuấn', lastVisit: '25 ngày', ltv: '4,500,000đ', risk: 55, visits: 3, reason: 'Tần suất giảm, bỏ lỡ 1 lịch hẹn gần đây', segment: 'New' },
    { id: 5, name: 'Hoàng Thị Hoa', lastVisit: '52 ngày', ltv: '20,100,000đ', risk: 95, visits: 15, reason: 'Ngừng mua package, không phản hồi SMS', segment: 'Diamond' },
    { id: 6, name: 'Vũ Đức Anh', lastVisit: '18 ngày', ltv: '3,200,000đ', risk: 32, visits: 2, reason: 'Lịch sử ngắn, chưa đủ data để phân tích', segment: 'New' },
]

const templates = [
    { name: 'Win-back VIP', type: 'sms', content: 'Chào [TÊN], BeautyOS nhớ bạn! 🎁 Ưu đãi 20% dịch vụ yêu thích dành riêng cho bạn. Đặt lịch ngay!', target: 'Risk > 80%' },
    { name: 'Nhắc nhở nhẹ', type: 'zns', content: 'Xin chào [TÊN], đã lâu chưa gặp bạn. Đội ngũ BeautyOS mong chờ phục vụ bạn trở lại 💆', target: 'Risk 50-80%' },
    { name: 'Ưu đãi sinh nhật', type: 'email', content: 'Happy Birthday [TÊN]! 🎂 Quà tặng đặc biệt: Miễn phí 1 buổi chăm sóc da cơ bản', target: 'Tất cả' },
    { name: 'Giới thiệu dịch vụ mới', type: 'sms', content: 'Tin hot! BeautyOS ra mắt liệu trình [DỊCH VỤ] mới. Bạn thuộc 100 KH đầu tiên được giảm 30%!', target: 'Risk > 60%' },
]

export default function AIChurnPrediction() {
    const [tab, setTab] = useState('risk')
    const [filter, setFilter] = useState('all')
    const highRisk = customers.filter(c => c.risk >= 80).length
    const medRisk = customers.filter(c => c.risk >= 50 && c.risk < 80).length
    const filtered = filter === 'all' ? customers : filter === 'high' ? customers.filter(c => c.risk >= 80) : filter === 'med' ? customers.filter(c => c.risk >= 50 && c.risk < 80) : customers.filter(c => c.risk < 50)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #dc2626, #f59e0b)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiAlertTriangle size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Dự đoán Churn</h2>
                        <p>Phân tích rủi ro mất KH • Win-back templates • Hành động kịp thời</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Rủi ro cao', v: highRisk }, { l: 'Rủi ro TB', v: medRisk }, { l: 'Tổng KH theo dõi', v: customers.length }, { l: 'Templates', v: templates.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'risk', label: '⚠️ Risk Scoring' }, { id: 'winback', label: '🎯 Win-back' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#dc2626' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'risk' && (
                <div>
                    <div className="premium-filters">
                        {[{ id: 'all', label: 'Tất cả' }, { id: 'high', label: '🔴 Cao (≥80%)' }, { id: 'med', label: '🟡 TB (50-80%)' }, { id: 'low', label: '🟢 Thấp (<50%)' }].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} className="premium-filter-btn" style={{ background: filter === f.id ? '#dc2626' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b' }}>{f.label}</button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {filtered.map(c => (
                            <div key={c.id} className="premium-card" style={{ borderLeft: `3px solid ${c.risk >= 80 ? '#dc2626' : c.risk >= 50 ? '#f59e0b' : '#10b981'}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 10, background: c.risk >= 80 ? '#fef2f2' : c.risk >= 50 ? '#fffbeb' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: c.risk >= 80 ? '#dc2626' : c.risk >= 50 ? '#d97706' : '#059669' }}>
                                        {c.risk}%
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>Lần cuối: {c.lastVisit} • {c.visits} visits • LTV: {c.ltv}</div>
                                    </div>
                                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: '#f1f5f9', color: '#64748b' }}>{c.segment}</span>
                                </div>
                                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10, padding: '6px 10px', background: '#f8fafc', borderRadius: 8 }}>
                                    <FiTrendingDown size={11} style={{ marginRight: 4 }} /> {c.reason}
                                </div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    <button className="premium-action-btn" style={{ background: '#dc2626', color: 'white', flex: 1 }}><FiPhone size={11} /> Gọi ngay</button>
                                    <button className="premium-action-btn" style={{ background: '#f1f5f9', color: '#64748b', flex: 1 }}><FiMail size={11} /> Gửi SMS</button>
                                    <button className="premium-action-btn" style={{ background: '#fffbeb', color: '#d97706', flex: 1 }}><FiGift size={11} /> Ưu đãi</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'winback' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' }}>
                        <FiMail size={14} /> Template tin nhắn win-back tự động gửi theo mức risk
                    </div>
                    {templates.map((t, i) => (
                        <div key={i} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ fontSize: 16 }}>{t.type === 'sms' ? '💬' : t.type === 'zns' ? '📱' : '📧'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                                    <div style={{ fontSize: 10, color: '#94a3b8' }}>Target: {t.target} • Loại: {t.type.toUpperCase()}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: '#475569', padding: '10px 14px', background: '#f8fafc', borderRadius: 10, lineHeight: 1.6, marginBottom: 10, fontStyle: 'italic' }}>
                                "{t.content}"
                            </div>
                            <button className="premium-action-btn" style={{ background: '#dc2626', color: 'white' }}>
                                <FiArrowRight size={11} /> Gửi cho KH phù hợp
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
