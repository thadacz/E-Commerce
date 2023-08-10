package pl.hada.ecommerce.shop.domain;

import java.math.BigDecimal;
import java.util.List;

public record OrderReportDTO(
        String customerFirstName,
        String customerLastName,
        String customerEmail,
        List<ProductReportDTO> products,
        Address deliveryAddress,
        OrderStatus orderStatus,
        BigDecimal orderTotalAmount
) {
}
