import { useState } from 'react'
import { FiCrosshair, FiBarChart2, FiActivity, FiTarget, FiLink, FiTrendingUp } from 'react-icons/fi'

const pixels = [
    { id: 1, name: 'Facebook Pixel', pixelId: '123456789012345', status: 'active', events: 1250, lastFired: '5 phút trước', platform: 'Facebook' },
    { id: 2, name: 'TikTok Pixel', pixelId: 'TT-9876543210', status: 'active', events: 430, lastFired: '12 phút trước', platform: 'TikTok' },
    { id: 3, name: 'Google Analytics 4', pixelId: 'G-ABCDEFGHIJ', status: 'active', events: 2100, lastFired: '1 phút trước', platform: 'Google' },
    { id: 4, name: 'Zalo Pixel', pixelId: 'ZL-555666777', status: 'inactive', events: 0, lastFired: 'N/A', platform: 'Zalo' },
]

const utmCampaigns = [
    { name: 'Spring Sale 2026', source: 'facebook', medium: 'cpc', clicks: 2340, leads: 156, conversion: '6.7%', cost: '4,500,000đ', cpl: '28,846đ' },
    { name: 'TikTok Awareness', source: 'tiktok', medium: 'cpm', clicks: 5600, leads: 89, conversion: '1.6%', cost: '3,200,000đ', cpl: '35,955đ' },
    { name: 'Google Brand KW', source: 'google', medium: 'cpc', clicks: 890, leads: 78, conversion: '8.8%', cost: '2,100,000đ', cpl: '26,923đ' },
    { name: 'Zalo OA Post', source: 'zalo', medium: 'organic', clicks: 320, leads: 45, conversion: '14.1%', cost: '0đ', cpl: '0đ' },
    { name: 'KOL Collab', source: 'instagram', medium: 'influencer', clicks: 1200, leads: 67, conversion: '5.6%', cost: '5,000,000đ', cpl: '74,627đ' },
]

const events = [
    { name: 'PageView', count: 12500, trend: '+5%' },
    { name: 'ViewContent', count: 4200, trend: '+12%' },
    { name: 'Lead', count: 435, trend: '+8%' },
    { name: 'Schedule', count: 280, trend: '+15%' },
    { name: 'Purchase', count: 120, trend: '+3%' },
    { name: 'CompleteRegistration', count: 95, trend: '+22%' },
]

export default function PixelTracking() {
    const [tab, setTab] = useState('pixels')
    const totalEvents = events.reduce((s, e) => s + e.count, 0)
    const totalLeads = utmCampaigns.reduce((s, c) => s + c.leads, 0)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiCrosshair size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Pixel & UTM Tracking</h2>
                        <p>Quản lý pixel đa nền tảng • UTM campaign • Conversion tracking</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Pixels', v: pixels.filter(p => p.status === 'active').length }, { l: 'Events/7d', v: totalEvents.toLocaleString() }, { l: 'Campaigns', v: utmCampaigns.length }, { l: 'Leads', v: totalLeads }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'pixels', label: '🎯 Pixels' }, { id: 'utm', label: '🔗 UTM Campaigns' }, { id: 'events', label: '📊 Events' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#1d4ed8' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'pixels' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {pixels.map(p => (
                        <div key={p.id} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: p.platform === 'Facebook' ? '#eff6ff' : p.platform === 'TikTok' ? '#fdf2f8' : p.platform === 'Google' ? '#ecfdf5' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                                    {p.platform === 'Facebook' ? '📘' : p.platform === 'TikTok' ? '🎵' : p.platform === 'Google' ? '🔍' : '💬'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>ID: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 10 }}>{p.pixelId}</code></div>
                                </div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: p.status === 'active' ? '#ecfdf5' : '#f1f5f9', color: p.status === 'active' ? '#059669' : '#94a3b8' }}>
                                    {p.status === 'active' ? '🟢 Active' : '⏸️ Inactive'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748b', flexWrap: 'wrap' }}>
                                <span><FiActivity size={11} /> {p.events.toLocaleString()} events</span>
                                <span>Last: {p.lastFired}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'utm' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Campaign', 'Source', 'Clicks', 'Leads', 'Conv.', 'Chi phí', 'CPL'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {utmCampaigns.map((c, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#eff6ff', color: '#1d4ed8' }}>{c.source}/{c.medium}</span></td>
                                    <td style={{ color: '#64748b' }}>{c.clicks.toLocaleString()}</td>
                                    <td style={{ fontWeight: 600, color: '#059669' }}>{c.leads}</td>
                                    <td style={{ fontWeight: 600, color: parseFloat(c.conversion) >= 5 ? '#059669' : '#d97706' }}>{c.conversion}</td>
                                    <td style={{ color: '#64748b' }}>{c.cost}</td>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.cpl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'events' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="premium-alert" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af' }}>
                        <FiBarChart2 size={14} /> Event tracking 7 ngày gần nhất
                    </div>
                    {events.map((e, i) => (
                        <div key={i} className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiTarget size={14} color="#1d4ed8" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{e.name}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#1d4ed8' }}>{e.count.toLocaleString()}</div>
                            </div>
                            <span style={{ padding: '2px 6px', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#059669' }}>{e.trend}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
