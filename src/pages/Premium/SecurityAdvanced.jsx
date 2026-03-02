import { useState } from 'react'
import { FiShield, FiLock, FiEye, FiActivity, FiAlertTriangle, FiCheck, FiClock, FiUser } from 'react-icons/fi'

const securityLogs = [
    { time: '07:45', user: 'Admin', action: 'Đăng nhập', ip: '14.161.x.x', device: 'Chrome/Mac', status: 'success' },
    { time: '07:30', user: 'nguyenha', action: 'Xuất báo cáo', ip: '14.161.x.x', device: 'Safari/iPhone', status: 'success' },
    { time: '07:15', user: 'Unknown', action: 'Đăng nhập', ip: '45.77.x.x', device: 'Bot', status: 'blocked' },
    { time: '06:50', user: 'tranminh', action: 'Xem hồ sơ KH', ip: '113.22.x.x', device: 'Chrome/Win', status: 'success' },
    { time: '06:30', user: 'lethilan', action: 'Sửa đơn hàng', ip: '14.161.x.x', device: 'Chrome/Mac', status: 'success' },
    { time: '05:12', user: 'Unknown', action: 'Brute force login', ip: '103.x.x.x', device: 'Bot', status: 'blocked' },
    { time: '04:00', user: 'System', action: 'Backup tự động', ip: 'localhost', device: 'System', status: 'success' },
    { time: '02:30', user: 'System', action: 'SSL cert check', ip: 'localhost', device: 'System', status: 'success' },
]

const features = [
    { name: '2FA Xác thực 2 bước', status: true, desc: 'Yêu cầu OTP khi đăng nhập', icon: '🔐' },
    { name: 'IP Whitelist', status: true, desc: 'Chỉ cho phép IP đã đăng ký', icon: '🌐' },
    { name: 'Auto Backup', status: true, desc: 'Backup mỗi 4 giờ, giữ 30 ngày', icon: '💾' },
    { name: 'SSL/TLS Encryption', status: true, desc: 'Mã hóa end-to-end mọi dữ liệu', icon: '🔒' },
    { name: 'Brute Force Protection', status: true, desc: 'Khóa sau 5 lần sai, block IP', icon: '🛡️' },
    { name: 'Session Management', status: true, desc: 'Tự đăng xuất sau 30 phút không hoạt động', icon: '⏱️' },
    { name: 'Data Masking', status: false, desc: 'Ẩn thông tin nhạy cảm (SĐT, CCCD)', icon: '👁️' },
    { name: 'Audit Trail', status: true, desc: 'Ghi log mọi hành động người dùng', icon: '📝' },
]

const permissions = [
    { role: 'Admin', users: 1, access: 'Toàn quyền', color: '#dc2626' },
    { role: 'Manager', users: 2, access: 'Quản lý + Báo cáo', color: '#d97706' },
    { role: 'KTV', users: 8, access: 'Lịch hẹn + KH được phân', color: '#059669' },
    { role: 'Lễ tân', users: 3, access: 'Lịch hẹn + Check-in', color: '#0891b2' },
    { role: 'Telesales', users: 4, access: 'Leads + Gọi điện', color: '#7c3aed' },
]

export default function SecurityAdvanced() {
    const [tab, setTab] = useState('features')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #1e293b, #475569)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon" style={{ background: 'rgba(255,255,255,0.1)' }}><FiShield size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Bảo mật Nâng cao</h2>
                        <p>2FA • IP Whitelist • Audit Log • Phân quyền</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Tính năng', v: `${features.filter(f => f.status).length}/${features.length}` }, { l: 'Blocked', v: securityLogs.filter(l => l.status === 'blocked').length }, { l: 'Roles', v: permissions.length }, { l: 'Backup', v: '4h/lần' }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'features', label: '🛡️ Tính năng' }, { id: 'logs', label: '📋 Audit Log' }, { id: 'roles', label: '👥 Phân quyền' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#1e293b' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'features' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {features.map((f, i) => (
                        <div key={i} className="premium-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 22 }}>{f.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{f.name}</div>
                                <div style={{ fontSize: 11, color: '#64748b' }}>{f.desc}</div>
                            </div>
                            <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: f.status ? '#ecfdf5' : '#fef2f2', color: f.status ? '#059669' : '#dc2626' }}>
                                {f.status ? '✅ Bật' : '❌ Tắt'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'logs' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Giờ', 'User', 'Hành động', 'IP', 'Thiết bị', 'TT'].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {securityLogs.map((l, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: '#0f172a', fontSize: 12 }}>{l.time}</td>
                                    <td style={{ fontWeight: 600, color: l.user === 'Unknown' ? '#dc2626' : '#0f172a' }}>{l.user}</td>
                                    <td style={{ color: '#64748b', fontSize: 12 }}>{l.action}</td>
                                    <td><code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3, fontSize: 10 }}>{l.ip}</code></td>
                                    <td style={{ color: '#94a3b8', fontSize: 11 }}>{l.device}</td>
                                    <td>
                                        <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: l.status === 'success' ? '#ecfdf5' : '#fef2f2', color: l.status === 'success' ? '#059669' : '#dc2626' }}>
                                            {l.status === 'success' ? '✅' : '🚫'} {l.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'roles' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {permissions.map((p, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, borderLeft: `3px solid ${p.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{p.role}</div>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#f1f5f9', color: '#64748b' }}>{p.users} người</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b' }}>🔑 {p.access}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
