package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {}
