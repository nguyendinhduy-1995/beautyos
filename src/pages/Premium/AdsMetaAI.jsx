import { useState } from 'react'
import { FiZap, FiDollarSign, FiTrendingUp, FiTarget, FiEye, FiMousePointer, FiUsers, FiPlus, FiPlay, FiPause, FiBarChart2 } from 'react-icons/fi'

const campaigns = [
    { id: 1, name: 'Nâng cơ Hifu - Tháng 3', budget: 5000000, spent: 3200000, reach: 45000, clicks: 1890, leads: 67, cost_per_lead: 47761, status: 'active', roas: 4.2 },
    { id: 2, name: 'Retargeting - Khách cũ', budget: 3000000, spent: 2100000, reach: 12000, clicks: 980, leads: 45, cost_per_lead: 46667, status: 'active', roas: 5.8 },
    { id: 3, name: 'Combo trẻ hóa - Lookalike', budget: 8000000, spent: 5600000, reach: 78000, clicks: 3420, leads: 112, cost_per_lead: 50000, status: 'active', roas: 3.5 },
    { id: 4, name: 'Trị mụn - Gen Z', budget: 2000000, spent: 1800000, reach: 65000, clicks: 4200, leads: 89, cost_per_lead: 20225, status: 'paused', roas: 2.1 },
    { id: 5, name: 'Filler môi - Valentine', budget: 4000000, spent: 4000000, reach: 32000, clicks: 1560, leads: 34, cost_per_lead: 117647, status: 'completed', roas: 1.8 },
]

const aiSuggestions = [
    { title: 'Tăng ngân sách "Retargeting - Khách cũ"', reason: 'ROAS cao nhất (5.8x), chi phí/lead thấp. Tăng 50% ngân sách có thể tăng 20-30 leads.', impact: 'high', action: 'Tăng ngân sách' },
    { title: 'Tắt "Filler môi - Valentine"', reason: 'Chi phí/lead quá cao (117K), ROAS chỉ 1.8x. Chiến dịch hết mùa.', impact: 'medium', action: 'Tắt chiến dịch' },
    { title: 'Tạo Lookalike từ khách đã mua', reason: 'AI phát hiện 78% khách mua Combo trẻ hóa thuộc nữ 28-40 tuổi, quan tâm skincare.', impact: 'high', action: 'Tạo audience' },
    { title: 'Test creative mới cho "Trị mụn"', reason: 'CTR cao (6.5%) nhưng conversion rate thấp (2.1%). Landing page cần cải thiện.', impact: 'medium', action: 'A/B Test' },
]

const totalBudget = campaigns.reduce((a, c) => a + c.budget, 0)
const totalSpent = campaigns.reduce((a, c) => a + c.spent, 0)
const totalLeads = campaigns.reduce((a, c) => a + c.leads, 0)
const avgROAS = (campaigns.reduce((a, c) => a + c.roas, 0) / campaigns.length).toFixed(1)

export default function AdsMetaAI() {
    const [tab, setTab] = useState('campaigns')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #1877f2, #42a5f5)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiZap size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>Quảng cáo Meta AI</h2>
                        <p>AI tối ưu chiến dịch Facebook/Instagram Ads • ROAS tracking</p>
                    </div>
                    <button style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiPlus size={14} /> Tạo chiến dịch
                    </button>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Ngân sách', v: (totalBudget / 1000000).toFixed(0) + 'M', i: FiDollarSign },
                    { l: 'Đã chi', v: (totalSpent / 1000000).toFixed(0) + 'M', i: FiDollarSign },
                    { l: 'Leads', v: totalLeads, i: FiTarget },
                    { l: 'ROAS TB', v: avgROAS + 'x', i: FiTrendingUp }].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <s.i size={14} color="rgba(255,255,255,0.7)" />
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.v}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{s.l}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'campaigns', label: '📋 Chiến dịch' }, { id: 'ai', label: '🤖 AI Gợi ý' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#1877f2' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'campaigns' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Chiến dịch', 'Ngân sách', 'Đã chi', 'Reach', 'Clicks', 'Leads', 'CPL', 'ROAS', 'TT'].map(h => (
                                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {campaigns.map((c, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a', maxWidth: 180 }}>{c.name}</td>
                                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{(c.budget / 1000000).toFixed(0)}M</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 40, height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden' }}>
                                                <div style={{ width: `${(c.spent / c.budget) * 100}%`, height: '100%', borderRadius: 2, background: c.spent >= c.budget ? '#dc2626' : '#1877f2' }} />
                                            </div>
                                            <span style={{ fontWeight: 600, color: '#0f172a' }}>{(c.spent / 1000000).toFixed(1)}M</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{(c.reach / 1000).toFixed(0)}K</td>
                                    <td style={{ padding: '10px 12px', color: '#0f172a', fontWeight: 500 }}>{c.clicks.toLocaleString()}</td>
                                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#059669' }}>{c.leads}</td>
                                    <td style={{ padding: '10px 12px', fontWeight: 600, color: c.cost_per_lead > 100000 ? '#dc2626' : '#0f172a' }}>{(c.cost_per_lead / 1000).toFixed(0)}K</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <span style={{ fontWeight: 800, color: c.roas >= 3 ? '#059669' : c.roas >= 2 ? '#d97706' : '#dc2626' }}>{c.roas}x</span>
                                    </td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <span style={{
                                            padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                            background: c.status === 'active' ? '#ecfdf5' : c.status === 'paused' ? '#fffbeb' : '#f1f5f9',
                                            color: c.status === 'active' ? '#059669' : c.status === 'paused' ? '#d97706' : '#94a3b8'
                                        }}>
                                            {c.status === 'active' ? '▶ Đang chạy' : c.status === 'paused' ? '⏸ Tạm dừng' : '✓ Kết thúc'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'ai' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ background: '#eff6ff', borderRadius: 12, padding: '12px 16px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FiZap size={16} color="#1877f2" />
                        <span style={{ fontSize: 13, color: '#1e40af', fontWeight: 600 }}>AI đã phân tích 5 chiến dịch và đưa ra {aiSuggestions.length} gợi ý tối ưu</span>
                    </div>
                    {aiSuggestions.map((s, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: 14, border: `1px solid ${s.impact === 'high' ? '#bbf7d0' : '#fde68a'}`, padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: s.impact === 'high' ? '#ecfdf5' : '#fffbeb', color: s.impact === 'high' ? '#059669' : '#d97706' }}>
                                    {s.impact === 'high' ? '🔥 Ưu tiên cao' : '⚡ Trung bình'}
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.title}</h4>
                            <p style={{ margin: '0 0 12px', fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{s.reason}</p>
                            <button className="premium-action-btn" style={{ background: '#1877f2', color: 'white' }}>{s.action}</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
