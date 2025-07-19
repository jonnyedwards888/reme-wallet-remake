import React from 'react'
import PasswordToggle from '../../../assets/svg/show-password.svg'

export const PasswordRecoveryRender = function (context: any) {
    return (
        <div className='balance'>
            <p className='recovery-method-title'>Please enter your old password to recover your wallet.</p>
            <div className='password-recovery-wrapper'>
                <input size={30} placeholder='Old Password' type={context.state.toggleShow ? 'text' : 'password'} value={context.state.recoveryPhrase} className='form-control input' onChange={context.onPassword} />
                <img src={PasswordToggle} alt='Show/hide password' onClick={context.setToggle} />
            </div>
        </div>
    )
}
