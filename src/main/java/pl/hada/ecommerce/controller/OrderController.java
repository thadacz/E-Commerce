package pl.hada.ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.domain.Address;
import pl.hada.ecommerce.domain.Order;
import pl.hada.ecommerce.service.OrderService;

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
}
