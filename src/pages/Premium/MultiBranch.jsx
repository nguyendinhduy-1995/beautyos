import { useState } from 'react'
import { FiMapPin, FiTrendingUp, FiUsers, FiCalendar, FiRefreshCw, FiArrowRight } from 'react-icons/fi'

const branches = [
    { id: 1, name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q.1, TP.HCM', status: 'active', revenue: 285, customers: 142, occupancy: 87, staff: 12 },
    { id: 2, name: 'Chi nhánh Quận 3', address: '456 Võ Văn Tần, Q.3, TP.HCM', status: 'active', revenue: 198, customers: 98, occupancy: 72, staff: 8 },
    { id: 3, name: 'Chi nhánh Quận 7', address: '789 Nguyễn Thị Thập, Q.7, TP.HCM', status: 'active', revenue: 248, customers: 121, occupancy: 91, staff: 10 },
    { id: 4, name: 'Chi nhánh Bình Thạnh', address: '321 Điện Biên Phủ, Bình Thạnh', status: 'inactive', revenue: 0, customers: 0, occupancy: 0, staff: 0 },
]

const transfers = [
    { id: 1, from: 'Quận 1', to: 'Quận 7', customer: 'Nguyễn Thị Hoa', service: 'Nâng cơ Hifu', date: '03/03', time: '10:00', reason: 'KH gần Q7 hơn', status: 'pending' },
    { id: 2, from: 'Quận 3', to: 'Quận 1', customer: 'Trần Văn Minh', service: 'Trị mụn Laser', date: '04/03', time: '14:00', reason: 'Q3 hết slot', status: 'approved' },
    { id: 3, from: 'Quận 7', to: 'Quận 3', customer: 'Lê Thị Lan', service: 'Filler môi', date: '05/03', time: '09:00', reason: 'BS chuyên môn ở Q3', status: 'approved' },
]

const syncStatus = [
    { item: 'Danh sách khách hàng', synced: true, lastSync: '07:30 hôm nay' },
    { item: 'Lịch hẹn', synced: true, lastSync: '07:30 hôm nay' },
    { item: 'Tồn kho', synced: true, lastSync: '06:00 hôm nay' },
    { item: 'Doanh thu & Kế toán', synced: true, lastSync: '00:00 hôm nay' },
    { item: 'Nhân viên & Ca làm', synced: false, lastSync: '22:00 hôm qua' },
]

const totalRevenue = branches.filter(b => b.status === 'active').reduce((s, b) => s + b.revenue, 0)
const totalCustomers = branches.filter(b => b.status === 'active').reduce((s, b) => s + b.customers, 0)
const totalStaff = branches.filter(b => b.status === 'active').reduce((s, b) => s + b.staff, 0)
const activeBranches = branches.filter(b => b.status === 'active').length

export default function MultiBranch() {
    const [tab, setTab] = useState('overview')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiMapPin size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Quản lý Đa chi nhánh</h2>
                        <p>Tổng quan, so sánh, chuyển lịch hẹn & đồng bộ</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng DT', v: `${totalRevenue}M` }, { l: 'Tổng KH', v: totalCustomers }, { l: 'Nhân viên', v: totalStaff }, { l: 'Chi nhánh', v: `${activeBranches}/${branches.length}` }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'overview', label: '🏢 Tổng quan' }, { id: 'transfer', label: '🔄 Chuyển lịch' }, { id: 'sync', label: '🔗 Đồng bộ' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0284c7' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {branches.map(b => (
                        <div key={b.id} className="premium-card" style={{ padding: 16, opacity: b.status === 'active' ? 1 : 0.5 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiMapPin size={16} color="#0284c7" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{b.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.address}</div>
                                </div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: b.status === 'active' ? '#ecfdf5' : '#fef2f2', color: b.status === 'active' ? '#059669' : '#dc2626' }}>
                                    {b.status === 'active' ? '🟢 Hoạt động' : '🔴 Đóng'}
                                </span>
                            </div>
                            {b.status === 'active' && (
                                <>
                                    <div className="premium-cards-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                                        {[{ l: 'Doanh thu', v: `${b.revenue}M`, c: '#059669' }, { l: 'Khách', v: b.customers, c: '#0284c7' }, { l: 'Lấp đầy', v: `${b.occupancy}%`, c: b.occupancy >= 85 ? '#059669' : '#d97706' }, { l: 'NV', v: b.staff, c: '#7c3aed' }].map((s, i) => (
                                            <div key={i} style={{ textAlign: 'center', padding: 8, background: '#f8fafc', borderRadius: 8 }}>
                                                <div style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.v}</div>
                                                <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.l}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>
                                            <span>Tỉ lệ lấp đầy</span><span>{b.occupancy}%</span>
                                        </div>
                                        <div style={{ height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                                            <div style={{ width: `${b.occupancy}%`, height: '100%', borderRadius: 3, background: b.occupancy >= 85 ? '#059669' : '#d97706' }} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'transfer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {transfers.map(t => (
                        <div key={t.id} className="premium-card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{t.customer}</div>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: t.status === 'approved' ? '#ecfdf5' : '#fffbeb', color: t.status === 'approved' ? '#059669' : '#d97706' }}>
                                    {t.status === 'approved' ? '✅ Duyệt' : '⏳ Chờ'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#eff6ff', color: '#0284c7' }}>{t.from}</span>
                                <FiArrowRight size={14} color="#94a3b8" />
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#ecfdf5', color: '#059669' }}>{t.to}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                <span>💆 {t.service}</span>
                                <span>📅 {t.date} {t.time}</span>
                                <span>💬 {t.reason}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'sync' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ background: '#eff6ff', borderRadius: 12, padding: '12px 16px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FiRefreshCw size={14} color="#0284c7" />
                        <span style={{ fontSize: 12, color: '#1e40af', fontWeight: 600 }}>Đồng bộ tự động mỗi 30 phút giữa {activeBranches} chi nhánh</span>
                    </div>
                    {syncStatus.map((s, i) => (
                        <div key={i} className="premium-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 18 }}>{s.synced ? '✅' : '⚠️'}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.item}</div>
                                <div style={{ fontSize: 11, color: '#94a3b8' }}>Cập nhật: {s.lastSync}</div>
                            </div>
                            <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: s.synced ? '#ecfdf5' : '#fffbeb', color: s.synced ? '#059669' : '#d97706' }}>
                                {s.synced ? 'Synced' : 'Pending'}
                            </span>
                        </div>
                    ))}
                    <button className="premium-action-btn" style={{ background: '#0284c7', color: 'white', marginTop: 8 }}>
                        <FiRefreshCw size={12} /> Đồng bộ ngay
                    </button>
                </div>
            )}
        </div>
    )
}
