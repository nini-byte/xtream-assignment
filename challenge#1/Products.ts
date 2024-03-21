//import mysql from 'mysql2';
const mysql = require('mysql2')
const express = require('express')

import { Connection } from "mysql2"
import { Request, Response } from "express";

import { IProduct, IProductsCategories } from "../repository/Product"

// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fresh_cart_api',
    password: 'fresh_cart_api',
    database: 'fresh_cart_db'
  })

// create a server on port 3000
const app = express()
const port = 3000

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// graceful shutdown
process.on('SIGTERM', () => {
    //debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        // debug('HTTP server closed')
        connection.end() // closing mysql
    })
})

app.get('/getNumberOfProducts', async (req: Request, res: Response) => {

    let numberOfProducts: number = await getNumberOfProducts(connection)
    res.json(numberOfProducts)
	
})

app.get('/getNumberOfProductsForEachCategory', async (req: Request, res: Response) => {

    let productsCategories: IProductsCategories[]
    productsCategories = await getNumberOfProductsForEachCategory(connection)
    
    res.json(productsCategories)
	
})

app.get('/getProducts', async (req: Request, res: Response) => {

    let start: number = parseInt(req.query.start.toString()), numberOfProductsOnPage: number = parseInt(req.query.numberOfProductsOnPage.toString())

    if (start >= 0 && numberOfProductsOnPage >= 0) {

        let products: IProduct[]
        products = await getProducts(connection, start, numberOfProductsOnPage)
    
        res.json(products)

    } else {
        res.json('Something went wrong.')
    }
	
})

app.get('/getProductsByCategory', async (req: Request, res: Response) => {

    let start: number = parseInt(req.query.start.toString()), numberOfProductsOnPage: number = parseInt(req.query.numberOfProductsOnPage.toString())
    let categoryId: number = parseInt(req.query.categoryId.toString())

    if (start >= 0 && numberOfProductsOnPage >= 0 
        && categoryId >= 1) {

        let products: IProduct[]
        products = await getProducts(connection, start, numberOfProductsOnPage, categoryId)
    
        res.json(products)

    } else {
        res.json('Something went wrong.')
    }
	
})

app.get('/getProductByName', async (req: Request, res: Response) => {

    let searchedName: string = req.query.searchedName.toString()

    const regex: RegExp = /^[a-zA-Z0-9]+$/;

    if (regex.test(searchedName)) { // tiny sql injection check

        let products: IProduct[]
        products = await getProductByName(connection, searchedName)
    
        res.json(products)
    } else {
        res.json('Something went wrong.')
    }
	
})

export function getNumberOfProducts(connection: Connection): Promise<number> {
      
    return new Promise<number>((resolve, reject) => {
        
        let queryContent: string = "SELECT COUNT(*) AS number_of_products FROM products"
		connection.query(queryContent, (err, rows) => {
            if (err) reject(err)
            else resolve(rows[0].number_of_products)
        })
        
    })
}

function getNumberOfProductsForEachCategory(connection: Connection): Promise<IProductsCategories[]> {
      
    return new Promise<IProductsCategories[]>((resolve, reject) => {
        
        let queryContent: string = "SELECT category_id, COUNT(*) AS number_of_products FROM products GROUP BY category_id"
		connection.query<IProductsCategories[]>(queryContent, (err, rows) => {
            if (err) reject(err)
            else resolve(rows)
        })
        
    })
}

function getProducts(connection: Connection, start: number, numberOfProducts: number, categoryId?: number): Promise<IProduct[]> {
    
	return new Promise<IProduct[]>((resolve, reject) => {

        let currentDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let queryContent: string = "SELECT p.*, percentage_discount FROM products p LEFT JOIN discounts d ON p.product_id = d.product_id AND start_date <= \'".concat(currentDate,  "\' AND end_date >= \'", currentDate, "\'")
        
		if (typeof categoryId !== "undefined") 
            queryContent = queryContent.concat(" WHERE category_id = ", categoryId.toString())

		queryContent = queryContent.concat(" ORDER BY product_id DESC LIMIT ", numberOfProducts.toString(), " OFFSET ", start.toString())

        //console.log(queryContent)
		connection.query<IProduct[]>(queryContent, (error, rows) => {
			if (error) reject(error)
			else resolve(rows)
		})
		
	})
}

function getProductByName(connection: Connection, searchedName: string): Promise<IProduct[]> {
    
	return new Promise<IProduct[]>((resolve, reject) => {

        let currentDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let queryContent: string = "SELECT p.*, percentage_discount FROM products p LEFT JOIN discounts d ON p.product_id = d.product_id AND start_date <= \'".concat(currentDate,  "\' AND end_date >= \'", currentDate, "\' WHERE name LIKE \'%", searchedName,  "%\' ORDER BY product_id DESC")

        //console.log(queryContent)
		connection.query<IProduct[]>(queryContent, (error, rows) => {
			if (error) reject(error)
			else resolve(rows)
		})
		
	})
}