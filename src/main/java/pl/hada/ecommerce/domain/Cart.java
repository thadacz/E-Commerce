package pl.hada.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  List<CartItem> cartItems;

  @ManyToOne
  @JoinColumn(name = "customer_id")
  @JsonBackReference
  private Customer customer;

  @OneToOne Order order;

  private Boolean isOrdered = false;

  private BigDecimal totalAmount;

  public Cart(List<CartItem> cartItems, Customer customer) {
    this.cartItems = cartItems;
    this.customer = customer;
  }
}
