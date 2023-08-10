Przed uruchomieniem aplikacji użyj docker compose up do stworzenia bazy danych.

Do korzystania z zabezpieczonych Requestow HTTP (wszystkich poza logowaniem i rejestracją)
używaj w postman autoryzacji Bearer Tokena i wprowadź następujący token:
eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsiVVNFUiJdLCJzdWIiOiJvdG9taS5oZEBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNjkwODMwNjYzLCJleHAiOjE2OTIxMjY2NjN9.pZD5RigcxX64reat2Ib9bHsWRvwlmYesUAB4-aoKQBw

dla użytkownika:
otomi.hd@gmail.com
password

Przykładowe requesty:

Get All Products

GET http://localhost:8080/api/products

Create Product

POST http://localhost:8080/api/products
{
"name": "ASAP Rocky",
"price": 39.99,
"stock": 200
}

