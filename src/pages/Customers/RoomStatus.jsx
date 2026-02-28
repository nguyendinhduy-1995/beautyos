import { useState, useEffect } from 'react'
import { FiHome, FiUser, FiRefreshCw, FiCheck, FiClock, FiTool, FiAlertCircle, FiPlay } from 'react-icons/fi'
import { rooms as initialRooms } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

// Add startTime for occupied rooms
const enrichedRooms = initialRooms.map(r => ({
    ...r,
    startTime: r.status === 'occupied' ? Date.now() - Math.floor(Math.random() * 3600000) : null,
    duration: r.status === 'occupied' ? (30 + Math.floor(Math.random() * 60)) : null, // minutes
    staff: r.status === 'occupied' ? ['Nguyễn Thị Mai', 'Trần Văn Hùng', 'Lê Hoàng Anh'][Math.floor(Math.random() * 3)] : null,
}))

export default function RoomStatus() {
    const [data, setData] = useState(enrichedRooms)
    const [selectedFloor, setSelectedFloor] = useState('')
    const [viewMode, setViewMode] = useState('grid') // grid | list
    const [now, setNow] = useState(Date.now())
    const toast = useToast()

    // Real-time timer
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [])

    const floors = [...new Set(data.map(r => r.floor))]
    const filteredRooms = selectedFloor ? data.filter(r => r.floor === selectedFloor) : data
    const groupedByFloor = floors.map(floor => ({
        floor, rooms: filteredRooms.filter(r => r.floor === floor)
    })).filter(g => g.rooms.length > 0)

    const available = data.filter(r => r.status === 'available').length
    const occupied = data.filter(r => r.status === 'occupied').length
    const cleaning = data.filter(r => r.status === 'cleaning').length
    const maintenance = data.filter(r => r.status === 'maintenance').length

    const getElapsed = (startTime) => {
        if (!startTime) return '00:00'
        const diff = Math.floor((now - startTime) / 1000)
        const h = Math.floor(diff / 3600)
        const m = Math.floor((diff % 3600) / 60)
        const s = diff % 60
        return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }

    const getProgress = (startTime, duration) => {
        if (!startTime || !duration) return 0
        const elapsed = (now - startTime) / 60000
        return Math.min(100, (elapsed / duration) * 100)
    }

    const cycleStatus = (roomId) => {
        const order = ['available', 'occupied', 'cleaning']
        setData(prev => prev.map(r => {
            if (r.id !== roomId) return r
            const next = order[(order.indexOf(r.status) + 1) % order.length]
            return {
                ...r, status: next,
                customer: next === 'occupied' ? 'Khách mới' : next === 'available' ? null : r.customer,
                service: next === 'occupied' ? 'Dịch vụ' : next === 'available' ? null : r.service,
                startTime: next === 'occupied' ? Date.now() : null,
                duration: next === 'occupied' ? 45 : null,
                staff: next === 'occupied' ? 'Nguyễn Thị Mai' : null,
            }
        }))
        toast.info(`Cập nhật trạng thái phòng ${roomId}`)
    }

    const setAllAvailable = () => {
        setData(prev => prev.map(r => ({ ...r, status: 'available', customer: null, service: null, startTime: null, duration: null, staff: null })))
        toast.success('Đã đặt tất cả phòng về trạng thái trống')
    }

    const statusConfig = {
        available: { color: '#28a745', bg: '#f0fff4', label: 'Trống', icon: <FiCheck size={14} /> },
        occupied: { color: '#dc3545', bg: '#fff5f5', label: 'Đang sử dụng', icon: <FiUser size={14} /> },
        cleaning: { color: '#ffc107', bg: '#fffbeb', label: 'Đang dọn', icon: <FiTool size={14} /> },
        maintenance: { color: '#6c757d', bg: '#f5f5f5', label: 'Bảo trì', icon: <FiAlertCircle size={14} /> },
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Trạng Thái Phòng</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Click vào phòng để đổi trạng thái · Cập nhật thời gian thực</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <button onClick={() => setViewMode('grid')} style={{
                            padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem',
                            background: viewMode === 'grid' ? 'var(--color-primary)' : 'white',
                            color: viewMode === 'grid' ? 'white' : 'var(--color-text)'
                        }}>▦ Grid</button>
                        <button onClick={() => setViewMode('list')} style={{
                            padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem',
                            background: viewMode === 'list' ? 'var(--color-primary)' : 'white',
                            color: viewMode === 'list' ? 'white' : 'var(--color-text)'
                        }}>☰ List</button>
                    </div>
                    <button className="btn btn-secondary" onClick={setAllAvailable}><FiRefreshCw size={14} /> Đặt tất cả trống</button>
                </div>
            </div>

            {/* Stats with real-time indicators */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #28a745' }}>
                    <div className="stat-icon" style={{ background: '#e8f5e9' }}><FiCheck color="#28a745" /></div>
                    <div><div className="stat-label">Trống</div><div className="stat-value" style={{ color: '#28a745' }}>{available}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #dc3545' }}>
                    <div className="stat-icon" style={{ background: '#ffebee' }}><FiUser color="#dc3545" /></div>
                    <div><div className="stat-label">Đang sử dụng</div><div className="stat-value" style={{ color: '#dc3545' }}>{occupied}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ffc107' }}>
                    <div className="stat-icon" style={{ background: '#fff8e1' }}><FiTool color="#ffc107" /></div>
                    <div><div className="stat-label">Đang dọn</div><div className="stat-value" style={{ color: '#ffc107' }}>{cleaning}</div></div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #1a73e8' }}>
                    <div className="stat-icon" style={{ background: '#e3f2fd' }}><FiHome color="#1a73e8" /></div>
                    <div><div className="stat-label">Tổng phòng</div><div className="stat-value">{data.length}</div></div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <select className="filter-select" value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)}>
                    <option value="">Tất cả tầng</option>
                    {floors.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {Object.entries(statusConfig).map(([k, v]) => (
                        <span key={k} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: v.color }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: v.color, display: 'inline-block' }} />
                            {v.label}
                        </span>
                    ))}
                </div>
            </div>

            {viewMode === 'grid' ? (
                // GRID VIEW
                groupedByFloor.map(group => (
                    <div key={group.floor} style={{ marginBottom: '24px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-primary)' }}>
                            <FiHome /> {group.floor}
                            <span style={{ fontSize: '0.8rem', fontWeight: '400', color: 'var(--color-text-light)' }}>
                                ({group.rooms.length} phòng · {group.rooms.filter(r => r.status === 'available').length} trống)
                            </span>
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                            {group.rooms.map((room) => {
                                const cfg = statusConfig[room.status] || statusConfig.available
                                const progress = getProgress(room.startTime, room.duration)
                                const isOvertime = progress >= 100
                                return (
                                    <div key={room.id} onClick={() => cycleStatus(room.id)} style={{
                                        border: `2px solid ${cfg.color}`,
                                        borderRadius: '12px', padding: '16px',
                                        background: cfg.bg,
                                        transition: 'all 0.2s', cursor: 'pointer',
                                        position: 'relative', overflow: 'hidden'
                                    }}
                                        onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)' }}
                                        onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}>
                                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '1.15rem', fontWeight: '700' }}>{room.id}</span>
                                            <span className={`badge badge-${room.status === 'available' ? 'success' : room.status === 'occupied' ? 'danger' : 'warning'}`}>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        {room.status === 'occupied' && (
                                            <>
                                                <div style={{ fontSize: '0.82rem', marginBottom: '6px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                        <FiUser size={12} color={cfg.color} /> <strong>{room.customer}</strong>
                                                    </div>
                                                    <div style={{ color: 'var(--color-text-light)', marginBottom: '3px' }}>
                                                        <FiPlay size={10} style={{ marginRight: '4px' }} />{room.service}
                                                    </div>
                                                    {room.staff && <div style={{ color: 'var(--color-text-light)', fontSize: '0.78rem' }}>KTV: {room.staff}</div>}
                                                </div>
                                                {/* Real-time timer */}
                                                <div className="mobile-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                    <span style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'monospace', color: isOvertime ? '#dc3545' : cfg.color }}>
                                                        {getElapsed(room.startTime)}
                                                    </span>
                                                    {room.duration && (
                                                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>/ {room.duration} phút</span>
                                                    )}
                                                </div>
                                                {/* Progress bar */}
                                                {room.duration && (
                                                    <div style={{ height: '4px', background: '#e9ecef', borderRadius: '2px', overflow: 'hidden' }}>
                                                        <div style={{
                                                            width: `${Math.min(progress, 100)}%`, height: '100%', borderRadius: '2px',
                                                            background: isOvertime ? '#dc3545' : progress > 80 ? '#ff9800' : '#28a745',
                                                            transition: 'width 1s linear'
                                                        }} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {room.status === 'cleaning' && (
                                            <div style={{ fontSize: '0.82rem', color: '#ffc107', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <FiTool size={12} /> Đang dọn dẹp...
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))
            ) : (
                // LIST VIEW
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th>Phòng</th><th>Tầng</th><th>Trạng thái</th><th>Khách hàng</th><th>Dịch vụ</th><th>KTV</th><th>Thời gian</th><th>Tiến độ</th></tr></thead>
                        <tbody>
                            {filteredRooms.map(room => {
                                const cfg = statusConfig[room.status] || statusConfig.available
                                const progress = getProgress(room.startTime, room.duration)
                                return (
                                    <tr key={room.id} style={{ background: room.status === 'occupied' ? '#fff5f5' : room.status === 'cleaning' ? '#fffbeb' : undefined, cursor: 'pointer' }}
                                        onClick={() => cycleStatus(room.id)}>
                                        <td style={{ fontWeight: '700', fontSize: '1rem' }}>{room.id}</td>
                                        <td>{room.floor}</td>
                                        <td><span className={`badge badge-${room.status === 'available' ? 'success' : room.status === 'occupied' ? 'danger' : 'warning'}`}>{cfg.label}</span></td>
                                        <td>{room.customer || '—'}</td>
                                        <td>{room.service || '—'}</td>
                                        <td>{room.staff || '—'}</td>
                                        <td style={{ fontFamily: 'monospace', fontWeight: '600', color: cfg.color }}>
                                            {room.startTime ? getElapsed(room.startTime) : '—'}
                                        </td>
                                        <td style={{ minWidth: '100px' }}>
                                            {room.duration ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <div style={{ flex: 1, height: '6px', background: '#e9ecef', borderRadius: '3px' }}>
                                                        <div style={{ width: `${Math.min(progress, 100)}%`, height: '100%', borderRadius: '3px', background: progress >= 100 ? '#dc3545' : '#28a745' }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{Math.round(progress)}%</span>
                                                </div>
                                            ) : '—'}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
