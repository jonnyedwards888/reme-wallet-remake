import React, { Component, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { PasswordConfirmationRender } from './renderers'

import { ErrorPopUp } from '../../errors'
import { WalletService, ClaimService, UserService } from '../../../services'


type State = {
    loading: boolean
    txFee: any
    password: string
    claimService: any
    ethBalance: string
    tokensForClaiming: string
}

// Wrapper component to provide router hooks
const ClaimTransactionWrapper = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <ClaimTransaction navigate={navigate} location={location} />
}

class ClaimTransaction extends Component<{ navigate: any, location: any }, State> {

    public constructor (props: any) {
        super(props)

        if (this.props.location.state === undefined ||
            this.props.location.state.ethBalance === undefined) {
            return this.props.navigate('/dashboard')
        }

        this.onPassword = this.onPassword.bind(this)
        this.confirmTransaction = this.confirmTransaction.bind(this)

        this.state = {
            loading: false,
            txFee: {},
            password: '',
            claimService: {},
            ethBalance: this.props.location.state.ethBalance,
            tokensForClaiming: ''
        }
    }

    public async componentDidMount () {
        const token = localStorage.getItem('token') || ''
        const claimData = await UserService.getClaimData(token)
        const user = JSON.parse(localStorage.getItem('user') || '')

        const claimService = new ClaimService(claimData, user.wallet.address)
        const txFee = await claimService.claimFee()

        this.setState({
            claimService,
            txFee: txFee,
            tokensForClaiming: user.tokensForClaiming
        })
    }

    public render (): ReactNode {
        return (
            <section className='wrapper claim-wrapper'>
                <h2>Confirm transaction by entering your password</h2>
                <div className='common-wrapper'>
                    {PasswordConfirmationRender(this)}
                </div>
            </section>
        )
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public async confirmTransaction () {
        try {
            this.setState({ loading: true })
            const user = JSON.parse(localStorage.getItem('user') || '')
            const signer = await WalletService.loadSignerFromWallet(user.wallet.json, this.state.password)

            if (this.state.txFee.pure.gt(this.state.ethBalance)) {
                this.setState({ loading: false })
                return this.props.navigate('/insufficient-balance', { 
                    state: {
                        txFee: this.state.txFee.formatted,
                        address: user.wallet.address
                    }
                })
            }

            await this.state.claimService.claim(signer)

            this.setState({ loading: false })
            this.props.navigate('/dashboard', { 
                state: {
                    txBroadcasted: true
                }
            })
        } catch (error) {
            this.setState({ loading: false })

            // if (error.message.includes('Invalid Wallet')) {
            //     return ErrorPopUp.show('Incorrect password')
            // }
            ErrorPopUp.show('Claim failed!')
        }
    }
}

export default ClaimTransactionWrapper
