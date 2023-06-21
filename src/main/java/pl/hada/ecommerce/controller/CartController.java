package pl.hada.ecommerce.controller;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.domain.CartItem;
import pl.hada.ecommerce.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {
  private final CartService cartService;

  public CartController(CartService cartService) {
    this.cartService = cartService;
  }

  @GetMapping("/{customerId}/totalAmount")
  public BigDecimal getTotalAmount(@PathVariable Long customerId) {
    return cartService.getTotalAmount(customerId);
  }

  @GetMapping("/{customerId}")
  public ResponseEntity<List<CartItem>> getProductsFromCart(@PathVariable Long customerId) {
    List<CartItem> cartItems = cartService.getAllCartItemsByCart(customerId);
    return new ResponseEntity<>(cartItems, HttpStatus.OK);
  }

  @PostMapping("/{customerId}/add/{productId}")
  public ResponseEntity<List<CartItem>> addProductToCart(
      @PathVariable Long productId, @PathVariable Long customerId) {
    List<CartItem> cartItems = cartService.addProductToCart(productId, customerId);
    return new ResponseEntity<>(cartItems, HttpStatus.CREATED);
  }

  @PatchMapping("/{customerId}")
  public ResponseEntity<List<CartItem>> updateCart(
      @PathVariable Long customerId, @RequestBody List<CartItem> cartItems) {
    List<CartItem> updated = cartService.updateCart(customerId, cartItems);
    return new ResponseEntity<>(updated, HttpStatus.OK);
  }

  @DeleteMapping("/{customerId}/delete/{productId}")
  public ResponseEntity<List<CartItem>> removeProductFromCart(
      @PathVariable Long customerId, @PathVariable Long productId) {
    List<CartItem> updatedCart = cartService.removeProductFromCart(customerId, productId);
    return ResponseEntity.ok(updatedCart);
  }

  @DeleteMapping("/{customerId}/clear")
  public ResponseEntity<List<CartItem>> clearCart(@PathVariable Long customerId) {
    List<CartItem> updated = cartService.clearCart(customerId);
    return new ResponseEntity<>(updated, HttpStatus.OK);
  }
}
