package pl.hada.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.domain.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {}
