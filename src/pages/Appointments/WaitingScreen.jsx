import { useState, useEffect } from 'react'
import { appointments } from '../../data/mockData'
import { FiClock, FiUser, FiCheckCircle, FiArrowRight } from 'react-icons/fi'

export default function WaitingScreen() {
    const [time, setTime] = useState(new Date())
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    // Auto-cycle through pages of waiting list every 10s
    useEffect(() => {
        const t = setInterval(() => setCurrentSlide(p => p + 1), 10000)
        return () => clearInterval(t)
    }, [])

    const pending = appointments.filter(a => a.status === 'pending')
    const arrived = appointments.filter(a => a.status === 'arrived')
    const completed = appointments.filter(a => a.status === 'completed')
    const cancelled = appointments.filter(a => a.status === 'cancelled')

    // Show 8 items per page for TV display
    const allQueue = [...arrived, ...pending]
    const pageSize = 8
    const totalPages = Math.ceil(allQueue.length / pageSize) || 1
    const page = currentSlide % totalPages
    const visibleQueue = allQueue.slice(page * pageSize, (page + 1) * pageSize)

    const statusLabel = (s) => {
        switch (s) {
            case 'arrived': return 'ĐÃ ĐẾN'
            case 'pending': return 'CHỜ'
            case 'completed': return 'XONG'
            case 'cancelled': return 'HỦY'
            default: return s
        }
    }

    return (
        <div style={{
            minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif",
            background: 'linear-gradient(160deg, #0a0e1a 0%, #0d1b2a 30%, #1b2838 60%, #0d1b2a 100%)',
            color: 'white', overflow: 'hidden', position: 'relative',
        }}>
            {/* Animated background */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,201,151,0.08), transparent 70%)', filter: 'blur(60px)' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)', filter: 'blur(60px)' }} />
            </div>

            {/* Header */}
            <div style={{ position: 'relative', zIndex: 1, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: 'linear-gradient(135deg, #20c997, #198754)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(32,201,151,0.3)',
                    }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: 22 }}>B</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: -0.5 }}>BEAUTYOS CLINIC</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>Bảng theo dõi lịch hẹn</div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.8rem', fontWeight: 200, fontVariantNumeric: 'tabular-nums', letterSpacing: 2 }}>
                        {time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                        {time.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>
            </div>



            {/* Main content - split layout */}
            <div style={{
                position: 'relative', zIndex: 1,
                display: 'grid', gridTemplateColumns: '1fr 320px',
                gap: '24px', padding: '24px 40px', maxHeight: 'calc(100vh - 220px)',
            }}>
                {/* Queue list */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FiArrowRight color="#20c997" /> DANH SÁCH CHỜ
                        </h2>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                            Trang {page + 1}/{totalPages}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {visibleQueue.map((apt, i) => {
                            const isArrived = apt.status === 'arrived'
                            const queueNumber = page * pageSize + i + 1
                            return (
                                <div key={apt.id} style={{
                                    background: isArrived
                                        ? 'linear-gradient(135deg, rgba(32,201,151,0.12), rgba(32,201,151,0.04))'
                                        : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${isArrived ? 'rgba(32,201,151,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                    borderRadius: 14, padding: '16px 20px',
                                    display: 'flex', alignItems: 'center', gap: 16,
                                    animation: `slideIn 0.4s ease ${i * 0.05}s both`,
                                }}>
                                    {/* Queue number */}
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                                        background: isArrived
                                            ? 'linear-gradient(135deg, #20c997, #198754)'
                                            : 'linear-gradient(135deg, #fbbf24, #d97706)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.3rem', fontWeight: 900,
                                        boxShadow: isArrived ? '0 4px 16px rgba(32,201,151,0.3)' : '0 4px 16px rgba(251,191,36,0.2)',
                                    }}>
                                        {String(queueNumber).padStart(2, '0')}
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '1rem', fontWeight: 700,
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                        }}>
                                            {apt.customerName}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                                            {apt.type} · {apt.time}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div style={{
                                        padding: '5px 14px', borderRadius: 20, fontSize: '0.72rem',
                                        fontWeight: 700, letterSpacing: 0.5, flexShrink: 0,
                                        background: isArrived ? 'rgba(32,201,151,0.15)' : 'rgba(251,191,36,0.1)',
                                        color: isArrived ? '#20c997' : '#fbbf24',
                                        border: `1px solid ${isArrived ? 'rgba(32,201,151,0.3)' : 'rgba(251,191,36,0.2)'}`,
                                    }}>
                                        {statusLabel(apt.status)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right panel - Now serving + completed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Now serving */}
                    {arrived.length > 0 && (
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(32,201,151,0.15), rgba(32,201,151,0.05))',
                            border: '1px solid rgba(32,201,151,0.2)',
                            borderRadius: 16, padding: '20px',
                        }}>
                            <div style={{
                                fontSize: '0.7rem', color: '#20c997', fontWeight: 700, letterSpacing: 2,
                                textTransform: 'uppercase', marginBottom: 12,
                            }}>
                                🔔 ĐANG PHỤC VỤ
                            </div>
                            {arrived.slice(0, 3).map(apt => (
                                <div key={apt.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <FiUser color="#20c997" size={16} />
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{apt.customerName}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{apt.type}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Completed */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 16, padding: '20px', flex: 1,
                        maxHeight: '400px', overflowY: 'auto',
                    }}>
                        <div style={{
                            fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700,
                            letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12,
                        }}>
                            ✅ ĐÃ HOÀN THÀNH ({completed.length})
                        </div>
                        {completed.map(apt => (
                            <div key={apt.id} style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)',
                                opacity: 0.5,
                            }}>
                                <FiCheckCircle size={14} color="#60a5fa" />
                                <span style={{ fontSize: '0.82rem' }}>{apt.customerName}</span>
                            </div>
                        ))}
                        {completed.length === 0 && (
                            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: 20 }}>
                                Chưa có lịch hẹn hoàn thành
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom ticker */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                padding: '10px 40px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)',
                zIndex: 10,
            }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                    🔄 Tự động cập nhật mỗi 10 giây
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                    BeautyOS Clinic · Phần mềm quản lý Spa & Clinic
                </span>
            </div>

            <style>{`
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
            `}</style>
        </div>
    )
}
