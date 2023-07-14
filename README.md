# ecommerce

Endpointy do sprawdzenia funkcjonalnosci aplikacji:


KLIENT

1. Tworzenie użytkownika

POST http://localhost:8080/customer/register

{

"firstName": "John",

"lastName": "Doe",

"email": "john.doe@example.com"

}

2. Wyswietlenie danych uzytkownika po ID

GET http://localhost:8080/customer/1

3. Dodanie adresu wysylki do uzytkownika (aktualnie niewykorzystywane)

POST http://localhost:8080/customer/1/address

{
    "firstName": "Marcin",
    "lastName": "Malinowski",
    "companyName": "",
    "streetAddress": "Marokanska 2",
    "city": "Andrzejowo",
    "department": "Podkarpackie",
    "zip": "12-345",
    "phone": "543324124",
    "emailAddress": "malinowski@wp.pl"
}

PRODUKT

1. Wyświetlenie wszystkich produktów

GET http://localhost:8080/products

2. Utworzenie produktu

POST http://localhost:8080/products

{
    "name": "T-Shirt VLONE ASAP Rocky",
    "imageUrl": "rocky.jpg",
    "price": 69.99,
    "stock": 400,
    "size": "M",
    "color": "RED"
}

3. Zaktualizowanie istniejącego produktu

POST http://localhost:8080/products/1

{
    "name": "Hoodie VLONE Juice WRLD",
    "imageUrl": "juice.jpg",
    "price": 99.99,
    "stock": 300,
    "size": "L"
}

4. Wyświetlenie produktu po ID

GET http://localhost:8080/products/1

5. Usunięcie produktu po ID

DELETE http://localhost:8080/products/1


KOSZYK

1. Dodanie produktu do koszyka

POST http://localhost:8080/cart/1/add/1

2. Aktualizacja koszyka

PATCH http://localhost:8080/cart/1

[
    {
        "id": 1,
        "product": {
            "id": 1,
            "name": "Hoodie VLONE Juice WRLD",
            "imageUrl": "juice.jpg",
            "price": 99.99,
            "stock": 300,
            "size": "L",
            "color": "NO_COLOR"
        },
        "quantity": 30
    },
    {
        "id": 2,
        "product": {
            "id": 2,
            "name": "T-Shirt VLONE ASAP Rocky",
            "imageUrl": "rocky.jpg",
            "price": 69.99,
            "stock": 400,
            "size": "M",
            "color": "RED"
        },
        "quantity": 12
    }
]

3. Usuniecie produktu (całego wiersza z ilością) z koszyka

DELETE http://localhost:8080/cart/1/delete/1

4. Zwrócenie kwoty do zapłaty

GET http://localhost:8080/cart/1/totalAmount


ORDER

1. Złozenie zamówienia

POST http://localhost:8080/order/1

{
    "firstName": "Marcin",
    "lastName": "Malinowski",
    "companyName": "",
    "streetAddress": "Marokanska 2",
    "city": "Andrzejowo",
    "department": "Podkarpackie",
    "zip": "12-345",
    "phone": "543324124",
    "emailAddress": "malinowski@wp.pl"
}
