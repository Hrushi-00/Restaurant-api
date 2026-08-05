$path = 'C:\Users\win 10\Downloads\projectplan2 (3).html'
$content = Get-Content -LiteralPath $path -Raw

$content = [regex]::Replace(
  $content,
  '<tr><td>Orders</td><td>POST /orders/create, GET /orders/list, GET /orders/details/:id, PUT /orders/update/:id, PATCH /orders/status/:id, PATCH /orders/payment/:id, DELETE /orders/delete/:id</td><td>1</td></tr>',
  '<tr><td>Orders</td><td>POST /orders, GET /orders, GET /orders/:id, PATCH /orders/:id/status, POST /orders/:id/cancel, GET /orders/my</td><td>1</td></tr>'
)

$content = [regex]::Replace(
  $content,
  '<tr><td>Payments</td><td>POST /payment/create-order, POST /payment/verify-payment, GET /payment/list, GET /payment/details/:id, POST /payment/refund/:id, DELETE /payment/delete/:id</td><td>1</td></tr>',
  '<tr><td>Payments</td><td>POST /payments/initiate, POST /payments/webhook, GET /payments/:id, POST /payments/:id/refund</td><td>1</td></tr>'
)

$content = $content.Replace('Customer builds cart client-side, submits order &rarr; <span class="inline-code">POST /orders/create</span>.', 'Customer builds cart client-side, submits order → <span class="inline-code">POST /orders</span>.')
$content = $content.Replace('Token is auto-generated the moment an order is placed (<span class="inline-code">POST /orders/create</span>, Section 8) &mdash; never chosen by staff, to avoid collisions during a rush.', 'Token is auto-generated the moment an order is placed (<span class="inline-code">POST /orders</span>, Section 8) — never chosen by staff, to avoid collisions during a rush.')
$content = $content.Replace('Place Order <em>(POST /orders/create)</em><br>', 'Place Order <em>(POST /orders)</em><br>')
$content = $content.Replace('Order reaches "ready for payment" &rarr; customer/cashier chooses Cash, UPI, or Razorpay.', 'Order reaches "ready for payment" â†’ customer/cashier chooses Cash, UPI, or Razorpay.')
$content = $content.Replace('For digital: API creates a Razorpay order via <span class="inline-code">POST /payment/create-order</span>, frontend opens the checkout, gateway returns a signed payment response.', 'For digital: API creates a Razorpay order, frontend opens the checkout, gateway returns a signed payment response.')
$content = $content.Replace('API verifies the signature server-side via <span class="inline-code">POST /payment/verify-payment</span>, marks the payment record and the order''s <span class="inline-code">paymentStatus</span> accordingly.', 'API verifies the signature server-side, marks the payment record and the order''s <span class="inline-code">paymentStatus</span> accordingly.')
$content = $content.Replace('On success, emits <span class="inline-code">payment.completed</span> &rarr; triggers invoice generation (Module 20.2 / Section 23.1 reconciliation entry).', 'On success, emits <span class="inline-code">payment.completed</span> â†’ triggers invoice generation (Module 20.2 / Section 23.1 reconciliation entry).')
$content = $content.Replace('<strong>PAID</strong> <em>(gateway signature verified, Section 9.2)</em><br>', '<strong>Success</strong> <em>(gateway signature verified, Section 9.2)</em><br>')
$content = $content.Replace('<strong>REFUNDED</strong> <em>(full or partial, only from PAID, Section 9.6)</em><br><br>', '<strong>Refund</strong> <em>(full or partial, only from Success, Section 9.6)</em><br><br>')
$content = $content.Replace('<em>FAILED</em> &mdash; reachable only from Pending, on gateway decline or signature-verification failure; never transitions onward.', '<em>Failed</em> â€” reachable only from Pending, on gateway decline or signature-verification failure; never transitions onward.')

Set-Content -LiteralPath $path -Value $content -Encoding utf8
