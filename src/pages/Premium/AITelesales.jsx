import { useState } from 'react'
import { FiPhone, FiUsers, FiTarget, FiClock, FiPhoneCall, FiPhoneOff, FiCalendar, FiTrendingUp } from 'react-icons/fi'
import { staff } from '../../data/mockData'

const telesalesStaff = staff.filter(s => s.status === 'active').slice(0, 5).map((s, i) => ({
    ...s,
    calls: Math.floor(Math.random() * 30 + 10),
    answered: Math.floor(Math.random() * 20 + 5),
    appointments: Math.floor(Math.random() * 8 + 1),
    conversionRate: Math.floor(Math.random() * 25 + 10),
    avgDuration: `${Math.floor(Math.random() * 5 + 1)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
}))

const callLogs = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, customer: ['Nguyễn Hoa', 'Trần Minh', 'Lê Lan', 'Phạm Anh', 'Hoàng Mai', 'Đỗ Hào', 'Vũ Ngọc', 'Bùi Tùng', 'Đinh Hương', 'Lý Khoa', 'Ngô Bích', 'Cao Đạt', 'Tạ Phương', 'Hà Linh', 'Dương Tuấn'][i],
    phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
    staff: telesalesStaff[i % 5].name,
    status: ['answered', 'missed', 'answered', 'answered', 'busy', 'answered'][i % 6],
    duration: ['2:30', '0:00', '4:15', '1:45', '0:00', '3:20'][i % 6],
    result: ['Đặt lịch', '-', 'Quan tâm', 'Từ chối', '-', 'Đặt lịch'][i % 6],
    time: `${8 + Math.floor(i / 2)}:${i % 2 === 0 ? '15' : '45'}`,
}))

const totalCalls = telesalesStaff.reduce((s, t) => s + t.calls, 0)
const totalAppts = telesalesStaff.reduce((s, t) => s + t.appointments, 0)

export default function AITelesales() {
    const [tab, setTab] = useState('performance')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #be185d, #ec4899)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiPhone size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Telesales AI</h2>
                        <p>Lịch sử cuộc gọi • Hiệu suất NV • AI script gợi ý</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng cuộc gọi', v: totalCalls }, { l: 'Lịch hẹn', v: totalAppts }, { l: 'Conversion', v: `${Math.round(totalAppts / totalCalls * 100)}%` }, { l: 'NV Telesales', v: telesalesStaff.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'performance', label: '📊 Hiệu suất' }, { id: 'logs', label: '📞 Cuộc gọi' }, { id: 'scripts', label: '🤖 AI Script' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#be185d' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'performance' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {telesalesStaff.map((t, i) => (
                        <div key={t.id} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
                                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 800, color: '#be185d' }}>{t.conversionRate}%</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                <span><FiPhoneCall size={10} /> {t.calls} gọi</span>
                                <span><FiPhone size={10} /> {t.answered} nghe</span>
                                <span><FiCalendar size={10} /> {t.appointments} hẹn</span>
                                <span><FiClock size={10} /> TB {t.avgDuration}</span>
                            </div>
                            <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                <div style={{ width: `${(t.appointments / (t.calls || 1)) * 100 * 3}%`, height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #be185d, #ec4899)', maxWidth: '100%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'logs' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Giờ', 'Khách', 'NV', 'TT', 'T.gian', 'Kết quả'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {callLogs.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, color: '#0f172a', fontSize: 12 }}>{c.time}</td>
                                    <td><div style={{ fontWeight: 600, color: '#0f172a' }}>{c.customer}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>{c.phone}</div></td>
                                    <td style={{ color: '#64748b', fontSize: 12 }}>{c.staff}</td>
                                    <td>
                                        <span style={{ fontSize: 14 }}>
                                            {c.status === 'answered' ? '✅' : c.status === 'missed' ? '❌' : '📵'}
                                        </span>
                                    </td>
                                    <td style={{ color: '#64748b', fontSize: 12 }}>{c.duration}</td>
                                    <td>
                                        {c.result !== '-' && (
                                            <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: c.result === 'Đặt lịch' ? '#ecfdf5' : c.result === 'Quan tâm' ? '#eff6ff' : '#fef2f2', color: c.result === 'Đặt lịch' ? '#059669' : c.result === 'Quan tâm' ? '#1d4ed8' : '#dc2626' }}>{c.result}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'scripts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ background: '#fdf2f8', borderRadius: 12, padding: '12px 16px', border: '1px solid #fbcfe8', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FiTrendingUp size={14} color="#be185d" />
                        <span style={{ fontSize: 12, color: '#9d174d', fontWeight: 600 }}>AI phân tích 50+ cuộc gọi, tạo script tối ưu conversion rate</span>
                    </div>
                    {[{ title: 'Mở đầu — Khách mới', script: '"Chào chị [Tên], em là [NV] từ [Spa]. Em thấy chị quan tâm đến [DV] trên Facebook. Hiện bên em đang có chương trình ưu đãi 30%..."', tip: 'Gọi tên + nhắc nguồn = tăng 40% thời gian nghe' },
                    { title: 'Xử lý từ chối — "Không có thời gian"', script: '"Em hiểu chị bận rộn ạ. Vậy em đặt lịch tư vấn free 15 phút vào cuối tuần được không ạ? Chị chỉ cần ghé qua..."', tip: 'Đề xuất thời gian ngắn + free = giảm 60% rejection' },
                    { title: 'Chốt lịch — Khách quan tâm', script: '"Vậy em đặt cho chị lịch ngày [X] lúc [Y] nhé? Em sẽ gửi xác nhận qua Zalo ạ. À, nếu chị book hôm nay thì được tặng thêm..."', tip: 'Tạo urgency + bonus = tăng 25% booking rate' }].map((s, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>📋 {s.title}</div>
                            <div style={{ background: '#fdf2f8', borderRadius: 10, padding: 12, fontSize: 12, color: '#374151', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 8 }}>{s.script}</div>
                            <div style={{ fontSize: 11, color: '#be185d', fontWeight: 600 }}>💡 {s.tip}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
