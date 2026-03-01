import { useState } from 'react'
import { FiAward, FiTrendingUp, FiDollarSign, FiUsers, FiStar, FiClock, FiTarget, FiPercent } from 'react-icons/fi'
import { staff } from '../../data/mockData'

const kpiData = staff.filter(s => s.status === 'active').slice(0, 15).map((s, i) => ({
    ...s,
    revenue: Math.floor(Math.random() * 50 + 10) * 1000000,
    clients: Math.floor(Math.random() * 40 + 5),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    returnRate: Math.floor(Math.random() * 30 + 60),
    onTime: Math.floor(Math.random() * 15 + 85),
    target: Math.floor(Math.random() * 30 + 30) * 1000000,
    commission: Math.floor(Math.random() * 8 + 2) * 1000000,
})).sort((a, b) => b.revenue - a.revenue)

const commissionConfig = { base: 8, bonus15: 12, bonus30: 15 }
const topRev = kpiData[0]?.revenue || 1

export default function StaffKPI() {
    const [period, setPeriod] = useState('month')
    const [selectedStaff, setSelectedStaff] = useState(null)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #dc2626, #f87171)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiAward size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>KPI Nhân viên</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Xếp hạng • Radar chart • Hoa hồng tự động</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {['day', 'week', 'month'].map(p => (
                            <button key={p} onClick={() => setPeriod(p)} style={{
                                padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                                fontSize: 12, fontWeight: 600, background: period === p ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white',
                            }}>{p === 'day' ? 'Ngày' : p === 'week' ? 'Tuần' : 'Tháng'}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedStaff ? '1fr 380px' : '1fr', gap: 16 }}>
                {/* Leaderboard */}
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>🏆 Bảng xếp hạng Realtime</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#f8fafc' }}>
                            {['#', 'Nhân viên', 'Vai trò', 'Doanh số', 'Khách', '⭐', 'Chỉ tiêu', 'Hoa hồng'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {kpiData.map((s, i) => {
                                const pct = Math.min(100, Math.round((s.revenue / s.target) * 100))
                                return (
                                    <tr key={i} onClick={() => setSelectedStaff(s)} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selectedStaff?.id === s.id ? '#f8fafc' : 'white' }}>
                                        <td style={{ padding: '10px 14px', fontWeight: 800, color: i < 3 ? '#f59e0b' : '#94a3b8', fontSize: 15 }}>
                                            {i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
                                        </td>
                                        <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{s.name}</td>
                                        <td style={{ padding: '10px 14px', color: '#64748b' }}>{s.role}</td>
                                        <td style={{ padding: '10px 14px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden', maxWidth: 60 }}>
                                                    <div style={{ width: `${(s.revenue / topRev) * 100}%`, height: '100%', borderRadius: 3, background: i < 3 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#dc2626,#f87171)' }} />
                                                </div>
                                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{(s.revenue / 1000000).toFixed(0)}M</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600 }}>{s.clients}</td>
                                        <td style={{ padding: '10px 14px', color: '#f59e0b', fontWeight: 600 }}>{s.rating}</td>
                                        <td style={{ padding: '10px 14px' }}>
                                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: pct >= 100 ? '#ecfdf5' : pct >= 70 ? '#fffbeb' : '#fef2f2', color: pct >= 100 ? '#059669' : pct >= 70 ? '#d97706' : '#dc2626' }}>
                                                {pct}%
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px 14px', fontWeight: 700, color: '#059669' }}>{(s.commission / 1000000).toFixed(1)}M</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Detail Panel */}
                {selectedStaff && (
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                        <div style={{ textAlign: 'center', marginBottom: 16 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #dc2626, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: 'white', fontSize: 20, fontWeight: 800 }}>
                                {selectedStaff.name.charAt(0)}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{selectedStaff.name}</div>
                            <div style={{ fontSize: 12, color: '#64748b' }}>{selectedStaff.role} • {selectedStaff.department}</div>
                        </div>

                        {/* Radar-like stats */}
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: '16px 0 10px' }}>📊 Đánh giá 360°</h4>
                        {[{ label: 'Doanh số', value: Math.round((selectedStaff.revenue / selectedStaff.target) * 100), color: '#dc2626', icon: FiDollarSign },
                        { label: 'Khách mới', value: Math.min(100, selectedStaff.clients * 2.5), color: '#2563eb', icon: FiUsers },
                        { label: 'Đánh giá', value: Math.round(selectedStaff.rating * 20), color: '#f59e0b', icon: FiStar },
                        { label: 'Quay lại', value: selectedStaff.returnRate, color: '#059669', icon: FiTrendingUp },
                        { label: 'Đúng giờ', value: selectedStaff.onTime, color: '#7c3aed', icon: FiClock }].map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <m.icon size={13} color={m.color} />
                                <span style={{ width: 60, fontSize: 12, color: '#64748b' }}>{m.label}</span>
                                <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{ width: `${Math.min(100, m.value)}%`, height: '100%', borderRadius: 3, background: m.color }} />
                                </div>
                                <span style={{ width: 32, fontSize: 12, fontWeight: 700, color: m.color, textAlign: 'right' }}>{Math.round(m.value)}%</span>
                            </div>
                        ))}

                        {/* Commission */}
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: '20px 0 10px' }}>💰 Hoa hồng</h4>
                        <div style={{ background: '#f8fafc', borderRadius: 10, padding: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}>
                                <span style={{ color: '#64748b' }}>Doanh số</span>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>{(selectedStaff.revenue / 1000000).toFixed(0)}M</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}>
                                <span style={{ color: '#64748b' }}>% Hoa hồng</span>
                                <span style={{ fontWeight: 600, color: '#0f172a' }}>{commissionConfig.base}%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}>
                                <span style={{ color: '#64748b' }}>Bonus vượt chỉ tiêu</span>
                                <span style={{ fontWeight: 600, color: '#059669' }}>+{(selectedStaff.revenue > selectedStaff.target ? (selectedStaff.revenue - selectedStaff.target) * 0.04 / 1000000 : 0).toFixed(1)}M</span>
                            </div>
                            <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 6, paddingTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ fontWeight: 800, color: '#0f172a' }}>Tổng</span>
                                <span style={{ fontWeight: 800, color: '#059669' }}>{(selectedStaff.commission / 1000000).toFixed(1)}M</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
