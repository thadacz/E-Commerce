package pl.hada.ecommerce.security;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.hada.ecommerce.jwt.JWTAuthenticationFilter;
import pl.hada.ecommerce.user.Role;

import java.util.List;

import static pl.hada.ecommerce.user.Role.ADMIN;
import static pl.hada.ecommerce.user.Role.USER;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityFilterChainConfig {

    @Autowired
    private Gson gson;
    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;

   /* @Bean
    public InMemoryUserDetailsManager userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder.encode("password"))
                .roles("USER")
                .build();

        UserDetails admin = User.withUsername("admin@example.com")
                .password(passwordEncoder.encode("admin"))
                .roles(USER.name(),Role.ADMIN.name())
                .authorities(List.of(new SimpleGrantedAuthority(Role.ADMIN.name()),new SimpleGrantedAuthority(USER.name())))
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(
                                        "/api/auth/register"
                                ).permitAll()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/auth/register/**"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/products",
                                        "/api/products/**"
                                ).hasAnyAuthority(USER.name(), ADMIN.name())
                                .requestMatchers(
                                        "/api/cart",
                                        "/api/cart/**"
                                ).hasAnyAuthority(ADMIN.name(), USER.name())
                                .requestMatchers("/api/test/admin").hasAnyAuthority(USER.name())
                                .requestMatchers("/api/test/mod").hasAnyAuthority(USER.name())
                                .requestMatchers("/api/test/home/**").permitAll()
                                .requestMatchers("/api/test/all/**").permitAll()
                                .requestMatchers("/api/test/home").permitAll()
                                .requestMatchers("/api/test/all").permitAll()
                                .requestMatchers("/charge").permitAll()
                                .requestMatchers("/checkout-data").permitAll()
                                .requestMatchers("/api/payment").permitAll()
                                .requestMatchers("/api/payment/**").permitAll()
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/users",
                                        "/api/auth/login"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/payment",
                                        "/api/payment/**"
                                ).permitAll()
                                .requestMatchers("/api/order",
                                        "/api/order/**"
                                ).hasAnyAuthority(ADMIN.name(), USER.name())
                                .requestMatchers(HttpMethod.GET, "/actuator/**").permitAll()
                                .requestMatchers("/swagger-ui/**",
                                        "/swagger-resources/*",
                                        "/v3/api-docs/**")
                                .permitAll()
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
