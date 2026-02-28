import { useState } from 'react'
import { FiSettings, FiSave, FiPackage, FiAlertTriangle, FiTruck, FiFileText, FiUsers, FiRefreshCw } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

export default function WarehouseSettings() {
    const toast = useToast()
    const [settings, setSettings] = useState({
        defaultWarehouse: 'Kho chính',
        autoCloseTime: '22:00',
        lowStockAlert: true,
        lowStockThreshold: 10,
        autoReorder: false,
        autoReorderQty: 50,
        batchTracking: true,
        expiryAlert: true,
        expiryDays: 30,
        allowNegativeStock: false,
        requireApproval: true,
        printOnExport: true,
        emailNotification: true,
        autoBackup: true,
        backupFreq: 'daily',
        unitDefault: 'Hộp',
        taxIncluded: true,
        returnPolicy: 7,
    })
    const [activeSection, setActiveSection] = useState('general')

    const handleSave = () => {
        toast.success('Đã lưu cài đặt kho thành công!')
    }

    const handleReset = () => {
        toast.info('Đã khôi phục cài đặt mặc định')
    }

    const Toggle = ({ checked, onChange }) => (
        <div onClick={() => onChange(!checked)} style={{
            width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
            background: checked ? 'var(--color-primary)' : '#d1d5db', transition: 'all 0.3s',
            position: 'relative', flexShrink: 0
        }}>
            <div style={{
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '2px', left: checked ? '22px' : '2px', transition: 'all 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
        </div>
    )

    const SettingRow = ({ label, desc, children }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f5f5f5' }}>
            <div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{label}</div><div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{desc}</div></div>
            {children}
        </div>
    )

    const sections = [
        { id: 'general', label: 'Cài đặt chung', icon: <FiPackage size={14} /> },
        { id: 'alerts', label: 'Cảnh báo', icon: <FiAlertTriangle size={14} /> },
        { id: 'import-export', label: 'Nhập / Xuất', icon: <FiTruck size={14} /> },
        { id: 'reports', label: 'Báo cáo & Sao lưu', icon: <FiFileText size={14} /> },
    ]

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Cài Đặt Kho</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Cấu hình quản lý kho vật tư, hàng hoá</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleReset}><FiRefreshCw size={14} /> Mặc định</button>
                    <button className="btn btn-primary" onClick={handleSave}><FiSave size={14} /> Lưu cài đặt</button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Sidebar navigation */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                        {sections.map(s => (
                            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
                                border: 'none', background: activeSection === s.id ? 'var(--color-primary)' : 'white',
                                color: activeSection === s.id ? 'white' : 'var(--color-text)',
                                fontWeight: activeSection === s.id ? '600' : '400', fontSize: '0.85rem',
                                cursor: 'pointer', transition: 'all 0.2s', borderLeft: activeSection === s.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                                fontFamily: 'inherit'
                            }}>{s.icon} {s.label}</button>
                        ))}
                    </div>

                    {/* Quick summary */}
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '16px', marginTop: '12px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: '600', marginBottom: '10px', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trạng thái nhanh</div>
                        {[
                            { label: 'Tồn kho thấp', on: settings.lowStockAlert, color: '#ff9800' },
                            { label: 'Theo dõi lô', on: settings.batchTracking, color: '#1a73e8' },
                            { label: 'Yêu cầu duyệt', on: settings.requireApproval, color: '#9c27b0' },
                            { label: 'Tồn kho âm', on: settings.allowNegativeStock, color: '#dc3545' },
                            { label: 'Sao lưu tự động', on: settings.autoBackup, color: '#28a745' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', fontSize: '0.78rem' }}>
                                <span>{item.label}</span>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.on ? item.color : '#d1d5db' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                    {activeSection === 'general' && (
                        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px 24px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiPackage color="var(--color-primary)" /> Cài đặt chung</h3>
                            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>Cấu hình cơ bản cho hệ thống kho</p>

                            <div className="form-group" style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Kho mặc định</label>
                                <select value={settings.defaultWarehouse} onChange={e => setSettings(s => ({ ...s, defaultWarehouse: e.target.value }))} className="form-control">
                                    <option>Kho chính</option><option>Kho phụ</option><option>Kho chi nhánh 2</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Giờ chốt kho tự động</label>
                                    <input type="time" value={settings.autoCloseTime} onChange={e => setSettings(s => ({ ...s, autoCloseTime: e.target.value }))} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Đơn vị mặc định</label>
                                    <select value={settings.unitDefault} onChange={e => setSettings(s => ({ ...s, unitDefault: e.target.value }))} className="form-control">
                                        <option>Hộp</option><option>Chai</option><option>Tuýp</option><option>Chiếc</option><option>Lọ</option>
                                    </select>
                                </div>
                            </div>

                            <SettingRow label="Theo dõi lô hàng" desc="Quản lý theo lô và hạn sử dụng">
                                <Toggle checked={settings.batchTracking} onChange={v => setSettings(s => ({ ...s, batchTracking: v }))} />
                            </SettingRow>
                            <SettingRow label="Yêu cầu duyệt phiếu" desc="Phiếu nhập/xuất cần quản lý phê duyệt">
                                <Toggle checked={settings.requireApproval} onChange={v => setSettings(s => ({ ...s, requireApproval: v }))} />
                            </SettingRow>
                            <SettingRow label="Tính thuế trong giá" desc="Giá nhập đã bao gồm VAT">
                                <Toggle checked={settings.taxIncluded} onChange={v => setSettings(s => ({ ...s, taxIncluded: v }))} />
                            </SettingRow>
                        </div>
                    )}

                    {activeSection === 'alerts' && (
                        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px 24px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiAlertTriangle color="#ff9800" /> Cảnh báo</h3>
                            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>Thiết lập thông báo và cảnh báo kho</p>

                            <SettingRow label="Cảnh báo tồn kho thấp" desc="Thông báo khi hàng sắp hết">
                                <Toggle checked={settings.lowStockAlert} onChange={v => setSettings(s => ({ ...s, lowStockAlert: v }))} />
                            </SettingRow>
                            {settings.lowStockAlert && (
                                <div className="form-group" style={{ marginTop: '12px', marginBottom: '16px', paddingLeft: '16px', borderLeft: '3px solid #ff9800' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Ngưỡng cảnh báo (số lượng)</label>
                                    <input type="number" value={settings.lowStockThreshold} onChange={e => setSettings(s => ({ ...s, lowStockThreshold: +e.target.value }))} className="form-control" />
                                </div>
                            )}
                            <SettingRow label="Cảnh báo hết hạn sử dụng" desc="Thông báo khi sản phẩm sắp hết hạn">
                                <Toggle checked={settings.expiryAlert} onChange={v => setSettings(s => ({ ...s, expiryAlert: v }))} />
                            </SettingRow>
                            {settings.expiryAlert && (
                                <div className="form-group" style={{ marginTop: '12px', marginBottom: '16px', paddingLeft: '16px', borderLeft: '3px solid #ff9800' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Số ngày trước khi hết hạn</label>
                                    <input type="number" value={settings.expiryDays} onChange={e => setSettings(s => ({ ...s, expiryDays: +e.target.value }))} className="form-control" />
                                </div>
                            )}
                            <SettingRow label="Cho phép tồn kho âm" desc="Cho xuất kho khi hết hàng">
                                <Toggle checked={settings.allowNegativeStock} onChange={v => setSettings(s => ({ ...s, allowNegativeStock: v }))} />
                            </SettingRow>
                            <SettingRow label="Tự động đặt hàng" desc="Tự đặt thêm khi dưới ngưỡng">
                                <Toggle checked={settings.autoReorder} onChange={v => setSettings(s => ({ ...s, autoReorder: v }))} />
                            </SettingRow>
                            {settings.autoReorder && (
                                <div className="form-group" style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '3px solid #1a73e8' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Số lượng đặt mặc định</label>
                                    <input type="number" value={settings.autoReorderQty} onChange={e => setSettings(s => ({ ...s, autoReorderQty: +e.target.value }))} className="form-control" />
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'import-export' && (
                        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px 24px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiTruck color="#1a73e8" /> Nhập / Xuất kho</h3>
                            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>Cấu hình quy trình nhập xuất hàng</p>

                            <SettingRow label="In phiếu khi xuất kho" desc="Tự động in phiếu sau khi duyệt xuất">
                                <Toggle checked={settings.printOnExport} onChange={v => setSettings(s => ({ ...s, printOnExport: v }))} />
                            </SettingRow>
                            <SettingRow label="Gửi email thông báo" desc="Email cho quản lý khi có phiếu mới">
                                <Toggle checked={settings.emailNotification} onChange={v => setSettings(s => ({ ...s, emailNotification: v }))} />
                            </SettingRow>
                            <div className="form-group" style={{ marginTop: '16px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Thời gian cho phép trả hàng (ngày)</label>
                                <input type="number" value={settings.returnPolicy} onChange={e => setSettings(s => ({ ...s, returnPolicy: +e.target.value }))} className="form-control" />
                            </div>

                            <div style={{ marginTop: '16px', background: '#e3f2fd', borderRadius: '8px', padding: '12px 16px', fontSize: '0.82rem' }}>
                                <strong>💡 Lưu ý:</strong> Thay đổi cài đặt nhập/xuất sẽ áp dụng cho tất cả phiếu mới. Các phiếu đã tạo không bị ảnh hưởng.
                            </div>
                        </div>
                    )}

                    {activeSection === 'reports' && (
                        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '20px 24px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiFileText color="#28a745" /> Báo cáo & Sao lưu</h3>
                            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>Cấu hình báo cáo và sao lưu dữ liệu kho</p>

                            <SettingRow label="Sao lưu tự động" desc="Tự sao lưu dữ liệu kho định kỳ">
                                <Toggle checked={settings.autoBackup} onChange={v => setSettings(s => ({ ...s, autoBackup: v }))} />
                            </SettingRow>
                            {settings.autoBackup && (
                                <div className="form-group" style={{ marginTop: '12px', marginBottom: '12px', paddingLeft: '16px', borderLeft: '3px solid #28a745' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Tần suất sao lưu</label>
                                    <select value={settings.backupFreq} onChange={e => setSettings(s => ({ ...s, backupFreq: e.target.value }))} className="form-control">
                                        <option value="daily">Hàng ngày</option><option value="weekly">Hàng tuần</option><option value="monthly">Hàng tháng</option>
                                    </select>
                                </div>
                            )}

                            <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <button className="btn btn-secondary" style={{ justifyContent: 'center' }} onClick={() => toast.success('Đã xuất báo cáo tồn kho')}><FiFileText size={14} /> Xuất báo cáo tồn kho</button>
                                <button className="btn btn-secondary" style={{ justifyContent: 'center' }} onClick={() => toast.success('Đã sao lưu dữ liệu kho')}><FiRefreshCw size={14} /> Sao lưu ngay</button>
                            </div>

                            <div style={{ marginTop: '16px', background: '#f8f9fa', borderRadius: '8px', padding: '12px 16px', fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                                <div>Lần sao lưu cuối: <strong>28/02/2026 02:00</strong></div>
                                <div>Dung lượng sao lưu: <strong>12.4 MB</strong></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
