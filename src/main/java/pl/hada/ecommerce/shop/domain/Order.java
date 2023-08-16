package pl.hada.ecommerce.shop.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.hada.ecommerce.user.Role;
import pl.hada.ecommerce.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToOne @JsonIgnore Cart cart;

  @ManyToOne
  @JoinColumn(name = "customer_id")
  @JsonBackReference
  private User user;

  @OneToOne private Address address;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  private LocalDateTime executionDate;
}
