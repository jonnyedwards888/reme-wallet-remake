import copy from 'copy-to-clipboard';
import React, { Component, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { DashboardRender } from './renderers'

import { clearLocalStorage } from '../helpers'

import { BalanceService, UserService } from '../../../services'
import { ErrorPopUp } from '../../errors';
// import { ErrorPopUp } from '../../errors';



type State = {
    email: string
    address: string
    ethBalance: any
    tokensBalance: any
    referralCode: string
    referralPlatformUserLink: string
    claimTokens: any
    tokensForClaiming: string
    copiedCode: boolean
    copiedWalletAddress: boolean
    txBroadcasted: boolean
    full_name: string,
    isMenuVisible: boolean,
}

// Wrapper component to provide router hooks
const DashboardWrapper = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <Dashboard navigate={navigate} location={location} />
}

class Dashboard extends Component<{ navigate: any, location: any }, State> {

    public constructor (props: any) {
        super(props)

        this.claim = this.claim.bind(this)
        this.copyReferralCode = this.copyReferralCode.bind(this)
        this.copyWalletAddress = this.copyWalletAddress.bind(this)
        this.handleNavClick = this.handleNavClick.bind(this)

        const txBroadcasted = this.props.location.state && this.props.location.state.txBroadcasted
        if (txBroadcasted) {
            let state = { ...this.props.location.state };
            delete state.txBroadcasted;
            this.props.navigate(this.props.location.pathname, { 
                state,
                replace: true 
            });
        }

        this.state = {
            email: '',
            address: '',
            ethBalance: {},
            tokensBalance: {},
            referralCode: '',
            referralPlatformUserLink: '',
            claimTokens: {},
            tokensForClaiming: '0.0000',
            copiedCode: false,
            copiedWalletAddress: false,
            txBroadcasted,
            full_name: '',
            isMenuVisible: false,
        }
    }

    public async componentDidMount () {
        try {
            // console.log(window.location)
            const token = localStorage.getItem('token') || ''
            const encToken = localStorage.getItem('encToken')
            // console.log('encToken getting from local')
            // console.log(encToken)

            const user = await UserService.getUserDetails(token, localStorage.getItem('refferal') === 'true' ? true : false)
            localStorage.setItem('user', JSON.stringify(user))


            const ethBalance = await BalanceService.ethAmount(user.wallet.address)
            // console.log("ethAmount -- ", ethBalance)

            const tokensBalance = await BalanceService.tokensAmount(user.wallet.address)

            if(localStorage.getItem('refferal') === 'true'){
                ErrorPopUp.sucsess("Congratulations you've earned 20 CAPs.");
                localStorage.setItem('refferal', 'false')
            }


            this.setState({
                email: user.email,
                address: user.wallet.address,
                ethBalance,
                tokensBalance,
                referralCode: `${window.location.protocol}//${window.location.host}/registration/${user.referralLink}`,
                referralPlatformUserLink: `${process.env.REACT_APP_REMEPAL_PLATFORM}?authtoken=${encodeURIComponent(encToken || '')}`,
                claimTokens: user.earnedTokens.signup,
                tokensForClaiming: user.rrpBalance,
                full_name: user.full_name
            })
        } catch (error) {
            // console.log(error)
            clearLocalStorage(this.props.navigate)
        }

        // const script = document.createElement("script");
        // script.src = "https://wallet.remelife.com/menu.js";
        // script.async = true;
        // document.body.appendChild(script);
    }

    public render (): ReactNode {
        return (
            <>
                {DashboardRender(this)}
                {this.state.tokensForClaiming === '0.0000' || this.state.txBroadcasted ?
                    null : ""
                    /*<div className='claim'>
                        <button className='btn primary' onClick={this.claim} disabled={true}>COMING SOON</button>
                    </div>*/
                }

                {this.state.txBroadcasted ?
                    <div className='claim'>
                        <div className='message'>Your transaction is being processed</div>
                    </div>
                    : null
                }
                </>
        )
    }

    public async claim () {
        this.props.navigate('/claim', { 
            state: {
                ethBalance: this.state.ethBalance.pure
            }
        })
    }

    public handleNavClick(){
        this.setState({ isMenuVisible: !this.state.isMenuVisible})
    }

    public copyWalletAddress () {
        copy(this.state.address)
        this.setState({ copiedWalletAddress: true })
    }

    public copyReferralCode () {
        copy(this.state.referralCode)
        this.setState({ copiedCode: true })
    }
}

export default DashboardWrapper
