package pl.hada.ecommerce.auth;

import pl.hada.ecommerce.registration.UserDTO;

public record AuthenticationResponse (
        String token,
        UserDTO userDTO){
}
