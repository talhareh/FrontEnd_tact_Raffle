import { useState } from 'react'
import './App.css'
import { TonConnectButton, } from '@tonconnect/ui-react'
import { AppRoot,  Button, Input } from '@telegram-apps/telegram-ui'
import { useTonConnect } from './hooks/useTonConnect'

function App() {

  const {network} = useTonConnect()
  const [addr, setAddr] = useState('')

  const saveAddr = ()=>{
    console.log('clicked', addr)
    setAddr('')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    setAddr(e.target.value);
  };

  const getList = () =>{
    console.log('getting list')

  }

  return (
    <AppRoot>
    <div className='container m-2 p-2 '>
      <div className="count flex p-8 mt-8 bg-gray-200  items-center justify-center">
        <TonConnectButton/>
      </div>
      <div className="flex flex-col bg-gray-200 justify-center items-center pb-8 mb-4">
        <Input
          className='p-2 rounded-[15px] '
          value={addr}
          onChange={handleInputChange}
          placeholder="Enter wallet address"
        />
        <Button className = 'mt-8 bg-[#0098EA] p-2 rounded-[15px] ' onClick={saveAddr} mode = "filled" size="s">Add Wallet</Button>
      </div>

      <div className="list flex gap-6 items-center">
        Wallet List
        <Button 
          className = 'bg-[#0098EA] p-2 rounded-[15px]'
          onClick={getList}
        >
          Update
        </Button>
      </div>
      
    </div>
    </AppRoot>
  )
}

export default App
