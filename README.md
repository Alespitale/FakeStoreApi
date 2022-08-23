# FakeStoreApi

- Create a project and install all needed dependencies.
- Create an app.js file that runs a local server.
- Using the provided API, generate models for Products, Carts and Users.
- Create a simple middlewares that logs each request to the server.
- Create a middlewares that handles invalid endpoints (404 Http Error).
- Create the following endpoints:
  - all basic `GET` endpoints (/products, /products/:id, users, etc)
  - `GET /products/categories` should return an array of objects that contains the name of the category and their respective products.
  - `GET /users/firsts/` should return the first three users sorted by ID.
  - `GET /products/prices` should return a list of products that has the keys: id, title and price. It should be possible to sort by price the response with 'order' query.
  - `GET /products/expensive` should return the most expensive products from their respective category.
  - `GET /carts/bigcarts` should return all the carts that contain more than 2 products and the username of the person that ordered that cart.

# Author

- [@AleSpitale](https://github.com/Alespitale)