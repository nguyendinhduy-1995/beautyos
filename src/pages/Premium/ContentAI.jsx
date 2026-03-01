import { useState } from 'react'
import { FiEdit3, FiCopy, FiRefreshCw, FiSend, FiInstagram, FiMessageCircle, FiGlobe, FiZap, FiImage } from 'react-icons/fi'

const templates = [
    { id: 1, type: 'post', platform: 'Facebook', title: 'Ưu đãi Nâng cơ Hifu -30%', content: '✨ Nâng cơ Hifu công nghệ mới nhất! Giảm 30% tháng 3 cho 20 khách đầu tiên.\n\n🔥 Kết quả ngay sau 1 lần\n💎 Không đau, không nghỉ dưỡng\n📞 Đặt lịch: 028 3821 1234\n\n#BeautyOS #NangCoHifu #ThamMyVien', status: 'ready', engagement: '1.2K' },
    { id: 2, type: 'post', platform: 'Instagram', title: 'Before/After Trị mụn', content: '🌟 KẾT QUẢ SAU 3 LIỆU TRÌNH\n\nKhách hàng M.L, 24 tuổi\n✅ Mụn viêm giảm 90%\n✅ Sẹo thâm mờ 80%\n✅ Da đều màu, khỏe mạnh\n\n📍 BeautyOS Clinic Q.1\n#TriMun #DaDepKhoeMasc #BeautyOS', status: 'ready', engagement: '2.5K' },
    { id: 3, type: 'sms', platform: 'SMS', title: 'Nhắc lịch hẹn', content: 'Chào {tên}, bạn có lịch hẹn {dịch vụ} lúc {giờ} ngày {ngày} tại BeautyOS. Xác nhận: reply YES. Hủy: reply NO. Hotline: 028 3821 1234', status: 'template', engagement: '87%' },
    { id: 4, type: 'email', platform: 'Email', title: 'Newsletter tháng 3', content: 'Kính chào Quý khách,\n\nTháng 3 - Tháng của phái đẹp!\n\n🌸 Ưu đãi 8/3: Giảm 20% tất cả dịch vụ\n🎁 Tặng 1 buổi chăm sóc da khi giới thiệu bạn bè\n💝 Combo Valentine: Nâng cơ + Filler chỉ 8.888K', status: 'draft', engagement: '45%' },
    { id: 5, type: 'post', platform: 'TikTok', title: 'Review Mesotherapy', content: '🎬 AI gợi ý script:\n\nHook: "Bí quyết da căng bóng không cần phẫu thuật"\n\n1. Giới thiệu vấn đề (5s)\n2. Quy trình Mesotherapy (15s)\n3. Kết quả Before/After (10s)\n4. CTA: Đặt lịch ngay (5s)\n\nBGM: Trending sound #skincare', status: 'ready', engagement: '5.8K' },
]

const aiIdeas = [
    '🔥 "5 dấu hiệu da cần Mesotherapy ngay" — Topic trending, CTR dự kiến 4.2%',
    '💡 "So sánh Hifu vs RF — Cái nào phù hợp bạn?" — Dạng comparison, engagement cao',
    '📸 Carousel before/after 5 khách hàng tháng 2 — Proof xã hội mạnh',
    '🎯 "Quy trình chăm sóc da sau filler" — Keyword search volume cao',
]

const platformColors = { Facebook: '#1877f2', Instagram: '#e4405f', SMS: '#059669', Email: '#f59e0b', TikTok: '#000000' }

export default function ContentAI() {
    const [filter, setFilter] = useState('all')
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const filtered = filter === 'all' ? templates : templates.filter(t => t.platform.toLowerCase() === filter)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #e11d48, #fb7185)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiEdit3 size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Content AI</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>AI viết content • Gợi ý ý tưởng • Đa nền tảng</p>
                    </div>
                    <button style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiZap size={14} /> Tạo content AI
                    </button>
                </div>
            </div>

            {/* AI Ideas */}
            <div style={{ background: '#fff1f2', borderRadius: 12, border: '1px solid #fecdd3', padding: '14px 18px', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#be123c', marginBottom: 8 }}>🤖 AI gợi ý tuần này</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {aiIdeas.map((idea, i) => (
                        <div key={i} style={{ fontSize: 12, color: '#881337', lineHeight: 1.5, padding: '6px 10px', background: 'white', borderRadius: 8 }}>{idea}</div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {['all', 'facebook', 'instagram', 'tiktok', 'sms', 'email'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                        fontSize: 12, fontWeight: 600, background: filter === f ? '#e11d48' : '#f1f5f9', color: filter === f ? 'white' : '#64748b',
                        textTransform: 'capitalize',
                    }}>{f === 'all' ? 'Tất cả' : f}</button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedTemplate ? '1fr 400px' : 'repeat(2, 1fr)', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map(t => (
                        <div key={t.id} onClick={() => setSelectedTemplate(t)} style={{
                            background: 'white', borderRadius: 14, border: `1px solid ${selectedTemplate?.id === t.id ? '#e11d48' : '#e5e7eb'}`, padding: '16px 20px', cursor: 'pointer',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: platformColors[t.platform] + '15', color: platformColors[t.platform] }}>{t.platform}</span>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: t.status === 'ready' ? '#ecfdf5' : t.status === 'draft' ? '#fffbeb' : '#f1f5f9', color: t.status === 'ready' ? '#059669' : t.status === 'draft' ? '#d97706' : '#64748b' }}>
                                    {t.status === 'ready' ? '✓ Sẵn sàng' : t.status === 'draft' ? '✏ Nháp' : '📋 Template'}
                                </span>
                                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>{t.engagement} tương tác</span>
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{t.title}</div>
                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, maxHeight: 40, overflow: 'hidden' }}>{t.content.substring(0, 100)}...</div>
                        </div>
                    ))}
                </div>

                {selectedTemplate && (
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: 20, position: 'sticky', top: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: platformColors[selectedTemplate.platform] + '15', color: platformColors[selectedTemplate.platform] }}>{selectedTemplate.platform}</span>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCopy size={13} color="#64748b" /></button>
                                <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiRefreshCw size={13} color="#64748b" /></button>
                            </div>
                        </div>
                        <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>{selectedTemplate.title}</h3>
                        <pre style={{ margin: '0 0 16px', fontSize: 12, color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family)', background: '#f8fafc', padding: 14, borderRadius: 10 }}>{selectedTemplate.content}</pre>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: '#e11d48', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                <FiSend size={13} /> Đăng ngay
                            </button>
                            <button style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b' }}>
                                <FiEdit3 size={13} /> Sửa
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
