package pl.hada.ecommerce.shop.dto;

import pl.hada.ecommerce.shop.domain.Address;
import pl.hada.ecommerce.shop.domain.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderReportDTO(
        Long id,
        String customerFirstName,
        String customerLastName,
        String customerEmail,
        List<ProductReportDTO> products,
        Address deliveryAddress,
        OrderStatus orderStatus,
        LocalDateTime date,
        BigDecimal orderTotalAmount
) {
}
