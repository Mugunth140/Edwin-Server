"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatus = exports.AdvanceEntityType = exports.PaymentType = exports.ExpenseCategory = exports.DrawingCategory = exports.SeverityLevel = exports.RfiStatus = exports.SnagStatus = exports.MilestoneStatus = exports.InvoiceStatus = exports.PurchaseOrderStatus = exports.WorkOrderStatus = exports.Role = void 0;
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
    PurchaseOrderStatus["SENT"] = "sent";
    PurchaseOrderStatus["APPROVED"] = "approved";
})(PurchaseOrderStatus || (exports.PurchaseOrderStatus = PurchaseOrderStatus = {}));
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