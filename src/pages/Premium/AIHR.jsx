import { useState } from 'react'
import { FiUsers, FiCalendar, FiAward, FiClock, FiAlertCircle, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi'
import { staff } from '../../data/mockData'

const hrData = staff.filter(s => s.status === 'active').slice(0, 10).map((s, i) => ({
    ...s,
    department: ['KTV Laser', 'KTV Facial', 'KTV Spa', 'Lễ tân', 'Telesales'][i % 5],
    joinDate: `${15 + i}/0${(i % 9) + 1}/2024`,
    salary: (8 + Math.floor(Math.random() * 12)) * 1000000,
    leaveBalance: Math.floor(Math.random() * 10 + 2),
    leaveTaken: Math.floor(Math.random() * 5),
    lateCount: Math.floor(Math.random() * 4),
    overtimeHours: Math.floor(Math.random() * 20),
    satisfaction: Math.floor(Math.random() * 20 + 80),
}))

const shiftSchedule = [
    { day: 'T2', am: ['Nguyễn Thị A', 'Trần Văn B'], pm: ['Lê Thị C', 'Phạm Văn D'] },
    { day: 'T3', am: ['Lê Thị C', 'Hoàng Văn E'], pm: ['Nguyễn Thị A', 'Trần Văn B'] },
    { day: 'T4', am: ['Phạm Văn D', 'Nguyễn Thị A'], pm: ['Hoàng Văn E', 'Lê Thị C'] },
    { day: 'T5', am: ['Trần Văn B', 'Phạm Văn D'], pm: ['Nguyễn Thị A', 'Hoàng Văn E'] },
    { day: 'T6', am: ['Hoàng Văn E', 'Lê Thị C'], pm: ['Trần Văn B', 'Phạm Văn D'] },
    { day: 'T7', am: ['Nguyễn Thị A', 'Trần Văn B', 'Lê Thị C'], pm: ['Phạm Văn D', 'Hoàng Văn E'] },
    { day: 'CN', am: ['Lê Thị C'], pm: ['Nguyễn Thị A'] },
]

const requests = [
    { staff: 'Nguyễn Thị A', type: 'Nghỉ phép', from: '05/03', to: '07/03', reason: 'Việc gia đình', status: 'pending' },
    { staff: 'Trần Văn B', type: 'Tăng ca', from: '03/03', to: '03/03', reason: 'Khách đông', status: 'approved' },
    { staff: 'Lê Thị C', type: 'Đổi ca', from: '04/03', to: '04/03', reason: 'Lịch học', status: 'pending' },
]

export default function AIHR() {
    const [tab, setTab] = useState('staff')
    const totalSalary = hrData.reduce((s, h) => s + h.salary, 0)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiUsers size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Nhân sự</h2>
                        <p>Quản lý NV • Ca làm • Phép • Lương • AI tối ưu</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Nhân viên', v: hrData.length }, { l: 'Tổng lương', v: `${(totalSalary / 1000000).toFixed(0)}M` }, { l: 'Yêu cầu', v: requests.filter(r => r.status === 'pending').length }, { l: 'Satisfaction', v: `${Math.round(hrData.reduce((s, h) => s + h.satisfaction, 0) / hrData.length)}%` }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'staff', label: '👥 Nhân viên' }, { id: 'shift', label: '📅 Ca làm' }, { id: 'requests', label: '📝 Yêu cầu' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#7c3aed' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'staff' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Nhân viên', 'Bộ phận', 'Lương', 'Phép còn', 'Đi trễ', 'OT', 'Hài lòng'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {hrData.map(h => (
                                <tr key={h.id}>
                                    <td><div style={{ fontWeight: 600, color: '#0f172a' }}>{h.name}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Từ {h.joinDate}</div></td>
                                    <td style={{ color: '#64748b' }}>{h.department}</td>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{(h.salary / 1000000).toFixed(0)}M</td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: h.leaveBalance <= 3 ? '#fef2f2' : '#ecfdf5', color: h.leaveBalance <= 3 ? '#dc2626' : '#059669' }}>{h.leaveBalance} ngày</span></td>
                                    <td><span style={{ fontWeight: 600, color: h.lateCount > 2 ? '#dc2626' : '#64748b' }}>{h.lateCount}</span></td>
                                    <td style={{ color: '#64748b' }}>{h.overtimeHours}h</td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: h.satisfaction >= 90 ? '#ecfdf5' : '#fffbeb', color: h.satisfaction >= 90 ? '#059669' : '#d97706' }}>{h.satisfaction}%</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'shift' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Ngày', 'Ca sáng (8h-14h)', 'Ca chiều (14h-21h)'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {shiftSchedule.map((s, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 700, color: s.day === 'CN' ? '#dc2626' : s.day === 'T7' ? '#d97706' : '#0f172a' }}>{s.day}</td>
                                    <td>{s.am.map((n, j) => <span key={j} style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, background: '#eff6ff', color: '#1d4ed8', margin: '1px 2px', fontWeight: 500 }}>{n}</span>)}</td>
                                    <td>{s.pm.map((n, j) => <span key={j} style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, background: '#fdf2f8', color: '#be185d', margin: '1px 2px', fontWeight: 500 }}>{n}</span>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'requests' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {requests.map((r, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: `3px solid ${r.status === 'approved' ? '#059669' : '#f59e0b'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{r.staff}</div>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: r.status === 'approved' ? '#ecfdf5' : '#fffbeb', color: r.status === 'approved' ? '#059669' : '#d97706' }}>
                                    {r.status === 'approved' ? '✅ Duyệt' : '⏳ Chờ'}
                                </span>
                            </div>
                            <div style={{ fontSize: 12, color: '#7c3aed', fontWeight: 600, marginBottom: 4 }}>{r.type}</div>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>📅 {r.from} → {r.to} • {r.reason}</div>
                            {r.status === 'pending' && (
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="premium-action-btn" style={{ background: '#059669', color: 'white', flex: 1 }}><FiCheck size={12} /> Duyệt</button>
                                    <button className="premium-action-btn" style={{ background: '#dc2626', color: 'white', flex: 1 }}><FiX size={12} /> Từ chối</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
