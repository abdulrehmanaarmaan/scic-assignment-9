# SCIC Project 9 – Product Management Web App

This is a responsive web application built with **Next.js**, **React**, and **Tailwind CSS** for managing products. It allows users to view, add, and manage products through a clean and professional interface. The app includes authentication-protected routes, form validation, and local state persistence to ensure a smooth and reliable user experience.


## Setup & Installation

### Clone the repository
git clone https://github.com/abdulrehmanaarmaan/scic-assignment-9

### Install Dependencies
npm install

### Run the development server
npm run dev


## Route Summary

| Route                 | Purpose                                     |
|-----------------------|---------------------------------------------|
| `/`                   | Landing page / Home                         |
| `/login`              | Login page for accessing protected routes   |
| `/items-list`         | Displays all products in a responsive grid  |
| `/add-item`           | Protected route to add a new product        |
| `/item-details/[id]`  | View detailed information for a product     |


## Implemented Features

* User authentication with mock credentials

* Protected routes for adding products

* Product listing in a responsive grid layout

* Product detail view with image, description, and price

* Add Product form with input validation, image URL validation (only loadable images allowed), and local storage persistence for unsaved form inputs

* Responsive design for both desktop and mobile

* Professional UI/UX consistency including unified button styles, border radius, spacing, and colors, with clear call-to-action for adding items

* Toast notifications for success/error events


## Brief Explanation of Features

* Login: Users log in with credentials (manager@sciccompany.com / SecurePass123!) to access protected routes. Form state persists if the user navigates away accidentally.

* Items List: Displays all products in a professional, responsive grid. Users can view details or navigate to add new products via a clearly placed button.

* Add Item: Allows authenticated users to add products with proper validation. Image URLs are verified to ensure they load correctly. Unsaved form inputs are temporarily stored in localStorage to prevent data loss.

* Item Details: Shows complete details about a selected product, including image, description, and price.

* Notifications: Toast messages provide instant feedback for actions such as login success/failure, adding items, or errors.