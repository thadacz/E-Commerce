package pl.hada.ecommerce.service;

import jakarta.transaction.Transactional;
import java.util.Collections;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.domain.*;
import pl.hada.ecommerce.registration.User;
import pl.hada.ecommerce.repository.*;

@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final CartRepository cartRepository;
  private final AddressRepository addressRepository;
  private final UserDetailsRepository userDetailsRepository;


  public OrderService(
      OrderRepository orderRepository,
      CartRepository cartRepository,
      AddressRepository addressRepository,
      UserDetailsRepository userDetailsRepository) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;

    this.userDetailsRepository = userDetailsRepository;
}


@Transactional
public Order createOrderFromCart(Long customerId, Address address) {

  addressRepository.save(address);
  Cart cart = cartRepository.findCartByUser_IdAndIsOrderedFalse(customerId);
  User user = userDetailsRepository.findById(customerId).get();
  Order order = orderRepository.save(new Order());
  order.setAddress(address);
  order.setCart(cart);
  order.setUser(user);
  Order savedOrder = orderRepository.save(order);
  cart.setIsOrdered(true);
  cart.setOrder(order);
  cartRepository.save(cart);
  Cart newCart = new Cart(Collections.emptyList(), user);
  cartRepository.save(newCart);

  return savedOrder;
}

}
