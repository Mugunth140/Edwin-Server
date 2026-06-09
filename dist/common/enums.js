"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatus = exports.AdvanceEntityType = exports.PaymentType = exports.ExpenseCategory = exports.DrawingCategory = exports.SeverityLevel = exports.RfiStatus = exports.SnagStatus = exports.MilestoneStatus = exports.InvoiceStatus = exports.PaymentMode = exports.BillStatus = exports.PurchaseOrderStatus = exports.WorkOrderStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["ACCOUNTS_MANAGER"] = "accounts_manager";
    Role["SITE_ENGINEER"] = "site_engineer";
    Role["VIEWER"] = "viewer";
})(Role || (exports.Role = Role = {}));
var WorkOrderStatus;
(function (WorkOrderStatus) {
    WorkOrderStatus["DRAFT"] = "draft";
    WorkOrderStatus["SENT"] = "sent";
    WorkOrderStatus["APPROVED"] = "approved";
})(WorkOrderStatus || (exports.WorkOrderStatus = WorkOrderStatus = {}));
var PurchaseOrderStatus;
(function (PurchaseOrderStatus) {
    PurchaseOrderStatus["DRAFT"] = "draft";
    PurchaseOrderStatus["ISSUED"] = "issued";
    PurchaseOrderStatus["PARTIALLY_RECEIVED"] = "partially_received";
    PurchaseOrderStatus["COMPLETED"] = "completed";
    PurchaseOrderStatus["CANCELLED"] = "cancelled";
})(PurchaseOrderStatus || (exports.PurchaseOrderStatus = PurchaseOrderStatus = {}));
var BillStatus;
(function (BillStatus) {
    BillStatus["UNPAID"] = "unpaid";
    BillStatus["PARTIAL"] = "partial";
    BillStatus["PAID"] = "paid";
})(BillStatus || (exports.BillStatus = BillStatus = {}));
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["CASH"] = "cash";
    PaymentMode["UPI"] = "upi";
    PaymentMode["RTGS"] = "rtgs";
    PaymentMode["CHEQUE"] = "cheque";
})(PaymentMode || (exports.PaymentMode = PaymentMode = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["SENT"] = "sent";
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["OVERDUE"] = "overdue";
    InvoiceStatus["CANCELLED"] = "cancelled";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var MilestoneStatus;
(function (MilestoneStatus) {
    MilestoneStatus["PENDING"] = "pending";
    MilestoneStatus["IN_PROGRESS"] = "in_progress";
    MilestoneStatus["COMPLETED"] = "completed";
    MilestoneStatus["DELAYED"] = "delayed";
})(MilestoneStatus || (exports.MilestoneStatus = MilestoneStatus = {}));
var SnagStatus;
(function (SnagStatus) {
    SnagStatus["OPEN"] = "open";
    SnagStatus["IN_PROGRESS"] = "in_progress";
    SnagStatus["RESOLVED"] = "resolved";
    SnagStatus["CLOSED"] = "closed";
})(SnagStatus || (exports.SnagStatus = SnagStatus = {}));
var RfiStatus;
(function (RfiStatus) {
    RfiStatus["OPEN"] = "open";
    RfiStatus["RESPONDED"] = "responded";
    RfiStatus["CLOSED"] = "closed";
})(RfiStatus || (exports.RfiStatus = RfiStatus = {}));
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["LOW"] = "low";
    SeverityLevel["MEDIUM"] = "medium";
    SeverityLevel["HIGH"] = "high";
    SeverityLevel["CRITICAL"] = "critical";
})(SeverityLevel || (exports.SeverityLevel = SeverityLevel = {}));
var DrawingCategory;
(function (DrawingCategory) {
    DrawingCategory["STRUCTURAL"] = "structural";
    DrawingCategory["AS_BUILT"] = "as_built";
    DrawingCategory["GENERAL_ARRANGEMENT"] = "general_arrangement";
    DrawingCategory["ARCHITECTURAL"] = "architectural";
    DrawingCategory["HVAC"] = "hvac";
    DrawingCategory["MEP"] = "mep";
})(DrawingCategory || (exports.DrawingCategory = DrawingCategory = {}));
var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["STAFF"] = "staff";
    ExpenseCategory["OFFICE"] = "office";
    ExpenseCategory["TRANSPORT"] = "transport";
    ExpenseCategory["TRAVEL"] = "travel";
})(ExpenseCategory || (exports.ExpenseCategory = ExpenseCategory = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["MATERIAL"] = "material";
    PaymentType["LABOUR"] = "labour";
    PaymentType["RENT"] = "rent";
    PaymentType["ACCOMMODATION"] = "accommodation";
    PaymentType["OFFICE_MAINTENANCE"] = "office_maintenance";
    PaymentType["STAFF_EXPENSE"] = "staff_expense";
    PaymentType["TRAVEL"] = "travel";
    PaymentType["TRANSPORT"] = "transport";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var AdvanceEntityType;
(function (AdvanceEntityType) {
    AdvanceEntityType["VENDOR"] = "vendor";
    AdvanceEntityType["CUSTOMER"] = "customer";
    AdvanceEntityType["EMPLOYEE"] = "employee";
})(AdvanceEntityType || (exports.AdvanceEntityType = AdvanceEntityType = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["IN_PROGRESS"] = "in_progress";
    ProjectStatus["ON_HOLD"] = "on_hold";
    ProjectStatus["COMPLETED"] = "completed";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
//# sourceMappingURL=enums.js.map