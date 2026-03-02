import { useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FiCalendar, FiUsers, FiDollarSign, FiPackage, FiMenu } from 'react-icons/fi'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

// Mobile layout fixer — automatically fixes inline styles on mobile
function useMobileLayoutFixer(isMobile, pathname) {
    const contentRef = useRef(null)

    const fixElement = useCallback((el) => {
        if (!isMobile) return
        const s = el.style
        if (!s || el.dataset.noMobileFix || el.closest('[data-no-mobile-fix]')) return
        const tag = el.tagName?.toLowerCase()
        const isContainer = tag === 'div' || tag === 'section' || tag === 'article'

        if (!isContainer) return

        // Fix flex containers
        if (s.display === 'flex') {
            const h = parseInt(s.height)
            if (h && h <= 30) return // skip progress bars

            // Time slot / scrollable row with many children
            if (s.width === '100%' && s.borderRadius && s.padding && el.children.length > 2) {
                s.overflowX = 'auto'
                s.WebkitOverflowScrolling = 'touch'
                s.flexWrap = 'nowrap'
                s.scrollbarWidth = 'none'
                Array.from(el.children).forEach(c => {
                    c.style.flexShrink = '0'
                    c.style.minWidth = '100px'
                })
                return
            }

            // Tab bars
            if (s.borderBottom && s.borderBottom.includes('2px')) {
                s.overflowX = 'auto'
                s.flexWrap = 'nowrap'
                s.scrollbarWidth = 'none'
                Array.from(el.children).forEach(c => {
                    c.style.flexShrink = '0'
                    c.style.whiteSpace = 'nowrap'
                })
                return
            }

            // Top-level page header → stack
            if (s.justifyContent === 'space-between') {
                const p = el.parentElement
                if (p && (p.classList?.contains('fade-in') || p.parentElement?.classList?.contains('fade-in'))) {
                    if (el.children.length >= 2) {
                        s.flexDirection = 'column'
                        s.alignItems = 'stretch'
                        s.gap = '10px'
                        return
                    }
                }
            }

            // Wrap flex with gap and multiple children
            if (el.children.length > 2 && s.gap) {
                s.flexWrap = 'wrap'
            }
            s.maxWidth = '100%'
        }

        // Fix grids → 2 columns
        if (s.display === 'grid') {
            const cols = s.gridTemplateColumns
            if (cols && /repeat\([3-9]/.test(cols)) {
                s.gridTemplateColumns = 'repeat(2, 1fr)'
            }
            s.maxWidth = '100%'
        }

        // Fix large fixed widths → fluid
        const w = parseInt(s.width)
        if (w && w >= 250 && !s.width.includes('%') && !s.width.includes('vw') && !s.width.includes('calc')) {
            s.width = '100%'
            s.maxWidth = '100%'
            s.minWidth = '0'
        }

        // Fix large min-widths
        const mw = parseInt(s.minWidth)
        if (mw && mw >= 200) {
            s.minWidth = '0'
        }

        // Fix side panels
        if (s.borderRight && w && w >= 250) {
            s.width = '100%'
            s.borderRight = 'none'
            s.borderBottom = '1px solid #e5e7eb'
        }

        // Fix full-height
        if (s.height && s.height.includes('calc(100vh')) {
            s.height = 'auto'
        }

        // Fix dropdown menus
        if (s.position === 'absolute') {
            const dw = parseInt(s.width)
            if (dw && dw >= 280) {
                s.position = 'fixed'
                s.top = '48px'
                s.left = '8px'
                s.right = '8px'
                s.width = 'auto'
                s.maxWidth = 'calc(100vw - 16px)'
                s.maxHeight = '75vh'
            }
        }
    }, [isMobile])

    useEffect(() => {
        if (!isMobile || !contentRef.current) return

        const fixAll = () => {
            const els = contentRef.current.querySelectorAll('[style]')
            els.forEach(fixElement)
        }

        // Fix on initial render
        fixAll()

        // Fix on DOM mutations (dynamic content)
        const observer = new MutationObserver(() => {
            requestAnimationFrame(fixAll)
        })

        observer.observe(contentRef.current, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        })

        return () => observer.disconnect()
    }, [isMobile, fixElement, pathname])

    return contentRef
}


const routeTitles = {
    '/appointments/daily': { title: 'Lịch Hẹn', subtitle: 'Trong Ngày' },
    '/appointments/by-date': { title: 'Lịch Hẹn', subtitle: 'Theo Ngày' },
    '/appointments/calendar': { title: 'Lịch Hẹn', subtitle: 'Calendar' },
    '/appointments/doctor': { title: 'Lịch Hẹn', subtitle: 'Lịch Hẹn Bác Sĩ' },
    '/appointments/waiting': { title: 'Lịch Hẹn', subtitle: 'Màn hình đợi' },
    '/appointments/realtime': { title: 'Lịch Hẹn', subtitle: 'Theo thời gian thực' },
    '/care/followup': { title: 'Chăm Sóc', subtitle: 'Nhắc lịch hẹn' },
    '/care/no-show': { title: 'Chăm Sóc', subtitle: 'Khách không đến' },
    '/care/post-care': { title: 'Chăm Sóc', subtitle: 'Chăm sóc sau' },
    '/care/birthday': { title: 'Chăm Sóc', subtitle: 'Sinh nhật' },
    '/care/complaints': { title: 'Chăm Sóc', subtitle: 'Khiếu nại' },
    '/care/cancelled': { title: 'Chăm Sóc', subtitle: 'Lịch hẹn hủy' },
    '/care/periodic': { title: 'Chăm Sóc', subtitle: 'Chăm sóc định kỳ' },
    '/care/customer-support': { title: 'Chăm Sóc', subtitle: 'Hỗ trợ Khách Hàng' },
    '/care/self': { title: 'Chăm Sóc', subtitle: 'Khách Hàng' },
    '/accounting/cash-flow': { title: 'Kế Toán', subtitle: 'Lịch Sử Thu Chi' },
    '/accounting/supplier': { title: 'Kế Toán', subtitle: 'Công nợ NCC' },
    '/accounting/closing': { title: 'Kế Toán', subtitle: 'Chốt ca' },
    '/accounting/cashbook': { title: 'Kế Toán', subtitle: 'Sổ quỹ' },
    '/customers/list': { title: 'Khách Hàng', subtitle: 'Danh Sách' },
    '/customers/rooms': { title: 'Khách Hàng', subtitle: 'Trạng thái phòng' },
    '/customers/profile': { title: 'Khách Hàng', subtitle: 'Bộ hồ sơ' },
    '/customers/referrers': { title: 'Khách Hàng', subtitle: 'Người Giới Thiệu' },
    '/customers/create': { title: 'Khách Hàng', subtitle: 'Tạo Mới' },
    '/services/catalog': { title: 'Dịch Vụ', subtitle: 'Danh Mục DV' },
    '/services/combos': { title: 'Dịch Vụ', subtitle: 'Combo' },
    '/services/prescriptions': { title: 'Dịch Vụ', subtitle: 'Toa thuốc' },
    '/cards/list': { title: 'Thẻ', subtitle: 'Danh Sách Thẻ' },
    '/cards/membership': { title: 'Thẻ', subtitle: 'Thẻ thành viên' },
    '/cards/custom': { title: 'Thẻ', subtitle: 'Thẻ Tự Chọn' },
    '/cards/history': { title: 'Thẻ', subtitle: 'Lịch Sử Card' },
    '/cards/packages': { title: 'Thẻ', subtitle: 'Gói Liệu Trình' },
    '/cards/prepaid': { title: 'Thẻ', subtitle: 'Thẻ trả trước' },
    '/cards/status': { title: 'Thẻ', subtitle: 'Tình Trạng Thẻ' },
    '/inventory/stock': { title: 'Kho', subtitle: 'Tồn kho' },
    '/inventory/import': { title: 'Kho', subtitle: 'Nhập kho' },
    '/inventory/export': { title: 'Kho', subtitle: 'Xuất Vật Tư' },
    '/inventory/batch': { title: 'Kho', subtitle: 'Lô hàng' },
    '/inventory/lookup': { title: 'Kho', subtitle: 'Tra cứu biến động' },
    '/inventory/closing': { title: 'Kho', subtitle: 'Chốt Kho' },
    '/inventory/materials': { title: 'Kho', subtitle: 'Nguyên Vật Liệu' },
    '/inventory/settings': { title: 'Kho', subtitle: 'Cài Đặt' },
    '/inventory/management': { title: 'Kho', subtitle: 'Quản Lý Kho' },
    '/inventory/requests': { title: 'Kho', subtitle: 'Phiếu Yêu Cầu' },
    '/marketing/tickets': { title: 'Marketing', subtitle: 'Ticket List' },
    '/marketing/campaigns': { title: 'Marketing', subtitle: 'Chiến dịch' },
    '/marketing/promotions': { title: 'Marketing', subtitle: 'Khuyến mãi' },
    '/marketing/voucher': { title: 'Marketing', subtitle: 'Voucher' },
    '/marketing/ticket-tags': { title: 'Marketing', subtitle: 'Ticket Tags' },
    '/marketing/ticket-transfer': { title: 'Marketing', subtitle: 'Chuyển Ticket' },
    '/marketing/ticket-files': { title: 'Marketing', subtitle: 'Ticket Files' },
    '/marketing/deleted-tickets': { title: 'Marketing', subtitle: 'Ticket Đã Xóa' },
    '/marketing/ticket-store': { title: 'Marketing', subtitle: 'Ticket Store' },
    '/marketing/ticket-filter': { title: 'Marketing', subtitle: 'Lọc Ticket' },
    '/marketing/settings': { title: 'Marketing', subtitle: 'Cài Đặt' },
    '/marketing/customer-filter': { title: 'Marketing', subtitle: 'Lọc Khách Hàng' },
    '/mobile/overview': { title: 'Mobile & Website', subtitle: 'Tổng quan' },
    '/mobile/notifications': { title: 'Mobile & Website', subtitle: 'Thông báo' },
    '/mobile/config': { title: 'Mobile & Website', subtitle: 'Cấu hình' },
    '/mobile/banner': { title: 'Mobile & Website', subtitle: 'Banner' },
    '/mobile/news': { title: 'Mobile & Website', subtitle: 'Tin tức' },
    '/mobile/voucher': { title: 'Mobile & Website', subtitle: 'Voucher' },
    '/mobile/booking': { title: 'Mobile & Website', subtitle: 'Đặt lịch' },
    '/mobile/contact': { title: 'Mobile & Website', subtitle: 'Liên hệ' },
    '/mobile/feedback': { title: 'Mobile & Website', subtitle: 'Phản hồi' },
    '/mobile/accounts': { title: 'Mobile & Website', subtitle: 'Tài khoản' },
    '/mobile/video': { title: 'Mobile & Website', subtitle: 'Video' },
    '/mobile/blog': { title: 'Mobile & Website', subtitle: 'Blog' },
    '/mobile/faq': { title: 'Mobile & Website', subtitle: 'FAQ' },
    '/integration/sms-history': { title: 'Tích hợp', subtitle: 'Lịch sử SMS' },
    '/integration/sms-status': { title: 'Tích hợp', subtitle: 'Trạng thái SMS' },
    '/integration/call-history': { title: 'Tích hợp', subtitle: 'Lịch sử cuộc gọi' },
    '/staff/list': { title: 'Nhân Viên & User', subtitle: 'Danh Sách NV' },
    '/staff/payroll': { title: 'Nhân Viên & User', subtitle: 'Bảng Lương' },
    '/staff/schedule': { title: 'Nhân Viên & User', subtitle: 'Lịch làm việc' },
    '/staff/permissions': { title: 'Nhân Viên & User', subtitle: 'Phân quyền' },
    '/staff/discipline': { title: 'Nhân Viên & User', subtitle: 'Chế tài NV' },
    '/config/general': { title: 'Cấu Hình', subtitle: 'Cài đặt chung' },
    '/config/print': { title: 'Cấu Hình', subtitle: 'Mẫu in' },
    '/config/categories': { title: 'Cấu Hình', subtitle: 'Danh mục' },
    '/config/card': { title: 'Cấu Hình', subtitle: 'Config Card' },
    '/config/sms': { title: 'Cấu Hình', subtitle: 'Config SMS' },
    '/reports/overview': { title: 'Báo Cáo', subtitle: 'Tổng Quát' },
    '/reports/revenue': { title: 'Báo Cáo', subtitle: 'Doanh thu' },
    '/reports/list': { title: 'Báo Cáo', subtitle: 'Danh Sách Báo Cáo' },
    '/premium/features': { title: 'Tính năng nâng cao', subtitle: 'Premium Features' },
}

const bottomNavItems = [
    { id: 'appointments', label: 'Lịch Hẹn', icon: FiCalendar, path: '/appointments/daily', match: '/appointments' },
    { id: 'customers', label: 'Khách', icon: FiUsers, path: '/customers/list', match: '/customers' },
    { id: 'accounting', label: 'Kế Toán', icon: FiDollarSign, path: '/accounting/cash-flow', match: '/accounting' },
    { id: 'inventory', label: 'Kho', icon: FiPackage, path: '/inventory/management', match: '/inventory' },
    { id: 'menu', label: 'Menu', icon: FiMenu, path: null, match: null },
]

export default function MainLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (!mobile) setMobileSidebarOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close mobile sidebar on navigation
    useEffect(() => {
        if (isMobile) setMobileSidebarOpen(false)
    }, [location.pathname])

    const contentRef = useMobileLayoutFixer(isMobile, location.pathname)
    const routeInfo = routeTitles[location.pathname] || { title: 'BeautyOS', subtitle: 'Dashboard' }

    const handleToggleSidebar = () => {
        if (isMobile) {
            setMobileSidebarOpen(!mobileSidebarOpen)
        } else {
            setSidebarCollapsed(!sidebarCollapsed)
        }
    }

    const handleBottomNavClick = (item) => {
        if (item.id === 'menu') {
            setMobileSidebarOpen(true)
        } else if (item.path) {
            navigate(item.path)
        }
    }

    const isBottomNavActive = (item) => {
        if (!item.match) return false
        return location.pathname.startsWith(item.match)
    }

    return (
        <div className="app-layout">
            {/* Mobile sidebar overlay backdrop */}
            {isMobile && (
                <div
                    className={`sidebar-overlay ${mobileSidebarOpen ? 'visible' : ''}`}
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            <Sidebar
                collapsed={isMobile ? false : sidebarCollapsed}
                onToggle={handleToggleSidebar}
                mobileOpen={mobileSidebarOpen}
                isMobile={isMobile}
                onCloseMobile={() => setMobileSidebarOpen(false)}
            />

            <div className="main-wrapper">
                <TopBar
                    title={routeInfo.title}
                    subtitle={routeInfo.subtitle}
                    onToggleSidebar={handleToggleSidebar}
                    isMobile={isMobile}
                />
                <main className="main-content fade-in" key={location.pathname} ref={contentRef}>
                    <Outlet />
                </main>
            </div>

            {/* Bottom Navigation for mobile */}
            <nav className="bottom-nav">
                {bottomNavItems.map(item => {
                    const Icon = item.icon
                    return (
                        <button
                            key={item.id}
                            className={`bottom-nav-item ${isBottomNavActive(item) ? 'active' : ''}`}
                            onClick={() => handleBottomNavClick(item)}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
