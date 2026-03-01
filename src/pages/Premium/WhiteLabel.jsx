import { useState } from 'react'
import { FiSmartphone, FiLayers, FiCheck, FiGlobe, FiImage, FiType, FiDroplet } from 'react-icons/fi'

const appConfig = {
    name: 'BeautyOS', logo: '🌸', primaryColor: '#ec4899', secondaryColor: '#f9a8d4',
    status: 'active', domain: 'app.myspa.vn', lastPublished: '28/02/2026',
}

const themes = [
    { id: 1, name: 'Rose Gold', primary: '#ec4899', secondary: '#f9a8d4', emoji: '🌹', active: true },
    { id: 2, name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#7dd3fc', emoji: '🌊', active: false },
    { id: 3, name: 'Emerald', primary: '#10b981', secondary: '#6ee7b7', emoji: '🍀', active: false },
    { id: 4, name: 'Lavender', primary: '#8b5cf6', secondary: '#c4b5fd', emoji: '💜', active: false },
    { id: 5, name: 'Sunset', primary: '#f97316', secondary: '#fdba74', emoji: '🌅', active: false },
    { id: 6, name: 'Dark Premium', primary: '#1e293b', secondary: '#475569', emoji: '🖤', active: false },
]

const pages = [
    { name: 'Trang chủ', slug: '/', status: 'published', views: 1240 },
    { name: 'Dịch vụ', slug: '/services', status: 'published', views: 890 },
    { name: 'Đặt lịch', slug: '/booking', status: 'published', views: 2100 },
    { name: 'Về chúng tôi', slug: '/about', status: 'draft', views: 0 },
    { name: 'Blog', slug: '/blog', status: 'published', views: 560 },
    { name: 'Liên hệ', slug: '/contact', status: 'published', views: 430 },
]

export default function WhiteLabel() {
    const [tab, setTab] = useState('brand')
    const [selectedTheme, setSelectedTheme] = useState(1)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #ec4899, #f9a8d4)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiSmartphone size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>White Label App</h2>
                        <p>Thương hiệu riêng • Tuỳ chỉnh giao diện • Domain riêng</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Domain', v: appConfig.domain }, { l: 'Trạng thái', v: '🟢 Active' }, { l: 'Xuất bản', v: appConfig.lastPublished }, { l: 'Trang', v: pages.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'brand', label: '🎨 Thương hiệu' }, { id: 'themes', label: '🖌️ Theme' }, { id: 'pages', label: '📄 Trang' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#ec4899' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'brand' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>🌸 Thương hiệu</h3>
                        {[{ l: 'Tên ứng dụng', v: appConfig.name, icon: <FiType size={14} color="#ec4899" /> },
                        { l: 'Logo', v: appConfig.logo + ' (upload logo)', icon: <FiImage size={14} color="#ec4899" /> },
                        { l: 'Màu chính', v: appConfig.primaryColor, icon: <FiDroplet size={14} color={appConfig.primaryColor} /> },
                        { l: 'Màu phụ', v: appConfig.secondaryColor, icon: <FiDroplet size={14} color={appConfig.secondaryColor} /> },
                        { l: 'Domain', v: appConfig.domain, icon: <FiGlobe size={14} color="#ec4899" /> }].map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>{f.icon} {f.l}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {f.l.includes('Màu') && <div style={{ width: 16, height: 16, borderRadius: 4, background: f.v }} />}
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{f.v}</span>
                                </div>
                            </div>
                        ))}
                        <button className="premium-action-btn" style={{ background: '#ec4899', color: 'white', marginTop: 12 }}>Chỉnh sửa thương hiệu</button>
                    </div>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>📱 Preview</h3>
                        <div style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                            <div style={{ fontSize: 40, marginBottom: 8 }}>{appConfig.logo}</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: appConfig.primaryColor }}>{appConfig.name}</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{appConfig.domain}</div>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                                <div style={{ width: 60, height: 30, borderRadius: 8, background: appConfig.primaryColor }} />
                                <div style={{ width: 60, height: 30, borderRadius: 8, background: appConfig.secondaryColor }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'themes' && (
                <div className="premium-cards-grid">
                    {themes.map(t => (
                        <div key={t.id} onClick={() => setSelectedTheme(t.id)} className="premium-card" style={{ padding: 16, cursor: 'pointer', border: selectedTheme === t.id ? `2px solid ${t.primary}` : '1px solid #e5e7eb', textAlign: 'center' }}>
                            <div style={{ fontSize: 28, marginBottom: 8 }}>{t.emoji}</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{t.name}</div>
                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 8 }}>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: t.primary }} />
                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: t.secondary }} />
                            </div>
                            {selectedTheme === t.id && (
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: '#ecfdf5', color: '#059669' }}>✅ Đang dùng</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {tab === 'pages' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Trang', 'URL', 'Trạng thái', 'Lượt xem'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {pages.map((p, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                                    <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>{p.slug}</code></td>
                                    <td>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: p.status === 'published' ? '#ecfdf5' : '#fffbeb', color: p.status === 'published' ? '#059669' : '#d97706' }}>
                                            {p.status === 'published' ? '🟢 Published' : '📝 Draft'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.views.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
