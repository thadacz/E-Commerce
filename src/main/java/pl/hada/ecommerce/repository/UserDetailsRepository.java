package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.registration.User;

public interface UserDetailsRepository extends JpaRepository<User, Long> {}
