# Roba Estates

A real estate website for browsing properties for sale, rent, and lease (houses, apartments, and commercial buildings).

## Structure

```
realestate/
├── src/                  # React frontend
│   ├── components/
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyDetail.jsx
│   │   ├── FilterBar.jsx
│   │   └── ContactForm.jsx
│   ├── data/
│   │   └── properties.js   # Sample data (replace with API calls once backend is live)
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── backend/              # Node/Express + MongoDB API
    ├── models/
    │   ├── User.js          # Agents/owners (only they can log in)
    │   ├── Property.js
    │   └── Inquiry.js
    ├── routes/
    │   ├── auth.js          # Register/login for agents & owners
    │   ├── properties.js     # Public browsing + agent-only create/edit/delete
    │   └── inquiries.js
    ├── middleware/
    │   └── auth.js          # JWT auth, restricts uploads to agents/owners
    ├── server.js
    └── .env.example
```

## Key design point

**Anyone can browse listings without an account.** Only agents/owners can register, log in, and create/edit/delete property listings (via `POST /api/properties`, protected by `requireAuth` + `requireAgentOrOwner`). New listings are created with `status: "pending"` so an admin can review before they go public (you can build a simple admin approval step later, or auto-approve by changing the default).

## Running the frontend (currently uses sample data)

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. The 8 sample Nagpur properties are in `src/data/properties.js`.

## Running the backend

```bash
cd backend
npm install
cp .env.example .env   # then edit JWT_SECRET, MONGO_URI
npm run dev
```

Requires a running MongoDB instance (local or Atlas). Runs on http://localhost:4000.

## Connecting frontend to backend (next step)

Replace the import from `src/data/properties.js` with API calls:

```js
// Fetch listings
const res = await fetch("/api/properties?type=Apartment&purpose=Rent");
const properties = await res.json();

// Submit an inquiry
await fetch("/api/inquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ propertyId, name, email, message })
});

// Agent login
const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
const { token } = await res.json();

// Agent creates a listing (multipart form for images)
await fetch("/api/properties", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: formData // FormData with title, type, purpose, location, price, etc. + images
});
```

## Suggested next steps

1. Build a simple "agent dashboard" page (login, create/edit listings, view inquiries).
2. Add an admin review queue for `pending` listings.
3. Swap local image storage (`multer` disk storage) for S3/Cloudinary in production.
4. Add pagination to `GET /api/properties` once listings grow.
