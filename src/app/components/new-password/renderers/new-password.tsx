import React from 'react'
import PasswordToggle from '../../../assets/svg/show-password.svg'

export const NewPasswordRender = function (context: any) {
    return (
        <section className='wrapper register login'>
            <h2>New password</h2>
            <div className='common-wrapper'>
                <p>Set your new password</p>
                <form className='form-inline center'>
                    <div className='password-wrapper'>
                        <input size={30} placeholder='New Password' type={context.state.toggleShow ? 'text' : 'password'} value={context.state.password} className='form-control input' onChange={context.onPassword} />
                        <img src={PasswordToggle} alt='Show/hide password' onClick={context.setToggle} />
                    </div>
                    <div className='password-wrapper'>
                        <input size={30} placeholder='Confirm password' type={context.state.reToggleShow ? 'text' : 'password'} value={context.state.repassword} className='form-control input' onChange={context.onRePassword} />
                        <img src={PasswordToggle} alt='Show/hide re password' onClick={context.setReToggle} />
                    </div>
                    <button type='button' className='btn primary' disabled={context.state.loading} onClick={context.saveNewPassword}> {context.state.loading ? <div className='loader'></div> : 'Save'}</button>
                </form>
            </div>
        </section>
    )
}
