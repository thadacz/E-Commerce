package pl.hada.ecommerce.shop.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.shop.domain.Address;
import pl.hada.ecommerce.shop.domain.Cart;
import pl.hada.ecommerce.shop.domain.Order;
import pl.hada.ecommerce.shop.domain.OrderStatus;
import pl.hada.ecommerce.shop.repository.AddressRepository;
import pl.hada.ecommerce.shop.repository.CartRepository;
import pl.hada.ecommerce.shop.repository.OrderRepository;
import pl.hada.ecommerce.shop.repository.UserDetailsRepository;
import pl.hada.ecommerce.user.User;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

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
  public Optional<Order> findMaxIdOrderForUser(Long userId) {
    return orderRepository.findMaxIdOrderForUser(userId);
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
  order.setStatus(OrderStatus.CREATED);
  Order savedOrder = orderRepository.save(order);
  cart.setIsOrdered(true);
  cart.setOrder(order);
  cartRepository.save(cart);

  return savedOrder;
}

// TODO
 /* @Transactional
  public Order markOrderAsCompleted() {
    Order order = orderRepository.findMaxIdOrderForUser();
    if (order == null) {
      throw new IllegalArgumentException("No order has been created yet.");
    }

    order.setStatus(OrderStatus.COMPLETED);
    return orderRepository.save(order);
  }*/

  public Order findOrderByUserId(Long userId) {
    return orderRepository.findOrderByUserId(userId);
  }

}
