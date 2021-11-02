import logo from './logo.svg'
import React from 'react'
import './App.css'
import { initReach, getAccount } from 'utils'
import { ReachAccount } from 'types/shared'
// @ts-ignore
import * as backend from 'reach/build/index.main.mjs'

function App() {
  const [account, setAccount] = React.useState<ReachAccount | null>(null)
  const [contract, setContract] = React.useState<any>(null)
  const [isReady, setReady] = React.useState(false)
  const [hittingApi, setApiStatus] = React.useState(false)

  React.useEffect(() => {
    initReach()
  })

  const connectWallet = async () => {
    const account = await getAccount()
    const contract = account.contract(backend)
    const Ainterface = {
      notify: () => {
        setReady(true)
        console.log('YAYYYY')
      },
    }
    backend.A(contract, Ainterface)
    setAccount(account)
    setContract(contract)
  }

  const callApi = async () => {
    if (!isReady) {
      console.log('Not Ready...Please Wait...')
      return
    }
    try {
      setApiStatus(true)
      const ctc: any = account?.contract(backend, contract.getInfo())
      const bobApi = ctc.a.B
      console.log('bobApi:', bobApi)
      const test = await bobApi.helloWorld()
      setApiStatus(false)
      console.log('Woohoo:', test)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {account && !isReady && <p>Initializing app. Please Wait...</p>}
        {account && isReady && 
          <button disabled={hittingApi} onClick={callApi}>
            {hittingApi ? 'Wait...' : 'Call API'}
          </button>}
        {!account && <button onClick={connectWallet}>Connect Wallet</button>}
      </header>
    </div>
  )
}

export default App
