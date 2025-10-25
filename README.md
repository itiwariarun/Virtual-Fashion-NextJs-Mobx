
# Virtual Fashion - Front-end

This project is a **React + TypeScript** e-commerce application built for **Virtual Fashion**.
The goal of this task was to implement the **content list and filtering functionality** for the CLO-SET CONNECT Store Page ([https://connect.clo-set.com/store](https://connect.clo-set.com/store)).

---

## 🚀 Features

**Required Features Implemented:**

- **Contents Filter:**
  - Pricing options: Paid, Free, View Only
  - Multiple options selectable
  - Reset button restores default state
  - Filters persist across page reloads via URL query params

- **Contents List:**
  - Display photo, user name, title, pricing option, and price (for Paid items)
  - Responsive grid layout:
    - Default: 4 columns
    - <1200px: 3 columns
    - <768px: 2 columns
    - <480px: 1 column
  - Infinite scroll support

- **Keyword Search:**
  - Filter by user name or title
  - Works in combination with Pricing Options
  - Persisted via URL query params

**Optional Features Implemented:**

- Sorting dropdown:
  - Item Name (default)
  - Higher Price
  - Lower Price
- Price range slider (0 - 999) for Paid items
- Skeleton UI for infinite scroll

---

## 🛠️ Tech Stack & Library Justification

| Library/Tool | Purpose / Reason for Use |
|--------------|-------------------------|
| **React 19** | Main UI library for building reusable components as per requirement |
| **TypeScript** | Type safety and better code maintainability (Optional requirement) |
| **Next.js** | React framework for routing, SSR, and optimized builds |
| **Tailwind CSS** | Utility-first CSS for rapid responsive design implementation |
| **MobX** | State management library (as per requirement) - chosen for simplicity and reactive programming |
| **mobx-react-lite** | Lightweight React bindings for MobX with hooks support |
| **@radix-ui/react-slider** | Accessible range slider component for price filtering (Optional feature) |
| **Lucide React** | Icon library for UI elements (search, filter icons) |
| **clsx** | Utility for conditional className merging |
| **class-variance-authority** | Type-safe component variant management |
| **query-string** | Parse and stringify URL query parameters for filter persistence without browser storage |
| **Cypress** | End-to-end testing framework (Optional requirement) |
| **ESLint** | Code quality and consistency enforcement |

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/itiwariarun/Mobx-Ecom.git
cd Mobx-Ecom

# Install dependencies
npm install
````

---

## ▶️ Development

```bash
# Start development server
npm run dev

# The app will run at http://localhost:3000
```

---

## 🏗️ Build & Production

```bash
# Build the application for production
npm run build

# Start the production server
npm run start
```

---

## 🧹 Linting

```bash
# Run ESLint to check code quality
npm run lint
```

---

## 🔍 Cypress Testing

```bash
# Start development server first
npm run dev

# Open Cypress GUI
npx cypress open

# Run Cypress headless tests
npx cypress run
```

### ✅ Cypress Test Scenarios

1. **Product Display On Home Page**

   - Checks if product cards are rendered correctly
   - Verifies images, titles, and pricing info

2. **Filter Functionality**

   - Check Paid, Free, View Only filters
   - Reset button restores default state
   - Filters persist via URL query

3. **Price Slider**

   - Adjust min/max price for Paid items
   - Store updates correctly

4. **Keyword Search**

   - Search by user name or title
   - Works with filters

5. **Sort Dropdown**

   - Sort by name, price high → low, price low → high

6. **Infinite Scroll**

   - Loads more items as user scrolls down
   - Skeleton UI appears while loading

---

## 📜 License

MIT License © 2025
Implemented as part of **Virtual Fashion Front-end**.
