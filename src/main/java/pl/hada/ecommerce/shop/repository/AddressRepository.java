package pl.hada.ecommerce.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.hada.ecommerce.shop.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {}
