CREATE DATABASE `fresh_cart_db`;
USE `fresh_cart_db`;

-- NOTES:
-- * in PRODUCTS, we suppose that the image is stored somewhere and we only need to know its URL
-- * in ORDER_PRODUCTS we store the price and extra_points_earned for every product ordered, so we can look at a user's purchase history even if a product gets changed over time
-- * a USER starts with 0 available_points

CREATE TABLE categories2 (
	category_id INT NOT NULL AUTO INCREMENT,
    name VARCHAR(256) NOT NULL,
	PRIMARY KEY (category_id)
);

CREATE TABLE products (
	product_id INT NOT NULL,
    name VARCHAR(256) NOT NULL,
    image_URL VARCHAR(256) NOT NULL, 
    price DECIMAL NOT NULL,
    quantity INT NOT NULL, 
    extra_points INT NULL,
    category_id INT NOT NULL,
	PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE discounts (
	discount_id INT NOT NULL,
    percentage_discount INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    product_id INT NOT NULL,
	PRIMARY KEY (discount_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE users (
	user_id INT NOT NULL,
    available_points INT NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE orders (
	order_id INT NOT NULL,
    user_id INT NOT NULL,
	PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE order_products (
	order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    extra_points INT NULL,
	PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
