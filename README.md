# Store Simulation

Full-stack store inventory simulation application built with React and Node.js.

**Repository:** https://github.com/antonbroker/store-simulation-app

---

## How to run

1. **Environment:** `.env` files are **not** in the repo (they are in `.gitignore`). Create them and add:
   - **Server:** create `server/.env` and add: `PORT=3000` (or your port).
   - **Client:** create `client/.env` and add: `VITE_API_URL=http://localhost:3000` (or the URL where the backend runs).
2. **Backend:** `cd server && npm install && npm start`
3. **Frontend:** `cd client && npm install && npm run dev`
4. **Backend tests:** `cd server && npm test`

---

## Design & Architecture

### (a) Overall structure

- **Client** (`client/`): React SPA (Vite). Two routes: `/` (inventory), `/create-product` (create product). UI logic is separated from API: all HTTP calls live in `src/api/` (`productsApi.js`, `inventoryApi.js`), pages only call these functions and handle loading/error state.

- **Server** (`server/`): Node.js + Express. Layered structure:
  - **Routes** (`src/routes/`) — mount endpoints
  - **Controllers** (`src/controllers/`) — handle request/response, call services
  - **Services** (`src/services/`) — business rules and validation
  - **Repositories** (`src/repositories/`) — read/write access to data
  - **Data store** (`src/db.js`) — in-memory arrays (products, inventory); repositories use this module

Data flow: `Route → Controller → Service → Repository`. Controllers and services are covered by unit tests.

### (b) How it addresses the functional requirements

| Requirement | Implementation |
|-------------|----------------|
| Manage store inventory | Inventory page: list items (name + quantity), add from products list, remove, save via POST /inventory. |
| SPA in React, two pages | React Router: `/` = inventory, `/create-product` = new product. |
| Add products | Create Product page: single field “name”, PUT /product. |
| Build inventory from products | Inventory page: dropdown from GET /product/all, quantity input, then save. |
| API contract (Product, InventoryItem, endpoints, errors) | Backend implements GET/PUT /product, GET/POST /inventory, POST /inventory/reset with the required status codes and error bodies. Reset is available in the UI via a "Reset inventory" button. |

### (c) Key design decisions and assumptions

- **Products:** Only “add” is implemented (PUT /product). The assignment document mentions that the user can "add/update/delete products", but the API section does not describe update or delete endpoints—only GET /product/all and PUT /product. So update and delete for products are not implemented and are out of scope.
- **Inventory validation:** Before saving, the server checks (1) each item has `name` and `quantity`, (2) each `name` exists in the products list. Error messages match the spec.
- **Storage:** In-memory only (no database). Repositories hold arrays; state resets on server restart.
- **CORS:** Enabled on the server so the Vite dev client can call the API.

### Frontend styles

- **Vanilla CSS only** (no CSS-in-JS or preprocessors). Styles live in `client/src/styles/`:
  - `variables.css` — shared tokens (colors, font, radii, shadows, spacing)
  - `inventory.css` — styles for the Inventory page (scoped to `.inventory-page`)
  - `createProduct.css` — styles for the Create Product page (scoped to `.create-product-page`)
- **Font:** DM Sans (Google Fonts), with system-ui fallback.
- **Design:** Minimalist, teal accent, warm neutrals, light gradients for the page background and top bar. Focus states and hover transitions for inputs and buttons. Error messages use a left border and tinted background.

---

## AI Tools used

This assignment was time-boxed (3 hours) and aimed at entry-level; I used AI to speed up implementation while staying within the requirements. Tools and usage:

- **Cursor** — primary tool for implementation (code, tests, styles, docs). I provided the prompts below and iterated on the results.
- **Claude** — I described each task in simple terms; Claude helped me turn those descriptions into clear, actionable English prompts to use in Cursor.

Below are the prompts I used for each area (as submitted). Each prompt is in English and was designed to fully specify the task; the note in parentheses explains how it was created.

---

### 1. Unit tests for backend services

**Prompt used in Cursor:**

> Add unit tests for the backend services (`productsService` and `InventoryService`). Use Jest. Mock the repositories so tests are isolated. Cover: for products — get all, add product (success, validation for missing name, validation for duplicate name); for inventory — get, reset, save (success, invalid schema with correct error message, items not in products list with correct error message). Ensure all tests pass with `npm test`.

*(I explained that I needed tests for the services, which cases to cover, and that I wanted mocks; Claude helped me phrase this as a single, complete prompt for Cursor.)*

---

### 2. Project documentation

**Prompt used in Cursor:**

> Expand the README into a proper design/architecture document. Include: (a) overall structure of the solution (client and server layers), (b) a table mapping each functional requirement from the spec to how it is implemented, (c) key design decisions and assumptions (e.g. why only add product, no update/delete; in-memory storage; CORS). Keep it concise and suitable for submission.

*(I said I needed a README that explained the project structure and how it meets the requirements; Claude helped me structure it as (a), (b), (c) and add the “design decisions” part.)*

---

### 3. Styles for both pages

**Prompt used in Cursor:**

> Add minimal, professional vanilla CSS for the two pages (Inventory and Create Product). Use separate CSS files under `client/src/styles/` — e.g. variables, inventory page, create-product page — without changing the page structure. Style should look realistic and production-like: clear typography, spacing, and one accent color (e.g. teal). Include focus and hover states. Do not use inline styles; add only the class names needed for the CSS to apply.

*(I described that I wanted simple but good-looking styles in separate files, not “generic AI” look; Claude helped me specify variables, separate files, accent color, and “production-like” so the result would be consistent and professional.)*

---

### 4. API errors visible on the frontend

**Prompt used in Cursor:**

> On the Create Product page and the Inventory page, when an API request fails (e.g. 400 for duplicate product name or invalid inventory), show the error message from the server to the user in the UI instead of only logging to console. Use the error text from `response.data.error` and display it in a visible, readable way (e.g. below the form or above the list).

*(I said I wanted users to see backend errors on both pages; Claude helped me phrase it in terms of failed requests, 400, and using `response.data.error` so the implementation would be precise.)*

---

### 5. Final code review (senior-style)

**Prompt used in Cursor:**

> Review the whole project as a senior developer would: check alignment with the assignment spec (API contract, validation messages, structure), suggest or apply fixes for bugs and inconsistencies (e.g. wrong error messages, missing validation), and ensure the code is consistent and ready for submission. Do not change behaviour beyond what the spec requires.

*(I asked for a final pass over the code to catch mistakes and align with the spec; Claude helped me frame it as a “senior code review” with clear boundaries so the changes would be targeted and safe.)*
