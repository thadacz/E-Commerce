package pl.hada.ecommerce.shop.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.hada.ecommerce.azure.AzureBlobStorageService;
import pl.hada.ecommerce.exeption.ResourceNotFoundException;
import pl.hada.ecommerce.shop.domain.Product;
import pl.hada.ecommerce.shop.request.ProductRequest;
import pl.hada.ecommerce.shop.repository.ProductRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final AzureBlobStorageService blobStorageService;

    public ProductService(ProductRepository productRepository, AzureBlobStorageService blobStorageService) {
        this.productRepository = productRepository;
        this.blobStorageService = blobStorageService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(ProductRequest productRequest) throws IOException {
        MultipartFile image = productRequest.image();
        String imageUrl = blobStorageService.uploadImage(image, image.getOriginalFilename());
        Product product = new Product();
        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setCategory(productRequest.category());
        product.setImageUrl(imageUrl);
        product.setPrice(productRequest.price());
        product.setStock(productRequest.stock());

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequest productRequest) throws IOException {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            MultipartFile newImage = productRequest.image();
            if (newImage != null && !newImage.isEmpty()) {
                String newImageUrl = blobStorageService.uploadImage(newImage, newImage.getOriginalFilename());
                existingProduct.setImageUrl(newImageUrl);
            }
            existingProduct.setName(productRequest.name());
            existingProduct.setDescription(productRequest.description());
            existingProduct.setCategory(productRequest.category());
            existingProduct.setPrice(productRequest.price());
            existingProduct.setStock(productRequest.stock());

            return productRepository.save(existingProduct);
        } else {
            throw new ResourceNotFoundException("Product", "id", id);
        }
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> findByNameContaining(String name) {
        return productRepository.findByNameContaining(name);
    }
}
