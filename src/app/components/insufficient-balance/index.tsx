import React, { Component, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { InsufficientBalanceRender } from './renderers'

type State = {
    txFee: string,
    address: string
}

// Wrapper component to provide router hooks
const InsufficientBalanceWrapper = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <InsufficientBalance navigate={navigate} location={location} />
}

class InsufficientBalance extends Component<{ navigate: any, location: any }, State> {

    public constructor (props: any) {
        super(props)

        this.redirectToDashboard = this.redirectToDashboard.bind(this)
        this.redirectToCoinbase = this.redirectToCoinbase.bind(this)

        this.state = {
            txFee: this.props.location.state.txFee,
            address: this.props.location.state.address
        }
    }

    public render (): ReactNode {
        return (
            <section className='wrapper balance-wrapper'>
                <h2>ETH balance insufficient</h2>
                <div className='common-wrapper'>
                    {InsufficientBalanceRender(this)}
                </div>
            </section>
        )
    }

    public redirectToDashboard () {
        this.props.navigate('/dashboard')
    }

    public redirectToCoinbase () {
        window.open('https://www.coinbase.com/')
    }
}

export default InsufficientBalanceWrapper
