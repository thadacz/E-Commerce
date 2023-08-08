package pl.hada.ecommerce.payment;

import lombok.Getter;

@Getter
public class Payment {
    private String token;
    private Double amount;
}
