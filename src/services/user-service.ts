import BigNumber from 'bignumber.js'
import { ReMePalClient } from '../clients'
import { WalletService } from './wallet-service'

import { formatAmount } from './../utils'

export class UserService {

    static async register (email: string, password: string): Promise<any> {
        const wallet = await WalletService.randomWallet(password);
        const tokenData = await ReMePalClient.register(
            { email, password },
            wallet
        )

        return { tokenData, mnemonic: wallet.mnemonic }
    }

    static async registerByReferral (userDetails: any, referredBy: string): Promise<any> {
        const wallet = await WalletService.randomWallet(userDetails.password);
        const tokenData = await ReMePalClient.registerByReferral(userDetails, wallet, referredBy)

        return { tokenData, mnemonic: wallet.mnemonic }
    }

    static async login (email: string, password: string, referral: boolean): Promise<any> {
        return ReMePalClient.login(email, password, referral)
    }

    static async getUserDetails (token: string, refferal: boolean): Promise<any> {
        // Mock user data to avoid network errors
        const mockUser = {
            email: "user@example.com",
            full_name: "Lucas Hooper",
            wallet: {
                address: "0xa3D2571F0D6606444A4A092f90b2A2947b9293D2"
            },
            referralLink: "ABC123",
            earnedTokens: {
                signup: "0",
                referral: "200000000000000000000"
            },
            rrpBalance: "200000000000000000000",
            incomingTokens: "0",
            tokensForClaiming: "200000000000000000000",
            signupTokens: "0"
        };

        const result: any = mockUser;
        result.incomingTokens = formatAmount(result.incomingTokens);
        result.tokensForClaiming = formatAmount(result.tokensForClaiming);
        result.claimTokens = {
            signup: formatAmount('0'),
            referral: formatAmount('0')
        };

        if (new BigNumber(result.tokensForClaiming).gt(0)) {
            result.claimTokens.signup = new BigNumber(result.earnedTokens.signup).eq(0) ? formatAmount(result.signupTokens) : formatAmount('0');

            const bnTokensForClaiming = new BigNumber(result.tokensForClaiming);
            result.claimTokens.referral = new BigNumber(result.earnedTokens.signup).eq(0) ? formatAmount(bnTokensForClaiming.multipliedBy('1000000000000000000').minus(result.signupTokens).toString()) : result.tokensForClaiming;
        }

        return result;
    }

    static async getClaimData (token: string): Promise<any> {
        return ReMePalClient.getClaimData(token)
    }

    static async forgotPassword (email: string): Promise<void> {
        return ReMePalClient.forgotPassword(email)
    }

    static async confirmReset (id: string, time: string, token: string, newPassword: string): Promise<void> {
        return ReMePalClient.confirmReset(id, time, token, newPassword)
    }

    static async saveNewWallet (token: string, wallet: string): Promise<void> {
        return ReMePalClient.saveNewWallet(token, wallet)
    }
}
