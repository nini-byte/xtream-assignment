INSERT INTO `fresh_cart_db`.`categories`
(`category_id`,
`name`)
VALUES
(1, 'cat1');

INSERT INTO `fresh_cart_db`.`categories`
(`category_id`,
`name`)
VALUES
(2, 'cat2');

INSERT INTO `fresh_cart_db`.`products`
(`product_id`,
`name`,
`image_URL`,
`price`,
`quantity`,
`extra_points`,
`category_id`)
VALUES
(1,'prod1','url1',10,1,0,1)

INSERT INTO `fresh_cart_db`.`products`
(`product_id`,
`name`,
`image_URL`,
`price`,
`quantity`,
`extra_points`,
`category_id`)
VALUES
(2,'prod2','url2',20,2,0,1)

INSERT INTO `fresh_cart_db`.`products`
(`product_id`,
`name`,
`image_URL`,
`price`,
`quantity`,
`extra_points`,
`category_id`)
VALUES
(3,'prod3','url3',30,3,1,2)

INSERT INTO `fresh_cart_db`.`discounts`
(`discount_id`,
`percentage_discount`,
`start_date`,
`end_date`,
`product_id`)
VALUES
(4,10,'2024-03-01','2024-03-30',2)
