import { useState } from 'react'
import './App.css'
import { TonConnectButton, } from '@tonconnect/ui-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container m-2 p-2'>
      <div className="count flex p-8 mt-8 w-300 h-200 items-center justify-center">
        <div className="wall">
          
        </div>
        <TonConnectButton/>
      </div>
    </div>
  )
}

export default App
