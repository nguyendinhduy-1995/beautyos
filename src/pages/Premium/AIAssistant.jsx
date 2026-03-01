import { useState } from 'react'
import { FiCpu, FiSend, FiUser, FiTrendingUp, FiMessageCircle, FiZap, FiChevronRight, FiStar, FiBarChart2, FiRefreshCw } from 'react-icons/fi'
import { customers, services } from '../../data/mockData'

const aiResponses = [
    { type: 'suggest', customer: 'Lê Thị Ánh', service: 'Cấy tế bào gốc Premium', match: 92, reason: 'Khách VIP, đã dùng Cấy tế bào gốc 3 lần, chu kỳ tái khám 45 ngày' },
    { type: 'suggest', customer: 'Ngô Thị Trang', service: 'Combo trẻ hóa da Premium', match: 87, reason: 'Chi tiêu cao (45.1M), quan tâm dịch vụ trẻ hóa, 30 lần ghé thăm' },
    { type: 'suggest', customer: 'Đỗ Thị Ngọc', service: 'Mesotherapy Premium', match: 85, reason: 'Khách Platinum, lịch sử Phi kim vi điểm, phù hợp nâng cấp' },
    { type: 'suggest', customer: 'Phan Thị Bích', service: 'RF trẻ hóa', match: 78, reason: 'Thường xuyên dùng DV chăm sóc da, budget phù hợp' },
    { type: 'suggest', customer: 'Hồ Thị Xuân', service: 'Trẻ hóa da Laser Premium', match: 95, reason: 'Khách Gold, chi tiêu 48.8M, phản hồi tích cực sau Nâng cơ Hifu' },
]

const chatHistory = [
    { role: 'ai', text: 'Chào bạn! Tôi là AI Assistant của BeautyOS. Tôi có thể giúp bạn tư vấn dịch vụ, phân tích hành vi khách hàng, hoặc gợi ý upsell. Bạn cần gì?' },
]

const scoringData = customers.slice(0, 15).map((c, i) => ({
    ...c, score: Math.floor(Math.random() * 40) + 60,
    trend: ['up', 'down', 'stable'][i % 3],
    predictReturn: Math.floor(Math.random() * 20) + 5 + ' ngày',
}))

const seasonTrends = [
    { month: 'T9', revenue: 320, label: '320M' },
    { month: 'T10', revenue: 380, label: '380M' },
    { month: 'T11', revenue: 410, label: '410M' },
    { month: 'T12', revenue: 520, label: '520M' },
    { month: 'T1', revenue: 450, label: '450M' },
    { month: 'T2', revenue: 390, label: '390M' },
]
const maxRev = Math.max(...seasonTrends.map(s => s.revenue))

export default function AIAssistant() {
    const [tab, setTab] = useState('suggest')
    const [messages, setMessages] = useState(chatHistory)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const sendMessage = () => {
        if (!input.trim()) return
        const userMsg = { role: 'user', text: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)
        setTimeout(() => {
            const responses = [
                'Dựa trên phân tích, khách VIP có xu hướng quay lại sau 35-45 ngày. Bạn nên gửi SMS nhắc hẹn vào ngày thứ 30 để tăng tỉ lệ quay lại lên 85%.',
                'Top 3 dịch vụ được yêu cầu nhiều nhất tháng này: Nâng cơ Hifu (23%), Cấy tế bào gốc (18%), Trị mụn chuyên sâu (15%). Đề xuất tăng slot cho Hifu.',
                'Phân tích cho thấy khách nhóm Gold có potential chuyển lên Platinum nếu được giới thiệu combo trẻ hóa. Tỉ lệ upsell thành công dự kiến: 67%.',
                'Doanh thu dự kiến tháng tới: 480M (+12% so với tháng trước). Dịch vụ tăng trưởng mạnh nhất: Mesotherapy Premium (+34%).',
            ]
            const aiMsg = { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }
            setMessages(prev => [...prev, aiMsg])
            setLoading(false)
        }, 1500)
    }

    const tabs = [
        { id: 'suggest', label: 'Gợi ý Upsell', icon: FiZap },
        { id: 'scoring', label: 'Scoring KH', icon: FiStar },
        { id: 'chat', label: 'Chat AI', icon: FiMessageCircle },
        { id: 'trends', label: 'Xu hướng', icon: FiTrendingUp },
    ]

    return (
        <div className="premium-page fade-in">
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', borderRadius: 16,
                padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiCpu size={24} color="white" />
                    </div>
                    <div>
                        <h2>AI Tư vấn & Phân tích</h2>
                        <p>Trợ lý AI thông minh — Gợi ý dịch vụ, Scoring khách hàng, Phân tích xu hướng</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10,
                        border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600,
                        background: tab === t.id ? '#7c3aed' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                        transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}>
                        <t.icon size={15} /> {t.label}
                    </button>
                ))}
            </div>

            {/* Tab: Gợi ý Upsell */}
            {tab === 'suggest' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>🎯 Gợi ý Upsell thông minh</h3>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-family)', color: '#64748b' }}>
                            <FiRefreshCw size={13} /> Làm mới
                        </button>
                    </div>
                    {aiResponses.map((r, i) => (
                        <div key={i} style={{
                            background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px',
                            display: 'flex', alignItems: 'center', gap: 16, transition: 'box-shadow 0.2s',
                        }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 12,
                                background: `linear-gradient(135deg, ${r.match > 90 ? '#059669' : r.match > 80 ? '#2563eb' : '#d97706'}20, ${r.match > 90 ? '#059669' : r.match > 80 ? '#2563eb' : '#d97706'}08)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <span style={{ fontSize: 18, fontWeight: 800, color: r.match > 90 ? '#059669' : r.match > 80 ? '#2563eb' : '#d97706' }}>{r.match}%</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{r.customer}</span>
                                    <FiChevronRight size={14} color="#94a3b8" />
                                    <span style={{ fontWeight: 600, fontSize: 13, color: '#7c3aed' }}>{r.service}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{r.reason}</p>
                            </div>
                            <button style={{
                                padding: '8px 16px', borderRadius: 8, border: 'none', background: '#7c3aed',
                                color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-family)',
                            }}>Gửi gợi ý</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab: Scoring */}
            {tab === 'scoring' && (
                <div className="premium-table-wrap">
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>⭐ Scoring Khách hàng — Dự đoán quay lại</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    {['Khách hàng', 'Nhóm', 'Tổng chi tiêu', 'Lần cuối', 'Score', 'Dự đoán quay lại', 'Xu hướng'].map(h => (
                                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {scoringData.map((c, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{
                                                padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                                                background: c.group === 'VIP' ? '#fef2f2' : c.group === 'Platinum' ? '#f5f3ff' : c.group === 'Gold' ? '#fffbeb' : '#f1f5f9',
                                                color: c.group === 'VIP' ? '#dc2626' : c.group === 'Platinum' ? '#7c3aed' : c.group === 'Gold' ? '#d97706' : '#64748b',
                                            }}>{c.group}</span>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 500 }}>{(c.totalSpent / 1000000).toFixed(1)}M</td>
                                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.lastVisit}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 60, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                                    <div style={{ width: `${c.score}%`, height: '100%', borderRadius: 3, background: c.score > 80 ? '#059669' : c.score > 60 ? '#d97706' : '#dc2626' }} />
                                                </div>
                                                <span style={{ fontWeight: 700, fontSize: 13, color: c.score > 80 ? '#059669' : c.score > 60 ? '#d97706' : '#dc2626' }}>{c.score}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 500 }}>{c.predictReturn}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ fontSize: 16 }}>{c.trend === 'up' ? '📈' : c.trend === 'down' ? '📉' : '➡️'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tab: Chat */}
            {tab === 'chat' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 500 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FiCpu size={16} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>BeautyOS AI</div>
                            <div style={{ fontSize: 11, color: '#059669' }}>● Đang hoạt động</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    maxWidth: '75%', padding: '12px 16px', borderRadius: 14,
                                    background: m.role === 'user' ? '#7c3aed' : '#f1f5f9',
                                    color: m.role === 'user' ? 'white' : '#0f172a',
                                    fontSize: 13, lineHeight: 1.6,
                                    borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                                    borderBottomLeftRadius: m.role === 'ai' ? 4 : 14,
                                }}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ display: 'flex', gap: 4, padding: '12px 16px' }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{
                                        width: 8, height: 8, borderRadius: '50%', background: '#94a3b8',
                                        animation: `bounce 1.4s infinite ${i * 0.2}s`,
                                    }} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
                        <input value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Hỏi AI về khách hàng, dịch vụ, xu hướng..."
                            style={{ flex: 1, padding: '10px 16px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)', outline: 'none' }}
                        />
                        <button onClick={sendMessage} style={{
                            padding: '10px 16px', borderRadius: 10, border: 'none', background: '#7c3aed',
                            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600,
                        }}>
                            <FiSend size={14} /> Gửi
                        </button>
                    </div>
                </div>
            )}

            {/* Tab: Xu hướng */}
            {tab === 'trends' && (
                <div className="premium-two-col">
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>📊 Xu hướng doanh thu theo mùa</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180 }}>
                            {seasonTrends.map((s, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed' }}>{s.label}</span>
                                    <div style={{
                                        width: '100%', height: `${(s.revenue / maxRev) * 140}px`, borderRadius: '8px 8px 4px 4px',
                                        background: `linear-gradient(180deg, #7c3aed, #a78bfa)`, minHeight: 20,
                                        transition: 'height 0.5s ease',
                                    }} />
                                    <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{s.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>🔥 Top Dịch vụ phổ biến</h3>
                        {services.filter(s => s.status === 'active').slice(0, 8).map((s, i) => {
                            const pct = Math.floor(Math.random() * 30) + 10
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                    <span style={{ fontSize: 12, color: '#64748b', width: 20, fontWeight: 600 }}>#{i + 1}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 3 }}>{s.name}</div>
                                        <div style={{ height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                            <div style={{ width: `${pct + 40}%`, height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed' }}>{pct}%</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
