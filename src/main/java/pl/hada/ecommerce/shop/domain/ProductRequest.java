package pl.hada.ecommerce.shop.domain;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record ProductRequest(String name,
                             String description,
                             MultipartFile image,
                             BigDecimal price,
                             Integer stock) {
}
