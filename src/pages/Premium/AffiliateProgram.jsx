import { useState } from 'react'
import { FiPercent, FiUsers, FiDollarSign, FiTrendingUp, FiCopy, FiGift, FiBarChart2 } from 'react-icons/fi'

const affiliates = [
    { id: 1, name: 'Nguyễn Thị Hoa', code: 'HOA2026', customers: 15, revenue: '18,500,000đ', commission: '1,850,000đ', rate: '10%', status: 'active', rank: 'Gold' },
    { id: 2, name: 'Trần Văn Minh', code: 'MINH26', customers: 8, revenue: '9,200,000đ', commission: '920,000đ', rate: '10%', status: 'active', rank: 'Silver' },
    { id: 3, name: 'Lê Thị Lan', code: 'LAN2026', customers: 22, revenue: '28,400,000đ', commission: '2,840,000đ', rate: '10%', status: 'active', rank: 'Diamond' },
    { id: 4, name: 'Phạm Đức Anh', code: 'DUCAH', customers: 3, revenue: '3,100,000đ', commission: '310,000đ', rate: '10%', status: 'active', rank: 'Bronze' },
    { id: 5, name: 'Hoàng Thị Mai', code: 'MAI026', customers: 0, revenue: '0đ', commission: '0đ', rate: '10%', status: 'inactive', rank: 'New' },
]

const transactions = [
    { date: '01/03/2026', affiliate: 'Lê Thị Lan', customer: 'Ngô Văn B', service: 'Laser CO2', amount: '3,500,000đ', commission: '350,000đ', status: 'paid' },
    { date: '28/02/2026', affiliate: 'Nguyễn Thị Hoa', customer: 'Trần Thị C', service: 'Hydrafacial', amount: '1,200,000đ', commission: '120,000đ', status: 'pending' },
    { date: '27/02/2026', affiliate: 'Lê Thị Lan', customer: 'Lê Văn D', service: 'PRP Hair', amount: '5,000,000đ', commission: '500,000đ', status: 'paid' },
    { date: '25/02/2026', affiliate: 'Trần Văn Minh', customer: 'Phạm Thị E', service: 'Chemical Peel', amount: '800,000đ', commission: '80,000đ', status: 'pending' },
]

export default function AffiliateProgram() {
    const [tab, setTab] = useState('affiliates')
    const totalRevenue = affiliates.reduce((s, a) => s + parseInt(a.revenue.replace(/[^\d]/g, '')), 0)
    const totalCommission = affiliates.reduce((s, a) => s + parseInt(a.commission.replace(/[^\d]/g, '')), 0)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiPercent size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Hoa hồng CTV</h2>
                        <p>Quản lý cộng tác viên • Tracking mã giới thiệu • Chi trả hoa hồng</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'CTV hoạt động', v: affiliates.filter(a => a.status === 'active').length }, { l: 'Tổng KH giới thiệu', v: affiliates.reduce((s, a) => s + a.customers, 0) }, { l: 'Doanh thu CTV', v: `${(totalRevenue / 1000000).toFixed(1)}M` }, { l: 'Hoa hồng', v: `${(totalCommission / 1000000).toFixed(1)}M` }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'affiliates', label: '👥 Danh sách CTV' }, { id: 'transactions', label: '💰 Giao dịch' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#7c3aed' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'affiliates' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {affiliates.map(a => (
                        <div key={a.id} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: a.rank === 'Diamond' ? '#eef2ff' : a.rank === 'Gold' ? '#fffbeb' : a.rank === 'Silver' ? '#f1f5f9' : '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                                    {a.rank === 'Diamond' ? '💎' : a.rank === 'Gold' ? '🥇' : a.rank === 'Silver' ? '🥈' : a.rank === 'Bronze' ? '🥉' : '🌱'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{a.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
                                        Mã: <code style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, fontWeight: 600, color: '#7c3aed' }}>{a.code}</code>
                                        <FiCopy size={10} style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: a.status === 'active' ? '#ecfdf5' : '#f1f5f9', color: a.status === 'active' ? '#059669' : '#94a3b8' }}>
                                    {a.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                <span><FiUsers size={11} /> {a.customers} KH</span>
                                <span><FiDollarSign size={11} /> {a.revenue}</span>
                                <span><FiGift size={11} /> {a.commission}</span>
                                <span><FiPercent size={11} /> {a.rate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'transactions' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Ngày', 'CTV', 'Khách hàng', 'Dịch vụ', 'Doanh thu', 'Hoa hồng', 'TT'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {transactions.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ color: '#64748b', fontSize: 12 }}>{t.date}</td>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{t.affiliate}</td>
                                    <td style={{ color: '#64748b' }}>{t.customer}</td>
                                    <td style={{ color: '#64748b' }}>{t.service}</td>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{t.amount}</td>
                                    <td style={{ fontWeight: 600, color: '#7c3aed' }}>{t.commission}</td>
                                    <td>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: t.status === 'paid' ? '#ecfdf5' : '#fffbeb', color: t.status === 'paid' ? '#059669' : '#d97706' }}>
                                            {t.status === 'paid' ? '✅ Đã trả' : '⏳ Chờ'}
                                        </span>
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
