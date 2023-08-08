package pl.hada.ecommerce.shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.hada.ecommerce.shop.domain.Product;
import pl.hada.ecommerce.shop.service.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public ResponseEntity<List<Product>> getAllProducts() {
    List<Product> products = productService.getAllProducts();
    return new ResponseEntity<>(products, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
    Optional<Product> productOptional = productService.getProductById(id);
    return productOptional
        .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    Product createdProduct = productService.createProduct(product);
    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Product> updateProduct(
      @PathVariable("id") Long id, @RequestBody Product updatedProduct) {
    Product updated = productService.updateProduct(id, updatedProduct);
    if (updated != null) {
      return new ResponseEntity<>(updated, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
    productService.deleteProduct(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
