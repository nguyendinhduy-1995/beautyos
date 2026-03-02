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
    { title: 'Tăng ngân sách "Retargeting - Khách cũ"', reason: 'ROAS cao nhất (5.8x), chi phí/lead thấp. Tăng 50% ngân sách có thể tăng 20-30 leads.', impact: 'high', action: 'Tăng ngân sách', savings: '+25 leads' },
    { title: 'Tắt "Filler môi - Valentine"', reason: 'Chi phí/lead quá cao (117K), ROAS chỉ 1.8x. Chiến dịch hết mùa.', impact: 'medium', action: 'Tắt chiến dịch', savings: '-4M chi phí' },
    { title: 'Tạo Lookalike từ khách đã mua', reason: 'AI phát hiện 78% khách mua Combo trẻ hóa thuộc nữ 28-40 tuổi, quan tâm skincare.', impact: 'high', action: 'Tạo audience', savings: '+40 leads' },
    { title: 'Test creative mới cho "Trị mụn"', reason: 'CTR cao (6.5%) nhưng conversion rate thấp (2.1%). Landing page cần cải thiện.', impact: 'medium', action: 'A/B Test', savings: '+15% CR' },
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
                    <div className="premium-header-icon"><FiZap size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Quảng cáo Meta AI</h2>
                        <p>AI tối ưu chiến dịch Facebook/Instagram Ads • ROAS tracking</p>
                    </div>
                    <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 12, fontWeight: 600 }}>
                        <FiPlus size={14} /> Tạo mới
                    </button>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Ngân sách', v: `${(totalBudget / 1000000).toFixed(0)}M` },
                    { l: 'Đã chi', v: `${(totalSpent / 1000000).toFixed(0)}M` },
                    { l: 'Leads', v: totalLeads },
                    { l: 'ROAS TB', v: `${avgROAS}x` }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'campaigns', label: '📋 Chiến dịch' }, { id: 'ai', label: '🤖 AI Gợi ý' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#1877f2' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'campaigns' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {campaigns.map(c => (
                        <div key={c.id} className="premium-card" style={{ padding: 16, opacity: c.status === 'completed' ? 0.6 : 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: c.status === 'active' ? '#ecfdf5' : c.status === 'paused' ? '#fffbeb' : '#f1f5f9', color: c.status === 'active' ? '#059669' : c.status === 'paused' ? '#d97706' : '#94a3b8' }}>
                                    {c.status === 'active' ? '▶ Active' : c.status === 'paused' ? '⏸ Paused' : '✓ Done'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ fontSize: 11, color: '#94a3b8' }}>Budget: {(c.budget / 1000000).toFixed(0)}M</div>
                                <div style={{ fontSize: 11, color: '#94a3b8' }}>Spent: {(c.spent / 1000000).toFixed(1)}M ({Math.round(c.spent / c.budget * 100)}%)</div>
                            </div>
                            <div style={{ height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden', marginBottom: 10 }}>
                                <div style={{ width: `${(c.spent / c.budget) * 100}%`, height: '100%', borderRadius: 2, background: c.spent >= c.budget ? '#dc2626' : '#1877f2' }} />
                            </div>
                            <div className="premium-cards-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                                {[{ l: 'Reach', v: `${(c.reach / 1000).toFixed(0)}K` }, { l: 'Clicks', v: c.clicks.toLocaleString() }, { l: 'Leads', v: c.leads, c: '#059669' }, { l: 'ROAS', v: `${c.roas}x`, c: c.roas >= 3 ? '#059669' : '#d97706' }].map((m, j) => (
                                    <div key={j} style={{ textAlign: 'center', padding: 6, background: '#f8fafc', borderRadius: 6 }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: m.c || '#0f172a' }}>{m.v}</div>
                                        <div style={{ fontSize: 9, color: '#94a3b8' }}>{m.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'ai' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ background: '#eff6ff', borderRadius: 12, padding: '10px 14px', border: '1px solid #bfdbfe', fontSize: 12, color: '#1e40af', fontWeight: 600 }}>
                        <FiZap size={12} /> AI đã phân tích 5 chiến dịch và đưa ra {aiSuggestions.length} gợi ý tối ưu
                    </div>
                    {aiSuggestions.map((s, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: `3px solid ${s.impact === 'high' ? '#059669' : '#f59e0b'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: s.impact === 'high' ? '#ecfdf5' : '#fffbeb', color: s.impact === 'high' ? '#059669' : '#d97706' }}>
                                    {s.impact === 'high' ? '🔥 Ưu tiên cao' : '⚡ Trung bình'}
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#1877f2' }}>{s.savings}</span>
                            </div>
                            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.title}</h4>
                            <p style={{ margin: '0 0 10px', fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{s.reason}</p>
                            <button className="premium-action-btn" style={{ background: '#1877f2', color: 'white' }}>{s.action}</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
