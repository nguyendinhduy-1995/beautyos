import { useState } from 'react'
import { FiActivity, FiCode, FiCheck, FiX, FiPlus, FiTrendingUp, FiBarChart2, FiEye, FiMousePointer, FiTarget } from 'react-icons/fi'

const pixels = [
    { id: 1, name: 'Facebook Pixel', code: 'FB-948372615', platform: 'Facebook', status: 'active', events: 12450, conversions: 234, lastFire: '2 phút trước', color: '#1877f2' },
    { id: 2, name: 'Google Analytics 4', code: 'G-A7B3C4D5E6', platform: 'Google', status: 'active', events: 28900, conversions: 412, lastFire: '1 phút trước', color: '#4285f4' },
    { id: 3, name: 'Google Tag Manager', code: 'GTM-XYZ789', platform: 'Google', status: 'active', events: 18700, conversions: 0, lastFire: '3 phút trước', color: '#246fdb' },
    { id: 4, name: 'TikTok Pixel', code: 'TT-J8K9L0M1', platform: 'TikTok', status: 'inactive', events: 3200, conversions: 45, lastFire: '2 ngày trước', color: '#000000' },
    { id: 5, name: 'Zalo Tracking', code: 'ZL-N2O3P4Q5', platform: 'Zalo', status: 'active', events: 5600, conversions: 89, lastFire: '5 phút trước', color: '#0068ff' },
]

const eventTypes = [
    { name: 'PageView', count: 18500, trend: '+12%' },
    { name: 'ViewContent', count: 8200, trend: '+8%' },
    { name: 'AddToCart', count: 2100, trend: '+15%' },
    { name: 'InitiateCheckout', count: 980, trend: '+5%' },
    { name: 'Purchase', count: 412, trend: '+22%' },
    { name: 'Lead', count: 234, trend: '+18%' },
    { name: 'CompleteRegistration', count: 156, trend: '+10%' },
    { name: 'Schedule', count: 89, trend: '+25%' },
]

const maxEvents = Math.max(...eventTypes.map(e => e.count))

export default function PixelTracking() {
    const [tab, setTab] = useState('pixels')
    const [showAdd, setShowAdd] = useState(false)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #4f46e5, #818cf8)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiActivity size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Pixel & Tracking</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Facebook Pixel, Google Analytics, TikTok, Zalo — Theo dõi chuyển đổi</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {[{ id: 'pixels', label: '🔌 Pixel' }, { id: 'events', label: '📊 Events' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                        fontSize: 13, fontWeight: 600, background: tab === t.id ? '#4f46e5' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
                <button onClick={() => setShowAdd(true)} style={{ marginLeft: 'auto', padding: '10px 18px', borderRadius: 10, border: 'none', background: '#4f46e5', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiPlus size={14} /> Thêm Pixel
                </button>
            </div>

            {tab === 'pixels' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {pixels.map(p => (
                        <div key={p.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, opacity: p.status === 'active' ? 1 : 0.5 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 10, background: p.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiCode size={18} color={p.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{p.name}</span>
                                    <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#f1f5f9', color: '#64748b' }}>{p.platform}</span>
                                </div>
                                <code style={{ fontSize: 11, color: '#94a3b8' }}>{p.code}</code>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0 12px' }}><div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{p.events.toLocaleString()}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Events</div></div>
                            <div style={{ textAlign: 'center', padding: '0 12px' }}><div style={{ fontSize: 16, fontWeight: 800, color: '#059669' }}>{p.conversions}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Conversions</div></div>
                            <div style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{p.lastFire}</div>
                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: p.status === 'active' ? '#ecfdf5' : '#fef2f2', color: p.status === 'active' ? '#059669' : '#dc2626' }}>
                                {p.status === 'active' ? '● Active' : '○ Inactive'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'events' && (
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20 }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>📊 Event Funnel (30 ngày)</h3>
                    {eventTypes.map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                            <span style={{ width: 140, fontSize: 13, fontWeight: 600, color: '#0f172a', fontFamily: 'monospace' }}>{e.name}</span>
                            <div style={{ flex: 1, height: 28, borderRadius: 6, background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                                <div style={{ width: `${(e.count / maxEvents) * 100}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, #4f46e5, #818cf8)`, transition: 'width 0.5s' }} />
                                <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 700, color: (e.count / maxEvents) > 0.3 ? 'white' : '#0f172a' }}>{e.count.toLocaleString()}</span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#059669', width: 50, textAlign: 'right' }}>{e.trend}</span>
                        </div>
                    ))}
                </div>
            )}

            {showAdd && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAdd(false)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 420 }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>🔌 Thêm Pixel mới</h3>
                        {[{ l: 'Nền tảng', type: 'select', opts: ['Facebook', 'Google Analytics', 'TikTok', 'Zalo', 'Khác'] }, { l: 'Tên Pixel', p: 'VD: Facebook Pixel' }, { l: 'Mã Pixel', p: 'VD: FB-xxxxx hoặc G-xxxxx' }].map((f, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{f.l}</label>
                                {f.type === 'select' ? (
                                    <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }}>
                                        {f.opts.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                ) : <input placeholder={f.p} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />}
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                            <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Hủy</button>
                            <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#4f46e5', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Thêm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
