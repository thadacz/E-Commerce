package pl.hada.ecommerce.shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.shop.model.OrderRating;
import pl.hada.ecommerce.shop.service.OrderRatingService;

import java.util.List;

@RestController
@RequestMapping("/api/order-ratings")
public class OrderRatingController {

    private final OrderRatingService orderRatingService;


    public OrderRatingController(OrderRatingService orderRatingService) {
        this.orderRatingService = orderRatingService;
    }

    @GetMapping
    public ResponseEntity<List<OrderRating>> getAllOrderRatings() {
        List<OrderRating> orderRatings = orderRatingService.getAllOrderRatings();
        return ResponseEntity.ok(orderRatings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderRating> getOrderRatingById(@PathVariable Long id) {
        OrderRating orderRating = orderRatingService.getOrderRatingById(id);
        return ResponseEntity.ok(orderRating);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<OrderRating> createOrderRating(@RequestBody OrderRating orderRating, @PathVariable Long userId) {
        OrderRating createdOrderRating = orderRatingService.createOrderRating(orderRating, userId);
        return ResponseEntity.ok(createdOrderRating);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderRating> updateOrderRating(@PathVariable Long id, @RequestBody OrderRating orderRating) {
        OrderRating updatedOrderRating = orderRatingService.updateOrderRating(id, orderRating);
        return ResponseEntity.ok(updatedOrderRating);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderRating(@PathVariable Long id) {
        orderRatingService.deleteOrderRating(id);
        return ResponseEntity.noContent().build();
    }
}
