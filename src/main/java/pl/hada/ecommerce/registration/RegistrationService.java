package pl.hada.ecommerce.registration;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.hada.ecommerce.shop.domain.Cart;
import pl.hada.ecommerce.user.Role;
import pl.hada.ecommerce.email.EmailSender;
import pl.hada.ecommerce.registration.token.ConfirmationToken;
import pl.hada.ecommerce.registration.token.ConfirmationTokenService;
import pl.hada.ecommerce.shop.repository.CartRepository;
import pl.hada.ecommerce.user.User;
import pl.hada.ecommerce.user.UserRepository;
import pl.hada.ecommerce.user.UserService;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
public class RegistrationService {

    private final UserService userService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final CartRepository cartRepository;
    @Value("${host_not_secured}")
    private String HOST;

    public RegistrationService(UserService userService, EmailValidator emailValidator, ConfirmationTokenService confirmationTokenService, EmailSender emailSender, CartRepository cartRepository) {
        this.userService = userService;
        this.emailValidator = emailValidator;
        this.confirmationTokenService = confirmationTokenService;
        this.emailSender = emailSender;
        this.cartRepository = cartRepository;
    }

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator
                .test(request.email());
        if (!isValidEmail){
            throw new IllegalStateException("Email not valid");
        }
        String token = userService.singUpUser(
                new User(
                        request.firstName(),
                        request.lastName(),
                        request.email(),
                        request.password(),
                        Role.USER
                )
        );
        String link = HOST+"/api/auth/register/confirm?token=" + token;
        emailSender.send(
                request.email(),
                buildEmail(request.firstName(),link));
        return token;
    }
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(
                confirmationToken.getUser().getEmail());


        // Create cart for user
        Cart newCart = new Cart(Collections.emptyList(), confirmationToken.getUser());
        cartRepository.save(newCart);

        return "confirmed";
    }

    private String buildEmail(String name, String link) {
        return "Hi " + name + ",<br>"
                + "Thank you for registering. Please click on the below link to activate your account:<br>"
                + "<a href=" + link + ">Activate Now</a><br>"
                + "Link will expire in 24 hours.<br>"
                + "See you soon";
    }
}
