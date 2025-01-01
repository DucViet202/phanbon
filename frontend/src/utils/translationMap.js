export const actionTranslations = {
    manage: "Quản lý",
    read: "Xem",
    create: "Tạo",
    delete: "Xóa",
    update: "Cập nhật",
    block: "Chặn",
    approve: "Phê duyệt"
  };
  
export const subjectTranslations = {
    all: "Tất cả",
    admin: "Quản trị viên",
    product: "Sản phẩm",
    category: "Danh mục",
    warehouse: "Kho hàng",
    supplier: "Nhà cung cấp",
    purchaseInvoice: "Hóa đơn mua hàng",
    history: "Lịch sử",
    approvePurchaseInvoice: "Phê duyệt hóa đơn mua hàng",
    payable: "Khoản phải trả",
    receivable: "Khoản phải thu",
    salesinvoice: "Hóa đơn bán hàng",
    user: "Người dùng",
    "revenue-report": "Báo cáo doanh thu"
  };
  
export function translatePermission(action, subject) {
    const translatedAction = actionTranslations[action] || action;
    const translatedSubject = subjectTranslations[subject] || subject;
    return `${translatedAction} ${translatedSubject}`;
  }