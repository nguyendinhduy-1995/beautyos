import { useState, useMemo } from 'react'
import { FiFileText, FiUser, FiSearch, FiPlus, FiX, FiPrinter, FiEdit2, FiTrash2, FiDownload, FiPieChart, FiActivity } from 'react-icons/fi'
import { prescriptions as initialPrescriptions } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function Prescriptions() {
    const [data, setData] = useState(initialPrescriptions)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [confirm, setConfirm] = useState(null)
    const [doctorFilter, setDoctorFilter] = useState('all')
    const toast = useToast()

    const doctors = [...new Set(data.map(p => p.doctor))]
    const allMeds = data.flatMap(p => p.medicines)
    const medFreq = allMeds.reduce((acc, m) => { acc[m] = (acc[m] || 0) + 1; return acc }, {})
    const topMeds = Object.entries(medFreq).sort((a, b) => b[1] - a[1]).slice(0, 5)

    const filtered = useMemo(() => {
        let r = data
        if (search) { const q = search.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || p.doctor.toLowerCase().includes(q) || p.diagnosis.toLowerCase().includes(q)) }
        if (doctorFilter !== 'all') r = r.filter(p => p.doctor === doctorFilter)
        return r
    }, [data, search, doctorFilter])

    const handleCreate = () => {
        const name = document.getElementById('rx-name')?.value?.trim()
        const doctor = document.getElementById('rx-doctor')?.value?.trim()
        const diagnosis = document.getElementById('rx-diagnosis')?.value?.trim()
        const meds = document.getElementById('rx-meds')?.value?.trim()
        if (!name || !doctor || !diagnosis) return toast.warning('Vui lòng nhập đầy đủ thông tin')
        const newRx = {
            id: `TOA${String(data.length + 1).padStart(3, '0')}`,
            name, doctor, diagnosis, note: '',
            medicines: meds ? meds.split(',').map(m => m.trim()) : [],
            created: new Date().toLocaleDateString('vi-VN')
        }
        setData(prev => [newRx, ...prev])
        setShowModal(false)
        toast.success(`Đã tạo toa thuốc cho "${name}"`)
    }

    const handleDelete = (id) => {
        setConfirm({
            title: 'Xoá toa thuốc',
            message: 'Bạn có chắc muốn xoá toa thuốc này?',
            onConfirm: () => { setData(prev => prev.filter(p => p.id !== id)); setConfirm(null); toast.success('Đã xoá toa thuốc') }
        })
    }

    const handlePrint = (p) => {
        toast.info(`Đang in toa thuốc: ${p.name}`)
    }

    return (
        <div className="page-container">
            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="page-title">Toa Thuốc</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý đơn thuốc và toa thuốc</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        const csv = 'Mã,Bệnh nhân,Bác sĩ,Chẩn đoán,Thuốc,Ngày tạo\n' + data.map(p => `${p.id},${p.name},${p.doctor},${p.diagnosis},"${p.medicines.join(', ')}",${p.created}`).join('\n')
                        const blob = new Blob([csv], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'toa-thuoc.csv'; a.click()
                        toast.success('Đã xuất file CSV')
                    }}><FiDownload size={14} /> Xuất dữ liệu</button>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Tạo toa mới</button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '16px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiFileText color="#1a73e8" /></div><div><div className="stat-label">Tổng toa thuốc</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiUser color="#28a745" /></div><div><div className="stat-label">Bác sĩ kê toa</div><div className="stat-value">{doctors.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiActivity color="#ff9800" /></div><div><div className="stat-label">Tổng loại thuốc</div><div className="stat-value" style={{ color: '#ff9800' }}>{Object.keys(medFreq).length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#f3e5f5' }}><FiPieChart color="#9c27b0" /></div><div><div className="stat-label">TB thuốc/toa</div><div className="stat-value" style={{ color: '#9c27b0' }}>{data.length > 0 ? (allMeds.length / data.length).toFixed(1) : 0}</div></div></div>
            </div>

            {/* Analytics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiPieChart size={14} color="var(--color-primary)" /> Toa theo bác sĩ</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {doctors.map(doc => {
                            const count = data.filter(p => p.doctor === doc).length
                            const colors = ['#1a73e8', '#28a745', '#ff9800', '#9c27b0', '#e91e63']
                            return (
                                <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setDoctorFilter(doctorFilter === doc ? 'all' : doc)}>
                                    <span style={{ width: '80px', fontSize: '0.78rem', fontWeight: doctorFilter === doc ? 700 : 500, color: doctorFilter === doc ? 'var(--color-primary)' : undefined }}>{doc}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                                        <div style={{ width: `${data.length > 0 ? (count / data.length) * 100 : 0}%`, height: '100%', borderRadius: '4px', background: colors[doctors.indexOf(doc) % colors.length], transition: 'width 0.3s' }} />
                                    </div>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 600, minWidth: '20px', textAlign: 'right' }}>{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><FiActivity size={14} color="#ff9800" /> Thuốc hay dùng nhất</div>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        {topMeds.length === 0 ? <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', textAlign: 'center', padding: '12px' }}>Chưa có dữ liệu</div> : topMeds.map(([med, count], i) => (
                            <div key={med} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: i < 3 ? '#ff9800' : '#e9ecef', color: i < 3 ? 'white' : 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                <span style={{ flex: 1, fontSize: '0.82rem', fontWeight: 500 }}>{med}</span>
                                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-primary)' }}>{count} lần</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '400px' }}>
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Tìm tên, bác sĩ, chẩn đoán..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                </div>
                <select className="filter-select" value={doctorFilter} onChange={e => setDoctorFilter(e.target.value)}>
                    <option value="all">Tất cả bác sĩ</option>
                    {doctors.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginLeft: 'auto' }}>{filtered.length} toa thuốc</span>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {filtered.map(p => (
                    <div key={p.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)', transition: 'box-shadow 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'}
                        onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>
                        <div className="mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-primary)' }}>
                                    <FiFileText style={{ marginRight: '8px' }} />{p.name}
                                </h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '4px' }}>{p.id} · {p.created}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-text-light)' }}><FiUser size={14} /> BS. {p.doctor}</span>
                                <button className="btn btn-sm btn-secondary" onClick={() => handlePrint(p)} title="In toa"><FiPrinter size={13} /></button>
                                <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(p.id)} title="Xoá" style={{ color: '#dc3545' }}><FiTrash2 size={13} /></button>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '6px' }}>Chẩn đoán</div>
                                <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{p.diagnosis}</div>
                            </div>
                            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '6px' }}>Ghi chú</div>
                                <div style={{ fontSize: '0.9rem' }}>{p.note || '—'}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '6px' }}>Thuốc / Vật tư:</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {p.medicines.map((m, i) => (
                                    <span key={i} className="badge badge-info" style={{ fontSize: '0.8rem' }}>{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header"><h2>Tạo Toa Thuốc Mới</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Tên bệnh nhân *</label><input id="rx-name" className="form-control" placeholder="Nhập tên" /></div>
                            <div className="form-group"><label>Bác sĩ kê toa *</label><input id="rx-doctor" className="form-control" placeholder="Nhập tên BS" /></div>
                            <div className="form-group"><label>Chẩn đoán *</label><input id="rx-diagnosis" className="form-control" placeholder="Nhập chẩn đoán" /></div>
                            <div className="form-group"><label>Thuốc (cách nhau bằng dấu phẩy)</label><input id="rx-meds" className="form-control" placeholder="VD: Vitamin C, Retinol, ..." /></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button>
                            <button className="btn btn-primary" onClick={handleCreate}>Tạo toa</button>
                        </div>
                    </div>
                </div>
            )}

            {confirm && <ConfirmDialog isOpen={true} title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
        </div>
    )
}
