package pl.hada.ecommerce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.hada.ecommerce.jwt.JWTAuthenticationFilter;

import static pl.hada.ecommerce.user.Role.ADMIN;
import static pl.hada.ecommerce.user.Role.USER;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityFilterChainConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products/**",
                                        "/api/categories/**"
                                ).permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products/**",
                                        "/api/categories/**",
                                        "/api/order/**",
                                        "/api/order-ratings/**",
                                        "/api/cart/**",
                                        "/api/users/**"
                                ).hasAnyAuthority(ADMIN.name(), USER.name())
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/order/**",
                                        "/api/order-ratings/**",
                                        "/api/cart/**"
                                ).hasAnyAuthority(ADMIN.name(), USER.name())
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products/**",
                                        "/api/categories/**",
                                        "/api/order/**",
                                        "/api/order-ratings/**",
                                        "/api/cart/**",
                                        "/api/users/**"
                                ).hasAuthority(ADMIN.name())
                                .requestMatchers(
                                        "/checkout-data",
                                        "/charge",
                                        "/api/payment/**"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/auth/**"
                                ).permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/actuator/**","/swagger-ui/**",
                                        "/swagger-resources/*",
                                        "/v3/api-docs/**"
                                ).permitAll()
                                .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authenticationProvider(authenticationProvider)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
