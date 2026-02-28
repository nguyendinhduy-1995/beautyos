import { useLocation, useNavigate } from 'react-router-dom'
import { FiAlertCircle, FiArrowLeft, FiHome } from 'react-icons/fi'

export default function PlaceholderPage() {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
            <div style={{ textAlign: 'center', maxWidth: '480px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b6b20, #ee5a2420)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <FiAlertCircle size={36} color="#ee5a24" />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-800)', marginBottom: '8px' }}>404</h2>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '12px' }}>Trang không tồn tại</h3>
                <p style={{ color: 'var(--gray-400)', lineHeight: 1.6, marginBottom: '8px', fontSize: '0.9rem' }}>
                    Đường dẫn <code style={{ background: 'var(--gray-100)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>{location.pathname}</code> không được tìm thấy.
                </p>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', marginBottom: '28px' }}>
                    Vui lòng kiểm tra lại URL hoặc quay về trang chính.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiArrowLeft size={14} /> Quay lại
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiHome size={14} /> Trang chủ
                    </button>
                </div>
            </div>
        </div>
    )
}
