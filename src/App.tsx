import './App.css'
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react'
import { AppRoot, Button, Input } from '@telegram-apps/telegram-ui'
import { useRuffContract } from './hooks/useRuffContract'
import { useState } from 'react'
import { Address } from '@ton/core'


function App() {
    const [addr, setAddr] = useState('')
    const [poolType, setPoolType] = useState('hourly') // State to track selected pool
    const { walletList, 
            getWalletList , 
            submitWallet, 
            joinPool,
        } = useRuffContract()
    const  wallet  = useTonWallet() // Get the connected wallet

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

    const handlePoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPoolType(e.target.value);
    };

    const handleJoinPool = () => {
        console.log(`Joined ${poolType === 'hourly' ? 'Hourly Pool' : 'Daily Pool'}`);
        joinPool(1.5)
    };

    return (
        <AppRoot>
            <div className='container m-2 p-2'>
                <div className="count flex p-8 mt-8 bg-gray-200 items-center justify-center">
                    
                    <TonConnectButton />
                    {wallet && (
                        <Button 
                            className='ml-4 bg-[#0098EA] p-2 rounded-[15px]' 
                            onClick={handleJoinPool} 
                            mode="filled" 
                            size="s">
                            Join Raffle
                        </Button>
                    )}
                </div>

                <div className="mt-4 flex gap-4 items-center justify-center mb-4">
                        <label>
                            <input 
                                type="radio" 
                                name="poolType" 
                                value="hourly" 
                                checked={poolType === 'hourly'} 
                                onChange={handlePoolChange} 
                            />
                            Hourly Pool
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="poolType" 
                                value="daily" 
                                checked={poolType === 'daily'} 
                                onChange={handlePoolChange} 
                            />
                            Daily Pool
                        </label>
                </div>

                <div className="flex flex-col bg-gray-200 justify-center items-center pb-8 mb-4 pt-8">
                    <Input
                        className='p-2 rounded-[15px]'
                        value={addr}
                        onChange={handleInputChange}
                        placeholder="Enter wallet address"
                    />
                    
                    <Button 
                        className='mt-8 bg-[#0098EA] p-2 rounded-[15px]' 
                        onClick={saveAddr} 
                        mode="filled" 
                        size="s">
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
