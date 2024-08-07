import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { Ruffruff } from "../wrappers/Ruffruff";
import { Address, OpenedContract } from "@ton/core";

export function useRuffContract(){
    const {client} = useTonClient()

    const ruffCon = useAsyncInitialize( async()=>{
        if(!client) return;

        const contract = Ruffruff.fromAddress(Address.parse("EQB7vFlIfwZvW2uJWkBZmYTMNE5XiAPmGVE-Sq5MrWKlYWpW"))

        return client.open(ruffCon) as OpenedContract<Ruffruff>
    }, [client])

    
}