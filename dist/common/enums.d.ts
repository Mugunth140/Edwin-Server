export declare enum Role {
    ADMIN = "admin",
    ACCOUNTS_MANAGER = "accounts_manager",
    PURCHASE_TEAM = "purchase_team",
    SITE_ENGINEER = "site_engineer",
    VIEWER = "viewer"
}
export declare enum WorkOrderStatus {
    DRAFT = "draft",
    SENT = "sent",
    APPROVED = "approved"
}
export declare enum SubcontractWorkOrderStatus {
    PENDING = "pending",
    ADMIN_APPROVED = "admin_approved",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum PurchaseOrderStatus {
    DRAFT = "draft",
    SENT = "sent",
    PENDING = "pending",
    ADMIN_APPROVED = "admin_approved",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum BillStatus {
    PENDING = "pending",
    ADMIN_APPROVED = "admin_approved",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum PaymentMode {
    CASH = "cash",
    UPI = "upi",
    RTGS = "rtgs",
    CHEQUE = "cheque"
}
export declare enum InvoiceStatus {
    DRAFT = "draft",
    SENT = "sent",
    PARTIAL = "partial",
    PAID = "paid",
    OVERDUE = "overdue",
    CANCELLED = "cancelled"
}
export declare enum MilestoneStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    DELAYED = "delayed"
}
export declare enum SnagStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export declare enum RfiStatus {
    OPEN = "open",
    RESPONDED = "responded",
    CLOSED = "closed"
}
export declare enum SeverityLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum DrawingCategory {
    STRUCTURAL = "structural",
    AS_BUILT = "as_built",
    GENERAL_ARRANGEMENT = "general_arrangement",
    ARCHITECTURAL = "architectural",
    HVAC = "hvac",
    MEP = "mep"
}
export declare enum ExpenseCategory {
    STAFF = "staff",
    OFFICE = "office",
    TRANSPORT = "transport",
    TRAVEL = "travel"
}
export declare enum ExpenseStatus {
    PENDING = "pending",
    ADMIN_APPROVED = "admin_approved",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum PaymentType {
    MATERIAL = "material",
    LABOUR = "labour",
    RENT = "rent",
    ACCOMMODATION = "accommodation",
    OFFICE_MAINTENANCE = "office_maintenance",
    STAFF_EXPENSE = "staff_expense",
    TRAVEL = "travel",
    TRANSPORT = "transport",
    REVENUE = "revenue"
}
export declare enum AdvanceEntityType {
    VENDOR = "vendor",
    CUSTOMER = "customer",
    EMPLOYEE = "employee"
}
export declare enum ProjectStatus {
    PLANNING = "planning",
    IN_PROGRESS = "in_progress",
    ON_HOLD = "on_hold",
    COMPLETED = "completed"
}
export declare enum ProjectNature {
    BROWNFIELD = "brownfield",
    GREENFIELD = "greenfield"
}
export declare enum JobType {
    CONTRACTING = "contracting",
    DESIGN_BUILD = "design_build",
    DESIGN = "design"
}
export declare enum JobStatus {
    BIDDING = "bidding",
    AWARDED = "awarded"
}
export declare enum WorkCategory {
    CIVIL = "civil",
    ELECTRICAL = "electrical",
    PLUMBING = "plumbing",
    PAINTING = "painting",
    HVAC = "hvac",
    FIRE_FIGHTING = "fire_fighting",
    INTERIOR = "interior",
    LANDSCAPING = "landscaping",
    OTHER = "other"
}
