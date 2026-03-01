import { useState } from 'react'
import { FiHome, FiCheckCircle, FiClock, FiShoppingBag, FiAlertCircle, FiStar, FiCalendar } from 'react-icons/fi'

const patients = [
    { id: 1, name: 'Lê Thị Ánh', treatment: 'Laser CO2 Fractional', date: '25/02/2026', phase: 2, compliance: 85, nextVisit: '10/03/2026' },
    { id: 2, name: 'Ngô Thị Trang', treatment: 'Mesotherapy Vitamin C', date: '22/02/2026', phase: 1, compliance: 92, nextVisit: '08/03/2026' },
    { id: 3, name: 'Hoàng Thị Thu', treatment: 'PRP Hair Growth', date: '20/02/2026', phase: 3, compliance: 78, nextVisit: '05/03/2026' },
    { id: 4, name: 'Hồ Thị Xuân', treatment: 'Chemical Peel AHA 30%', date: '18/02/2026', phase: 1, compliance: 100, nextVisit: '04/03/2026' },
    { id: 5, name: 'Đỗ Thị Ngọc', treatment: 'Hydrafacial', date: '15/02/2026', phase: 2, compliance: 60, nextVisit: '01/03/2026' },
]

const phases = [
    { id: 1, name: 'Phục hồi ban đầu', days: '1-3 ngày', color: '#ef4444', tips: ['Tránh nắng tuyệt đối', 'Rửa mặt bằng nước ấm', 'Dùng kem dưỡng ẩm dịu nhẹ'] },
    { id: 2, name: 'Tái tạo tích cực', days: '4-14 ngày', color: '#f59e0b', tips: ['SPF50+ mỗi 2 giờ', 'Serum Vitamin C buổi sáng', 'Không tẩy da chết'] },
    { id: 3, name: 'Ổn định & Bảo dưỡng', days: '15-30 ngày', color: '#10b981', tips: ['Retinol liều thấp buổi tối', 'Mask cấp ẩm 2 lần/tuần', 'Tái khám theo lịch hẹn'] },
]

const products = [
    { name: 'Gel rửa mặt Cetaphil', phase: 1, price: '285,000đ', usage: 'Sáng + tối', match: 95 },
    { name: 'Kem dưỡng ẩm La Roche-Posay B5', phase: 1, price: '450,000đ', usage: 'Sau rửa mặt', match: 92 },
    { name: 'Serum Vitamin C 15% Obagi', phase: 2, price: '1,200,000đ', usage: 'Buổi sáng', match: 88 },
    { name: 'Kem chống nắng Anessa SPF50+', phase: 2, price: '520,000đ', usage: 'Mỗi 2h', match: 96 },
    { name: 'Retinol 0.25% CeraVe', phase: 3, price: '380,000đ', usage: 'Tối 3 lần/tuần', match: 85 },
    { name: 'Mặt nạ HA Laneige', phase: 3, price: '680,000đ', usage: '2 lần/tuần', match: 90 },
]

export default function AIHomecare() {
    const [tab, setTab] = useState('timeline')
    const [selectedPatient, setSelectedPatient] = useState(patients[0])
    const avgCompliance = Math.round(patients.reduce((s, p) => s + p.compliance, 0) / patients.length)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiHome size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Tư vấn Homecare</h2>
                        <p>Chăm sóc hậu liệu trình • Theo dõi compliance • Gợi ý sản phẩm AI</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Đang theo dõi', v: patients.length }, { l: 'TB Compliance', v: `${avgCompliance}%` }, { l: 'Phase 1', v: patients.filter(p => p.phase === 1).length }, { l: 'Phase 2-3', v: patients.filter(p => p.phase >= 2).length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'timeline', label: '📋 Timeline Phục hồi' }, { id: 'patients', label: '👤 Bệnh nhân' }, { id: 'products', label: '🛍️ Sản phẩm AI' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#059669' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'timeline' && (
                <div>
                    <div className="premium-alert" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46' }}>
                        <FiCheckCircle size={14} /> AI tạo timeline chăm sóc dựa trên loại liệu trình & tình trạng da
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {phases.map(phase => (
                            <div key={phase.id} className="premium-card" style={{ borderLeft: `4px solid ${phase.color}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${phase.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FiClock size={14} color={phase.color} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Phase {phase.id}: {phase.name}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{phase.days}</div>
                                    </div>
                                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: `${phase.color}15`, color: phase.color }}>
                                        {patients.filter(p => p.phase === phase.id).length} bệnh nhân
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {phase.tips.map((tip, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#475569' }}>
                                            <FiCheckCircle size={12} color={phase.color} />
                                            {tip}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'patients' && (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {patients.map(p => (
                            <div key={p.id} className="premium-card" style={{ cursor: 'pointer', borderLeft: selectedPatient.id === p.id ? '3px solid #059669' : '3px solid transparent' }} onClick={() => setSelectedPatient(p)}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `hsl(${p.compliance * 1.2}, 70%, 92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: `hsl(${p.compliance * 1.2}, 70%, 35%)` }}>
                                        {p.compliance}%
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{p.treatment} • {p.date}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: p.phase === 1 ? '#fef2f2' : p.phase === 2 ? '#fffbeb' : '#ecfdf5', color: p.phase === 1 ? '#dc2626' : p.phase === 2 ? '#d97706' : '#059669' }}>
                                            Phase {p.phase}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <div className="premium-progress">
                                        <div className="premium-progress-fill" style={{ width: `${p.compliance}%`, background: p.compliance >= 80 ? '#10b981' : p.compliance >= 60 ? '#f59e0b' : '#ef4444' }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: '#94a3b8' }}>
                                        <span>Compliance: {p.compliance}%</span>
                                        <span><FiCalendar size={10} /> Tái khám: {p.nextVisit}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'products' && (
                <div>
                    <div className="premium-alert" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
                        <FiShoppingBag size={14} /> AI gợi ý sản phẩm phù hợp theo từng phase phục hồi
                    </div>
                    <div className="premium-cards-grid">
                        {products.map((p, i) => (
                            <div key={i} className="premium-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600, background: p.phase === 1 ? '#fef2f2' : p.phase === 2 ? '#fffbeb' : '#ecfdf5', color: p.phase === 1 ? '#dc2626' : p.phase === 2 ? '#d97706' : '#059669' }}>Phase {p.phase}</span>
                                    <span style={{ fontSize: 10, color: '#94a3b8' }}>{p.usage}</span>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{p.name}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#059669' }}>{p.price}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#f59e0b' }}>
                                        <FiStar size={11} /> {p.match}% match
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
