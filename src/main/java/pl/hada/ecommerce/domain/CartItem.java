package pl.hada.ecommerce.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne private Product product;
  private Integer quantity;

  public CartItem(Product product, Integer quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}
