import 'dotenv/config';
import { AnchorProvider, BN, Idl, Program, Wallet } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import * as lending from './lending';
import * as telegram from '../telegram/bot';


export const LENDING_PROGRAM_PUBKEY = new PublicKey("4JM47H9t82cK6qtSdZLmnWwbTss6JPH7csJBZz5Qe68o");
export const ENV = 'mainnet';

export const getConnection = (env=ENV) => {
    if (env === "mainnet") return new Connection("https://api.mainnet-beta.solana.com");
    if (env === "testnet") return new Connection("https://api.testnet.solana.com");
    if (env === "devnet") return new Connection("https://api.devnet.solana.com");
    if (env === "local") return new Connection("http://127.0.0.1:8899");
}

export const getWallet = () => Wallet.local();

export const getAnchorProvider = (env) => {
    const wallet = getWallet();
    const connection = getConnection(env);
    return new AnchorProvider(connection, wallet, {});
}

export const getLendingProgram = (env=ENV) => {
    return new Program(
        lending.IDL as Idl, 
        LENDING_PROGRAM_PUBKEY, 
        getAnchorProvider(env)
    );
}

export const bn = (value, decimals) => {
    return new BN(Math.round(value * 10 ** decimals).toString())
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const RETRIES = 3;
export const safeUpdate = async (call, name) => {
    for (let i = 0; i < RETRIES; i++) {
        try {
            const result = await call();
            console.log(`Successfully updated ${name}`);
            telegram.logError("ORACLE",  `Successfully updated ${name}`);
            return;
        } catch {
            // Potentially being rate limited so just chill for a sec
            if (i < RETRIES - 1) await sleep(10_000);
        }
    }
    telegram.logError("ORACLE",  `Failed to update ${name}`);
    console.log(`Failed to update ${name}`);
}
