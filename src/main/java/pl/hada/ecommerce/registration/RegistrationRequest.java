package pl.hada.ecommerce.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/*@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString*/
public record RegistrationRequest(
        String firstName,
        String lastName,
        String email,
        String password) {
}
