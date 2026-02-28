# RentNest - Hostel Management System
**UI/UX Frontend Project & System Architecture**

## 1. Project Overview
This project contains the complete UI/UX HTML/CSS/JS template for the RentNest Hostel Management System. It's built with Vanilla HTML/CSS/JS, utilizing CSS variables, Flexbox/Grid, and no heavy frameworks to ensure easy integration with the target **Angular** frontend.

### Tech Stack Targeted:
- **Frontend:** Angular (This UI is ready to be componentized)
- **Backend:** Java Spring Boot
- **Database:** SQL Server
- **Search:** Elasticsearch
- **Caching/Memory:** Redis

---

## 2. Directory Structure

```text
/rentnest ui-ux
│
├── index.html              (Landing Page)
├── rooms.html              (Public Room Listing)
├── room-detail.html        (Public Room Details)
├── login.html              (Auth)
├── register.html           (Auth)
├── forgot-password.html    (Auth)
├── reset-password.html     (Auth)
├── profile.html            (Tenant Profile)
├── my-rooms.html           (Tenant Contract/Rooms)
├── my-invoices.html        (Tenant Invoices)
├── payment.html            (Tenant Payment QR Mock)
│
├── /admin/                 (Admin Portal)
│   ├── dashboard.html      (Overview stats & charts)
│   ├── rooms.html          (Manage rooms CRUD mock)
│   ├── tenants.html        (Manage users/tenants)
│   ├── contracts.html      (Manage contracts)
│   ├── invoices.html       (Generate & manage bills)
│   ├── services.html       (Manage utility pricing)
│   ├── reports.html        (Financial reports mock)
│   ├── email-templates.html(Rich text editor mock)
│   └── settings.html       (System config & Redis toggle)
│
└── /assets/
    ├── /css/
    │   ├── global.css      (Variables, resets, typography, layout utils)
    │   └── components.css  (Buttons, forms, cards, tables, modals, sidebars)
    └── /js/
        └── main.js         (Navigation toggle, modal logic, toast notifications, mock forms)
```

---

## 3. UI/UX Design System
- **Colors:**
  - Primary: `#0F52BA` (Sapphire Blue) - Conveys trust and professionalism.
  - Secondary/Main Text: `#1F2937` (Dark Slate).
  - Backgrounds: `#FFFFFF` (Surface), `#F9FAFB` (Alt/Body).
  - Accents: Success (`#10B981`), Danger (`#EF4444`), Warning (`#F59E0B`).
- **Typography:** Google Fonts 'Inter' (Weights: 300, 400, 500, 600, 700).
- **Icons:** FontAwesome 6.
- **Responsiveness:** Full mobile-first responsive design using media queries in `global.css` and `components.css`.
- **Animations:** Subtle fade-ins (`.fade-in`), slide-ups (`.slide-up`), and hover transitions included in `components.css`.

---

## 4. Redis Implementation Strategy (Backend Handoff)

For the Java Spring Boot backend, Redis is essential for scaling the application. Below are the architectural decisions for Redis integration:

### A. Session & Auth Management
- **JWT Blacklisting:** When a user logs out, store the JWT ID (`jti`) in Redis.
  - *Key:* `jwt:blacklist:{jti}`
  - *Value:* `true`
  - *TTL:* The remaining expiration time of the JWT.
  - *Why:* Ensures immediate invalidation of tokens before they expire naturally.

### B. OTP & Verification
- **Forgot Password / Phone Verification:** Store generated OTPs temporarily.
  - *Key:* `otp:reset:{email_or_phone}`
  - *Value:* `123456`
  - *TTL:* `300` (5 minutes).
- **Email Verification Limits:**
  - *Key:* `verify:email:{token}`
  - *TTL:* `86400` (24 hours).

### C. Rate Limiting (Anti-Spam/Brute Force)
- **Login Attempts:** Prevent brute-force attacks.
  - *Key:* `rl:login:{ip_address}`
  - *Limit:* Max 5 attempts per 15 minutes.
- **OTP Requests:** Prevent SMS spam.
  - *Key:* `rl:otp:{phone_number}`
  - *Limit:* Max 3 requests per hour.

### D. Data Caching (Performance)
- **Room Listing Cache:** The public listing page (`rooms.html`) is read-heavy.
  - *Key:* `cache:rooms:page:{pageNo}:filters:{hash}`
  - *TTL:* `60` to `300` seconds. (Invalidate or let expire).
- **Dashboard Stats:** Admin dashboard counters (total rooms, revenue) are expensive to query.
  - *Key:* `cache:admin:dashboard:stats:{hostelId}`
  - *TTL:* `300` seconds (5 mins). Calculate via background job and update cache.

### E. Distributed Locks (Concurrency)
- **Invoice Generation:** When the cron job runs on the 1st of the month to generate invoices, prevent multiple backend instances from generating duplicate invoices.
  - *Key:* `lock:invoice_gen:{hostelId}:{monthYear}`
  - *Action:* Use `SETNX` (Set if Not Exists) with a TTL of 60 seconds while the job runs.

---

## 5. Angular Integration Guide
When moving these HTML/CSS files into Angular components:
1. **Global Styles:** Copy the contents of `global.css` and `components.css` into your Angular `styles.scss` (or equivalent).
2. **Icons/Fonts:** Copy the CDN links from the `<head>` of these HTML files into Angular's `index.html`.
3. **Components Structure:**
   - Break `header` and `footer` into `app-header` and `app-footer`.
   - Break the admin sidebar into `app-admin-sidebar`.
   - Break reusable cards (e.g., room card) into `app-room-card`.
4. **JavaScript:** Replace the Vanilla JS in `main.js` with Angular directives (`*ngIf`, `*ngFor`) and Data Binding (`(click)`, `[ngClass]`). For example, replacing the modal toggle logic with Angular state variables.
