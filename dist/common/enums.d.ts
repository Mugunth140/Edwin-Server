export declare enum Role {
    ADMIN = "admin",
    ACCOUNTS_MANAGER = "accounts_manager",
    SITE_ENGINEER = "site_engineer",
    VIEWER = "viewer"
}
export declare enum WorkOrderStatus {
    DRAFT = "draft",
    SENT = "sent",
    APPROVED = "approved"
}
export declare enum PurchaseOrderStatus {
    DRAFT = "draft",
    ISSUED = "issued",
    PARTIALLY_RECEIVED = "partially_received",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum BillStatus {
    UNPAID = "unpaid",
    PARTIAL = "partial",
    PAID = "paid"
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
export declare enum PaymentType {
    MATERIAL = "material",
    LABOUR = "labour",
    RENT = "rent",
    ACCOMMODATION = "accommodation",
    OFFICE_MAINTENANCE = "office_maintenance",
    STAFF_EXPENSE = "staff_expense",
    TRAVEL = "travel",
    TRANSPORT = "transport"
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
