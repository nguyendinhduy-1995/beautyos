import { useState } from 'react'
import { FiUsers, FiCalendar, FiAward, FiClock, FiAlertCircle, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi'
import { staff } from '../../data/mockData'

const hrData = staff.filter(s => s.status === 'active').slice(0, 12).map((s, i) => ({
    ...s,
    startDate: `${2020 + (i % 4)}/0${(i % 9) + 1}/15`,
    daysOff: Math.floor(Math.random() * 5),
    daysOffRemaining: 12 - Math.floor(Math.random() * 5),
    lateCount: Math.floor(Math.random() * 4),
    satisfaction: Math.floor(Math.random() * 30) + 70,
    salary: Math.floor(Math.random() * 10 + 8) * 1000000,
    contractEnd: i % 4 === 0 ? `0${3 + Math.floor(i / 4)}/2026` : null,
}))

const leaveRequests = [
    { staff: 'Phạm Thị Hồng', type: 'Phép năm', from: '05/03', to: '06/03', days: 2, reason: 'Việc gia đình', status: 'pending' },
    { staff: 'Cao Thanh Sơn', type: 'Ốm', from: '03/03', to: '03/03', days: 1, reason: 'Cảm sốt', status: 'pending' },
    { staff: 'Tô Thị Vy', type: 'Phép năm', from: '10/03', to: '12/03', days: 3, reason: 'Du lịch', status: 'approved' },
]

const aiInsights = [
    { type: 'warning', text: 'Nhân viên Lưu Thị Kim có 4 lần đi trễ tháng này. Đề xuất nhắc nhở.', priority: 'high' },
    { type: 'info', text: 'Hợp đồng 3 NV sắp hết hạn trong tháng 3. Cần gia hạn trước 15/03.', priority: 'high' },
    { type: 'tip', text: 'Chỉ số hài lòng trung bình 82% — tăng 3% so với tháng trước. Team KTV cao nhất (89%).', priority: 'medium' },
    { type: 'tip', text: 'AI đề xuất: Tổ chức team building tháng 3 để duy trì motivation, dự kiến chi phí 8M.', priority: 'low' },
]

export default function AIHR() {
    const [tab, setTab] = useState('staff')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiUsers size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Nhân sự</h2>
                        <p>Chấm công • Nghỉ phép • Hợp đồng • Phân tích nhân sự</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Nhân viên', v: hrData.length }, { l: 'Đi trễ tháng', v: hrData.reduce((a, h) => a + h.lateCount, 0) },
                    { l: 'Hài lòng TB', v: Math.round(hrData.reduce((a, h) => a + h.satisfaction, 0) / hrData.length) + '%' },
                    { l: 'Đơn nghỉ phép', v: leaveRequests.filter(l => l.status === 'pending').length }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'staff', label: '👥 Nhân viên' }, { id: 'leave', label: '📋 Nghỉ phép' }, { id: 'ai', label: '🤖 AI Insights' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#b45309' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'staff' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Nhân viên', 'Vai trò', 'Ngày nghỉ', 'Đi trễ', 'Hài lòng', 'Hợp đồng'].map(h => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {hrData.map((s, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '10px 14px' }}>
                                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{s.name}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>Từ {s.startDate}</div>
                                    </td>
                                    <td style={{ padding: '10px 14px', color: '#64748b' }}>{s.role}</td>
                                    <td style={{ padding: '10px 14px' }}>
                                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{s.daysOff}</span>
                                        <span style={{ color: '#94a3b8' }}> / {s.daysOff + s.daysOffRemaining}</span>
                                    </td>
                                    <td style={{ padding: '10px 14px', fontWeight: 600, color: s.lateCount >= 3 ? '#dc2626' : s.lateCount >= 1 ? '#d97706' : '#059669' }}>{s.lateCount}</td>
                                    <td style={{ padding: '10px 14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 50, height: 5, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                                <div style={{ width: `${s.satisfaction}%`, height: '100%', borderRadius: 3, background: s.satisfaction >= 80 ? '#059669' : '#d97706' }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: s.satisfaction >= 80 ? '#059669' : '#d97706' }}>{s.satisfaction}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px 14px' }}>
                                        {s.contractEnd ? <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: '#fef2f2', color: '#dc2626' }}>⚠ Hết {s.contractEnd}</span>
                                            : <span style={{ fontSize: 11, color: '#94a3b8' }}>Còn hiệu lực</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'leave' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {leaveRequests.map((l, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{l.staff}</span>
                                    <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: l.type === 'Ốm' ? '#fef2f2' : '#eff6ff', color: l.type === 'Ốm' ? '#dc2626' : '#2563eb' }}>{l.type}</span>
                                </div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{l.from} → {l.to} ({l.days} ngày) • {l.reason}</div>
                            </div>
                            {l.status === 'pending' ? (
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#ecfdf5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-family)', fontSize: 12, fontWeight: 600, color: '#059669' }}><FiCheck size={13} /> Duyệt</button>
                                    <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#fef2f2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-family)', fontSize: 12, fontWeight: 600, color: '#dc2626' }}><FiX size={13} /> Từ chối</button>
                                </div>
                            ) : <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#ecfdf5', color: '#059669' }}>✓ Đã duyệt</span>}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'ai' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {aiInsights.map((ins, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: `1px solid ${ins.priority === 'high' ? '#fecaca' : ins.priority === 'medium' ? '#fde68a' : '#e5e7eb'}`, padding: '14px 18px', display: 'flex', gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: ins.type === 'warning' ? '#fef2f2' : ins.type === 'info' ? '#eff6ff' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {ins.type === 'warning' ? <FiAlertCircle size={16} color="#dc2626" /> : ins.type === 'info' ? <FiCalendar size={16} color="#2563eb" /> : <FiTrendingUp size={16} color="#059669" />}
                            </div>
                            <div>
                                <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 700, background: ins.priority === 'high' ? '#fef2f2' : ins.priority === 'medium' ? '#fffbeb' : '#f1f5f9', color: ins.priority === 'high' ? '#dc2626' : ins.priority === 'medium' ? '#d97706' : '#64748b' }}>
                                    {ins.priority === 'high' ? 'Ưu tiên cao' : ins.priority === 'medium' ? 'Trung bình' : 'Tham khảo'}
                                </span>
                                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{ins.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
