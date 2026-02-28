// Mock Data for BeautyOS

export const appointments = [
    { id: 1, time: '07:00 - 07:30', date: '27-02-2026', customerId: 'KH_0018552', customerName: 'Vũ Ngọc', phone: '0100018552', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Điều trị', status: 'pending' },
    { id: 2, time: '07:30 - 08:00', date: '27-02-2026', customerId: 'KH_0018553', customerName: 'Phan Thị Ngân', phone: '0100018553', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Tư vấn', status: 'arrived' },
    { id: 3, time: '08:00 - 08:30', date: '27-02-2026', customerId: 'KH_0018554', customerName: 'Nguyễn Tú Thảo', phone: '0100018554', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Điều trị', status: 'pending' },
    { id: 4, time: '08:30 - 09:00', date: '27-02-2026', customerId: 'KH_0018555', customerName: 'Phan Thị Kim Hồng', phone: '0100018555', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Tư vấn', status: 'arrived' },
    { id: 5, time: '09:00 - 09:30', date: '27-02-2026', customerId: 'KH_0018556', customerName: 'Hà Trọng Tú', phone: '0100018556', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Điều trị', status: 'pending' },
    { id: 6, time: '09:30 - 10:00', date: '27-02-2026', customerId: 'KH_0018557', customerName: 'Kim Trang', phone: '0100018557', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Tư vấn', status: 'arrived' },
    { id: 7, time: '09:33 - 10:03', date: '27-02-2026', customerId: 'KH_0018557', customerName: 'Kim Trang', phone: '0100018557', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Tư vấn', status: 'cancelled' },
    { id: 8, time: '09:33 - 10:03', date: '27-02-2026', customerId: 'KH_0018552', customerName: 'Vũ Ngọc', phone: '0100018552', content: 'Khách hàng đến tư vấn vào Ngày 3 Tháng 12 Năm 2022', type: 'Tư vấn', status: 'cancelled' },
    { id: 9, time: '10:00 - 10:30', date: '27-02-2026', customerId: 'KH_0018558', customerName: 'Lê Thị Hoa', phone: '0100018558', content: 'Khách hàng đến tư vấn vào Ngày 5 Tháng 1 Năm 2023', type: 'Điều trị', status: 'arrived' },
    { id: 10, time: '10:30 - 11:00', date: '27-02-2026', customerId: 'KH_0018559', customerName: 'Trần Văn Minh', phone: '0100018559', content: 'Tái khám theo lịch hẹn', type: 'Tư vấn', status: 'pending' },
];

export const customers = [
    { id: 'KH_0018552', name: 'Vũ Ngọc', phone: '0100018552', email: 'vungoc@email.com', dob: '15/03/1995', gender: 'Nữ', address: '123 Nguyễn Huệ, Q.1, TP.HCM', group: 'VIP', totalSpent: 15000000, visits: 12, lastVisit: '25-02-2026', referrer: 'Kim Trang' },
    { id: 'KH_0018553', name: 'Phan Thị Ngân', phone: '0100018553', email: 'nganthi@email.com', dob: '22/07/1990', gender: 'Nữ', address: '456 Lê Lợi, Q.3, TP.HCM', group: 'Thường', totalSpent: 8500000, visits: 7, lastVisit: '24-02-2026', referrer: '' },
    { id: 'KH_0018554', name: 'Nguyễn Tú Thảo', phone: '0100018554', email: 'tuthao@email.com', dob: '10/11/1988', gender: 'Nữ', address: '789 Hai Bà Trưng, Q.1, TP.HCM', group: 'VIP', totalSpent: 25000000, visits: 20, lastVisit: '26-02-2026', referrer: 'Vũ Ngọc' },
    { id: 'KH_0018555', name: 'Phan Thị Kim Hồng', phone: '0100018555', email: 'kimhong@email.com', dob: '05/09/1992', gender: 'Nữ', address: '321 Trần Hưng Đạo, Q.5, TP.HCM', group: 'Thường', totalSpent: 5200000, visits: 4, lastVisit: '23-02-2026', referrer: '' },
    { id: 'KH_0018556', name: 'Hà Trọng Tú', phone: '0100018556', email: 'trongtu@email.com', dob: '18/01/1985', gender: 'Nam', address: '654 Võ Văn Tần, Q.3, TP.HCM', group: 'Gold', totalSpent: 32000000, visits: 15, lastVisit: '27-02-2026', referrer: 'Nguyễn Tú Thảo' },
    { id: 'KH_0018557', name: 'Kim Trang', phone: '0100018557', email: 'kimtrang@email.com', dob: '30/06/1998', gender: 'Nữ', address: '987 Cách Mạng Tháng 8, Q.10, TP.HCM', group: 'VIP', totalSpent: 18000000, visits: 10, lastVisit: '27-02-2026', referrer: '' },
    { id: 'KH_0018558', name: 'Lê Thị Hoa', phone: '0100018558', email: 'lehoa@email.com', dob: '14/04/1993', gender: 'Nữ', address: '147 Nguyễn Thị Minh Khai, Q.1, TP.HCM', group: 'Thường', totalSpent: 3500000, visits: 3, lastVisit: '20-02-2026', referrer: 'Kim Trang' },
    { id: 'KH_0018559', name: 'Trần Văn Minh', phone: '0100018559', email: 'vanminh@email.com', dob: '25/12/1980', gender: 'Nam', address: '258 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM', group: 'Gold', totalSpent: 42000000, visits: 25, lastVisit: '26-02-2026', referrer: '' },
];

export const services = [
    { id: 'DV001', name: 'Chăm sóc da cơ bản', category: 'Chăm sóc da', price: 500000, duration: '60 phút', status: 'active' },
    { id: 'DV002', name: 'Trị mụn chuyên sâu', category: 'Điều trị', price: 1200000, duration: '90 phút', status: 'active' },
    { id: 'DV003', name: 'Nâng cơ Hifu', category: 'Thẩm mỹ', price: 8000000, duration: '120 phút', status: 'active' },
    { id: 'DV004', name: 'Triệt lông Laser', category: 'Triệt lông', price: 2500000, duration: '45 phút', status: 'active' },
    { id: 'DV005', name: 'Tẩy trắng răng', category: 'Nha khoa', price: 3000000, duration: '60 phút', status: 'active' },
    { id: 'DV006', name: 'Filler môi', category: 'Thẩm mỹ', price: 5000000, duration: '30 phút', status: 'active' },
    { id: 'DV007', name: 'Massage body', category: 'Spa', price: 800000, duration: '90 phút', status: 'active' },
    { id: 'DV008', name: 'Combo trẻ hóa da', category: 'Combo', price: 15000000, duration: '180 phút', status: 'active' },
    { id: 'DV009', name: 'Tư vấn da miễn phí', category: 'Tư vấn', price: 0, duration: '30 phút', status: 'active' },
    { id: 'DV010', name: 'Peel da hóa học', category: 'Điều trị', price: 1500000, duration: '45 phút', status: 'inactive' },
];

export const inventory = [
    { id: 'VT001', name: 'Serum Vitamin C', category: 'Mỹ phẩm', unit: 'Chai', quantity: 150, minStock: 20, price: 350000, supplier: 'ABC Cosmetics', expiry: '15/06/2027' },
    { id: 'VT002', name: 'Kem chống nắng SPF50', category: 'Mỹ phẩm', unit: 'Tuýp', quantity: 200, minStock: 30, price: 280000, supplier: 'XYZ Beauty', expiry: '20/12/2026' },
    { id: 'VT003', name: 'Kim tiêm filler', category: 'Dụng cụ', unit: 'Hộp', quantity: 5, minStock: 10, price: 1500000, supplier: 'MedTech VN', expiry: '01/03/2027' },
    { id: 'VT004', name: 'Gel siêu âm', category: 'Vật tư', unit: 'Chai', quantity: 45, minStock: 10, price: 120000, supplier: 'MedTech VN', expiry: '30/09/2027' },
    { id: 'VT005', name: 'Bông tẩy trang', category: 'Vật tư', unit: 'Gói', quantity: 300, minStock: 50, price: 25000, supplier: 'ABC Cosmetics', expiry: '31/12/2027' },
    { id: 'VT006', name: 'Acid Hyaluronic', category: 'Dược phẩm', unit: 'Lọ', quantity: 25, minStock: 15, price: 2800000, supplier: 'PharmaCo', expiry: '10/08/2026' },
    { id: 'VT007', name: 'Mask collagen', category: 'Mỹ phẩm', unit: 'Hộp', quantity: 80, minStock: 20, price: 450000, supplier: 'XYZ Beauty', expiry: '15/05/2027' },
    { id: 'VT008', name: 'Dầu massage', category: 'Spa', unit: 'Chai', quantity: 35, minStock: 10, price: 180000, supplier: 'SpaSource', expiry: '28/02/2027' },
];

export const staff = [
    { id: 'NV001', name: 'Nguyễn Thị Mai', role: 'Bác sĩ', department: 'Điều trị', phone: '0901234567', email: 'ntmai@beautyos.vn', status: 'active', salary: 25000000 },
    { id: 'NV002', name: 'Trần Văn Hùng', role: 'Bác sĩ', department: 'Thẩm mỹ', phone: '0912345678', email: 'tvhung@beautyos.vn', status: 'active', salary: 30000000 },
    { id: 'NV003', name: 'Lê Hoàng Anh', role: 'Kỹ thuật viên', department: 'Spa', phone: '0923456789', email: 'lhanh@beautyos.vn', status: 'active', salary: 12000000 },
    { id: 'NV004', name: 'Phạm Thu Hà', role: 'Lễ tân', department: 'Tiếp nhận', phone: '0934567890', email: 'ptha@beautyos.vn', status: 'active', salary: 9000000 },
    { id: 'NV005', name: 'Đỗ Minh Tuấn', role: 'Quản lý', department: 'Quản lý', phone: '0945678901', email: 'dmtuan@beautyos.vn', status: 'active', salary: 35000000 },
    { id: 'NV006', name: 'Võ Thị Lan', role: 'Kỹ thuật viên', department: 'Chăm sóc da', phone: '0956789012', email: 'vtlan@beautyos.vn', status: 'inactive', salary: 11000000 },
];

export const cashFlow = [
    { id: 1, date: '27-02-2026', type: 'Thu', category: 'Dịch vụ', description: 'Thanh toán dịch vụ Chăm sóc da - KH Vũ Ngọc', amount: 500000, method: 'Tiền mặt', staff: 'Phạm Thu Hà' },
    { id: 2, date: '27-02-2026', type: 'Thu', category: 'Dịch vụ', description: 'Thanh toán dịch vụ Trị mụn - KH Phan Thị Ngân', amount: 1200000, method: 'Chuyển khoản', staff: 'Phạm Thu Hà' },
    { id: 3, date: '27-02-2026', type: 'Chi', category: 'Vật tư', description: 'Nhập hàng Serum Vitamin C x20', amount: 7000000, method: 'Chuyển khoản', staff: 'Đỗ Minh Tuấn' },
    { id: 4, date: '26-02-2026', type: 'Thu', category: 'Thẻ', description: 'Mua thẻ VIP - KH Nguyễn Tú Thảo', amount: 10000000, method: 'Chuyển khoản', staff: 'Phạm Thu Hà' },
    { id: 5, date: '26-02-2026', type: 'Chi', category: 'Lương', description: 'Tạm ứng lương - NV Lê Hoàng Anh', amount: 5000000, method: 'Tiền mặt', staff: 'Đỗ Minh Tuấn' },
    { id: 6, date: '26-02-2026', type: 'Thu', category: 'Dịch vụ', description: 'Combo trẻ hóa da - KH Hà Trọng Tú', amount: 15000000, method: 'Thẻ', staff: 'Phạm Thu Hà' },
];

export const memberCards = [
    { id: 'THE001', customerId: 'KH_0018552', customerName: 'Vũ Ngọc', type: 'VIP Gold', balance: 8500000, totalDeposit: 20000000, status: 'active', created: '01/01/2025', expiry: '01/01/2027' },
    { id: 'THE002', customerId: 'KH_0018554', customerName: 'Nguyễn Tú Thảo', type: 'VIP Platinum', balance: 15000000, totalDeposit: 50000000, status: 'active', created: '15/03/2024', expiry: '15/03/2026' },
    { id: 'THE003', customerId: 'KH_0018556', customerName: 'Hà Trọng Tú', type: 'VIP Gold', balance: 12000000, totalDeposit: 30000000, status: 'active', created: '10/06/2025', expiry: '10/06/2027' },
    { id: 'THE004', customerId: 'KH_0018557', customerName: 'Kim Trang', type: 'Silver', balance: 3000000, totalDeposit: 10000000, status: 'active', created: '20/09/2025', expiry: '20/09/2027' },
    { id: 'THE005', customerId: 'KH_0018559', customerName: 'Trần Văn Minh', type: 'VIP Platinum', balance: 25000000, totalDeposit: 80000000, status: 'active', created: '05/01/2024', expiry: '05/01/2026' },
];

export const tickets = [
    { id: 'TK001', customerName: 'Nguyễn Thị Hương', phone: '0901111222', source: 'Facebook', service: 'Trị mụn chuyên sâu', assignee: 'Phạm Thu Hà', status: 'Mới', created: '27-02-2026', note: 'Khách quan tâm gói trị mụn' },
    { id: 'TK002', customerName: 'Lê Văn Đạt', phone: '0902222333', source: 'Zalo', service: 'Nâng cơ Hifu', assignee: 'Nguyễn Thị Mai', status: 'Đang xử lý', created: '26-02-2026', note: 'Đã tư vấn, hẹn ngày đến' },
    { id: 'TK003', customerName: 'Trần Thị Bích', phone: '0903333444', source: 'Website', service: 'Combo trẻ hóa da', assignee: 'Phạm Thu Hà', status: 'Chốt', created: '25-02-2026', note: 'Đã đặt lịch ngày 01/03' },
    { id: 'TK004', customerName: 'Hoàng Minh Đức', phone: '0904444555', source: 'Google Ads', service: 'Tẩy trắng răng', assignee: 'Trần Văn Hùng', status: 'Mới', created: '27-02-2026', note: 'Hỏi giá, chưa phản hồi' },
    { id: 'TK005', customerName: 'Phạm Thị Diệu', phone: '0905555666', source: 'Giới thiệu', service: 'Filler môi', assignee: 'Nguyễn Thị Mai', status: 'Đang xử lý', created: '26-02-2026', note: 'Được KH Vũ Ngọc giới thiệu' },
];

export const followUps = [
    { id: 1, customerName: 'Vũ Ngọc', phone: '0100018552', lastVisit: '25-02-2026', service: 'Chăm sóc da cơ bản', nextFollowUp: '01-03-2026', status: 'Chưa liên hệ', note: 'Nhắc tái khám sau 1 tuần' },
    { id: 2, customerName: 'Phan Thị Kim Hồng', phone: '0100018555', lastVisit: '20-02-2026', service: 'Trị mụn chuyên sâu', nextFollowUp: '27-02-2026', status: 'Đã hẹn', note: 'Liệu trình lần 3' },
    { id: 3, customerName: 'Lê Thị Hoa', phone: '0100018558', lastVisit: '15-02-2026', service: 'Nâng cơ Hifu', nextFollowUp: '28-02-2026', status: 'Chưa liên hệ', note: 'Kiểm tra sau 2 tuần' },
    { id: 4, customerName: 'Kim Trang', phone: '0100018557', lastVisit: '22-02-2026', service: 'Filler môi', nextFollowUp: '01-03-2026', status: 'Đã liên hệ', note: 'Hài lòng với kết quả' },
];

export const rooms = [
    { id: 'P.1', floor: 'Tầng 1', status: 'available', customer: null, service: null },
    { id: 'P.2', floor: 'Tầng 1', status: 'occupied', customer: 'Vũ Ngọc', service: 'Chăm sóc da cơ bản' },
    { id: 'P.3', floor: 'Tầng 1', status: 'cleaning', customer: null, service: null },
    { id: 'P.4', floor: 'Tầng 1', status: 'available', customer: null, service: null },
    { id: 'P.1', floor: 'Tầng 2', status: 'occupied', customer: 'Kim Trang', service: 'Filler môi' },
    { id: 'P.2', floor: 'Tầng 2', status: 'available', customer: null, service: null },
    { id: 'P.3', floor: 'Tầng 2', status: 'occupied', customer: 'Hà Trọng Tú', service: 'Nâng cơ Hifu' },
    { id: 'P.4', floor: 'Tầng 2', status: 'available', customer: null, service: null },
];

export const referrers = [
    { id: 1, name: 'Vũ Ngọc', phone: '0100018552', referredCount: 3, totalRevenue: 25000000, commission: 2500000, status: 'active' },
    { id: 2, name: 'Nguyễn Tú Thảo', phone: '0100018554', referredCount: 5, totalRevenue: 45000000, commission: 4500000, status: 'active' },
    { id: 3, name: 'Kim Trang', phone: '0100018557', referredCount: 2, totalRevenue: 12000000, commission: 1200000, status: 'active' },
    { id: 4, name: 'Trần Văn Minh', phone: '0100018559', referredCount: 1, totalRevenue: 8000000, commission: 800000, status: 'inactive' },
];

export const combos = [
    { id: 'CB001', name: 'Combo trẻ hóa da toàn diện', services: ['Nâng cơ Hifu', 'Chăm sóc da cơ bản', 'Mask collagen'], price: 12000000, originalPrice: 15000000, sessions: 5, status: 'active' },
    { id: 'CB002', name: 'Combo trị mụn 3 bước', services: ['Trị mụn chuyên sâu', 'Peel da hóa học', 'Serum Vitamin C'], price: 3500000, originalPrice: 4500000, sessions: 3, status: 'active' },
    { id: 'CB003', name: 'Combo triệt lông toàn thân', services: ['Triệt lông Laser x 6 vùng'], price: 12000000, originalPrice: 15000000, sessions: 6, status: 'active' },
    { id: 'CB004', name: 'Combo thẩm mỹ VIP', services: ['Filler môi', 'Nâng cơ Hifu', 'Tẩy trắng răng'], price: 14000000, originalPrice: 16000000, sessions: 3, status: 'inactive' },
];

export const prescriptions = [
    { id: 'TT001', name: 'Toa trị mụn cơ bản', doctor: 'Nguyễn Thị Mai', medicines: ['Serum Vitamin C', 'Kem chống nắng SPF50'], diagnosis: 'Mụn viêm nhẹ', note: 'Dùng 2 lần/ngày', created: '27-02-2026' },
    { id: 'TT002', name: 'Toa phục hồi da', doctor: 'Trần Văn Hùng', medicines: ['Acid Hyaluronic', 'Mask collagen', 'Gel siêu âm'], diagnosis: 'Da khô, thiếu ẩm', note: 'Liệu trình 4 tuần', created: '26-02-2026' },
    { id: 'TT003', name: 'Toa dưỡng da sau điều trị', doctor: 'Nguyễn Thị Mai', medicines: ['Kem chống nắng SPF50', 'Serum Vitamin C'], diagnosis: 'Hậu peel da', note: 'Tránh ánh nắng 2 tuần', created: '25-02-2026' },
];

export const prepaidCards = [
    { id: 'TT001', customerName: 'Vũ Ngọc', phone: '0100018552', cardType: 'Thẻ 10 triệu', totalValue: 10000000, usedValue: 3500000, remaining: 6500000, status: 'active', created: '01/01/2026', expiry: '01/01/2027' },
    { id: 'TT002', customerName: 'Phan Thị Ngân', phone: '0100018553', cardType: 'Thẻ 5 triệu', totalValue: 5000000, usedValue: 2000000, remaining: 3000000, status: 'active', created: '15/01/2026', expiry: '15/01/2027' },
    { id: 'TT003', customerName: 'Hà Trọng Tú', phone: '0100018556', cardType: 'Thẻ 20 triệu', totalValue: 20000000, usedValue: 8000000, remaining: 12000000, status: 'active', created: '10/12/2025', expiry: '10/12/2026' },
    { id: 'TT004', customerName: 'Trần Văn Minh', phone: '0100018559', cardType: 'Thẻ 50 triệu', totalValue: 50000000, usedValue: 35000000, remaining: 15000000, status: 'active', created: '05/06/2025', expiry: '05/06/2026' },
    { id: 'TT005', customerName: 'Lê Thị Hoa', phone: '0100018558', cardType: 'Thẻ 5 triệu', totalValue: 5000000, usedValue: 5000000, remaining: 0, status: 'expired', created: '01/02/2025', expiry: '01/02/2026' },
];

export const warehouseSlips = [
    { id: 'OUT20260227.1818', type: 'Xuất', creator: 'Vũ Thị Hồng_1834', date: '09:33 27-02-2026', amount: null, tag: null, status: 'Chưa ký tên' },
    { id: 'IN20260227.1898', type: 'Nhập', creator: 'Vũ Thị Hồng_1834', date: '09:33 27-02-2026', amount: 89532000, tag: null, status: 'Chưa ký tên' },
    { id: 'OUTTS20260227.4', type: 'Xuất', creator: 'Vũ Thị Hồng_1834', date: '09:33 27-02-2026', amount: null, tag: 'THUỐC', status: 'Đã xử lý' },
    { id: 'OUTTS20260227.30593', type: 'Xuất', creator: 'Vũ Thị Hồng_1834', date: '09:33 27-02-2026', amount: null, tag: 'THUỐC', status: 'Đã xử lý' },
    { id: 'OUTTS20260227.30595', type: 'Xuất', creator: 'Vũ Thị Hồng_1834', date: '09:33 27-02-2026', amount: null, tag: 'THUỐC', status: 'Đã xử lý' },
    { id: 'IN20260226.1512', type: 'Nhập', creator: 'Vũ Thị Hồng_1834', date: '14:20 26-02-2026', amount: 45000000, tag: null, status: 'Đã duyệt' },
];

export const campaigns = [
    { id: 'CD001', name: 'Khuyến mãi 8/3', startDate: '01-03-2026', endDate: '10-03-2026', budget: 20000000, spent: 8500000, leads: 45, conversions: 12, status: 'active', channel: 'Facebook' },
    { id: 'CD002', name: 'Tri ân khách VIP', startDate: '15-02-2026', endDate: '28-02-2026', budget: 15000000, spent: 14200000, leads: 30, conversions: 18, status: 'active', channel: 'SMS/ZNS' },
    { id: 'CD003', name: 'Ra mắt dịch vụ mới', startDate: '01-02-2026', endDate: '15-02-2026', budget: 30000000, spent: 30000000, leads: 120, conversions: 35, status: 'completed', channel: 'Google Ads' },
    { id: 'CD004', name: 'Giảm giá cuối năm', startDate: '15-12-2025', endDate: '31-12-2025', budget: 50000000, spent: 48500000, leads: 200, conversions: 65, status: 'completed', channel: 'Multi-channel' },
];

export const promotions = [
    { id: 'KM001', name: 'Giảm 20% Chăm sóc da', type: 'Giảm giá', value: '20%', appliesTo: 'Chăm sóc da cơ bản', startDate: '01-03-2026', endDate: '31-03-2026', usageCount: 0, maxUsage: 100, status: 'active' },
    { id: 'KM002', name: 'Tặng quà khi mua thẻ', type: 'Tặng quà', value: 'Mask collagen x5', appliesTo: 'Thẻ VIP Gold', startDate: '01-02-2026', endDate: '28-02-2026', usageCount: 12, maxUsage: 50, status: 'active' },
    { id: 'KM003', name: 'Combo giảm 30%', type: 'Giảm giá', value: '30%', appliesTo: 'Combo trẻ hóa da', startDate: '01-01-2026', endDate: '31-01-2026', usageCount: 25, maxUsage: 30, status: 'expired' },
    { id: 'KM004', name: 'Giới thiệu bạn - Giảm 500K', type: 'Voucher', value: '500,000₫', appliesTo: 'Tất cả dịch vụ', startDate: '01-01-2026', endDate: '30-06-2026', usageCount: 8, maxUsage: 200, status: 'active' },
];

export const payroll = [
    { id: 'NV001', name: 'Nguyễn Thị Mai', role: 'Bác sĩ', baseSalary: 25000000, commission: 8500000, bonus: 2000000, deductions: 3500000, netSalary: 32000000, status: 'Đã thanh toán' },
    { id: 'NV002', name: 'Trần Văn Hùng', role: 'Bác sĩ', baseSalary: 30000000, commission: 12000000, bonus: 3000000, deductions: 4200000, netSalary: 40800000, status: 'Đã thanh toán' },
    { id: 'NV003', name: 'Lê Hoàng Anh', role: 'Kỹ thuật viên', baseSalary: 12000000, commission: 3500000, bonus: 1000000, deductions: 1800000, netSalary: 14700000, status: 'Chờ duyệt' },
    { id: 'NV004', name: 'Phạm Thu Hà', role: 'Lễ tân', baseSalary: 9000000, commission: 1500000, bonus: 500000, deductions: 1200000, netSalary: 9800000, status: 'Đã thanh toán' },
    { id: 'NV005', name: 'Đỗ Minh Tuấn', role: 'Quản lý', baseSalary: 35000000, commission: 5000000, bonus: 5000000, deductions: 5500000, netSalary: 39500000, status: 'Chờ duyệt' },
    { id: 'NV006', name: 'Võ Thị Lan', role: 'Kỹ thuật viên', baseSalary: 11000000, commission: 0, bonus: 0, deductions: 1200000, netSalary: 9800000, status: 'Nghỉ việc' },
];

export const workSchedule = [
    { id: 'NV001', name: 'Nguyễn Thị Mai', mon: 'S', tue: 'S', wed: 'C', thu: 'S', fri: 'S', sat: 'S', sun: 'OFF' },
    { id: 'NV002', name: 'Trần Văn Hùng', mon: 'S', tue: 'C', wed: 'S', thu: 'S', fri: 'C', sat: 'S', sun: 'OFF' },
    { id: 'NV003', name: 'Lê Hoàng Anh', mon: 'C', tue: 'S', wed: 'S', thu: 'C', fri: 'S', sat: 'S', sun: 'S' },
    { id: 'NV004', name: 'Phạm Thu Hà', mon: 'S', tue: 'S', wed: 'S', thu: 'S', fri: 'S', sat: 'C', sun: 'OFF' },
    { id: 'NV005', name: 'Đỗ Minh Tuấn', mon: 'S', tue: 'S', wed: 'S', thu: 'S', fri: 'S', sat: 'S', sun: 'OFF' },
];

export const supplierDebts = [
    { id: 1, supplier: 'ABC Cosmetics', totalDebt: 25000000, paid: 18000000, remaining: 7000000, dueDate: '15-03-2026', status: 'Chưa thanh toán' },
    { id: 2, supplier: 'XYZ Beauty', totalDebt: 15000000, paid: 15000000, remaining: 0, dueDate: '01-03-2026', status: 'Đã thanh toán' },
    { id: 3, supplier: 'MedTech VN', totalDebt: 45000000, paid: 30000000, remaining: 15000000, dueDate: '20-03-2026', status: 'Chưa thanh toán' },
    { id: 4, supplier: 'PharmaCo', totalDebt: 80000000, paid: 55000000, remaining: 25000000, dueDate: '10-04-2026', status: 'Quá hạn' },
    { id: 5, supplier: 'SpaSource', totalDebt: 8000000, paid: 8000000, remaining: 0, dueDate: '28-02-2026', status: 'Đã thanh toán' },
];

export const reportCategories = [
    { id: 1, name: 'Tổng Quát', icon: '📊', count: 5, items: ['Tổng Quan Doanh Thu', 'Báo Cáo Tổng Hợp', 'Biểu Đồ Xu Hướng', 'Top Dịch Vụ', 'Thống Kê Chung'] },
    { id: 2, name: 'Doanh Số / Thu', icon: '💰', count: 7, items: ['Doanh Thu Chi Nhánh', 'Doanh Số Chi Nhánh', 'Nguồn Khách Hàng', 'Doanh Số Chi Tiết', 'Doanh Thu Chi Tiết', 'Hoàn Tiền Khách Hàng', 'Doanh Thu Theo Nguồn', 'Doanh Thu Theo Nhóm Dịch Vụ'] },
    { id: 3, name: 'Hoa Hồng', icon: '🎯', count: 4, items: ['Hoa Hồng Theo NV', 'Hoa Hồng Theo DV', 'Tổng Hợp Hoa Hồng', 'Chi Tiết Hoa Hồng'] },
    { id: 4, name: 'Tình Trạng DV', icon: '📋', count: 5, items: ['Dịch Vụ Đang Thực Hiện', 'Dịch Vụ Hoàn Thành', 'Dịch Vụ Huỷ', 'Thống Kê Theo Loại DV', 'Dịch Vụ Theo Nhân Viên'] },
    { id: 5, name: 'Thuốc', icon: '💊', count: 4, items: ['Toa Thuốc Theo Ngày', 'Thuốc Sử Dụng Nhiều', 'Tồn Kho Thuốc', 'Thuốc Gần Hết Hạn'] },
    { id: 6, name: 'Điều Trị', icon: '💉', count: 5, items: ['Liệu Trình Đang Chạy', 'Liệu Trình Hoàn Thành', 'Hiệu Quả Điều Trị', 'Bệnh Nhân Theo Bác Sĩ', 'Chẩn Đoán Thường Gặp'] },
    { id: 7, name: 'Kho', icon: '📦', count: 5, items: ['Tồn Kho Hiện Tại', 'Nhập Xuất Kho', 'Vật Tư Hết Hạn', 'Kiểm Kê Định Kỳ', 'Biến Động Kho'] },
    { id: 8, name: 'Kế Toán', icon: '🧾', count: 5, items: ['Thu Chi Theo Ngày', 'Thu Chi Theo Tháng', 'Công Nợ NCC', 'Chốt Ca', 'Sổ Quỹ'] },
    { id: 9, name: 'Lưu Lượng', icon: '📈', count: 4, items: ['Lượt Khách Theo Ngày', 'Lượt Khách Theo Tháng', 'Giờ Cao Điểm', 'Tỷ Lệ Khách Quay Lại'] },
    { id: 10, name: 'So Sánh', icon: '⚖️', count: 4, items: ['So Sánh Chi Nhánh', 'So Sánh Theo Tháng', 'So Sánh Nhân Viên', 'So Sánh Dịch Vụ'] },
    { id: 11, name: 'Chăm Sóc', icon: '💝', count: 5, items: ['Khách Hàng Mới', 'Khách Tái Khám', 'Tỷ Lệ Hài Lòng', 'Khiếu Nại', 'Follow-up'] },
    { id: 12, name: 'Sale Marketing', icon: '🚀', count: 5, items: ['Ticket Theo Nguồn', 'Tỷ Lệ Chuyển Đổi', 'Chi Phí Marketing', 'ROI Chiến Dịch', 'Hiệu Quả Kênh'] },
    { id: 13, name: 'Học Viên', icon: '🎓', count: 3, items: ['Danh Sách Học Viên', 'Tiến Độ Đào Tạo', 'Kết Quả Thi'] },
    { id: 14, name: 'Cs Hạ Tầng', icon: '🏢', count: 3, items: ['Phòng & Thiết Bị', 'Bảo Trì', 'Sử Dụng Phòng'] },
];

export const configCategories = [
    { id: 1, group: 'Cài Đặt Chung', items: ['Công Ty', 'Chi Nhánh', 'Cấu Hình Option', 'Trạng Thái Nhắc Lịch', 'Trạng Thái Chăm Sóc KH Không Làm DV', 'Trạng Thái Chăm Sóc Sinh Nhật', 'Trạng Thái Đặt Lịch Không Đến', 'Trạng Thái Chăm Sóc Sau Điều Trị'] },
    { id: 2, group: 'Chăm Sóc', items: ['Trạng Thái Complaint Khách Hàng', 'Trạng Thái Follow Telesales', 'Trạng Thái Lịch Sử Khách Hàng', 'Trạng Thái Chăm Sóc', 'Trạng Thái Tư Vấn'] },
    { id: 3, group: 'Lịch Hẹn', items: ['Dịch Vụ Quan Tâm', 'Mã Màu Calendar', 'Mã Màu Lịch Hẹn', 'Lý Do Huỷ Lịch Hẹn', 'Thời Gian Dự Kiến Của Lịch Hẹn', 'Trạng Thái Lịch Hẹn'] },
    { id: 4, group: 'Dịch vụ/Thẻ', items: ['Thẻ Trả Trước', 'Bảo Hiểm', 'Lý Do Miễn Phí Dịch Vụ'] },
    { id: 5, group: 'Kế toán/Nhân viên', items: ['Chức Vụ', 'Phòng Ban', 'Khu Vực', 'Nguồn Khách Hàng', 'Mục Thu Chi'] },
    { id: 6, group: 'Chẩn đoán/Điều trị', items: ['Nhóm Chẩn Đoán', 'Mã ICD', 'Đơn Vị Tính'] },
];

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
