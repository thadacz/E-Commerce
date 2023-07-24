package pl.hada.ecommerce.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.registration.UserRepository;

import java.util.List;

@Service
public class PaymentService {

    private static final List<Currency> ACCEPTED_CURRENCIES = List.of(Currency.USD, Currency.GBP);

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final CardPaymentCharger cardPaymentCharger;

    //@Autowired
    public PaymentService(UserRepository userRepository,
                          PaymentRepository paymentRepository,
                          CardPaymentCharger cardPaymentCharger) {
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
        this.cardPaymentCharger = cardPaymentCharger;
    }

    void chargeCard(Long customerId, PaymentRequest paymentRequest) {
        // 1. Does customer exists if not throw
        boolean isCustomerFound = userRepository.findById(customerId).isPresent();
        if (!isCustomerFound) {
            throw new IllegalStateException(String.format("Customer with id [%s] not found", customerId));
        }

        // 2. Do we support the currency if not throw
        boolean isCurrencySupported = ACCEPTED_CURRENCIES.contains(paymentRequest.payment().getCurrency());

        if (!isCurrencySupported) {
            String message = String.format(
                    "Currency [%s] not supported",
                    paymentRequest.payment().getCurrency());
            throw new IllegalStateException(message);
        }

        // 3. Charge card
        CardPaymentCharge cardPaymentCharge = cardPaymentCharger.chargeCard(
                paymentRequest.payment().getSource(),
                paymentRequest.payment().getAmount(),
                paymentRequest.payment().getCurrency(),
                paymentRequest.payment().getDescription()
        );

        // 4. If not debited throw
        if (!cardPaymentCharge.isCardDebited()) {
            throw new IllegalStateException(String.format("Card not debited for customer %s", customerId));
        }

        // 5. Insert payment
        paymentRequest.payment().setCustomerId(customerId);

        paymentRepository.save(paymentRequest.payment());

        // 6. TODO: send email
    }
}