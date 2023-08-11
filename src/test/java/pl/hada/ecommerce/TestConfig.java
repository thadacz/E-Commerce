package pl.hada.ecommerce;

import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import pl.hada.ecommerce.jwt.JWTUtil;
import pl.hada.ecommerce.shop.service.CartService;
import pl.hada.ecommerce.shop.service.ProductService;
import pl.hada.ecommerce.user.UserService;

@TestConfiguration
public class TestConfig {

    @Bean
    public CartService cartService() {
        return Mockito.mock(CartService.class);
    }

    @Bean
    public ProductService productService() {
        return Mockito.mock(ProductService.class);
    }

    @Bean
    public UserService userService() {
        return Mockito.mock(UserService.class);
    }

    @Bean
    public JWTUtil jwtUtil() {
        return Mockito.mock(JWTUtil.class);
    }
}
