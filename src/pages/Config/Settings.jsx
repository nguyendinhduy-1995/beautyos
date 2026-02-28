import { useState } from 'react'
import { FiSettings, FiPrinter, FiList, FiGlobe, FiDatabase, FiShield, FiSave, FiEdit2, FiCheck, FiRefreshCw, FiDownload, FiUpload, FiLock, FiToggleLeft, FiToggleRight, FiX } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function Settings() {
    const toast = useToast()
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: 'BeautyOS Demo',
        branchCode: 'CN_1834',
        phone: '0901234567',
        email: 'info@beautyos.vn',
        address: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        timezone: 'Asia/Ho_Chi_Minh',
        language: 'vi',
        currency: 'VND'
    })
    const [activeSection, setActiveSection] = useState(0)
    const [confirmDialog, setConfirmDialog] = useState(null)

    // Toggle states for security section
    const [twoFactor, setTwoFactor] = useState(false)
    const [autoLogout, setAutoLogout] = useState(true)
    const [ipRestrict, setIpRestrict] = useState(false)

    // Backup states
    const [backupProgress, setBackupProgress] = useState(null)
    const [lastBackup, setLastBackup] = useState('27/02/2026 14:30')

    // Print template selection
    const [printTemplate, setPrintTemplate] = useState('default')

    const handleSave = () => {
        setEditing(false)
        toast.success('Đã lưu cài đặt thành công!')
    }

    const handleBackup = () => {
        setBackupProgress(0)
        const interval = setInterval(() => {
            setBackupProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setLastBackup(new Date().toLocaleString('vi-VN'))
                    toast.success('Sao lưu dữ liệu thành công!')
                    setTimeout(() => setBackupProgress(null), 1000)
                    return 100
                }
                return prev + 20
            })
        }, 300)
    }

    const handleRestore = () => {
        setConfirmDialog({
            title: 'Phục hồi dữ liệu',
            message: 'Bạn có chắc muốn phục hồi dữ liệu từ bản sao lưu gần nhất? Dữ liệu hiện tại sẽ bị ghi đè.',
            onConfirm: () => {
                toast.info('Đang phục hồi dữ liệu...')
                setTimeout(() => toast.success('Phục hồi thành công!'), 1500)
                setConfirmDialog(null)
            }
        })
    }

    const handleResetDefault = () => {
        setConfirmDialog({
            title: 'Khôi phục mặc định',
            message: 'Bạn có chắc muốn khôi phục tất cả cài đặt về mặc định? Hành động này không thể hoàn tác.',
            onConfirm: () => {
                setFormData({
                    name: 'BeautyOS Demo', branchCode: 'CN_1834', phone: '0901234567',
                    email: 'info@beautyos.vn', address: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
                    timezone: 'Asia/Ho_Chi_Minh', language: 'vi', currency: 'VND'
                })
                setEditing(false)
                toast.success('Đã khôi phục cài đặt mặc định')
                setConfirmDialog(null)
            }
        })
    }

    const handleChangePassword = () => {
        setConfirmDialog({
            title: 'Đổi mật khẩu',
            message: 'Hệ thống sẽ gửi email xác nhận đổi mật khẩu đến địa chỉ email đã đăng ký.',
            onConfirm: () => {
                toast.success('Đã gửi email đổi mật khẩu!')
                setConfirmDialog(null)
            }
        })
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const configSections = [
        { icon: FiSettings, title: 'Cài đặt chung', desc: 'Thông tin cơ sở, múi giờ, ngôn ngữ', color: 'blue' },
        { icon: FiPrinter, title: 'Mẫu in', desc: 'Hóa đơn, phiếu thu, biên lai', color: 'green' },
        { icon: FiList, title: 'Danh mục', desc: 'Quản lý danh mục dữ liệu', color: 'orange' },
        { icon: FiGlobe, title: 'Khu vực', desc: 'Chi nhánh, phòng ban', color: 'purple' },
        { icon: FiDatabase, title: 'Sao lưu dữ liệu', desc: 'Backup và phục hồi dữ liệu', color: 'red' },
        { icon: FiShield, title: 'Bảo mật', desc: 'Mật khẩu, xác thực 2 bước', color: 'blue' },
    ]

    const renderSectionContent = () => {
        switch (activeSection) {
            case 0: // Cài đặt chung
                return (
                    <>
                        <div className="card" style={{ marginTop: '24px' }}>
                            <div className="card-header">
                                <h3 className="card-title">Thông tin cơ sở</h3>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {editing ? (
                                        <>
                                            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FiX size={13} /> Huỷ
                                            </button>
                                            <button className="btn btn-primary btn-sm" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FiSave size={13} /> Lưu thay đổi
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-secondary btn-sm" onClick={handleResetDefault} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc3545' }}>
                                                <FiRefreshCw size={13} /> Mặc định
                                            </button>
                                            <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FiEdit2 size={13} /> Chỉnh sửa
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {[
                                    { label: 'Tên cơ sở', field: 'name' },
                                    { label: 'Mã chi nhánh', field: 'branchCode' },
                                    { label: 'Số điện thoại', field: 'phone' },
                                    { label: 'Email', field: 'email' },
                                ].map(f => (
                                    <div className="form-group" key={f.field}>
                                        <label>{f.label}</label>
                                        <input className="form-control" value={formData[f.field]} readOnly={!editing}
                                            onChange={e => handleChange(f.field, e.target.value)}
                                            style={{ background: editing ? 'white' : '#f8f9fa', border: editing ? '2px solid var(--color-primary)' : undefined, cursor: editing ? 'text' : 'default' }} />
                                    </div>
                                ))}
                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Địa chỉ</label>
                                    <input className="form-control" value={formData.address} readOnly={!editing}
                                        onChange={e => handleChange('address', e.target.value)}
                                        style={{ background: editing ? 'white' : '#f8f9fa', border: editing ? '2px solid var(--color-primary)' : undefined, cursor: editing ? 'text' : 'default' }} />
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginTop: '16px' }}>
                            <div className="card-header">
                                <h3 className="card-title">Tuỳ chọn hệ thống</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Múi giờ</label>
                                    <select className="form-control" value={formData.timezone} onChange={e => handleChange('timezone', e.target.value)} disabled={!editing}
                                        style={{ background: editing ? 'white' : '#f8f9fa', cursor: editing ? 'pointer' : 'default' }}>
                                        <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (UTC+7)</option>
                                        <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ngôn ngữ</label>
                                    <select className="form-control" value={formData.language} onChange={e => handleChange('language', e.target.value)} disabled={!editing}
                                        style={{ background: editing ? 'white' : '#f8f9fa', cursor: editing ? 'pointer' : 'default' }}>
                                        <option value="vi">Tiếng Việt</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Đơn vị tiền tệ</label>
                                    <select className="form-control" value={formData.currency} onChange={e => handleChange('currency', e.target.value)} disabled={!editing}
                                        style={{ background: editing ? 'white' : '#f8f9fa', cursor: editing ? 'pointer' : 'default' }}>
                                        <option value="VND">VND (₫)</option>
                                        <option value="USD">USD ($)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </>
                )

            case 1: // Mẫu in
                return (
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Quản lý mẫu in</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { id: 'default', name: 'Mẫu mặc định', desc: 'Hoá đơn chuẩn với logo và thông tin cơ sở' },
                                { id: 'compact', name: 'Mẫu thu gọn', desc: 'Hoá đơn giấy nhiệt 58mm cho máy in bill' },
                                { id: 'detailed', name: 'Mẫu chi tiết', desc: 'Hoá đơn A4 đầy đủ thông tin dịch vụ' },
                                { id: 'receipt', name: 'Phiếu thu', desc: 'Phiếu xác nhận thanh toán' },
                            ].map(tpl => (
                                <div key={tpl.id} onClick={() => { setPrintTemplate(tpl.id); toast.success(`Đã chọn: ${tpl.name}`) }}
                                    style={{
                                        padding: '16px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s',
                                        border: printTemplate === tpl.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                        background: printTemplate === tpl.id ? 'var(--color-primary-light)' : 'white'
                                    }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{tpl.name}</span>
                                        {printTemplate === tpl.id && <FiCheck color="var(--color-primary)" size={18} />}
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', margin: 0 }}>{tpl.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary" onClick={() => toast.info('Đang mở xem trước mẫu in...')}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FiPrinter size={14} /> Xem trước
                            </button>
                            <button className="btn btn-secondary" onClick={() => toast.success('Đã lưu cài đặt mẫu in')}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FiSave size={14} /> Lưu
                            </button>
                        </div>
                    </div>
                )

            case 2: // Danh mục
                return (
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Quản lý danh mục</h3>
                            <button className="btn btn-primary btn-sm" onClick={() => toast.info('Thêm danh mục mới')}
                                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                + Thêm danh mục
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead><tr><th>#</th><th>Tên danh mục</th><th>Loại</th><th>Số mục</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                                <tbody>
                                    {[
                                        { name: 'Dịch vụ da liễu', type: 'Dịch vụ', count: 15, active: true },
                                        { name: 'Sản phẩm chăm sóc', type: 'Sản phẩm', count: 42, active: true },
                                        { name: 'Vật tư y tế', type: 'Vật tư', count: 28, active: true },
                                        { name: 'Phòng khám', type: 'Khu vực', count: 5, active: true },
                                        { name: 'Mẫu cũ (ngưng)', type: 'Mẫu in', count: 3, active: false },
                                    ].map((cat, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td style={{ fontWeight: '500' }}>{cat.name}</td>
                                            <td><span className="badge badge-info">{cat.type}</span></td>
                                            <td>{cat.count}</td>
                                            <td><span className={`badge badge-${cat.active ? 'success' : 'danger'}`}>{cat.active ? 'Hoạt động' : 'Ngưng'}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => toast.info(`Sửa: ${cat.name}`)}><FiEdit2 size={12} /></button>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => {
                                                        setConfirmDialog({ title: 'Xoá danh mục', message: `Xoá "${cat.name}"?`, onConfirm: () => { toast.success('Đã xoá'); setConfirmDialog(null) } })
                                                    }} style={{ color: '#dc3545' }}><FiX size={12} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )

            case 3: // Khu vực
                return (
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Chi nhánh & Phòng ban</h3>
                            <button className="btn btn-primary btn-sm" onClick={() => toast.info('Thêm chi nhánh mới')}
                                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                + Thêm chi nhánh
                            </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { name: 'Chi nhánh Quận 1', code: 'CN_1834', rooms: 5, staff: 12, active: true },
                                { name: 'Chi nhánh Quận 7', code: 'CN_1835', rooms: 3, staff: 8, active: true },
                                { name: 'Chi nhánh Bình Thạnh', code: 'CN_1836', rooms: 4, staff: 10, active: false },
                            ].map((branch, i) => (
                                <div key={i} style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '10px', background: branch.active ? 'white' : '#f8f9fa' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '600' }}>{branch.name}</span>
                                        <span className={`badge badge-${branch.active ? 'success' : 'danger'}`}>{branch.active ? 'Hoạt động' : 'Tạm ngưng'}</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '10px' }}>
                                        Mã: {branch.code} · {branch.rooms} phòng · {branch.staff} nhân viên
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button className="btn btn-sm btn-secondary" onClick={() => toast.info(`Sửa: ${branch.name}`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <FiEdit2 size={12} /> Sửa
                                        </button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => {
                                            toast.success(branch.active ? `Đã tạm ngưng ${branch.name}` : `Đã kích hoạt ${branch.name}`)
                                        }} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: branch.active ? '#dc3545' : '#28a745' }}>
                                            {branch.active ? <><FiToggleRight size={12} /> Ngưng</> : <><FiToggleLeft size={12} /> Kích hoạt</>}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case 4: // Sao lưu dữ liệu
                return (
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Sao lưu & Phục hồi</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ padding: '20px', background: '#f0f7ff', borderRadius: '10px', border: '1px solid #d0e3ff' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: '#1a73e8' }}>📦 Sao lưu dữ liệu</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>
                                    Lần sao lưu cuối: <strong>{lastBackup}</strong>
                                </p>
                                {backupProgress !== null && (
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${backupProgress}%`, height: '100%', background: '#4caf50', borderRadius: '4px', transition: 'width 0.3s' }} />
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: '#4caf50', fontWeight: '600' }}>{backupProgress}%</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn btn-primary" onClick={handleBackup} disabled={backupProgress !== null}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiDownload size={14} /> Sao lưu ngay
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => toast.info('Đang tải xuống bản sao lưu...')}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiDownload size={14} /> Tải xuống
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: '20px', background: '#fff8f0', borderRadius: '10px', border: '1px solid #ffe0b2' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: '#e65100' }}>🔄 Phục hồi dữ liệu</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>
                                    Khôi phục dữ liệu từ bản sao lưu trước đó
                                </p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn btn-secondary" onClick={handleRestore}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e65100' }}>
                                        <FiUpload size={14} /> Phục hồi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 5: // Bảo mật
                return (
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header">
                            <h3 className="card-title">Cài đặt bảo mật</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { label: 'Xác thực 2 bước (2FA)', desc: 'Yêu cầu mã xác thực khi đăng nhập', value: twoFactor, toggle: () => { setTwoFactor(!twoFactor); toast.success(twoFactor ? 'Đã tắt 2FA' : 'Đã bật 2FA') } },
                                { label: 'Tự động đăng xuất', desc: 'Đăng xuất sau 30 phút không hoạt động', value: autoLogout, toggle: () => { setAutoLogout(!autoLogout); toast.success(autoLogout ? 'Đã tắt tự động đăng xuất' : 'Đã bật tự động đăng xuất') } },
                                { label: 'Giới hạn IP', desc: 'Chỉ cho phép truy cập từ IP được duyệt', value: ipRestrict, toggle: () => { setIpRestrict(!ipRestrict); toast.success(ipRestrict ? 'Đã tắt giới hạn IP' : 'Đã bật giới hạn IP') } },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#f8f9fa', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.label}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{item.desc}</div>
                                    </div>
                                    <button onClick={item.toggle}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: item.value ? '#4caf50' : '#ccc' }}>
                                        {item.value ? <FiToggleRight size={28} /> : <FiToggleLeft size={28} />}
                                    </button>
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <button className="btn btn-primary" onClick={handleChangePassword}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FiLock size={14} /> Đổi mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h2>Cấu Hình Hệ Thống</h2>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý cài đặt và cấu hình của hệ thống</p>
                </div>
            </div>

            <div className="settings-grid">
                {configSections.map((section, idx) => {
                    const Icon = section.icon
                    return (
                        <div className="setting-card" key={idx} id={`config-${idx}`}
                            style={{
                                cursor: 'pointer',
                                border: activeSection === idx ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                background: activeSection === idx ? 'var(--color-primary-light)' : 'white',
                                transition: 'all 0.2s'
                            }}
                            onClick={() => setActiveSection(idx)}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div className={`setting-card-icon stat-card-icon ${section.color}`}>
                                <Icon />
                            </div>
                            <div className="setting-card-info">
                                <h4>{section.title}</h4>
                                <p>{section.desc}</p>
                            </div>
                            {activeSection === idx && <FiCheck color="var(--color-primary)" size={18} style={{ marginLeft: 'auto' }} />}
                        </div>
                    )
                })}
            </div>

            {renderSectionContent()}

            {confirmDialog && (
                <ConfirmDialog
                    title={confirmDialog.title}
                    message={confirmDialog.message}
                    onConfirm={confirmDialog.onConfirm}
                    onCancel={() => setConfirmDialog(null)}
                />
            )}
        </div>
    )
}
