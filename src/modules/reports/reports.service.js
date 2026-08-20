const buildRange = (query = {}) => ({
  fromDate: query.fromDate || null,
  toDate: query.toDate || null,
});

const buildReport = (type, query = {}) => ({
  reportType: type,
  filters: buildRange(query),
  generatedAt: new Date().toISOString(),
  summary: {
    total: 0,
    items: [],
  },
});

class ReportsService {
  getDashboardReport(query) {
    return buildReport("dashboard", query);
  }

  getSalesReport(query) {
    return buildReport("sales", query);
  }

  getPurchaseReport(query) {
    return buildReport("purchases", query);
  }

  getInventoryReport(query) {
    return buildReport("inventory", query);
  }

  getStockMovementReport(query) {
    return buildReport("stock-movement", query);
  }

  getPaymentReport(query) {
    return buildReport("payments", query);
  }

  getOrderReport(query) {
    return buildReport("orders", query);
  }
}

export default new ReportsService();
