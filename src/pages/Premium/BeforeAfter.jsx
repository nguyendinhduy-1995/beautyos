import { useState } from 'react'
import { FiCamera, FiImage, FiCalendar, FiUser, FiStar, FiEye } from 'react-icons/fi'

const cases = [
    { id: 1, customer: 'Nguyễn Thị Hoa', service: 'Nâng cơ Hifu', date: '01/03/2026', sessions: 3, rating: 5, zone: 'Mặt + Cổ', note: 'Da săn chắc rõ rệt sau 3 buổi' },
    { id: 2, customer: 'Trần Văn Minh', service: 'Trị mụn Laser', date: '25/02/2026', sessions: 5, rating: 4, zone: 'Toàn mặt', note: 'Mụn viêm giảm 80%, còn thâm nhẹ' },
    { id: 3, customer: 'Lê Thị Lan', service: 'Filler môi', date: '20/02/2026', sessions: 1, rating: 5, zone: 'Môi trên + dưới', note: 'Form môi tự nhiên, KH rất hài lòng' },
    { id: 4, customer: 'Phạm Đức Anh', service: 'PRP Hair', date: '15/02/2026', sessions: 4, rating: 4, zone: 'Vùng đỉnh đầu', note: 'Tóc con mọc sau buổi 3' },
    { id: 5, customer: 'Hoàng Thị Mai', service: 'Chemical Peel', date: '10/02/2026', sessions: 3, rating: 5, zone: 'Toàn mặt', note: 'Da sáng hơn 2 tone, đều màu' },
    { id: 6, customer: 'Đỗ Văn Hào', service: 'Xóa xăm Laser', date: '05/02/2026', sessions: 6, rating: 3, zone: 'Cánh tay phải', note: 'Mờ 60%, cần thêm 2-3 buổi' },
]

const stats = { total: cases.length, avgRating: (cases.reduce((s, c) => s + c.rating, 0) / cases.length).toFixed(1), fiveStar: cases.filter(c => c.rating === 5).length }

export default function BeforeAfter() {
    const [tab, setTab] = useState('gallery')
    const [selected, setSelected] = useState(null)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #9333ea, #c084fc)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiCamera size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Before & After Gallery</h2>
                        <p>Case study • So sánh kết quả • AI đánh giá hiệu quả</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tổng case', v: stats.total }, { l: 'TB Rating', v: `${stats.avgRating}⭐` }, { l: '5 sao', v: stats.fiveStar }, { l: 'Dịch vụ', v: 5 }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'gallery', label: '🖼️ Gallery' }, { id: 'table', label: '📋 Danh sách' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#9333ea' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'gallery' && (
                <div className="premium-cards-grid">
                    {cases.map(c => (
                        <div key={c.id} className="premium-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelected(c)}>
                            <div style={{ display: 'flex', height: 120 }}>
                                <div style={{ flex: 1, background: '#fef2f2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiImage size={20} color="#dc2626" />
                                    <span style={{ fontSize: 10, fontWeight: 600, color: '#dc2626', marginTop: 4 }}>BEFORE</span>
                                </div>
                                <div style={{ width: 2, background: 'white' }} />
                                <div style={{ flex: 1, background: '#ecfdf5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiImage size={20} color="#059669" />
                                    <span style={{ fontSize: 10, fontWeight: 600, color: '#059669', marginTop: 4 }}>AFTER</span>
                                </div>
                            </div>
                            <div style={{ padding: '12px 16px' }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{c.service}</div>
                                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{c.customer} • {c.zone}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 2 }}>
                                        {[1, 2, 3, 4, 5].map(s => <FiStar key={s} size={12} color={s <= c.rating ? '#f59e0b' : '#e5e7eb'} fill={s <= c.rating ? '#f59e0b' : 'none'} />)}
                                    </div>
                                    <span style={{ fontSize: 10, color: '#94a3b8' }}>{c.sessions} buổi</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'table' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Khách hàng', 'Dịch vụ', 'Vùng', 'Buổi', 'Rating', 'Ghi chú', 'Ngày'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {cases.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.customer}</td>
                                    <td style={{ color: '#9333ea', fontWeight: 600 }}>{c.service}</td>
                                    <td style={{ color: '#64748b' }}>{c.zone}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{c.sessions}</td>
                                    <td><div style={{ display: 'flex', gap: 1 }}>{[1, 2, 3, 4, 5].map(s => <FiStar key={s} size={10} color={s <= c.rating ? '#f59e0b' : '#e5e7eb'} fill={s <= c.rating ? '#f59e0b' : 'none'} />)}</div></td>
                                    <td style={{ fontSize: 11, color: '#64748b', maxWidth: 200 }}>{c.note}</td>
                                    <td style={{ color: '#94a3b8', fontSize: 12 }}>{c.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selected && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setSelected(null)}>
                    <div className="premium-card" style={{ maxWidth: 480, width: '100%', padding: 24 }} onClick={e => e.stopPropagation()}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{selected.service}</div>
                        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>{selected.customer} • {selected.zone} • {selected.sessions} buổi</div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                            <div style={{ flex: 1, height: 160, background: '#fef2f2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><FiImage size={24} color="#dc2626" /><span style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>Before</span></div>
                            <div style={{ flex: 1, height: 160, background: '#ecfdf5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><FiImage size={24} color="#059669" /><span style={{ fontSize: 11, color: '#059669', marginTop: 4 }}>After</span></div>
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>📝 {selected.note}</div>
                        <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>{[1, 2, 3, 4, 5].map(s => <FiStar key={s} size={16} color={s <= selected.rating ? '#f59e0b' : '#e5e7eb'} fill={s <= selected.rating ? '#f59e0b' : 'none'} />)}</div>
                        <button onClick={() => setSelected(null)} className="premium-action-btn" style={{ background: '#9333ea', color: 'white' }}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    )
}
