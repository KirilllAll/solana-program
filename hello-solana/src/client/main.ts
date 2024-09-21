import {
  Connection,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import { fs } from "mz";
import path from "path";

import os from "os";

const KEY_PATH = path.join(os.homedir(), ".config", "solana", "id.json");

async function main() {
  console.log("Launch...");

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const secretKeyString = await fs.readFile(KEY_PATH, {
    encoding: "utf8",
  });

  const programId = new PublicKey(
    "AurSBVWpYqQmpTbq2givGMUEWStNwaksMu1P3ssT1npR"
  );

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: new PublicKey("3xsY1pZgQyZvQmzuybcqb93MiUGeRpurSVurwr1x9o2y"),
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
    data: Buffer.alloc(0),
  });

  try {
    await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [
        {
          publicKey: new PublicKey(
            "3xsY1pZgQyZvQmzuybcqb93MiUGeRpurSVurwr1x9o2y"
          ),
          secretKey: Uint8Array.from(JSON.parse(secretKeyString)),
        },
      ]
    );
    console.log("Transaction successful!");
  } catch (err) {
    console.error("SendTransactionError caught!");
    console.error("Transaction failed with message:", err.message);
  }
}

main().then(
  () => process.exit(),
  (err) => {
    console.error("Error in main:", err);
    process.exit(-1);
  }
);
