# Yevhenii Kaliush Frontend Wrocław

## Overview
This is a simple e-commerce frontend application built with **React** using **Create React App**. The application allows users to browse products, add them to a cart, view the cart, and proceed to order summary and confirmation. The project is designed to be hosted on **GitHub Pages** as a static site.

### Features
- Product listing with sorting by name or price.
- Cart functionality with add, update, and remove items (persisted in `localStorage`).
- Navigation using **React Router** for pages like product list, cart, order summary, and confirmation.
- Responsive design with a clean UI using custom CSS.
- Visual feedback (pulse animation) when adding items to the cart.

### Approach
- **Framework**: Built with React and TypeScript for type safety.
- **State Management**: Uses React's `useState` and `useEffect` hooks, with `localStorage` for cart persistence.
- **Routing**: Implemented with `react-router-dom` to handle navigation.
- **Styling**: Custom CSS with a gradient background, Google Fonts (Poppins), and Font Awesome icons.
- **Data**: Products are stored in a static `products.json` file, with images assumed to be in `public/assets/images/`.
- **Hosting**: Deployed on GitHub Pages as a static site, with proper routing configuration.

### Assumptions
- Images are located in `public/assets/images/` (e.g., `banana.jpg`, `milk.jpg`, etc.).
- No backend is required; all data is static.
- The application is designed for static hosting, with client-side routing handled by React Router.

## Prerequisites
- **Node.js** (v14 or higher) and **npm** installed.
- **Git** installed for cloning the repository.
- A GitHub account for deploying to GitHub Pages.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/yevhenii_kaliush_frontend_wroclaw.git
   cd yevhenii_kaliush_frontend_wroclaw
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally
1. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` (or another port if specified).

2. Open your browser and navigate to `http://localhost:3000` to view the app.


## Known Issues
- **Cart Images**: Images may not display in the cart due to path issues. Ensure images are in `public/assets/images/` or update `ProductList.tsx` for `src/assets/images/` imports.
- **Cart Text Alignment**: Text in the cart may appear misaligned; further CSS adjustments are needed.
- **ESLint Conflict**: Case sensitivity in the repository path may cause ESLint errors on Windows. See the "Running Locally" section for workarounds.

## Future Improvements
- Fix cart image loading and text alignment.
- Add product categories or filters.
- Implement a modal for product details.
- Enhance cart animation feedback.

## Author
Yevhenii Kaliush