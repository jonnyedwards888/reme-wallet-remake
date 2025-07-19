import React from 'react'

export const PasswordConfirmationRender = function (context: any) {
    return (
        <div className='claim-wrapper'>
            <p className='message'>To claim the <strong>ReMC {context.state.tokensForClaiming}</strong>, we need you to enter your password. </p>
            <input size={30} placeholder='Password' type='password' onChange={context.onPassword} className='form-control input' />
            <p className='fee'>Transaction Fee&nbsp;&nbsp;<strong>ETH {context.state.txFee.formatted}</strong></p>
            <div className='buttons-wrapper'>
                <button type='button' className='btn primary' disabled={context.state.loading} onClick={context.confirmTransaction}> {context.state.loading ? <div className='loader'></div> : 'Complete'}</button>
            </div>

        </div>
    )
}