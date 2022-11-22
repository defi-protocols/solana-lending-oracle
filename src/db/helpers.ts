import { Config } from './config';
import { Mongo } from './mongo';

/* ************************************************************************* */
/* **************************** MongoDB READ functions ********************* */
/* ************************************************************************* */

/**
 * Fetch the last provider price of a collection given.
 * @param provider The provider to be fetched
 * @param collection The collection to be fetched
 * @returns The Mongo Document
 */
export const getLastProviderPrice = async (provider: string, collection: string) => {
    // If no provider OR no collection is provided, return null.
    // This method return only 1 result
    if (!provider || !collection) return null;
    
    // Init mongo
    const mongo = new Mongo();
    // We want last provider price, so we need to limit only 1 result. 
    // Descending order on field _id is enabled by default
    let filters = {
        'page': 1, 
        'limit': 1,
        'api': provider,
        'collection': collection
    };
    // Exit with results array
    const results = await mongo.getAll('provider_prices', filters);
    // Return the first result
    return results[0];
}

/**
 * Return the last document in 'price' mongo-collection of collection given.
 * @param collection The collection to be fetched
 * @returns 
 */
export const getLastOraclePrice = async (collection: string) => {
    // If no collection is provided, return empty null
    if (!collection) return null;
    
    // Init mongo
    const mongo = new Mongo();
    // We want last provider price, so we need to limit only 1 result. 
    // Descending order on field _id is enabled by default
    let filters = {'page': 1, 'limit': 1, 'collection': collection};
    // Exit with results array
    const results = await mongo.getAll('prices', filters);
    // Return the first result
    return results[0];
}

/**
 * Return the last document in 'coin_price' mongo-collection (eth and sol).
 * @returns Primes array of [{eth:123.123, sol:456.123}]
 */
export const getLastCoinPrice = async () => {
    // Init mongo
    const mongo = new Mongo();
    // We want last provider price, so we need to limit only 1 result. 
    // Descending order on field _id is enabled by default
    let filters = {'page': 1, 'limit': 1};
    // Exit with results array
    const results = await mongo.getAll('coin_prices', filters);
    // Return the first result
    return results[0];
}

/* ************************************************************************* */
/* **************************** MongoDB WRITE functions ******************** */
/* ************************************************************************* */

/**
 * Update the price for a collection for a provider
 * @param provider      The provider to be updated
 * @param collection    The collection to be updated
 * @param price         The price value to be insert
 */
export const updateProviderPrice = async (provider: string, collection: string, price: number) => {
    // Initialize MongoDB
    const mongo = new Mongo();
    // Init configuration class
    const conf = new Config();
    // Init document to be stored in mongo DB
    let document = {};
    // Log in console
    console.log(
        "Provider '" + provider + "' value is valid, store in database"
    );
    // Create the document to be stored
    document = {
        "collection": collection,
        "api": conf.get('api_providers')[provider],
        "floor": price
    };
    // Store in database in sync mode
    const id = await mongo.store('provider_prices', document);
    // Log storing complete
    console.log("Stored with id: ", id);
}

/**
 * Update the choosen floor price for a collection
 * @param collection    The collection to be updated
 * @param price         The price value to be insert
 */
export const updateOraclePrice = async (collection: string, price: number) => {
    /** -------------------------- **/
    /** CASE OF VALID FLOOR PRICE **/
    /** -------------------------- **/
    
    // Initialize MongoDB
    const mongo = new Mongo();
    // Store the price because is good.
    let document = {
        "collection": collection,
        "oracle_price": price
    };
    // Store in database in sync mode
    return await mongo.store('prices', document);

    /** -------------------------- **/
    /**  CASE OF BAD FLOOR PRICE   **/
    /** -------------------------- **/

    // // Define the filters
    // const filters = {
    //     "page": 1, 
    //     "limit": 1, 
    //     "collection": collection
    // }
    // // Get the last floor price from the database
    // let lastFloorPrices = await mongo.getAll('prices', filters);
    // // TODO: magane case of no previous record stored by simple exit with warn
    // const lastFloorPrice = lastFloorPrices[0];
    // // TODO: calcolate the updated floor price
    // const newValue = lastFloorPrice.oracle_price * 1.2;
    // // Create the new document to be stored
    // const newFloorPrice = {
    //     "collection": collection,
    //     "oracle_price": newValue,
    //     // Increase the counter by 1, use it to delimiter how many times API
    //     // didn't return a valid floor price
    //     "count": lastFloorPrice.count + 1,
    // }
    // // Store in database in sync mode
    // await mongo.store('prices', newFloorPrice);
}

/**
 * Insert a new coin_price document in coin_pirces mongo-collection.
 * Note: timestamp is automatically added as now() if no passed.
 * @param priceData     The price data {eth:12.34, sol:23.45} to be insert
 * @returns Promise
 */
export const updateCoinPrice = async (priceData: object) => {
    // If eth or sol props of pricedata are null, avoid save and exit with false
    if (!priceData['eth'] || !priceData['sol']) return false;
    
    // Initialize MongoDB
    const mongo = new Mongo();
    // Store the price because is good.
    let document = {
        "eth_price": priceData['eth'],
        "sol_price": priceData['sol'],
    };
    // Store in database in sync mode
    return await mongo.store('coin_prices', document);
}

/**
 * Delete all collections inside the mongo database
 * @returns void
 */
export const dropAll = async () => {
    // Initialize MongoDB
    const mongo = new Mongo();
    // Get the names of each collection.
    const names = await mongo.listCollections();
    // Log user that is dropping all collections
    console.warn(
        "Warning: delete ", names.length, " all collections:", names
    );
    
    // Delete each collection
    for (let name of names) {
        // Delete the collection
        await mongo.drop(name);
    }

    // Console log that all collections are deleted
    console.log("Drop of ", names.length, " collections completed.");
    // Exit
    return true;
}
