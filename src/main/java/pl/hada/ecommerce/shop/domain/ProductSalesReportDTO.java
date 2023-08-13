package pl.hada.ecommerce.shop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class ProductSalesReportDTO {
    private String productName;
    private Integer totalQuantitySold;
    private BigDecimal totalRevenue;
}
