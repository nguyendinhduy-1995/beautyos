import React, { useState } from 'react'
import { appointments } from '../../data/mockData'
import { FiClock, FiUser, FiRefreshCw, FiActivity, FiCheckCircle, FiXCircle } from 'react-icons/fi'

export default function RealtimeView() {
    const [, setRefresh] = useState(0)
    const now = new Date()

    const statusMap = {
        'pending': { label: 'Đang chờ', bg: '#fff8e1', color: '#f57f17', border: '#ffe082' },
        'arrived': { label: 'Đã đến', bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
        'completed': { label: 'Hoàn thành', bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
        'cancelled': { label: 'Đã hủy', bg: '#ffebee', color: '#c62828', border: '#ef9a9a' },
    }

    const statusCounts = {
        'Đang chờ': appointments.filter(a => a.status === 'pending').length,
        'Đã đến': appointments.filter(a => a.status === 'arrived').length,
        'Hoàn thành': appointments.filter(a => a.status === 'completed').length,
        'Đã hủy': appointments.filter(a => a.status === 'cancelled').length,
    }

    const statusIcons = { 'Đang chờ': <FiClock />, 'Đã đến': <FiUser />, 'Hoàn thành': <FiCheckCircle />, 'Đã hủy': <FiXCircle /> }
    const statusColors = { 'Đang chờ': '#f57f17', 'Đã đến': '#2e7d32', 'Hoàn thành': '#1565c0', 'Đã hủy': '#c62828' }
    const statusBgs = { 'Đang chờ': '#fff8e1', 'Đã đến': '#e8f5e9', 'Hoàn thành': '#e3f2fd', 'Đã hủy': '#ffebee' }
    const statusBorders = { 'Đang chờ': '#ffe082', 'Đã đến': '#a5d6a7', 'Hoàn thành': '#90caf9', 'Đã hủy': '#ef9a9a' }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title"><FiActivity style={{ marginRight: '8px' }} />Theo Dõi Thời Gian Thực</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                        Cập nhật lúc: {now.toLocaleTimeString('vi-VN')}
                    </span>
                    <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setRefresh(v => v + 1)}>
                        <FiRefreshCw size={14} /> Làm mới
                    </button>
                </div>
            </div>

            {/* Thẻ thống kê */}
            <div className="stats-grid" style={{ marginBottom: '24px' }}>
                {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="stat-card" style={{ borderLeft: `4px solid ${statusBorders[status]}` }}>
                        <div className="stat-icon" style={{ background: statusBgs[status] }}>
                            {React.cloneElement(statusIcons[status], { color: statusColors[status] })}
                        </div>
                        <div>
                            <div className="stat-label">{status}</div>
                            <div className="stat-value" style={{ color: statusColors[status] }}>{count}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dòng thời gian */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: '20px' }}>Dòng thời gian</h3>
                <div style={{ position: 'relative', paddingLeft: '30px' }}>
                    <div style={{ position: 'absolute', left: '12px', top: '0', bottom: '0', width: '2px', background: '#e0e0e0' }} />
                    {appointments.map((apt, i) => {
                        const sc = statusMap[apt.status] || statusMap['cancelled']
                        return (
                            <div key={apt.id} style={{
                                position: 'relative', marginBottom: '16px', paddingLeft: '20px',
                                animation: `fadeIn 0.3s ease ${i * 0.05}s both`
                            }}>
                                <div style={{
                                    position: 'absolute', left: '-7px', top: '4px',
                                    width: '14px', height: '14px', borderRadius: '50%',
                                    background: sc.color, border: '3px solid white', boxShadow: '0 0 0 2px ' + sc.border
                                }} />
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '12px 16px', background: sc.bg, borderRadius: '10px',
                                    border: `1px solid ${sc.border}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: sc.color, minWidth: '90px' }}>{apt.time}</span>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{apt.customerName}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{apt.type} · {apt.content}</div>
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem',
                                        background: sc.color, color: 'white', fontWeight: '600'
                                    }}>
                                        {sc.label}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
            `}</style>
        </div>
    )
}
