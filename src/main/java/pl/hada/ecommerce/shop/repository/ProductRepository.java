package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.hada.ecommerce.shop.model.Product;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT(:name, '%'))")
    List<Product> findByNameStartingWithIgnoreCase(@Param("name") String name);

    List<Product> findByCategoryId(Long categoryId);

    }


