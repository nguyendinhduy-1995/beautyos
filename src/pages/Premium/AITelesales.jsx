import { useState } from 'react'
import { FiPhone, FiPhoneCall, FiPhoneOff, FiUser, FiClock, FiTarget, FiTrendingUp, FiMessageCircle, FiCalendar, FiCheck, FiPlay } from 'react-icons/fi'
import { customers } from '../../data/mockData'

const leads = customers.slice(0, 15).map((c, i) => ({
    ...c, priority: ['hot', 'warm', 'cold'][i % 3],
    lastCall: i < 5 ? `${28 + (i % 3)}/02/2026` : null,
    callCount: i < 5 ? Math.floor(Math.random() * 3) + 1 : 0,
    aiScore: Math.floor(Math.random() * 40) + 60,
    interestedService: ['Nâng cơ Hifu', 'Trị mụn', 'Filler', 'Mesotherapy', 'Combo trẻ hóa'][i % 5],
    bestTime: ['9:00-10:00', '14:00-15:00', '10:00-11:00', '15:00-16:00', '11:00-12:00'][i % 5],
    note: i < 5 ? ['Quan tâm giá', 'Hỏi lịch tháng 3', 'Sẽ gọi lại', 'Cần tư vấn thêm', 'Đặt lịch tư vấn'][i] : '',
}))

const scripts = [
    { name: 'Gọi lần đầu — Lead mới', steps: ['Chào hỏi + Giới thiệu spa', 'Hỏi nhu cầu của KH', 'Giới thiệu DV phù hợp', 'Mời đặt lịch tư vấn miễn phí', 'Xin SĐT/Zalo để gửi thông tin'], active: true },
    { name: 'Follow-up — Đã tư vấn', steps: ['Nhắc lại cuộc tư vấn trước', 'Thông báo ưu đãi đặc biệt', 'Giải đáp thắc mắc', 'Đề xuất lịch hẹn cụ thể'], active: true },
    { name: 'Win-back — KH vắng', steps: ['Chào hỏi thân thiện', 'Hỏi thăm kết quả DV cũ', 'Giới thiệu DV mới', 'Tặng voucher quay lại'], active: false },
]

const stats = { totalCalls: 234, connected: 178, booked: 45, rate: '25.3%' }

export default function AITelesales() {
    const [tab, setTab] = useState('leads')
    const [selectedLead, setSelectedLead] = useState(null)

    const sorted = [...leads].sort((a, b) => {
        const p = { hot: 0, warm: 1, cold: 2 }
        return p[a.priority] - p[b.priority]
    })

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #4338ca, #6366f1)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiPhone size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Telesales</h2>
                        <p>AI gợi ý script • Sắp xếp lead ưu tiên • Tracking cuộc gọi</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng gọi', v: stats.totalCalls, i: FiPhone }, { l: 'Kết nối', v: stats.connected, i: FiPhoneCall },
                    { l: 'Đặt lịch', v: stats.booked, i: FiCalendar }, { l: 'Tỉ lệ', v: stats.rate, i: FiTarget }].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <s.i size={14} color="rgba(255,255,255,0.7)" />
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.v}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'leads', label: '📋 Leads' }, { id: 'scripts', label: '📝 Scripts' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#4338ca' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'leads' && (
                <div style={{ display: 'grid', gridTemplateColumns: selectedLead ? '1fr 350px' : '1fr', gap: 16 }}>
                    <div className="premium-table-wrap">
                        <table>
                            <thead><tr>
                                {['Lead', 'Ưu tiên', 'AI Score', 'DV quan tâm', 'Giờ tốt nhất', 'Gọi', 'Ghi chú'].map(h => (
                                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {sorted.map((l, i) => (
                                    <tr key={i} onClick={() => setSelectedLead(l)} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selectedLead?.id === l.id ? '#f5f3ff' : 'white' }}>
                                        <td style={{ padding: '10px 12px' }}>
                                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{l.name}</div>
                                            <div style={{ fontSize: 11, color: '#94a3b8' }}>{l.phone}</div>
                                        </td>
                                        <td style={{ padding: '10px 12px' }}>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                                                background: l.priority === 'hot' ? '#fef2f2' : l.priority === 'warm' ? '#fffbeb' : '#f1f5f9',
                                                color: l.priority === 'hot' ? '#dc2626' : l.priority === 'warm' ? '#d97706' : '#94a3b8'
                                            }}>
                                                {l.priority === 'hot' ? '🔥 Nóng' : l.priority === 'warm' ? '🟡 Ấm' : '🔵 Lạnh'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px 12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <div style={{ width: 32, height: 5, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                                    <div style={{ width: `${l.aiScore}%`, height: '100%', borderRadius: 3, background: l.aiScore > 80 ? '#059669' : l.aiScore > 60 ? '#d97706' : '#dc2626' }} />
                                                </div>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: l.aiScore > 80 ? '#059669' : l.aiScore > 60 ? '#d97706' : '#dc2626' }}>{l.aiScore}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#4338ca', fontWeight: 500 }}>{l.interestedService}</td>
                                        <td style={{ padding: '10px 12px', fontSize: 12, color: '#64748b' }}>{l.bestTime}</td>
                                        <td style={{ padding: '10px 12px' }}>
                                            <a href={`tel:${l.phone}`} style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: '#ecfdf5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                                                <FiPhoneCall size={13} color="#059669" />
                                            </a>
                                        </td>
                                        <td style={{ padding: '10px 12px', fontSize: 11, color: '#94a3b8', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.note || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedLead && (
                        <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #4338ca, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: 'white', fontSize: 18, fontWeight: 800 }}>
                                    {selectedLead.name.charAt(0)}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 700 }}>{selectedLead.name}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{selectedLead.phone}</div>
                            </div>
                            <div style={{ background: '#f5f3ff', borderRadius: 10, padding: 12, marginBottom: 12 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#4338ca', marginBottom: 6 }}>🤖 AI Gợi ý script</div>
                                <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>
                                    "Chào {selectedLead.name}, mình là [tên] từ BeautyOS. Mình thấy chị đang quan tâm đến {selectedLead.interestedService}. Bên mình đang có ưu đãi đặc biệt tháng 3, giảm 20% cho KH mới. Chị có rảnh buổi {selectedLead.bestTime} để mình tư vấn chi tiết không ạ?"
                                </div>
                            </div>
                            {[{ l: 'Nhóm', v: selectedLead.group }, { l: 'DV quan tâm', v: selectedLead.interestedService }, { l: 'Giờ tốt nhất', v: selectedLead.bestTime }, { l: 'Số lần gọi', v: selectedLead.callCount }, { l: 'Ghi chú', v: selectedLead.note || 'Chưa có' }].map((f, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc', fontSize: 12 }}>
                                    <span style={{ color: '#94a3b8' }}>{f.l}</span>
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{f.v}</span>
                                </div>
                            ))}
                            <a href={`tel:${selectedLead.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: '#4338ca', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', marginTop: 12, textDecoration: 'none' }}>
                                <FiPhoneCall size={14} /> Gọi ngay
                            </a>
                        </div>
                    )}
                </div>
            )}

            {tab === 'scripts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {scripts.map((s, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px', opacity: s.active ? 1 : 0.6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.name}</span>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: s.active ? '#ecfdf5' : '#f1f5f9', color: s.active ? '#059669' : '#94a3b8' }}>
                                    {s.active ? '● Đang dùng' : '○ Tạm tắt'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {s.steps.map((step, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#4338ca', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</span>
                                        <span style={{ fontSize: 12, color: '#374151' }}>{step}</span>
                                        {j < s.steps.length - 1 && <span style={{ color: '#cbd5e1' }}>→</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
