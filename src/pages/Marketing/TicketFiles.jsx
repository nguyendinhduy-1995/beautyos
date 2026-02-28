import { useState, useMemo } from 'react'
import { FiFile, FiSearch, FiDownload, FiImage, FiFileText, FiVideo, FiUpload, FiX, FiGrid, FiList, FiTrash2, FiHardDrive, FiClock } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const initialFiles = [
    { id: 1, name: 'Hồ sơ_Nguyen_Thi_Mai.pdf', ticket: 'TK-1234', type: 'pdf', size: '2.4 MB', sizeBytes: 2400000, date: '27/02/2026', uploader: 'KTV Lan' },
    { id: 2, name: 'Anh_truoc_dieu_tri.jpg', ticket: 'TK-1234', type: 'image', size: '1.8 MB', sizeBytes: 1800000, date: '27/02/2026', uploader: 'KTV Lan' },
    { id: 3, name: 'Anh_sau_dieu_tri.jpg', ticket: 'TK-1234', type: 'image', size: '2.1 MB', sizeBytes: 2100000, date: '27/02/2026', uploader: 'KTV Lan' },
    { id: 4, name: 'Phieu_ket_qua_xet_nghiem.pdf', ticket: 'TK-1189', type: 'pdf', size: '856 KB', sizeBytes: 856000, date: '26/02/2026', uploader: 'BS Công Vũ' },
    { id: 5, name: 'Don_thuoc_BS_My.pdf', ticket: 'TK-1201', type: 'pdf', size: '320 KB', sizeBytes: 320000, date: '26/02/2026', uploader: 'BS My' },
    { id: 6, name: 'Video_huong_dan_cham_soc.mp4', ticket: 'TK-1250', type: 'video', size: '15.2 MB', sizeBytes: 15200000, date: '25/02/2026', uploader: 'KTV Trang' },
    { id: 7, name: 'Bien_ban_tu_van.pdf', ticket: 'TK-1275', type: 'pdf', size: '1.1 MB', sizeBytes: 1100000, date: '24/02/2026', uploader: 'BS My' },
    { id: 8, name: 'Hinh_ket_qua_dieu_tri.jpg', ticket: 'TK-1290', type: 'image', size: '3.2 MB', sizeBytes: 3200000, date: '23/02/2026', uploader: 'KTV Mai' },
]

const typeConfig = {
    image: { icon: FiImage, color: '#e67e22', bg: '#fef3c7', label: 'Hình ảnh', emoji: '🖼️' },
    pdf: { icon: FiFileText, color: '#3498db', bg: '#dbeafe', label: 'PDF', emoji: '📄' },
    video: { icon: FiVideo, color: '#e91e63', bg: '#fce4ec', label: 'Video', emoji: '🎬' },
}

export default function TicketFiles() {
    const [data, setData] = useState(initialFiles)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [viewMode, setViewMode] = useState('table')
    const [showUpload, setShowUpload] = useState(false)
    const toast = useToast()

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(f => f.name.toLowerCase().includes(q) || f.ticket.includes(q)) }
        if (typeFilter !== 'all') r = r.filter(f => f.type === typeFilter)
        return r
    }, [data, search, typeFilter])

    const totalSize = data.reduce((s, f) => s + f.sizeBytes, 0)
    const formatSize = (bytes) => bytes > 1000000 ? `${(bytes / 1000000).toFixed(1)} MB` : `${(bytes / 1000).toFixed(0)} KB`
    const imageCount = data.filter(f => f.type === 'image').length
    const pdfCount = data.filter(f => f.type === 'pdf').length
    const videoCount = data.filter(f => f.type === 'video').length

    const handleDelete = (id) => {
        setData(prev => prev.filter(f => f.id !== id))
        toast.success('Đã xóa file')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Tệp Đính Kèm Ticket</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý tất cả file đính kèm trong các ticket</p></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <button onClick={() => setViewMode('table')} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', background: viewMode === 'table' ? 'var(--color-primary)' : 'white', color: viewMode === 'table' ? 'white' : 'var(--color-text)' }}><FiList size={13} /></button>
                        <button onClick={() => setViewMode('grid')} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', background: viewMode === 'grid' ? 'var(--color-primary)' : 'white', color: viewMode === 'grid' ? 'white' : 'var(--color-text)' }}><FiGrid size={13} /></button>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowUpload(true)}><FiUpload size={14} /> Tải lên</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiFile color="#1a73e8" /></div><div><div className="stat-label">Tổng file</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fef3c7' }}><FiImage color="#e67e22" /></div><div><div className="stat-label">Hình ảnh</div><div className="stat-value" style={{ color: '#e67e22' }}>{imageCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#dbeafe' }}><FiFileText color="#3498db" /></div><div><div className="stat-label">PDF</div><div className="stat-value" style={{ color: '#3498db' }}>{pdfCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fce4ec' }}><FiVideo color="#e91e63" /></div><div><div className="stat-label">Video</div><div className="stat-value" style={{ color: '#e91e63' }}>{videoCount}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiFile color="#28a745" /></div><div><div className="stat-label">Tổng dung lượng</div><div className="stat-value" style={{ fontSize: '0.95rem' }}>{formatSize(totalSize)}</div></div></div>
            </div>

            {/* Storage + Type Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiHardDrive size={14} color="var(--color-primary)" /> Dung lượng sử dụng</div>
                    <div style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 600 }}>{formatSize(totalSize)}</span>
                            <span style={{ color: 'var(--color-text-light)' }}>/ 500 MB</span>
                        </div>
                        <div style={{ height: '10px', background: '#e9ecef', borderRadius: '5px', overflow: 'hidden' }}>
                            <div style={{ width: `${(totalSize / 500000000) * 100}%`, height: '100%', borderRadius: '5px', background: totalSize > 400000000 ? '#dc3545' : totalSize > 250000000 ? '#ff9800' : 'var(--color-primary)', transition: 'width 0.4s' }} />
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginTop: '4px' }}>{((totalSize / 500000000) * 100).toFixed(1)}% đã sử dụng</div>
                    </div>
                    <div style={{ display: 'grid', gap: '6px', marginTop: '12px' }}>
                        {[{ label: 'Hình ảnh', count: imageCount, size: data.filter(f => f.type === 'image').reduce((s, f) => s + f.sizeBytes, 0), color: '#e67e22' },
                        { label: 'PDF', count: pdfCount, size: data.filter(f => f.type === 'pdf').reduce((s, f) => s + f.sizeBytes, 0), color: '#3498db' },
                        { label: 'Video', count: videoCount, size: data.filter(f => f.type === 'video').reduce((s, f) => s + f.sizeBytes, 0), color: '#e91e63' }
                        ].map(t => (
                            <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '60px', fontSize: '0.72rem', fontWeight: 500 }}>{t.label}</span>
                                <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                    <div style={{ width: `${totalSize > 0 ? (t.size / totalSize) * 100 : 0}%`, height: '100%', borderRadius: '4px', background: t.color }} />
                                </div>
                                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)', minWidth: '45px', textAlign: 'right' }}>{formatSize(t.size)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiClock size={14} color="#ff9800" /> Hoạt động gần đây</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {data.slice(0, 5).map(f => {
                            const tc = typeConfig[f.type] || typeConfig.pdf
                            return (
                                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: '6px', background: '#f8f9fa' }}>
                                    <span style={{ fontSize: '1rem' }}>{tc.emoji}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>{f.uploader} • {f.date}</div>
                                    </div>
                                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-light)' }}>{f.size}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm file, mã ticket..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">Tất cả loại</option><option value="image">Hình ảnh</option><option value="pdf">PDF</option><option value="video">Video</option>
                </select>
            </div>

            {viewMode === 'table' ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th></th><th>Tên file</th><th>Ticket</th><th>Loại</th><th>Kích thước</th><th>Ngày tải</th><th>Người tải</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(f => {
                                const tc = typeConfig[f.type] || typeConfig.pdf
                                return (
                                    <tr key={f.id}>
                                        <td style={{ fontSize: '1.2rem' }}>{tc.emoji}</td>
                                        <td style={{ fontWeight: 500 }}>{f.name}</td>
                                        <td><span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{f.ticket}</span></td>
                                        <td><span style={{ background: tc.bg, color: tc.color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600 }}>{tc.label}</span></td>
                                        <td>{f.size}</td>
                                        <td>{f.date}</td>
                                        <td>{f.uploader}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn btn-sm btn-secondary" onClick={() => toast.success(`Đang tải ${f.name}`)}><FiDownload size={13} /></button>
                                                <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(f.id)}><FiTrash2 size={13} color="#dc3545" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {filtered.map(f => {
                        const tc = typeConfig[f.type] || typeConfig.pdf
                        return (
                            <div key={f.id} style={{ background: 'white', borderRadius: '10px', border: '1px solid var(--color-border)', overflow: 'hidden', transition: 'all 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                                onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                                <div style={{ height: '80px', background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{tc.emoji}</div>
                                <div style={{ padding: '12px' }}>
                                    <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                                        <span>{f.size}</span>
                                        <span style={{ color: 'var(--color-primary)' }}>{f.ticket}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>{f.date}</span>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon" onClick={() => toast.success(`Tải ${f.name}`)}><FiDownload size={12} /></button>
                                            <button className="btn-icon" onClick={() => handleDelete(f.id)}><FiTrash2 size={12} color="#dc3545" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {/* Upload Modal */}
            {showUpload && (
                <div className="modal-overlay" onClick={() => setShowUpload(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                        <div className="modal-header"><h2>📤 Tải File Lên</h2><button className="btn-close" onClick={() => setShowUpload(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Ticket liên quan</label><input className="form-control" placeholder="VD: TK-1234" /></div>
                            <div style={{ border: '2px dashed var(--color-border)', borderRadius: '12px', padding: '40px', textAlign: 'center', color: 'var(--color-text-light)', cursor: 'pointer', transition: 'all 0.2s' }}
                                onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = '#f0f9ff' }}
                                onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'transparent' }}
                                onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'transparent'; toast.success('Đã nhận file!') }}>
                                <FiUpload size={28} style={{ marginBottom: '8px' }} />
                                <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>Kéo thả file vào đây</div>
                                <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>hoặc click để chọn file</div>
                                <div style={{ fontSize: '0.72rem', marginTop: '8px', color: 'var(--color-text-light)' }}>Hỗ trợ: JPG, PNG, PDF, MP4 • Tối đa 20MB</div>
                            </div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowUpload(false)}>Huỷ</button><button className="btn btn-primary" onClick={() => { setShowUpload(false); toast.success('Đã tải file lên thành công!') }}>Tải lên</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
