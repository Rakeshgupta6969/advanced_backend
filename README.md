# Banking Ledger System

A backend banking application built using **Node.js, Express.js, MongoDB, and Mongoose** that implements a secure financial transaction system with authentication, account management, double-entry ledger architecture, and atomic transaction processing.

The system follows real-world banking principles where account balances are calculated from ledger entries instead of storing mutable balances directly.

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Secure protected routes using middleware
- Token blacklisting during logout
- System user authentication for internal banking operations


## 👤 User Management

- Create user accounts
- Secure password storage
- User profile management
- Multiple bank accounts associated with a single user


## 🏦 Account Management

- Create bank accounts
- Fetch all accounts of a specific user
- Support for system accounts
- Account status management:

```
ACTIVE
FROZEN
CLOSED
```

- Currency support for accounts


## 💰 Banking Transaction System

Implemented a transaction processing system with:

- Money transfer between accounts
- Transaction validation
- Account status verification
- Insufficient balance checking
- Transaction lifecycle management:

```
PENDING
   |
   ↓
COMPLETED

or

FAILED
   |
   ↓
REVERSED
```


## 📒 Double Entry Ledger System

The core of this project is a double-entry bookkeeping system.

Every transaction creates two ledger entries:

Example:

Transfer ₹5000 from Account A to Account B

### Debit Entry

```
Account A
Type: DEBIT
Amount: ₹5000
```

### Credit Entry

```
Account B
Type: CREDIT
Amount: ₹5000
```

This ensures financial consistency and provides a complete audit trail.


## 🧮 Ledger Based Balance Calculation

Account balances are not stored directly.

Balance is calculated dynamically from ledger entries:

```
Balance =
Total Credits - Total Debits
```

This prevents incorrect balance updates and follows real banking accounting principles.


## 🔄 Atomic Transaction Processing

Implemented MongoDB transactions using sessions.

A transaction performs:

```
Create Transaction Record
        |
        ↓
Create Debit Ledger Entry
        |
        ↓
Create Credit Ledger Entry
        |
        ↓
Update Transaction Status
        |
        ↓
Commit Transaction
```

If any operation fails:

```
Abort Transaction
Rollback Changes
```

This ensures data consistency.


## 🔁 Idempotent Transactions

Implemented idempotency handling using:

```
idemPotencyKey
```

Purpose:

- Prevent duplicate transactions
- Handle retry requests safely
- Protect against accidental multiple payments

Example:

```
Request 1:
idemPotencyKey = abc123
Transaction Created


Request 2:
idemPotencyKey = abc123
Existing Transaction Returned
```


## 📧 Email Notification System

Implemented email notifications for:

- Successful transactions
- Transaction details
- User notifications


---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose


## Authentication

- JWT
- bcrypt


## Database Concepts Used

- MongoDB Transactions
- Database Indexing
- Schema Validation
- References using ObjectId


## Other Technologies

- Nodemailer
- Cookie based authentication
- REST API Architecture


---

# 🏗️ System Architecture

```
                Client
                  |
                  |
             REST API
                  |
                  |
              Express.js
                  |
        ---------------------
        |                   |
 Authentication       Transaction Service
        |                   |
        |                   |
     User Model        Transaction Model
                            |
                            |
                    MongoDB Session
                            |
                            |
                    Ledger Collection
                            |
                            |
                 Balance Calculation
```


---

# 📂 Project Structure

```
src
│
├── controllers
|
|-- Database
|
├── models
│
├── routes
│
├── middleware
│
├── services
|
└── app.js
```


---

# ⚙️ Installation & Setup


## Clone Repository

```bash
git clone <repository-url>
```

Move into project:

```bash
cd Advanced_backend
```


## Install Dependencies

```bash
npm install
```


## Environment Variables

Create `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_secret_key

CLIENT_ID = your client id

CLIENT_SECRET : client secret for email service

REFRESH_TOKEN: from gmail service cloud

EMAIL_USER=your_email

```


## Start Development Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:3000
```


---

# 🔑 API Modules

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

POST   /api/auth/logout
```


## Account

```
POST   /api/accounts/createAccount

GET    /api/accounts/getAllAccounts

GET    /api/accounts/currBalance:accountId
```


## Transactions

```
POST    /api/transaction/makeTransaction

GET    /api/transaction/history
```


## Ledger

```
GET    /api/ledger/:accountId
```


---

# 🔒 Security Features

Implemented security measures:

- Password hashing
- JWT authentication
- Token expiration
- Token blacklist after logout
- Protected API routes
- Request validation
- MongoDB transactions for financial consistency


---

# 📈 Future Improvements

- Swagger/OpenAPI API documentation
- Transaction pagination
- Rate limiting
- Redis based token blacklist
- Audit logging system
- Transaction reversal workflow
- Docker containerization
- CI/CD deployment pipeline


---

# 👨‍💻 Author

**Rakesh Gupta**

Backend Developer | MERN Stack Developer

GitHub:
https://github.com/Rakeshgupta6969


LinkedIn:
https://www.linkedin.com/in/rakesh-gupta-3aa395292/


---

# ⭐ Project Highlights

This project demonstrates:

- Backend architecture design
- Financial data modeling
- Database transactions
- Double-entry accounting
- Concurrency handling
- Secure authentication
- Production-oriented API development