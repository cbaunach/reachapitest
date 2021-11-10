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
  const [contractID, setContractID] = React.useState<number | undefined>()
  const inputRef = React.createRef<HTMLInputElement>()

  React.useEffect(() => {
    initReach()
  })

  const connectWallet = async () => {
    const account = await getAccount()
    let ctcID
    const ctcInput = (inputRef.current?.value || '')
    if (ctcInput.length === 0) {
      const contract = account.contract(backend)
      const Ainterface = {
        notify: () => {
          setReady(true)
          console.log('YAYYYY')
        },
      }
      backend.A(contract, Ainterface)
      ctcID = await contract.getInfo()
      console.log(ctcID, typeof ctcID)
      setContractID(ctcID)
    } else {
      ctcID = parseInt(ctcInput)
      setContractID(ctcID)
      setReady(true)
    }
    setAccount(account)
    setContract(ctcID)
  }

  const callApi = async () => {
    console.log('called')
    if (!isReady) {
      console.log('Not Ready...Please Wait...')
      return
    }
    try {
      setApiStatus(true)
      const ctc: any = account?.contract(backend, contract)
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
        {!account && (
          <>
            <input ref={inputRef} type="text" />
            <button onClick={connectWallet}>Connect Wallet</button>
          </>
        )}
        <p>{contractID}</p>
      </header>
    </div>
  )
}

export default App
