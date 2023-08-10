package pl.hada.ecommerce.shop.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.shop.domain.*;
import pl.hada.ecommerce.shop.repository.*;
import pl.hada.ecommerce.user.User;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final CartRepository cartRepository;
  private final AddressRepository addressRepository;
  private final UserShopRepository userShopRepository;
  private final ProductRepository productRepository;


  public OrderService(
          OrderRepository orderRepository,
          CartRepository cartRepository,
          AddressRepository addressRepository,
          UserShopRepository userShopRepository, ProductRepository productRepository) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;
    this.userShopRepository = userShopRepository;
    this.productRepository = productRepository;
  }
  public Optional<Order> findMaxIdOrderForUser(Long userId) {
    return orderRepository.findMaxIdOrderForUser(userId);
  }

@Transactional
public Order createOrderFromCart(Long customerId, Address address) throws Exception {

  Address newAddress = addressRepository.save(address);
  Cart cart = cartRepository.findCartByUser_IdAndIsOrderedFalse(customerId);
  User user = userShopRepository.findById(customerId).get();
  List<Address> addresses = user.getAddresses();
  addresses.add(newAddress);
  user.setAddresses(addresses);
  userShopRepository.save(user);
  Order order = orderRepository.save(new Order());
  order.setAddress(address);
  order.setCart(cart);
  order.setUser(user);
  order.setStatus(OrderStatus.CREATED);
  Order savedOrder = orderRepository.save(order);
  cart.setIsOrdered(true);
  cart.setOrder(order);
  cartRepository.save(cart);
  Cart newCart = new Cart(Collections.emptyList(), user);
  cartRepository.save(newCart);

  // Update Product Stock
  for (CartItem cartItem : cart.getCartItems()) {
    Product product = cartItem.getProduct();
    Integer quantityOrdered = cartItem.getQuantity();

    if (product.getStock() >= quantityOrdered) {
      product.setStock(product.getStock() - quantityOrdered);
      productRepository.save(product);
    } else {
      throw new Exception("Insufficient stock for product: " + product.getName());
    }
  }


  return savedOrder;
}

  public boolean completeOrder(Long userId) {
    Order order = orderRepository.findMaxIdOrderForUser(userId).orElse(null);
    if (order != null && order.getStatus() != OrderStatus.COMPLETED) {
      order.setStatus(OrderStatus.COMPLETED);
      orderRepository.save(order);
      return true;
    }
    return false;
  }

  public Order findOrderByUserId(Long userId) {
    return orderRepository.findOrderByUserId(userId);
  }

  public List<OrderReportDTO> generateOrderReports(Long userId) {
    Optional<Order> completedOrders = orderRepository.findMaxIdOrderForUser(userId);
    return completedOrders.stream()
            .map(this::mapToOrderReportDTO)
            .collect(Collectors.toList());
  }

  private OrderReportDTO mapToOrderReportDTO(Order order) {
    List<ProductReportDTO> productReportDTOList = order.getCart().getCartItems().stream()
            .map(item -> new ProductReportDTO(item.getProduct().getName(), item.getQuantity(), item.getProduct().getPrice()))
            .collect(Collectors.toList());

    BigDecimal orderTotalAmount = productReportDTOList.stream()
            .map(productReportDTO -> productReportDTO.price().multiply(BigDecimal.valueOf(productReportDTO.quantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

    return new OrderReportDTO(
            order.getUser().getFirstName(),
            order.getUser().getLastName(),
            order.getUser().getEmail(),
            productReportDTOList,
            order.getAddress(),
            order.getStatus(),
            orderTotalAmount
    );
  }
}



