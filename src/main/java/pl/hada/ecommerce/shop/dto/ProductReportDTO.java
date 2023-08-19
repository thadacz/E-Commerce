package pl.hada.ecommerce.shop.dto;

import java.math.BigDecimal;

public record ProductReportDTO(
        String productName,
        int quantity,
        BigDecimal price,
        int stock
) {}