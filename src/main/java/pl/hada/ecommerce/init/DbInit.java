package pl.hada.ecommerce.init;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.hada.ecommerce.shop.domain.Cart;
import pl.hada.ecommerce.shop.repository.CartRepository;
import pl.hada.ecommerce.user.Role;
import pl.hada.ecommerce.user.User;
import pl.hada.ecommerce.user.UserRepository;

import java.util.Collections;

@Component
public class DbInit {

    @Autowired
    private UserRepository userRepository;
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private CartRepository cartRepository;

    @PostConstruct
    private void postConstruct() {

        String encodedPassword = new BCryptPasswordEncoder().encode("password");

        User admin = new User("admin","admin","admin@test.com", encodedPassword , Role.ADMIN,false,true);
        User normalUser = new User("user","user","user@test.com", encodedPassword , Role.USER,false,true);
        userRepository.save(admin);
        userRepository.save(normalUser);
        Cart adminCart = new Cart(Collections.emptyList(), admin);
        cartRepository.save(adminCart);
        Cart userCart = new Cart(Collections.emptyList(), normalUser);
        cartRepository.save(userCart);
    }
}
