import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { Ruffruff, SubmitWallet, TransferToHoldingWallet, WalletResponse } from "../wrappers/Ruffruff";
import { Address, OpenedContract, Dictionary, toNano } from "@ton/core";
import { useState } from "react";
import { useTonConnect,} from "./useTonConnect";

type WalletInfo = {
    address: string;
    randomNumber: number;
};

export function useRuffContract() {
    const { client } = useTonClient();
    const {sender} = useTonConnect()
    const [walletList, setWalletList] = useState<WalletInfo[]>([]);

    const ruffCon: OpenedContract<Ruffruff> | undefined = useAsyncInitialize(async () => {
        if (!client) return;

        const contract = Ruffruff.fromAddress(Address.parse("kQC7AGTh1uEb3yLVGQn699LR0dEvbSKjiiry6n6qFIF1Smcr"));

        return client.open(contract) as OpenedContract<Ruffruff>;
    }, [client]);

    const getWalletList = async () => {
        if (!ruffCon) return;
        setWalletList([]);
        try {
            const res: Dictionary<Address, WalletResponse> = await ruffCon.getSubmittedWallets() ;
            console.log('Fetched Wallets:', res);

            const walletArray: WalletInfo[] = [];

            const keys = res.keys();
            const values = res.values();

            for (let i = 0; i < keys.length; i++) {
                walletArray.push({
                    address: keys[i].toString(),
                    randomNumber: Number(values[i].randomNumber),
                });
            }

            setWalletList(walletArray);
            console.log('setList : ',walletList)
        } catch (error) {
            console.error("Error fetching wallet list:", error);
        }
    };


    return {
        walletList,
        getWalletList,
        submitWallet : (addr : Address) =>{
          const message: SubmitWallet ={
            $$type:"SubmitWallet",
            address:addr,
          }
          ruffCon?.send(sender, {
              value: toNano("0.00")
          },message)
        },
        joinPool:(amount: number ) =>{
            const message : TransferToHoldingWallet = {
                $$type:"TransferToHoldingWallet",
                amount:toNano(amount),
            }
            ruffCon?.send(sender, {
                value:toNano(amount)
            }, message )
        }
    };
}
