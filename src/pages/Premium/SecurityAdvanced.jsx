import { useState } from 'react'
import { FiShield, FiLock, FiActivity, FiDatabase, FiRotateCcw, FiSmartphone, FiAlertTriangle, FiCheck, FiX, FiClock, FiUser, FiEye } from 'react-icons/fi'

const activityLog = [
    { user: 'Admin', action: 'Đăng nhập', ip: '113.22.45.128', time: '22:45 - 01/03/2026', type: 'auth' },
    { user: 'Phạm Thị Hồng', action: 'Sửa hồ sơ KH: Lê Thị Ánh', ip: '113.22.45.130', time: '22:30 - 01/03/2026', type: 'edit' },
    { user: 'Cao Thanh Sơn', action: 'Tạo lịch hẹn mới', ip: '113.22.45.131', time: '22:15 - 01/03/2026', type: 'create' },
    { user: 'Dương Thị Thủy', action: 'Xuất báo cáo doanh thu', ip: '42.116.12.88', time: '21:50 - 01/03/2026', type: 'export' },
    { user: 'Admin', action: 'Xóa ticket #TK037', ip: '113.22.45.128', time: '21:30 - 01/03/2026', type: 'delete' },
    { user: 'Tô Thị Vy', action: 'Thanh toán hóa đơn HD-1247', ip: '113.22.45.129', time: '21:15 - 01/03/2026', type: 'payment' },
    { user: 'Lưu Thị Kim', action: 'Đăng nhập thất bại (3 lần)', ip: '185.43.22.91', time: '21:00 - 01/03/2026', type: 'warning' },
    { user: 'Admin', action: 'Thay đổi quyền NV005', ip: '113.22.45.128', time: '20:45 - 01/03/2026', type: 'permission' },
    { user: 'Đỗ Hữu Nghĩa', action: 'Nhập kho VT-2026-089', ip: '113.22.45.132', time: '20:30 - 01/03/2026', type: 'create' },
    { user: 'Mai Thị Quỳnh', action: 'Sửa giá DV: Nâng cơ Hifu', ip: '42.116.12.90', time: '20:00 - 01/03/2026', type: 'edit' },
]

const backups = [
    { name: 'Backup tự động', date: '01/03/2026 02:00', size: '1.2 GB', status: 'success' },
    { name: 'Backup tự động', date: '28/02/2026 02:00', size: '1.1 GB', status: 'success' },
    { name: 'Backup tự động', date: '27/02/2026 02:00', size: '1.1 GB', status: 'success' },
    { name: 'Backup thủ công', date: '25/02/2026 14:30', size: '1.0 GB', status: 'success' },
    { name: 'Backup tự động', date: '24/02/2026 02:00', size: '0.9 GB', status: 'failed' },
]

const typeColors = {
    auth: { bg: '#eff6ff', color: '#2563eb', icon: FiUser },
    edit: { bg: '#f5f3ff', color: '#7c3aed', icon: FiActivity },
    create: { bg: '#ecfdf5', color: '#059669', icon: FiCheck },
    delete: { bg: '#fef2f2', color: '#dc2626', icon: FiX },
    export: { bg: '#ecfeff', color: '#0891b2', icon: FiEye },
    payment: { bg: '#fffbeb', color: '#d97706', icon: FiActivity },
    warning: { bg: '#fef2f2', color: '#dc2626', icon: FiAlertTriangle },
    permission: { bg: '#fff7ed', color: '#ea580c', icon: FiShield },
}

export default function SecurityAdvanced() {
    const [tab, setTab] = useState('2fa')
    const [twoFA, setTwoFA] = useState(false)

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #1e293b, #475569)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <div className="premium-header-inner">
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiShield size={24} color="white" />
                    </div>
                    <div>
                        <h2>Bảo mật Nâng cao</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>2FA • Log hoạt động • Sao lưu & Khôi phục dữ liệu</p>
                    </div>
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: '2fa', label: '🔐 Xác thực 2FA' }, { id: 'log', label: '📋 Log hoạt động' }, { id: 'backup', label: '💾 Sao lưu' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#1e293b' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* 2FA */}
            {tab === '2fa' && (
                <div className="premium-two-col">
                    <div className="premium-card" style={{ padding: 24 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>🔐 Xác thực 2 bước (2FA)</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                            <div onClick={() => setTwoFA(!twoFA)} style={{
                                width: 48, height: 26, borderRadius: 13, background: twoFA ? '#059669' : '#cbd5e1',
                                position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                            }}>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: twoFA ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: twoFA ? '#059669' : '#64748b' }}>{twoFA ? 'Đã bật' : 'Đang tắt'}</span>
                        </div>
                        {twoFA && (
                            <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                                <div style={{ width: 140, height: 140, background: '#e2e8f0', borderRadius: 12, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiSmartphone size={40} color="#64748b" />
                                </div>
                                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px' }}>Quét bằng Google Authenticator</p>
                                <code style={{ fontSize: 11, background: '#e2e8f0', padding: '4px 12px', borderRadius: 6 }}>BEAU-TYOS-2FA-K3Y9</code>
                            </div>
                        )}
                        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>
                            Xác thực 2 bước bảo vệ tài khoản bằng mã OTP từ ứng dụng. Mỗi lần đăng nhập cần nhập mật khẩu + mã 6 số.
                        </p>
                    </div>
                    <div className="premium-card" style={{ padding: 24 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>🛡️ Trạng thái bảo mật</h3>
                        {[{ label: '2FA cho Admin', status: twoFA, desc: 'Tài khoản quản trị' },
                        { label: 'Mã hóa dữ liệu', status: true, desc: 'AES-256 encryption' },
                        { label: 'SSL/HTTPS', status: true, desc: 'Let\'s Encrypt certificate' },
                        { label: 'IP Whitelist', status: false, desc: 'Giới hạn truy cập theo IP' },
                        { label: 'Session timeout', status: true, desc: 'Tự động đăng xuất sau 30 phút' }].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ width: 28, height: 28, borderRadius: 6, background: s.status ? '#ecfdf5' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {s.status ? <FiCheck size={14} color="#059669" /> : <FiX size={14} color="#dc2626" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.label}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Log */}
            {tab === 'log' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Loại', 'Người dùng', 'Hành động', 'IP', 'Thời gian'].map(h => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {activityLog.map((l, i) => {
                                const tc = typeColors[l.type] || typeColors.auth
                                const Icon = tc.icon
                                return (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: l.type === 'warning' ? '#fef2f208' : 'white' }}>
                                        <td style={{ padding: '10px 14px' }}>
                                            <div style={{ width: 28, height: 28, borderRadius: 6, background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon size={13} color={tc.color} />
                                            </div>
                                        </td>
                                        <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a' }}>{l.user}</td>
                                        <td style={{ padding: '10px 14px', color: l.type === 'warning' ? '#dc2626' : '#374151', fontWeight: l.type === 'warning' ? 600 : 400 }}>{l.action}</td>
                                        <td style={{ padding: '10px 14px', color: '#94a3b8', fontFamily: 'monospace', fontSize: 11 }}>{l.ip}</td>
                                        <td style={{ padding: '10px 14px', color: '#64748b', fontSize: 12 }}>{l.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Backup */}
            {tab === 'backup' && (
                <div className="premium-two-col">
                    <div className="premium-table-wrap">
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>💾 Lịch sử Sao lưu</h3>
                            <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: '#1e293b', color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FiDatabase size={13} /> Sao lưu ngay
                            </button>
                        </div>
                        {backups.map((b, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: b.status === 'success' ? '#ecfdf5' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {b.status === 'success' ? <FiCheck size={14} color="#059669" /> : <FiX size={14} color="#dc2626" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{b.name}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.date} • {b.size}</div>
                                </div>
                                {b.status === 'success' && (
                                    <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-family)', color: '#64748b' }}>
                                        <FiRotateCcw size={11} /> Khôi phục
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="premium-card" style={{ padding: 24 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>⚙️ Cấu hình Sao lưu</h3>
                        {[{ label: 'Sao lưu tự động', value: 'Bật', desc: 'Hàng ngày lúc 2:00 AM' },
                        { label: 'Giữ dữ liệu', value: '30 ngày', desc: 'Tự động xóa backup cũ' },
                        { label: 'Lưu trữ', value: 'Cloud + Local', desc: 'AWS S3 + NAS nội bộ' }].map((c, i) => (
                            <div key={i} style={{ marginBottom: 16 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{c.label}</label>
                                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{c.desc}</div>
                                <input defaultValue={c.value} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                            </div>
                        ))}
                        <button style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: '#1e293b', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)' }}>Lưu cấu hình</button>
                    </div>
                </div>
            )}
        </div>
    )
}
