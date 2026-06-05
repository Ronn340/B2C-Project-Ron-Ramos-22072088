# Clothing brand B2C Store - API Documentation

**Student ID:** 22072088
**Name:** Ron Raven D. Ramos
**Subject:** COMP3036 - Full Stack Development 
**Public URL:** "https://b2-c-project-ron-ramos-22072088-web.vercel.app"

## Authentication

All CRUD Operations are protected via session-tokens provided by AUTHJS and OAUTH by Google.

## API Endpoints

### `POST /api/auth/[...nextauth]`

AUTHJS Handling of Google's Open Authorisation. Provides us the functions 'signIn', signOut, and getting current sessions via await auth().

**Provider:** Google OAuth 2.0
**Session storage:** Neon - PostgreSQL written via prisma adapter
**Cookie:** `authjs.session-token`

NOTE: Endpoints is managed internally and we only used it to call the signIn/Out and authorisations for other API endpoints.

**Summarised core logic:**
1. AuthJS sends out our .env googleClientID when redirecting to Google login
2. User signs in
3. Google sends a shortlived code to our {URL}/api/auth/callback/google for confirmation
4. AuthJS handles token exchange confirming with our .env googleSecret that it is us sending the user request
5. Google accepts and sends back the user's details to the website
6. Prisma Adapter saves in all user details w/ session records (Neon DB)

**Provide:** _AUTH_GOOGLE_ID_ + _AUTH_GOOGLE_SECRET_

**Sets:** 
```json
    Cookies: {
        __Host-authjs.csrf-token        - tampering security
        __Secure-authjs.callback-url    - success redirection
        __Secure-authjs.session-token   - session managing value
    }
```

### Cart Endpoints

#### `POST /api/cart`

Adding a cart record (if not created) and then add cartItem record (increment by 1 if not created).

**Authenticated:** Required

**Request body:** 
```json
{
    "productId": 6,
    "quantity": 1
}
```

**Parameters:**
- `productId` _number_ **required**
The product's unique ID to be added to cart
- `quantity` _number_ **required**
Number of units to add to cart

**Responses:**

- Status `200 OK`
Item added successfuly
- Status `401 Unauthorized`
User is not logged in

**200 Response:**
```json
{ "ok": true }
```

**401 Response:**
```json
{ "message": "Not logged in" }
```

#### `PATCH /api/cart`

Updating a cart item record by increments or decrements of 1.

**Authenticated**: Required

**Request body:**
```json
{
    "productId": 6,
    "action": "add"
}
```

**Parameters:**
- `productId` _number_ **required**
The product's unique ID to update qty
- `action` _string_ **required**
Type of update. must be _"add"_ or _"subtract"_

**Responses**
- Status `200 OK`
Item added successfuly
- Status `401 Unauthorized`
User is not logged in
- Status `404 Not Found`
Either Cart or CartItem was not found

**200 Response:**
```json
{"ok": true}
```

**401 Response:**
```json
{ "message": "Not logged in" }
```

**404 Response:**
```json
{"message": "Cart not found"}
```
or
```json
{"message": "Item not found in cart"}
```

#### `DELETE /api/cart`
Deleting a cart item (1 item)

**Authenticated:** Required

**Request body:**
```json
{
    "productId": 6,
}
```

**Parameters:**
- `productId` _number_ **required**
The product's unique ID to delete completely

**Responses:**
- Status `200 OK`
Item added successfuly
- Status `401 Unauthorized`
User is not logged in
- Status `404 Not Found`
Either Cart or CartItem was not found

**200 Response:**
```json
{"ok": true}
```

**401 Response:**
```json
{ "message": "Not logged in" }
```

**404 Response:**
```json
{"message": "Cart not found"}
```
or
```json
{"message": "Item not found in cart"}
```
### Checkout - `api/checkout`

#### `POST /api/checkout`
Getting a stripe session URL for mock payment

**Authenticated:** Not required

**Request body:**
```json
{
    "cartItems": [
        {"id": 1,
        "cartId": "collisionid-abc",
        "productId": 6,
        "quantity": 2,
        "product": {
            "id": 6,
            "name": "Long Black Coat",
            "price": 19.99,
            "imageUrl":  "https://images.unsplash.com/..."
            }
        }
    ]
}
```

**Parameters:**
- `cartItems` _cartItemWithProduct[]_ **required**
This is an array of cartItems with prisma include: product

**Responses:**
- Status `200 OK`
The Stripe session is created and URL is returned

**200 Response:**
```json
{
    "url": "https://checkout.stripe.com/c/pay/cs_test_b12acrO6AUpTjN5we0S5ByFxl20kZYZRpi4Y9cyeIa6DhJ2Zk9AmjMVKYr#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRRXGNGSzdKfVBqYXVpXTJWQXJHS19pN051SnRda2ZSdkFUYHJIZHBiUkl%2FZDxPS0MxPTFKQ2ZuZzNsMUphb2lSQFJtSWRjQEp3XFJrUDVPbnBicmJzM1I1NVVvYmMwTVxsJyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl"
}
```

**NOTE:**
- Success URL is set to `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
- Cancel URL is set back to `/cart`


### Order - `api/order`

#### `POST /api/order`
Adding the order to the purchase history record of the user after successfully paying via stripe payment. At the same time, clearing the cart inventory

**Authenticated:** Required

**Request body:**
```json
{
    "stripeSessionId": "cs_test_b12acrO6AUpTjN5we0S5ByFxl20kZYZRpi4Y9cyeIa6DhJ2Zk9AmjMVKYr"
}
```

**Parameters:**
- `stripeSessionId` _string_ **required**
The sessionId from the redirect URL

**NOTE:** 
- a _stripeSessionId_ can be checked if it is paid by retrieving `session.payment.status == "paid"`

**Responses:**
- Status `200 OK`
Order successfuly saved to history
- Status `401 Unauthorized`
User is not logged in
- Status `404 Not Found`
Cart was not found
- Status `400 Logic Error`
Payment incomplete OR invalid stripe sessionId OR session order already exists OR cart is empty

**Responses:**

**200 Response:**
```json
{
    "order": {
        "id": "cuid123cwx"
        "userId": "totallyRealUser",
        "stripeSessionId": "cs_test_abcIdefinitelyPaidabcdefghijklmnop",
        "totalAmount": 150.50,
        "createdAt": "2024-06-04T10:00:00.000Z",
        "items": [
            {
            "id": "orderItemcuidcwx"
            "productId": 6,
            "quantity": 10,
            "priceAtPurchase": 29.99,
            "name": "Tech Cargo Pants"
            }
        ]
    }
}
```

**400 Response:**
```json
{ "message": "Payment not completed" }
{ "message": "Invalid Stripe session ID" }
{ "message": "Order already exists for this session" }
{ "message": "Cart is empty" }
```

**401 Response:**
```json
{ "message": "Not logged in" }
```

**404 Response:**
```json
{"message": "Cart not found"}
```

### Seed - `api/seed`

#### `GET /api/seed`

Resets and populates the database to a clean start. Also checking if its in a test environment _E2E_ to run. Production blocks seed function.

**Authenticated:** Not Required 

**Responses:**
- Status `200 OK`
Database seeded successfully
- Status `501 Not implemented`
Blocked due to being a production environment

**200 Response**
```json
{ "message": "Seeded" }
```

***501 Response**
```json
{
"Not Available"
}
```

**NOTE:** Do **NOT** have 'E2E' variable in production or else it will let random users to reset clean database

## Data Models

### Product
```typescript
model Product {
  id          Int            @id @default(autoincrement())
  urlId       String         @unique
  name        String
  articleType String
  gender      String
  sizes       String //Comma separated string
  rating      Float //Static number
  imageUrl    String
  description String
  colour      String
  price       Float
  stock       Int            @default(0)
  active      Boolean        @default(true)
  createdAt   DateTime       @default(now())
  images      ProductImage[] //1-Product -> x_amount-images (images stored in another table)
  cartItems   CartItem[] //1-Product -> x_amount-cartItems (products can be in multiple carts)
  orderItems  OrderItem[] //1-Product -> x_amount-orderItems (products can be in multiple orders)
}
```
### CartItem
```typescript
model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  productId Int
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  cart    Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)

  @@unique([cartId, productId]) //Ensures one entry per product in the cart
}
```

### Order
```typescript
model Order {
  id              String   @id @default(cuid())
  userId          String
  totalAmount     Float
  status          String   @default("completed")
  stripeSessionId String   @unique  //ENSURE one order per stripe session - stop from refreshing call duplicate
  createdAt       DateTime @default(now())

  user  User        @relation(fields: [userId], references: [id])
  items OrderItem[]
}
```

### OrderItem
```typescript
model OrderItem {
  id              String @id @default(cuid())
  orderId         String
  productId       Int
  quantity        Int
  priceAtPurchase Float
  name            String

  order   Order   @relation(fields: [orderId], references: [id])
  product Product @relation(fields: [productId], references: [id])
}
```

## Environment Variables
```json
DATABASE_URL            - Neon Connection URL
STRIPE_SECRET_KEY       - Stripe mock payment secret key
NEXT_PUBLIC_URL         - Vercel Public URL
AUTH_GOOGLE_ID          - Created google cloud client ID
AUTH_GOOGLE_SECRET      - Created google cloud secret ID
AUTH_SECRET             - Encryption reference
E2E                     - Set to true if production otherwise delete
```
