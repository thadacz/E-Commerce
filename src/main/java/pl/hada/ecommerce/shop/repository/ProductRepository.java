package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.shop.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
