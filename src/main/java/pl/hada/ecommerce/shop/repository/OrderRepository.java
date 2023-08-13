package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.hada.ecommerce.shop.domain.Order;
import pl.hada.ecommerce.shop.domain.OrderStatus;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.id = (SELECT MAX(o2.id) FROM Order o2 WHERE o2.user.id = :userId)")
    Optional<Order> findMaxIdOrderForUser(Long userId);
    Order findOrderByUserId(Long id);
    List<Order> findByStatus(OrderStatus orderStatus);
}
