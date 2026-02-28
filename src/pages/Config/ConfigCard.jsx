import { useState } from 'react'
import { FiSave, FiCreditCard, FiSettings, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

export default function ConfigCard() {
    const toast = useToast()
    const [config, setConfig] = useState({
        autoExpire: true, expireMonths: 12, autoNotifyExpire: true, notifyDaysBefore: 7,
        allowTransfer: false, transferFee: 50000, allowRefund: true, refundFeePercent: 10,
        minRecharge: 500000, maxRecharge: 100000000, pointsPerSpend: 1000, pointsValue: 1,
        enableCardTypes: { VIP: true, Platinum: true, Gold: true, Silver: true, Member: true },
        requireApproval: false, printOnCreate: true
    })

    const handleChange = (field, value) => setConfig(prev => ({ ...prev, [field]: value }))
    const toggleCardType = (type) => setConfig(prev => ({ ...prev, enableCardTypes: { ...prev.enableCardTypes, [type]: !prev.enableCardTypes[type] } }))

    const Toggle = ({ on, onClick }) => (
        <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: on ? '#28a745' : '#ccc' }}>
            {on ? <FiToggleRight size={24} /> : <FiToggleLeft size={24} />}
        </button>
    )

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Cấu Hình Thẻ</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Cài đặt cấu hình cho hệ thống thẻ</p>
                </div>
                <button className="btn btn-primary" onClick={() => toast.success('Đã lưu cấu hình')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiSave size={14} /> Lưu Cấu Hình</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Card Expiration */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiCreditCard size={18} color="var(--color-primary)" /> Hết hạn thẻ</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Tự động hết hạn</span>
                            <Toggle on={config.autoExpire} onClick={() => handleChange('autoExpire', !config.autoExpire)} />
                        </div>
                        <div className="form-group"><label>Thời hạn (tháng)</label><input className="form-control" type="number" value={config.expireMonths} onChange={e => handleChange('expireMonths', parseInt(e.target.value))} /></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Thông báo sắp hết hạn</span>
                            <Toggle on={config.autoNotifyExpire} onClick={() => handleChange('autoNotifyExpire', !config.autoNotifyExpire)} />
                        </div>
                        <div className="form-group"><label>Thông báo trước (ngày)</label><input className="form-control" type="number" value={config.notifyDaysBefore} onChange={e => handleChange('notifyDaysBefore', parseInt(e.target.value))} /></div>
                    </div>
                </div>

                {/* Transfer & Refund */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiSettings size={18} color="#ff9800" /> Chuyển nhượng & Hoàn tiền</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Cho phép chuyển thẻ</span>
                            <Toggle on={config.allowTransfer} onClick={() => handleChange('allowTransfer', !config.allowTransfer)} />
                        </div>
                        <div className="form-group"><label>Phí chuyển nhượng</label><input className="form-control" type="number" value={config.transferFee} onChange={e => handleChange('transferFee', parseInt(e.target.value))} /></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Cho phép hoàn tiền</span>
                            <Toggle on={config.allowRefund} onClick={() => handleChange('allowRefund', !config.allowRefund)} />
                        </div>
                        <div className="form-group"><label>Phí hoàn tiền (%)</label><input className="form-control" type="number" value={config.refundFeePercent} onChange={e => handleChange('refundFeePercent', parseInt(e.target.value))} /></div>
                    </div>
                </div>

                {/* Recharge Limits */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiCreditCard size={18} color="#28a745" /> Nạp tiền & Điểm</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="form-group"><label>Nạp tối thiểu</label><input className="form-control" type="number" value={config.minRecharge} onChange={e => handleChange('minRecharge', parseInt(e.target.value))} /></div>
                        <div className="form-group"><label>Nạp tối đa</label><input className="form-control" type="number" value={config.maxRecharge} onChange={e => handleChange('maxRecharge', parseInt(e.target.value))} /></div>
                        <div className="form-group"><label>Tích điểm mỗi (VNĐ chi tiêu)</label><input className="form-control" type="number" value={config.pointsPerSpend} onChange={e => handleChange('pointsPerSpend', parseInt(e.target.value))} /></div>
                        <div className="form-group"><label>Giá trị 1 điểm (VNĐ)</label><input className="form-control" type="number" value={config.pointsValue} onChange={e => handleChange('pointsValue', parseInt(e.target.value))} /></div>
                    </div>
                </div>

                {/* Card Types */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><FiSettings size={18} color="#6f42c1" /> Loại thẻ & Quy trình</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {Object.entries(config.enableCardTypes).map(([type, enabled]) => (
                            <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem' }}>Thẻ {type}</span>
                                <Toggle on={enabled} onClick={() => toggleCardType(type)} />
                            </div>
                        ))}
                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '0.9rem' }}>Yêu cầu duyệt khi tạo thẻ</span>
                                <Toggle on={config.requireApproval} onClick={() => handleChange('requireApproval', !config.requireApproval)} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem' }}>In thẻ khi tạo</span>
                                <Toggle on={config.printOnCreate} onClick={() => handleChange('printOnCreate', !config.printOnCreate)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
