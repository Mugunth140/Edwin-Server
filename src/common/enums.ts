export enum Role {
  ADMIN = 'admin',
  ACCOUNTS_MANAGER = 'accounts_manager',
  SITE_ENGINEER = 'site_engineer',
  VIEWER = 'viewer',
}

export enum WorkOrderStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  APPROVED = 'approved',
}

export enum PurchaseOrderStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  APPROVED = 'approved',
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELAYED = 'delayed',
}

export enum SnagStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum RfiStatus {
  OPEN = 'open',
  RESPONDED = 'responded',
  CLOSED = 'closed',
}

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum DrawingCategory {
  STRUCTURAL = 'structural',
  AS_BUILT = 'as_built',
  GENERAL_ARRANGEMENT = 'general_arrangement',
  ARCHITECTURAL = 'architectural',
  HVAC = 'hvac',
  MEP = 'mep',
}

export enum ExpenseCategory {
  STAFF = 'staff',
  OFFICE = 'office',
  TRANSPORT = 'transport',
  TRAVEL = 'travel',
}

export enum PaymentType {
  MATERIAL = 'material',
  LABOUR = 'labour',
  RENT = 'rent',
  ACCOMMODATION = 'accommodation',
  OFFICE_MAINTENANCE = 'office_maintenance',
}

export enum AdvanceEntityType {
  VENDOR = 'vendor',
  CUSTOMER = 'customer',
  EMPLOYEE = 'employee',
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
}
