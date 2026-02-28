import { appointments } from '../../data/mockData'
import { FiClock, FiUser, FiCheckCircle } from 'react-icons/fi'

export default function WaitingScreen() {
    const waiting = appointments.filter(a => a.status === 'Chờ' || a.status === 'Đang thực hiện')
    const completed = appointments.filter(a => a.status === 'Hoàn thành')

    return (
        <div style={{
            minHeight: '100vh', background: 'linear-gradient(135deg, #1a365d 0%, #2d4a7a 50%, #1a365d 100%)',
            padding: '40px', color: 'white'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px' }}>BEAUTYOS V2</h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.7 }}>Màn Hình Đợi — {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div style={{ fontSize: '3rem', fontWeight: '300', marginTop: '8px' }}>
                    {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {/* Stats bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fbbf24' }}>{waiting.length}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Đang chờ</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#34d399' }}>{completed.length}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Hoàn thành</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>{appointments.length}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Tổng lịch hẹn</div>
                </div>
            </div>

            {/* Queue cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
                {waiting.map((apt, i) => (
                    <div key={apt.id} style={{
                        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                        borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.15)',
                        animation: `fadeIn 0.5s ease ${i * 0.1}s both`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: apt.status === 'Đang thực hiện' ? 'linear-gradient(135deg, #34d399, #059669)' : 'linear-gradient(135deg, #fbbf24, #d97706)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem', fontWeight: '700'
                                }}>
                                    {i + 1}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{apt.customer}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{apt.service}</div>
                                </div>
                            </div>
                            <span style={{
                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600',
                                background: apt.status === 'Đang thực hiện' ? 'rgba(52,211,153,0.2)' : 'rgba(251,191,36,0.2)',
                                color: apt.status === 'Đang thực hiện' ? '#34d399' : '#fbbf24'
                            }}>
                                {apt.status}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', opacity: 0.8 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiClock size={14} /> {apt.time}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser size={14} /> {apt.staff}</span>
                        </div>
                    </div>
                ))}

                {/* Completed section */}
                {completed.map(apt => (
                    <div key={apt.id} style={{
                        background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px',
                        border: '1px solid rgba(255,255,255,0.08)', opacity: 0.6
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <FiCheckCircle size={20} color="#34d399" />
                            <span style={{ fontWeight: '600' }}>{apt.customer}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{apt.service} · {apt.time}</div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    )
}
