import { useState } from 'react'
import { FiClipboard, FiPlus, FiSearch, FiCalendar, FiActivity, FiAlertCircle, FiFileText, FiUser, FiHeart } from 'react-icons/fi'
import { customers, services } from '../../data/mockData'

const records = customers.slice(0, 15).map((c, i) => ({
    id: `EMR-${String(1000 + i).padStart(4, '0')}`, customer: c.name, phone: c.phone, group: c.group, dob: `${1980 + i}/0${(i % 9) + 1}/15`,
    allergies: i % 3 === 0 ? 'Lidocaine' : i % 5 === 0 ? 'Latex' : 'Không',
    bloodType: ['A+', 'B+', 'O+', 'AB+', 'A-'][i % 5],
    conditions: i % 4 === 0 ? 'Tiểu đường type 2' : i % 3 === 0 ? 'Huyết áp cao' : 'Không',
    treatments: Math.floor(Math.random() * 8) + 1,
    lastVisit: `${20 + (i % 10)}/02/2026`,
}))

const treatmentHistory = [
    { date: '01/03/2026', service: 'Nâng cơ Hifu', doctor: 'BS. Nguyễn Văn An', area: 'Mặt + Cổ', intensity: 'Level 3', result: 'Tốt', note: 'KH hài lòng, hẹn tái khám sau 30 ngày' },
    { date: '15/02/2026', service: 'Filler môi', doctor: 'BS. Trần Thị Bình', area: 'Môi trên + dưới', intensity: '0.5ml', result: 'Tốt', note: 'Không sưng nhiều, đạt form mong muốn' },
    { date: '28/01/2026', service: 'Mesotherapy', doctor: 'BS. Nguyễn Văn An', area: 'Toàn mặt', intensity: '5 điểm', result: 'Khá', note: 'Da hơi đỏ sau 2h, cần theo dõi' },
]

export default function EMRRecords() {
    const [search, setSearch] = useState('')
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [tab, setTab] = useState('info')

    const filtered = records.filter(r => r.customer.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search))

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', borderRadius: 16, padding: '24px 28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiClipboard size={24} color="white" />
                    </div>
                    <div><h2 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 800 }}>Hồ sơ Y khoa (EMR)</h2>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Quản lý hồ sơ bệnh án • Lịch sử điều trị • Dị ứng & Chống chỉ định</p></div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FiSearch size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên hoặc mã EMR..." style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'var(--font-family)' }} />
                </div>
                <button style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: '#0284c7', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiPlus size={14} /> Tạo hồ sơ
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedRecord ? '1fr 420px' : '1fr', gap: 16 }}>
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead><tr style={{ background: '#f8fafc' }}>
                            {['Mã EMR', 'Bệnh nhân', 'Nhóm máu', 'Dị ứng', 'Bệnh nền', 'Lần điều trị', 'Khám cuối'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {filtered.map((r, i) => (
                                <tr key={i} onClick={() => setSelectedRecord(r)} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selectedRecord?.id === r.id ? '#f0f9ff' : 'white' }}>
                                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0284c7', fontWeight: 600, fontSize: 12 }}>{r.id}</td>
                                    <td style={{ padding: '10px 14px' }}>
                                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{r.customer}</div>
                                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.phone}</div>
                                    </td>
                                    <td style={{ padding: '10px 14px' }}><span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#fef2f2', color: '#dc2626' }}>{r.bloodType}</span></td>
                                    <td style={{ padding: '10px 14px', color: r.allergies !== 'Không' ? '#dc2626' : '#64748b', fontWeight: r.allergies !== 'Không' ? 600 : 400 }}>
                                        {r.allergies !== 'Không' && '⚠ '}{r.allergies}
                                    </td>
                                    <td style={{ padding: '10px 14px', color: r.conditions !== 'Không' ? '#d97706' : '#64748b', fontSize: 12 }}>{r.conditions}</td>
                                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a', textAlign: 'center' }}>{r.treatments}</td>
                                    <td style={{ padding: '10px 14px', color: '#64748b', fontSize: 12 }}>{r.lastVisit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedRecord && (
                    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                        <div style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', padding: '16px 20px', color: 'white' }}>
                            <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedRecord.customer}</div>
                            <div style={{ fontSize: 12, opacity: 0.8 }}>{selectedRecord.id} • {selectedRecord.phone}</div>
                        </div>
                        <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9' }}>
                            {[{ id: 'info', label: 'Thông tin' }, { id: 'history', label: 'Điều trị' }].map(t => (
                                <button key={t.id} onClick={() => setTab(t.id)} style={{
                                    flex: 1, padding: '10px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                                    fontSize: 12, fontWeight: 600, background: tab === t.id ? '#f0f9ff' : 'white', color: tab === t.id ? '#0284c7' : '#64748b',
                                    borderBottom: tab === t.id ? '2px solid #0284c7' : '2px solid transparent',
                                }}>{t.label}</button>
                            ))}
                        </div>
                        <div style={{ padding: 16 }}>
                            {tab === 'info' && (
                                <>
                                    {[{ l: 'Nhóm máu', v: selectedRecord.bloodType, c: '#dc2626', b: '#fef2f2' },
                                    { l: 'Dị ứng', v: selectedRecord.allergies, c: selectedRecord.allergies !== 'Không' ? '#dc2626' : '#64748b', b: selectedRecord.allergies !== 'Không' ? '#fef2f2' : '#f8fafc' },
                                    { l: 'Bệnh nền', v: selectedRecord.conditions, c: selectedRecord.conditions !== 'Không' ? '#d97706' : '#64748b', b: selectedRecord.conditions !== 'Không' ? '#fffbeb' : '#f8fafc' },
                                    { l: 'Ngày sinh', v: selectedRecord.dob, c: '#64748b', b: '#f8fafc' },
                                    { l: 'Tổng điều trị', v: `${selectedRecord.treatments} lần`, c: '#0284c7', b: '#f0f9ff' }].map((f, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8fafc' }}>
                                            <span style={{ fontSize: 12, color: '#64748b' }}>{f.l}</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: f.b, color: f.c }}>{f.v}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                            {tab === 'history' && treatmentHistory.map((t, i) => (
                                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{t.service}</span>
                                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{t.date}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>{t.doctor} • {t.area} • {t.intensity}</div>
                                    <div style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>📝 {t.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
