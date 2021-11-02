import { loadStdlib } from '@reach-sh/stdlib'
import MyAlgoConnect from '@reach-sh/stdlib/ALGO_MyAlgoConnect'

let reach: any

export const initReach = () => {
  if (reach) return
  reach = loadStdlib({
    REACH_CONNECTOR_MODE: 'ALGO',
    // REACH_DEBUG: 'yes',
  })
  reach.setWalletFallback(
    reach.walletFallback({
      providerEnv: 'TestNet',
      MyAlgoConnect,
    })
  )
}

export const getAccount = () => reach.getDefaultAccount()

