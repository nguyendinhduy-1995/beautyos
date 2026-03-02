import { useState } from 'react'
import { FiBarChart2, FiTrendingUp, FiCalendar, FiDownload, FiFilter, FiPieChart } from 'react-icons/fi'
import { services, staff } from '../../data/mockData'

const reportCategories = [
    { id: 'revenue', name: '💰 Doanh thu', count: 8, desc: 'DT theo ngày/tuần/tháng, theo DV, theo NV' },
    { id: 'customers', name: '👥 Khách hàng', count: 6, desc: 'KH mới, tái khám, churn rate, LTV' },
    { id: 'services', name: '💆 Dịch vụ', count: 5, desc: 'DV phổ biến, combo, tỷ lệ hoàn thành' },
    { id: 'staff', name: '👨‍⚕️ Nhân viên', count: 7, desc: 'KPI, doanh thu/NV, đánh giá' },
    { id: 'inventory', name: '📦 Kho', count: 4, desc: 'Tồn kho, sắp hết, hết hạn' },
    { id: 'marketing', name: '📣 Marketing', count: 5, desc: 'ROI quảng cáo, nguồn khách, conversion' },
]

const recentReports = [
    { name: 'Doanh thu T2/2026', type: 'revenue', date: '28/02/2026', format: 'Excel', size: '1.2MB' },
    { name: 'Khách hàng mới Q1', type: 'customers', date: '27/02/2026', format: 'PDF', size: '856KB' },
    { name: 'KPI NV tháng 2', type: 'staff', date: '28/02/2026', format: 'Excel', size: '2.1MB' },
    { name: 'Tồn kho 02/2026', type: 'inventory', date: '01/03/2026', format: 'Excel', size: '980KB' },
    { name: 'ROI Marketing Q1', type: 'marketing', date: '01/03/2026', format: 'PDF', size: '1.5MB' },
]

const kpis = [
    { name: 'Doanh thu T2', value: '420M', change: '+12%', up: true },
    { name: 'KH mới T2', value: '68', change: '+8', up: true },
    { name: 'TB DV/ngày', value: '24', change: '+3', up: true },
    { name: 'Tỉ lệ tái khám', value: '72%', change: '-2%', up: false },
    { name: 'Chi phí/KH', value: '85K', change: '-15%', up: true },
    { name: 'NPS Score', value: '8.5', change: '+0.3', up: true },
]

export default function AdvancedReports() {
    const [tab, setTab] = useState('overview')

    return (
        <div className="premium-page fade-in">
            <div className="premium-header" style={{ background: 'linear-gradient(135deg, #4338ca, #818cf8)' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div className="premium-header-inner">
                    <div className="premium-header-icon"><FiBarChart2 size={24} color="white" /></div>
                    <div style={{ flex: 1 }}>
                        <h2>Báo cáo Nâng cao</h2>
                        <p>35+ mẫu báo cáo • KPI dashboard • Xuất Excel/PDF</p>
                    </div>
                </div>
                <div className="premium-stats-row">
                    {[{ l: 'Mẫu báo cáo', v: reportCategories.reduce((s, c) => s + c.count, 0) }, { l: 'Danh mục', v: reportCategories.length }, { l: 'Gần đây', v: recentReports.length }, { l: 'KPI', v: kpis.length }].map((s, i) => (
                        <div key={i} className="premium-stat-item">
                            <div className="premium-stat-value">{s.v}</div>
                            <div className="premium-stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="premium-tabs">
                {[{ id: 'overview', label: '📊 KPI' }, { id: 'categories', label: '📁 Danh mục' }, { id: 'recent', label: '📄 Gần đây' }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} className="premium-tab" style={{ background: tab === t.id ? '#4338ca' : '#f1f5f9', color: tab === t.id ? 'white' : '#64748b' }}>{t.label}</button>
                ))}
            </div>

            {tab === 'overview' && (
                <div className="premium-cards-grid">
                    {kpis.map((k, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, textAlign: 'center' }}>
                            <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{k.value}</div>
                            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{k.name}</div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: k.up ? '#059669' : '#dc2626' }}>
                                {k.up ? '↑' : '↓'} {k.change}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'categories' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {reportCategories.map((c, i) => (
                        <div key={i} className="premium-card" style={{ padding: 16, cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: '#eef2ff', color: '#4338ca' }}>{c.count} báo cáo</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b' }}>{c.desc}</div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'recent' && (
                <div className="premium-table-wrap">
                    <table>
                        <thead><tr>
                            {['Báo cáo', 'Loại', 'Ngày tạo', 'Format', 'Size', ''].map(h => <th key={h}>{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {recentReports.map((r, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{r.name}</td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#eef2ff', color: '#4338ca' }}>{r.type}</span></td>
                                    <td style={{ color: '#64748b', fontSize: 12 }}>{r.date}</td>
                                    <td><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: r.format === 'Excel' ? '#ecfdf5' : '#fef2f2', color: r.format === 'Excel' ? '#059669' : '#dc2626' }}>{r.format}</span></td>
                                    <td style={{ color: '#94a3b8', fontSize: 12 }}>{r.size}</td>
                                    <td><button className="premium-action-btn" style={{ background: '#4338ca', color: 'white' }}><FiDownload size={12} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
