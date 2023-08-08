package pl.hada.ecommerce.shop.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.hada.ecommerce.user.User;

import java.math.BigDecimal;
import java.util.List;

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
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private User user;

  @OneToOne Order order;

  private Boolean isOrdered = false;

  private BigDecimal totalAmount;

  public Cart(List<CartItem> cartItems, User user) {
    this.cartItems = cartItems;
    this.user = user;
  }
}
