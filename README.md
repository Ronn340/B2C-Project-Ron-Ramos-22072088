# Clothing Brand B2C Store
 
A full-stack Business-to-Consumer clothing store application built as part of COMP3036 Full Stack Web Development at Western Sydney University.
 
**Live Demo:** https://b2-c-project-ron-ramos-22072088-web.vercel.app

**Student:** Ron Ramos (22072088)
 
---

## Features
- **User Authentication:** Secure login/registration for users and admins _w/ OAuth Google, Auth.js, and Prisma Adapaters_
- **Shopping Cart:** Allow users to add/remove products and view the cart before checkout.
- **Payment Integration:** Integrate a mock or real payment gateway. _w/ Stripe_
- **Purchase History:** Display a user’s past purchases with details (e.g., date, items, total).
- **Product Filtering/Search:** Enable filtering by category and searching by product name.
- ~~**Admin Dashboard:** Provide a UI for admins to manage products and view purchase records.~~

---
## Tech Stack
- **Frontend:** JavaScript framework _w/ React_
- **Backend:** Server-side framework _w/ Node.js_
- **Database:** Databases 1 for production & 1 for Git Actions _w/ Neon_
- **Deployment:** Public hosting platform _w/ Vercel_
- **Version Control:** Repository on Github

---
 
## Local Setup
 
### Prerequisites
 
- Node.js 20+
- pnpm 10+
### Installation
 
```bash
# Clone the repository
git clone https://github.com/Ronn340/B2C-Project-Ron-Ramos-22072088.git
cd B2C-Project-Ron-Ramos-22072088
 
# Install dependencies
pnpm install
```

### Environment Variables
 
Create `apps/web/.env` based on `.env.example`:
 
```env
DATABASE_URL="file:./dev.db"
E2E=true
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_URL="http://localhost:3001"
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
NEXTAUTH_SECRET=any-random-string
```
 
1. Stripe keys - obtainable by creating a stripe account at http://stripe.com/au
2. Google keys - obtainable by creating a web client at https://console.cloud.google.com/

Create `packages/db/.env`:
 
```env
DATABASE_URL="file:./dev.db"
```
**IMPORTANT!:** If you are proceeding to use locally set database _"file:.dev.db"_ please do the following:

At schema.prisma in packages/db/:
-  Set provider to "sqlite"
```
# From
datasource db {
  provider = "postgresql"
  url      = env(DATABASE_URL)
}
# To
datasource db {
  provider = "sqlite"
  url      = env(DATABASE_URL)
}
```

### Setup the database
```bash
# Navigate to the database folder
cd packages/db

# Push the database schema
pnpm prisma db push
pnpm prisma generate
```

### Run the App
```bash
# Run Command
turbo dev
```
- Populate the database by running /api/seed
e.g. https:/localhost:3001/api/seed




 
 
