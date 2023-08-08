package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.user.User;

public interface UserDetailsRepository extends JpaRepository<User, Long> {}
