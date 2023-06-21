package pl.hada.ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hada.ecommerce.domain.Address;
import pl.hada.ecommerce.domain.Customer;
import pl.hada.ecommerce.service.CustomerService;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {
  private final CustomerService customerService;

  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }

  @PostMapping("/register")
  public ResponseEntity<Customer> register(@RequestBody Customer customer) {
    Customer newCustomer = customerService.register(customer);
    return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Customer> getCustomerById(@PathVariable("id") Long id) {
    Optional<Customer> customerOptional = customerService.getCustomerById(id);
    return customerOptional
        .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping("/{id}/address")
  public ResponseEntity<Void> addAddress(@PathVariable Long id, @RequestBody Address address) {
    customerService.addAddress(id, address);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
}
