import { useState } from 'react'
import { FiHome, FiCalendar, FiShoppingBag, FiBell, FiCheck, FiCheckCircle } from 'react-icons/fi'

const timeline = [
    { day: 'Ngày 1-3', phase: 'Phục hồi', tasks: ['Rửa mặt nhẹ nhàng (sữa rửa mặt pH thấp)', 'Thoa serum phục hồi B5', 'Kem dưỡng ẩm phục hồi', 'KHÔNG dùng retinol, AHA/BHA'], done: [true, true, true, true] },
    { day: 'Ngày 4-7', phase: 'Duy trì', tasks: ['Bắt đầu dùng lại toner nhẹ nhàng', 'Serum Vitamin C buổi sáng', 'Kem chống nắng SPF50 (bắt buộc)', 'Mask cấp ẩm 2 lần/tuần'], done: [true, true, false, true] },
    { day: 'Ngày 8-14', phase: 'Tái tạo', tasks: ['Thêm serum Niacinamide buổi tối', 'Peel nhẹ AHA 5% (1 lần/tuần)', 'Duy trì chống nắng & dưỡng ẩm', 'Uống collagen peptide hàng ngày'], done: [false, false, false, false] },
    { day: 'Ngày 15-30', phase: 'Chuẩn bị tái khám', tasks: ['Dùng retinol 0.3% (2-3 tối/tuần)', 'Mask collagen 2 lần/tuần', 'Chụp ảnh tiến trình để so sánh', 'Đặt lịch tái khám'], done: [false, false, false, false] },
]

const products = [
    { name: 'Sữa rửa mặt  pH 5.5', brand: 'CeraVe', usage: 'Sáng + Tối', price: '350.000đ', match: 95, instock: true },
    { name: 'Serum B5 Panthenol', brand: 'La Roche-Posay', usage: 'Sáng + Tối (ngày 1-7)', price: '520.000đ', match: 92, instock: true },
    { name: 'Serum Vitamin C 15%', brand: 'Obagi', usage: 'Sáng (ngày 4+)', price: '890.000đ', match: 88, instock: true },
    { name: 'Kem chống nắng SPF50+', brand: 'Anessa', usage: 'Sáng (bắt buộc)', price: '450.000đ', match: 96, instock: true },
    { name: 'Retinol 0.3%', brand: 'The Ordinary', usage: 'Tối (ngày 15+, 2-3 lần/tuần)', price: '280.000đ', match: 85, instock: false },
]

const compliance = { total: 12, done: 8, rate: 67 }

export default function AIHomecare() {
    const [tab, setTab] = useState('timeline')

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #059669, #34d399)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiHome size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>AI Tư vấn Homecare</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Lịch chăm sóc da tại nhà • Sản phẩm phù hợp • Nhắc nhở tự động</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
                    {[{ l: 'Đã thực hiện', v: `${compliance.done}/${compliance.total}` }, { l: 'Tuân thủ', v: `${compliance.rate}%` }, { l: 'Ngày còn lại', v: '22' }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'timeline', label: '📅 Lịch chăm sóc' }, { id: 'products', label: '🧴 Sản phẩm' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#059669' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'timeline' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {timeline.map((t, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <div>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{t.day}</span>
                                    <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: '#ecfdf5', color: '#059669' }}>{t.phase}</span>
                                </div>
                                <span style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>{t.done.filter(Boolean).length}/{t.tasks.length} hoàn thành</span>
                            </div>
                            {t.tasks.map((task, j) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${t.done[j] ? '#059669' : '#cbd5e1'}`, background: t.done[j] ? '#059669' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        {t.done[j] && <FiCheck size={12} color="white" />}
                                    </div>
                                    <span style={{ color: t.done[j] ? '#94a3b8' : '#374151', textDecoration: t.done[j] ? 'line-through' : 'none' }}>{task}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'products' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {products.map((p, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, opacity: p.instock ? 1 : 0.6 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#059669' }}>{p.match}%</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{p.brand} • {p.usage}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#059669' }}>{p.price}</div>
                                <span style={{ fontSize: 10, color: p.instock ? '#059669' : '#dc2626', fontWeight: 600 }}>{p.instock ? '✓ Có sẵn' : '✕ Hết hàng'}</span>
                            </div>
                            <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: p.instock ? '#059669' : '#cbd5e1', color: 'white', fontSize: 11, fontWeight: 600, cursor: p.instock ? 'pointer' : 'default', fontFamily: 'var(--font-family)' }}>Mua ngay</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
