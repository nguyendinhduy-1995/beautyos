import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiStar, FiBell, FiGrid, FiInfo, FiCheckCircle, FiX, FiLogOut, FiSettings, FiUser, FiPhone, FiWifi, FiGlobe, FiHeadphones, FiMessageSquare, FiFileText, FiUsers, FiMail, FiHardDrive, FiRefreshCw, FiSmartphone, FiMonitor, FiLayout, FiList, FiCheck } from 'react-icons/fi'

const notifications = [
    { id: 1, text: 'Lịch hẹn mới: Nguyễn Thị Lan - 15:00', time: '2 phút trước', read: false, type: 'appointment' },
    { id: 2, text: 'Khách đến: Phan Thị Kim Hồng', time: '10 phút trước', read: false, type: 'arrival' },
    { id: 3, text: 'Vật tư sắp hết: Kim tiêm filler (5 còn)', time: '30 phút trước', read: false, type: 'warning' },
    { id: 4, text: 'Thanh toán: Kim Trang - 2.500.000đ', time: '1 giờ trước', read: true, type: 'payment' },
    { id: 5, text: 'Hủy lịch: Trần Văn B - Triệt lông', time: '2 giờ trước', read: true, type: 'cancel' },
    { id: 6, text: 'Sinh nhật KH: Vũ Ngọc Mai - ngày mai', time: '3 giờ trước', read: true, type: 'birthday' },
]

const initialSystemItems = [
    { id: 'voice', icon: 'FiPhone', label: 'Thiết bị gọi', desc: 'Đang kiểm tra thiết bị', status: 'checking' },
    { id: 'network', icon: 'FiWifi', label: 'Mạng', desc: 'Kiểm tra tốc độ mạng', status: 'checking' },
    { id: 'portal', icon: 'FiGlobe', label: 'Cổng kết nối', desc: 'Chưa kết nối', status: 'disconnected' },
    { id: 'callcenter', icon: 'FiHeadphones', label: 'Tổng đài', desc: 'Không sử dụng tổng đài', status: 'disconnected' },
    { id: 'sms', icon: 'FiMessageSquare', label: 'SMS-ZNS', desc: 'Chưa kết nối', status: 'disconnected' },
    { id: 'einvoice', icon: 'FiFileText', label: 'Hóa đơn ĐT', desc: 'Chưa kết nối', status: 'disconnected' },
    { id: 'account3rd', icon: 'FiUsers', label: 'Tài khoản 3rd', desc: 'Chưa kết nối', status: 'disconnected' },
    { id: 'mail', icon: 'FiMail', label: 'Email', desc: 'admin@beautyos.vn', status: 'connected' },
]

const themeColors = [
    { color: '#e91e63', name: 'Hồng' },
    { color: '#f44336', name: 'Đỏ' },
    { color: '#ff9800', name: 'Cam' },
    { color: '#4caf50', name: 'Xanh lá' },
    { color: '#009688', name: 'Teal' },
    { color: '#2196f3', name: 'Xanh dương' },
    { color: '#673ab7', name: 'Tím' },
    { color: '#ff5722', name: 'Cam đậm' },
    { color: '#cddc39', name: 'Vàng xanh' },
]

const iconMap = {
    FiPhone: FiPhone,
    FiWifi: FiWifi,
    FiGlobe: FiGlobe,
    FiHeadphones: FiHeadphones,
    FiMessageSquare: FiMessageSquare,
    FiFileText: FiFileText,
    FiUsers: FiUsers,
    FiMail: FiMail,
}

export default function TopBar({ title, subtitle, onToggleSidebar }) {
    const navigate = useNavigate()
    const [showNotifications, setShowNotifications] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showRightPanel, setShowRightPanel] = useState(false)
    const [showAppsMenu, setShowAppsMenu] = useState(false)
    const [notifList, setNotifList] = useState(notifications)
    const [globalSearch, setGlobalSearch] = useState('')
    const [selectedColor, setSelectedColor] = useState('#4caf50')
    const [sidenavType, setSidenavType] = useState('white')
    const [systemItemsList, setSystemItemsList] = useState(initialSystemItems)
    const [panelToast, setPanelToast] = useState(null)
    const [networkSpeed, setNetworkSpeed] = useState(null)
    const [showStorageDetail, setShowStorageDetail] = useState(false)
    const notifRef = useRef(null)
    const userRef = useRef(null)
    const appsRef = useRef(null)

    const unreadCount = notifList.filter(n => !n.read).length

    useEffect(() => {
        const handleClick = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false)
            if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false)
            if (appsRef.current && !appsRef.current.contains(e.target)) setShowAppsMenu(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    // Auto-hide panel toast
    useEffect(() => {
        if (panelToast) {
            const t = setTimeout(() => setPanelToast(null), 2500)
            return () => clearTimeout(t)
        }
    }, [panelToast])

    const closeAll = (except) => {
        if (except !== 'notif') setShowNotifications(false)
        if (except !== 'user') setShowUserMenu(false)
        if (except !== 'apps') setShowAppsMenu(false)
        if (except !== 'panel') setShowRightPanel(false)
    }

    const markAllRead = () => setNotifList(prev => prev.map(n => ({ ...n, read: true })))

    const getNotifIcon = (type) => {
        switch (type) {
            case 'appointment': return '📋'
            case 'arrival': return '👋'
            case 'warning': return '⚠️'
            case 'payment': return '💰'
            case 'cancel': return '❌'
            case 'birthday': return '🎂'
            default: return '📌'
        }
    }

    const appsItems = [
        { icon: '📅', label: 'Lịch hẹn', path: '/appointments/daily' },
        { icon: '👥', label: 'Khách hàng', path: '/customers/list' },
        { icon: '💇', label: 'Dịch vụ', path: '/services/catalog' },
        { icon: '👨‍⚕️', label: 'Nhân viên', path: '/staff/list' },
        { icon: '📊', label: 'Báo cáo', path: '/reports/list' },
        { icon: '💰', label: 'Kế toán', path: '/accounting/cash-flow' },
        { icon: '🏷️', label: 'Thẻ', path: '/cards/list' },
        { icon: '📦', label: 'Kho', path: '/inventory/management' },
        { icon: '⚙️', label: 'Cấu hình', path: '/config/general' },
    ]

    // Handle system item click - toggle status with simulation
    const handleSystemItemClick = (itemId) => {
        setSystemItemsList(prev => prev.map(item => {
            if (item.id !== itemId) return item

            // Start checking/connecting animation
            if (item.status === 'disconnected') {
                // First, set to checking
                setPanelToast({ type: 'info', text: `Đang kết nối ${item.label}...` })

                // Simulate connection process
                setTimeout(() => {
                    setSystemItemsList(prev2 => prev2.map(it => {
                        if (it.id !== itemId) return it
                        const connected = { ...it, status: 'connected' }
                        switch (itemId) {
                            case 'voice': connected.desc = 'Đã kết nối - Sẵn sàng'; break
                            case 'network': connected.desc = `Đã kết nối - ${Math.floor(Math.random() * 80 + 20)} Mbps`; break
                            case 'portal': connected.desc = 'Đã kết nối'; break
                            case 'callcenter': connected.desc = 'Sẵn sàng nhận cuộc gọi'; break
                            case 'sms': connected.desc = 'Đã kết nối - ZNS hoạt động'; break
                            case 'einvoice': connected.desc = 'Đã kết nối - VNPT'; break
                            case 'account3rd': connected.desc = 'Đã kết nối'; break
                            case 'mail': connected.desc = 'admin@beautyos.vn'; break
                            default: connected.desc = 'Đã kết nối'
                        }
                        return connected
                    }))
                    setPanelToast({ type: 'success', text: `${item.label} đã kết nối thành công!` })
                }, 1200)

                return { ...item, status: 'checking', desc: 'Đang kết nối...' }
            } else if (item.status === 'connected') {
                // Disconnect
                setPanelToast({ type: 'warning', text: `Đã ngắt kết nối ${item.label}` })
                return { ...item, status: 'disconnected', desc: 'Chưa kết nối' }
            } else if (item.status === 'checking') {
                // Cancel checking
                setPanelToast({ type: 'info', text: `Đã hủy kết nối ${item.label}` })
                return { ...item, status: 'disconnected', desc: 'No connect' }
            }
            return item
        }))
    }

    // Handle color theme change - actually updates CSS variables
    const handleColorChange = (colorObj) => {
        setSelectedColor(colorObj.color)
        document.documentElement.style.setProperty('--primary', colorObj.color)
        // Also update related shades
        document.documentElement.style.setProperty('--primary-light', colorObj.color + '20')
        document.documentElement.style.setProperty('--primary-dark', colorObj.color)
        setPanelToast({ type: 'success', text: `Đã đổi màu chủ đề sang ${colorObj.name}` })
    }

    // Handle sidenav type change
    const handleSidenavChange = (type) => {
        setSidenavType(type)
        // Apply class to body for sidebar styling
        document.body.setAttribute('data-sidenav', type)
        const sidebar = document.querySelector('.sidebar')
        if (sidebar) {
            sidebar.classList.remove('sidebar-trans', 'sidebar-white', 'sidebar-left', 'sidebar-top')
            sidebar.classList.add(`sidebar-${type}`)
        }
        setPanelToast({ type: 'success', text: `Sidenav: ${type.charAt(0).toUpperCase() + type.slice(1)}` })
    }

    // Handle network speed test
    const handleNetworkTest = () => {
        setPanelToast({ type: 'info', text: 'Đang kiểm tra tốc độ mạng...' })
        setNetworkSpeed(null)
        setTimeout(() => {
            const speed = Math.floor(Math.random() * 80 + 20)
            setNetworkSpeed(speed)
            setSystemItemsList(prev => prev.map(it =>
                it.id === 'network' ? { ...it, status: 'connected', desc: `${speed} Mbps - Tốt` } : it
            ))
            setPanelToast({ type: 'success', text: `Tốc độ mạng: ${speed} Mbps` })
        }, 2000)
    }

    const getIconComponent = (iconName) => {
        const Comp = iconMap[iconName]
        return Comp ? <Comp size={20} /> : null
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'connected': return { bg: '#e8f5e9', fg: '#4caf50' }
            case 'checking': return { bg: '#fff3e0', fg: '#ff9800' }
            default: return { bg: '#f5f5f5', fg: '#9e9e9e' }
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'connected': return { text: 'BẬT', bg: '#4caf50' }
            case 'checking': return { text: '...', bg: '#ff9800' }
            default: return { text: 'TẮT', bg: '#9e9e9e' }
        }
    }

    return (
        <>
            <header className="topbar">
                <button className="topbar-toggle" onClick={onToggleSidebar} id="sidebar-toggle">
                    <FiMenu />
                </button>

                <div className="topbar-title">
                    <h1>{title || 'Lịch Hẹn'}</h1>
                    {subtitle && <span>{subtitle}</span>}
                </div>

                <div className="topbar-center">
                    <button className="topbar-guide" id="help-guide">
                        <FiCheckCircle size={16} />
                        Hướng dẫn sử dụng
                    </button>
                    <div className="topbar-info" style={{ marginLeft: '8px' }}>
                        <FiInfo size={16} />
                    </div>
                </div>

                <div className="topbar-right">
                    <span className="topbar-detail">Chi tiết</span>

                    <div className="topbar-search">
                        <input type="text" placeholder="eg .nhập tối thiểu 3 ký tự" id="global-search"
                            value={globalSearch} onChange={e => setGlobalSearch(e.target.value)} />
                        <FiSearch className="topbar-search-icon" />
                    </div>

                    <button className="topbar-icon-btn starred" id="btn-star">
                        <FiStar />
                    </button>

                    {/* Notification Bell with Dropdown */}
                    <div ref={notifRef} style={{ position: 'relative' }}>
                        <button className="topbar-icon-btn" id="btn-notifications"
                            onClick={() => { closeAll('notif'); setShowNotifications(!showNotifications) }}>
                            <FiBell />
                            {unreadCount > 0 && <span className="topbar-badge" style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-red)' }}></span>}
                        </button>

                        {showNotifications && (
                            <div style={{
                                position: 'absolute', top: '100%', right: 0, width: '380px',
                                background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                zIndex: 1000, overflow: 'hidden', animation: 'fadeIn 0.2s ease',
                                border: '1px solid var(--gray-200)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--gray-100)' }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Thông Báo {unreadCount > 0 && <span style={{ background: 'var(--accent-red)', color: 'white', borderRadius: '10px', padding: '2px 8px', fontSize: '0.7rem', marginLeft: '4px' }}>{unreadCount}</span>}</h4>
                                    {unreadCount > 0 && <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '500' }}>Đánh dấu đã đọc</button>}
                                </div>
                                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                    {notifList.map(n => (
                                        <div key={n.id} style={{
                                            display: 'flex', gap: '12px', padding: '12px 20px', cursor: 'pointer',
                                            background: n.read ? 'transparent' : '#f0f7ff',
                                            borderBottom: '1px solid var(--gray-50)',
                                            transition: 'background 0.2s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                                            onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : '#f0f7ff'}
                                            onClick={() => setNotifList(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}
                                        >
                                            <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>{getNotifIcon(n.type)}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.82rem', fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>{n.text}</div>
                                                <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: '2px' }}>{n.time}</div>
                                            </div>
                                            {!n.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: '12px', borderTop: '1px solid var(--gray-100)', textAlign: 'center' }}>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer' }}>Xem tất cả thông báo</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Apps Grid with Dropdown */}
                    <div ref={appsRef} style={{ position: 'relative' }}>
                        <button className="topbar-icon-btn" id="btn-apps"
                            onClick={() => { closeAll('apps'); setShowAppsMenu(!showAppsMenu) }}>
                            <FiList />
                        </button>

                        {showAppsMenu && (
                            <div style={{
                                position: 'absolute', top: '100%', right: 0, width: '300px',
                                background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                zIndex: 1000, overflow: 'hidden', animation: 'fadeIn 0.2s ease',
                                border: '1px solid var(--gray-200)', padding: '12px'
                            }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', padding: '8px 8px 12px', borderBottom: '1px solid var(--gray-100)', marginBottom: '8px' }}>Truy cập nhanh</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                                    {appsItems.map((app, i) => (
                                        <button key={i} onClick={() => { navigate(app.path); setShowAppsMenu(false) }}
                                            style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                                                padding: '12px 8px', background: 'none', border: 'none', borderRadius: '12px',
                                                cursor: 'pointer', fontSize: '0.78rem', color: 'var(--gray-700)', transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <span style={{ fontSize: '24px' }}>{app.icon}</span>
                                            <span style={{ fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>{app.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Avatar with Dropdown */}
                    <div ref={userRef} style={{ position: 'relative' }}>
                        <div className="topbar-avatar" id="user-avatar" style={{ cursor: 'pointer' }}
                            onClick={() => { closeAll('user'); setShowUserMenu(!showUserMenu) }}>
                            AD
                        </div>

                        {showUserMenu && (
                            <div style={{
                                position: 'absolute', top: '100%', right: 0, width: '240px',
                                background: 'white', borderRadius: '14px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                zIndex: 1000, overflow: 'hidden', animation: 'fadeIn 0.2s ease',
                                border: '1px solid var(--gray-200)'
                            }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Admin</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>Quản trị viên</div>
                                </div>
                                {[
                                    { icon: <FiUser size={16} />, label: 'Hồ sơ cá nhân', path: '/staff/list' },
                                    { icon: <FiSettings size={16} />, label: 'Cài đặt', path: '/config/general' },
                                ].map((item, i) => (
                                    <button key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                                        padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: '0.85rem', color: 'var(--gray-700)', textAlign: 'left'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        onClick={() => { setShowUserMenu(false); navigate(item.path) }}>
                                        {item.icon} {item.label}
                                    </button>
                                ))}
                                <div style={{ borderTop: '1px solid var(--gray-100)' }}>
                                    <button style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                                        padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: '0.85rem', color: 'var(--accent-red)', fontWeight: '500', textAlign: 'left'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        onClick={() => { localStorage.removeItem('beautyos_auth'); window.location.href = '/login' }}>
                                        <FiLogOut size={16} /> Đăng xuất
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar Menu Toggle */}
                    <button className="topbar-icon-btn" id="btn-menu"
                        onClick={() => { closeAll('panel'); setShowRightPanel(!showRightPanel) }}>
                        <FiMenu />
                    </button>
                </div>

                <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px) } to { opacity: 1; transform: translateY(0) } }
                @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
                @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
                @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
                @keyframes toastIn { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>
            </header>

            {/* Right Sidebar Panel - matching reference site */}
            {showRightPanel && (
                <>
                    {/* Overlay */}
                    <div onClick={() => setShowRightPanel(false)} style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.3)', zIndex: 9998,
                        animation: 'fadeIn 0.2s ease'
                    }} />

                    {/* Panel */}
                    <div style={{
                        position: 'fixed', top: 0, right: 0, width: '320px', height: '100vh',
                        background: 'white', zIndex: 9999, overflowY: 'auto',
                        boxShadow: '-4px 0 30px rgba(0,0,0,0.15)',
                        animation: 'slideInRight 0.3s ease'
                    }}>
                        {/* Panel Toast */}
                        {panelToast && (
                            <div style={{
                                position: 'sticky', top: 0, zIndex: 10,
                                padding: '10px 16px', fontSize: '0.8rem', fontWeight: 600,
                                animation: 'toastIn 0.2s ease',
                                background: panelToast.type === 'success' ? '#e8f5e9' : panelToast.type === 'warning' ? '#fff3e0' : '#e3f2fd',
                                color: panelToast.type === 'success' ? '#2e7d32' : panelToast.type === 'warning' ? '#e65100' : '#1565c0',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                borderBottom: `2px solid ${panelToast.type === 'success' ? '#4caf50' : panelToast.type === 'warning' ? '#ff9800' : '#2196f3'}`
                            }}>
                                {panelToast.type === 'success' ? <FiCheck size={16} /> : panelToast.type === 'warning' ? '⚠️' : <FiInfo size={16} />}
                                {panelToast.text}
                            </div>
                        )}

                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 20px 16px' }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}>BeautyOS Clinic</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '2px' }}>Phiên bản 3.0.0.5</div>
                            </div>
                            <button onClick={() => setShowRightPanel(false)} style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                                color: 'var(--gray-500)', borderRadius: '8px'
                            }}>
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* System Status Items - NOW CLICKABLE */}
                        <div style={{ padding: '0 12px' }}>
                            {systemItemsList.map((item) => {
                                const colors = getStatusColor(item.status)
                                const badge = getStatusBadge(item.status)
                                return (
                                    <div key={item.id}
                                        onClick={() => item.id === 'network' ? handleNetworkTest() : handleSystemItemClick(item.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '14px', padding: '12px',
                                            borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
                                            marginBottom: '2px', position: 'relative'
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.transform = 'translateX(-2px)' }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: colors.bg,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: colors.fg, flexShrink: 0,
                                            transition: 'all 0.3s',
                                            animation: item.status === 'checking' ? 'pulse 1.5s infinite' : 'none'
                                        }}>
                                            {getIconComponent(item.icon)}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-800)' }}>{item.label}</div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: item.status === 'connected' ? '#4caf50' : item.status === 'checking' ? '#ff9800' : 'var(--gray-400)',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                transition: 'color 0.3s'
                                            }}>{item.desc}</div>
                                        </div>
                                        {/* Status badge */}
                                        <div style={{
                                            padding: '2px 8px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 700,
                                            background: badge.bg, color: 'white', flexShrink: 0,
                                            transition: 'all 0.3s', minWidth: '32px', textAlign: 'center'
                                        }}>
                                            {badge.text}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Storage */}
                        <div style={{ padding: '12px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
                                onClick={() => setShowStorageDetail(!showStorageDetail)}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', background: '#e3f2fd',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2196f3', flexShrink: 0
                                }}>
                                    <FiHardDrive size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>0 GB / 15 GB đã dùng</span>
                                        <button onClick={(e) => { e.stopPropagation(); setShowStorageDetail(!showStorageDetail) }}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 500 }}>
                                            chi tiết {showStorageDetail ? '▲' : '→'}
                                        </button>
                                    </div>
                                    <div style={{ height: '4px', borderRadius: '2px', background: 'var(--gray-100)' }}>
                                        <div style={{ width: '3%', height: '100%', borderRadius: '2px', background: 'var(--primary)', transition: 'width 0.3s' }} />
                                    </div>
                                </div>
                            </div>
                            {/* Storage Detail Expand */}
                            {showStorageDetail && (
                                <div style={{
                                    marginTop: '12px', marginLeft: '54px', padding: '12px', borderRadius: '10px',
                                    background: 'var(--gray-50)', animation: 'fadeIn 0.2s ease', fontSize: '0.78rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--gray-600)' }}>
                                        <span>📁 Hình ảnh</span><span>0 MB</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--gray-600)' }}>
                                        <span>📄 Tài liệu</span><span>0 MB</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--gray-600)' }}>
                                        <span>🎥 Video</span><span>0 MB</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--gray-600)' }}>
                                        <span>💾 Sao lưu</span><span>0 MB</span>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--gray-700)' }}>
                                        <span>Tổng cộng</span><span>0 / 15 GB</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reload */}
                        <div style={{ padding: '8px 12px' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '14px', padding: '12px',
                                borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                                onClick={() => { setPanelToast({ type: 'info', text: 'Đang tải lại trang...' }); setTimeout(() => window.location.reload(), 800) }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.transform = 'translateX(-2px)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', background: '#fce4ec',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e91e63', flexShrink: 0
                                }}>
                                    <FiRefreshCw size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-800)' }}>Tải lại trang</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Làm mới toàn bộ hệ thống</div>
                                </div>
                            </div>
                        </div>

                        {/* Branch Badge */}
                        <div style={{ padding: '8px 20px 16px' }}>
                            <div style={{
                                background: 'var(--primary)', color: 'white', textAlign: 'center',
                                padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
                                letterSpacing: '0.5px', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                                onClick={() => setPanelToast({ type: 'info', text: 'Chi nhánh: CN_1834 - Quận 1, TP.HCM' })}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                CN_1834
                            </div>
                        </div>

                        {/* Color Theme - FUNCTIONAL */}
                        <div style={{ padding: '8px 20px' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '10px' }}>Mã màu</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {themeColors.map((colorObj, i) => (
                                    <div key={i} onClick={() => handleColorChange(colorObj)}
                                        title={colorObj.name}
                                        style={{
                                            width: '28px', height: '28px', borderRadius: '50%', background: colorObj.color,
                                            cursor: 'pointer',
                                            border: selectedColor === colorObj.color ? '3px solid var(--gray-800)' : '2px solid transparent',
                                            transition: 'all 0.2s',
                                            transform: selectedColor === colorObj.color ? 'scale(1.15)' : 'scale(1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        {selectedColor === colorObj.color && <FiCheck size={14} color="white" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidenav Type - FUNCTIONAL */}
                        <div style={{ padding: '16px 20px' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '10px' }}>Kiểu thanh menu</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['trans', 'white', 'left', 'top'].map(type => (
                                    <button key={type} onClick={() => handleSidenavChange(type)} style={{
                                        flex: 1, padding: '8px 4px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
                                        cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize',
                                        background: sidenavType === type ? 'var(--primary)' : 'white',
                                        color: sidenavType === type ? 'white' : 'var(--gray-600)',
                                        border: sidenavType === type ? '1px solid var(--primary)' : '1px solid var(--gray-200)'
                                    }}>
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact & Footer */}
                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-100)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--gray-700)' }}>
                                Liên hệ <a href="tel:0886931988" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>088 693 1988</a>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
                                <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0068ff', cursor: 'pointer', textDecoration: 'none' }}>Zalo</a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', cursor: 'pointer', color: '#1877f2', textDecoration: 'none', fontWeight: 700 }}>f</a>
                                <a href="https://m.me" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', cursor: 'pointer', color: '#0084ff', textDecoration: 'none' }}>💬</a>
                            </div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>© VTTECH</div>
                        </div>

                        {/* QR Config */}
                        <div style={{ padding: '12px 20px 24px', borderTop: '1px solid var(--gray-100)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', padding: '8px', borderRadius: '10px', transition: 'background 0.2s' }}
                                onClick={() => setPanelToast({ type: 'warning', text: 'QR đã hết hạn. Vui lòng liên hệ admin để cấp lại.' })}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <div style={{
                                    width: '50px', height: '50px', borderRadius: '8px', background: 'var(--gray-100)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                                }}>
                                    📱
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-800)' }}>Cấu hình QR</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Đăng nhập vào các thiết bị khác</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 600 }}>Hết hạn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

