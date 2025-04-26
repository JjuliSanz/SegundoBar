# Segunda Bar | Rooftop & Tragos de Autor

This project showcases the beauty and offerings of our bar through an engaging and interactive web experience. Explore images of our location and delicious food, detailed information about our bar, and a comprehensive menu displaying various drinks and other dishes, each accompanied by images, descriptions, and prices.

## Features

- Framework: Built with Next.js 14, ensuring performance, scalability, and server-side rendering.
- Styling: Styled with Tailwind CSS for utility-first, responsive design.
- Animations: Integrated with Framer Motion for smooth, professional animations across the site.
- Sliders: Uses Swiper JS for responsive and interactive image sliders.
- Cart System: The site includes a cart system managed globally using Zustand, allowing users to add, remove, and update products in their cart.
- Authentication: The dashboard is protected with Auth.js (formerly NextAuth.js), restricting access only to logged-in users via middleware.
- Dashboard: The dashboard allows the admin to add, edit, and delete menu items directly using server functions. This eliminates the need for API requests, leveraging Next.js's built-in server capabilities.
- Database: The project is backed by PostgreSQL, and database queries are managed with Prisma ORM.
- Form Validation: The dashboard uses Zod for validating data in forms for adding, editing, and deleting menu items.
- Checkout Page: A checkout page that allows users to send their cart and personal information directly to the pizzeria via WhatsApp for placing orders. Users can fill in their name, phone number, and address, and the system generates a message summarizing their cart for easy ordering.

## Pages and Sections

1. **Home**: Introduction and general overview of the business.
2. **Menu**: Dynamic menu section where users can view products and add items to their cart.
3. **Contact**: Contact information for the business.
4. **About Us**: Information about Las Palmas, its history, and values.
5. **Gallery**: An image gallery showcasing the shop and its products.

## Technologies Used

- Next.js 14: A React-based framework with server-side rendering and static generation.
- TypeScript: Ensures type safety and reduces runtime errors.
- Tailwind CSS: Utility-first CSS framework for fast UI development.
- Framer Motion: For adding animations and transitions.
- Swiper JS: For creating responsive and customizable sliders.
- Zustand: A minimal, fast global state management solution for the cart.
- Auth.js: Authentication handling with middleware protection for secure routes.
- PostgreSQL: Relational database management.
- Prisma: An ORM for database queries and migrations.
- Zod: A schema declaration and validation library for ensuring correct data in forms.

## Cart Functionality

The cart system allows users to:

- Add, remove, and update products.
- Keep track of the total price.
- Store and display items dynamically across the app via Zustand's global state management.

## Admin Dashboard

The dashboard provides the following features:

- Add, edit, and delete menu items.
- Access is restricted to authenticated users using Auth.js middleware.
- All server functions are handled directly within Next.js, avoiding the need for API requests.


## Challenges Faced

- **Complex Animations:** One of the challenges was managing complex animations with multiple states and transitions. Using Framer Motion's variants and hooks helped simplify this complexity.

- **Third-Party Library Integration:** Integrating and customizing third-party libraries like Swiper JS and Zustand required careful reading of documentation and experimentation to achieve the desired outcomes.

- **Responsive Design:** Ensuring that the site was fully responsive across all devices and screen sizes required thorough testing and adjustments. Tailwind CSS was a great help in this regard, but it still required attention to detail.

## Authors

- [@JjuliSanz](https://github.com/JjuliSanz)

<p>
   <h1 style="font-size: 48px; font-weight: bold; font-family: sans; color: var(--primary);">
    SEGUNDO 
  </h1>
  <img src="public/logo.png" alt="Segundo Logo" width="100"/>
</p>
