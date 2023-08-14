package pl.hada.ecommerce.shop.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.hada.ecommerce.azure.AzureBlobStorageService;
//import pl.hada.ecommerce.azure.BlobStorageService;
//import pl.hada.ecommerce.exeption.ResourceNotFoundException;
import pl.hada.ecommerce.shop.domain.Product;
import pl.hada.ecommerce.shop.domain.ProductRequest;
import pl.hada.ecommerce.shop.repository.ProductRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService{
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

  /*  public Product createProduct(Product product) {
        Product createdProduct = productRepository.save(product);
        if (product.getImageUrl() != null && !product.getImageUrl().isEmpty()) {
            String imageUrl = blobStorageService.getImageUrl(product.getImageUrl());
            createdProduct.setImageUrl(imageUrl);
            productRepository.save(createdProduct);
        }
        return createdProduct;
    }*/

  /*  public Product updateProduct(Long id, Product product) {
        Optional<Product> existingProductOptional = productRepository.findById(id);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setCategory(product.getCategory());

            if (product.getImageUrl() != null && !product.getImageUrl().isEmpty()) {
                String imageUrl = blobStorageService.getImageUrl(product.getImageUrl());
                existingProduct.setImageUrl(imageUrl);
            }

            existingProduct.setPrice(product.getPrice());
            existingProduct.setStock(product.getStock());

            return productRepository.save(existingProduct);
        } else {
            throw new ResourceNotFoundException("Product", "id", id);
        }
    }*/
  public Product createProduct(ProductRequest productRequest) throws IOException {
      MultipartFile image = productRequest.image();
      String imageUrl = blobStorageService.uploadImage(image, image.getOriginalFilename());

      Product product = new Product();
      product.setName(productRequest.name());
      product.setDescription(productRequest.description());
      product.setImageUrl(imageUrl);
      product.setPrice(productRequest.price());
      product.setStock(productRequest.stock());

      return productRepository.save(product);
  }


    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> findByNameContaining(String name){
        return  productRepository.findByNameContaining(name);
    }
}
