import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { Ruffruff } from "../wrappers/Ruffruff";
import { Address, OpenedContract } from "@ton/core";
import { useState } from "react";

export function useRuffContract(){
    const {client} = useTonClient()

    const [list, setList] = useState(null)

    const ruffCon: OpenedContract<Ruffruff> | undefined = useAsyncInitialize( async()=>{
        if(!client) return;

        const contract =  Ruffruff.fromAddress(Address.parse("EQB7vFlIfwZvW2uJWkBZmYTMNE5XiAPmGVE-Sq5MrWKlYWpW"))

        return client.open(contract) as OpenedContract<Ruffruff>
    }, [client])

    
    return {ruffCon}

    
}
