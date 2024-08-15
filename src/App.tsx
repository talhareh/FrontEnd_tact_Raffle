import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { AppRoot, Button, Input } from '@telegram-apps/telegram-ui'
import { useRuffContract } from './hooks/useRuffContract'
import { useState } from 'react'
import { Address } from '@ton/core'

function App() {
    const [addr, setAddr] = useState('')
    const { walletList, getWalletList , submitWallet} = useRuffContract()

    const saveAddr = () => {
        console.log('clicked', addr)
        submitWallet(Address.parse(addr))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddr(e.target.value);
    };

    const handleGetList = async () => {
        await getWalletList();
        console.log('Updated list:', walletList);
    }

    return (
        <AppRoot>
            <div className='container m-2 p-2 '>
                <div className="count flex p-8 mt-8 bg-gray-200  items-center justify-center">
                    <TonConnectButton />
                </div>
                <div className="flex flex-col bg-gray-200 justify-center items-center pb-8 mb-4">
                    <Input
                        className='p-2 rounded-[15px]'
                        value={addr}
                        onChange={handleInputChange}
                        placeholder="Enter wallet address"
                    />
                    <Button className='mt-8 bg-[#0098EA] p-2 rounded-[15px]' onClick={saveAddr} mode="filled" size="s">
                        Add Wallet
                    </Button>
                </div>

                <div className="list flex flex-col gap-6 items-center">
                    <div>
                        Wallet List
                        <Button
                            className='bg-[#0098EA] ml-6 p-2 rounded-[15px]'
                            onClick={handleGetList}
                        >
                            Update
                        </Button>
                    </div>
                    <ul>
                        {walletList.map((wallet, index) => (
                            <li key={index} className='bg-gray-200 p-2 rounded-[15px] mb-4'>
                                <div>Address: {wallet.address}</div>
                                <div>Index Number: {wallet.randomNumber}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AppRoot>
    )
}

export default App
