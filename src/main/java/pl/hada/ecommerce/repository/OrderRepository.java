package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {}
