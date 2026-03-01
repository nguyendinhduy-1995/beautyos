import { useState } from 'react'
import { FiHome, FiPlus, FiEdit2, FiTrash2, FiX, FiUser, FiLayers, FiGrid, FiChevronDown, FiChevronRight, FiCheck } from 'react-icons/fi'
import { staff } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

// Initial demo data — hierarchy: floors → rooms → beds
const initialFloorsData = [
    {
        id: 'F1', name: 'Tầng 1', manager: 'Đặng Quốc Bảo',
        rooms: [
            {
                id: 'F1-R1', name: 'Phòng điều trị 1', type: 'Phòng điều trị', manager: 'Phạm Thị Hồng', beds: [
                    { id: 'F1-R1-B1', name: 'Giường 1', manager: 'Lê Thị Ngọc', status: 'available' },
                    { id: 'F1-R1-B2', name: 'Giường 2', manager: 'Mai Thị Quỳnh', status: 'occupied' },
                ]
            },
            {
                id: 'F1-R2', name: 'Phòng tư vấn', type: 'Phòng tư vấn', manager: 'Cao Thanh Sơn', beds: [
                    { id: 'F1-R2-B1', name: 'Giường 1', manager: 'Tô Thị Vy', status: 'available' },
                ]
            },
            {
                id: 'F1-R3', name: 'Phòng VIP', type: 'Phòng VIP', manager: 'Đỗ Hữu Nghĩa', beds: [
                    { id: 'F1-R3-B1', name: 'Giường 1', manager: 'Lưu Trọng Tú', status: 'cleaning' },
                    { id: 'F1-R3-B2', name: 'Giường 2', manager: 'Dương Thị Thủy', status: 'available' },
                    { id: 'F1-R3-B3', name: 'Giường 3', manager: 'Lưu Thị Kim', status: 'maintenance' },
                ]
            },
        ]
    },
    {
        id: 'F2', name: 'Tầng 2', manager: 'Tô Đức Minh',
        rooms: [
            {
                id: 'F2-R1', name: 'Phòng spa 1', type: 'Phòng spa', manager: 'Nguyễn Thị Bích', beds: [
                    { id: 'F2-R1-B1', name: 'Giường 1', manager: 'Hồ Thị Mai', status: 'occupied' },
                    { id: 'F2-R1-B2', name: 'Giường 2', manager: 'Vũ Thị Quỳnh', status: 'available' },
                ]
            },
            {
                id: 'F2-R2', name: 'Phòng điều trị 2', type: 'Phòng điều trị', manager: 'Lý Thị Linh', beds: [
                    { id: 'F2-R2-B1', name: 'Giường 1', manager: 'Trần Thị Xuân', status: 'available' },
                ]
            },
        ]
    },
]

const ROOM_TYPES = ['Phòng điều trị', 'Phòng tư vấn', 'Phòng spa', 'Phòng VIP', 'Phòng phẫu thuật', 'Phòng chờ', 'Phòng laser', 'Phòng xông hơi']
const BED_STATUSES = { available: { label: 'Trống', color: '#22c55e', bg: '#f0fdf4' }, occupied: { label: 'Đang sử dụng', color: '#ef4444', bg: '#fef2f2' }, cleaning: { label: 'Đang dọn', color: '#f59e0b', bg: '#fffbeb' }, maintenance: { label: 'Bảo trì', color: '#6b7280', bg: '#f9fafb' } }

const staffNames = staff.filter(s => s.status === 'active').map(s => s.name)

export default function RoomStatus() {
    const [floors, setFloors] = useState(initialFloorsData)
    const [expandedFloors, setExpandedFloors] = useState(floors.map(f => f.id))
    const [expandedRooms, setExpandedRooms] = useState([])
    const [modal, setModal] = useState(null) // { type: 'addFloor'|'editFloor'|'addRoom'|'editRoom'|'addBed'|'editBed', data, parent }
    const toast = useToast()

    const toggleFloor = (fid) => setExpandedFloors(p => p.includes(fid) ? p.filter(x => x !== fid) : [...p, fid])
    const toggleRoom = (rid) => setExpandedRooms(p => p.includes(rid) ? p.filter(x => x !== rid) : [...p, rid])

    // CRUD: Floor
    const addFloor = (name, manager) => {
        const id = 'F' + (Date.now() % 10000)
        setFloors(p => [...p, { id, name, manager, rooms: [] }])
        setExpandedFloors(p => [...p, id])
        toast.success(`Đã thêm ${name}`)
    }
    const editFloor = (fid, name, manager) => {
        setFloors(p => p.map(f => f.id === fid ? { ...f, name, manager } : f))
        toast.success(`Đã cập nhật ${name}`)
    }
    const deleteFloor = (fid, fname) => {
        if (!window.confirm(`Xóa "${fname}" và tất cả phòng, giường bên trong?`)) return
        setFloors(p => p.filter(f => f.id !== fid))
        toast.info(`Đã xóa ${fname}`)
    }

    // CRUD: Room
    const addRoom = (fid, name, type, manager) => {
        const id = fid + '-R' + (Date.now() % 10000)
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: [...f.rooms, { id, name, type, manager, beds: [] }] } : f))
        setExpandedRooms(p => [...p, id])
        toast.success(`Đã thêm ${name}`)
    }
    const editRoom = (fid, rid, name, type, manager) => {
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: f.rooms.map(r => r.id === rid ? { ...r, name, type, manager } : r) } : f))
        toast.success(`Đã cập nhật ${name}`)
    }
    const deleteRoom = (fid, rid, rname) => {
        if (!window.confirm(`Xóa "${rname}" và tất cả giường bên trong?`)) return
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: f.rooms.filter(r => r.id !== rid) } : f))
        toast.info(`Đã xóa ${rname}`)
    }

    // CRUD: Bed
    const addBed = (fid, rid, name, manager) => {
        const id = rid + '-B' + (Date.now() % 10000)
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: f.rooms.map(r => r.id === rid ? { ...r, beds: [...r.beds, { id, name, manager, status: 'available' }] } : r) } : f))
        toast.success(`Đã thêm ${name}`)
    }
    const editBed = (fid, rid, bid, name, manager) => {
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: f.rooms.map(r => r.id === rid ? { ...r, beds: r.beds.map(b => b.id === bid ? { ...b, name, manager } : b) } : r) } : f))
        toast.success(`Đã cập nhật ${name}`)
    }
    const deleteBed = (fid, rid, bid, bname) => {
        if (!window.confirm(`Xóa "${bname}"?`)) return
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: f.rooms.map(r => r.id === rid ? { ...r, beds: r.beds.filter(b => b.id !== bid) } : r) } : f))
        toast.info(`Đã xóa ${bname}`)
    }
    const cycleBedStatus = (fid, rid, bid) => {
        const order = ['available', 'occupied', 'cleaning', 'maintenance']
        setFloors(p => p.map(f => f.id === fid ? { ...f, rooms: f.rooms.map(r => r.id === rid ? { ...r, beds: r.beds.map(b => b.id === bid ? { ...b, status: order[(order.indexOf(b.status) + 1) % 4] } : b) } : r) } : f))
    }

    // Stats
    const allBeds = floors.flatMap(f => f.rooms.flatMap(r => r.beds))
    const totalFloors = floors.length
    const totalRooms = floors.reduce((s, f) => s + f.rooms.length, 0)
    const totalBeds = allBeds.length
    const bedsByStatus = { available: 0, occupied: 0, cleaning: 0, maintenance: 0 }
    allBeds.forEach(b => bedsByStatus[b.status]++)

    // Modal handler
    const openModal = (type, data = {}, parent = {}) => setModal({ type, data: { ...data }, parent })
    const closeModal = () => setModal(null)

    const handleModalSave = () => {
        if (!modal) return
        const d = modal.data
        const p = modal.parent
        switch (modal.type) {
            case 'addFloor': addFloor(d.name, d.manager); break
            case 'editFloor': editFloor(d.id, d.name, d.manager); break
            case 'addRoom': addRoom(p.floorId, d.name, d.type, d.manager); break
            case 'editRoom': editRoom(p.floorId, d.id, d.name, d.type, d.manager); break
            case 'addBed': addBed(p.floorId, p.roomId, d.name, d.manager); break
            case 'editBed': editBed(p.floorId, p.roomId, d.id, d.name, d.manager); break
        }
        closeModal()
    }

    const ActionBtns = ({ onEdit, onDelete, small }) => (
        <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={e => { e.stopPropagation(); onEdit() }} title="Sửa" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: small ? 3 : 5, borderRadius: 6, color: '#3b82f6' }}
                onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <FiEdit2 size={small ? 13 : 14} />
            </button>
            <button onClick={e => { e.stopPropagation(); onDelete() }} title="Xóa" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: small ? 3 : 5, borderRadius: 6, color: '#ef4444' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <FiTrash2 size={small ? 13 : 14} />
            </button>
        </div>
    )

    return (
        <div className="page-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title"><FiHome style={{ marginRight: 8 }} /> Quản Lý Phòng · Tầng · Giường</h1>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', margin: 0 }}>Thêm tầng → Thêm phòng → Thêm giường. Mỗi cấp có người phụ trách riêng.</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal('addFloor', { name: '', manager: '' })} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiPlus size={15} /> Thêm Tầng
                </button>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 24 }}>
                {[
                    { label: 'Tổng tầng', value: totalFloors, color: '#6366f1', bg: '#eef2ff', icon: <FiLayers size={16} /> },
                    { label: 'Tổng phòng', value: totalRooms, color: '#0ea5e9', bg: '#f0f9ff', icon: <FiGrid size={16} /> },
                    { label: 'Tổng giường', value: totalBeds, color: '#8b5cf6', bg: '#f5f3ff', icon: <FiHome size={16} /> },
                    { label: 'Trống', value: bedsByStatus.available, color: '#22c55e', bg: '#f0fdf4', icon: <FiCheck size={16} /> },
                    { label: 'Đang sử dụng', value: bedsByStatus.occupied, color: '#ef4444', bg: '#fef2f2', icon: <FiUser size={16} /> },
                ].map((s, i) => (
                    <div key={i} className="stat-card" style={{ borderLeft: `4px solid ${s.color}` }}>
                        <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                        <div><div className="stat-label">{s.label}</div><div className="stat-value" style={{ color: s.color }}>{s.value}</div></div>
                    </div>
                ))}
            </div>

            {/* Floor list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {floors.map(floor => {
                    const isExpanded = expandedFloors.includes(floor.id)
                    const floorBeds = floor.rooms.flatMap(r => r.beds)
                    const floorAvail = floorBeds.filter(b => b.status === 'available').length
                    return (
                        <div key={floor.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            {/* Floor header */}
                            <div onClick={() => toggleFloor(floor.id)} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 20px', cursor: 'pointer', background: isExpanded ? '#f8fafc' : 'white',
                                borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none', transition: 'background 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                onMouseLeave={e => e.currentTarget.style.background = isExpanded ? '#f8fafc' : 'white'}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    {isExpanded ? <FiChevronDown size={18} color="#6366f1" /> : <FiChevronRight size={18} color="#6366f1" />}
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FiLayers size={16} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{floor.name}</div>
                                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                            {floor.rooms.length} phòng · {floorBeds.length} giường · {floorAvail} trống
                                            {floor.manager && <> · <FiUser size={11} style={{ verticalAlign: '-1px' }} /> {floor.manager}</>}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <button onClick={e => { e.stopPropagation(); openModal('addRoom', { name: '', type: 'Phòng điều trị', manager: '' }, { floorId: floor.id }) }}
                                        style={{ padding: '5px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: 'white', color: '#0ea5e9', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <FiPlus size={12} /> Thêm phòng
                                    </button>
                                    <ActionBtns
                                        onEdit={() => openModal('editFloor', { id: floor.id, name: floor.name, manager: floor.manager })}
                                        onDelete={() => deleteFloor(floor.id, floor.name)}
                                    />
                                </div>
                            </div>

                            {/* Rooms */}
                            {isExpanded && (
                                <div style={{ padding: '12px 20px 16px 48px' }}>
                                    {floor.rooms.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: 20, color: '#94a3b8', fontSize: '0.85rem' }}>
                                            Chưa có phòng. Nhấn "Thêm phòng" để bắt đầu.
                                        </div>
                                    )}
                                    {floor.rooms.map(room => {
                                        const isRoomExpanded = expandedRooms.includes(room.id)
                                        const roomAvail = room.beds.filter(b => b.status === 'available').length
                                        return (
                                            <div key={room.id} style={{ marginBottom: 8, border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
                                                {/* Room header */}
                                                <div onClick={() => toggleRoom(room.id)} style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                    padding: '10px 16px', cursor: 'pointer', background: isRoomExpanded ? '#fafbfc' : 'white',
                                                    borderBottom: isRoomExpanded ? '1px solid #f1f5f9' : 'none',
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                    onMouseLeave={e => e.currentTarget.style.background = isRoomExpanded ? '#fafbfc' : 'white'}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        {isRoomExpanded ? <FiChevronDown size={15} color="#0ea5e9" /> : <FiChevronRight size={15} color="#0ea5e9" />}
                                                        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FiGrid size={13} color="white" />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{room.name}</div>
                                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                                                {room.type} · {room.beds.length} giường · {roomAvail} trống
                                                                {room.manager && <> · <FiUser size={10} style={{ verticalAlign: '-1px' }} /> {room.manager}</>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <button onClick={e => { e.stopPropagation(); openModal('addBed', { name: '', manager: '' }, { floorId: floor.id, roomId: room.id }) }}
                                                            style={{ padding: '4px 10px', borderRadius: 6, border: '1.5px solid #e2e8f0', background: 'white', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                                                            <FiPlus size={11} /> Thêm giường
                                                        </button>
                                                        <ActionBtns small
                                                            onEdit={() => openModal('editRoom', { id: room.id, name: room.name, type: room.type, manager: room.manager }, { floorId: floor.id })}
                                                            onDelete={() => deleteRoom(floor.id, room.id, room.name)}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Beds */}
                                                {isRoomExpanded && (
                                                    <div style={{ padding: '10px 16px 10px 50px' }}>
                                                        {room.beds.length === 0 && (
                                                            <div style={{ textAlign: 'center', padding: 14, color: '#94a3b8', fontSize: '0.82rem' }}>
                                                                Chưa có giường. Nhấn "Thêm giường" để thêm.
                                                            </div>
                                                        )}
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                                                            {room.beds.map(bed => {
                                                                const st = BED_STATUSES[bed.status]
                                                                return (
                                                                    <div key={bed.id} style={{
                                                                        border: `1.5px solid ${st.color}30`, borderRadius: 10, padding: '12px 14px',
                                                                        background: st.bg, cursor: 'pointer', transition: 'all 0.15s',
                                                                    }}
                                                                        onClick={() => cycleBedStatus(floor.id, room.id, bed.id)}
                                                                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                                                                        onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                                                                            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{bed.name}</div>
                                                                            <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: '0.68rem', fontWeight: 700, background: st.color, color: 'white' }}>
                                                                                {st.label}
                                                                            </span>
                                                                        </div>
                                                                        <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                            <FiUser size={11} /> {bed.manager || '—'}
                                                                        </div>
                                                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                                                                            <ActionBtns small
                                                                                onEdit={() => openModal('editBed', { id: bed.id, name: bed.name, manager: bed.manager }, { floorId: floor.id, roomId: room.id })}
                                                                                onDelete={() => deleteBed(floor.id, room.id, bed.id, bed.name)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}

                {floors.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 16, border: '2px dashed #e2e8f0' }}>
                        <FiLayers size={40} color="#cbd5e1" />
                        <p style={{ color: '#94a3b8', marginTop: 12 }}>Chưa có tầng nào. Nhấn "Thêm Tầng" để bắt đầu thiết lập.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
                    onClick={closeModal}>
                    <div onClick={e => e.stopPropagation()} style={{
                        background: 'white', borderRadius: 16, padding: 28, width: 460, maxWidth: '95vw',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.25)', animation: 'modalIn 0.2s ease'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
                                {modal.type.startsWith('add') ? '➕' : '✏️'}{' '}
                                {modal.type.includes('Floor') && (modal.type === 'addFloor' ? 'Thêm Tầng Mới' : 'Sửa Tầng')}
                                {modal.type.includes('Room') && (modal.type === 'addRoom' ? 'Thêm Phòng Mới' : 'Sửa Phòng')}
                                {modal.type.includes('Bed') && (modal.type === 'addBed' ? 'Thêm Giường Mới' : 'Sửa Giường')}
                            </h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><FiX size={18} /></button>
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            {/* Name */}
                            <div>
                                <label style={lblStyle}>
                                    {modal.type.includes('Floor') ? 'Tên tầng' : modal.type.includes('Room') ? 'Tên phòng' : 'Tên giường'}
                                </label>
                                <input value={modal.data.name} onChange={e => setModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))}
                                    placeholder={modal.type.includes('Floor') ? 'VD: Tầng 3, Tầng Trệt' : modal.type.includes('Room') ? 'VD: Phòng 101, Phòng VIP A' : 'VD: Giường 1, Giường Massage'}
                                    style={inputStyle} autoFocus />
                            </div>

                            {/* Room type (only for rooms) */}
                            {modal.type.includes('Room') && (
                                <div>
                                    <label style={lblStyle}>Loại phòng</label>
                                    <select value={modal.data.type} onChange={e => setModal(m => ({ ...m, data: { ...m.data, type: e.target.value } }))} style={inputStyle}>
                                        {ROOM_TYPES.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                            )}

                            {/* Manager */}
                            <div>
                                <label style={lblStyle}>
                                    Người phụ trách {modal.type.includes('Floor') ? 'tầng' : modal.type.includes('Room') ? 'phòng' : 'giường'}
                                </label>
                                <select value={modal.data.manager} onChange={e => setModal(m => ({ ...m, data: { ...m.data, manager: e.target.value } }))} style={inputStyle}>
                                    <option value="">— Chọn nhân viên —</option>
                                    {staffNames.map(n => <option key={n}>{n}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
                            <button onClick={closeModal} style={{
                                padding: '10px 20px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                                background: 'white', color: '#475569', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer'
                            }}>Hủy</button>
                            <button onClick={handleModalSave} disabled={!modal.data.name} style={{
                                padding: '10px 24px', borderRadius: 10, border: 'none',
                                background: modal.data.name ? 'linear-gradient(135deg, #198754, #20c997)' : '#e2e8f0',
                                color: modal.data.name ? 'white' : '#94a3b8',
                                fontSize: '0.88rem', fontWeight: 700, cursor: modal.data.name ? 'pointer' : 'not-allowed',
                                boxShadow: modal.data.name ? '0 4px 14px rgba(25,135,84,0.25)' : 'none',
                            }}>{modal.type.startsWith('add') ? 'Thêm' : 'Lưu'}</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            `}</style>
        </div>
    )
}

const lblStyle = { fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6, color: '#475569' }
const inputStyle = { width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', background: '#fafbfc', boxSizing: 'border-box' }
