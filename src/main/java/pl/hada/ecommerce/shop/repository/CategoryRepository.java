package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.shop.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
