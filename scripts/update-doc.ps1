$path = 'C:\Users\win 10\Downloads\projectplan2 (3).html'
$content = Get-Content -LiteralPath $path -Raw

$replacements = @(
  @{
    Old = @'
    <tr><td>Orders</td><td>POST /orders, GET /orders, GET /orders/:id, PATCH /orders/:id/status, POST /orders/:id/cancel, GET /orders/my</td><td>1</td></tr>
'@.Trim()
    New = @'
    <tr><td>Orders</td><td>POST /orders/create, GET /orders/list, GET /orders/details/:id, PUT /orders/update/:id, PATCH /orders/status/:id, PATCH /orders/payment/:id, DELETE /orders/delete/:id</td><td>1</td></tr>
'@.Trim()
  }
  @{
    Old = @'
    <tr><td>Payments</td><td>POST /payments/initiate, POST /payments/webhook, GET /payments/:id, POST /payments/:id/refund</td><td>1</td></tr>
'@.Trim()
    New = @'
    <tr><td>Payments</td><td>POST /payment/create-order, POST /payment/verify-payment, GET /payment/list, GET /payment/details/:id, POST /payment/refund/:id, DELETE /payment/delete/:id</td><td>1</td></tr>
'@.Trim()
  }
  @{
    Old = @'
      <li>Customer builds cart client-side, submits order → <span class="inline-code">POST /orders</span>.</li>
'@.Trim()
    New = @'
      <li>Customer builds cart client-side, submits order → <span class="inline-code">POST /orders/create</span>.</li>
'@.Trim()
  }
  @{
    Old = @'
      <li>Token is auto-generated the moment an order is placed (<span class="inline-code">POST /orders</span>, Section 8) — never chosen by staff, to avoid collisions during a rush.</li>
'@.Trim()
    New = @'
      <li>Token is auto-generated the moment an order is placed (<span class="inline-code">POST /orders/create</span>, Section 8) — never chosen by staff, to avoid collisions during a rush.</li>
'@.Trim()
  }
  @{
    Old = @'
    Place Order <em>(POST /orders)</em><br>
'@.Trim()
    New = @'
    Place Order <em>(POST /orders/create)</em><br>
'@.Trim()
  }
  @{
    Old = @'
      <li>Order reaches "ready for payment" â†’ customer/cashier chooses Cash, UPI, or Razorpay.</li>
'@.Trim()
    New = @'
      <li>Order reaches "ready for payment" → customer/cashier chooses Cash, UPI, or Razorpay.</li>
'@.Trim()
  }
  @{
    Old = @'
      <li>For digital: API creates a Razorpay order, frontend opens the checkout, gateway returns a signed payment response.</li>
'@.Trim()
    New = @'
      <li>For digital: API creates a Razorpay order via <span class="inline-code">POST /payment/create-order</span>, frontend opens the checkout, gateway returns a signed payment response.</li>
'@.Trim()
  }
  @{
    Old = @'
      <li>API verifies the signature server-side, marks the payment record and the order''s <span class="inline-code">paymentStatus</span> accordingly.</li>
'@.Trim()
    New = @'
      <li>API verifies the signature server-side via <span class="inline-code">POST /payment/verify-payment</span>, marks the payment record and the order''s <span class="inline-code">paymentStatus</span> accordingly.</li>
'@.Trim()
  }
  @{
    Old = @'
      <li>On success, emits <span class="inline-code">payment.completed</span> â†’ triggers invoice generation (Module 20.2 / Section 23.1 reconciliation entry).</li>
'@.Trim()
    New = @'
      <li>On success, emits <span class="inline-code">payment.completed</span> → triggers invoice generation (Module 20.2 / Section 23.1 reconciliation entry).</li>
'@.Trim()
  }
  @{
    Old = @'
    <strong>Success</strong> <em>(gateway signature verified, Section 9.2)</em><br>
'@.Trim()
    New = @'
    <strong>PAID</strong> <em>(gateway signature verified, Section 9.2)</em><br>
'@.Trim()
  }
  @{
    Old = @'
    <strong>Refund</strong> <em>(full or partial, only from Success, Section 9.6)</em><br><br>
'@.Trim()
    New = @'
    <strong>REFUNDED</strong> <em>(full or partial, only from PAID, Section 9.6)</em><br><br>
'@.Trim()
  }
  @{
    Old = @'
    <em>Failed</em> â€” reachable only from Pending, on gateway decline or signature-verification failure; never transitions onward.
'@.Trim()
    New = @'
    <em>FAILED</em> — reachable only from Pending, on gateway decline or signature-verification failure; never transitions onward.
'@.Trim()
  }
)

foreach ($pair in $replacements) {
  $content = $content.Replace($pair.Old, $pair.New)
}

$content = $content.Replace('â€”', '—')
$content = $content.Replace('â†’', '→')
$content = $content.Replace('â€“', '–')
$content = $content.Replace('Â·', '·')

Set-Content -LiteralPath $path -Value $content -Encoding utf8
