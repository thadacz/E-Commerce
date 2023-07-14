package pl.hada.ecommerce.security.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import pl.hada.ecommerce.registration.UserService;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecurityConfig {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

   /* @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests( requests ->
                        requests
                                .requestMatchers(toH2Console()).permitAll()
                                .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.ignoringRequestMatchers(toH2Console()));
               *//* .formLogin(form -> form
                        .loginPage("/elo/login"))
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .logout(AbstractHttpConfigurer::disable)
                .anonymous(AbstractHttpConfigurer::disable)
                .httpBasic(withDefaults());*//*
        return http.build();
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/registration/**")).permitAll()
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).permitAll()
                                .requestMatchers(AntPathRequestMatcher.antMatcher("/api/**")).permitAll()
                               // .requestMatchers(AntPathRequestMatcher.antMatcher("/login/**")).permitAll()
                                .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions().disable())
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(withDefaults());
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }
}
