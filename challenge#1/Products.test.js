import {describe, expect} from '@jest/globals';
import {getNumberOfProducts} from './Products';

// jest.useFakeTimers()

describe('getNumberOfProducts', () => {

    it('should return the total number of products when the query is successful', async () => {
        const expectedResult = 2;

        // mysql successful mock connection
        const mockConnection = {
            query: jest.fn().mockImplementation((query, callback) => {
                callback(null, [{ number_of_products: expectedResult }]);
            })
        };

        await expect(getNumberOfProducts(mockConnection)).resolves.toEqual(expectedResult);
    });

    it('should return an error when the query fails', async () => {
        const errorMessage = 'mysql connection error';

        // mysql failed mock connection
        const mockConnection = {
            query: jest.fn().mockImplementation((query, callback) => {
                callback(new Error(errorMessage));
            })
        };

        await expect(getNumberOfProducts(mockConnection)).rejects.toThrow(errorMessage);
    });
});

/*

const request = require('supertest');
const app = require('./Products');

describe('endpoint /getNumberOfProducts', () => {
  it('should return the total number of products', async () => {

    const response = await request(app).get('/getNumberOfProducts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('numberOfProducts');
    expect(typeof response.body.numberOfProducts).toBe(13);

  });
});

*/
  