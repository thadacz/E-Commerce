package pl.hada.ecommerce.auth;

import pl.hada.ecommerce.user.UserDTO;

public record AuthenticationResponse (
        String token,
        UserDTO userDTO){
}
