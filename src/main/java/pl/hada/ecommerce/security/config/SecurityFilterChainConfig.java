package pl.hada.ecommerce.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import pl.hada.ecommerce.domain.Role;
import pl.hada.ecommerce.jwt.JWTAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;
import static pl.hada.ecommerce.domain.Role.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityFilterChainConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationEntryPoint authenticationEntryPoint;

  /*  public SecurityFilterChainConfig(AuthenticationProvider authenticationProvider,
                                     JWTAuthenticationFilter jwtAuthenticationFilter,
                                     @Qualifier("delegatedAuthEntryPoint") AuthenticationEntryPoint authenticationEntryPoint) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
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
                                        "/api/products/**",
                                        "/api/products"
                                ).hasAnyAuthority(USER.name())
                                .requestMatchers("/api/test/admin").hasAnyAuthority(USER.name())
                                .requestMatchers("/api/test/mod").hasAnyAuthority(USER.name())
                                .requestMatchers("/api/test/home/**").permitAll()
                                .requestMatchers("/api/test/all/**").permitAll()
                                .requestMatchers("/api/test/home").permitAll()
                                .requestMatchers("/api/test/all").permitAll()
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/users",
                                        "/api/auth/login"
                                ).permitAll()
                                .requestMatchers(HttpMethod.GET, "/actuator/**").permitAll()
                                .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authenticationProvider(authenticationProvider)
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //.formLogin(withDefaults())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
              //  .exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
        return http.build();
    }

}
