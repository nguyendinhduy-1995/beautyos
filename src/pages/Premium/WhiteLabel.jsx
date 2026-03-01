import { useState } from 'react'
import { FiSmartphone, FiLayers, FiCheck, FiRefreshCw, FiGlobe, FiDownload } from 'react-icons/fi'

const appConfig = {
    name: 'BeautyOS', logo: '🌸', primaryColor: '#ec4899', secondaryColor: '#f9a8d4',
    features: [
        { name: 'Đặt lịch hẹn', enabled: true }, { name: 'Xem lịch sử', enabled: true },
        { name: 'Tích điểm Loyalty', enabled: true }, { name: 'Chat với spa', enabled: false },
        { name: 'Mua sản phẩm', enabled: false }, { name: 'Thông báo push', enabled: true },
    ],
}

const previewScreens = [
    { name: 'Trang chủ', desc: 'Dịch vụ nổi bật, ưu đãi, đặt lịch nhanh' },
    { name: 'Đặt lịch', desc: 'Chọn DV → Chọn ngày/giờ → Xác nhận' },
    { name: 'Tài khoản', desc: 'Lịch sử, điểm thưởng, thông tin cá nhân' },
]

export default function WhiteLabel() {
    const [appName, setAppName] = useState(appConfig.name)
    const [color, setColor] = useState(appConfig.primaryColor)
    const [features, setFeatures] = useState(appConfig.features)
    const [activeScreen, setActiveScreen] = useState(0)

    const toggleFeature = (i) => {
        setFeatures(prev => prev.map((f, idx) => idx === i ? { ...f, enabled: !f.enabled } : f))
    }

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #0f172a, #334155)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div className="premium-header-inner">
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiSmartphone size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>App White Label</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Tùy chỉnh giao diện ứng dụng • Logo, màu sắc, tính năng</p>
                    </div>
                    <button style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: color, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiDownload size={14} /> Publish App
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
                {/* Config */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>🎨 Thương hiệu</h3>
                        <div className="premium-two-col">
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Tên App</label>
                                <input value={appName} onChange={e => setAppName(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Màu chủ đạo</label>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid #e2e8f0', cursor: 'pointer' }} />
                                    <input value={color} onChange={e => setColor(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'monospace' }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 6 }}>Logo</label>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <div style={{ width: 56, height: 56, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{appConfig.logo}</div>
                                <button style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-family)', color: '#64748b' }}>Đổi logo</button>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card" style={{ padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>⚡ Tính năng</h3>
                        <div className="premium-two-col">
                            {features.map((f, i) => (
                                <div key={i} onClick={() => toggleFeature(i)} style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10,
                                    border: `1px solid ${f.enabled ? color + '40' : '#e2e8f0'}`, cursor: 'pointer',
                                    background: f.enabled ? color + '08' : 'white', transition: 'all 0.2s',
                                }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${f.enabled ? color : '#cbd5e1'}`, background: f.enabled ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {f.enabled && <FiCheck size={12} color="white" />}
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 500, color: f.enabled ? '#0f172a' : '#94a3b8' }}>{f.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Phone Preview */}
                <div style={{ background: '#0f172a', borderRadius: 20, padding: '12px 8px', position: 'sticky', top: 20 }}>
                    <div style={{ background: '#1e293b', borderRadius: 14, overflow: 'hidden' }}>
                        {/* Status bar */}
                        <div style={{ background: color, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{appName}</span>
                            <span style={{ fontSize: 18 }}>{appConfig.logo}</span>
                        </div>
                        {/* Screen tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
                            {previewScreens.map((s, i) => (
                                <button key={i} onClick={() => setActiveScreen(i)} style={{
                                    flex: 1, padding: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                                    fontSize: 10, fontWeight: 600, background: activeScreen === i ? '#334155' : 'transparent',
                                    color: activeScreen === i ? 'white' : '#64748b', borderBottom: activeScreen === i ? `2px solid ${color}` : '2px solid transparent',
                                }}>{s.name}</button>
                            ))}
                        </div>
                        {/* Content */}
                        <div style={{ padding: 16, minHeight: 300 }}>
                            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: 'white' }}>{previewScreens[activeScreen].name}</h4>
                            <p style={{ margin: '0 0 16px', fontSize: 11, color: '#94a3b8' }}>{previewScreens[activeScreen].desc}</p>
                            {[1, 2, 3].map(j => (
                                <div key={j} style={{ background: '#334155', borderRadius: 10, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FiLayers size={14} color={color} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ height: 8, borderRadius: 4, background: '#475569', width: `${70 - j * 10}%`, marginBottom: 4 }} />
                                        <div style={{ height: 6, borderRadius: 3, background: '#475569', width: `${50 - j * 5}%` }} />
                                    </div>
                                </div>
                            ))}
                            <button style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: color, color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', marginTop: 8 }}>
                                Đặt lịch ngay
                            </button>
                        </div>
                        {/* Bottom nav */}
                        <div style={{ display: 'flex', borderTop: '1px solid #334155', padding: '8px 0' }}>
                            {['🏠', '📅', '🎁', '👤'].map((e, i) => (
                                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 16, cursor: 'pointer', opacity: i === 0 ? 1 : 0.5 }}>{e}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
