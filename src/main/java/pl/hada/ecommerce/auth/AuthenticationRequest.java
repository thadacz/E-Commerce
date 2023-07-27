package pl.hada.ecommerce.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
