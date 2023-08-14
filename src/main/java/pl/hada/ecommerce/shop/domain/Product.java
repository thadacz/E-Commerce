package pl.hada.ecommerce.shop.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank private String name;
  //@NotBlank
  private String imageUrl;
    private String description;

  @DecimalMin(value = "0.0", inclusive = false)
  // @Digits(integer = 5, fraction = 2)
  private BigDecimal price;

  @NotNull private Integer stock;
  @JoinColumn(name = "category_id")
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonBackReference
  private Category category;


  public Product(String name,
                 String description,
                 String imageUrl,
                 Category category,
                 BigDecimal price, Integer stock) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.stock = stock;
  }
}
