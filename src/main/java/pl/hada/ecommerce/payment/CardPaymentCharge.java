package pl.hada.ecommerce.payment;

public record CardPaymentCharge(boolean isCardDebited) {

    @Override
    public String toString() {
        return "CardPaymentCharge{" +
                "isCardDebited=" + isCardDebited +
                '}';
    }
}
