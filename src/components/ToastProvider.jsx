import { createContext, useContext, useState, useCallback } from 'react'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'

const ToastContext = createContext()

export function useToast() {
    return useContext(ToastContext)
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
                display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px'
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '14px 20px', borderRadius: '12px',
                        background: toast.type === 'success' ? '#e8f5e9' : toast.type === 'error' ? '#ffebee' : '#e3f2fd',
                        border: `1px solid ${toast.type === 'success' ? '#a5d6a7' : toast.type === 'error' ? '#ef9a9a' : '#90caf9'}`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                        animation: 'toastSlideIn 0.3s ease',
                        minWidth: '300px'
                    }}>
                        {toast.type === 'success' && <FiCheckCircle size={20} color="#2e7d32" />}
                        {toast.type === 'error' && <FiAlertCircle size={20} color="#c62828" />}
                        {toast.type === 'info' && <FiInfo size={20} color="#1565c0" />}
                        <span style={{
                            flex: 1, fontSize: '0.9rem', fontWeight: '500',
                            color: toast.type === 'success' ? '#1b5e20' : toast.type === 'error' ? '#b71c1c' : '#0d47a1'
                        }}>
                            {toast.message}
                        </span>
                        <button onClick={() => removeToast(toast.id)} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: '2px', opacity: 0.6
                        }}>
                            <FiX size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes toastSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    )
}
