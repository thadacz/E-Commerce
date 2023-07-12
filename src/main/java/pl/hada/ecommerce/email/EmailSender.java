package pl.hada.ecommerce.email;

public interface EmailSender {
    void send(String to, String email);
}
