import { useState, useMemo } from 'react'
import { FiTag, FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiCheck, FiUsers, FiDownload, FiZap, FiCopy } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialTags = [
    { id: 1, name: 'VIP', color: '#e74c3c', count: 45, desc: 'Khách hàng VIP, chi tiêu cao', group: 'Phân loại' },
    { id: 2, name: 'Mới', color: '#27ae60', count: 120, desc: 'Khách hàng mới đăng ký', group: 'Phân loại' },
    { id: 3, name: 'Tiềm năng', color: '#f39c12', count: 78, desc: 'Khách hàng tiềm năng cần chăm sóc', group: 'Phân loại' },
    { id: 4, name: 'Quan tâm Hifu', color: '#8e44ad', count: 35, desc: 'Quan tâm dịch vụ Hifu', group: 'Dịch vụ' },
    { id: 5, name: 'Facebook', color: '#3498db', count: 200, desc: 'Đến từ kênh Facebook', group: 'Kênh' },
    { id: 6, name: 'Zalo', color: '#198754', count: 150, desc: 'Đến từ kênh Zalo OA', group: 'Kênh' },
    { id: 7, name: 'Website', color: '#e67e22', count: 65, desc: 'Đến từ website', group: 'Kênh' },
    { id: 8, name: 'Giới thiệu', color: '#1abc9c', count: 42, desc: 'Từ chương trình giới thiệu', group: 'Kênh' },
    { id: 9, name: 'Botox', color: '#9b59b6', count: 28, desc: 'Quan tâm tiêm Botox', group: 'Dịch vụ' },
    { id: 10, name: 'Trẻ hoá', color: '#2ecc71', count: 55, desc: 'Quan tâm trẻ hoá da', group: 'Dịch vụ' },
]

export default function TicketTags() {
    const [data, setData] = useState(initialTags)
    const [search, setSearch] = useState('')
    const [groupFilter, setGroupFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [editTag, setEditTag] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => {
        let r = data
        if (search) r = r.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
        if (groupFilter !== 'all') r = r.filter(t => t.group === groupFilter)
        return r
    }, [data, search, groupFilter])

    const groups = [...new Set(data.map(t => t.group))]
    const totalUsage = data.reduce((s, t) => s + t.count, 0)

    const handleDelete = (id) => {
        setData(prev => prev.filter(t => t.id !== id))
        toast.success('Đã xóa tag')
    }

    const handleSave = () => {
        const name = document.getElementById('tag-name')?.value?.trim()
        const color = document.getElementById('tag-color')?.value || '#3498db'
        const group = document.getElementById('tag-group')?.value || 'Phân loại'
        const desc = document.getElementById('tag-desc')?.value?.trim() || ''
        if (!name) return toast.warning('Nhập tên tag')
        if (editTag) {
            setData(prev => prev.map(t => t.id === editTag.id ? { ...t, name, color, group, desc } : t))
            toast.success('Đã cập nhật tag')
        } else {
            setData(prev => [...prev, { id: Date.now(), name, color, count: 0, desc, group }])
            toast.success('Đã thêm tag')
        }
        setShowModal(false); setEditTag(null)
    }

    const openEdit = (tag) => { setEditTag(tag); setShowModal(true) }
    const openCreate = () => { setEditTag(null); setShowModal(true) }

    const [showBulkAssign, setShowBulkAssign] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])

    const toggleTagSelection = (id) => {
        setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
    }

    const handleBulkAssign = () => {
        if (selectedTags.length === 0) return toast.warning('Chọn ít nhất 1 tag')
        toast.success(`Đã gán ${selectedTags.length} tag cho khách hàng đã chọn`)
        setShowBulkAssign(false)
        setSelectedTags([])
    }

    const handleExportTags = () => {
        toast.success('Đã xuất danh sách tag thành CSV')
    }

    const autoRules = [
        { trigger: 'Khách mới đăng ký', tag: 'Mới', color: '#27ae60', active: true },
        { trigger: 'Chi tiêu > 10trđ', tag: 'VIP', color: '#e74c3c', active: true },
        { trigger: 'Không ghé > 60 ngày', tag: 'Cần chăm sóc', color: '#f39c12', active: false },
    ]

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Quản Lý Tag Ticket</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Phân loại và gắn tag cho ticket marketing</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={handleExportTags} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiDownload size={14} /> Xuất CSV</button>
                    <button className="btn btn-secondary" onClick={() => setShowBulkAssign(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiUsers size={14} /> Gán nhiều</button>
                    <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Thêm tag</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiTag color="#1a73e8" /></div><div><div className="stat-label">Tổng tag</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiUsers color="#28a745" /></div><div><div className="stat-label">Tổng gắn</div><div className="stat-value">{totalUsage}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiTag color="#ff9800" /></div><div><div className="stat-label">Nhóm</div><div className="stat-value">{groups.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiTag color="#e91e63" /></div><div><div className="stat-label">TB mỗi tag</div><div className="stat-value">{data.length > 0 ? Math.round(totalUsage / data.length) : 0}</div></div></div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '300px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm tag..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={groupFilter} onChange={e => setGroupFilter(e.target.value)}>
                    <option value="all">Tất cả nhóm</option>
                    {groups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>

            {/* Group-based display */}
            {(groupFilter === 'all' ? groups : [groupFilter]).map(group => {
                const groupTags = filtered.filter(t => t.group === group)
                if (groupTags.length === 0) return null
                return (
                    <div key={group} style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>{group} ({groupTags.length})</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                            {groupTags.map(tag => (
                                <div key={tag.id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `4px solid ${tag.color}`, transition: 'all 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: tag.color + '15', color: tag.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                        <FiTag size={18} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {tag.name}
                                            <span style={{ background: tag.color, color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>{tag.count}</span>
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>{tag.desc}</div>
                                        {/* Usage bar */}
                                        <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '100%', height: '4px', background: '#e9ecef', borderRadius: '2px' }}>
                                                <div style={{ width: `${Math.min(tag.count / 200 * 100, 100)}%`, height: '100%', borderRadius: '2px', background: tag.color, transition: 'width 0.3s' }} />
                                            </div>
                                            <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', minWidth: '24px' }}>{Math.round(tag.count / totalUsage * 100)}%</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className="btn-icon" onClick={() => openEdit(tag)}><FiEdit2 size={14} /></button>
                                        <button className="btn-icon" onClick={() => handleDelete(tag.id)}><FiTrash2 size={14} color="#dc3545" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); setEditTag(null) }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                        <div className="modal-header"><h2>{editTag ? '✏️ Sửa Tag' : '🏷️ Thêm Tag Mới'}</h2><button className="btn-close" onClick={() => { setShowModal(false); setEditTag(null) }}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên tag *</label><input id="tag-name" className="form-control" defaultValue={editTag?.name || ''} placeholder="VD: Premium" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label>Màu</label><input id="tag-color" type="color" defaultValue={editTag?.color || '#3498db'} style={{ width: '100%', height: '38px', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }} /></div>
                                <div className="form-group"><label>Nhóm</label><select id="tag-group" className="form-control" defaultValue={editTag?.group || 'Phân loại'}><option>Phân loại</option><option>Kênh</option><option>Dịch vụ</option></select></div>
                            </div>
                            <div className="form-group"><label>Mô tả</label><input id="tag-desc" className="form-control" defaultValue={editTag?.desc || ''} placeholder="Mô tả ngắn" /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => { setShowModal(false); setEditTag(null) }}>Huỷ</button><button className="btn btn-primary" onClick={handleSave}>{editTag ? 'Cập nhật' : 'Thêm'}</button></div>
                    </div>
                </div>
            )}

            {/* Bulk Assign Modal */}
            {showBulkAssign && (
                <div className="modal-overlay" onClick={() => setShowBulkAssign(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>🏷️ Gán Tag Hàng Loạt</h2><button className="btn-close" onClick={() => setShowBulkAssign(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '12px' }}>Chọn tag để gán cho nhóm khách hàng đã lọc:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                {data.map(tag => (
                                    <div key={tag.id} onClick={() => toggleTagSelection(tag.id)}
                                        style={{
                                            padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.82rem',
                                            border: `2px solid ${selectedTags.includes(tag.id) ? tag.color : 'var(--color-border)'}`,
                                            background: selectedTags.includes(tag.id) ? tag.color + '15' : 'white',
                                            color: selectedTags.includes(tag.id) ? tag.color : 'var(--color-text)',
                                            fontWeight: selectedTags.includes(tag.id) ? 700 : 400, transition: 'all 0.15s',
                                            display: 'flex', alignItems: 'center', gap: '6px'
                                        }}>
                                        {selectedTags.includes(tag.id) && <FiCheck size={14} />}
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: tag.color }} />
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '12px', background: '#f0f7ff', borderRadius: '8px', fontSize: '0.82rem', color: '#1a73e8' }}>
                                <strong>{selectedTags.length}</strong> tag đã chọn • Sẽ gán cho tất cả khách hàng trong bộ lọc hiện tại
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowBulkAssign(false)}>Hủy</button>
                            <button className="btn btn-primary" onClick={handleBulkAssign}><FiCheck size={14} /> Gán tag ({selectedTags.length})</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Auto-Tag Rules */}
            <div style={{ marginTop: '20px', background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><FiZap size={15} color="#f39c12" /> Auto-Tag Rules</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{autoRules.filter(r => r.active).length}/{autoRules.length} đang hoạt động</span>
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {autoRules.map((rule, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#f8f9fa', borderRadius: '8px', border: `1px solid ${rule.active ? '#dcfce7' : '#f0f0f0'}` }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: rule.active ? '#28a745' : '#ccc' }} />
                            <span style={{ flex: 1, fontSize: '0.82rem' }}>Khi: <strong>{rule.trigger}</strong></span>
                            <span style={{ fontSize: '0.68rem' }}>→</span>
                            <span style={{ background: rule.color + '15', color: rule.color, padding: '2px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600 }}>{rule.tag}</span>
                            <span className={`badge badge-${rule.active ? 'success' : 'secondary'}`} style={{ fontSize: '0.68rem' }}>{rule.active ? 'Bật' : 'Tắt'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
