package pl.hada.ecommerce.shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.shop.domain.Address;
import pl.hada.ecommerce.shop.service.UserShopService;
import pl.hada.ecommerce.user.User;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserShopController {
  private final UserShopService userShopService;

  public UserShopController(UserShopService userShopService) {
    this.userShopService = userShopService;
  }

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers(){
    List<User> users = userShopService.getAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getCustomerById(@PathVariable("id") Long id) {
    Optional<User> customerOptional = userShopService.getUserById(id);
    return customerOptional
        .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping("/{id}/address")
  public ResponseEntity<Void> addAddress(@PathVariable Long id, @RequestBody Address address) {
    userShopService.addAddress(id, address);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
}
