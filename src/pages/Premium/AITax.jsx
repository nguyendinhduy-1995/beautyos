import { useState } from 'react'
import { FiFileText, FiDollarSign, FiCalendar, FiAlertTriangle, FiCheck, FiDownload, FiTrendingUp, FiPieChart } from 'react-icons/fi'

const taxSummary = {
    revenue: 635000000, vat: 63500000, pit: 18200000, socialIns: 42500000, totalTax: 124200000,
    deductions: [
        { name: 'Chi phí lương', amount: 210000000 }, { name: 'Vật tư tiêu hao', amount: 85000000 },
        { name: 'Mặt bằng', amount: 65000000 }, { name: 'Marketing', amount: 45000000 },
        { name: 'Điện nước', amount: 22000000 }, { name: 'Khấu hao TSCĐ', amount: 15000000 },
    ],
}

const monthlyTax = [
    { month: 'T9', vat: 52, pit: 15, si: 38 }, { month: 'T10', vat: 58, pit: 16, si: 39 },
    { month: 'T11', vat: 61, pit: 17, si: 40 }, { month: 'T12', vat: 72, pit: 19, si: 43 },
    { month: 'T1', vat: 65, pit: 18, si: 41 }, { month: 'T2', vat: 63, pit: 18, si: 42 },
]
const maxTax = Math.max(...monthlyTax.map(m => m.vat + m.pit + m.si))

const alerts = [
    { type: 'warning', title: 'Hạn nộp VAT tháng 2', desc: 'Còn 20 ngày (20/03/2026)', color: '#d97706' },
    { type: 'warning', title: 'Quyết toán thuế TNCN năm 2025', desc: 'Hạn chót: 31/03/2026', color: '#dc2626' },
    { type: 'info', title: 'Dự kiến thuế tháng 3', desc: 'AI ước tính: 68M VAT dựa trên xu hướng', color: '#2563eb' },
]

const reports = [
    { name: 'Tờ khai VAT T02/2026', status: 'done', date: '25/02/2026' },
    { name: 'Báo cáo BHXH T02/2026', status: 'done', date: '28/02/2026' },
    { name: 'Tờ khai VAT T03/2026', status: 'pending', date: '20/03/2026' },
    { name: 'Quyết toán thuế TNCN 2025', status: 'pending', date: '31/03/2026' },
]

export default function AITax() {
    const [tab, setTab] = useState('overview')
    const totalDeductions = taxSummary.deductions.reduce((a, d) => a + d.amount, 0)
    const taxableIncome = taxSummary.revenue - totalDeductions

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiFileText size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Thuế & Kế toán</h2>
                        <p>Tự động tính thuế • Nhắc hạn nộp • Tối ưu chi phí khấu trừ</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Doanh thu', v: '635M', c: 'white' }, { l: 'Tổng thuế', v: '124M', c: '#fbbf24' }, { l: 'Khấu trừ', v: (totalDeductions / 1000000).toFixed(0) + 'M', c: '#bbf7d0' }, { l: 'TN chịu thuế', v: (taxableIncome / 1000000).toFixed(0) + 'M', c: 'white' }].map((s, i) => (
                        <div key={i}><div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div></div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'overview', label: '📊 Tổng quan' }, { id: 'deductions', label: '📋 Khấu trừ' }, { id: 'reports', label: '📄 Tờ khai' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0f766e' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {/* Alerts */}
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>🔔 Cảnh báo AI</h3>
                        {alerts.map((a, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < alerts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: a.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <FiAlertTriangle size={14} color={a.color} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.title}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Chart */}
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>📊 Thuế theo tháng (triệu đ)</h3>
                        <div style={{ display: 'flex', gap: 6, fontSize: 10, marginBottom: 8 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#0f766e' }} /> VAT</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#f59e0b' }} /> TNCN</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#3b82f6' }} /> BHXH</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160 }}>
                            {monthlyTax.map((m, i) => {
                                const total = m.vat + m.pit + m.si
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0f172a' }}>{total}M</span>
                                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <div style={{ height: (m.si / maxTax) * 100, background: '#3b82f6', borderRadius: '4px 4px 0 0' }} />
                                            <div style={{ height: (m.pit / maxTax) * 100, background: '#f59e0b' }} />
                                            <div style={{ height: (m.vat / maxTax) * 100, background: '#0f766e', borderRadius: '0 0 4px 4px' }} />
                                        </div>
                                        <span style={{ fontSize: 10, color: '#64748b' }}>{m.month}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* Tax breakdown */}
                    <div style={{ gridColumn: '1 / -1', background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {[{ l: 'VAT (10%)', v: taxSummary.vat, c: '#0f766e' }, { l: 'Thuế TNCN', v: taxSummary.pit, c: '#f59e0b' }, { l: 'BHXH/BHYT', v: taxSummary.socialIns, c: '#3b82f6' }, { l: 'Tổng thuế phải nộp', v: taxSummary.totalTax, c: '#dc2626' }].map((t, i) => (
                            <div key={i} style={{ textAlign: 'center', background: t.c + '08', borderRadius: 10, padding: '12px' }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: t.c }}>{(t.v / 1000000).toFixed(0)}M</div>
                                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{t.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'deductions' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📋 Chi phí được khấu trừ</h3>
                    {taxSummary.deductions.map((d, i) => {
                        const pct = (d.amount / totalDeductions) * 100
                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                <span style={{ width: 140, fontSize: 13, color: '#374151' }}>{d.name}</span>
                                <div style={{ flex: 1, height: 20, borderRadius: 6, background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, #0f766e, #14b8a6)' }} />
                                    <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 10, fontWeight: 600, color: '#0f172a' }}>{pct.toFixed(0)}%</span>
                                </div>
                                <span style={{ width: 70, fontSize: 13, fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>{(d.amount / 1000000).toFixed(0)}M</span>
                            </div>
                        )
                    })}
                    <div style={{ borderTop: '2px solid #0f172a', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                        <span style={{ fontWeight: 800 }}>Tổng khấu trừ</span>
                        <span style={{ fontWeight: 800, color: '#059669' }}>{(totalDeductions / 1000000).toFixed(0)}M</span>
                    </div>
                </div>
            )}

            {tab === 'reports' && (
                <div className="premium-table-wrap">
                    {reports.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: r.status === 'done' ? '#ecfdf5' : '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {r.status === 'done' ? <FiCheck size={16} color="#059669" /> : <FiCalendar size={16} color="#d97706" />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{r.name}</div>
                                <div style={{ fontSize: 11, color: '#94a3b8' }}>Hạn: {r.date}</div>
                            </div>
                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: r.status === 'done' ? '#ecfdf5' : '#fffbeb', color: r.status === 'done' ? '#059669' : '#d97706' }}>
                                {r.status === 'done' ? '✓ Đã nộp' : '⏳ Chờ nộp'}
                            </span>
                            {r.status === 'done' && <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-family)', color: '#64748b' }}><FiDownload size={11} /> Tải</button>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
