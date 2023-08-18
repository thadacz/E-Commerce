package pl.hada.ecommerce.shop.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.exeption.InsufficientStockException;
import pl.hada.ecommerce.shop.domain.*;
import pl.hada.ecommerce.shop.repository.*;
import pl.hada.ecommerce.user.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

  private final OrderRepository orderRepository;
  private final CartRepository cartRepository;
  private final AddressRepository addressRepository;
  private final UserShopRepository userShopRepository;
  private final ProductRepository productRepository;
  private final CartItemRepository cartItemRepository;


  public OrderService(
          OrderRepository orderRepository,
          CartRepository cartRepository,
          AddressRepository addressRepository,
          UserShopRepository userShopRepository, ProductRepository productRepository, CartItemRepository cartItemRepository) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.addressRepository = addressRepository;
    this.userShopRepository = userShopRepository;
    this.productRepository = productRepository;
    this.cartItemRepository = cartItemRepository;
  }
  public Optional<Order> findMaxIdOrderForUser(Long userId) {
    return orderRepository.findMaxIdOrderForUser(userId);
  }

@Transactional
public Order createOrderFromCart(Long customerId, Address address) {

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
  order.setExecutionDate(LocalDateTime.now());
  Order savedOrder = orderRepository.save(order);
  cart.setIsOrdered(true);
  cart.setOrder(order);
  cartRepository.save(cart);
  Cart newCart = new Cart(Collections.emptyList(), user);
  cartRepository.save(newCart);

  // Update Product Stock
  /*for (CartItem cartItem : cart.getCartItems()) {
    Product product = cartItem.getProduct();
    Integer quantityOrdered = cartItem.getQuantity();

    if (product.getStock() >= quantityOrdered) {
      product.setStock(product.getStock() - quantityOrdered);
      productRepository.save(product);
    } else {
      throw new InsufficientStockException(product.getName());
    }
  }*/


  return savedOrder;
}

/*  public boolean completeOrder(Long userId) {
    Order order = orderRepository.findMaxIdOrderForUser(userId).orElse(null);
    if (order != null && order.getStatus() != OrderStatus.COMPLETED) {
      order.setStatus(OrderStatus.COMPLETED);
      order.setExecutionDate(LocalDateTime.now());
      orderRepository.save(order);
      return true;
    }
    return false;
  }*/
@Transactional
public boolean completeOrder(Long userId) {
  Order order = orderRepository.findMaxIdOrderForUser(userId).orElse(null);

  if (order != null && order.getStatus() != OrderStatus.COMPLETED) {
    List<CartItem> cartItems = order.getCart().getCartItems();

    for (CartItem cartItem : cartItems) {
      Product product = cartItem.getProduct();
      Integer quantityOrdered = cartItem.getQuantity();

      if (product.getStock() >= quantityOrdered) {
        product.setStock(product.getStock() - quantityOrdered);
        productRepository.save(product);

        // Update stock for all cart items with the same product
        List<CartItem> cartItemsWithSameProduct = cartItemRepository.findByProduct(product);
        for (CartItem item : cartItemsWithSameProduct) {
          item.setStock(product.getStock());
          cartItemRepository.save(item);
        }
      } else {
        throw new InsufficientStockException(product.getName());
      }
    }

    order.setStatus(OrderStatus.COMPLETED);
    order.setExecutionDate(LocalDateTime.now());
    orderRepository.save(order);
    return true;
  }

  return false;
}



  public Order findOrderByUserId(Long userId) {
    return orderRepository.findOrderByUserId(userId);
  }


  public Order findOrderById(Long orderId) {
    return orderRepository.findOrderById(orderId);
  }

  public  List<OrderReportDTO> generateOrdersHistory(Long userId){
    List<Order> completedOrders = orderRepository.findByUser_Id(userId);

    return completedOrders.stream()
            .map(this::mapToOrderReportDTO)
            .collect(Collectors.toList());
  }

  public List<OrderReportDTO> generateOrderReports(Long userId) {
    Optional<Order> completedOrders = orderRepository.findMaxIdOrderForUser(userId);
    return completedOrders.stream()
            .map(this::mapToOrderReportDTO)
            .collect(Collectors.toList());
  }

  private OrderReportDTO mapToOrderReportDTO(Order order) {
    List<ProductReportDTO> productReportDTOList = order.getCart().getCartItems().stream()
            .map(item -> new ProductReportDTO(item.getProduct().getName(), item.getQuantity(), item.getProduct().getPrice(), item.getStock()))
            .collect(Collectors.toList());

    BigDecimal orderTotalAmount = productReportDTOList.stream()
            .map(productReportDTO -> productReportDTO.price().multiply(BigDecimal.valueOf(productReportDTO.quantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

    return new OrderReportDTO(
            order.getId(),
            order.getUser().getFirstName(),
            order.getUser().getLastName(),
            order.getUser().getEmail(),
            productReportDTOList,
            order.getAddress(),
            order.getStatus(),
            order.getExecutionDate(),
            orderTotalAmount
    );
  }

  public List<ProductSalesReportDTO> generateProductSalesReport(LocalDateTime startDate, LocalDateTime endDate) {
    List<Order> completedOrders;

    if (startDate != null && endDate != null) {
      completedOrders = orderRepository.findByStatusAndExecutionDateBetween(OrderStatus.COMPLETED, startDate, endDate);
    } else {
      completedOrders = orderRepository.findByStatus(OrderStatus.COMPLETED);
    }

    Map<String, ProductSalesReportDTO> productSalesMap = new HashMap<>();

    for (Order order : completedOrders) {
      for (CartItem cartItem : order.getCart().getCartItems()) {
        String productName = cartItem.getProduct().getName();
        int quantitySold = cartItem.getQuantity();
        BigDecimal productPrice = cartItem.getProduct().getPrice();

        ProductSalesReportDTO productSalesReportDTO = productSalesMap.getOrDefault(productName,
                new ProductSalesReportDTO(productName, 0, BigDecimal.ZERO));

        int updatedQuantity = productSalesReportDTO.getTotalQuantitySold() + quantitySold;
        BigDecimal updatedRevenue = productSalesReportDTO.getTotalRevenue()
                .add(productPrice.multiply(BigDecimal.valueOf(quantitySold)));

        productSalesReportDTO.setTotalQuantitySold(updatedQuantity);
        productSalesReportDTO.setTotalRevenue(updatedRevenue);

        productSalesMap.put(productName, productSalesReportDTO);
      }
    }

    return new ArrayList<>(productSalesMap.values());
  }
}
