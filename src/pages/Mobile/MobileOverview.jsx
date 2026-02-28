import { useState } from 'react'
import { FiSearch, FiDownload, FiCheck, FiX, FiMessageSquare, FiCalendar, FiStar, FiUsers, FiUser, FiSmartphone, FiGlobe } from 'react-icons/fi'
import { customers } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const TABS = [
    { key: 'appointments', label: 'Lịch hẹn', icon: FiCalendar },
    { key: 'reviews', label: 'Đánh giá', icon: FiStar },
    { key: 'profiles', label: 'Hồ sơ khách hàng', icon: FiUsers },
    { key: 'accounts', label: 'Tài khoản', icon: FiUser },
]

const initialAppointments = customers.slice(0, 8).map((c, i) => ({
    id: i + 1,
    time: i < 5 ? '27/02/2026' : '26/02/2026',
    hour: `${8 + i}:${i % 2 === 0 ? '00' : '30'}`,
    content: ['Nâng cơ Hifu', 'Chăm sóc da', 'Triệt lông', 'Filler môi', 'Peel da', 'Botox', 'Mesotherapy', 'Laser CO2'][i],
    customer: c.name, phone: c.phone,
    source: ['App', 'Website', 'App', 'Website', 'App', 'App', 'Website', 'App'][i],
    status: i < 5 ? 'Đã xử lý' : i === 5 ? 'Chưa xử lý' : i === 6 ? 'Đã hủy' : 'Chưa xử lý',
    notification: i < 6 ? 'Đã gửi' : 'Chưa gửi'
}))

export default function MobileOverview() {
    const [activeTab, setActiveTab] = useState('appointments')
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [data, setData] = useState(initialAppointments)
    const toast = useToast()

    const total = data.length
    const pending = data.filter(a => a.status === 'Chưa xử lý').length
    const processed = data.filter(a => a.status === 'Đã xử lý').length
    const cancelled = data.filter(a => a.status === 'Đã hủy').length

    const filtered = data.filter(a => {
        let match = true
        if (search) {
            const q = search.toLowerCase()
            match = a.customer.toLowerCase().includes(q) || a.phone.includes(q)
        }
        if (statusFilter !== 'all') match = match && a.status === statusFilter
        return match
    })

    const handleProcess = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, status: 'Đã xử lý' } : a))
        toast.success('Đã xử lý lịch hẹn')
    }

    const handleCancel = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, status: 'Đã hủy' } : a))
        toast.info('Đã huỷ lịch hẹn')
    }

    const handleNotify = (id) => {
        setData(prev => prev.map(a => a.id === id ? { ...a, notification: 'Đã gửi' } : a))
        toast.success('Đã gửi thông báo')
    }

    const handleExport = () => {
        const csv = 'Thời gian,Nội dung,Khách hàng,SĐT,Trạng thái\n' + filtered.map(a => `${a.time} ${a.hour},${a.content},${a.customer},${a.phone},${a.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lich-hen-online.csv'; a.click()
        toast.success('Đã xuất CSV')
    }

    const getStatusBadge = (status) => {
        const styles = {
            'Đã xử lý': { background: '#d4edda', color: '#155724' },
            'Chưa xử lý': { background: '#fff3cd', color: '#856404' },
            'Đã hủy': { background: '#f8d7da', color: '#721c24' },
        }
        return <span className="badge" style={{ ...styles[status], fontSize: '11px', fontWeight: 600 }}>{status}</span>
    }

    return (
        <div className="page-container fade-in">
            {/* Header with filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Mobile & Website — Tổng Quan</h1>
                    <p style={{ fontSize: '13px', color: 'var(--gray-500)', margin: '4px 0 0' }}>Quản lý lịch hẹn đặt trực tuyến từ app & website</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select className="filter-select"><option>Tất cả chi nhánh</option></select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: '1px solid var(--gray-200)', borderRadius: '8px', background: '#fff' }}>
                        <FiCalendar size={14} color="var(--gray-400)" />
                        <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>27/02/2026</span>
                    </div>
                </div>
            </div>

            {/* Pill-style Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--gray-50)', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
                {TABS.map(tab => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.key
                    return (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                            fontSize: '13px', fontWeight: isActive ? 600 : 400,
                            background: isActive ? '#198754' : 'transparent',
                            color: isActive ? '#fff' : 'var(--gray-500)',
                            boxShadow: isActive ? '0 2px 8px rgba(25,135,84,0.25)' : 'none',
                            transition: 'all 0.3s'
                        }}>
                            <Icon size={14} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Stat Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {[
                    { label: 'Tổng lịch hẹn', value: total, color: '#198754', bg: '#e8f5e9', icon: FiCalendar },
                    { label: 'Chưa xử lý', value: pending, color: '#ed8936', bg: '#fffaf0', icon: FiSmartphone },
                    { label: 'Đã xử lý', value: processed, color: '#198754', bg: '#e8f5e9', icon: FiCheck },
                    { label: 'Đã hủy', value: cancelled, color: '#e53e3e', bg: '#fef2f2', icon: FiX },
                ].map((s, i) => {
                    const Icon = s.icon
                    return (
                        <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: `4px solid ${s.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={18} color={s.color} />
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 500 }}>{s.label}</div>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
                        </div>
                    )
                })}
            </div>

            {/* Filter + Search Row */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiSearch size={14} style={{ color: 'var(--gray-400)' }} />
                <input type="text" placeholder="Tìm kiếm theo tên, SĐT" value={search} onChange={e => setSearch(e.target.value)}
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', padding: '6px 0' }} />
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tất cả tình trạng</option>
                    <option value="Chưa xử lý">Chưa xử lý</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>
                <button className="btn btn-outline btn-sm" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <FiDownload size={12} /> Xuất dữ liệu
                </button>
            </div>

            {/* Data Table */}
            <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Thời Gian ↕</th>
                            <th>Nội Dung</th>
                            <th>Khách Hàng ↕</th>
                            <th>SĐT</th>
                            <th>Nguồn</th>
                            <th>Thông Báo</th>
                            <th>Trạng Thái ↕</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>Không có dữ liệu</td></tr>
                        ) : filtered.map((apt, i) => (
                            <tr key={apt.id} style={{ background: apt.status === 'Chưa xử lý' ? '#fffbeb' : 'transparent' }}>
                                <td>{i + 1}</td>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{apt.hour}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{apt.time}</div>
                                </td>
                                <td style={{ fontWeight: 500 }}>{apt.content}</td>
                                <td>{apt.customer}</td>
                                <td><span className="link-green">{apt.phone}</span></td>
                                <td>
                                    <span style={{
                                        padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600,
                                        background: apt.source === 'App' ? '#e8f5e9' : '#ebf5fb',
                                        color: apt.source === 'App' ? '#198754' : '#3182ce'
                                    }}>
                                        {apt.source === 'App' ? <><FiSmartphone size={10} style={{ marginRight: '3px' }} />{apt.source}</> : <><FiGlobe size={10} style={{ marginRight: '3px' }} />{apt.source}</>}
                                    </span>
                                </td>
                                <td>
                                    {apt.notification === 'Đã gửi' ? (
                                        <span className="badge" style={{ background: '#d4edda', color: '#155724', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiCheck size={10} /> Đã gửi</span>
                                    ) : (
                                        <button className="btn btn-sm btn-primary" onClick={() => handleNotify(apt.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '3px 8px' }}>
                                            <FiMessageSquare size={10} /> Gửi
                                        </button>
                                    )}
                                </td>
                                <td>{getStatusBadge(apt.status)}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {apt.status === 'Chưa xử lý' && (
                                            <>
                                                <button className="btn btn-sm btn-primary" onClick={() => handleProcess(apt.id)} style={{ padding: '3px 8px' }}><FiCheck size={13} /></button>
                                                <button className="btn btn-sm btn-secondary" onClick={() => handleCancel(apt.id)} style={{ color: '#dc3545', padding: '3px 8px' }}><FiX size={13} /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
