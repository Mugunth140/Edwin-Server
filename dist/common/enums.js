"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkCategory = exports.ProjectStatus = exports.AdvanceEntityType = exports.PaymentType = exports.ExpenseStatus = exports.ExpenseCategory = exports.DrawingCategory = exports.SeverityLevel = exports.RfiStatus = exports.SnagStatus = exports.MilestoneStatus = exports.InvoiceStatus = exports.PaymentMode = exports.BillStatus = exports.PurchaseOrderStatus = exports.SubcontractWorkOrderStatus = exports.WorkOrderStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["ACCOUNTS_MANAGER"] = "accounts_manager";
    Role["PURCHASE_TEAM"] = "purchase_team";
    Role["SITE_ENGINEER"] = "site_engineer";
    Role["VIEWER"] = "viewer";
})(Role || (exports.Role = Role = {}));
var WorkOrderStatus;
(function (WorkOrderStatus) {
    WorkOrderStatus["DRAFT"] = "draft";
    WorkOrderStatus["SENT"] = "sent";
    WorkOrderStatus["APPROVED"] = "approved";
})(WorkOrderStatus || (exports.WorkOrderStatus = WorkOrderStatus = {}));
var SubcontractWorkOrderStatus;
(function (SubcontractWorkOrderStatus) {
    SubcontractWorkOrderStatus["PENDING"] = "pending";
    SubcontractWorkOrderStatus["ADMIN_APPROVED"] = "admin_approved";
    SubcontractWorkOrderStatus["APPROVED"] = "approved";
    SubcontractWorkOrderStatus["REJECTED"] = "rejected";
})(SubcontractWorkOrderStatus || (exports.SubcontractWorkOrderStatus = SubcontractWorkOrderStatus = {}));
var PurchaseOrderStatus;
(function (PurchaseOrderStatus) {
    PurchaseOrderStatus["DRAFT"] = "draft";
    PurchaseOrderStatus["SENT"] = "sent";
    PurchaseOrderStatus["PENDING"] = "pending";
    PurchaseOrderStatus["ADMIN_APPROVED"] = "admin_approved";
    PurchaseOrderStatus["APPROVED"] = "approved";
    PurchaseOrderStatus["REJECTED"] = "rejected";
})(PurchaseOrderStatus || (exports.PurchaseOrderStatus = PurchaseOrderStatus = {}));
var BillStatus;
(function (BillStatus) {
    BillStatus["PENDING"] = "pending";
    BillStatus["ADMIN_APPROVED"] = "admin_approved";
    BillStatus["APPROVED"] = "approved";
    BillStatus["REJECTED"] = "rejected";
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
    InvoiceStatus["PARTIAL"] = "partial";
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
var ExpenseStatus;
(function (ExpenseStatus) {
    ExpenseStatus["PENDING"] = "pending";
    ExpenseStatus["ADMIN_APPROVED"] = "admin_approved";
    ExpenseStatus["APPROVED"] = "approved";
    ExpenseStatus["REJECTED"] = "rejected";
})(ExpenseStatus || (exports.ExpenseStatus = ExpenseStatus = {}));
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
    PaymentType["REVENUE"] = "revenue";
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
var WorkCategory;
(function (WorkCategory) {
    WorkCategory["CIVIL"] = "civil";
    WorkCategory["ELECTRICAL"] = "electrical";
    WorkCategory["PLUMBING"] = "plumbing";
    WorkCategory["PAINTING"] = "painting";
    WorkCategory["HVAC"] = "hvac";
    WorkCategory["FIRE_FIGHTING"] = "fire_fighting";
    WorkCategory["INTERIOR"] = "interior";
    WorkCategory["LANDSCAPING"] = "landscaping";
    WorkCategory["OTHER"] = "other";
})(WorkCategory || (exports.WorkCategory = WorkCategory = {}));
//# sourceMappingURL=enums.js.map