package pl.hada.ecommerce.service;

import jakarta.transaction.Transactional;
import java.util.Collections;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.domain.*;
import pl.hada.ecommerce.repository.*;

@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final CartRepository cartRepository;
  private final AddressRepository addressRepository;


  private final CustomerRepository customerRepository;


  public OrderService(
      OrderRepository orderRepository,
      CartRepository cartRepository,
      AddressRepository addressRepository,
      CustomerRepository customerRepository) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;

    this.customerRepository = customerRepository;
}


@Transactional
public Order createOrderFromCart(Long customerId, Address address) {

  addressRepository.save(address);
  Cart cart = cartRepository.findCartByCustomer_IdAndIsOrderedFalse(customerId);
  Customer customer = customerRepository.findById(customerId).get();
  Order order = orderRepository.save(new Order());
  order.setAddress(address);
  order.setCart(cart);
  order.setCustomer(customer);
  Order savedOrder = orderRepository.save(order);
  cart.setIsOrdered(true);
  cart.setOrder(order);
  cartRepository.save(cart);
  Cart newCart = new Cart(Collections.emptyList(), customer);
  cartRepository.save(newCart);
  return savedOrder;
}

}
