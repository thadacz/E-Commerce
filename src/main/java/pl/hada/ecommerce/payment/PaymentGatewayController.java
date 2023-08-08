package pl.hada.ecommerce.payment;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private final StripeClient stripeClient;

    PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

  /*  @PostMapping("/charge")
    public Charge chargeCard(@RequestHeader(value="stripetoken") String token, @RequestHeader(value="amount") Double amount) throws Exception {
        return this.stripeClient.chargeNewCard(token, amount);
    }*/
  @PostMapping("/charge")
  public String chargeCard(@RequestBody Payment payment) throws Exception {
      String token = payment.getToken();
      Double amount = payment.getAmount();

      return this.stripeClient.chargeNewCard(token, amount).toJson();
  }
}