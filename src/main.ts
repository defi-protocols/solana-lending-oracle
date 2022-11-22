import * as db from './db';
import * as api from './api';
import * as prices from './prices';
import config from './config.json';
import * as utils from './utils';
import * as solana from './solana';
import { PublicKey } from '@solana/web3.js';

const main = async () => {
    // Init coin price
    let coinPrice;

    // Try db operation
    try {
        // Load last eth and sol price in mongo
        coinPrice = await db.getLastCoinPrice()
            || {eth_price: 0, sol_price: 0, timestamp: 0};
    } catch(e) {
        // Log error
        console.error(e);
        // Set default
        coinPrice = {eth_price: 0, sol_price: 0, timestamp: 0};
    }

    // Fetch some price information (eth, sol) we need to convert floors
    let priceData: prices.PriceData = await prices.getPriceData(
        coinPrice.eth_price, coinPrice.sol_price
    );

    // Try db operation
    try {
        // store eth and sol price in mongo
        db.updateCoinPrice(priceData);
    } catch(e) {
        // Log error
        console.error(e);
        // Exit with error
        process.exit(1);
    }

    // Iterate each collections that we want to update
    for (let collection of config.collections) {

        // Init oracle var
        let oracle = null;

        // Try db operation
        try {
            // Fetch db or, if no results was found, create a 0 valued object.
            oracle = await db.getLastOraclePrice(collection.name)
                || {oracle_price: 0, timestamp: 0};
        } catch(e) {
            // Log error
            console.error(e);
            // Create default value
            oracle = {oracle_price: 0, timestamp: 0};
        }

        // Get the last oracle price, if we don't have one, init an empty one
        // Fetch the floors for this collection
        const floors = {};
        priceData = utils.calculatePriceData(priceData, coinPrice.eth_price, coinPrice.sol_price, coinPrice.timestamp);

        // Iterate each provider API we want to use
        for (let apiName of collection.apis) {

            // getFloor returns the floor in $USD
            floors[apiName] = await api.getFloor(apiName, collection, priceData);
            // Save the api floor in the DB for later
            if (!utils.isMissing(floors[apiName])) {

                // Try db operation
                try {
                    // Save provider price for current API and current Collection
                    db.updateProviderPrice(
                        apiName, collection.name, floors[apiName]
                    );
                } catch(e) {
                    // Log error
                    console.error(e);
                    // Exit with error
                    process.exit(1);
                }

            }

        }

        // Calculate the real floor
        let floor = utils.calculateFloor(floors, oracle.oracle_price, oracle.timestamp);
        floor = utils.washTradePrevention(floor, oracle.oracle_price);

        console.log(collection.name);
        console.log("old oracle info", oracle);
        console.log("api floors:", floors);
        console.log("calculated floor:", floor);

        // Try db operation
        try {
            // Save oracle price in DB
            db.updateOraclePrice(collection.name, floor);
        } catch(e) {
            // Log error
            console.error(e);
            // Exit with error
            process.exit(1);
        }

        // Update oracle on solana
        if ("oracle" in collection) {

            // Solana wallet and lending program
            const payer = solana.utils.getWallet();
            const program = solana.utils.getLendingProgram();
            const floorBN = solana.utils.bn(floor, 6);
            const oraclePublicKey = new PublicKey(collection.oracle);
            solana.utils.safeUpdate(
                 () => solana.lending.updateOracle(program, payer, oraclePublicKey, floorBN),
                collection.name
            );

        }

    }

    console.log("\n\n================= CHECK SAVED DATA =================\n");

    // Init coin price
    let cp = {};

    // Try db operation
    try {
        // Fetch the last cpom price
        cp = await db.getLastCoinPrice();
    } catch(e) {
        // Log error
        console.error(e);
        // Exit with error
        process.exit(1);
    }

    // Log the price
    console.log(
        "Coin Prices => eth: " + cp['eth_price'] + ", sol: " + cp['sol_price']
    );

    // Iterate each collections updated
    for (let collection of config.collections) {

        // Iterate each provider API we updated
        for (let apiName of collection.apis) {
            // Init price
            let price = {};

            // Try db operation
            try {
                // Fetch the last provider price for current collection
                // and current API
                price = await db.getLastProviderPrice(
                    apiName, collection.name
                );
            } catch(e) {
                // Log error
                console.error(e);
                // Exit with error
                process.exit(1);
            }

            // Log the price
            console.log(
                "Collection '" + collection['name']
                + "' for Provider '" + apiName
                + "' has price: " + price['floor']
            );
        }

        // Fetch the last oracle price for current collection
        let oracle = {};

        // Try db operation
        try {
            // Fetch the last oracle price for current collection
            oracle = await db.getLastOraclePrice(collection.name);
        } catch(e) {
            // Log error
            console.error(e);
            // Exit with error
            process.exit(1);
        }

        // Log the price
        console.log(
            "Collection '" + collection['name']
             + "' has oracle: " + oracle['oracle_price']
        );
    }
    console.log("\n================= END =================\n\n");
    // Log timer start
    console.log("\nProcess kill timer Start...\n");
    // Start a timer for 120 secs to avoid killing ascync call still on going
    setTimeout(() => {
        console.log("Process kill timer Stop!\n\n");
        // Exit with success
        process.exit(0);
    }, 120000);

}

main();
