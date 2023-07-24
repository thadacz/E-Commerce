package pl.hada.ecommerce.payment.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.net.RequestOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import pl.hada.ecommerce.payment.CardPaymentCharge;
import pl.hada.ecommerce.payment.CardPaymentCharger;
import pl.hada.ecommerce.payment.Currency;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@ConditionalOnProperty(
        value = "stripe.enabled",
        havingValue = "true"
)
public class StripeService implements CardPaymentCharger {

    private final StripeApi stripeApi;

    private final static RequestOptions requestOptions = RequestOptions.builder()
            .setApiKey("sk_test_51NWHBKLvtQQG09MJrohc4YUTK2eYb0HHTR1OXr59C1tgrl1xt0FYDgQlXDxAod121P3361DIZJ0CCmvuxisu0Qu900O6EqJk8b")
            .build();

    @Autowired
    public StripeService(StripeApi stripeApi) {
        this.stripeApi = stripeApi;
    }

    @Override
    public CardPaymentCharge chargeCard(String cardSource,
                                        BigDecimal amount,
                                        Currency currency,
                                        String description) {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency);
        params.put("source", cardSource);
        params.put("description", description);

        try {
            Charge charge = stripeApi.create(params, requestOptions);
            return new CardPaymentCharge(charge.getPaid());
        } catch (StripeException e) {
            throw new IllegalStateException("Cannot make stripe charge", e);
        }

    }
}
