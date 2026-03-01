import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    FiCalendar, FiHeart, FiDollarSign, FiUsers, FiLayers,
    FiCreditCard, FiPackage, FiTrendingUp, FiSmartphone,
    FiLink, FiUser, FiSettings, FiBarChart2, FiChevronDown,
    FiRepeat, FiX, FiZap
} from 'react-icons/fi'

const menuItems = [
    {
        id: 'appointments',
        label: 'Lịch Hẹn',
        icon: FiCalendar,
        children: [
            { id: 'daily', label: 'Trong Ngày', path: '/appointments/daily' },
            { id: 'by-date', label: 'Theo Ngày', path: '/appointments/by-date' },
            { id: 'calendar', label: 'Calendar', path: '/appointments/calendar' },
            { id: 'doctor', label: 'Lịch Hẹn Bác Sĩ', path: '/appointments/doctor' },
            { id: 'waiting', label: 'Màn hình đợi', path: '/appointments/waiting' },
            { id: 'realtime', label: 'Theo thời gian thực', path: '/appointments/realtime' },
        ]
    },
    {
        id: 'care',
        label: 'Chăm Sóc',
        icon: FiHeart,
        children: [
            { id: 'followup', label: 'Nhắc lịch hẹn', path: '/care/followup' },
            { id: 'no-service', label: 'Không Làm Dịch Vụ', path: '/care/no-service' },
            { id: 'birthday', label: 'Ngày Sinh Nhật', path: '/care/birthday' },
            { id: 'no-show', label: 'Hẹn Không Đến', path: '/care/no-show' },
            { id: 'post-care', label: 'Sau Điều Trị', path: '/care/post-care' },
            { id: 'complaints', label: 'Giải Quyết Complaint', path: '/care/complaints' },
            { id: 'cancelled', label: 'Lịch Hẹn Hủy', path: '/care/cancelled' },
            { id: 'periodic', label: 'Chăm sóc định kỳ', path: '/care/periodic' },
            { id: 'self', label: 'Khách Hàng', path: '/care/self' },
        ]
    },
    {
        id: 'accounting',
        label: 'Kế Toán',
        icon: FiDollarSign,
        children: [
            { id: 'cash-flow', label: 'Lịch Sử Thu Chi', path: '/accounting/cash-flow' },
            { id: 'supplier', label: 'Công nợ NCC', path: '/accounting/supplier' },
            { id: 'closing', label: 'Chốt ca', path: '/accounting/closing' },
            { id: 'cashbook', label: 'Sổ quỹ & Chốt sổ', path: '/accounting/cashbook' },
        ]
    },
    {
        id: 'customers',
        label: 'Khách Hàng',
        icon: FiUsers,
        children: [
            { id: 'create', label: 'Tạo Mới', path: '/customers/create' },
            { id: 'list', label: 'Danh Sách', path: '/customers/list' },
            { id: 'profile', label: 'Bộ hồ sơ', path: '/customers/profile' },
            { id: 'referrers', label: 'Người Giới Thiệu', path: '/customers/referrers' },
            { id: 'rooms', label: 'Trạng Thái Phòng', path: '/customers/rooms' },
        ]
    },
    {
        id: 'services',
        label: 'Dịch Vụ',
        icon: FiLayers,
        children: [
            { id: 'catalog', label: 'Danh Mục DV', path: '/services/catalog' },
            { id: 'combos', label: 'Combo', path: '/services/combos' },
            { id: 'prescriptions', label: 'Toa thuốc', path: '/services/prescriptions' },
        ]
    },
    {
        id: 'cards',
        label: 'Thẻ',
        icon: FiCreditCard,
        children: [
            { id: 'list', label: 'Danh Sách Thẻ', path: '/cards/list' },
            { id: 'custom', label: 'Thẻ Tự Chọn', path: '/cards/custom' },
            { id: 'history', label: 'Lịch Sử Card', path: '/cards/history' },
            { id: 'packages', label: 'Gói Liệu Trình', path: '/cards/packages' },
            { id: 'prepaid', label: 'Thẻ Trả Trước', path: '/cards/prepaid' },
            { id: 'status', label: 'Tình Trạng Thẻ', path: '/cards/status' },
        ]
    },
    {
        id: 'inventory',
        label: 'Kho',
        icon: FiPackage,
        children: [
            { id: 'management', label: 'Quản Lý Kho', path: '/inventory/management' },
            { id: 'requests', label: 'Phiếu Yêu Cầu', path: '/inventory/requests' },
            { id: 'export', label: 'Xuất Vật Tư', path: '/inventory/export' },
            { id: 'batch', label: 'Vật tư & lô vật tư', path: '/inventory/batch' },
            { id: 'lookup', label: 'Tra cứu biến động', path: '/inventory/lookup' },
            { id: 'closing', label: 'Chốt Kho', path: '/inventory/closing' },
            { id: 'materials', label: 'Nguyên Vật Liệu', path: '/inventory/materials' },
            { id: 'settings', label: 'Cài Đặt', path: '/inventory/settings' },
        ]
    },
    {
        id: 'marketing',
        label: 'Marketing',
        icon: FiTrendingUp,
        children: [
            { id: 'tickets', label: 'Ticket List', path: '/marketing/tickets' },
            { id: 'ticket-tags', label: 'Ticket Tags', path: '/marketing/ticket-tags' },
            { id: 'ticket-transfer', label: 'Chuyển Ticket', path: '/marketing/ticket-transfer' },
            { id: 'ticket-files', label: 'Ticket Files', path: '/marketing/ticket-files' },
            { id: 'deleted-tickets', label: 'Ticket Đã Xóa', path: '/marketing/deleted-tickets' },
            { id: 'campaigns', label: 'Chiến dịch', path: '/marketing/campaigns' },
            { id: 'promotions', label: 'Khuyến mãi', path: '/marketing/promotions' },
            { id: 'voucher', label: 'Voucher', path: '/marketing/voucher' },
            { id: 'ticket-store', label: 'Ticket Store', path: '/marketing/ticket-store' },
            { id: 'ticket-filter', label: 'Lọc Ticket', path: '/marketing/ticket-filter' },
            { id: 'customer-filter', label: 'Lọc Khách Hàng', path: '/marketing/customer-filter' },
            { id: 'settings', label: 'Cài Đặt', path: '/marketing/settings' },
        ]
    },
    {
        id: 'mobile',
        label: 'Mobile & Website',
        icon: FiSmartphone,
        children: [
            { id: 'config', label: 'Cấu hình chung', path: '/mobile/config' },
            { id: 'banner', label: 'Banner', path: '/mobile/banner' },
            { id: 'news', label: 'Tin tức', path: '/mobile/news' },
            { id: 'voucher', label: 'Voucher', path: '/mobile/voucher' },
            { id: 'booking', label: 'Đặt lịch', path: '/mobile/booking' },
            { id: 'contact', label: 'Liên hệ', path: '/mobile/contact' },
            { id: 'feedback', label: 'Phản hồi', path: '/mobile/feedback' },
            { id: 'accounts', label: 'Tài khoản', path: '/mobile/accounts' },
            { id: 'video', label: 'Video', path: '/mobile/video' },
            { id: 'blog', label: 'Blog', path: '/mobile/blog' },
            { id: 'faq', label: 'FAQ', path: '/mobile/faq' },
            { id: 'overview', label: 'Tổng quan', path: '/mobile/overview' },
            { id: 'notifications', label: 'Gửi Thông Báo', path: '/mobile/notifications' },
        ]
    },
    {
        id: 'integration',
        label: 'Tích hợp',
        icon: FiLink,
        children: [
            { id: 'sms-history', label: 'Lịch Sử SMS & ZNS', path: '/integration/sms-history' },
            { id: 'sms-status', label: 'Trạng Thái Gửi SMS', path: '/integration/sms-status' },
            { id: 'call-history', label: 'Lịch Sử Gọi', path: '/integration/call-history' },
        ]
    },
    {
        id: 'staff',
        label: 'Nhân Viên & User',
        icon: FiUser,
        children: [
            { id: 'list', label: 'Danh Sách NV', path: '/staff/list' },
            { id: 'payroll', label: 'Bảng Lương', path: '/staff/payroll' },
            { id: 'schedule', label: 'Lịch làm việc', path: '/staff/schedule' },
            { id: 'permissions', label: 'Phân quyền', path: '/staff/permissions' },
            { id: 'discipline', label: 'Chế tài NV', path: '/staff/discipline' },
        ]
    },
    {
        id: 'config',
        label: 'Cấu Hình',
        icon: FiSettings,
        children: [
            { id: 'general', label: 'Cài đặt chung', path: '/config/general' },
            { id: 'print', label: 'Mẫu in', path: '/config/print' },
            { id: 'categories', label: 'Danh mục', path: '/config/categories' },
            { id: 'card', label: 'Config Card', path: '/config/card' },
            { id: 'sms', label: 'Config SMS', path: '/config/sms' },
        ]
    },
    {
        id: 'reports',
        label: 'Báo Cáo',
        icon: FiBarChart2,
        children: [
            { id: 'overview', label: 'Tổng Quát', path: '/reports/overview' },
            { id: 'revenue', label: 'Doanh thu', path: '/reports/revenue' },
            { id: 'list', label: 'Danh Sách Báo Cáo', path: '/reports/list' },
        ]
    },
    {
        id: 'premium',
        label: 'Tính năng nâng cao',
        icon: FiZap,
        isPremium: true,
        children: [
            { id: 'features', label: 'Tất cả tính năng', path: '/premium/features' },
        ]
    },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, isMobile, onCloseMobile }) {
    const [openMenus, setOpenMenus] = useState({ appointments: true })
    const location = useLocation()
    const navigate = useNavigate()

    const toggleMenu = (menuId) => {
        setOpenMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }))
    }

    const isActive = (path) => location.pathname === path
    const isMenuActive = (item) => item.children?.some(child => location.pathname.startsWith(child.path))

    const handleNavClick = (path) => {
        navigate(path)
        // Auto-close sidebar on mobile after navigation
        if (isMobile && onCloseMobile) {
            onCloseMobile()
        }
    }

    const sidebarClassName = [
        'sidebar',
        collapsed && !isMobile ? 'collapsed' : '',
        isMobile && mobileOpen ? 'mobile-open' : '',
    ].filter(Boolean).join(' ')

    return (
        <aside className={sidebarClassName}>
            <div className="sidebar-header">
                <div className="sidebar-logo">B</div>
                {(!collapsed || isMobile) && (
                    <div className="sidebar-brand" style={{ flex: 1 }}>
                        <span className="sidebar-brand-name">BEAUTYOS V2</span>
                        <span className="sidebar-brand-version">Phần mềm quản lý Spa & Clinic</span>
                    </div>
                )}
                {/* Close button on mobile */}
                {isMobile && mobileOpen && (
                    <button
                        onClick={onCloseMobile}
                        style={{
                            border: 'none',
                            background: 'var(--gray-100)',
                            borderRadius: 'var(--radius-full)',
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--gray-600)',
                            flexShrink: 0,
                        }}
                    >
                        <FiX size={18} />
                    </button>
                )}
            </div>




            <nav className="sidebar-nav">
                {menuItems.map(item => {
                    const Icon = item.icon
                    const isOpen = openMenus[item.id]
                    const active = isMenuActive(item)

                    return (
                        <div className="nav-item" key={item.id}>
                            {/* Premium separator */}
                            {item.isPremium && (
                                <div style={{
                                    height: 1,
                                    background: 'linear-gradient(90deg, transparent, #f59e0b40, transparent)',
                                    margin: '8px 16px'
                                }} />
                            )}
                            <button
                                className={`nav-link ${active ? 'active' : ''}`}
                                onClick={() => toggleMenu(item.id)}
                                style={item.isPremium ? {
                                    background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                                    borderLeft: '3px solid #f59e0b',
                                    margin: '0 8px',
                                    borderRadius: 8,
                                    padding: '10px 12px',
                                } : undefined}
                            >
                                <span className="nav-icon" style={item.isPremium ? { color: '#f59e0b' } : undefined}>
                                    <Icon />
                                </span>
                                {(!collapsed || isMobile) && (
                                    <>
                                        <span className="nav-text" style={item.isPremium ? {
                                            fontWeight: 600,
                                            background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        } : undefined}>
                                            {item.label}
                                        </span>
                                        {item.isPremium && (
                                            <span style={{
                                                fontSize: 9, fontWeight: 700,
                                                padding: '2px 6px', borderRadius: 10,
                                                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                                color: 'white', letterSpacing: 0.5
                                            }}>
                                                PRO
                                            </span>
                                        )}
                                        <FiChevronDown className={`nav-arrow ${isOpen ? 'open' : ''}`} />
                                    </>
                                )}
                            </button>

                            {(!collapsed || isMobile) && item.children && (
                                <div className={`nav-submenu ${isOpen ? 'open' : ''}`}>
                                    {item.children.map(child => (
                                        <a
                                            key={child.id}
                                            className={`nav-sublink ${isActive(child.path) ? 'active' : ''}`}
                                            onClick={() => handleNavClick(child.path)}
                                        >
                                            {child.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>
        </aside>
    )
}
