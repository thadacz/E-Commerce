package pl.hada.ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.domain.Address;
import pl.hada.ecommerce.registration.User;
import pl.hada.ecommerce.service.UserDetailsService;
import java.util.Optional;

@RestController
@RequestMapping("/userDetails")
public class UserDetailsController {
  private final UserDetailsService userDetailsService;

  public UserDetailsController(UserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

/*  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody User user) {
    User newUser = userDetailsService.register(user);
    return new ResponseEntity<>(newUser, HttpStatus.CREATED);
  }*/

  @GetMapping("/{id}")
  public ResponseEntity<User> getCustomerById(@PathVariable("id") Long id) {
    Optional<User> customerOptional = userDetailsService.getUserById(id);
    return customerOptional
        .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping("/{id}/address")
  public ResponseEntity<Void> addAddress(@PathVariable Long id, @RequestBody Address address) {
    userDetailsService.addAddress(id, address);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
}
