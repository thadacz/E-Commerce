package pl.hada.ecommerce.shop.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank private String name;
 // @NotBlank private String imageUrl;

  @DecimalMin(value = "0.0", inclusive = false)
  // @Digits(integer = 5, fraction = 2)
  private BigDecimal price;

  @NotNull private Integer stock;

/*  @Column(columnDefinition = "varchar(255) default 'ONE SIZE'")
  @Enumerated(EnumType.STRING)
  private Size size = Size.ONE_SIZE;*/

/*  @Column(columnDefinition = "varchar(255) default 'NO COLOR'")
  @Enumerated(EnumType.STRING)
  private Color color = Color.NO_COLOR;*/

  // TODO: Drop time

/*  public Product(
      String name, String imageUrl, BigDecimal price,
      //Size size, Color color,
      Integer stock) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
   // this.size = size;
  //  this.color = color;
    this.stock = stock;
  }*/

  public Product(String name,
                // String imageUrl,
                 BigDecimal price, Integer stock) {
    this.name = name;
   // this.imageUrl = imageUrl;
    this.price = price;
    this.stock = stock;
  }
}
