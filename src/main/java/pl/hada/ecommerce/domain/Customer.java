package pl.hada.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String firstName;
  private String lastName;
  private String email;

  @OneToMany List<Address> addresses;

  @JsonManagedReference
  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  private List<Cart> carts = new ArrayList<>();

  @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Order> orders;
}
