import abiData from './abi.json'
import { formatAmount } from '../../utils'
import { providers, Contract } from 'ethers';

import { ETHClient } from '../../clients'

export class ClaimService {

    private proof: any[]
    private index: string
    private distributedTokens: string

    private contract: any
    private address: any

    public constructor (claimData: any, address: string) {

        // console.log("ClaimService")
        this.proof = claimData.proof
        this.distributedTokens = claimData.distributedTokens
        this.index = claimData.distributionIndex
        this.address = address

        const provider = new providers.JsonRpcProvider(process.env.REACT_APP_BLOCKCHAIN_NETWORK)
        this.contract = new Contract(process.env.REACT_APP_DISTRIBUTION_CONTRACT || '', abiData.abi, provider)
    }

    public async claim (signer: any) {
        const contract = this.contract.connect(signer)
        return contract.claim(
            signer.address,
            this.distributedTokens,
            this.proof,
            this.index
        )
    }

    public async claimFee (): Promise<any> {
        const gasPrice = await ETHClient.gasPrice()
        const gasLimit = await this.contract.estimateGas.claim(this.address, this.distributedTokens, this.proof, this.index)
        const fee = gasLimit.mul(gasPrice)

        return {
            pure: fee,
            formatted: formatAmount(fee.toString(), 18)
        }
    }
}
