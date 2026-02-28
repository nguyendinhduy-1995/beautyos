import { useState, useMemo } from 'react'
import { FiFileText, FiSearch, FiDownload, FiStar, FiClock, FiFilter, FiCalendar, FiMapPin } from 'react-icons/fi'
import { reportCategories } from '../../data/mockData'
import { useToast } from '../../components/ToastProvider'

export default function ReportList() {
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState(0)
    const [favorites, setFavorites] = useState([])
    const [recentlyViewed, setRecentlyViewed] = useState([])
    const [activeReport, setActiveReport] = useState(null)
    const [dateRange, setDateRange] = useState('28-02-2026')
    const [branch, setBranch] = useState('CN_1834')
    const toast = useToast()

    const totalReports = reportCategories.reduce((s, c) => s + c.items.length, 0)

    const currentCategory = reportCategories[activeTab]

    const filteredItems = useMemo(() => {
        if (!search) return currentCategory.items
        return currentCategory.items.filter(item => item.toLowerCase().includes(search.toLowerCase()))
    }, [search, activeTab, currentCategory])

    const handleReportClick = (item) => {
        setActiveReport(item)
        setRecentlyViewed(prev => {
            return [item, ...prev.filter(r => r !== item)].slice(0, 5)
        })
    }

    const toggleFavorite = (item, e) => {
        e.stopPropagation()
        setFavorites(prev => prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item])
        toast.info(favorites.includes(item) ? 'Đã bỏ yêu thích' : 'Đã thêm vào yêu thích')
    }

    // Generate mock chart data for the active report
    const mockChartData = useMemo(() => {
        if (!activeReport) return []
        return Array.from({ length: 7 }, (_, i) => ({
            label: `Ngày ${22 + i}/02`,
            value: Math.floor(Math.random() * 50000000) + 5000000
        }))
    }, [activeReport])

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Danh Sách Báo Cáo</h1>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                        {totalReports} báo cáo trong {reportCategories.length} danh mục
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" onClick={() => toast.info('Bộ lọc đã được mở')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiFilter size={14} /> Bộ lọc</button>
                    <button className="btn btn-secondary" onClick={() => toast.success('Đã xuất báo cáo')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiDownload size={14} /> Xuất</button>
                </div>
            </div>

            {/* Category Tabs - matches reference site */}
            <div style={{
                display: 'flex', gap: '0', overflowX: 'auto', borderBottom: '2px solid var(--color-border)',
                marginBottom: '16px', paddingBottom: '0', scrollbarWidth: 'thin'
            }}>
                {reportCategories.map((cat, i) => (
                    <button key={cat.id} onClick={() => { setActiveTab(i); setActiveReport(null) }}
                        style={{
                            padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
                            fontSize: '0.82rem', whiteSpace: 'nowrap', fontWeight: i === activeTab ? '700' : '400',
                            color: i === activeTab ? 'var(--color-primary)' : 'var(--color-text-light)',
                            borderBottom: i === activeTab ? '2px solid var(--color-primary)' : '2px solid transparent',
                            marginBottom: '-2px', transition: 'all 0.2s'
                        }}>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Sub-report buttons - matches reference site */}
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px',
                padding: '12px', background: '#fafafa', borderRadius: '12px'
            }}>
                {filteredItems.map((item, i) => (
                    <button key={i} onClick={() => handleReportClick(item)}
                        style={{
                            padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer',
                            border: `1px solid ${activeReport === item ? 'var(--color-primary)' : 'var(--color-border)'}`,
                            background: activeReport === item ? 'var(--color-primary)' : 'white',
                            color: activeReport === item ? 'white' : 'var(--color-text)',
                            fontWeight: activeReport === item ? '600' : '400',
                            transition: 'all 0.2s'
                        }}>
                        {item}
                    </button>
                ))}
            </div>

            {/* Report Content Area */}
            {activeReport ? (
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    {/* Report Header */}
                    <div className="mobile-row" style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)' }}>{activeReport.toUpperCase()}</h2>
                            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{currentCategory.name} / {activeReport}</p>
                        </div>
                        <button onClick={() => setActiveReport(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-text-light)' }}>▲</button>
                    </div>

                    {/* Filters Row */}
                    <div style={{ padding: '16px 24px', background: '#f8f9fa', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{
                            background: 'var(--color-primary)', color: 'white', padding: '6px 14px', borderRadius: '8px',
                            fontWeight: '700', fontSize: '0.85rem'
                        }}>90</div>
                        <span style={{ fontSize: '0.85rem' }}>01-02-2026 to 28-02-2026</span>
                        <input type="month" value="2026-02" className="filter-select" style={{ maxWidth: '140px' }} readOnly />
                        <input type="month" value="2026-02" className="filter-select" style={{ maxWidth: '140px' }} readOnly />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FiMapPin size={14} color="var(--color-primary)" />
                            <select className="filter-select" value={branch} onChange={e => setBranch(e.target.value)}>
                                <option value="CN_1834">CN_1834</option>
                                <option value="CN_ALL">Tất cả chi nhánh</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => toast.success('Đã cập nhật báo cáo')}>OK</button>
                        <button className="btn btn-secondary" onClick={() => { setBranch('CN_1834'); toast.info('Đã đặt lại bộ lọc') }}>Đặt lại</button>
                    </div>

                    {/* Chart Area */}
                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center', padding: '16px', background: '#f0fff4', borderRadius: '12px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Tổng</span>
                                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#28a745' }}>
                                    {(mockChartData.reduce((s, d) => s + d.value, 0) / 1000000).toFixed(1)}M
                                </span>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#e3f2fd', borderRadius: '12px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Trung bình/ngày</span>
                                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1a73e8', display: 'block' }}>
                                    {(mockChartData.reduce((s, d) => s + d.value, 0) / mockChartData.length / 1000000).toFixed(1)}M
                                </span>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#fff3e0', borderRadius: '12px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Cao nhất</span>
                                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ff9800', display: 'block' }}>
                                    {(Math.max(...mockChartData.map(d => d.value)) / 1000000).toFixed(1)}M
                                </span>
                            </div>
                        </div>

                        {/* Simple Bar Chart */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', padding: '0 8px' }}>
                            {mockChartData.map((d, i) => {
                                const maxVal = Math.max(...mockChartData.map(x => x.value))
                                const barHeight = (d.value / maxVal) * 180
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>
                                            {(d.value / 1000000).toFixed(0)}M
                                        </span>
                                        <div style={{
                                            width: '100%', height: `${barHeight}px`, borderRadius: '6px 6px 0 0',
                                            background: `linear-gradient(to top, var(--color-primary), #20c997)`,
                                            transition: 'height 0.5s ease'
                                        }} />
                                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>{d.label.replace('Ngày ', '')}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                /* Default: Show all categories as cards when no report is selected */
                <div>
                    {/* Recently Viewed */}
                    {recentlyViewed.length > 0 && (
                        <div style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
                            <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><FiClock size={14} /> Xem gần đây</h4>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {recentlyViewed.map(r => (
                                    <span key={r} className="badge badge-info" style={{ cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => handleReportClick(r)}>{r}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'
                    }}>
                        {currentCategory.items.map((item, i) => (
                            <div key={i} onClick={() => handleReportClick(item)}
                                style={{
                                    background: 'white', borderRadius: '12px', padding: '16px 20px', cursor: 'pointer',
                                    border: '1px solid var(--color-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                                    transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(40,167,69,0.15)' }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: '500' }}>
                                    <FiFileText size={16} color="var(--color-primary)" /> {item}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiStar size={14}
                                        color={favorites.includes(item) ? '#ffc107' : '#ccc'}
                                        fill={favorites.includes(item) ? '#ffc107' : 'none'}
                                        onClick={(e) => toggleFavorite(item, e)} style={{ cursor: 'pointer' }} />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
