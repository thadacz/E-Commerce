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
        userRepository.saveAll(List.of(admin,normalUser));
        Cart adminCart = new Cart(Collections.emptyList(), admin);
        Cart userCart = new Cart(Collections.emptyList(), normalUser);
        cartRepository.saveAll(List.of(userCart,adminCart));
        Category music = new Category("Music");
        Category tickets = new Category("Tickets");
        categoryRepository.saveAll(List.of(music,tickets));
        Product mac = new Product("Mac Miller - K.I.D.S","\"K.I.D.S\" is Mac Miller's youthful mixtape, capturing carefree spirit and coming-of-age vibes.","https://s21423.blob.core.windows.net/s21423/Mac_Miller_K.I.D.S._cover_art.jpg",music, new BigDecimal(20),5);
        Product rocky = new Product("A$AP Rocky - Testing","\"Testing\" by A$AP Rocky: genre-blending, boundary-pushing musical journey.","https://s21423.blob.core.windows.net/s21423/asap-rocky-testing.jpg",music, new BigDecimal(30),10);
        Product schoolboy = new Product("Schoolboy Q - OXYMORON","\"Oxymoron\" - Schoolboy Q's gritty, introspective portrayal of life's contradictions.","https://s21423.blob.core.windows.net/s21423/ScHoolboy-q-oxymoron.jpg",music, new BigDecimal(10),20);
        Product miami = new Product("Rolling Loud - Miami 2023", "Rolling Loud returns to Miami, Florida from July 21st-23rd, 2023. The premier hip-hop festival features mix of legendary rappers and MCs and up-and-comers alike.","https://s21423.blob.core.windows.net/s21423/Miami 2023.jpg",tickets,new BigDecimal("99.99"),500);
        Product california = new Product("Rolling Loud - California 2023","Rolling Loud California 2023 kicked off the spring festival season with a lineup of Hip-Hop and alternative music at Hollywood Park grounds, adjacent to SoFi Stadium in Inglewood, CA.","https://s21423.blob.core.windows.net/s21423/California 2023.jpg", tickets, new BigDecimal("89.99"),400);
        productRepository.saveAll(List.of(mac,rocky,schoolboy,miami,california));
    }
}
