package pl.hada.ecommerce.shop.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class OrderRating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String comment;
    private String rating;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Order order;
}
