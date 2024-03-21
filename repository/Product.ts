import { RowDataPacket } from "mysql2"

export interface IProduct extends RowDataPacket {
	product_id: number
	name: string
	image_URL: string
	price: number
	quantity: number
	extra_points: number
	category_id: number
	percentage_discount: number
}

export interface IProductsCategories extends RowDataPacket {
	category_id: number
	number_of_products: number
}