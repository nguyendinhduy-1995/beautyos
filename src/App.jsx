import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import Login from './pages/Login'
import DailyView from './pages/Appointments/DailyView'
import ByDateView from './pages/Appointments/ByDateView'
import CalendarView from './pages/Appointments/CalendarView'
import DoctorSchedule from './pages/Appointments/DoctorSchedule'
import WaitingScreen from './pages/Appointments/WaitingScreen'
import RealtimeView from './pages/Appointments/RealtimeView'
import FollowUp from './pages/CustomerCare/FollowUp'
import NoShow from './pages/CustomerCare/NoShow'
import PostCare from './pages/CustomerCare/PostCare'
import Birthday from './pages/CustomerCare/Birthday'
import Complaints from './pages/CustomerCare/Complaints'
import CancelledAppointments from './pages/CustomerCare/CancelledAppointments'
import PeriodicCare from './pages/CustomerCare/PeriodicCare'
import CustomerSupport from './pages/CustomerCare/CustomerSupport'
import NoServiceCheckIn from './pages/CustomerCare/NoServiceCheckIn'
import CustomerCareSelf from './pages/CustomerCare/CustomerCareSelf'
import CashFlow from './pages/Accounting/CashFlow'
import SupplierDebt from './pages/Accounting/SupplierDebt'
import ShiftClosing from './pages/Accounting/ShiftClosing'
import CashBook from './pages/Accounting/CashBook'
import CustomerList from './pages/Customers/CustomerList'
import RoomStatus from './pages/Customers/RoomStatus'
import CustomerProfile from './pages/Customers/CustomerProfile'
import Referrers from './pages/Customers/Referrers'
import CreateCustomer from './pages/Customers/CreateCustomer'
import ServiceCatalog from './pages/Services/ServiceCatalog'
import Combos from './pages/Services/Combos'
import Prescriptions from './pages/Services/Prescriptions'
import MembershipCards from './pages/Cards/MembershipCards'
import PrepaidCards from './pages/Cards/PrepaidCards'
import CardStatus from './pages/Cards/CardStatus'
import CardList from './pages/Cards/CardList'
import CustomCards from './pages/Cards/CustomCards'
import CardHistory from './pages/Cards/CardHistory'
import TreatmentPackages from './pages/Cards/TreatmentPackages'
import StockManagement from './pages/Inventory/StockManagement'
import ImportStock from './pages/Inventory/ImportStock'
import ExportStock from './pages/Inventory/ExportStock'
import BatchManagement from './pages/Inventory/BatchManagement'
import InventoryLookup from './pages/Inventory/InventoryLookup'
import WarehouseClosing from './pages/Inventory/WarehouseClosing'
import RawMaterials from './pages/Inventory/RawMaterials'
import WarehouseSettings from './pages/Inventory/WarehouseSettings'
import WarehouseManagement from './pages/Inventory/WarehouseManagement'
import WarehouseRequests from './pages/Inventory/WarehouseRequests'
import TicketList from './pages/Marketing/TicketList'
import Campaigns from './pages/Marketing/Campaigns'
import Promotions from './pages/Marketing/Promotions'
import Voucher from './pages/Marketing/Voucher'
import TicketTags from './pages/Marketing/TicketTags'
import TicketTransfer from './pages/Marketing/TicketTransfer'
import TicketFiles from './pages/Marketing/TicketFiles'
import DeletedTickets from './pages/Marketing/DeletedTickets'
import TicketStore from './pages/Marketing/TicketStore'
import TicketFilter from './pages/Marketing/TicketFilter'
import MarketingSettings from './pages/Marketing/MarketingSettings'
import CustomerFilter from './pages/Marketing/CustomerFilter'
import StaffList from './pages/Staff/StaffList'
import Payroll from './pages/Staff/Payroll'
import WorkSchedulePage from './pages/Staff/WorkSchedulePage'
import Permissions from './pages/Staff/Permissions'
import StaffDiscipline from './pages/Staff/StaffDiscipline'
import Settings from './pages/Config/Settings'
import PrintTemplates from './pages/Config/PrintTemplates'
import ConfigCategories from './pages/Config/ConfigCategories'
import ConfigCard from './pages/Config/ConfigCard'
import ConfigSMS from './pages/Config/ConfigSMS'
import Dashboard from './pages/Reports/Dashboard'
import Revenue from './pages/Reports/Revenue'
import ReportList from './pages/Reports/ReportList'
import MobileOverview from './pages/Mobile/MobileOverview'
import MobileNotifications from './pages/Mobile/MobileNotifications'
import MobileConfig from './pages/Mobile/MobileConfig'
import MobileBanner from './pages/Mobile/MobileBanner'
import MobileNews from './pages/Mobile/MobileNews'
import MobileVoucher from './pages/Mobile/MobileVoucher'
import MobileBooking from './pages/Mobile/MobileBooking'
import MobileContact from './pages/Mobile/MobileContact'
import MobileFeedback from './pages/Mobile/MobileFeedback'
import MobileAccounts from './pages/Mobile/MobileAccounts'
import MobileVideo from './pages/Mobile/MobileVideo'
import MobileBlog from './pages/Mobile/MobileBlog'
import MobileFAQ from './pages/Mobile/MobileFAQ'
import SMSHistory from './pages/Integration/SMSHistory'
import CallHistory from './pages/Integration/CallHistory'
import SMSStatus from './pages/Integration/SMSStatus'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
                {/* Default redirect */}
                <Route index element={<Navigate to="/appointments/daily" replace />} />

                {/* Lịch Hẹn */}
                <Route path="appointments/daily" element={<DailyView />} />
                <Route path="appointments/by-date" element={<ByDateView />} />
                <Route path="appointments/calendar" element={<CalendarView />} />
                <Route path="appointments/doctor" element={<DoctorSchedule />} />
                <Route path="appointments/waiting" element={<WaitingScreen />} />
                <Route path="appointments/realtime" element={<RealtimeView />} />

                {/* Chăm Sóc */}
                <Route path="care/followup" element={<FollowUp />} />
                <Route path="care/no-show" element={<NoShow />} />
                <Route path="care/post-care" element={<PostCare />} />
                <Route path="care/birthday" element={<Birthday />} />
                <Route path="care/complaints" element={<Complaints />} />
                <Route path="care/cancelled" element={<CancelledAppointments />} />
                <Route path="care/periodic" element={<PeriodicCare />} />
                <Route path="care/customer-support" element={<CustomerSupport />} />
                <Route path="care/no-service" element={<NoServiceCheckIn />} />
                <Route path="care/self" element={<CustomerCareSelf />} />

                {/* Kế Toán */}
                <Route path="accounting/cash-flow" element={<CashFlow />} />
                <Route path="accounting/supplier" element={<SupplierDebt />} />
                <Route path="accounting/closing" element={<ShiftClosing />} />
                <Route path="accounting/cashbook" element={<CashBook />} />

                {/* Khách Hàng */}
                <Route path="customers/list" element={<CustomerList />} />
                <Route path="customers/rooms" element={<RoomStatus />} />
                <Route path="customers/profile" element={<CustomerProfile />} />
                <Route path="customers/referrers" element={<Referrers />} />
                <Route path="customers/create" element={<CreateCustomer />} />

                {/* Dịch Vụ */}
                <Route path="services/catalog" element={<ServiceCatalog />} />
                <Route path="services/combos" element={<Combos />} />
                <Route path="services/prescriptions" element={<Prescriptions />} />

                {/* Thẻ */}
                <Route path="cards/list" element={<CardList />} />
                <Route path="cards/membership" element={<MembershipCards />} />
                <Route path="cards/custom" element={<CustomCards />} />
                <Route path="cards/history" element={<CardHistory />} />
                <Route path="cards/packages" element={<TreatmentPackages />} />
                <Route path="cards/prepaid" element={<PrepaidCards />} />
                <Route path="cards/status" element={<CardStatus />} />

                {/* Kho */}
                <Route path="inventory/stock" element={<StockManagement />} />
                <Route path="inventory/import" element={<ImportStock />} />
                <Route path="inventory/export" element={<ExportStock />} />
                <Route path="inventory/batch" element={<BatchManagement />} />
                <Route path="inventory/lookup" element={<InventoryLookup />} />
                <Route path="inventory/closing" element={<WarehouseClosing />} />
                <Route path="inventory/materials" element={<RawMaterials />} />
                <Route path="inventory/settings" element={<WarehouseSettings />} />
                <Route path="inventory/management" element={<WarehouseManagement />} />
                <Route path="inventory/requests" element={<WarehouseRequests />} />

                {/* Marketing */}
                <Route path="marketing/tickets" element={<TicketList />} />
                <Route path="marketing/campaigns" element={<Campaigns />} />
                <Route path="marketing/promotions" element={<Promotions />} />
                <Route path="marketing/voucher" element={<Voucher />} />
                <Route path="marketing/ticket-tags" element={<TicketTags />} />
                <Route path="marketing/ticket-transfer" element={<TicketTransfer />} />
                <Route path="marketing/ticket-files" element={<TicketFiles />} />
                <Route path="marketing/deleted-tickets" element={<DeletedTickets />} />
                <Route path="marketing/ticket-store" element={<TicketStore />} />
                <Route path="marketing/ticket-filter" element={<TicketFilter />} />
                <Route path="marketing/customer-filter" element={<CustomerFilter />} />
                <Route path="marketing/settings" element={<MarketingSettings />} />

                {/* Mobile & Website */}
                <Route path="mobile/overview" element={<MobileOverview />} />
                <Route path="mobile/notifications" element={<MobileNotifications />} />
                <Route path="mobile/config" element={<MobileConfig />} />
                <Route path="mobile/banner" element={<MobileBanner />} />
                <Route path="mobile/news" element={<MobileNews />} />
                <Route path="mobile/voucher" element={<MobileVoucher />} />
                <Route path="mobile/booking" element={<MobileBooking />} />
                <Route path="mobile/contact" element={<MobileContact />} />
                <Route path="mobile/feedback" element={<MobileFeedback />} />
                <Route path="mobile/accounts" element={<MobileAccounts />} />
                <Route path="mobile/video" element={<MobileVideo />} />
                <Route path="mobile/blog" element={<MobileBlog />} />
                <Route path="mobile/faq" element={<MobileFAQ />} />

                {/* Tích hợp */}
                <Route path="integration/sms-history" element={<SMSHistory />} />
                <Route path="integration/sms-status" element={<SMSStatus />} />
                <Route path="integration/call-history" element={<CallHistory />} />

                {/* Nhân Viên & User */}
                <Route path="staff/list" element={<StaffList />} />
                <Route path="staff/payroll" element={<Payroll />} />
                <Route path="staff/schedule" element={<WorkSchedulePage />} />
                <Route path="staff/permissions" element={<Permissions />} />
                <Route path="staff/discipline" element={<StaffDiscipline />} />

                {/* Cấu Hình */}
                <Route path="config/general" element={<Settings />} />
                <Route path="config/print" element={<PrintTemplates />} />
                <Route path="config/categories" element={<ConfigCategories />} />
                <Route path="config/card" element={<ConfigCard />} />
                <Route path="config/sms" element={<ConfigSMS />} />

                {/* Báo Cáo */}
                <Route path="reports/overview" element={<Dashboard />} />
                <Route path="reports/revenue" element={<Revenue />} />
                <Route path="reports/list" element={<ReportList />} />

                {/* Catch-all */}
                <Route path="*" element={<PlaceholderPage />} />
            </Route>
        </Routes>
    )
}
