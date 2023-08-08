package pl.hada.ecommerce.shop.service;

import org.springframework.stereotype.Service;
import pl.hada.ecommerce.shop.domain.Product;
import pl.hada.ecommerce.shop.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService{
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Optional<Product> existingProductOptional = productRepository.findById(id);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setName(product.getName());
         //   existingProduct.setImageUrl(product.getImageUrl());
            existingProduct.setPrice(product.getPrice());
         //   existingProduct.setSize(product.getSize());
            existingProduct.setStock(product.getStock());
      //      existingProduct.setColor(product.getColor());
            return productRepository.save(existingProduct);
        } else {
            throw new IllegalArgumentException("Product not found with id: " + id);
        }
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
