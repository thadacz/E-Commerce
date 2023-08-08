package pl.hada.ecommerce.shop.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String firstName;
  private String lastName;
  @Nullable private String companyName;
  private String streetAddress; // house number and street name
  // Apartament, suite, unit ,etc. (optional)
  private String city;
  private String department;
  private String zip;
  @Nullable private String phone;
  private String emailAddress;

  @Override
  public String toString() {
    return streetAddress + ", " + city + ", " + department + ", " + zip;
  }
}
