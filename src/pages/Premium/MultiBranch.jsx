import { useState } from 'react'
import { FiMapPin, FiGitBranch, FiRefreshCw, FiShield, FiTrendingUp, FiUsers, FiDollarSign, FiCalendar, FiArrowRight, FiCheck, FiSettings } from 'react-icons/fi'

const branches = [
    { id: 1, name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q.1, TP.HCM', phone: '028 3821 1234', revenue: 285000000, clients: 142, fillRate: 87, staff: 12, status: 'active', color: '#2563eb' },
    { id: 2, name: 'Chi nhánh Quận 3', address: '456 Võ Văn Tần, Q.3, TP.HCM', phone: '028 3930 5678', revenue: 198000000, clients: 98, fillRate: 72, staff: 8, status: 'active', color: '#059669' },
    { id: 3, name: 'Chi nhánh Quận 7', address: '789 NTMK, Q.7, TP.HCM', phone: '028 5412 9012', revenue: 156000000, clients: 76, fillRate: 65, staff: 6, status: 'active', color: '#d97706' },
    { id: 4, name: 'Chi nhánh Bình Thạnh', address: '321 Điện Biên Phủ, Bình Thạnh', phone: '028 3512 3456', revenue: 92000000, clients: 45, fillRate: 54, staff: 5, status: 'inactive', color: '#94a3b8' },
]

const totalRevenue = branches.reduce((a, b) => a + b.revenue, 0)
const totalClients = branches.reduce((a, b) => a + b.clients, 0)
const totalStaff = branches.reduce((a, b) => a + b.staff, 0)

const transferHistory = [
    { customer: 'Ngô Thị Trang', from: 'Q.1', to: 'Q.3', service: 'Nâng cơ Hifu', date: '01/03/2026', status: 'done' },
    { customer: 'Đỗ Thị Ngọc', from: 'Q.3', to: 'Q.7', service: 'Filler môi', date: '28/02/2026', status: 'done' },
    { customer: 'Mai Thị Phương', from: 'Q.7', to: 'Q.1', service: 'Mesotherapy', date: '27/02/2026', status: 'pending' },
    { customer: 'Lý Thị Diệu', from: 'Q.1', to: 'Bình Thạnh', service: 'Trị mụn', date: '26/02/2026', status: 'done' },
]

const syncItems = [
    { name: 'Bảng giá dịch vụ', synced: true, lastSync: '01/03/2026 08:00' },
    { name: 'Danh mục dịch vụ', synced: true, lastSync: '01/03/2026 08:00' },
    { name: 'Danh sách vật tư', synced: false, lastSync: '25/02/2026 14:30' },
    { name: 'Template SMS/ZNS', synced: true, lastSync: '28/02/2026 10:00' },
]

export default function MultiBranch() {
    const [tab, setTab] = useState('overview')
    const [selectedBranch, setSelectedBranch] = useState(null)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #0891b2, #22d3ee)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiGitBranch size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Quản lý Đa chi nhánh</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Tổng quan, so sánh, chuyển lịch hẹn & đồng bộ</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Tổng doanh thu', v: (totalRevenue / 1000000).toFixed(0) + 'M', i: FiDollarSign },
                    { l: 'Tổng khách', v: totalClients, i: FiUsers },
                    { l: 'Nhân viên', v: totalStaff, i: FiUsers },
                    { l: 'Chi nhánh', v: branches.filter(b => b.status === 'active').length + '/' + branches.length, i: FiMapPin }].map((s, i) => (
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
                {[{ id: 'overview', label: '📊 Tổng quan' }, { id: 'transfer', label: '🔄 Chuyển lịch' }, { id: 'sync', label: '🔗 Đồng bộ' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                        fontSize: 13, fontWeight: 600, background: tab === t.id ? '#0891b2' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {branches.map(b => (
                        <div key={b.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20, opacity: b.status === 'active' ? 1 : 0.6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: b.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiMapPin size={18} color={b.color} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{b.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.address}</div>
                                </div>
                                <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: b.status === 'active' ? '#ecfdf5' : '#f1f5f9', color: b.status === 'active' ? '#059669' : '#94a3b8' }}>
                                    {b.status === 'active' ? '● Hoạt động' : '○ Tạm đóng'}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
                                {[{ l: 'Doanh thu', v: (b.revenue / 1000000).toFixed(0) + 'M', c: '#059669' },
                                { l: 'Khách', v: b.clients, c: '#2563eb' },
                                { l: 'Lấp đầy', v: b.fillRate + '%', c: '#7c3aed' },
                                { l: 'NV', v: b.staff, c: '#d97706' }].map((m, i) => (
                                    <div key={i} style={{ textAlign: 'center', background: '#f8fafc', borderRadius: 8, padding: '8px 4px' }}>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: m.c }}>{m.v}</div>
                                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{m.l}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>
                                    <span>Tỉ lệ lấp đầy</span><span>{b.fillRate}%</span>
                                </div>
                                <div style={{ height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{ width: `${b.fillRate}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${b.color}, ${b.color}80)` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'transfer' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>🔄 Lịch sử chuyển lịch hẹn</h3>
                        <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#0891b2', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>+ Chuyển mới</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#f8fafc' }}>
                            {['Khách hàng', 'Từ', '', 'Đến', 'Dịch vụ', 'Ngày', 'TT'].map(h => (
                                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {transferHistory.map((t, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#0f172a' }}>{t.customer}</td>
                                    <td style={{ padding: '10px 16px', color: '#64748b' }}>{t.from}</td>
                                    <td style={{ padding: '10px 16px' }}><FiArrowRight size={14} color="#94a3b8" /></td>
                                    <td style={{ padding: '10px 16px', color: '#0891b2', fontWeight: 600 }}>{t.to}</td>
                                    <td style={{ padding: '10px 16px', color: '#64748b' }}>{t.service}</td>
                                    <td style={{ padding: '10px 16px', color: '#64748b' }}>{t.date}</td>
                                    <td style={{ padding: '10px 16px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: t.status === 'done' ? '#ecfdf5' : '#fffbeb', color: t.status === 'done' ? '#059669' : '#d97706' }}>
                                            {t.status === 'done' ? '✓ Hoàn tất' : '⏳ Chờ xác nhận'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'sync' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>🔗 Đồng bộ dữ liệu</h3>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: 'none', background: '#0891b2', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>
                            <FiRefreshCw size={13} /> Đồng bộ tất cả
                        </button>
                    </div>
                    {syncItems.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: i < syncItems.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: s.synced ? '#ecfdf5' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {s.synced ? <FiCheck size={16} color="#059669" /> : <FiRefreshCw size={16} color="#dc2626" />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{s.name}</div>
                                <div style={{ fontSize: 11, color: '#94a3b8' }}>Lần cuối: {s.lastSync}</div>
                            </div>
                            <div style={{
                                width: 42, height: 22, borderRadius: 11, background: s.synced ? '#059669' : '#cbd5e1',
                                position: 'relative', cursor: 'pointer',
                            }}>
                                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: s.synced ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
