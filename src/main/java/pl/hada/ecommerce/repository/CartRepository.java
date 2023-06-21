package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findCartByCustomer_IdAndIsOrderedFalse(Long customerId);
    Cart findCartByCustomer_Email(String email);
}
