package pl.hada.ecommerce.shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.shop.model.Address;
import pl.hada.ecommerce.shop.service.UserShopService;
import pl.hada.ecommerce.user.User;

import java.util.ArrayList;
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
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String email) {
        try {
            List<User> users = new ArrayList<>();
            if (email == null) {
                users.addAll(userShopService.getAllUsers());
            } else {
                users.addAll(userShopService.findByEmailContaining(email));
            }
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userShopService.createUser(user);
    }

    @PatchMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userShopService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userShopService.deleteUser(id);
    }
}
