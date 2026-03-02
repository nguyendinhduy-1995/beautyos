import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    FiCalendar, FiHeart, FiDollarSign, FiUsers, FiLayers,
    FiCreditCard, FiPackage, FiTrendingUp, FiSmartphone,
    FiLink, FiUser, FiSettings, FiBarChart2, FiChevronDown,
    FiRepeat, FiX, FiZap, FiMessageSquare, FiFileText,
    FiGift, FiGitBranch, FiTarget, FiShield, FiCamera,
    FiClipboard, FiGlobe, FiPercent, FiBox, FiMonitor,
    FiCrosshair, FiCpu, FiActivity, FiEdit3, FiUserCheck,
    FiPhoneCall, FiDroplet, FiHome, FiClock, FiAlertTriangle,
    FiBookOpen, FiMap, FiStar
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
            { id: 'membership', label: 'Thẻ Thành Viên', path: '/cards/membership' },
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
            { id: 'features', label: 'Tất cả tính năng', path: '/premium/features', icon: FiStar },
            // Tier 1 — Ưu tiên cao
            { id: 'ai-assistant', label: 'AI Tư vấn & Phân tích', path: '/premium/ai-assistant', icon: FiCpu },
            { id: 'sms-zns', label: 'SMS & ZNS Tự động', path: '/premium/sms-zns', icon: FiMessageSquare },
            { id: 'adv-reports', label: 'Báo cáo Nâng cao', path: '/premium/advanced-reports', icon: FiBarChart2 },
            { id: 'loyalty', label: 'Chương trình Loyalty', path: '/premium/loyalty', icon: FiGift },
            // Tier 2 — Quan trọng
            { id: 'crm', label: 'CRM Automation', path: '/premium/crm-automation', icon: FiRepeat },
            { id: 'multi-branch', label: 'Đa chi nhánh', path: '/premium/multi-branch', icon: FiGitBranch },
            { id: 'kpi', label: 'KPI Nhân viên', path: '/premium/staff-kpi', icon: FiTarget },
            { id: 'security', label: 'Bảo mật Nâng cao', path: '/premium/security', icon: FiShield },
            // Tier 3 — Mở rộng
            { id: 'before-after', label: 'Before/After Gallery', path: '/premium/before-after', icon: FiCamera },
            { id: 'emr', label: 'Hồ sơ Điện tử (EMR)', path: '/premium/emr', icon: FiClipboard },
            { id: 'booking', label: 'Đặt lịch Online', path: '/premium/booking-online', icon: FiGlobe },
            { id: 'affiliate', label: 'Hoa hồng CTV', path: '/premium/affiliate', icon: FiPercent },
            { id: 'smart-inv', label: 'Kho Thông minh', path: '/premium/smart-inventory', icon: FiBox },
            { id: 'white-label', label: 'App White-label', path: '/premium/white-label', icon: FiMonitor },
            { id: 'pixel', label: 'Pixel & UTM Tracking', path: '/premium/pixel-tracking', icon: FiCrosshair },
            { id: 'ads-meta', label: 'Ads Manager Meta AI', path: '/premium/ads-meta', icon: FiTrendingUp },
            // Tier 4 — AI Modules
            { id: 'ai-tax', label: 'AI Thuế Thông tư', path: '/premium/ai-tax', icon: FiFileText },
            { id: 'ai-inventory', label: 'Kho AI 100%', path: '/premium/ai-inventory', icon: FiPackage },
            { id: 'ai-content', label: 'Content AI', path: '/premium/content-ai', icon: FiEdit3 },
            { id: 'ai-hr', label: 'Nhân sự AI', path: '/premium/ai-hr', icon: FiUserCheck },
            { id: 'ai-revenue', label: 'Doanh thu AI', path: '/premium/ai-revenue', icon: FiDollarSign },
            { id: 'ai-telesales', label: 'Telesales AI', path: '/premium/ai-telesales', icon: FiPhoneCall },
            { id: 'ai-skin', label: 'AI Phân tích Da', path: '/premium/ai-skin', icon: FiActivity },
            { id: 'ai-homecare', label: 'AI Homecare', path: '/premium/ai-homecare', icon: FiHome },
            { id: 'ai-schedule', label: 'AI Tối ưu Lịch', path: '/premium/ai-schedule', icon: FiClock },
            { id: 'ai-churn', label: 'AI Dự đoán Churn', path: '/premium/ai-churn', icon: FiAlertTriangle },
            { id: 'ai-training', label: 'AI Training KTV', path: '/premium/ai-training', icon: FiBookOpen },
            { id: 'ai-consumable', label: 'AI Vật tư Tiêu hao', path: '/premium/ai-consumable', icon: FiDroplet },
            { id: 'ai-journey', label: 'AI Hành trình KH 360°', path: '/premium/ai-journey', icon: FiMap },
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
                                    {item.children.map(child => {
                                        const ChildIcon = child.icon
                                        return (
                                            <a
                                                key={child.id}
                                                className={`nav-sublink ${isActive(child.path) ? 'active' : ''}`}
                                                onClick={() => handleNavClick(child.path)}
                                                style={ChildIcon ? { display: 'flex', alignItems: 'center', gap: 6 } : undefined}
                                            >
                                                {ChildIcon && <ChildIcon size={12} style={{ flexShrink: 0, opacity: 0.6 }} />}
                                                {child.label}
                                            </a>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>
        </aside>
    )
}
