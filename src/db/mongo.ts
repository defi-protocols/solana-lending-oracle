import * as mongoDB from "mongodb";
import { ObjectId } from "mongodb";
import { Sort } from "mongodb";

// Import config class
import { Config } from './config';
import { Utils } from './utils';


// const mongo = new Mongo();
// let prices = await mongo.getAll('prices', {'page': 1, 'limit': 100});
// console.log("PRICES:", [prices]);
// await mongo.drop('prices');
// prices = await mongo.getAll('prices', {'page': 1, 'limit': 100});
// await mongo.store('provider_prices', {collection: 'smb', api: 'magic_eden', floor: 1.40})
// await mongo.store('provider_prices', {collection: 'smb', api: 'open_sea', floor: 1.48})
// const pprices = await mongo.getAll('provider_prices', {'page': 1, 'limit': 1, 'collection': 'melt-labs'});
// console.log("EXIT:", [prices, pprices]);
// return 1;

// mongo.drop('prices');
//     mongo.drop('provider_prices');
//     console.log("done")
//     return true;


export class Mongo {
    // Set client as a class property
    client: mongoDB.MongoClient;

    /**
     * Connect to MongoDB
     * @returns {MongoClient}   MongoDB Client with DB selected
     */
    connect = async () => {
        // Init configuration class
        const conf = new Config();
        // Get mongo configurations
        const confs = conf.get('mongo');
        // Compose url
        const url = "mongodb://" + confs.host + ":" + confs.port + "/";
        // Create a client and connect to mongo
        this.client = new mongoDB.MongoClient(url);
        // Connect to MongoDB cluster
        const db = await this.client.connect();
        // Select DB
        const dbo = db.db(confs.db);
        // Reutrn DB
        return dbo;
    }

    /**
     * Make a query to MongoDB
     * @param   {string} collection     Collection name
     * @param   {object} query          Query object
     * @param   {object} sort           Sort object
     * @returns {array}                 An array of objects
     */
    doQuery = async (collection: string, query?: object, sort?) => {
        // Log query
        // console.log("CollectionController@doQuery", [collection, query]);
        // If skip is defined use it as integer, otherwise use null
        const skip = query['skip'] ? parseInt(query['skip']) : null;
        // Remove skip from query
        delete query['skip'];
        // If limit is defined use it as integer, otherwise use null
        const limit = query['limit'] ? parseInt(query['limit']) : null;
        // Remove limit from query
        delete query['limit'];

        // Connect to mongo db
        const db = await this.connect();
        // Get collection
        let cursor = db.collection(collection).find(query)

        // If skip is defined, assign to cursor
        if (skip) cursor = cursor.skip(skip);

        // If limit is defined, assign to cursor
        if (limit) cursor = cursor.limit(limit);

        // Add sort
        cursor.sort(sort);

        // Fetch records
        const records = await cursor.toArray()
        // Close connection
        // cursor.close();
        // Close connection
        await this.client.close();
        // Return records
        return records;
    }

    /**
     * Validate query passed from client and return a safty query object with
     * key and value parsed.
     * @param   {object} query  Query object
     * @returns {object}        A query object
     */
    validateQuery = (query) => {
        // Init query if not passed
        query = query || {};
        // Init configuration class
        const conf = new Config();
        // Define the mandatory field and values
        const mandatory = conf.get('mandatory_fields');

        // Check if all mandatory fields are present
        for (let key in mandatory) {
            // If not preset, provide the default value
            if (!query[key]) query[key] = mandatory[key];
        }

        // If query has page and limit
        if (query['page'] && query['limit']) {
            // Calcolate skip and assign
            query['skip'] = (query['page'] - 1) * query['limit'];
            // Remove page
            delete query['page'];
        }

        // If query has id
        if (query['id']) {
            // Set _id in query and  set is as ObjectId
            query['_id'] = new ObjectId(query['id']);
            // Remove id
            delete query['id'];
        }

        // Return query
        return query;
    }

    /**
     * Get all collections
     * @param   {string} collection   Mongo Collection name
     * @param   {object} query        Query object
     * @param   {object} sort         Sort object
     * @returns {array}               An array of objects
     */
    async getAll (collection: string, query?: object, sort?: object) {
        // If collection is not defined, return error
        if (!collection) {
            console.warn("Collection name is required");
            return [];
        }

        // Return the correct query object
        query = this.validateQuery(query);
        // If sort is defiend use it, othwise use default descending
        sort = sort || {$natural : -1};
        // Fetch records
        const records = await this.doQuery(collection, query, sort);
        // Return response
        return records;
    }

    /**
     * Save a document into MongoDB collection passed.
     * As default, all record inserted will have a timestamp based on now date.
     * If a record already has a timestamp prop, will not be modified.
     * If you don't want to have a timestamp, pass avoidTimestamp=true param.
     *
     * For now we have 2 mongo collections:
     * - provider_prices: {collection: 'smb', api: 'magic_eden', floor: 1.20}
     * - prices: {collection: 'smb', oracle_price: 1.288883, count:1}
     * (each record has a timestamp as default, count is 1 as default)
     *
     * @param   {string}    collection      Mongo Collection name
     * @param   {object}    document        Document object
     * @param   {boolean}   avoidTimestamp  If true avoid insert auto-timestamp
     * @returns {object}                    A single object with docuemnt _id
     *
    */
    store = async (collection: string, document: object, avoidTimestamp?: boolean) => {
        // If collection is not defined, return error
        if (!collection) {
            console.warn("Warning: Collection name is required!")
            return;
        }

        // If document is an empty object
        if (Object.keys(document).length === 0) {
            console.warn("Warning: Document is required!")
            return;
        }

        // If has timestamp AND if document already has not a timestamp
        if (!avoidTimestamp && !document['timestamp']) {
            // Compose timestamp
            const now = Utils.dateFormat(new Date());
            // Check i if not add it
            document['timestamp'] = now;
        }

        // Connect to mongo db
        const db = await this.connect();
        // Insert document
        const result = await db.collection(collection).insertOne(document);
        // Close client
        await this.client.close();
        // Return result id
        return result.insertedId;
    }

    /**
     * Delete all collection documents.
     * @param string collection     Collection name
     * @returns
     */
    drop = async (collection: string) => {
        // If collection is not defined, return error
        if (!collection) return {message: 'Collection name is required'}

        // Warn user about the action that will be performed
        console.warn(
            "\n\n\nWARNING: You are dropping collection '" + collection + "'."
            + "\nAll data will be lost, this action is not reversible.\n"
            + "I hope you know what you are doing.\n\n"
            + "Operation will start in 5 seconds.\n\n"
        );
        // Wait 5 seconds
        await Utils.wait(5000);
        // Connect to mongo db
        const db = await this.connect();
        // Drop collection
        const result = await db.collection(collection).drop();
        // Log success
        console.log("Collection " + collection + " dropped.\n\n\n");
        // Close connection
        await this.client.close();
        // Return result
        return result;
    }

    /**
     *  Return the array of all collections' name inside the database.
     * @returns array   The array of names of the collections in mongo
     */
    listCollections = async () => {
        // Connect to mongo db
        const db = await this.connect();
        // List for all collections
        const names = await db.listCollections().toArray();
        // Close connection
        await this.client.close();
        // reutrn names array connection
        return names.map(obj => obj.name);
    }

}
