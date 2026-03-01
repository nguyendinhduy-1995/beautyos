import { useState } from 'react'
import { FiEdit3, FiCopy, FiRefreshCw, FiThumbsUp, FiEye, FiInstagram, FiHash } from 'react-icons/fi'

const drafts = [
    { id: 1, platform: 'Facebook', type: 'Post quảng cáo', title: 'Da căng bóng – Không cần filter!', content: '✨ Bạn muốn có làn da tự nhiên rạng rỡ? Liệu trình Hydrafacial tại BeautyOS giúp bạn: \n🔹 Làm sạch sâu 7 bước\n🔹 Cấp ẩm tức thì\n🔹 Kết quả ngay lần đầu\n👉 Đặt lịch ngay hôm nay – Giảm 20% cho 50 KH đầu tiên!', hashtags: '#BeautyOS #Hydrafacial #DaCangBong #SPA', engagement: '3.2K reach dự kiến', score: 92 },
    { id: 2, platform: 'TikTok', type: 'Script video', title: 'GRWM – Quy trình chăm da tại spa', content: '🎬 Hook (0-3s): "POV: Bạn thử liệu trình 2 triệu tại spa"\n📍 Scene 1: Cận mặt trước điều trị\n📍 Scene 2: Quá trình điều trị (ASMR)\n📍 Scene 3: Kết quả before/after\n🎵 Sound: trending "Đẹp trai có gì sai"\n📝 Caption: Trải nghiệm liệu trình tại @BeautyOS – kết quả thật 100%!', hashtags: '#GRWM #SkinCare #SpaReview #BeautyTikTok', engagement: '15K views dự kiến', score: 88 },
    { id: 3, platform: 'Facebook', type: 'Story / Reel', title: 'Kết quả 30 ngày – Before & After', content: '📸 Slide 1: Before – Da sạm, mụn ẩn\n📸 Slide 2: Sau 2 tuần – Da sáng hơn\n📸 Slide 3: Sau 30 ngày – Da đều màu, căng bóng\n📝 Text overlay: "30 ngày thay đổi cùng BeautyOS"\n🔗 CTA: Swipe up để đặt lịch tư vấn FREE', hashtags: '#BeforeAfter #SkinTransformation #BeautyOS', engagement: '5.8K reach dự kiến', score: 95 },
    { id: 4, platform: 'TikTok', type: 'Trend format', title: 'Cái giá của sự xinh đẹp', content: '🎬 Hook: "Dân văn phòng chi bao nhiêu cho da?"\n💰 Scene 1: Skincare tại nhà → 500K/tháng\n💰 Scene 2: Spa cơ bản → 1.5 triệu/tháng\n💰 Scene 3: Liệu trình chuyên sâu → 2-5 triệu/tháng\n✅ Plot twist: "Nhưng da đẹp = tự tin = thăng tiến"\n🎵 Sound: trending "Money money money"', hashtags: '#CostOfBeauty #SkinCare #DânVănPhòng', engagement: '25K views dự kiến', score: 85 },
]

const calendar = [
    { day: 'T2', content: 'Tip skincare buổi sáng', platform: 'FB', status: 'posted' },
    { day: 'T3', content: 'Video GRWM tại spa', platform: 'TT', status: 'scheduled' },
    { day: 'T4', content: 'Before/After KH thật', platform: 'FB', status: 'draft' },
    { day: 'T5', content: 'Quiz: Biết da mình không?', platform: 'FB', status: 'draft' },
    { day: 'T6', content: 'Promo cuối tuần -15%', platform: 'Both', status: 'scheduled' },
    { day: 'T7', content: 'BTS spa session', platform: 'TT', status: 'draft' },
    { day: 'CN', content: 'Self-care Sunday tips', platform: 'FB', status: 'draft' },
]

export default function ContentAI() {
    const [tab, setTab] = useState('drafts')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #db2777, #f472b6)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiEdit3 size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Content AI</h2>
                        <p>Tạo nội dung Facebook & TikTok • Script video • Lịch đăng bài</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Bài nháp', v: drafts.length }, { l: 'TB Score', v: `${Math.round(drafts.reduce((s, d) => s + d.score, 0) / drafts.length)}%` }, { l: 'Lịch tuần', v: calendar.length }, { l: 'Đã đăng', v: calendar.filter(c => c.status === 'posted').length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'drafts', label: '✍️ AI Drafts' }, { id: 'calendar', label: '📅 Lịch đăng' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#db2777' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'drafts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="premium-alert" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', color: '#9d174d' }}>
                        <FiRefreshCw size={14} /> AI tạo nội dung dựa trên trend hiện tại + data spa của bạn
                    </div>
                    {drafts.map(d => (
                        <div key={d.id} className="premium-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <span style={{ fontSize: 16 }}>{d.platform === 'Facebook' ? '📘' : '🎵'}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{d.title}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.platform} • {d.type}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <FiThumbsUp size={12} color="#db2777" />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#db2777' }}>{d.score}%</span>
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: '#475569', padding: '12px 14px', background: '#f8fafc', borderRadius: 10, lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 10 }}>
                                {d.content}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                                <FiHash size={11} color="#94a3b8" />
                                <span style={{ fontSize: 11, color: '#94a3b8' }}>{d.hashtags}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                                <span style={{ fontSize: 11, color: '#64748b' }}><FiEye size={11} /> {d.engagement}</span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button className="premium-action-btn" style={{ background: '#f1f5f9', color: '#64748b' }}><FiCopy size={11} /> Copy</button>
                                    <button className="premium-action-btn" style={{ background: '#db2777', color: 'white' }}>Đăng bài</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'calendar' && (
                <div>
                    <div className="premium-alert" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', color: '#9d174d' }}>
                        <FiEdit3 size={14} /> Content calendar tuần này — AI đề xuất lịch đăng tối ưu
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {calendar.map((c, i) => (
                            <div key={i} className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: c.status === 'posted' ? '#ecfdf5' : c.status === 'scheduled' ? '#eff6ff' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: c.status === 'posted' ? '#059669' : c.status === 'scheduled' ? '#0369a1' : '#64748b' }}>
                                    {c.day}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{c.content}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.platform === 'TT' ? 'TikTok' : c.platform === 'FB' ? 'Facebook' : 'Facebook + TikTok'}</div>
                                </div>
                                <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: c.status === 'posted' ? '#ecfdf5' : c.status === 'scheduled' ? '#eff6ff' : '#f1f5f9', color: c.status === 'posted' ? '#059669' : c.status === 'scheduled' ? '#0369a1' : '#64748b' }}>
                                    {c.status === 'posted' ? '✅ Đã đăng' : c.status === 'scheduled' ? '⏰ Đã hẹn' : '📝 Nháp'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
