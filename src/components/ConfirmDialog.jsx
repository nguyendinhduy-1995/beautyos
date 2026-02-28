import { FiAlertTriangle } from 'react-icons/fi'

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) {
    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            animation: 'fadeIn 0.2s ease'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', padding: '32px',
                width: '90%', maxWidth: '440px', textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                animation: 'slideUp 0.3s ease'
            }}>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 16px',
                    background: type === 'danger' ? '#ffebee' : '#fff8e1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <FiAlertTriangle size={28} color={type === 'danger' ? '#c62828' : '#f57f17'} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '24px', lineHeight: 1.5 }}>{message}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={onCancel} className="btn btn-secondary" style={{ minWidth: '100px' }}>Hủy</button>
                    <button onClick={onConfirm} className="btn" style={{
                        minWidth: '100px',
                        background: type === 'danger' ? '#c62828' : 'var(--color-primary)',
                        color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px',
                        cursor: 'pointer', fontWeight: '600'
                    }}>
                        Xác nhận
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
            `}</style>
        </div>
    )
}
