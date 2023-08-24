package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.hada.ecommerce.shop.model.OrderRating;

@Repository
public interface OrderRatingRepository extends JpaRepository<OrderRating, Long> {
}
