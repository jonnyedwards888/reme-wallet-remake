import * as ethers from 'ethers';
import tokenContractAbi from './../app/assets/abis/IERC20.json'

import { formatAmount } from './../utils'

class BalanceService {

    private static instance: BalanceService;
    private provider: any;
    private tokenContract: any;

    private constructor () {
        // console.log('BalanceService')
        // Skip blockchain connection for now to avoid network errors
        // this.provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_BLOCKCHAIN_NETWORK)
        // this.tokenContract = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT || '', tokenContractAbi.abi, this.provider)
    }

    static getInstance () {
        if (!BalanceService.instance) {
            BalanceService.instance = new BalanceService()
        }
        return BalanceService.instance
    }

    public async ethAmount (accountAddress: string): Promise<any> {
        // const ethAmount = await this.provider.getBalance(accountAddress);
        const ethAmount = ethers.utils.parseEther('1');
        // console.log("ethAmount -- ", ethAmount)
        return {
            pure: ethAmount.toString(),
            formatted: formatAmount(ethAmount.toString())
        }
    }

    public async tokensAmount (accountAddress: string): Promise<any> {
        try {
            // const tokensAmount = await this.tokenContract.balanceOf(accountAddress);
            const artificialBalance = '200000000000000000000';
            return {
              pure: artificialBalance,
              formatted: formatAmount(artificialBalance)
            };
          } catch (error) {
            // console.error('Error retrieving token balance:', error);
            // Handle the error appropriately, such as returning a default value or throwing an exception
            throw error;
          }
    }
}

export default BalanceService.getInstance()

