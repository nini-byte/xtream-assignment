"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//import mysql from 'mysql2';
var mysql = require('mysql2');
var express = require('express');
// mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'fresh_cart_api',
    password: 'fresh_cart_api',
    database: 'fresh_cart_db'
});
// create a server on port 3000
var app = express();
var port = 3000;
var server = app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
// graceful shutdown
process.on('SIGTERM', function () {
    //debug('SIGTERM signal received: closing HTTP server')
    server.close(function () {
        // debug('HTTP server closed')
        connection.end(); // closing mysql
    });
});
app.get('/getNumberOfProducts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var numberOfProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNumberOfProducts(connection)];
            case 1:
                numberOfProducts = _a.sent();
                res.json(numberOfProducts);
                return [2 /*return*/];
        }
    });
}); });
app.get('/getNumberOfProductsForEachCategory', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNumberOfProductsForEachCategory(connection)];
            case 1:
                productsCategories = _a.sent();
                res.json(productsCategories);
                return [2 /*return*/];
        }
    });
}); });
app.get('/getProducts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var start, numberOfProductsOnPage, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = parseInt(req.query.start.toString()), numberOfProductsOnPage = parseInt(req.query.numberOfProductsOnPage.toString());
                if (!(start >= 0 && numberOfProductsOnPage >= 0)) return [3 /*break*/, 2];
                products = void 0;
                return [4 /*yield*/, getProducts(connection, start, numberOfProductsOnPage)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                res.json('Something went wrong.');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/getProductsByCategory', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var start, numberOfProductsOnPage, categoryId, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = parseInt(req.query.start.toString()), numberOfProductsOnPage = parseInt(req.query.numberOfProductsOnPage.toString());
                categoryId = parseInt(req.query.categoryId.toString());
                if (!(start >= 0 && numberOfProductsOnPage >= 0
                    && categoryId >= 1)) return [3 /*break*/, 2];
                products = void 0;
                return [4 /*yield*/, getProducts(connection, start, numberOfProductsOnPage, categoryId)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                res.json('Something went wrong.');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/getProductByName', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchedName, regex, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchedName = req.query.searchedName.toString();
                regex = /^[a-zA-Z0-9]+$/;
                if (!regex.test(searchedName)) return [3 /*break*/, 2];
                products = void 0;
                return [4 /*yield*/, getProductByName(connection, searchedName)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                res.json('Something went wrong.');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
function getNumberOfProducts(connection) {
    return new Promise(function (resolve, reject) {
        var queryContent = "SELECT COUNT(*) AS number_of_products FROM products";
        connection.query(queryContent, function (err, rows) {
            if (err)
                reject(err);
            else
                resolve(rows[0].number_of_products);
        });
    });
}
function getNumberOfProductsForEachCategory(connection) {
    return new Promise(function (resolve, reject) {
        var queryContent = "SELECT category_id, COUNT(*) AS number_of_products FROM products GROUP BY category_id";
        connection.query(queryContent, function (err, rows) {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
}
function getProducts(connection, start, numberOfProducts, categoryId) {
    return new Promise(function (resolve, reject) {
        var currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var queryContent = "SELECT p.*, percentage_discount FROM products p LEFT JOIN discounts d ON p.product_id = d.product_id AND start_date <= \'".concat(currentDate, "\' AND end_date >= \'", currentDate, "\'");
        if (typeof categoryId !== "undefined")
            queryContent = queryContent.concat(" WHERE category_id = ", categoryId.toString());
        queryContent = queryContent.concat(" ORDER BY product_id DESC LIMIT ", numberOfProducts.toString(), " OFFSET ", start.toString());
        //console.log(queryContent)
        connection.query(queryContent, function (error, rows) {
            if (error)
                reject(error);
            else
                resolve(rows);
        });
    });
}
function getProductByName(connection, searchedName) {
    return new Promise(function (resolve, reject) {
        var currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var queryContent = "SELECT p.*, percentage_discount FROM products p LEFT JOIN discounts d ON p.product_id = d.product_id AND start_date <= \'".concat(currentDate, "\' AND end_date >= \'", currentDate, "\' WHERE name LIKE \'%", searchedName, "%\' ORDER BY product_id DESC");
        //console.log(queryContent)
        connection.query(queryContent, function (error, rows) {
            if (error)
                reject(error);
            else
                resolve(rows);
        });
    });
}
