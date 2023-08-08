package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.shop.domain.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {}
