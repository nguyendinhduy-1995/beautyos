import { useState } from 'react'
import { FiShield, FiCheck, FiX, FiSave } from 'react-icons/fi'
import { useToast } from '../../components/ToastProvider'

const roles = ['Quản trị viên', 'Bác sĩ', 'Kỹ thuật viên', 'Lễ tân', 'Kế toán']
const permissionGroups = [
    { id: 1, group: 'Lịch Hẹn', items: ['Xem', 'Tạo mới', 'Sửa', 'Xoá', 'Phân bổ'] },
    { id: 2, group: 'Khách Hàng', items: ['Xem', 'Tạo mới', 'Sửa', 'Xoá', 'Xuất Excel'] },
    { id: 3, group: 'Kế Toán', items: ['Xem thu chi', 'Tạo phiếu', 'Chốt ca', 'Báo cáo'] },
    { id: 4, group: 'Kho', items: ['Xem tồn kho', 'Nhập kho', 'Xuất kho', 'Kiểm kê'] },
    { id: 5, group: 'Nhân Viên', items: ['Xem', 'Thêm NV', 'Sửa NV', 'Bảng lương', 'Phân quyền'] },
    { id: 6, group: 'Báo Cáo', items: ['Xem tổng quan', 'Xuất báo cáo', 'Xem chi tiết'] },
]

const defaultPerms = {
    'Quản trị viên': () => true,
    'Bác sĩ': (g) => g !== 'Kế Toán' && g !== 'Nhân Viên',
    'Kỹ thuật viên': (g) => g === 'Lịch Hẹn' || g === 'Khách Hàng',
    'Lễ tân': (g, i) => g === 'Lịch Hẹn' || g === 'Khách Hàng' || (g === 'Kế Toán' && i.includes('Xem')),
    'Kế toán': (g) => g === 'Kế Toán' || g === 'Báo Cáo' || g === 'Kho',
}

function initPerms() {
    const p = {}
    roles.forEach(r => {
        p[r] = {}
        permissionGroups.forEach(pg => {
            pg.items.forEach(item => {
                const fn = defaultPerms[r]
                p[r][`${pg.group}|${item}`] = fn ? fn(pg.group, item) : false
            })
        })
    })
    return p
}

export default function Permissions() {
    const { addToast } = useToast()
    const [selectedRole, setSelectedRole] = useState('Quản trị viên')
    const [perms, setPerms] = useState(initPerms)

    const togglePerm = (group, item) => {
        if (selectedRole === 'Quản trị viên') { addToast('Không thể thay đổi quyền Quản trị viên', 'error'); return }
        const key = `${group}|${item}`
        setPerms(prev => ({ ...prev, [selectedRole]: { ...prev[selectedRole], [key]: !prev[selectedRole][key] } }))
    }

    const hasPerm = (group, item) => perms[selectedRole]?.[`${group}|${item}`] ?? false

    const totalPerms = permissionGroups.reduce((s, pg) => s + pg.items.length, 0)
    const activePerms = permissionGroups.reduce((s, pg) => s + pg.items.filter(i => hasPerm(pg.group, i)).length, 0)

    return (
        <div className="fade-in">
            <div className="page-header mobile-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h2>Phân Quyền</h2><p>Quản lý quyền truy cập cho từng vai trò</p></div>
                <button className="btn btn-primary" onClick={() => addToast('Đã lưu thay đổi phân quyền!', 'success')}><FiSave size={14} /> Lưu thay đổi</button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {roles.map(r => (
                    <button key={r} onClick={() => setSelectedRole(r)}
                        style={{ padding: '8px 16px', borderRadius: '10px', border: selectedRole === r ? '2px solid var(--primary)' : '1px solid var(--color-border)', background: selectedRole === r ? '#e3f2fd' : 'white', fontWeight: selectedRole === r ? 700 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                        <FiShield size={14} color={selectedRole === r ? 'var(--primary)' : 'var(--gray-500)'} /> {r}
                    </button>
                ))}
            </div>

            <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '12px 20px', marginBottom: '16px', fontSize: '0.85rem' }}>
                <b>{selectedRole}</b> — {activePerms}/{totalPerms} quyền được bật
                <div style={{ width: '200px', height: '6px', background: '#e9ecef', borderRadius: '3px', marginTop: '6px' }}>
                    <div style={{ width: `${(activePerms / totalPerms) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px', transition: 'width 0.3s' }} />
                </div>
            </div>

            <div className="table-container">
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead><tr><th>Nhóm chức năng</th><th>Quyền</th><th style={{ textAlign: 'center', width: '100px' }}>Trạng thái</th></tr></thead>
                        <tbody>
                            {permissionGroups.map(pg =>
                                pg.items.map((item, i) => (
                                    <tr key={`${pg.id}-${i}`} onClick={() => togglePerm(pg.group, item)} style={{ cursor: selectedRole !== 'Quản trị viên' ? 'pointer' : 'default' }}>
                                        {i === 0 && <td rowSpan={pg.items.length} style={{ fontWeight: 600, verticalAlign: 'top', background: '#f8f9fa' }}>{pg.group}</td>}
                                        <td>{item}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div onClick={(e) => { e.stopPropagation(); togglePerm(pg.group, item) }}
                                                style={{ width: '40px', height: '22px', borderRadius: '11px', background: hasPerm(pg.group, item) ? '#28a745' : '#dee2e6', display: 'inline-flex', alignItems: 'center', padding: '2px', cursor: selectedRole !== 'Quản trị viên' ? 'pointer' : 'default', transition: 'background 0.2s' }}>
                                                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transform: hasPerm(pg.group, item) ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
