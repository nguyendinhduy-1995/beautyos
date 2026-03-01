import { useState } from 'react'
import { FiBookOpen, FiAward, FiTarget, FiBarChart2, FiPlay, FiCheck, FiClock } from 'react-icons/fi'

const staffList = [
    { id: 1, name: 'Phạm Thị Hồng', role: 'KTV', level: 72, gap: ['Tư vấn bán hàng', 'Kỹ thuật Hifu mới'], feedbackIssue: 'Tư vấn chưa rõ ràng', cancelRate: 12 },
    { id: 2, name: 'Cao Thanh Sơn', role: 'KTV', level: 85, gap: ['Laser nâng cao'], feedbackIssue: null, cancelRate: 5 },
    { id: 3, name: 'Tô Thị Vy', role: 'Lễ tân', level: 60, gap: ['CSKH nâng cao', 'Upsell', 'CRM'], feedbackIssue: 'Thái độ chưa nhiệt tình', cancelRate: 18 },
    { id: 4, name: 'Đỗ Hữu Nghĩa', role: 'KTV', level: 78, gap: ['Mesotherapy chuyên sâu'], feedbackIssue: null, cancelRate: 8 },
]

const suggestedCourses = [
    { name: 'Kỹ năng Tư vấn & Bán hàng', for: 'Phạm Thị Hồng', reason: 'Feedback "tư vấn chưa rõ" từ 3 KH', duration: '2 giờ', priority: 'high', type: 'video' },
    { name: 'CSKH & Xử lý Khiếu nại', for: 'Tô Thị Vy', reason: 'Cancel rate 18% (cao nhất), feedback thái độ', duration: '3 giờ', priority: 'high', type: 'video' },
    { name: 'Kỹ thuật Hifu thế hệ mới', for: 'Phạm Thị Hồng', reason: 'Skill gap: chưa cập nhật công nghệ mới', duration: '4 giờ', priority: 'medium', type: 'practice' },
    { name: 'Mesotherapy chuyên sâu', for: 'Đỗ Hữu Nghĩa', reason: 'Skill gap: cần nâng cao kỹ thuật', duration: '5 giờ', priority: 'medium', type: 'practice' },
    { name: 'Kỹ năng Upsell cho Lễ tân', for: 'Tô Thị Vy', reason: 'Chưa có kỹ năng upsell, cơ hội tăng DT', duration: '1.5 giờ', priority: 'low', type: 'video' },
]

const quizResults = [
    { name: 'Phạm Thị Hồng', quiz: 'An toàn Laser', score: 85, date: '25/02/2026', pass: true },
    { name: 'Cao Thanh Sơn', quiz: 'An toàn Laser', score: 95, date: '25/02/2026', pass: true },
    { name: 'Tô Thị Vy', quiz: 'CSKH cơ bản', score: 62, date: '20/02/2026', pass: false },
    { name: 'Đỗ Hữu Nghĩa', quiz: 'Filler nâng cao', score: 78, date: '22/02/2026', pass: true },
]

export default function AIStaffTraining() {
    const [tab, setTab] = useState('staff')

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #0e7490, #22d3ee)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiBookOpen size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Training Kỹ thuật viên</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Gợi ý đào tạo theo feedback • Quiz • Lộ trình thăng tiến</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'staff', label: '👩‍⚕️ Năng lực NV' }, { id: 'courses', label: '📚 Gợi ý đào tạo' }, { id: 'quiz', label: '📝 Kết quả Quiz' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#0e7490' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'staff' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {staffList.map(s => (
                        <div key={s.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #0e7490, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>{s.name.charAt(0)}</div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.name}</span>
                                    <span style={{ marginLeft: 8, fontSize: 11, color: '#64748b' }}>{s.role}</span>
                                </div>
                                <span style={{ fontSize: 12, color: s.cancelRate > 15 ? '#dc2626' : s.cancelRate > 10 ? '#d97706' : '#059669', fontWeight: 600 }}>Cancel: {s.cancelRate}%</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 11, color: '#64748b', width: 60 }}>Năng lực</span>
                                <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{ width: `${s.level}%`, height: '100%', borderRadius: 4, background: s.level >= 80 ? '#059669' : s.level >= 60 ? '#d97706' : '#dc2626' }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{s.level}%</span>
                            </div>
                            {s.feedbackIssue && <div style={{ fontSize: 11, color: '#dc2626', background: '#fef2f2', borderRadius: 6, padding: '4px 8px', marginTop: 4 }}>⚠ Feedback: {s.feedbackIssue}</div>}
                            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Cần bổ sung: {s.gap.join(', ')}</div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'courses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {suggestedCourses.map((c, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: `1px solid ${c.priority === 'high' ? '#fecaca' : '#e5e7eb'}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: c.type === 'video' ? '#eff6ff' : '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {c.type === 'video' ? <FiPlay size={16} color="#2563eb" /> : <FiTarget size={16} color="#059669" />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                                <div style={{ fontSize: 11, color: '#64748b' }}>Cho: {c.for} • {c.duration}</div>
                                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>💡 {c.reason}</div>
                            </div>
                            <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, background: c.priority === 'high' ? '#fef2f2' : c.priority === 'medium' ? '#fffbeb' : '#f1f5f9', color: c.priority === 'high' ? '#dc2626' : c.priority === 'medium' ? '#d97706' : '#64748b' }}>
                                {c.priority === 'high' ? 'Ưu tiên' : c.priority === 'medium' ? 'TB' : 'Thấp'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'quiz' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#f8fafc' }}>
                            {['Nhân viên', 'Quiz', 'Điểm', 'Ngày', 'Kết quả'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11 }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {quizResults.map((q, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{q.name}</td>
                                    <td style={{ padding: '10px 14px', color: '#64748b' }}>{q.quiz}</td>
                                    <td style={{ padding: '10px 14px', fontWeight: 700, color: q.score >= 80 ? '#059669' : q.score >= 65 ? '#d97706' : '#dc2626' }}>{q.score}/100</td>
                                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>{q.date}</td>
                                    <td style={{ padding: '10px 14px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: q.pass ? '#ecfdf5' : '#fef2f2', color: q.pass ? '#059669' : '#dc2626' }}>{q.pass ? '✓ Đạt' : '✕ Chưa đạt'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
