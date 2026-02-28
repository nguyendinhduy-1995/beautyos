import { useState } from 'react'
import { FiSearch, FiChevronRight } from 'react-icons/fi'
import { configCategories } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

const tabs = ['Cài Đặt Chung', 'Chăm Sóc', 'Lịch Hẹn', 'Dịch vụ/Thẻ', 'Sms/zns – Email', 'Kế toán/Nhân viên', 'Khách hàng', 'Chẩn đoán/Điều trị', 'Bệnh Án']

export default function ConfigCategories() {
    const toast = useToast()
    const [activeTab, setActiveTab] = useState('Cài Đặt Chung')
    const [search, setSearch] = useState('')
    const [activeItem, setActiveItem] = useState('Công Ty')

    const currentGroup = configCategories.find(c => c.group === activeTab || (activeTab === 'Cài Đặt Chung' && c.group === 'Cài Đặt Chung'))
    const allItems = configCategories.flatMap(c => c.items)
    const filteredItems = search ? allItems.filter(i => i.toLowerCase().includes(search.toLowerCase())) : (currentGroup?.items || [])

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Danh Mục Cấu Hình</h1>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '2px', marginBottom: '24px', overflowX: 'auto', borderBottom: '2px solid var(--color-border)' }}>
                {tabs.map(tab => (
                    <button key={tab} onClick={() => { setActiveTab(tab); setSearch('') }}
                        style={{
                            padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500',
                            background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                            color: activeTab === tab ? 'white' : 'var(--color-text-light)',
                            borderRadius: '8px 8px 0 0', whiteSpace: 'nowrap',
                            transition: 'all 0.2s'
                        }}>
                        {tab}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
                {/* Sidebar list */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div className="search-box" style={{ marginBottom: '12px' }}>
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="eg. tìm kiếm" value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {filteredItems.map((item, i) => (
                            <button key={i} onClick={() => setActiveItem(item)}
                                style={{
                                    padding: '10px 12px', border: 'none', background: activeItem === item ? 'var(--color-primary-light)' : 'transparent',
                                    cursor: 'pointer', textAlign: 'left', borderRadius: '8px', fontSize: '0.85rem',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    color: activeItem === item ? 'var(--color-primary)' : 'var(--color-text)',
                                    fontWeight: activeItem === item ? '600' : '400'
                                }}>
                                {item}
                                <FiChevronRight size={14} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content area */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '8px' }}>Thông tin {activeItem}</h2>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', marginBottom: '20px' }}>
                        Cài đặt tên, logo công ty, logo form in – Khi thay đổi giá trị cần đăng nhập lại để áp dụng
                    </p>

                    <div style={{ display: 'grid', gap: '16px' }}>
                        {['Tên công ty', 'HotLine', 'Địa chỉ', 'Email', 'Website'].map((label, i) => (
                            <div key={i}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px', display: 'block' }}>{label}</label>
                                <input type="text" className="form-input" placeholder={
                                    label === 'Tên công ty' ? 'Your Company' :
                                        label === 'HotLine' ? '1900 6627' :
                                            label === 'Địa chỉ' ? '72 Đường số 11, P.10, Gò Vấp, HCM' :
                                                label === 'Email' ? 'info@exemple.com' :
                                                    'www.exemple.com'
                                } style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.9rem' }} />
                            </div>
                        ))}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px', display: 'block' }}>Đơn vị tiền tệ</label>
                                <select className="filter-select" style={{ width: '100%' }}><option>VND</option><option>USD</option></select>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '6px', display: 'block' }}>Mã số thuế</label>
                                <input type="text" placeholder="MST0001" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.9rem' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                        <button className="btn btn-primary" onClick={() => toast.success('Đã lưu thay đổi thành công!')}>Lưu thay đổi</button>
                        <button className="btn btn-secondary" onClick={() => toast.info('Đã huỷ thay đổi')}>Huỷ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
