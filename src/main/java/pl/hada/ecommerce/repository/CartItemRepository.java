package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {}
