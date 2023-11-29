import React, { useState, useRef } from "react";
import { MyriaClient } from "myria-core-sdk";
import {
  myriaTokenAddress,
  transferERC20,
} from "../samples/erc20/transfer-erc721";
 import Web3 from "web3";
import { toast } from "react-toastify";

type Props = {
  account: string;
  client: MyriaClient;
  isConnected: boolean;
};

const TransferERC20Token = ({ account, client, isConnected }: Props) => {
  const [receiverWalletAddress, setReceiverWalletAddress] =
    useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [inputTokenAddress, setInputTokenAddress] =
    useState<string>(myriaTokenAddress);
  const [errorAction, setErrorAction] = useState<string | undefined>(undefined);

  const refReceiverWalletAddress = useRef<HTMLInputElement>();
  const refAmount = useRef<HTMLInputElement>();
  const refTokenAddress = useRef<HTMLInputElement>();

  const onReceiverAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReceiverWalletAddress(event.target.value);
  };

  const onTokenAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTokenAddress(event.target.value);
  };

  const onTransfer = async () => {
    try {
      
        
        await transferERC20(
          client,
          account,
          "0x7EbB2Cc258C98C005b2571Ad08eE20b3b57B3f6f",
          "0x74753e3fb12672d91e1035586cc75bc7f8c85522",
          "1"
        );
        toast("Transfer success !", { type: "success" });
      
    } catch {
      toast("Transfer failed !", { type: "error" });
    }
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className="list-form p-4 mt-3">
      <h4 className="text-white">Transfer Token</h4>
      <div className="form-row mt-3">
        <p className="mb-2 fs-6">Sample Myria Token Address (Testnet)</p>
        
        {errorAction ? <span className="text-error">{errorAction}</span> : null}
        <div className="col mt-4">
          <button
            onClick={() => onTransfer()}
            className={`btn-mry fw-bold ${
              isConnected ? "bg-warning text-dark" : "btn-secondary text-muted"
            }`}
            disabled={!isConnected}
          >
            Transfer ERC721 Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferERC20Token;
