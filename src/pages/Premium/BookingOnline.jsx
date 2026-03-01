import { useState } from 'react'
import { FiGlobe, FiCalendar, FiClock, FiUser, FiCheck, FiX, FiEye, FiSettings, FiLink, FiCopy } from 'react-icons/fi'
import { services, staff } from '../../data/mockData'

const bookings = Array.from({ length: 15 }, (_, i) => ({
    id: `BK-${String(2000 + i).padStart(4, '0')}`,
    customer: ['Lê Thị Mai', 'Trần Văn Hùng', 'Nguyễn Thị Lan', 'Phạm Hoàng Sơn', 'Đỗ Thị Hương', 'Cao Văn Đức', 'Mai Thị Thu', 'Hoàng Minh Tuấn', 'Lý Thị Diệu', 'Vũ Thị Hà', 'Bùi Văn Nam', 'Đinh Thị Linh', 'Phan Quốc Bảo', 'Tô Thị Ngân', 'Lưu Văn Khánh'][i],
    phone: `09${Math.floor(Math.random() * 90 + 10)}${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 10)}`,
    service: services[i % services.length]?.name || 'Nâng cơ Hifu',
    date: `0${1 + Math.floor(i / 5)}/03/2026`,
    time: `${9 + (i % 8)}:${i % 2 === 0 ? '00' : '30'}`,
    source: ['Website', 'Facebook', 'Zalo', 'App'][i % 4],
    status: ['pending', 'confirmed', 'cancelled', 'confirmed', 'pending'][i % 5],
}))

const settings = { autoConfirm: true, maxPerSlot: 3, minNotice: 2, reminder: true, reminderBefore: 24 }

export default function BookingOnline() {
    const [tab, setTab] = useState('bookings')
    const [filter, setFilter] = useState('all')
    const [showSettings, setShowSettings] = useState(false)

    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)
    const counts = { all: bookings.length, pending: bookings.filter(b => b.status === 'pending').length, confirmed: bookings.filter(b => b.status === 'confirmed').length, cancelled: bookings.filter(b => b.status === 'cancelled').length }

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiGlobe size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Đặt lịch Online</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Nhận lịch hẹn từ Website, Facebook, Zalo, App</p>
                    </div>
                    <button onClick={() => setShowSettings(true)} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiSettings size={14} /> Cài đặt
                    </button>
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Chờ duyệt', v: counts.pending, c: '#fbbf24' }, { l: 'Đã xác nhận', v: counts.confirmed, c: '#bbf7d0' }, { l: 'Đã hủy', v: counts.cancelled, c: '#fca5a5' }, { l: 'Tổng', v: counts.all, c: 'white' }].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'all', label: `📋 Tất cả (${counts.all})` }, { id: 'pending', label: `⏳ Chờ duyệt (${counts.pending})` }, { id: 'confirmed', label: `✅ Đã xác nhận (${counts.confirmed})` }].map(f => (
                    <button key={f.id} onClick={() => setFilter(f.id)} style={{
                        padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                        fontSize: 13, fontWeight: 600, background: filter === f.id ? '#16a34a' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b',
                    }}>{f.label}</button>
                ))}
            </div>

            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ background: '#f8fafc' }}>
                        {['Mã', 'Khách hàng', 'Dịch vụ', 'Ngày', 'Giờ', 'Nguồn', 'Trạng thái', 'Thao tác'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                        ))}
                    </tr></thead>
                    <tbody>
                        {filtered.map((b, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#16a34a', fontWeight: 600, fontSize: 12 }}>{b.id}</td>
                                <td style={{ padding: '10px 14px' }}>
                                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.customer}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.phone}</div>
                                </td>
                                <td style={{ padding: '10px 14px', color: '#0f172a', fontSize: 12 }}>{b.service}</td>
                                <td style={{ padding: '10px 14px', color: '#64748b' }}>{b.date}</td>
                                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{b.time}</td>
                                <td style={{ padding: '10px 14px' }}>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                        background: b.source === 'Website' ? '#ecfdf5' : b.source === 'Facebook' ? '#eff6ff' : b.source === 'Zalo' ? '#f0f9ff' : '#f5f3ff',
                                        color: b.source === 'Website' ? '#059669' : b.source === 'Facebook' ? '#2563eb' : b.source === 'Zalo' ? '#0284c7' : '#7c3aed'
                                    }}>{b.source}</span>
                                </td>
                                <td style={{ padding: '10px 14px' }}>
                                    <span style={{
                                        padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                                        background: b.status === 'confirmed' ? '#ecfdf5' : b.status === 'pending' ? '#fffbeb' : '#fef2f2',
                                        color: b.status === 'confirmed' ? '#059669' : b.status === 'pending' ? '#d97706' : '#dc2626'
                                    }}>{b.status === 'confirmed' ? '✓ Xác nhận' : b.status === 'pending' ? '⏳ Chờ duyệt' : '✕ Đã hủy'}</span>
                                </td>
                                <td style={{ padding: '10px 14px' }}>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {b.status === 'pending' && <>
                                            <button style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: '#ecfdf5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCheck size={13} color="#059669" /></button>
                                            <button style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: '#fef2f2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiX size={13} color="#dc2626" /></button>
                                        </>}
                                        <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiEye size={13} color="#64748b" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showSettings && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowSettings(false)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 480 }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>⚙️ Cài đặt Booking</h3>
                        <div style={{ marginBottom: 16, padding: 12, background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <FiLink size={14} color="#16a34a" />
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Link đặt lịch</span>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <input readOnly value="https://beautyos.vn/booking/abc123" style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #d1fae5', fontSize: 12, fontFamily: 'monospace', background: 'white' }} />
                                <button style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#16a34a', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-family)', fontSize: 12 }}><FiCopy size={12} /> Copy</button>
                            </div>
                        </div>
                        {[{ l: 'Tự động xác nhận', v: settings.autoConfirm }, { l: 'Nhắc lịch trước', v: settings.reminder }].map((s, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{s.l}</span>
                                <div style={{ width: 42, height: 22, borderRadius: 11, background: s.v ? '#16a34a' : '#cbd5e1', position: 'relative', cursor: 'pointer' }}>
                                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: s.v ? 23 : 3, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                                </div>
                            </div>
                        ))}
                        {[{ l: 'Tối đa / slot', v: settings.maxPerSlot }, { l: 'Đặt trước tối thiểu (giờ)', v: settings.minNotice }].map((s, i) => (
                            <div key={i} style={{ marginTop: 12 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{s.l}</label>
                                <input defaultValue={s.v} type="number" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
                            <button onClick={() => setShowSettings(false)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Hủy</button>
                            <button onClick={() => setShowSettings(false)} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#16a34a', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
