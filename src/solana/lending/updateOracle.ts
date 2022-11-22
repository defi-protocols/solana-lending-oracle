import * as pda from './pda';

export const updateOracle = async (program, payer, oracle, price) => {
    const [admin, ] = await pda.findAdmin(program);
    await program.methods
        .updateOracle(price)
        .accounts({
            admin,
            authority: payer.publicKey,
            oracle,
        })
        .rpc();
}