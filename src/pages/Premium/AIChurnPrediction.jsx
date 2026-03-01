import { useState } from 'react'
import { FiUserX, FiAlertCircle, FiGift, FiTrendingDown, FiPhone, FiMail } from 'react-icons/fi'

const customers = [
    { id: 1, name: 'Nguyễn Thị Hoa', lastVisit: '15/12/2025', daysAway: 76, score: 85, spend: '12.5M', visits: 8, reason: 'Giảm tần suất, không phản hồi SMS', level: 'high' },
    { id: 2, name: 'Trần Văn Minh', lastVisit: '01/01/2026', daysAway: 59, score: 72, spend: '8.2M', visits: 5, reason: 'Đánh giá 2/5 sao lần cuối', level: 'high' },
    { id: 3, name: 'Lê Thị Mai', lastVisit: '15/01/2026', daysAway: 45, score: 55, spend: '5.8M', visits: 4, reason: 'Hủy 2 lịch hẹn liên tiếp', level: 'medium' },
    { id: 4, name: 'Phạm Hoàng Nam', lastVisit: '01/02/2026', daysAway: 28, score: 42, spend: '15.3M', visits: 12, reason: 'Chi tiêu giảm 50% so với TB', level: 'medium' },
    { id: 5, name: 'Đỗ Thị Hương', lastVisit: '15/02/2026', daysAway: 14, score: 30, spend: '3.2M', visits: 3, reason: 'Tần suất thấp hơn pattern', level: 'low' },
]

const winbackTemplates = [
    { type: 'SMS', title: 'Ưu đãi quay lại', desc: 'Giảm 20% cho lần điều trị tiếp theo', trigger: '30 ngày không quay lại' },
    { type: 'Email', title: 'Voucher VIP', desc: 'Tặng voucher 500K cho KH thân thiết', trigger: '60 ngày không quay lại' },
    { type: 'Telesale', title: 'Gọi hỏi thăm', desc: 'NV gọi điện tư vấn + hỏi feedback', trigger: '45 ngày không quay lại' },
    { type: 'Gift', title: 'Quà sinh nhật', desc: 'Gửi quà + voucher giảm 30%', trigger: '90 ngày + gần SN' },
]

const stats = { total: 5, high: 2, medium: 2, low: 1 }

export default function AIChurnPrediction() {
    const [selected, setSelected] = useState(null)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #991b1b, #f87171)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiUserX size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Dự đoán Churn</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Phát hiện nguy cơ mất khách • Win-back tự động</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Nguy cơ cao', v: stats.high, c: '🔴' }, { l: 'Trung bình', v: stats.medium, c: '🟡' }, { l: 'Thấp', v: stats.low, c: '🟢' }, { l: 'Tổng cảnh báo', v: stats.total }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.c || ''} {s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {customers.map(c => (
                        <div key={c.id} onClick={() => setSelected(c)} style={{
                            background: 'white', borderRadius: 14, border: `1px solid ${selected?.id === c.id ? '#991b1b' : c.level === 'high' ? '#fecaca' : c.level === 'medium' ? '#fde68a' : '#e5e7eb'}`,
                            padding: '14px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                        }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 10, background: c.level === 'high' ? '#fef2f2' : c.level === 'medium' ? '#fffbeb' : '#f1f5f9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800,
                                color: c.level === 'high' ? '#dc2626' : c.level === 'medium' ? '#d97706' : '#059669'
                            }}>{c.score}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{c.name}</span>
                                    <span style={{
                                        padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 700,
                                        background: c.level === 'high' ? '#fef2f2' : c.level === 'medium' ? '#fffbeb' : '#ecfdf5',
                                        color: c.level === 'high' ? '#dc2626' : c.level === 'medium' ? '#d97706' : '#059669'
                                    }}>{c.level === 'high' ? 'Nguy cơ cao' : c.level === 'medium' ? 'Trung bình' : 'Thấp'}</span>
                                </div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{c.daysAway} ngày vắng • {c.reason}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {selected && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 16 }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>📋 Chi tiết</h4>
                            {[{ l: 'Lần cuối', v: selected.lastVisit }, { l: 'Vắng', v: `${selected.daysAway} ngày` }, { l: 'Tổng chi tiêu', v: selected.spend }, { l: 'Số lần đến', v: selected.visits }].map((f, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                                    <span style={{ color: '#94a3b8' }}>{f.l}</span>
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{f.v}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 16 }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>🎁 Win-back Templates</h4>
                            {winbackTemplates.map((t, i) => (
                                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 14 }}>{t.type === 'SMS' ? '💬' : t.type === 'Email' ? '📧' : t.type === 'Telesale' ? '📞' : '🎁'}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 600 }}>{t.title}</div>
                                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{t.desc}</div>
                                    </div>
                                    <button style={{ padding: '4px 8px', borderRadius: 4, border: 'none', background: '#991b1b', color: 'white', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Gửi</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
