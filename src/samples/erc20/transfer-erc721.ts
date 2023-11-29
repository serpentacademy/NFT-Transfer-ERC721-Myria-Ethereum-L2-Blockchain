import { v4 as uuidV4 } from "uuid";
import BN from "bn.js";
import { ethers } from "ethers";
import {
  TransferTokenParams,
  TransactionManager,
  MyriaClient,
  ItemSignableTransferParams,
  TokenType,
} from "myria-core-sdk";
export const QUANTUM = "1";
export const myriaTokenAddress = "0x83a795E1E91560Aae4207fDae9199d384f11D9d2";
const partnerRefId = "Myria-Internal-System";
const erc20Description = "Myria-Internal-System-Transfer-MYR-Tokens";

function convertNormalAmountToWei(amount: string): string {
  return ethers.utils.parseEther(String(amount)).toString();
}
export function convertAmountToQuantizedAmount(
  amount: number | string
): number {
  const wei = convertNormalAmountToWei(String(amount));
  const quantizedAmount = 1
  return quantizedAmount;
}

export async function transferERC20(
  client: MyriaClient,
  walletAddress: string,
  receiverWalletAddress: string,
  inputMyriaTokenAddress: string,
  amount: string
) {
  const transactionModule: TransactionManager = new TransactionManager(client);

  const ItemsTransfer: ItemSignableTransferParams[] = [
    {
        quantizedAmount: String(convertAmountToQuantizedAmount(amount)),
        tokenType: TokenType.ERC20,
        receiverWalletAddress: receiverWalletAddress,
        tokenData: {
            tokenAddress: inputMyriaTokenAddress,
            tokenId: "",
        },
    }
  ];
  const randomRequestID = uuidV4();
  const params: TransferTokenParams = {
    senderWalletAddress: walletAddress,
    items: ItemsTransfer,
    requestId: randomRequestID,
    groupRequestId: randomRequestID,
    partnerRefId: partnerRefId,
    description: erc20Description,
    isWaitingForValidation: false,
  };
  await transactionModule.transferERC721Token( {senderWalletAddress: "0x7EbB2Cc258C98C005b2571Ad08eE20b3b57B3f6f",
  senderPublicKey:"0x3eaf3eac26f9560c5c1538414e047723088195c6aebc4c06a3c2cb5d6b3402a", 
  receiverPublicKey:"0x2106562707b8674278b6e7eab343bf7ee531e754cc5eab7cb656e5889ea765a",
  tokenAddress:"0x74753e3fb12672d91e1035586cc75bc7f8c85522", 
  tokenId:"26",quantizedAmount:"1"

});
}
