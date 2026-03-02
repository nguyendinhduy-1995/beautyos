import { useState } from 'react'
import { FiGlobe, FiCalendar, FiClock, FiUser, FiCheck, FiX, FiSettings, FiLink } from 'react-icons/fi'
import { services, staff } from '../../data/mockData'

const bookings = Array.from({ length: 12 }, (_, i) => ({
    id: `BK-${1000 + i}`, customer: ['Nguyễn Thị Hoa', 'Trần Văn Minh', 'Lê Thị Lan', 'Phạm Đức Anh', 'Hoàng Thị Mai', 'Đỗ Văn Hào', 'Vũ Thị Ngọc', 'Bùi Văn Tùng', 'Đinh Thị Hương', 'Lý Văn Khoa', 'Ngô Thị Bích', 'Cao Văn Đạt'][i],
    phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
    service: services[i % services.length]?.name || 'Chăm sóc da',
    staff: staff[i % staff.length]?.name || 'KTV 1',
    date: `0${3 + Math.floor(i / 4)}/03/2026`,
    time: `${8 + (i % 8)}:${i % 2 === 0 ? '00' : '30'}`,
    status: ['confirmed', 'pending', 'confirmed', 'cancelled', 'confirmed', 'pending'][i % 6],
    source: ['Website', 'Facebook', 'Zalo', 'Google', 'Instagram', 'Direct'][i % 6],
    note: i % 3 === 0 ? 'Khách mới, cần tư vấn kỹ' : '',
}))

const config = {
    url: 'https://booking.myspa.vn', active: true, autoConfirm: false,
    timeSlots: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'],
    maxPerSlot: 2, bufferMinutes: 15,
}

export default function BookingOnline() {
    const [tab, setTab] = useState('bookings')
    const [filter, setFilter] = useState('all')
    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)
    const confirmed = bookings.filter(b => b.status === 'confirmed').length
    const pending = bookings.filter(b => b.status === 'pending').length

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0891b2, #22d3ee)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiGlobe size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Đặt lịch Online</h2>
                        <p>Form đặt lịch • Quản lý booking • Auto confirm</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng booking', v: bookings.length }, { l: 'Đã xác nhận', v: confirmed }, { l: 'Chờ duyệt', v: pending }, { l: 'Nguồn', v: '6 kênh' }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'bookings', label: '📋 Booking' }, { id: 'config', label: '⚙️ Cài đặt' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0891b2' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'bookings' && (
                <>
                    <div className="premium-filters">
                        {[{ id: 'all', label: 'Tất cả' }, { id: 'confirmed', label: '✅ Xác nhận' }, { id: 'pending', label: '⏳ Chờ' }, { id: 'cancelled', label: '❌ Hủy' }].map(f => (
                            <button key={f.id} onClick={() => setFilter(f.id)} className="premium-filter-btn" style={{ background: filter === f.id ? '#0891b2' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b' }}>{f.label}</button>
                        ))}
                    </div>
                    <div className="premium-table-wrap">
                        <table>
                            <thead><tr>
                                {['Mã', 'Khách', 'Dịch vụ', 'Ngày', 'Giờ', 'Nguồn', 'TT'].map(h => <th key={h}>{h}</th>)}
                            </tr></thead>
                            <tbody>
                                {filtered.map(b => (
                                    <tr key={b.id}>
                                        <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#0891b2', fontWeight: 600 }}>{b.id}</td>
                                        <td><div style={{ fontWeight: 600, color: '#0f172a' }}>{b.customer}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>{b.phone}</div></td>
                                        <td style={{ color: '#64748b', fontSize: 12, maxWidth: 140 }}>{b.service}</td>
                                        <td style={{ color: '#64748b', fontSize: 12 }}>{b.date}</td>
                                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{b.time}</td>
                                        <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#eff6ff', color: '#1d4ed8' }}>{b.source}</span></td>
                                        <td>
                                            <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: b.status === 'confirmed' ? '#ecfdf5' : b.status === 'pending' ? '#fffbeb' : '#fef2f2', color: b.status === 'confirmed' ? '#059669' : b.status === 'pending' ? '#d97706' : '#dc2626' }}>
                                                {b.status === 'confirmed' ? '✅' : b.status === 'pending' ? '⏳' : '❌'} {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {tab === 'config' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>🔗 Link đặt lịch</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#f8fafc', borderRadius: 10, marginBottom: 12 }}>
                            <FiLink size={14} color="#0891b2" />
                            <code style={{ flex: 1, fontSize: 12, color: '#0891b2' }}>{config.url}</code>
                        </div>
                        {[{ l: 'Trạng thái', v: config.active ? '🟢 Đang bật' : '⏸️ Tắt' },
                        { l: 'Auto confirm', v: config.autoConfirm ? '✅ Bật' : '❌ Tắt' },
                        { l: 'Max/slot', v: `${config.maxPerSlot} khách` },
                        { l: 'Buffer', v: `${config.bufferMinutes} phút` }].map((f, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8fafc' }}>
                                <span style={{ fontSize: 13, color: '#64748b' }}>{f.l}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{f.v}</span>
                            </div>
                        ))}
                    </div>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>⏰ Khung giờ</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {config.timeSlots.map((t, i) => (
                                <span key={i} style={{ padding: '6px 12px', borderRadius: 8, background: '#ecfdf5', color: '#059669', fontSize: 12, fontWeight: 600 }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
