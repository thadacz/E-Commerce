package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.hada.ecommerce.shop.domain.Product;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(String name);
    List<Product> findByCategoryId(Long categoryId);

    @Query(value = "SELECT * FROM product p WHERE to_tsvector(p.name || ' ' || p.description) @@ to_tsquery(:query)",
            nativeQuery = true)
    List<Product> fullTextSearch(@Param("query") String query);

}
