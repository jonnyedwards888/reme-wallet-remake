import { providers, Wallet } from 'ethers'

export class WalletService {
    static async loadSignerFromWallet (json: string, password: string) {
        try {
            const provider = new providers.JsonRpcProvider(process.env.REACT_APP_BLOCKCHAIN_NETWORK)
            const wallet = await WalletService.fromEncryptedJson(json, password)
            const signer = wallet.connect(provider)
            return signer
        } catch (error) {
            // console.log(error)
            throw new Error('Invalid Wallet')
        }
    }

    static async randomWallet (password: string) {
        const wallet = Wallet.createRandom();
        const walletJson = await wallet.encrypt(password);

        return {
            address: wallet.address,
            mnemonic: wallet.mnemonic,
            json: walletJson
        }
    }

    static async fromEncryptedJson (json: any, password: string): Promise<Wallet> {
        return Wallet.fromEncryptedJson(json, password);
    }

    static fromMnemonic (mnemonic: any): Wallet {
        return Wallet.fromMnemonic(mnemonic);
    }
}
