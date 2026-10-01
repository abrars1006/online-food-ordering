# Online Food Ordering System

## Objective

A front-end simulation of an online food ordering system for Assignment 1 – CAT 1. Customers can browse a menu, manage a shopping bag, enter delivery details and place a simulated order.

## Technologies

- HTML5
- CSS3
- JavaScript
- AngularJS 1.8.2 (loaded from Google's CDN)

## Features

- Dynamic food menu with search by dish name or category
- Category filters that work together with search
- Availability labels and disabled controls for unavailable dishes
- Shopping bag with quantity controls, item removal and live totals
- Checkout with name, email, Indian phone, address, city and password validation
- Order summary, generated order ID and success view
- Responsive layout for mobile, tablet and desktop
- No backend or real payment processing

## AngularJS Concepts Demonstrated

- Module and controller: `angular.module(...)` and `FoodOrderController`
- Expressions and filters: interpolation, currency and collection filtering
- Two-way binding: `ng-model` for search, category selection and form fields
- Directives: `ng-app`, `ng-controller`, `ng-repeat`, `ng-if`, `ng-show`, `ng-hide`, `ng-click`, `ng-class`, `ng-disabled` and `ng-submit`
- Events and conditional rendering: cart actions and `ng-switch` view changes
- Form validation: AngularJS form validity, required fields, email, phone, password length and password confirmation
- Single-page navigation: AngularJS switches views without reloading the document

## Run

1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.
3. Use the menu, add dishes to the bag, and complete the checkout form.

An internet connection is needed to load AngularJS from the CDN, the Google Fonts, and the food photography. If an individual food image fails, the menu displays an in-page fallback icon.