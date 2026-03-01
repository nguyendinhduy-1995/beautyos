import { useState } from 'react'
import { FiUsers, FiDollarSign, FiTrendingUp, FiLink, FiCopy, FiSearch, FiPlus, FiStar } from 'react-icons/fi'

const affiliates = Array.from({ length: 12 }, (_, i) => ({
    id: `CTV-${String(100 + i).padStart(3, '0')}`, name: ['Lê Minh Quân', 'Trần Thị Hoài', 'Nguyễn Hải Yến', 'Phạm Đức Anh', 'Đỗ Thị Mỹ', 'Cao Văn Lâm', 'Mai Thị Thảo', 'Vũ Quốc Huy', 'Bùi Thị Nhi', 'Đinh Văn Trí', 'Phan Mỹ Linh', 'Tô Hải Đăng'][i],
    phone: `09${70 + i}${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 100)}`,
    referrals: Math.floor(Math.random() * 20 + 1), converted: Math.floor(Math.random() * 10 + 1),
    commission: Math.floor(Math.random() * 15 + 1) * 1000000, paid: Math.floor(Math.random() * 8) * 1000000,
    tier: ['Bronze', 'Silver', 'Gold', 'Platinum'][i % 4], status: i % 5 === 4 ? 'inactive' : 'active',
    link: `beautyos.vn/ref/ctv${100 + i}`,
}))

const totalCommission = affiliates.reduce((a, c) => a + c.commission, 0)
const totalReferrals = affiliates.reduce((a, c) => a + c.referrals, 0)
const totalConverted = affiliates.reduce((a, c) => a + c.converted, 0)

const tierColors = { Bronze: '#cd7f32', Silver: '#94a3b8', Gold: '#d97706', Platinum: '#7c3aed' }
const tierBgs = { Bronze: '#fef3e2', Silver: '#f1f5f9', Gold: '#fffbeb', Platinum: '#f5f3ff' }

export default function AffiliateProgram() {
    const [search, setSearch] = useState('')
    const [showAdd, setShowAdd] = useState(false)

    const filtered = affiliates.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiUsers size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Cộng tác viên (CTV)</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Quản lý CTV • Link giới thiệu • Hoa hồng tự động</p>
                    </div>
                    <button onClick={() => setShowAdd(true)} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiPlus size={14} /> Thêm CTV
                    </button>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Tổng CTV', v: affiliates.filter(a => a.status === 'active').length },
                    { l: 'Giới thiệu', v: totalReferrals }, { l: 'Chuyển đổi', v: totalConverted },
                    { l: 'Hoa hồng', v: (totalCommission / 1000000).toFixed(0) + 'M' }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FiSearch size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm CTV..." style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ background: '#f8fafc' }}>
                        {['CTV', 'Hạng', 'Giới thiệu', 'Chuyển đổi', 'Hoa hồng', 'Đã thanh toán', 'Link', 'TT'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                        ))}
                    </tr></thead>
                    <tbody>
                        {filtered.map((a, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', opacity: a.status === 'active' ? 1 : 0.5 }}>
                                <td style={{ padding: '10px 14px' }}>
                                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{a.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.phone} • {a.id}</div>
                                </td>
                                <td style={{ padding: '10px 14px' }}>
                                    <span style={{ padding: '2px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: tierBgs[a.tier], color: tierColors[a.tier] }}>{a.tier}</span>
                                </td>
                                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{a.referrals}</td>
                                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>{a.converted}</td>
                                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#7c3aed' }}>{(a.commission / 1000000).toFixed(1)}M</td>
                                <td style={{ padding: '10px 14px', color: '#64748b' }}>{(a.paid / 1000000).toFixed(1)}M</td>
                                <td style={{ padding: '10px 14px' }}>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 10, cursor: 'pointer', fontFamily: 'var(--font-family)', color: '#64748b' }}>
                                        <FiCopy size={10} /> Copy
                                    </button>
                                </td>
                                <td style={{ padding: '10px 14px' }}>
                                    <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: a.status === 'active' ? '#ecfdf5' : '#f1f5f9', color: a.status === 'active' ? '#059669' : '#94a3b8' }}>
                                        {a.status === 'active' ? '● Hoạt động' : '○ Tạm dừng'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAdd && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAdd(false)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 420 }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>➕ Thêm CTV mới</h3>
                        {[{ l: 'Họ tên', p: 'Nhập họ tên CTV' }, { l: 'SĐT', p: '09xx xxx xxx' }, { l: 'Email', p: 'email@example.com' }].map((f, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{f.l}</label>
                                <input placeholder={f.p} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                        ))}
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>% Hoa hồng</label>
                            <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }}>
                                <option>5%</option><option>8%</option><option>10%</option><option>15%</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Hủy</button>
                            <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#7c3aed', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Thêm CTV</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
