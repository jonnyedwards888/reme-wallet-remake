import React from 'react'
import PasswordToggle from '../../../assets/svg/show-password.svg'
import ApplicationBackground from '../../../assets/images/background.6e81d4b2.jpg'
import Logo from '../../../assets/images/reme-logo.svg'
import ReCAPTCHA from 'react-google-recaptcha';

export const RegistrationRender = function (context: any) {
    return (
        <div className="application" style={{backgroundImage: `url(${ApplicationBackground})`}}>
            <div className="title"><h1><img src={Logo} alt="ReMe Wallet"/></h1></div>
            <section className="wrapper register login">
                <h2>Setup your ReMe Wallet</h2>
                <div className="common-wrapper">
                    <p className="already-login">Already a ReMeLife member?&nbsp;
                        <a href="/" className="btn secondary green">Login</a>
                    </p>
                    <p className="already-login">&nbsp;
                        <a href="https://remelife.com/" className="btn secondary green">Do you need help?</a>
                    </p>
                    <form className='form-inline center'>
                        <input size={30} placeholder='First Name' type='text' className='form-control input' onChange={context.onFirstName} />
                        <input size={30} placeholder='Last Name' type='text' className='form-control input' onChange={context.onLastName} />
                        <input size={30} placeholder='Email' type='text' className='form-control input' onChange={context.onEmail} />
                        <div className='password-wrapper'>
                            <input size={30} placeholder='Password' type={context.state.toggleShow ? 'text' : 'password'} value={context.state.password} className='form-control input' onChange={context.onPassword} />
                            <img src={PasswordToggle} alt='Show/hide password' onClick={context.setToggle} />
                        </div>
                        <div className='password-wrapper'>
                            <input size={30} placeholder='Re enter password' type={context.state.reToggleShow ? 'text' : 'password'} value={context.state.repassword} className='form-control input' onChange={context.onRePassword} />
                            <img src={PasswordToggle} alt='Show/hide re password' onClick={context.setReToggle} />
                        </div>
                        <p>By registering you agree with the
                            <div className='terms-and-conditions'>
                                <button onClick={() => { window.open('https://remelife.com/terms-and-conditions/') }}> Terms of Service/Conditions</button>
                        </div>
                        </p>
                        <ReCAPTCHA
                            sitekey="6Ldn3IcUAAAAAOioZEzPCgnTslX_YquZqQNIhO5M"
                            onChange={context.onChange}
                        />
                        <button type='button' className='btn primary' disabled={context.state.loading} onClick={context.register}> {context.state.loading ? <div className='loader'></div> : 'Register'}</button>
                        <button type='button' className='btn primary bg-info-s' onClick={() => { window.open('https://remelife.com/tokens/') }}> Do you need help? </button>
                    </form>
                </div>
                <div className="terms-links">
                    <a href="https://remelife.com/" target="_blank"
                       rel="noreferrer">ReMeLife</a> | <a href={"https://remelife.com/terms-and-conditions/"}
                    onClick={() => { window.open('https://remelife.com/terms-and-conditions/') }} target="_blank" rel="noreferrer">Terms &
                    Conditions</a>
                </div>
            </section>
        </div>
)
}
