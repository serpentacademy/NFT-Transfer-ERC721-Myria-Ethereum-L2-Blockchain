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
export const myriaTokenAddress = "0x74753e3fb12672d91e1035586cc75bc7f8c85522";
const partnerRefId = "Myria-Internal-System";
const erc20Description = "Myria-Internal-System-Transfer-MYR-Tokens";

function convertNormalAmountToWei(amount: string): string {
  return ethers.utils.parseEther(String(amount)).toString();
}
export function convertAmountToQuantizedAmount(
  amount: number | string
): number {
  const wei = convertNormalAmountToWei(String(amount));
  const quantizedAmount = Number(
    new BN(wei, 10).div(new BN(QUANTUM, 10)).toString()
  );
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
        tokenType: TokenType.ERC721,
        receiverWalletAddress: receiverWalletAddress,
        tokenData: {
            tokenAddress: inputMyriaTokenAddress,
            tokenId: "25",
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
  await transactionModule.bulkTransferERC20Token(params);
}
