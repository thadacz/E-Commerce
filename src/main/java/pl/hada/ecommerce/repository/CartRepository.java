package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findCartByUser_IdAndIsOrderedFalse(Long userId);
    Cart findCartByUser_Email(String email);
}
