package pl.hada.ecommerce.shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.hada.ecommerce.shop.domain.Product;



public interface ProductRepository extends JpaRepository<Product, Long> {

    public Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%" + " OR p.name LIKE %?1%" + " OR p.description LIKE %?1%")
    public Page<Product> search(String searchKey, Pageable pageable);
}
