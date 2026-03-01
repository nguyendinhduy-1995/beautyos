import { useState } from 'react'
import { FiCamera, FiImage, FiGrid, FiPlus, FiEye, FiTrash2, FiFilter, FiCalendar, FiUser } from 'react-icons/fi'
import { customers, services } from '../../data/mockData'

const gallery = customers.slice(0, 12).map((c, i) => ({
    id: i + 1, customer: c.name, service: services[i % services.length]?.name || 'Nâng cơ Hifu',
    date: `${10 + i}/02/2026`, note: ['Sau 1 lần', 'Sau 3 lần', 'Sau 5 lần', 'Hoàn thiện'][i % 4],
    beforeColor: ['#fecaca', '#fed7aa', '#fde68a', '#d9f99d'][i % 4],
    afterColor: ['#bbf7d0', '#a7f3d0', '#99f6e4', '#bae6fd'][i % 4],
    rating: Math.floor(Math.random() * 2) + 4,
    consent: i % 3 !== 2,
}))

export default function BeforeAfter() {
    const [view, setView] = useState('grid')
    const [filter, setFilter] = useState('all')
    const [selectedItem, setSelectedItem] = useState(null)
    const [showUpload, setShowUpload] = useState(false)

    const filtered = filter === 'all' ? gallery : gallery.filter(g => g.consent)

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCamera size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Before / After Gallery</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Quản lý hình ảnh trước/sau điều trị • {gallery.length} bộ ảnh</p>
                    </div>
                    <button onClick={() => setShowUpload(true)} style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600 }}>
                        <FiPlus size={14} /> Tải ảnh
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                    {[{ id: 'all', label: 'Tất cả' }, { id: 'consent', label: '✅ Đã đồng ý' }].map(f => (
                        <button key={f.id} onClick={() => setFilter(f.id)} style={{
                            padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                            fontSize: 13, fontWeight: 600, background: filter === f.id ? '#ec4899' : '#f1f5f9', color: filter === f.id ? 'white' : '#64748b',
                        }}>{f.label}</button>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {[{ id: 'grid', icon: FiGrid }, { id: 'list', icon: FiImage }].map(v => (
                        <button key={v.id} onClick={() => setView(v.id)} style={{
                            width: 36, height: 36, borderRadius: 8, border: '1px solid #e2e8f0', background: view === v.id ? '#ec4899' : 'white',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}><v.icon size={14} color={view === v.id ? 'white' : '#64748b'} /></button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr', gap: 16 }}>
                {filtered.map(item => (
                    <div key={item.id} onClick={() => setSelectedItem(item)} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                        <div style={{ display: 'flex', height: view === 'grid' ? 140 : 180 }}>
                            <div style={{ flex: 1, background: item.beforeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <FiCamera size={24} color="rgba(0,0,0,0.2)" />
                                <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 9, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '2px 6px', borderRadius: 4 }}>TRƯỚC</span>
                            </div>
                            <div style={{ flex: 1, background: item.afterColor, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <FiCamera size={24} color="rgba(0,0,0,0.2)" />
                                <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 9, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '2px 6px', borderRadius: 4 }}>SAU</span>
                            </div>
                        </div>
                        <div style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{item.customer}</span>
                                <span style={{ fontSize: 12, color: '#f59e0b' }}>{'⭐'.repeat(item.rating)}</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#ec4899', fontWeight: 500, marginBottom: 2 }}>{item.service}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
                                <span>{item.note}</span>
                                <span>{item.date}</span>
                            </div>
                            {!item.consent && <span style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600 }}>⚠ Chưa đồng ý công khai</span>}
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedItem(null)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 600, maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>{selectedItem.customer} — {selectedItem.service}</h3>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                            <div style={{ flex: 1, height: 220, background: selectedItem.beforeColor, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <FiCamera size={32} color="rgba(0,0,0,0.15)" />
                                <span style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 11, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '3px 8px', borderRadius: 6 }}>TRƯỚC</span>
                            </div>
                            <div style={{ flex: 1, height: 220, background: selectedItem.afterColor, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <FiCamera size={32} color="rgba(0,0,0,0.15)" />
                                <span style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 11, fontWeight: 700, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '3px 8px', borderRadius: 6 }}>SAU</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16, fontSize: 13 }}>
                            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 12px' }}><div style={{ color: '#94a3b8', fontSize: 11 }}>Ghi chú</div><div style={{ fontWeight: 600 }}>{selectedItem.note}</div></div>
                            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 12px' }}><div style={{ color: '#94a3b8', fontSize: 11 }}>Ngày chụp</div><div style={{ fontWeight: 600 }}>{selectedItem.date}</div></div>
                            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 12px' }}><div style={{ color: '#94a3b8', fontSize: 11 }}>Đồng ý công khai</div><div style={{ fontWeight: 600, color: selectedItem.consent ? '#059669' : '#dc2626' }}>{selectedItem.consent ? '✓ Có' : '✕ Chưa'}</div></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setSelectedItem(null)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}

            {showUpload && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowUpload(false)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 480 }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>📸 Tải ảnh Before/After</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                            {['Ảnh TRƯỚC', 'Ảnh SAU'].map((label, i) => (
                                <div key={i} style={{ height: 120, borderRadius: 12, border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                                    <FiCamera size={24} color="#94a3b8" />
                                    <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{label}</span>
                                </div>
                            ))}
                        </div>
                        {[{ l: 'Khách hàng', p: 'Chọn khách hàng' }, { l: 'Dịch vụ', p: 'Chọn dịch vụ' }, { l: 'Ghi chú', p: 'VD: Sau 3 lần điều trị' }].map((f, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{f.l}</label>
                                <input placeholder={f.p} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                        ))}
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', marginBottom: 16 }}>
                            <input type="checkbox" /> Khách hàng đồng ý công khai
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setShowUpload(false)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Hủy</button>
                            <button onClick={() => setShowUpload(false)} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#ec4899', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Lưu ảnh</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
