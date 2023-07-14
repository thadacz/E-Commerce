package pl.hada.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.hada.ecommerce.registration.User;

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

  // TODO: Create createdAt, updatedAt, status, payment
}
