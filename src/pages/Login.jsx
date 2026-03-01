import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi'

const FEATURES = [
    'Quản lý lịch hẹn thông minh',
    'Hồ sơ khách hàng 360°',
    'AI phân tích doanh thu tự động',
    'Quản lý kho vật tư realtime',
    'Báo cáo & Thống kê chuyên sâu',
]

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentFeature, setCurrentFeature] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setCurrentFeature(p => (p + 1) % FEATURES.length), 3000)
        return () => clearInterval(t)
    }, [])

    // Redirect if already logged in
    useEffect(() => {
        try {
            const auth = JSON.parse(localStorage.getItem('beautyos_auth'))
            if (auth && auth.loggedIn) navigate('/')
        } catch { /* ignore */ }
    }, [navigate])

    const handleLogin = (e) => {
        e.preventDefault()
        if (!form.username || !form.password) {
            setError('Vui lòng nhập đầy đủ thông tin')
            return
        }
        setLoading(true)
        setError('')
        setTimeout(() => {
            if (form.username === 'Admin' && form.password === '123') {
                localStorage.setItem('beautyos_auth', JSON.stringify({ user: 'Admin', role: 'admin', loggedIn: true }))
                navigate('/')
            } else {
                setError('Sai tên đăng nhập hoặc mật khẩu')
            }
            setLoading(false)
        }, 800)
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
            {/* Left Panel - Brand */}
            <div style={{
                flex: '1 1 55%', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                background: 'linear-gradient(160deg, #0a1628 0%, #0d2137 25%, #0f2b46 50%, #1a4a3a 75%, #0d3320 100%)',
                position: 'relative', overflow: 'hidden', padding: '40px',
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute', top: '10%', right: '15%', width: 300, height: 300,
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,201,151,0.12), transparent 70%)',
                    filter: 'blur(40px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', left: '10%', width: 250, height: 250,
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
                    filter: 'blur(40px)',
                }} />
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', width: 400, height: 400,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)',
                }} />
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', width: 550, height: 550,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
                    {/* Logo */}
                    <div style={{
                        width: 72, height: 72, borderRadius: 20, margin: '0 auto 28px',
                        background: 'linear-gradient(135deg, #20c997, #198754)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 12px 40px rgba(32,201,151,0.3)',
                    }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: 28, letterSpacing: -1 }}>B</span>
                    </div>

                    <h1 style={{
                        fontSize: 32, fontWeight: 900, color: '#ffffff',
                        margin: '0 0 8px', letterSpacing: -1,
                    }}>
                        BEAUTYOS
                    </h1>
                    <p style={{
                        fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: 4,
                        textTransform: 'uppercase', margin: '0 0 40px', fontWeight: 500,
                    }}>
                        Phần mềm quản lý Spa & Clinic
                    </p>

                    {/* Feature carousel */}
                    <div style={{
                        background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
                        borderRadius: 16, padding: '24px 32px', border: '1px solid rgba(255,255,255,0.08)',
                        marginBottom: 40,
                    }}>
                        <div style={{
                            fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 500,
                            lineHeight: 1.6, minHeight: 24,
                            transition: 'all 0.5s ease',
                        }}>
                            ✨ {FEATURES[currentFeature]}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
                            {FEATURES.map((_, i) => (
                                <div key={i} style={{
                                    width: i === currentFeature ? 24 : 6, height: 6,
                                    borderRadius: 3,
                                    background: i === currentFeature ? '#20c997' : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.4s ease',
                                }} />
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
                        {[
                            { value: '500+', label: 'Phòng khám' },
                            { value: '50k+', label: 'Khách hàng' },
                            { value: '99.9%', label: 'Uptime' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#20c997' }}>{s.value}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div style={{
                flex: '1 1 45%', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                background: '#fafbfc', padding: '40px',
                position: 'relative',
            }}>
                {/* Top right corner */}
                <div style={{
                    position: 'absolute', top: 32, right: 40,
                    fontSize: 13, color: '#94a3b8',
                }}>
                    Chưa có tài khoản? <a href="https://hub.emarketervietnam.vn" target="_blank" rel="noreferrer"
                        style={{ color: '#198754', fontWeight: 600, textDecoration: 'none' }}>Đăng ký</a>
                </div>

                <div style={{ width: '100%', maxWidth: 400 }}>
                    <h2 style={{
                        fontSize: 26, fontWeight: 800, color: '#0f172a',
                        margin: '0 0 6px', letterSpacing: -0.5,
                    }}>
                        Đăng nhập
                    </h2>
                    <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 32px' }}>
                        Chào mừng bạn quay lại hệ thống BeautyOS
                    </p>

                    <form onSubmit={handleLogin}>
                        {error && (
                            <div style={{
                                background: '#fef2f2', color: '#dc2626', padding: '12px 16px',
                                borderRadius: 12, fontSize: 13, marginBottom: 20,
                                border: '1px solid #fecaca', fontWeight: 500,
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                                <span style={{ fontSize: 16 }}>⚠️</span> {error}
                            </div>
                        )}

                        <div style={{ marginBottom: 20 }}>
                            <label style={{
                                fontSize: 13, fontWeight: 600, display: 'block',
                                marginBottom: 8, color: '#334155',
                            }}>
                                Tên đăng nhập
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                    color: '#94a3b8',
                                }}>
                                    <FiUser size={16} />
                                </div>
                                <input
                                    type="text" placeholder="Nhập tên đăng nhập"
                                    value={form.username}
                                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                    style={{
                                        width: '100%', padding: '13px 16px 13px 42px',
                                        border: '2px solid #e2e8f0', borderRadius: 12,
                                        fontSize: 14, fontFamily: 'inherit', outline: 'none',
                                        transition: 'all 0.2s', background: 'white',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#20c997'; e.target.style.boxShadow = '0 0 0 3px rgba(32,201,151,0.1)' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 28 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>
                                    Mật khẩu
                                </label>
                                <a href="#" style={{ fontSize: 12, color: '#198754', textDecoration: 'none', fontWeight: 500 }}>
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                    color: '#94a3b8',
                                }}>
                                    <FiLock size={16} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    style={{
                                        width: '100%', padding: '13px 44px 13px 42px',
                                        border: '2px solid #e2e8f0', borderRadius: 12,
                                        fontSize: 14, fontFamily: 'inherit', outline: 'none',
                                        transition: 'all 0.2s', background: 'white',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#20c997'; e.target.style.boxShadow = '0 0 0 3px rgba(32,201,151,0.1)' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        color: '#94a3b8', padding: 4,
                                    }}>
                                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            style={{
                                width: '100%', padding: 15, borderRadius: 12, border: 'none',
                                background: loading ? '#95a5a6' : 'linear-gradient(135deg, #198754, #20c997)',
                                color: 'white', fontSize: 15, fontWeight: 700,
                                cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                                boxShadow: '0 4px 20px rgba(25, 135, 84, 0.25)',
                                transition: 'all 0.3s',
                                transform: loading ? 'scale(0.98)' : 'scale(1)',
                                letterSpacing: 0.3,
                            }}
                            onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-1px)', e.currentTarget.style.boxShadow = '0 6px 25px rgba(25, 135, 84, 0.35)')}
                            onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 4px 20px rgba(25, 135, 84, 0.25)')}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                                    Đang đăng nhập...
                                </span>
                            ) : 'Đăng nhập'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0',
                    }}>
                        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                        <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>hoặc</span>
                        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                    </div>

                    {/* Quick login */}
                    <button onClick={() => {
                        setForm({ username: 'Admin', password: '123' })
                        setTimeout(() => document.querySelector('form').requestSubmit(), 100)
                    }}
                        style={{
                            width: '100%', padding: 13, borderRadius: 12,
                            border: '2px solid #e2e8f0', background: 'white',
                            fontSize: 14, fontWeight: 600, color: '#475569',
                            cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'all 0.2s', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#20c997'; e.currentTarget.style.background = '#f0fdf4' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white' }}>
                        🚀 Đăng nhập nhanh (Demo)
                    </button>

                    {/* Footer */}
                    <div style={{ textAlign: 'center', marginTop: 32 }}>
                        <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>
                            Được phát triển bởi{' '}
                            <a href="https://emarketervietnam.vn" target="_blank" rel="noreferrer"
                                style={{ color: '#198754', fontWeight: 600, textDecoration: 'none' }}>
                                eMarketer Vietnam
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile responsive override */}
            <style>{`
                @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
                @media (max-width: 768px) {
                    div[style*="flex: 1 1 55%"] { display: none !important; }
                    div[style*="flex: 1 1 45%"] {
                        flex: 1 1 100% !important;
                        background: linear-gradient(180deg, #f8fffe 0%, #fafbfc 100%) !important;
                    }
                }
            `}</style>
        </div>
    )
}
