import { useState } from 'react'
import { FiTarget, FiUsers, FiPhone, FiCalendar, FiHeart, FiStar, FiChevronRight, FiPlus, FiClock, FiAlertCircle, FiMail, FiSettings } from 'react-icons/fi'
import { customers, tickets } from '../../data/mockData'

const stages = [
    { id: 'new', name: 'Lead Mới', color: '#3b82f6', bg: '#eff6ff', icon: FiTarget },
    { id: 'consulting', name: 'Đã tư vấn', color: '#f59e0b', bg: '#fffbeb', icon: FiPhone },
    { id: 'booked', name: 'Đã hẹn', color: '#8b5cf6', bg: '#f5f3ff', icon: FiCalendar },
    { id: 'treating', name: 'Đang điều trị', color: '#059669', bg: '#ecfdf5', icon: FiHeart },
    { id: 'followup', name: 'Tái khám', color: '#06b6d4', bg: '#ecfeff', icon: FiClock },
    { id: 'loyal', name: 'Trung thành', color: '#dc2626', bg: '#fef2f2', icon: FiStar },
]

const pipelineData = stages.map((s, si) => ({
    ...s,
    cards: customers.slice(si * 4, si * 4 + 3 + Math.floor(Math.random() * 3)).map((c, ci) => ({
        id: `${s.id}-${ci}`, name: c.name, phone: c.phone, group: c.group,
        service: ['Nâng cơ Hifu', 'Trị mụn', 'Filler môi', 'Mesotherapy', 'Cấy tế bào gốc'][ci % 5],
        lastAction: `${Math.floor(Math.random() * 7) + 1} ngày trước`,
        daysInStage: Math.floor(Math.random() * 15) + 1,
    })),
}))

const dormant = [
    { name: 'Lý Thị Diệu', days: 35, group: '30 ngày', color: '#f59e0b' },
    { name: 'Mai Thị Phương', days: 42, group: '30 ngày', color: '#f59e0b' },
    { name: 'Dương Hữu Nghĩa', days: 65, group: '60 ngày', color: '#f97316' },
    { name: 'Phan Thị Lan', days: 72, group: '60 ngày', color: '#f97316' },
    { name: 'Lưu Thị Thủy', days: 95, group: '90 ngày', color: '#dc2626' },
    { name: 'Nguyễn Thanh Sơn', days: 102, group: '90 ngày', color: '#dc2626' },
]

const workflows = [
    { name: 'Chào mừng khách mới', steps: 3, status: 'active', sent: 234 },
    { name: 'Follow-up sau tư vấn', steps: 4, status: 'active', sent: 156 },
    { name: 'Nhắc tái khám', steps: 2, status: 'active', sent: 89 },
    { name: 'Win-back 60 ngày', steps: 5, status: 'paused', sent: 45 },
]

export default function CRMAutomation() {
    const [tab, setTab] = useState('pipeline')
    const [dragItem, setDragItem] = useState(null)

    const conversionRates = stages.map((s, i) => {
        const total = pipelineData[i].cards.length
        const next = i < stages.length - 1 ? pipelineData[i + 1].cards.length : total
        return { ...s, count: total, rate: i < stages.length - 1 ? Math.round((next / Math.max(total, 1)) * 100) : 100 }
    })

    return (
        <div className="fade-in" style={{ maxWidth: 1400, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiTarget size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>CRM Automation</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Pipeline Kanban • Workflow tự động • Phân nhóm khách vắng</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'pipeline', label: '📋 Pipeline' }, { id: 'dormant', label: '⚠️ Khách vắng' }, { id: 'workflow', label: '⚡ Workflow' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                        fontSize: 13, fontWeight: 600, background: tab === t.id ? '#6366f1' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* Pipeline Kanban */}
            {tab === 'pipeline' && (
                <>
                    {/* Conversion Funnel */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16, overflowX: 'auto' }}>
                        {conversionRates.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <div style={{ background: s.bg, borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.count}</span>
                                    <span style={{ fontSize: 11, color: '#64748b' }}>{s.name}</span>
                                </div>
                                {i < stages.length - 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <FiChevronRight size={14} color="#94a3b8" />
                                        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>{s.rate}%</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Board */}
                    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                        {pipelineData.map(stage => (
                            <div key={stage.id} style={{ minWidth: 220, flex: 1, background: '#f8fafc', borderRadius: 12, padding: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '4px 8px' }}>
                                    <stage.icon size={14} color={stage.color} />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', flex: 1 }}>{stage.name}</span>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>{stage.cards.length}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {stage.cards.map(card => (
                                        <div key={card.id} draggable onDragStart={() => setDragItem(card.id)} style={{
                                            background: 'white', borderRadius: 10, padding: '12px 14px', border: '1px solid #e5e7eb',
                                            cursor: 'grab', transition: 'box-shadow 0.2s',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{card.name}</span>
                                                <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: card.group === 'VIP' ? '#fef2f2' : '#f1f5f9', color: card.group === 'VIP' ? '#dc2626' : '#64748b', fontWeight: 600 }}>{card.group}</span>
                                            </div>
                                            <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 500, marginBottom: 4 }}>{card.service}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
                                                <span>{card.lastAction}</span>
                                                <span>{card.daysInStage}d in stage</span>
                                            </div>
                                        </div>
                                    ))}
                                    <button style={{
                                        padding: '8px', borderRadius: 8, border: '1px dashed #cbd5e1', background: 'transparent',
                                        color: '#94a3b8', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                                    }}><FiPlus size={12} /> Thêm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Dormant */}
            {tab === 'dormant' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    {['30 ngày', '60 ngày', '90 ngày'].map((group, gi) => {
                        const items = dormant.filter(d => d.group === group)
                        const colors = ['#f59e0b', '#f97316', '#dc2626']
                        const bgs = ['#fffbeb', '#fff7ed', '#fef2f2']
                        return (
                            <div key={group} style={{ background: 'white', borderRadius: 14, border: `1px solid ${colors[gi]}30`, overflow: 'hidden' }}>
                                <div style={{ background: bgs[gi], padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <FiAlertCircle size={16} color={colors[gi]} />
                                    <span style={{ fontSize: 14, fontWeight: 700, color: colors[gi] }}>Vắng &gt; {group}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: colors[gi], background: 'white', padding: '2px 8px', borderRadius: 6 }}>{items.length}</span>
                                </div>
                                {items.map((d, i) => (
                                    <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{d.name}</div>
                                            <div style={{ fontSize: 11, color: '#94a3b8' }}>Vắng {d.days} ngày</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiPhone size={12} color="#059669" /></button>
                                            <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiMail size={12} color="#2563eb" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Workflows */}
            {tab === 'workflow' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {workflows.map((w, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 10, background: w.status === 'active' ? '#ecfdf5' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiSettings size={18} color={w.status === 'active' ? '#059669' : '#94a3b8'} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{w.name}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>{w.steps} bước • Đã gửi: {w.sent} tin</div>
                            </div>
                            <span style={{
                                padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                                background: w.status === 'active' ? '#ecfdf5' : '#fef3e2', color: w.status === 'active' ? '#059669' : '#d97706',
                            }}>{w.status === 'active' ? '✓ Đang chạy' : '⏸ Tạm dừng'}</span>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {[0, 1, 2].map(s => (
                                    <div key={s} style={{ width: 24, height: 4, borderRadius: 2, background: s < (w.status === 'active' ? 3 : 1) ? '#6366f1' : '#e2e8f0' }} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
