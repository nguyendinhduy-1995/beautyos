import { useState } from 'react'
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin, FiStar, FiEdit2, FiSave, FiSearch, FiCamera, FiMessageSquare, FiActivity, FiAlertTriangle, FiHeart, FiSmile, FiZap } from 'react-icons/fi'
import { customers, formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const profileTabs = [
    { id: 'info', label: 'Thông tin' },
    { id: 'services', label: 'Dịch vụ' },
    { id: 'history', label: 'Tiền sử' },
    { id: 'consult', label: 'Tư vấn' },
    { id: 'treatment', label: 'Điều trị' },
    { id: 'payment', label: 'Thanh Toán' },
    { id: 'card', label: 'Thẻ' },
    { id: 'photos', label: 'Hình ảnh' },
    { id: 'notes', label: 'Ghi chú' },
    { id: 'activity', label: 'Hoạt động' },
]

const activityLog = [
    { time: '14:30', date: '27/02/2026', type: 'visit', desc: 'Đến spa - Chăm sóc da cơ bản', staff: 'Nguyễn Thị Mai', icon: '🏥' },
    { time: '10:00', date: '27/02/2026', type: 'call', desc: 'Gọi nhắc lịch hẹn', staff: 'Phạm Thu Hà', icon: '📞' },
    { time: '09:15', date: '25/02/2026', type: 'sms', desc: 'Gửi SMS khuyến mãi tháng 3', staff: 'Hệ thống', icon: '💬' },
    { time: '11:00', date: '20/02/2026', type: 'visit', desc: 'Đến spa - Nâng cơ Hifu buổi 6', staff: 'Trần Văn Hùng', icon: '🏥' },
    { time: '16:45', date: '18/02/2026', type: 'payment', desc: 'Thanh toán gói liệu trình - 4.000.000đ', staff: 'Lê Hoàng Anh', icon: '💳' },
    { time: '08:30', date: '15/02/2026', type: 'consult', desc: 'Tư vấn combo dịch vụ tháng 2', staff: 'Phạm Thu Hà', icon: '📋' },
    { time: '14:00', date: '10/02/2026', type: 'zalo', desc: 'Gửi bảng giá qua Zalo OA', staff: 'Võ Thị Lan', icon: '📱' },
    { time: '10:30', date: '05/02/2026', type: 'visit', desc: 'Đến spa - Triệt lông buổi 2', staff: 'Nguyễn Thị Mai', icon: '🏥' },
]

const serviceHistory = [
    { id: 1, date: '27/02/2026', service: 'Chăm sóc da cơ bản', staff: 'Nguyễn Thị Mai', price: 500000, status: 'Hoàn thành' },
    { id: 2, date: '20/02/2026', service: 'Triệt lông Laser', staff: 'Trần Văn Hùng', price: 2500000, status: 'Hoàn thành' },
    { id: 3, date: '15/02/2026', service: 'Filler môi', staff: 'Nguyễn Thị Mai', price: 5000000, status: 'Hoàn thành' },
    { id: 4, date: '10/02/2026', service: 'Nâng cơ Hifu', staff: 'Lê Hoàng Anh', price: 8000000, status: 'Hoàn thành' },
    { id: 5, date: '01/02/2026', service: 'Massage body', staff: 'Phạm Thu Hà', price: 800000, status: 'Hoàn thành' },
]

const paymentHistory = [
    { id: 1, date: '27/02/2026', type: 'Thu', desc: 'Chăm sóc da cơ bản', amount: 500000, method: 'Tiền mặt' },
    { id: 2, date: '20/02/2026', type: 'Thu', desc: 'Triệt lông Laser', amount: 2500000, method: 'Chuyển khoản' },
    { id: 3, date: '15/02/2026', type: 'Thu', desc: 'Filler môi', amount: 5000000, method: 'POS' },
    { id: 4, date: '10/02/2026', type: 'Thu', desc: 'Nâng cơ Hifu - Đặt cọc', amount: 4000000, method: 'Tiền mặt' },
    { id: 5, date: '01/02/2026', type: 'Thu', desc: 'Massage body', amount: 800000, method: 'Tiền mặt' },
]

const treatmentHistory = [
    { id: 1, name: 'Liệu trình trắng da', sessions: 10, completed: 6, staff: 'Nguyễn Thị Mai', startDate: '01/01/2026', status: 'Đang thực hiện' },
    { id: 2, name: 'Liệu trình trị mụn', sessions: 5, completed: 5, staff: 'Trần Văn Hùng', startDate: '01/12/2025', status: 'Hoàn thành' },
    { id: 3, name: 'Liệu trình giảm béo', sessions: 12, completed: 3, staff: 'Lê Hoàng Anh', startDate: '15/02/2026', status: 'Đang thực hiện' },
]

export default function CustomerProfile() {
    const [search, setSearch] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState(customers[0])
    const [activeTab, setActiveTab] = useState('info')
    const [editingNote, setEditingNote] = useState(false)
    const [note, setNote] = useState('Khách hàng thân thiết, ưa thích dịch vụ chăm sóc da.')
    const toast = useToast()

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )

    const handleSaveNote = () => { setEditingNote(false); toast.success('Đã lưu ghi chú') }
    const handleSendSMS = () => toast.success(`Đã gửi SMS cho ${selectedCustomer.name}`)
    const handleCall = () => toast.info(`Gọi cho ${selectedCustomer.name}: ${selectedCustomer.phone}`)

    const totalSpent = selectedCustomer?.totalSpent || 0
    const debt = Math.round(totalSpent * 0.15)

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Bộ Hồ Sơ Khách Hàng</h1>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{customers.length} khách hàng</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>
                {/* Left: Customer list */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
                    <div className="search-box" style={{ marginBottom: '12px' }}>
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="Tìm tên, mã, SĐT..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>{filtered.length} kết quả</p>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {filtered.map(c => (
                            <div key={c.id} onClick={() => { setSelectedCustomer(c); setActiveTab('info'); setEditingNote(false) }}
                                style={{
                                    padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '2px',
                                    background: selectedCustomer?.id === c.id ? 'var(--color-primary-light)' : 'transparent',
                                    borderLeft: selectedCustomer?.id === c.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                                    transition: 'all 0.15s'
                                }}
                                onMouseOver={e => { if (selectedCustomer?.id !== c.id) e.currentTarget.style.background = '#f5f5f5' }}
                                onMouseOut={e => { if (selectedCustomer?.id !== c.id) e.currentTarget.style.background = 'transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '34px', height: '34px', borderRadius: '50%',
                                        background: 'var(--color-primary)', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.82rem', fontWeight: '700', flexShrink: 0
                                    }}>{c.name.charAt(0)}</div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{c.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{c.id} · {c.phone}</div>
                                    </div>
                                    {c.group === 'VIP' && <FiStar size={13} color="#e91e63" style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Customer detail */}
                {selectedCustomer && (
                    <div style={{ minWidth: 0 }}>
                        {/* Financial Summary Header */}
                        <div style={{
                            background: 'white', borderRadius: '12px', padding: '16px 24px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '12px',
                            display: 'flex', alignItems: 'center', gap: '16px'
                        }}>
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--color-primary), #34a5f8)',
                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.3rem', fontWeight: '700', flexShrink: 0
                            }}>{selectedCustomer.name.charAt(0)}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <h2 style={{ margin: 0, fontSize: '1.15rem' }}>{selectedCustomer.name}</h2>
                                    <span className={`badge badge-${selectedCustomer.group === 'VIP' ? 'danger' : selectedCustomer.group === 'Gold' ? 'warning' : 'info'}`}>{selectedCustomer.group}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '2px' }}>{selectedCustomer.id} · {selectedCustomer.phone}</div>
                            </div>
                            {/* Financial stats like reference site */}
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1a73e8' }}>{formatCurrency(totalSpent)}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Phát sinh</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#28a745' }}>{formatCurrency(totalSpent - debt)}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Thanh toán</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#e53e3e' }}>{formatCurrency(debt)}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Công nợ</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                <button className="btn btn-sm btn-secondary" onClick={handleCall} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiPhone size={13} /> Gọi</button>
                                <button className="btn btn-sm btn-primary" onClick={handleSendSMS} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiMessageSquare size={13} /> SMS</button>
                            </div>
                        </div>

                        {/* Horizontal Tabs */}
                        <div style={{
                            background: 'white', borderRadius: '12px 12px 0 0', padding: '0 16px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            display: 'flex', overflowX: 'auto', gap: '0', borderBottom: '2px solid var(--color-border)'
                        }}>
                            {profileTabs.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer',
                                        fontSize: '0.82rem', fontWeight: activeTab === tab.id ? '700' : '400',
                                        color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-light)',
                                        borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                                        marginBottom: '-2px', transition: 'all 0.15s', whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div style={{ background: 'white', borderRadius: '0 0 12px 12px', padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            {/* INFO TAB */}
                            {activeTab === 'info' && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                    {/* Column 1: Personal Info */}
                                    <div>
                                        <h4 style={{ fontSize: '0.88rem', color: 'var(--color-primary)', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Thông tin cá nhân</h4>
                                        {[
                                            { icon: <FiUser size={14} />, label: 'Mã KH', value: selectedCustomer.id },
                                            { icon: <FiPhone size={14} />, label: 'Điện thoại', value: selectedCustomer.phone },
                                            { icon: <FiMail size={14} />, label: 'Email', value: selectedCustomer.email },
                                            { icon: <FiCalendar size={14} />, label: 'Ngày sinh', value: selectedCustomer.dob },
                                            { icon: <FiMapPin size={14} />, label: 'Địa chỉ', value: selectedCustomer.address },
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                                <span style={{ color: 'var(--color-primary)', width: '20px' }}>{item.icon}</span>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', width: '75px' }}>{item.label}</span>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Column 2: Assignments + Medical */}
                                    <div>
                                        <h4 style={{ fontSize: '0.88rem', color: 'var(--color-primary)', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Phân công</h4>
                                        {[
                                            { label: 'Nhóm KH', value: selectedCustomer.group },
                                            { label: 'Nguồn', value: 'Facebook' },
                                            { label: 'NV Telesale', value: 'Phạm Thu Hà' },
                                            { label: 'NV Chăm sóc', value: 'Nguyễn Thị Mai' },
                                            { label: 'Chi nhánh', value: 'CN_1834' },
                                            { label: 'Lần ghé cuối', value: selectedCustomer.lastVisit },
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', width: '85px' }}>{item.label}</span>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{item.value}</span>
                                            </div>
                                        ))}
                                        {/* Medical Info */}
                                        <h4 style={{ fontSize: '0.88rem', color: '#e53e3e', marginTop: '16px', marginBottom: '10px', borderBottom: '1px solid #fde8e8', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiAlertTriangle size={14} /> Y tế & Dị ứng</h4>
                                        <div style={{ padding: '10px', background: '#fff5f5', borderRadius: '8px', border: '1px solid #fee2e2', marginBottom: '6px' }}>
                                            <div style={{ fontSize: '0.78rem', color: '#e53e3e', fontWeight: 600, marginBottom: '4px' }}>Dị ứng</div>
                                            <div style={{ fontSize: '0.82rem', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                {['AHA', 'Retinol'].map(a => <span key={a} style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 600 }}>{a}</span>)}
                                            </div>
                                        </div>
                                        <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
                                            <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600, marginBottom: '4px' }}>Loại da</div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>Da hỗn hợp, nhạy cảm</div>
                                        </div>
                                    </div>
                                    {/* Column 3: Stats & Satisfaction */}
                                    <div>
                                        <h4 style={{ fontSize: '0.88rem', color: 'var(--color-primary)', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>Thống kê</h4>
                                        <div style={{ display: 'grid', gap: '8px' }}>
                                            {[
                                                { label: 'Tổng chi tiêu', value: formatCurrency(totalSpent), color: '#1a73e8', bg: '#f0f7ff' },
                                                { label: 'Lần ghé thăm', value: selectedCustomer.visits, color: '#28a745', bg: '#f0fff4' },
                                                { label: 'Điểm tích lũy', value: Math.round(totalSpent / 10000), color: '#ff9800', bg: '#fff8e1' },
                                                { label: 'Lần cuối', value: selectedCustomer.lastVisit, color: '#6c757d', bg: '#f8f9fa' },
                                            ].map((item, i) => (
                                                <div key={i} style={{ padding: '10px 12px', background: item.bg, borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{item.label}</span>
                                                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: item.color }}>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Satisfaction Score */}
                                        <h4 style={{ fontSize: '0.88rem', color: '#e91e63', marginTop: '16px', marginBottom: '10px', borderBottom: '1px solid #fce4ec', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiHeart size={14} /> Mức độ hài lòng</h4>
                                        <div style={{ padding: '12px', background: '#fdf2f8', borderRadius: '10px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#e91e63' }}>4.5</div>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', margin: '4px 0' }}>
                                                {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ fontSize: '1.1rem' }}>{s <= 4 ? '⭐' : '☆'}</span>)}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: '#be185d' }}>Dựa trên 8 đánh giá</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SERVICES TAB */}
                            {activeTab === 'services' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Lịch sử dịch vụ</h4>
                                    <table className="data-table">
                                        <thead><tr><th>#</th><th>Ngày</th><th>Dịch vụ</th><th>NV thực hiện</th><th>Giá</th><th>Trạng thái</th></tr></thead>
                                        <tbody>
                                            {serviceHistory.map((s, i) => (
                                                <tr key={s.id}>
                                                    <td>{i + 1}</td><td>{s.date}</td>
                                                    <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{s.service}</td>
                                                    <td>{s.staff}</td>
                                                    <td style={{ fontWeight: '600' }}>{formatCurrency(s.price)}</td>
                                                    <td><span className="badge badge-success">{s.status}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* TREATMENT TAB */}
                            {activeTab === 'treatment' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Liệu trình</h4>
                                    <div style={{ display: 'grid', gap: '12px' }}>
                                        {treatmentHistory.map(t => (
                                            <div key={t.id} style={{ padding: '16px', background: '#f8f9fa', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{t.name}</span>
                                                    <span className={`badge badge-${t.status === 'Hoàn thành' ? 'success' : 'info'}`}>{t.status}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>
                                                    <span>NV: {t.staff}</span><span>Bắt đầu: {t.startDate}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                                        <div style={{ width: `${(t.completed / t.sessions) * 100}%`, height: '100%', borderRadius: '4px', background: t.completed === t.sessions ? '#28a745' : 'var(--color-primary)', transition: 'width 0.3s' }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>{t.completed}/{t.sessions} buổi</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PAYMENT TAB */}
                            {activeTab === 'payment' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Lịch sử thanh toán</h4>
                                    <table className="data-table">
                                        <thead><tr><th>#</th><th>Ngày</th><th>Loại</th><th>Diễn giải</th><th>Số tiền</th><th>Hình thức</th></tr></thead>
                                        <tbody>
                                            {paymentHistory.map((p, i) => (
                                                <tr key={p.id}>
                                                    <td>{i + 1}</td><td>{p.date}</td>
                                                    <td><span className="badge badge-success">{p.type}</span></td>
                                                    <td>{p.desc}</td>
                                                    <td style={{ fontWeight: '700', color: '#28a745' }}>{formatCurrency(p.amount)}</td>
                                                    <td>{p.method}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* HISTORY TAB */}
                            {activeTab === 'history' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Tiền sử khám</h4>
                                    <div style={{ display: 'grid', gap: '10px' }}>
                                        {[
                                            { date: '27/02/2026', title: 'Tư vấn chăm sóc da', doctor: 'BS. Nguyễn Thị Mai', diag: 'Da khô, thiếu ẩm, cần liệu trình dưỡng ẩm chuyên sâu' },
                                            { date: '15/02/2026', title: 'Khám da liễu', doctor: 'BS. Trần Văn Hùng', diag: 'Mụn cám vùng T, sẹo mụn nhẹ. Chỉ định: Mesotherapy + PRP' },
                                            { date: '01/01/2026', title: 'Khám ban đầu', doctor: 'BS. Nguyễn Thị Mai', diag: 'Lão hóa cấp 2, nếp nhăn vùng mắt, da sạm. Chỉ định: Botox + Filler' },
                                        ].map((h, i) => (
                                            <div key={i} style={{ padding: '14px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '3px solid var(--color-primary)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{h.title}</span>
                                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{h.date}</span>
                                                </div>
                                                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>{h.doctor}</div>
                                                <div style={{ fontSize: '0.85rem' }}>{h.diag}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CONSULT TAB */}
                            {activeTab === 'consult' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Lịch sử tư vấn</h4>
                                    <div style={{ display: 'grid', gap: '10px' }}>
                                        {[
                                            { date: '27/02/2026', staff: 'Phạm Thu Hà', channel: 'Tại spa', status: 'Đã tư vấn', note: 'KH quan tâm gói liệu trình trắng da 10 buổi. Sẽ quay lại tuần sau.' },
                                            { date: '20/02/2026', staff: 'Phạm Thu Hà', channel: 'Điện thoại', status: 'Đã tư vấn', note: 'Nhắc lịch hẹn triệt lông, KH xác nhận tới đúng hẹn.' },
                                            { date: '10/02/2026', staff: 'Võ Thị Lan', channel: 'Zalo', status: 'Chờ phản hồi', note: 'Gửi bảng giá combo dịch vụ tháng 2, KH chưa phản hồi.' },
                                        ].map((c, i) => (
                                            <div key={i} style={{ padding: '14px', background: '#f8f9fa', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.status === 'Đã tư vấn' ? '#28a745' : '#ff9800', marginTop: '6px', flexShrink: 0 }} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                                        <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{c.staff} — {c.channel}</span>
                                                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{c.date}</span>
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>{c.note}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CARD TAB */}
                            {activeTab === 'card' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Thẻ khách hàng</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {[
                                            { name: 'Thẻ thành viên VIP', code: 'TV-001', balance: 5000000, type: 'Nạp tiền', color: '#e91e63' },
                                            { name: 'Thẻ liệu trình trắng da', code: 'LT-003', balance: 3, type: 'Liệu trình', color: '#1a73e8' },
                                        ].map((card, i) => (
                                            <div key={i} style={{
                                                padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)',
                                                background: `linear-gradient(135deg, ${card.color}08, ${card.color}15)`
                                            }}>
                                                <div style={{ fontWeight: '700', color: card.color, marginBottom: '4px' }}>{card.name}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '8px' }}>Mã: {card.code}</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>
                                                    {card.type === 'Nạp tiền' ? formatCurrency(card.balance) : `${card.balance} buổi còn lại`}
                                                </div>
                                                <span className="badge badge-info" style={{ marginTop: '4px' }}>{card.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PHOTOS TAB */}
                            {activeTab === 'photos' && (
                                <div>
                                    <h4 style={{ fontSize: '0.88rem', marginBottom: '12px' }}>Hình ảnh khách hàng</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                        {['Trước điều trị - 01/01', 'Sau buổi 3 - 15/01', 'Sau buổi 6 - 01/02', 'Sau buổi 10 - 20/02'].map((label, i) => (
                                            <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                                <div style={{
                                                    height: '120px', background: `linear-gradient(${135 + i * 30}deg, #e0e7ff, #f0fdf4)`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <FiCamera size={24} color="var(--color-text-light)" />
                                                </div>
                                                <div style={{ padding: '8px', fontSize: '0.78rem', textAlign: 'center', color: 'var(--color-text-light)' }}>{label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* NOTES TAB */}
                            {activeTab === 'notes' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h4 style={{ fontSize: '0.88rem', margin: 0 }}>Ghi chú</h4>
                                        {editingNote ? (
                                            <button className="btn btn-sm btn-primary" onClick={handleSaveNote} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiSave size={13} /> Lưu</button>
                                        ) : (
                                            <button className="btn btn-sm btn-secondary" onClick={() => setEditingNote(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiEdit2 size={13} /> Sửa</button>
                                        )}
                                    </div>
                                    {editingNote ? (
                                        <textarea value={note} onChange={e => setNote(e.target.value)}
                                            style={{ width: '100%', minHeight: '120px', padding: '12px', border: '2px solid var(--color-primary)', borderRadius: '8px', fontSize: '0.9rem', resize: 'vertical' }} />
                                    ) : (
                                        <div style={{ padding: '14px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                            {note || 'Chưa có ghi chú'}
                                        </div>
                                    )}
                                    <div style={{ marginTop: '16px' }}>
                                        <h4 style={{ fontSize: '0.88rem', marginBottom: '8px' }}>Lịch sử ghi chú</h4>
                                        {[
                                            { date: '27/02/2026', staff: 'Admin', content: 'Khách hàng thân thiết, ưa thích dịch vụ chăm sóc da.' },
                                            { date: '15/02/2026', staff: 'Nguyễn Thị Mai', content: 'KH dị ứng nhẹ với thành phần AHA, cần lưu ý khi sử dụng peel da.' },
                                            { date: '01/01/2026', staff: 'Phạm Thu Hà', content: 'KH đăng ký gói VIP, được ưu đãi 15% tất cả dịch vụ.' },
                                        ].map((n, i) => (
                                            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #f0f0f0', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{n.staff}</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{n.date}</span>
                                                </div>
                                                <div>{n.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ACTIVITY TIMELINE TAB */}
                            {activeTab === 'activity' && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h4 style={{ fontSize: '0.88rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><FiActivity size={16} color="var(--color-primary)" /> Dòng thời gian hoạt động</h4>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{activityLog.length} hoạt động gần đây</span>
                                    </div>
                                    <div style={{ position: 'relative', paddingLeft: '28px' }}>
                                        {/* Timeline line */}
                                        <div style={{ position: 'absolute', left: '11px', top: '4px', bottom: '4px', width: '2px', background: 'linear-gradient(to bottom, var(--color-primary), #e0e7ff)' }} />
                                        {activityLog.map((a, i) => (
                                            <div key={i} style={{ position: 'relative', marginBottom: '16px', paddingBottom: i < activityLog.length - 1 ? '0' : '0' }}>
                                                {/* Dot */}
                                                <div style={{
                                                    position: 'absolute', left: '-23px', top: '4px',
                                                    width: '14px', height: '14px', borderRadius: '50%',
                                                    background: a.type === 'visit' ? '#28a745' : a.type === 'call' ? '#1a73e8' : a.type === 'payment' ? '#e91e63' : a.type === 'sms' ? '#ff9800' : '#6c757d',
                                                    border: '2px solid white', boxShadow: '0 0 0 2px #e0e7ff'
                                                }} />
                                                <div style={{
                                                    padding: '12px 16px', background: '#f8f9fa', borderRadius: '10px',
                                                    border: '1px solid var(--color-border)', transition: 'all 0.15s',
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.icon} {a.desc}</span>
                                                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', whiteSpace: 'nowrap', marginLeft: '8px' }}>{a.time} · {a.date}</span>
                                                    </div>
                                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>NV: {a.staff}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
