package pl.hada.ecommerce.service;

import jakarta.persistence.EntityNotFoundException;import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.domain.Address;import pl.hada.ecommerce.domain.Cart;
import pl.hada.ecommerce.domain.Customer;
import pl.hada.ecommerce.repository.AddressRepository;import pl.hada.ecommerce.repository.CartRepository;import pl.hada.ecommerce.repository.CustomerRepository;import java.util.Collections;import java.util.List;import java.util.Optional;import java.util.Set;

@Service
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final CartRepository cartRepository;

  private final AddressRepository addressRepository;

  public CustomerService(
      CustomerRepository customerRepository,
      CartRepository cartRepository,
      AddressRepository addressRepository) {
    this.customerRepository = customerRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;
  }

  @Transactional
  public Customer register(Customer customer) {
    Customer newCustomer = customerRepository.save(customer);

    Cart newCart = new Cart(Collections.emptyList(), newCustomer);
    Cart savedCart = cartRepository.save(newCart);
    newCustomer.getCarts().add(savedCart);
    customerRepository.save(newCustomer);

    return newCustomer;
  }

  @Transactional
  public void addAddress(Long customerId, Address address){
    Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
    Address newAddress = addressRepository.save(address);
    if (optionalCustomer.isPresent()){
      Customer customer = optionalCustomer.get();
      List<Address> addresses = customer.getAddresses();
      addresses.add(newAddress);
      customer.setAddresses(addresses);
      customerRepository.save(customer);
    } else {
      throw new EntityNotFoundException("Not found customer with id "+ customerId);
    }
  }


  public Optional<Customer> getCustomerById(Long id) {
    return customerRepository.findById(id);
  }

}
