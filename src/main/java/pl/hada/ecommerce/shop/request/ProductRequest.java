package pl.hada.ecommerce.shop.request;

import org.springframework.web.multipart.MultipartFile;
import pl.hada.ecommerce.shop.model.Category;

import java.math.BigDecimal;

public record ProductRequest(String name,
                             String description,
                             MultipartFile image,
                             Category category,
                             BigDecimal price,
                             Integer stock) {
}
