package pl.hada.ecommerce.shop.service;

import jakarta.persistence.EntityNotFoundException;import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.shop.domain.Address;
import pl.hada.ecommerce.user.User;
import pl.hada.ecommerce.shop.repository.AddressRepository;import pl.hada.ecommerce.shop.repository.CartRepository;import pl.hada.ecommerce.shop.repository.UserShopRepository;

import java.util.List;import java.util.Optional;

@Service
public class UserShopService {

  private final UserShopRepository userShopRepository;
  private final CartRepository cartRepository;

  private final AddressRepository addressRepository;

  public UserShopService(
      UserShopRepository userShopRepository,
      CartRepository cartRepository,
      AddressRepository addressRepository) {
    this.userShopRepository = userShopRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;
  }

  @Transactional
  public void addAddress(Long customerId, Address address){
    Optional<User> optionalCustomer = userShopRepository.findById(customerId);
    Address newAddress = addressRepository.save(address);
    if (optionalCustomer.isPresent()){
      User user = optionalCustomer.get();
      List<Address> addresses = user.getAddresses();
      addresses.add(newAddress);
      user.setAddresses(addresses);
      userShopRepository.save(user);
    } else {
      throw new EntityNotFoundException("Not found customer with id "+ customerId);
    }
  }


  public Optional<User> getUserById(Long id) {
    return userShopRepository.findById(id);
  }

    public List<User> getAllUsers() {
    return  userShopRepository.findAll();
    }
}
