package pl.hada.ecommerce.registration;

public record RegistrationRequest(
        String firstName,
        String lastName,
        String email,
        String password) {
}
