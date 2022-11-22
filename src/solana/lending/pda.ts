import { PublicKey } from "@solana/web3.js";

export const findAdmin = (program) => {
    return PublicKey.findProgramAddress(
        [Buffer.from("admin")],
        program.programId
    );
}