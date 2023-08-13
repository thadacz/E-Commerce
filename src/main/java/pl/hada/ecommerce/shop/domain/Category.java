package pl.hada.ecommerce.shop.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(
            //cascade = CascadeType.ALL,
            mappedBy = "category"
            //,orphanRemoval = true
             )
    private List<Product> products;

    public Category(String name) {
        this.name = name;
    }
}
