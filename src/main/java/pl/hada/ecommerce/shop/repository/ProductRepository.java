package pl.hada.ecommerce.shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.hada.ecommerce.shop.domain.Product;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%" + " OR p.name LIKE %?1%" + " OR p.description LIKE %?1%")
    public Page<Product> search(String searchKey, Pageable pageable);
}
