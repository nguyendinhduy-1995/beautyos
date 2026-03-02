import { useState } from 'react'
import { FiFileText, FiDollarSign, FiAlertCircle, FiCalendar, FiCheck, FiDownload } from 'react-icons/fi'

const taxData = [
    { month: 'T1/2026', revenue: 380, vat: 38, pit: 12.5, social: 18.2, total: 68.7, status: 'paid' },
    { month: 'T2/2026', revenue: 420, vat: 42, pit: 13.8, social: 18.2, total: 74, status: 'paid' },
    { month: 'T3/2026', revenue: 510, vat: 51, pit: 15.2, social: 18.2, total: 84.4, status: 'pending' },
]

const deductions = [
    { category: 'Nguyên vật liệu', amount: 85, deductible: true, note: 'Hóa đơn đầy đủ' },
    { category: 'Thuê mặt bằng', amount: 35, deductible: true, note: 'Hợp đồng thuê 12 tháng' },
    { category: 'Lương nhân viên', amount: 180, deductible: true, note: 'Bảng lương + BHXH' },
    { category: 'Marketing & QC', amount: 45, deductible: true, note: 'Hóa đơn Meta Ads' },
    { category: 'Thiết bị y tế', amount: 120, deductible: true, note: 'Khấu hao 5 năm — 24M/năm' },
    { category: 'Chi phí tiếp khách', amount: 8, deductible: false, note: '⚠️ Vượt mức cho phép' },
]

const alerts = [
    { title: 'Thuế GTGT T3/2026', deadline: '20/04/2026', amount: '51M', status: 'upcoming', type: 'VAT' },
    { title: 'Thuế TNCN Q1/2026', deadline: '30/04/2026', amount: '41.5M', status: 'upcoming', type: 'PIT' },
    { title: 'BHXH T3/2026', deadline: '31/03/2026', amount: '18.2M', status: 'due_soon', type: 'Social' },
]

const totalDeductible = deductions.filter(d => d.deductible).reduce((s, d) => s + d.amount, 0)

export default function AITax() {
    const [tab, setTab] = useState('overview')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiFileText size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>AI Thuế Thông tư</h2>
                        <p>Tính thuế tự động • Chi phí khấu trừ • Deadline tracker</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'DT Q1', v: `${taxData.reduce((s, t) => s + t.revenue, 0)}M` }, { l: 'Thuế Q1', v: `${taxData.reduce((s, t) => s + t.total, 0).toFixed(0)}M` }, { l: 'Khấu trừ', v: `${totalDeductible}M` }, { l: 'Deadline', v: alerts.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'overview', label: '📊 Tổng quan' }, { id: 'deductions', label: '📝 Khấu trừ' }, { id: 'alerts', label: '⏰ Deadline' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#0f766e' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Tháng', 'Doanh thu', 'VAT 10%', 'TNCN', 'BHXH', 'Tổng thuế', 'TT'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {taxData.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{t.month}</td>
                                    <td style={{ fontWeight: 700, color: '#059669' }}>{t.revenue}M</td>
                                    <td style={{ color: '#64748b' }}>{t.vat}M</td>
                                    <td style={{ color: '#64748b' }}>{t.pit}M</td>
                                    <td style={{ color: '#64748b' }}>{t.social}M</td>
                                    <td style={{ fontWeight: 700, color: '#dc2626' }}>{t.total}M</td>
                                    <td>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: t.status === 'paid' ? '#ecfdf5' : '#fffbeb', color: t.status === 'paid' ? '#059669' : '#d97706' }}>
                                            {t.status === 'paid' ? '✅ Đã nộp' : '⏳ Chờ'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ borderTop: '2px solid #e5e7eb', fontWeight: 800 }}>
                                <td style={{ color: '#0f172a' }}>Tổng Q1</td>
                                <td style={{ color: '#059669' }}>{taxData.reduce((s, t) => s + t.revenue, 0)}M</td>
                                <td>{taxData.reduce((s, t) => s + t.vat, 0)}M</td>
                                <td>{taxData.reduce((s, t) => s + t.pit, 0).toFixed(1)}M</td>
                                <td>{(taxData.reduce((s, t) => s + t.social, 0)).toFixed(1)}M</td>
                                <td style={{ color: '#dc2626' }}>{taxData.reduce((s, t) => s + t.total, 0).toFixed(0)}M</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'deductions' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="premium-card" style={{ padding: 16, background: '#ecfdf5', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>TỔNG CHI PHÍ KHẤU TRỪ</div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: '#059669' }}>{totalDeductible}M</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>Tiết kiệm ~ {(totalDeductible * 0.1).toFixed(0)}M thuế VAT</div>
                    </div>
                    {deductions.map((d, i) => (
                        <div key={i} className="premium-card" style={{ padding: 14, borderLeft: `3px solid ${d.deductible ? '#059669' : '#dc2626'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{d.category}</span>
                                <span style={{ fontSize: 14, fontWeight: 800, color: d.deductible ? '#059669' : '#dc2626' }}>{d.amount}M</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
                                {d.deductible ? <FiCheck size={12} color="#059669" /> : <FiAlertCircle size={12} color="#dc2626" />}
                                {d.note}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {alerts.map((a, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: `3px solid ${a.status === 'due_soon' ? '#dc2626' : '#f59e0b'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{a.title}</span>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: a.status === 'due_soon' ? '#fef2f2' : '#fffbeb', color: a.status === 'due_soon' ? '#dc2626' : '#d97706' }}>
                                    {a.status === 'due_soon' ? '🔴 Sắp đến hạn' : '🟡 Sắp tới'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748b', marginBottom: 8, flexWrap: 'wrap' }}>
                                <span>📅 Hạn: {a.deadline}</span>
                                <span>💰 Số tiền: {a.amount}</span>
                                <span>📋 Loại: {a.type}</span>
                            </div>
                            <button className="premium-action-btn" style={{ background: '#0f766e', color: 'white' }}><FiDownload size={12} /> Tải tờ khai</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
