package pl.hada.ecommerce.shop.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.shop.domain.*;
import pl.hada.ecommerce.shop.dto.OrderReportDTO;
import pl.hada.ecommerce.shop.dto.ProductSalesReportDTO;
import pl.hada.ecommerce.shop.service.OrderService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping("/{customerId}")
  public ResponseEntity<Order> createOrder(
          @RequestBody Address address, @PathVariable Long customerId) {
    Order newOrder = orderService.createOrderFromCart(customerId, address);
    return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
  }

  @GetMapping("/{userId}/last-order-total-amount")
  public ResponseEntity<BigDecimal> getLastOrderTotalAmount(@PathVariable Long userId) {
    BigDecimal totalAmount = orderService.findMaxIdOrderForUser(userId).get().getCart().getTotalAmount();
    return ResponseEntity.ok(totalAmount);
  }

  @GetMapping("/total-amount/{orderId}")
  public ResponseEntity<BigDecimal> getLastOrderTotalAmountByOrderId(@PathVariable Long orderId) {
    BigDecimal totalAmount = orderService.findOrderById(orderId).getCart().getTotalAmount();
    return ResponseEntity.ok(totalAmount);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<Order> getOrderForUser(@PathVariable Long userId) {
    Order order = orderService.findOrderByUserId(userId);
    return ResponseEntity.ok(order);
  }

  @GetMapping("/{userId}/history")
  public ResponseEntity<List<OrderReportDTO>> orderHistory(@PathVariable Long userId){
    List<OrderReportDTO> history = orderService.generateOrdersHistory(userId);
    return ResponseEntity.ok(history);
  }

  @GetMapping("/{userId}/report")
  public ResponseEntity<List<OrderReportDTO>> generateOrderReport(@PathVariable Long userId) {
    List<OrderReportDTO> orderReports = orderService.generateOrderReports(userId);
    return ResponseEntity.ok(orderReports);
  }

  @PutMapping("/{userId}/complete")
  public ResponseEntity<String> completeOrder(@PathVariable Long userId) {
    boolean success = orderService.completeOrder(userId);
    if (success) {
      return ResponseEntity.ok("Order marked as completed.");
    } else {
      return ResponseEntity.badRequest().body("Failed to complete order.");
    }
  }

  @GetMapping("/product-sales")
  public ResponseEntity<List<ProductSalesReportDTO>> getProductSalesReport(
          @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
          @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

    List<ProductSalesReportDTO> salesReport = orderService.generateProductSalesReport(startDate, endDate);

    return ResponseEntity.ok(salesReport);
  }

}
