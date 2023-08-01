package pl.hada.ecommerce.service;

import jakarta.persistence.EntityNotFoundException;import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.domain.Address;import pl.hada.ecommerce.domain.Cart;
import pl.hada.ecommerce.registration.User;
import pl.hada.ecommerce.repository.AddressRepository;import pl.hada.ecommerce.repository.CartRepository;import pl.hada.ecommerce.repository.UserDetailsRepository;import java.util.Collections;import java.util.List;import java.util.Optional;

@Service
public class UserDetailsService {

  private final UserDetailsRepository userDetailsRepository;
  private final CartRepository cartRepository;

  private final AddressRepository addressRepository;

  public UserDetailsService(
      UserDetailsRepository userDetailsRepository,
      CartRepository cartRepository,
      AddressRepository addressRepository) {
    this.userDetailsRepository = userDetailsRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;
  }

/*
  @Transactional
  public User register(User user) {
    User newUser = userDetailsRepository.save(user);

    Cart newCart = new Cart(Collections.emptyList(), newUser);
    Cart savedCart = cartRepository.save(newCart);
    newUser.getCarts().add(savedCart);
    userDetailsRepository.save(newUser);

    return newUser;
  }
*/

  @Transactional
  public void addAddress(Long customerId, Address address){
    Optional<User> optionalCustomer = userDetailsRepository.findById(customerId);
    Address newAddress = addressRepository.save(address);
    if (optionalCustomer.isPresent()){
      User user = optionalCustomer.get();
      List<Address> addresses = user.getAddresses();
      addresses.add(newAddress);
      user.setAddresses(addresses);
      userDetailsRepository.save(user);
    } else {
      throw new EntityNotFoundException("Not found customer with id "+ customerId);
    }
  }


  public Optional<User> getUserById(Long id) {
    return userDetailsRepository.findById(id);
  }

    public List<User> getAllUsers() {
    return  userDetailsRepository.findAll();
    }
}
