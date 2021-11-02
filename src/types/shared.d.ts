/** A reach-connected Network Account representation */
export type ReachAccount = {
  networkAccount: { addr?: string; address?: string; [x: string]: any }
  attach(backendModule: any, ctc: any): Promise<any>
  deploy(backendModule: any): Promise<any>
  contract(backendModule: any, contractInfo?: string): Promise<any>
  getAddress(): string
  tokenMetadata(tokenId): Promise<{ [x: string]: any }>
  setDebugLabel(label: string): ReachAccount
  tokenAccept(tokenId: string | number): Promise<void>
}