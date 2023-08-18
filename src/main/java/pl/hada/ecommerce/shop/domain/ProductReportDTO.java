package pl.hada.ecommerce.shop.domain;

import java.math.BigDecimal;

public record ProductReportDTO(
        String productName,
        int quantity,
        BigDecimal price,
        int stock
) {}