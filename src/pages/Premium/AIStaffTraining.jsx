import { useState } from 'react'
import { FiBookOpen, FiUsers, FiAward, FiCheckCircle, FiStar } from 'react-icons/fi'

const staff = [
    { id: 1, name: 'Nguyễn Thị Hương', role: 'KTV Laser', level: 'Advanced', score: 92, courses: 8, quizPassed: 7, certs: 3 },
    { id: 2, name: 'Trần Văn Tuấn', role: 'KTV Facial', level: 'Intermediate', score: 78, courses: 5, quizPassed: 4, certs: 1 },
    { id: 3, name: 'Lê Thị Mai', role: 'KTV Massage', level: 'Beginner', score: 65, courses: 3, quizPassed: 2, certs: 0 },
    { id: 4, name: 'Phạm Đức Long', role: 'KTV Spa', level: 'Advanced', score: 88, courses: 7, quizPassed: 6, certs: 2 },
    { id: 5, name: 'Hoàng Thị Lan', role: 'KTV Nail', level: 'Intermediate', score: 72, courses: 4, quizPassed: 3, certs: 1 },
]

const courses = [
    { id: 1, name: 'Laser CO2 Fractional Nâng cao', dur: '4h', level: 'Advanced', enrolled: 3, comp: 85 },
    { id: 2, name: 'Kỹ thuật tiêm Meso an toàn', dur: '3h', level: 'Intermediate', enrolled: 5, comp: 60 },
    { id: 3, name: 'Chăm sóc da sau điều trị', dur: '2h', level: 'Beginner', enrolled: 8, comp: 92 },
    { id: 4, name: 'PRP & Stem Cell Ứng dụng', dur: '5h', level: 'Advanced', enrolled: 2, comp: 40 },
    { id: 5, name: 'Customer Service Excellence', dur: '2h', level: 'Beginner', enrolled: 10, comp: 100 },
]

const quizzes = [
    { staff: 'Nguyễn Thị Hương', course: 'Laser CO2', score: 95, pass: true, date: '01/03' },
    { staff: 'Phạm Đức Long', course: 'Tiêm Meso', score: 82, pass: true, date: '28/02' },
    { staff: 'Trần Văn Tuấn', course: 'Chăm sóc da', score: 75, pass: true, date: '27/02' },
    { staff: 'Lê Thị Mai', course: 'Customer Service', score: 58, pass: false, date: '26/02' },
    { staff: 'Hoàng Thị Lan', course: 'Tiêm Meso', score: 68, pass: false, date: '25/02' },
]

export default function AIStaffTraining() {
    const [tab, setTab] = useState('staff')
    const avg = Math.round(staff.reduce((s, st) => s + st.score, 0) / staff.length)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0369a1, #38bdf8)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiBookOpen size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Training KTV</h2>
                        <p>Đánh giá năng lực • Khóa học AI gợi ý • Quiz & Chứng chỉ</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Nhân viên', v: staff.length }, { l: 'TB Score', v: `${avg}%` }, { l: 'Khóa học', v: courses.length }, { l: 'Quiz', v: quizzes.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'staff', label: '👤 Năng lực' }, { id: 'courses', label: '📚 Khóa học' }, { id: 'quiz', label: '📝 Quiz' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0369a1' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'staff' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {staff.map(s => (
                        <div key={s.id} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ width: 42, height: 42, borderRadius: 10, background: s.score >= 85 ? '#ecfdf5' : s.score >= 70 ? '#fffbeb' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: s.score >= 85 ? '#059669' : s.score >= 70 ? '#d97706' : '#dc2626' }}>{s.score}%</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.role} • {s.level}</div>
                                </div>
                            </div>
                            <div className="premium-progress" style={{ marginBottom: 6 }}>
                                <div className="premium-progress-fill" style={{ width: `${s.score}%`, background: s.score >= 85 ? '#10b981' : s.score >= 70 ? '#f59e0b' : '#ef4444' }} />
                            </div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                <span><FiBookOpen size={11} /> {s.courses} khóa</span>
                                <span><FiCheckCircle size={11} /> {s.quizPassed} pass</span>
                                <span><FiAward size={11} /> {s.certs} cert</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'courses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-alert" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}><FiStar size={14} /> AI gợi ý khóa học theo kết quả đánh giá</div>
                    {courses.map(c => (
                        <div key={c.id} className="premium-card">
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>{c.dur} • {c.level} • {c.enrolled} enrolled</div>
                            <div className="premium-progress" style={{ marginBottom: 4 }}>
                                <div className="premium-progress-fill" style={{ width: `${c.comp}%`, background: '#0369a1' }} />
                            </div>
                            <div style={{ fontSize: 11, color: '#64748b', textAlign: 'right' }}>{c.comp}% hoàn thành</div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'quiz' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>{['NV', 'Khóa', 'Điểm', 'KQ', 'Ngày'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                            {quizzes.map((q, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{q.staff}</td>
                                    <td style={{ color: '#64748b' }}>{q.course}</td>
                                    <td><span style={{ fontWeight: 700, color: q.score >= 70 ? '#059669' : '#dc2626' }}>{q.score}%</span></td>
                                    <td><span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: q.pass ? '#ecfdf5' : '#fef2f2', color: q.pass ? '#059669' : '#dc2626' }}>{q.pass ? '✅ Pass' : '❌ Fail'}</span></td>
                                    <td style={{ color: '#94a3b8' }}>{q.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
