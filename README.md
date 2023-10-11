# E-commerce Application

## Project Description

The e-commerce application is a comprehensive system designed to facilitate online product sales and purchases. It incorporates various features and role-based functionalities to cater to different users, including guests, regular users, and administrators. Below is an overview of the key features:

### User Roles

- **Guest:** Visitors can register.
- **User:** Registered users can shop for products and place orders.
- **Administrator:** Admins have full control over the system, including managing products, categories, and viewing sales statistics.

### User Registration and Email Verification

- Guests can register with the application, and email verification is required for account activation.

### Secure Authentication

- Both users and administrators can securely log in using JWT tokens for authentication.

### Product Management

- Users and administrators can view available products in the system.
- Adding and removing products from the shopping cart is available for both users and administrators.

### Order Management

- Users and administrators can place orders, specifying the delivery address.
- Customer address management supports multiple delivery addresses.

### Payment Processing

- Payments are handled securely using the Stripe API.

### Administrator Privileges

- Administrators can add, edit, and delete products within the system.
- They can also manage product categories, including adding, editing, and deleting categories.

### Category Management

- Users and administrators can browse products by category.
- Administrators can add, edit, and delete product categories.

### Sales Statistics

- Administrators have access to sales statistics, including the ability to select a time range for analysis.

### Order Rating

- Users and administrators can rate orders to provide feedback and enhance the user experience.

## Technologies Used

- **Backend:**
    - Java 17
    - Spring Boot 3.1
    - Postgresql
    - Azure Blob Storage (for storing product images)

- **Frontend:**
    - React 18
    - Bootstrap (for creating the user interface)

- **Authentication:**
    - JWT Tokens

- **Payments:**
    - Stripe (for online payment processing)

- **Hosting:**
    - Azure (the application was hosted on the Azure platform)
