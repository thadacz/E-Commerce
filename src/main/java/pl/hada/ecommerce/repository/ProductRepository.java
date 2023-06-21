package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.Product;import java.awt.print.Pageable;import java.math.BigDecimal;import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
   // List<Product> findAllByPrice(BigDecimal price, Pageable pageable);
}
