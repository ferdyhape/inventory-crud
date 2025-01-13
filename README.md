# Inventory CRUD API

## Description

This project is a simple CRUD API for managing inventory items. It is built with Node.js, Express, Prisma ORM, and PostgreSQL.

## Related Feature Templates

1. JWT Authentication
2. Prisma ORM (Migration, Client)
3. Middleware Implementation
4. Request Body Validation
5. File Structure Organization
6. Uploading Files

## How to Use

1. Clone this repository
2. Copy `.env.example` to `.env` and update the values
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Customize the project to fit your needs

## Note About This Project

### Init Prisma

1. `npx prisma init` to create prisma folder and prisma schema
2. `npx prisma migrate dev --name init` to create migration
3. `npx prisma generate` to generate prisma client
4. If you update the schema, run `npx prisma migrate dev --name <name>` and `npx prisma generate`

# API Documentation

| **No** | **URL**                | **Method** | **Function**                                           |
| ------ | ---------------------- | ---------- | ------------------------------------------------------ |
| 1      | `/users/register`      | POST       | Register a new user.                                   |
| 2      | `/users/login`         | POST       | Login a user and obtain a token.                       |
| 3      | `/users/my-profile`    | GET        | Retrieve the authenticated user's profile.             |
| 4      | `/products`            | GET        | Retrieve all products.                                 |
| 5      | `/products/:id`        | GET        | Retrieve product details by ID.                        |
| 6      | `/products`            | POST       | Create a new product with file upload for the photo.   |
| 7      | `/products/update/:id` | POST       | Update a product by ID with file upload for the photo. |
| 8      | `/products/:id`        | DELETE     | Delete a product by ID.                                |
| 9      | `/products/price`      | POST       | Add a new price for a product.                         |
| 10     | `/products/:id/stock`  | PUT        | Update the stock of a product by ID.                   |
| 11     | `/products/stock`      | POST       | Add new stock for a product.                           |
| 12     | `/products/price/date` | GET        | Retrieve product prices by date.                       |
| 13     | `/products/stock/date` | GET        | Retrieve product stock by date.                        |
| 14     | `/uploads/:path-file`  | GET        | Access the product image.                              |
