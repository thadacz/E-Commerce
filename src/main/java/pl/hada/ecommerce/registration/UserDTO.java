package pl.hada.ecommerce.registration;

import java.util.List;

public record UserDTO (
        Long id,
        String firstName,
        String lastName,
        String email,
        List<String> roles
) {
}
