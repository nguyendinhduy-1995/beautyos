import { useState, useMemo } from 'react'
import { FiSearch, FiPlus, FiX, FiGift, FiCopy, FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'
import { formatCurrency } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialVouchers = [
    { id: 1, code: 'WELCOME50', name: 'Giảm 50K khách mới', type: 'fixed', value: 50000, minOrder: 200000, used: 12, total: 100, expiry: '31/03/2026', active: true },
    { id: 2, code: 'SPRING20', name: 'Giảm 20% mùa xuân', type: 'percent', value: 20, minOrder: 500000, used: 45, total: 200, expiry: '15/03/2026', active: true },
    { id: 3, code: 'VIP100K', name: 'VIP giảm 100K', type: 'fixed', value: 100000, minOrder: 300000, used: 8, total: 50, expiry: '28/02/2026', active: true },
    { id: 4, code: 'COMBO30', name: 'Combo giảm 30%', type: 'percent', value: 30, minOrder: 1000000, used: 5, total: 30, expiry: '20/03/2026', active: false },
    { id: 5, code: 'BIRTHDAY', name: 'Sinh nhật khách hàng', type: 'fixed', value: 200000, minOrder: 0, used: 23, total: 500, expiry: '31/12/2026', active: true },
]

export default function Voucher() {
    const [data, setData] = useState(initialVouchers)
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [confirm, setConfirm] = useState(null)
    const toast = useToast()

    const filtered = useMemo(() => data.filter(v =>
        !search || v.code.toLowerCase().includes(search.toLowerCase()) || v.name.toLowerCase().includes(search.toLowerCase())
    ), [data, search])

    const active = data.filter(v => v.active).length
    const totalUsed = data.reduce((s, v) => s + v.used, 0)

    const toggleActive = (id) => {
        setData(prev => prev.map(v => v.id === id ? { ...v, active: !v.active } : v))
        toast.info('Đã cập nhật trạng thái')
    }

    const copyCode = (code) => {
        navigator.clipboard?.writeText(code)
        toast.success(`Đã copy: ${code}`)
    }

    const handleDelete = (id) => {
        setConfirm({
            title: 'Xóa voucher', message: 'Bạn có chắc muốn xóa voucher này?',
            onConfirm: () => { setData(prev => prev.filter(v => v.id !== id)); setConfirm(null); toast.success('Đã xóa') }
        })
    }

    const handleCreate = () => {
        const code = document.getElementById('v-code')?.value?.trim()
        const name = document.getElementById('v-name')?.value?.trim()
        const value = parseInt(document.getElementById('v-value')?.value) || 0
        const total = parseInt(document.getElementById('v-total')?.value) || 50
        if (!code || !name) return toast.warning('Vui lòng nhập đủ thông tin')
        setData(prev => [...prev, { id: Date.now(), code: code.toUpperCase(), name, type: 'fixed', value, minOrder: 0, used: 0, total, expiry: '31/12/2026', active: true }])
        setShowModal(false)
        toast.success('Đã tạo voucher')
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div><h1 className="page-title">Quản Lý Voucher</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Tạo và quản lý mã giảm giá</p></div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FiPlus size={14} /> Tạo voucher</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiGift color="#1a73e8" /></div><div><div className="stat-label">Tổng voucher</div><div className="stat-value">{data.length}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e8f5e9' }}><FiToggleRight color="#28a745" /></div><div><div className="stat-label">Đang hoạt động</div><div className="stat-value" style={{ color: '#28a745' }}>{active}</div></div></div>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#fff3e0' }}><FiCopy color="#ff9800" /></div><div><div className="stat-label">Lượt sử dụng</div><div className="stat-value" style={{ color: '#ff9800' }}>{totalUsed}</div></div></div>
            </div>

            <div className="filter-bar">
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input type="text" placeholder="Tìm mã, tên voucher..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" /></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {filtered.map(v => (
                    <div key={v.id} style={{
                        background: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${v.active ? 'var(--color-primary)' : '#ddd'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', opacity: v.active ? 1 : 0.7, transition: 'all 0.2s'
                    }}
                        onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
                        onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-primary)', letterSpacing: '1px' }}>{v.code}</span>
                                    <button onClick={() => copyCode(v.code)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}><FiCopy size={14} color="#999" /></button>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{v.name}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                <button onClick={() => toggleActive(v.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {v.active ? <FiToggleRight size={22} color="#28a745" /> : <FiToggleLeft size={22} color="#999" />}
                                </button>
                                <button onClick={() => handleDelete(v.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 size={16} color="#dc3545" /></button>
                            </div>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: v.type === 'percent' ? '#ff9800' : '#28a745', marginBottom: '12px' }}>
                            {v.type === 'percent' ? `${v.value}%` : formatCurrency(v.value)}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                            <span>Đã dùng: {v.used}/{v.total}</span>
                            <span>HSD: {v.expiry}</span>
                        </div>
                        <div style={{ marginTop: '8px', height: '4px', background: '#eee', borderRadius: '2px' }}>
                            <div style={{ width: `${Math.min((v.used / v.total) * 100, 100)}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '2px', transition: 'width 0.3s' }} />
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header"><h2>Tạo Voucher</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Mã voucher *</label><input id="v-code" className="form-control" placeholder="VD: SUMMER50" /></div>
                            <div className="form-group"><label>Tên voucher *</label><input id="v-name" className="form-control" placeholder="VD: Giảm 50K mùa hè" /></div>
                            <div className="form-group"><label>Giá trị (₫ hoặc %)</label><input id="v-value" type="number" className="form-control" placeholder="50000" /></div>
                            <div className="form-group"><label>Số lượng</label><input id="v-total" type="number" className="form-control" placeholder="100" /></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button>
                            <button className="btn btn-primary" onClick={handleCreate}>Tạo</button>
                        </div>
                    </div>
                </div>
            )}

            {confirm && <ConfirmDialog isOpen={true} title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
        </div>
    )
}
