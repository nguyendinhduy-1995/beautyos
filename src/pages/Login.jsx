import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        if (!form.username || !form.password) {
            setError('Vui lòng nhập đầy đủ thông tin')
            return
        }
        setLoading(true)
        setError('')
        // Simulate login
        setTimeout(() => {
            if (form.username === 'admin' && form.password === '123456') {
                localStorage.setItem('beautyos_auth', JSON.stringify({ user: 'TM Demo', role: 'admin' }))
                navigate('/')
            } else {
                // Accept any login for demo
                localStorage.setItem('beautyos_auth', JSON.stringify({ user: form.username, role: 'user' }))
                navigate('/')
            }
            setLoading(false)
        }, 800)
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #0d3320 0%, #146c43 30%, #198754 60%, #20c997 100%)',
            position: 'relative', overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute', borderRadius: '50%', opacity: 0.06,
                        background: 'white',
                        width: `${100 + i * 80}px`, height: `${100 + i * 80}px`,
                        top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                        animation: `float ${6 + i * 2}s ease-in-out infinite alternate`,
                    }} />
                ))}
            </div>

            <div style={{
                width: '420px', background: 'rgba(255,255,255,0.95)', borderRadius: '24px',
                padding: '48px 40px', boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(20px)', position: 'relative', zIndex: 1,
                animation: 'slideUp 0.5s ease'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 16px',
                        background: 'linear-gradient(135deg, #198754, #20c997)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 800, fontSize: '1.5rem',
                        boxShadow: '0 8px 25px rgba(25, 135, 84, 0.35)'
                    }}>
                        B
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.5px' }}>
                        BEAUTYOS V2
                    </h1>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                        Management System
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    {error && (
                        <div style={{
                            background: '#ffebee', color: '#c62828', padding: '10px 16px',
                            borderRadius: '10px', fontSize: '0.85rem', marginBottom: '16px',
                            border: '1px solid #ef9a9a'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: '600', display: 'block', marginBottom: '6px', color: '#333' }}>
                            Tên đăng nhập
                        </label>
                        <input
                            type="text" placeholder="Nhập tên đăng nhập"
                            value={form.username}
                            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                            style={{
                                width: '100%', padding: '12px 16px', border: '2px solid var(--gray-200)',
                                borderRadius: '12px', fontSize: '0.9rem', fontFamily: 'inherit',
                                transition: 'border-color 0.3s', outline: 'none'
                            }}
                            onFocus={e => e.target.style.borderColor = '#198754'}
                            onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: '600', display: 'block', marginBottom: '6px', color: '#333' }}>
                            Mật khẩu
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu"
                                value={form.password}
                                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                style={{
                                    width: '100%', padding: '12px 16px', paddingRight: '44px',
                                    border: '2px solid var(--gray-200)', borderRadius: '12px',
                                    fontSize: '0.9rem', fontFamily: 'inherit',
                                    transition: 'border-color 0.3s', outline: 'none'
                                }}
                                onFocus={e => e.target.style.borderColor = '#198754'}
                                onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer', color: '#999'
                                }}>
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        style={{
                            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                            background: loading ? '#95a5a6' : 'linear-gradient(135deg, #198754, #20c997)',
                            color: 'white', fontSize: '0.95rem', fontWeight: '700', cursor: loading ? 'wait' : 'pointer',
                            fontFamily: 'inherit', boxShadow: '0 4px 15px rgba(25, 135, 84, 0.3)',
                            transition: 'all 0.3s', transform: loading ? 'scale(0.98)' : 'scale(1)'
                        }}
                        onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
                        onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.78rem', color: '#999' }}>
                    Demo: nhập bất kỳ tên & mật khẩu
                </div>
            </div>

            <style>{`
                @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
                @keyframes float { from { transform: translateY(0) } to { transform: translateY(-30px) } }
            `}</style>
        </div>
    )
}
