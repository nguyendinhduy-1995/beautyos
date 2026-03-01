import { useState } from 'react'
import {
    FiZap, FiMessageCircle, FiBarChart2, FiUsers,
    FiTrendingUp, FiShield, FiGlobe, FiCpu,
    FiCheck, FiArrowUpRight, FiLock, FiStar,
    FiCamera, FiFileText, FiCalendar, FiUserPlus,
    FiBox, FiSmartphone, FiTarget, FiDollarSign,
    FiPackage, FiEdit, FiUserCheck, FiPieChart, FiPhoneCall,
    FiKey, FiEye, FiHeart, FiClock, FiAlertTriangle,
    FiBookOpen, FiDroplet, FiNavigation, FiActivity
} from 'react-icons/fi'

const HUB_URL = 'https://hub.emarketervietnam.vn/hub/marketplace'

const premiumFeatures = [
    // ─── Featured: Ads Manager Meta AI ───
    {
        id: 'ai-ads-manager-meta',
        name: 'Ads Manager Meta AI',
        icon: FiActivity,
        price: 590000,
        color: '#1877f2',
        gradient: 'linear-gradient(135deg, #1877f2, #42b72a)',
        tier: 4,
        description: 'AI kết nối Meta Ads, đọc & diễn giải chỉ số (CPM, CPC, CPA, ROAS) bằng ngôn ngữ tự nhiên. Nhập mục tiêu → AI đề xuất chiến lược content, media, target tối ưu.',
        features: [
            'AI đọc & diễn giải chỉ số Ads bằng tiếng Việt',
            'Nhập mục tiêu → AI đề xuất chiến lược tối ưu',
            'Đề xuất content, media & target phù hợp',
            'Cảnh báo CPL tăng & đề xuất điều chỉnh budget',
        ],
        popular: true,
    },

    // ─── Tier 1: Ưu tiên cao ───
    {
        id: 'ai-assistant',
        name: 'AI Tư vấn & Phân tích',
        icon: FiCpu,
        price: 290000,
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
        tier: 1,
        description: 'Trợ lý AI tư vấn dịch vụ, phân tích hành vi khách hàng, gợi ý upsell thông minh dựa trên lịch sử điều trị.',
        features: [
            'Gợi ý dịch vụ phù hợp cho từng khách',
            'Dự đoán khách quay lại (scoring)',
            'Chatbot tự động trả lời khách hàng',
            'Phân tích xu hướng doanh thu theo mùa',
        ],
        popular: true,
    },
    {
        id: 'sms-zns-auto',
        name: 'SMS & ZNS Tự động',
        icon: FiMessageCircle,
        price: 190000,
        color: '#059669',
        gradient: 'linear-gradient(135deg, #059669, #34d399)',
        tier: 1,
        description: 'Tự động gửi SMS/ZNS nhắc lịch hẹn, chúc sinh nhật, thông báo khuyến mãi theo kịch bản.',
        features: [
            'Nhắc lịch hẹn tự động trước 1h/24h',
            'Chúc sinh nhật kèm voucher tự động',
            'Gửi ZNS theo kịch bản tùy chỉnh',
            'Thống kê tỉ lệ mở & phản hồi',
        ],
    },
    {
        id: 'advanced-reports',
        name: 'Báo cáo Nâng cao',
        icon: FiBarChart2,
        price: 190000,
        color: '#2563eb',
        gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)',
        tier: 1,
        description: 'Báo cáo chuyên sâu với đồ thị trực quan, so sánh hiệu suất nhân viên, phân tích P&L.',
        features: [
            'Dashboard trực quan nâng cao',
            'So sánh hiệu suất nhân viên',
            'Phân tích chi phí vs doanh thu (P&L)',
            'Xuất PDF/Excel tự động hàng tuần',
        ],
    },
    {
        id: 'loyalty-program',
        name: 'Chương trình Loyalty',
        icon: FiStar,
        price: 290000,
        color: '#d97706',
        gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
        tier: 1,
        description: 'Hệ thống tích điểm, nâng hạng tự động, phần thưởng giữ chân khách hàng hiệu quả.',
        features: [
            'Tích điểm theo chi tiêu (1đ = 10.000đ)',
            'Nâng hạng tự động Silver → Platinum',
            'Đổi điểm lấy voucher/dịch vụ',
            'Thông báo điểm sắp hết hạn',
        ],
        popular: true,
    },

    // ─── Tier 2: Cần phát triển thêm ───
    {
        id: 'crm-automation',
        name: 'CRM Automation',
        icon: FiTrendingUp,
        price: 390000,
        color: '#dc2626',
        gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
        tier: 2,
        description: 'Quy trình chăm sóc tự động toàn bộ hành trình khách hàng từ lần đầu đến tái khám.',
        features: [
            'Workflow chăm sóc theo giai đoạn',
            'Phân nhóm khách chưa quay lại 30/60/90 ngày',
            'Lead nurturing tự động từ ticket',
            'Pipeline view dạng Kanban',
        ],
    },
    {
        id: 'multi-branch',
        name: 'Quản lý Đa chi nhánh',
        icon: FiGlobe,
        price: 490000,
        color: '#0891b2',
        gradient: 'linear-gradient(135deg, #0891b2, #22d3ee)',
        tier: 2,
        description: 'Quản lý nhiều cơ sở từ 1 bảng điều khiển, đồng bộ dữ liệu, chuyển lịch hẹn giữa chi nhánh.',
        features: [
            'Dashboard tổng hợp tất cả chi nhánh',
            'Chuyển lịch hẹn giữa cơ sở',
            'Đồng bộ dịch vụ & bảng giá',
            'Phân quyền theo chi nhánh',
        ],
    },
    {
        id: 'staff-kpi',
        name: 'KPI Nhân viên',
        icon: FiUsers,
        price: 190000,
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
        tier: 2,
        description: 'Theo dõi KPI nhân viên theo doanh số, lượt khách, đánh giá và bảng xếp hạng realtime.',
        features: [
            'Bảng KPI theo ngày/tuần/tháng',
            'Xếp hạng nhân viên realtime',
            'Tính hoa hồng tự động',
            'Đánh giá 360° từ khách hàng',
        ],
    },
    {
        id: 'security-advanced',
        name: 'Bảo mật Nâng cao',
        icon: FiShield,
        price: 150000,
        color: '#475569',
        gradient: 'linear-gradient(135deg, #475569, #94a3b8)',
        tier: 2,
        description: 'Two-Factor Authentication, log hoạt động, sao lưu dữ liệu tự động, phân quyền chi tiết.',
        features: [
            'Xác thực 2 bước (2FA)',
            'Log hoạt động chi tiết',
            'Sao lưu dữ liệu tự động hàng ngày',
            'Khôi phục dữ liệu 30 ngày',
        ],
    },

    // ─── Tier 3: Tính năng mới ───
    {
        id: 'before-after',
        name: 'Before/After Gallery',
        icon: FiCamera,
        price: 190000,
        color: '#e11d48',
        gradient: 'linear-gradient(135deg, #e11d48, #fb7185)',
        tier: 3,
        description: 'Chụp ảnh trước/sau điều trị, timeline tiến trình khách hàng, xuất ảnh có watermark.',
        features: [
            'Upload ảnh trước/sau mỗi lần điều trị',
            'Timeline tiến trình khách hàng',
            'Xuất ảnh watermark cho marketing',
            'Quản lý consent chia sẻ hình ảnh',
        ],
    },
    {
        id: 'emr',
        name: 'Hồ sơ Điện tử (EMR)',
        icon: FiFileText,
        price: 390000,
        color: '#0d9488',
        gradient: 'linear-gradient(135deg, #0d9488, #5eead4)',
        tier: 3,
        description: 'Bệnh án điện tử đầy đủ: chẩn đoán, tiền sử, dị ứng, ký số, mã ICD-10.',
        features: [
            'Bệnh án điện tử toàn diện',
            'Ký số trên toa thuốc',
            'Tích hợp mã ICD-10',
            'Chia sẻ hồ sơ qua email/Zalo',
        ],
    },
    {
        id: 'online-booking',
        name: 'Đặt lịch Online',
        icon: FiCalendar,
        price: 290000,
        color: '#ea580c',
        gradient: 'linear-gradient(135deg, #ea580c, #fb923c)',
        tier: 3,
        description: 'Widget đặt lịch embed vào website/fanpage, khách tự chọn bác sĩ, time slot, đặt cọc online.',
        features: [
            'Widget đặt lịch embed website',
            'Chọn bác sĩ & time slot khả dụng',
            'Thanh toán đặt cọc 30% online',
            'Auto-sync với hệ thống lịch hẹn',
        ],
    },
    {
        id: 'referral-commission',
        name: 'Hoa hồng CTV',
        icon: FiUserPlus,
        price: 190000,
        color: '#4f46e5',
        gradient: 'linear-gradient(135deg, #4f46e5, #818cf8)',
        tier: 3,
        description: 'Hệ thống hoa hồng cộng tác viên đa tầng, dashboard CTV tự xem, rút tiền tự động.',
        features: [
            'Cây giới thiệu (referral chain)',
            'Hoa hồng đa tầng Level 1-2',
            'Dashboard riêng cho CTV',
            'Rút tiền khi đủ threshold',
        ],
    },
    {
        id: 'smart-inventory',
        name: 'Kho Thông minh',
        icon: FiBox,
        price: 190000,
        color: '#b45309',
        gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
        tier: 3,
        description: 'Cảnh báo hết hàng, hết hạn, đề xuất nhập hàng AI, quét mã vạch nhập/xuất nhanh.',
        features: [
            'Cảnh báo khi quantity < minStock',
            'Cảnh báo hết hạn 30/60/90 ngày',
            'AI đề xuất nhập hàng theo usage',
            'Quét mã vạch nhập/xuất nhanh',
        ],
    },
    {
        id: 'white-label-app',
        name: 'App White-label',
        icon: FiSmartphone,
        price: 490000,
        color: '#7e22ce',
        gradient: 'linear-gradient(135deg, #7e22ce, #c084fc)',
        tier: 3,
        description: 'App khách hàng mang thương hiệu riêng: đặt lịch, xem lịch sử, nhận push notification.',
        features: [
            'App riêng logo & màu thương hiệu',
            'Khách tự đặt lịch từ app',
            'Xem lịch sử thanh toán & dịch vụ',
            'Push notification nhắc hẹn',
        ],
    },
    {
        id: 'pixel-tracking',
        name: 'Pixel & UTM Tracking',
        icon: FiTarget,
        price: 190000,
        color: '#16a34a',
        gradient: 'linear-gradient(135deg, #16a34a, #4ade80)',
        tier: 3,
        description: 'Gắn Facebook Pixel, Google Analytics vào booking, theo dõi UTM, tính ROI chiến dịch realtime.',
        features: [
            'Facebook Pixel integration',
            'Google Analytics conversion',
            'UTM tracking cho mỗi lead',
            'ROAS realtime từ campaigns',
        ],
    },

    // ─── Tier 4: AI-Powered (mới) ───
    {
        id: 'ai-tax',
        name: 'Thuế Theo Thông Tư (AI)',
        icon: FiDollarSign,
        price: 390000,
        color: '#0369a1',
        gradient: 'linear-gradient(135deg, #0369a1, #38bdf8)',
        tier: 4,
        description: 'AI tự động cập nhật thông tư thuế mới nhất, tính toán thuế TNCN, GTGT, TNDN chính xác theo quy định hiện hành.',
        features: [
            'Tự động cập nhật thông tư thuế mới',
            'Tính thuế TNCN, GTGT, TNDN tự động',
            'Cảnh báo thay đổi quy định thuế',
            'Xuất báo cáo thuế theo mẫu chuẩn',
        ],
        popular: true,
    },
    {
        id: 'ai-inventory',
        name: 'Kho AI Tự động 100%',
        icon: FiPackage,
        price: 490000,
        color: '#c2410c',
        gradient: 'linear-gradient(135deg, #c2410c, #fb923c)',
        tier: 4,
        description: 'AI quản lý kho hoàn toàn tự động: dự đoán nhu cầu nhập, cảnh báo hết hạn, tối ưu tồn kho, đề xuất nhà cung cấp.',
        features: [
            'Dự đoán nhu cầu nhập hàng bằng AI',
            'Tự động tối ưu mức tồn kho',
            'Cảnh báo hết hạn & đề xuất xử lý',
            'So sánh & đề xuất nhà cung cấp tốt nhất',
        ],
        popular: true,
    },
    {
        id: 'ai-content',
        name: 'Content AI (Facebook & TikTok)',
        icon: FiEdit,
        price: 590000,
        color: '#be185d',
        gradient: 'linear-gradient(135deg, #be185d, #f472b6)',
        tier: 4,
        description: 'AI lên kế hoạch content ngày/tuần/tháng, tự động tạo hình ảnh bằng Google Banana, tạo video, đọc thông số Page và tối ưu chiến lược.',
        features: [
            'Lập kế hoạch content ngày/tuần/tháng',
            'Tự động tạo hình ảnh (Google Banana API)',
            'Tự động tạo video marketing',
            'Phân tích Page insights & tối ưu chiến lược',
        ],
    },
    {
        id: 'ai-hr',
        name: 'Phân tích Nhân sự AI',
        icon: FiUserCheck,
        price: 290000,
        color: '#4338ca',
        gradient: 'linear-gradient(135deg, #4338ca, #818cf8)',
        tier: 4,
        description: 'AI đánh giá hiệu suất nhân viên tự động, phát hiện xu hướng nghỉ việc, đề xuất lương thưởng, phân bổ ca tối ưu.',
        features: [
            'Đánh giá hiệu suất nhân viên tự động',
            'Dự đoán xu hướng nghỉ việc',
            'Đề xuất lương thưởng theo hiệu suất',
            'Phân bổ ca làm việc tối ưu bằng AI',
        ],
    },
    {
        id: 'ai-revenue',
        name: 'Phân tích Doanh thu AI',
        icon: FiPieChart,
        price: 290000,
        color: '#0f766e',
        gradient: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
        tier: 4,
        description: 'AI phân tích doanh thu chuyên sâu, dự đoán doanh thu tương lai, phát hiện dịch vụ tiềm năng, cảnh báo sớm sụt giảm.',
        features: [
            'Dự đoán doanh thu 30/60/90 ngày',
            'Phát hiện dịch vụ tiềm năng & sụt giảm',
            'Phân tích ROI từng dịch vụ',
            'Đề xuất chiến lược tăng doanh thu',
        ],
    },
    {
        id: 'ai-telesales',
        name: 'Quản lý Telesales AI',
        icon: FiPhoneCall,
        price: 390000,
        color: '#9333ea',
        gradient: 'linear-gradient(135deg, #9333ea, #c084fc)',
        tier: 4,
        description: 'AI quản lý telesales tự động: phân loại lead, gợi ý script, theo dõi cuộc gọi, đánh giá chất lượng tư vấn tự động.',
        features: [
            'AI phân loại & ưu tiên lead tự động',
            'Gợi ý script tư vấn theo từng khách',
            'Phân tích chất lượng cuộc gọi',
            'Tự động follow-up lead chưa chốt',
        ],
    },
    {
        id: 'ai-skin-analysis',
        name: 'AI Phân tích Da',
        icon: FiEye,
        price: 490000,
        color: '#e85d04',
        gradient: 'linear-gradient(135deg, #e85d04, #f4a261)',
        tier: 4,
        description: 'Khách chụp ảnh → AI phân tích tình trạng da (mụn, nám, lão hóa, độ ẩm) → gợi ý liệu trình phù hợp. Dùng Vision AI.',
        features: [
            'Chụp ảnh → AI phân tích da tự động',
            'Nhận diện mụn, nám, lão hóa, độ ẩm',
            'Gợi ý liệu trình cá nhân hóa',
            'Theo dõi tiến trình cải thiện da',
        ],
        popular: true,
    },
    {
        id: 'ai-homecare',
        name: 'AI Tư vấn Homecare',
        icon: FiHeart,
        price: 290000,
        color: '#d6336c',
        gradient: 'linear-gradient(135deg, #d6336c, #faa2c1)',
        tier: 4,
        description: 'Sau mỗi buổi điều trị, AI gợi ý sản phẩm chăm sóc tại nhà phù hợp với loại da & liệu trình, kèm link mua hàng.',
        features: [
            'Gợi ý sản phẩm theo loại da',
            'Lịch chăm sóc da tại nhà cá nhân hóa',
            'Nhắc sử dụng sản phẩm tự động',
            'Link mua hàng trực tiếp trên app',
        ],
    },
    {
        id: 'ai-schedule-optimize',
        name: 'AI Tối ưu Lịch hẹn',
        icon: FiClock,
        price: 390000,
        color: '#1971c2',
        gradient: 'linear-gradient(135deg, #1971c2, #74c0fc)',
        tier: 4,
        description: 'Phân tích peak hours, dự đoán no-show, tự sắp xếp lịch tối ưu phòng & nhân viên, giảm thời gian chờ.',
        features: [
            'Dự đoán tỉ lệ no-show & overbooking',
            'Tự động sắp xếp phòng & nhân viên',
            'Phân tích giờ cao/thấp điểm',
            'Gợi ý slot trống cho khách chờ',
        ],
    },
    {
        id: 'ai-churn-prediction',
        name: 'AI Dự đoán Churn',
        icon: FiAlertTriangle,
        price: 290000,
        color: '#e03131',
        gradient: 'linear-gradient(135deg, #e03131, #ff8787)',
        tier: 4,
        description: 'Phát hiện sớm khách có nguy cơ bỏ (giảm tần suất, feedback tiêu cực) → trigger chiến dịch win-back tự động.',
        features: [
            'Scoring nguy cơ mất khách tự động',
            'Cảnh báo khách không quay lại 30/60/90 ngày',
            'Tự động gửi ưu đãi win-back',
            'Phân tích nguyên nhân churn',
        ],
    },
    {
        id: 'ai-staff-training',
        name: 'AI Training Kỹ thuật viên',
        icon: FiBookOpen,
        price: 190000,
        color: '#5c7cfa',
        gradient: 'linear-gradient(135deg, #5c7cfa, #91a7ff)',
        tier: 4,
        description: 'AI gợi ý khóa đào tạo dựa trên feedback khách, tỉ lệ cancel, hiệu suất. Quiz AI kiểm tra kiến thức sản phẩm/dịch vụ.',
        features: [
            'Gợi ý đào tạo theo feedback khách',
            'Quiz AI kiểm tra kiến thức',
            'Lộ trình học cá nhân hóa cho từng nhân viên',
            'Báo cáo năng lực & đề xuất thăng tiến',
        ],
    },
    {
        id: 'ai-consumable-forecast',
        name: 'AI Dự đoán Vật tư Tiêu hao',
        icon: FiDroplet,
        price: 190000,
        color: '#20c997',
        gradient: 'linear-gradient(135deg, #20c997, #96f2d7)',
        tier: 4,
        description: 'Dự đoán chính xác lượng serum, mask, gel... cần dùng theo số booking, tránh lãng phí & thiếu hụt.',
        features: [
            'Dự đoán vật tư cần theo lịch hẹn',
            'Cảnh báo sắp hết vật tư tự động',
            'Thống kê lãng phí & tiết kiệm',
            'Đề xuất đặt hàng tối ưu theo mùa',
        ],
    },
    {
        id: 'ai-customer-journey',
        name: 'AI Hành trình Khách hàng 360°',
        icon: FiNavigation,
        price: 390000,
        color: '#0c8599',
        gradient: 'linear-gradient(135deg, #0c8599, #66d9e8)',
        tier: 4,
        description: 'Bản đồ toàn bộ touchpoint: quảng cáo → tư vấn → điều trị → homecare → tái khám. AI phát hiện điểm "rớt" và gợi ý cải thiện.',
        features: [
            'Bản đồ hành trình khách hàng toàn diện',
            'Phát hiện điểm rới khách (drop-off)',
            'Tối ưu chuyển đổi từng giai đoạn',
            'Thống kê LTV & giá trị vòng đời khách',
        ],
        popular: true,
    },
]

const TIER_LABELS = {
    1: { label: 'Ưu tiên cao', color: '#dc2626', bg: '#fef2f2' },
    2: { label: 'Phát triển', color: '#d97706', bg: '#fffbeb' },
    3: { label: 'Sắp ra mắt', color: '#6b7280', bg: '#f3f4f6' },
    4: { label: 'AI-Powered', color: '#7c3aed', bg: '#f5f3ff' },
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price)
}

export default function PremiumFeatures() {
    const [expandedId, setExpandedId] = useState(null)

    const handleActivate = () => {
        window.open(HUB_URL, '_blank')
    }

    const toggle = (id) => {
        setExpandedId(prev => prev === id ? null : id)
    }

    return (
        <div className="fade-in" data-no-mobile-fix>
            {/* ───── Hero Section ───── */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                borderRadius: 20, padding: '32px 32px 28px', marginBottom: 24,
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: -60, right: -40,
                    width: 200, height: 200, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -40, left: '30%',
                    width: 160, height: 160, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '5px 14px', borderRadius: 20,
                        background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)',
                        color: '#fbbf24', fontSize: 12, fontWeight: 600,
                        marginBottom: 16, letterSpacing: 0.5,
                    }}>
                        <FiZap size={13} />
                        PREMIUM ADD-ONS
                    </div>

                    <h1 style={{
                        fontSize: 22, fontWeight: 800, color: '#f8fafc',
                        margin: '0 0 8px', lineHeight: 1.3, letterSpacing: -0.5,
                    }}>
                        Nâng tầm trải nghiệm
                        <br />
                        <span style={{
                            background: 'linear-gradient(90deg, #a78bfa, #06b6d4, #34d399)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            với {premiumFeatures.length} tính năng Pro
                        </span>
                    </h1>

                    <p style={{
                        fontSize: 14, color: '#94a3b8', margin: '0 0 20px',
                        maxWidth: 460, lineHeight: 1.6,
                    }}>
                        Kích hoạt từng module riêng lẻ — chỉ trả phí cho những gì bạn cần.
                        Dùng thử 14 ngày miễn phí. Hủy bất cứ lúc nào.
                    </p>

                    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                        {[
                            { value: '29', label: 'Modules' },
                            { value: '150k', label: 'Từ/tháng' },
                            { value: '14', label: 'Ngày dùng thử' },
                        ].map((s, i) => (
                            <div key={i} style={{ minWidth: 70 }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', letterSpacing: -0.5 }}>{s.value}</div>
                                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ───── Feature Cards Grid ───── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 14,
            }}>
                {premiumFeatures.map(feature => {
                    const Icon = feature.icon
                    const isOpen = expandedId === feature.id
                    const tierInfo = TIER_LABELS[feature.tier]

                    return (
                        <div
                            key={feature.id}
                            onClick={() => toggle(feature.id)}
                            style={{
                                background: '#fff',
                                borderRadius: 14,
                                border: isOpen ? `2px solid ${feature.color}25` : '1px solid #e5e7eb',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                                boxShadow: isOpen ? `0 12px 40px ${feature.color}12` : '0 1px 3px rgba(0,0,0,0.04)',
                                position: 'relative',
                            }}
                        >
                            <div style={{ padding: '16px 18px 14px' }}>
                                {/* Icon + Title + Tier */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 10,
                                        background: feature.gradient,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontSize: 18, flexShrink: 0,
                                        boxShadow: `0 4px 12px ${feature.color}30`,
                                    }}>
                                        <Icon />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                                                {feature.name}
                                            </span>
                                            <span style={{
                                                fontSize: 10, fontWeight: 600,
                                                padding: '2px 8px', borderRadius: 6,
                                                background: tierInfo.bg, color: tierInfo.color,
                                            }}>
                                                {tierInfo.label}
                                            </span>
                                            {feature.popular && (
                                                <span style={{
                                                    padding: '2px 8px', borderRadius: 10,
                                                    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                                    color: 'white', fontSize: 10, fontWeight: 700,
                                                    letterSpacing: 0.3,
                                                }}>
                                                    PHỔ BIẾN
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4, marginTop: 4 }}>
                                            {feature.description.length > 70
                                                ? feature.description.substring(0, 70) + '…'
                                                : feature.description}
                                        </div>
                                    </div>
                                </div>

                                {/* Price bar */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '8px 12px', borderRadius: 8, background: '#f8fafc',
                                }}>
                                    <div>
                                        <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>
                                            {formatPrice(feature.price)}
                                        </span>
                                        <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 2 }}>đ/tháng</span>
                                    </div>
                                    <div style={{
                                        fontSize: 11, fontWeight: 500, color: '#64748b',
                                        display: 'flex', alignItems: 'center', gap: 4,
                                    }}>
                                        Chi tiết <FiArrowUpRight size={12} />
                                    </div>
                                </div>
                            </div>

                            {/* ───── Expanded section ───── */}
                            <div style={{
                                maxHeight: isOpen ? 700 : 0,
                                overflow: 'hidden',
                                transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
                            }}>
                                <div style={{ padding: '0 18px 16px', borderTop: '1px solid #f1f5f9' }}>
                                    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: '12px 0' }}>
                                        {feature.description}
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                                        {feature.features.map((f, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                fontSize: 13, color: '#334155',
                                            }}>
                                                <div style={{
                                                    width: 18, height: 18, borderRadius: 5,
                                                    background: `${feature.color}12`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}>
                                                    <FiCheck size={11} style={{ color: feature.color }} />
                                                </div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleActivate() }}
                                        style={{
                                            width: '100%', padding: '11px',
                                            borderRadius: 10, border: 'none',
                                            background: feature.gradient,
                                            color: 'white', fontWeight: 600, fontSize: 13,
                                            cursor: 'pointer', fontFamily: 'var(--font-family)',
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', gap: 8,
                                            boxShadow: `0 4px 14px ${feature.color}30`,
                                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-1px)'
                                            e.currentTarget.style.boxShadow = `0 6px 20px ${feature.color}40`
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)'
                                            e.currentTarget.style.boxShadow = `0 4px 14px ${feature.color}30`
                                        }}
                                    >
                                        Kích hoạt trên Hub
                                        <FiArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ───── Trust Badges ───── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
                padding: '20px 0 8px',
            }}>
                {[
                    { icon: <FiLock size={16} />, title: 'Thanh toán bảo mật', sub: 'SSL 256-bit encrypted', color: '#059669', bg: '#ecfdf5' },
                    { icon: <FiStar size={16} />, title: '14 ngày dùng thử', sub: 'Miễn phí, không ràng buộc', color: '#d97706', bg: '#fffbeb' },
                    { icon: <FiCheck size={16} />, title: 'Hủy bất cứ lúc nào', sub: 'Không phí hủy, tự động dừng', color: '#2563eb', bg: '#eff6ff' },
                    { icon: <FiMessageCircle size={16} />, title: 'Hỗ trợ 24/7', sub: 'Chat, Zalo, Hotline', color: '#7c3aed', bg: '#f5f3ff' },
                ].map((item, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '12px 14px', borderRadius: 12,
                        background: item.bg,
                        border: `1px solid ${item.color}18`,
                    }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: `${item.color}15`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: item.color, flexShrink: 0,
                        }}>
                            {item.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                                {item.title}
                            </div>
                            <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>
                                {item.sub}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
