import { useState } from 'react'
import { FiMessageCircle, FiPlay, FiPause, FiPlus, FiClock, FiCheck, FiX, FiAlertTriangle, FiSend, FiEdit2, FiTrash2, FiPieChart } from 'react-icons/fi'
import { customers } from '../../data/mockData'

const scenarios = [
    { id: 1, name: 'Nhắc lịch hẹn trước 24h', trigger: 'Lịch hẹn', type: 'SMS', active: true, sent: 1247, opened: 1089, rate: 87 },
    { id: 2, name: 'Chúc sinh nhật + Voucher 20%', trigger: 'Sinh nhật', type: 'ZNS', active: true, sent: 342, opened: 298, rate: 87 },
    { id: 3, name: 'Nhắc tái khám 30 ngày', trigger: 'Sau điều trị', type: 'SMS', active: true, sent: 856, opened: 624, rate: 73 },
    { id: 4, name: 'Khuyến mãi cuối tháng', trigger: 'Định kỳ', type: 'ZNS', active: false, sent: 2100, opened: 1470, rate: 70 },
    { id: 5, name: 'Nhắc lịch hẹn trước 1h', trigger: 'Lịch hẹn', type: 'SMS', active: true, sent: 1190, opened: 1071, rate: 90 },
    { id: 6, name: 'Cảm ơn sau dịch vụ', trigger: 'Hoàn thành DV', type: 'ZNS', active: true, sent: 678, opened: 542, rate: 80 },
]

const history = customers.slice(0, 20).map((c, i) => ({
    customer: c.name, phone: c.phone,
    scenario: scenarios[i % scenarios.length].name,
    type: i % 2 === 0 ? 'SMS' : 'ZNS',
    time: `${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} - 0${Math.floor(Math.random() * 2) + 1}/03/2026`,
    status: ['Đã gửi', 'Đã mở', 'Đã gửi', 'Thất bại', 'Đã mở'][i % 5],
}))

export default function SMSZNSAuto() {
    const [tab, setTab] = useState('scenarios')
    const [data, setData] = useState(scenarios)
    const [showModal, setShowModal] = useState(false)

    const toggleActive = (id) => {
        setData(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
    }

    const totalSent = data.reduce((a, s) => a + s.sent, 0)
    const totalOpened = data.reduce((a, s) => a + s.opened, 0)
    const avgRate = Math.round(totalOpened / totalSent * 100)

    return (
        <div className="premium-page fade-in">
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #059669, #34d399)', borderRadius: 16,
                padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon">
                        <FiMessageCircle size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>SMS & ZNS Tự động</h2>
                        <p>Tự động gửi tin nhắn theo kịch bản — Nhắc lịch, Sinh nhật, Khuyến mãi</p>
                    </div>
                </div>
                {/* Mini stats */}
                <div className="premium-stats-row">
                    {[
                        { label: 'Tổng đã gửi', value: totalSent.toLocaleString(), icon: FiSend },
                        { label: 'Đã mở', value: totalOpened.toLocaleString(), icon: FiCheck },
                        { label: 'Tỉ lệ mở', value: avgRate + '%', icon: FiPieChart },
                        { label: 'Kịch bản', value: data.filter(s => s.active).length + '/' + data.length, icon: FiPlay },
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <s.icon size={14} color="rgba(255,255,255,0.7)" />
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.value}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="premium-tabs">
                {[{ id: 'scenarios', label: '📋 Kịch bản', }, { id: 'history', label: '📜 Lịch sử' }, { id: 'stats', label: '📊 Thống kê' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{
                        background: tab === t.id ? '#059669' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
                <button onClick={() => setShowModal(true)} style={{
                    marginLeft: 'auto', padding: '10px 18px', borderRadius: 10, border: 'none',
                    background: '#059669', color: 'white', cursor: 'pointer', fontFamily: 'var(--font-family)',
                    fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                    <FiPlus size={14} /> Tạo kịch bản
                </button>
            </div>

            {/* Kịch bản */}
            {tab === 'scenarios' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.map(s => (
                        <div key={s.id} style={{
                            background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', padding: '16px 20px',
                            display: 'flex', alignItems: 'center', gap: 16, opacity: s.active ? 1 : 0.6,
                        }}>
                            <button onClick={() => toggleActive(s.id)} style={{
                                width: 42, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                                background: s.active ? '#059669' : '#cbd5e1', position: 'relative', transition: 'background 0.2s',
                            }}>
                                <div style={{
                                    width: 18, height: 18, borderRadius: '50%', background: 'white',
                                    position: 'absolute', top: 3, left: s.active ? 21 : 3, transition: 'left 0.2s',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }} />
                            </button>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{s.name}</span>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                                        background: s.type === 'ZNS' ? '#eff6ff' : '#ecfdf5', color: s.type === 'ZNS' ? '#2563eb' : '#059669',
                                    }}>{s.type}</span>
                                </div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>Trigger: {s.trigger} • Đã gửi: {s.sent.toLocaleString()} • Tỉ lệ mở: {s.rate}%</div>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiEdit2 size={14} color="#64748b" /></button>
                                <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiTrash2 size={14} color="#ef4444" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lịch sử */}
            {tab === 'history' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                {['Khách hàng', 'SĐT', 'Kịch bản', 'Loại', 'Thời gian', 'Trạng thái'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{h.customer}</td>
                                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{h.phone}</td>
                                    <td style={{ padding: '12px 16px', color: '#0f172a', fontSize: 12 }}>{h.scenario}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: h.type === 'ZNS' ? '#eff6ff' : '#ecfdf5', color: h.type === 'ZNS' ? '#2563eb' : '#059669' }}>{h.type}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: 12 }}>{h.time}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                                            background: h.status === 'Đã mở' ? '#ecfdf5' : h.status === 'Thất bại' ? '#fef2f2' : '#f1f5f9',
                                            color: h.status === 'Đã mở' ? '#059669' : h.status === 'Thất bại' ? '#dc2626' : '#64748b',
                                        }}>
                                            {h.status === 'Đã mở' ? <FiCheck size={11} /> : h.status === 'Thất bại' ? <FiX size={11} /> : <FiClock size={11} />}
                                            {h.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Thống kê */}
            {tab === 'stats' && (
                <div className="premium-two-col">
                    {data.map(s => (
                        <div key={s.id} className="premium-card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{s.name}</span>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: s.type === 'ZNS' ? '#eff6ff' : '#ecfdf5', color: s.type === 'ZNS' ? '#2563eb' : '#059669' }}>{s.type}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                                <div><div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{s.sent.toLocaleString()}</div><div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Đã gửi</div></div>
                                <div><div style={{ fontSize: 20, fontWeight: 800, color: '#059669' }}>{s.opened.toLocaleString()}</div><div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Đã mở</div></div>
                                <div><div style={{ fontSize: 20, fontWeight: 800, color: '#7c3aed' }}>{s.rate}%</div><div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Tỉ lệ</div></div>
                            </div>
                            <div style={{ height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                                <div style={{ width: `${s.rate}%`, height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #059669, #34d399)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 480, maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Tạo kịch bản mới</h3>
                        {[{ label: 'Tên kịch bản', ph: 'VD: Nhắc lịch hẹn trước 2h' }, { label: 'Nội dung tin nhắn', ph: 'Xin chào {tên}, bạn có lịch hẹn lúc {giờ}...' }].map((f, i) => (
                            <div key={i} style={{ marginBottom: 16 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{f.label}</label>
                                {i === 1 ? <textarea rows={3} placeholder={f.ph} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)', resize: 'vertical' }} />
                                    : <input placeholder={f.ph} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />}
                            </div>
                        ))}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Trigger</label>
                                <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }}>
                                    <option>Lịch hẹn</option><option>Sinh nhật</option><option>Sau điều trị</option><option>Định kỳ</option><option>Hoàn thành DV</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Loại</label>
                                <select style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }}>
                                    <option>SMS</option><option>ZNS</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Hủy</button>
                            <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#059669', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Tạo kịch bản</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
