package pl.hada.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import lombok.*;
import pl.hada.ecommerce.registration.User;

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
