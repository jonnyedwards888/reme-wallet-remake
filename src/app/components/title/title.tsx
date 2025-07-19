import React from 'react'
import RemeLogo from '../../assets/svg/reme-logo-dark.svg'

export const Title = function (context: any) {
    return (
        <div className='title'>
            <img src={RemeLogo} alt='ReMe Wallet' />
            <h1><i>ReMe</i>&nbsp;Wallet</h1>
        </div>
    )
}
