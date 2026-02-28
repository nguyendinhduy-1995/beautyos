import { useState, useMemo } from 'react'
import { FiHelpCircle, FiPlus, FiSearch, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'
import ConfirmDialog from '../../components/ConfirmDialog'

const initialFaqs = [
    { id: 1, q: 'Hifu có đau không?', a: 'Hifu không đau, chỉ có cảm giác nóng nhẹ trong quá trình thực hiện. Chúng tôi sẽ bôi kem tê trước để đảm bảo bạn thoải mái nhất.', category: 'Dịch vụ', order: 1 },
    { id: 2, q: 'Bao lâu thấy kết quả Botox?', a: 'Kết quả Botox thường bắt đầu thấy rõ sau 3-5 ngày và đạt hiệu quả tốt nhất sau 2 tuần.', category: 'Dịch vụ', order: 2 },
    { id: 3, q: 'Cách đặt lịch hẹn online?', a: 'Bạn có thể đặt lịch qua app BeautyOS hoặc website. Chọn dịch vụ, thời gian mong muốn và xác nhận.', category: 'Đặt lịch', order: 1 },
    { id: 4, q: 'Chính sách hoàn tiền?', a: 'Chúng tôi hỗ trợ hoàn tiền trong vòng 24h nếu bạn chưa sử dụng dịch vụ. Liên hệ hotline để được hỗ trợ.', category: 'Chính sách', order: 1 },
    { id: 5, q: 'Có chương trình tích điểm không?', a: 'Có! Mỗi 10.000đ chi tiêu bạn nhận 1 điểm. Điểm có thể đổi voucher giảm giá hoặc quà tặng.', category: 'Ưu đãi', order: 1 },
]

const CATEGORIES = ['Dịch vụ', 'Đặt lịch', 'Chính sách', 'Ưu đãi', 'Thanh toán']

export default function MobileFAQ() {
    const toast = useToast()
    const [data, setData] = useState(initialFaqs)
    const [search, setSearch] = useState('')
    const [openId, setOpenId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [form, setForm] = useState({ q: '', a: '', category: 'Dịch vụ' })
    const [catFilter, setCatFilter] = useState('all')

    const filtered = useMemo(() => {
        let result = data
        if (search) { const q = search.toLowerCase(); result = result.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) }
        if (catFilter !== 'all') result = result.filter(f => f.category === catFilter)
        return result
    }, [data, search, catFilter])

    const openCreate = () => { setEditItem(null); setForm({ q: '', a: '', category: 'Dịch vụ' }); setShowModal(true) }
    const openEdit = (f) => { setEditItem(f); setForm({ q: f.q, a: f.a, category: f.category }); setShowModal(true) }

    const handleSave = () => {
        if (!form.q.trim() || !form.a.trim()) return toast.warning('Nhập đầy đủ câu hỏi và câu trả lời')
        if (editItem) {
            setData(prev => prev.map(f => f.id === editItem.id ? { ...f, ...form } : f))
            toast.success('Đã cập nhật FAQ')
        } else {
            setData(prev => [...prev, { id: Date.now(), ...form, order: prev.length + 1 }])
            toast.success('Đã thêm FAQ mới')
        }
        setShowModal(false)
    }
    const handleDelete = () => { setData(prev => prev.filter(f => f.id !== deleteId)); setDeleteId(null); toast.info('Đã xóa FAQ') }

    const catCounts = CATEGORIES.reduce((acc, c) => { acc[c] = data.filter(f => f.category === c).length; return acc }, {})

    return (
        <div className="page-container">
            <ConfirmDialog isOpen={!!deleteId} title="Xóa FAQ?" message="Bạn có chắc muốn xóa câu hỏi này?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} type="danger" />
            <div className="page-header">
                <div><h1 className="page-title">Câu Hỏi Thường Gặp (FAQ)</h1><p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>Quản lý FAQ trên app và website</p></div>
                <button className="btn btn-primary" onClick={openCreate}><FiPlus size={14} /> Thêm FAQ</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
                <div className="stat-card"><div className="stat-icon" style={{ background: '#e3f2fd' }}><FiHelpCircle color="#1a73e8" /></div><div><div className="stat-label">Tổng FAQ</div><div className="stat-value">{data.length}</div></div></div>
                {CATEGORIES.slice(0, 4).map((cat, i) => (
                    <div key={cat} className="stat-card"><div className="stat-icon" style={{ background: ['#e8f5e9', '#fff3e0', '#fce4ec', '#f3e5f5'][i] }}><FiHelpCircle color={['#28a745', '#ff9800', '#e91e63', '#9c27b0'][i]} /></div><div><div className="stat-label">{cat}</div><div className="stat-value">{catCounts[cat] || 0}</div></div></div>
                ))}
            </div>

            <div className="filter-bar" style={{ marginBottom: '16px' }}>
                <div className="search-box" style={{ flex: 1, maxWidth: '350px' }}><FiSearch className="search-icon" /><input className="search-input" placeholder="Tìm câu hỏi..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                    <option value="all">Tất cả danh mục</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c} ({catCounts[c] || 0})</option>)}
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)', background: 'white', borderRadius: '10px' }}>Không tìm thấy FAQ</div>}
                {filtered.map(f => (
                    <div key={f.id} style={{ border: '1px solid var(--color-border)', borderRadius: '10px', overflow: 'hidden', background: 'white' }}>
                        <div onClick={() => setOpenId(openId === f.id ? null : f.id)}
                            style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: openId === f.id ? '#f8fffe' : 'transparent', transition: 'all 0.2s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                <FiHelpCircle color="var(--color-primary)" />
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{f.q}</span>
                                <span className="badge badge-processing" style={{ fontSize: '0.7rem' }}>{f.category}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <button className="btn btn-sm btn-secondary" onClick={e => { e.stopPropagation(); openEdit(f) }} title="Sửa"><FiEdit2 size={12} /></button>
                                <button className="btn btn-sm btn-secondary" onClick={e => { e.stopPropagation(); setDeleteId(f.id) }} title="Xóa"><FiTrash2 size={12} color="#dc3545" /></button>
                                {openId === f.id ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                        </div>
                        {openId === f.id && (
                            <div style={{ padding: '12px 16px 16px 42px', fontSize: '0.88rem', color: 'var(--color-text)', borderTop: '1px solid var(--color-border)', background: '#f8fffe', lineHeight: 1.6 }}>
                                {f.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                        <div className="modal-header"><h2>{editItem ? '✏️ Sửa FAQ' : '❓ Thêm FAQ Mới'}</h2><button className="btn-close" onClick={() => setShowModal(false)}><FiX /></button></div>
                        <div className="modal-body">
                            <div className="form-group"><label>Câu hỏi *</label><input className="form-control" value={form.q} onChange={e => setForm(p => ({ ...p, q: e.target.value }))} placeholder="VD: Hifu có đau không?" /></div>
                            <div className="form-group"><label>Danh mục</label><select className="form-control" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
                            <div className="form-group"><label>Câu trả lời *</label><textarea className="form-control" value={form.a} onChange={e => setForm(p => ({ ...p, a: e.target.value }))} rows="4" placeholder="Nhập câu trả lời chi tiết..." style={{ resize: 'vertical' }} /></div>
                        </div>
                        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Huỷ</button><button className="btn btn-primary" onClick={handleSave}>{editItem ? 'Cập nhật' : 'Thêm FAQ'}</button></div>
                    </div>
                </div>
            )}
        </div>
    )
}
