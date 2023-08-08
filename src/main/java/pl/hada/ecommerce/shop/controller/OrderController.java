package pl.hada.ecommerce.shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.shop.domain.Address;
import pl.hada.ecommerce.shop.domain.Order;
import pl.hada.ecommerce.shop.service.OrderService;

import java.math.BigDecimal;

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

/*  @PutMapping("/complete")
  public ResponseEntity<Order> completeOrder() {
    Order completedOrder = orderService.markOrderAsCompleted();
    return new ResponseEntity<>(completedOrder, HttpStatus.OK);
  }*/


  @GetMapping("/{userId}/last-order-total-amount")
  public ResponseEntity<BigDecimal> getLastOrderTotalAmount(@PathVariable Long userId) {
    BigDecimal totalAmount = orderService.findOrderByUserId(userId).getCart().getTotalAmount();
    return ResponseEntity.ok(totalAmount);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<Order> getOrderForUser(@PathVariable Long userId) {
    Order order = orderService.findOrderByUserId(userId);
    return ResponseEntity.ok(order);
  }

}
