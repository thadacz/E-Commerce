package pl.hada.ecommerce.init;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.hada.ecommerce.shop.domain.Cart;
import pl.hada.ecommerce.shop.domain.Category;
import pl.hada.ecommerce.shop.domain.Order;
import pl.hada.ecommerce.shop.domain.Product;
import pl.hada.ecommerce.shop.repository.CartRepository;
import pl.hada.ecommerce.shop.repository.CategoryRepository;
import pl.hada.ecommerce.shop.repository.OrderRepository;
import pl.hada.ecommerce.shop.repository.ProductRepository;
import pl.hada.ecommerce.user.Role;
import pl.hada.ecommerce.user.User;
import pl.hada.ecommerce.user.UserRepository;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Component
public class DbInit {

    @Autowired
    private UserRepository userRepository;
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

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
        Category music = new Category("Music");
        categoryRepository.save(music);
        Category technology = new Category("Technology");
        categoryRepository.save(technology);
        Product mac = new Product("Mac Miller - K.I.D.S","It's Mac Miller's debutant album.","https://s21423.blob.core.windows.net/s21423/Mac_Miller_K.I.D.S._cover_art.jpg",music, new BigDecimal(20),5);
        Product rocky = new Product("A$AP Rocky - Testing","Rocky latest album","https://s21423.blob.core.windows.net/s21423/asap-rocky-testing.jpg",music, new BigDecimal(30),10);
        Product schoolboy = new Product("Schoolboy Q - OXYMORON","The cooolest Schoolboy Q album.","https://s21423.blob.core.windows.net/s21423/ScHoolboy-q-oxymoron.jpg",music, new BigDecimal(10),20);
        productRepository.saveAll(List.of(mac,rocky,schoolboy));
    }
}
