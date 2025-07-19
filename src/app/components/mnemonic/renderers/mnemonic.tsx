import React from 'react'
import Logo from '../../../assets/images/reme-logo.svg'
import ApplicationBackground from "../../../assets/images/background.6e81d4b2.jpg";

export const MnemonicRender = function (context: any) {
    if (context.state.render === 'mnemonic') {
        return mnemonic(context)
    }

    return mnemonicConfirm(context)
}

const mnemonic = function (context: any) {
    return (
        <div className="application" style={{backgroundImage: `url(${ApplicationBackground})`}}>
            <div className="title"><h1><img src={Logo} alt="ReMe Wallet" /></h1></div>
            <section className="wrapper mNemonic login"><h2>Setting up your ReMe Wallet</h2>
                <div className="common-wrapper"><p className="already-login">These 12 words are your unique mnemonic
                    code, the
                    equivalent to a password. </p>
                    <p>You must keep a record of these words in order to access your wallet in future. Please download
                        them,
                        copy them as a text document, and write them down and keep them somewhere safe.</p>

                    <div className="words-list">
                        <ul>
                            {context.state.originalMnemonic.split(' ').map((item: any, index: any) => {
                                return <li key={index}>{item}</li>
                            })}
                        </ul>
                        <button className='btn green' onClick={context.copyMnemonic}>{context.state.copiedMnemonic ? 'Copied!' : 'Copy All Words'}</button>
                        <button className='btn green' onClick={context.downloadMnemonic}>Download text doc</button>
                    </div>


                    <form className="form-inline center">
                        <p>
                            <div className="terms-and-conditions pink"><strong>Note</strong> that you will only see this
                                code once.
                            </div>
                            After you have saved it, click the button below to continue.
                        </p>
                        <button className='btn primary' disabled={!context.state.copiedOrDownloaded} onClick={context.confirmMnemonic}>I have saved my code</button>
                        <a href="https://remelife.com/tokens/" target='_blank' rel="noreferrer" onClick={() => { window.open('https://remelife.com/tokens/') }} className="btn secondary green">Do you need help?</a></form>
                </div>
                <div className="terms-links"><a href="https://remelife.com/" target="_blank" rel="noreferrer">ReMeLife</a> | <a
                    href="https://remelife.com/terms-and-conditions/" target="_blank" rel="noreferrer">Terms & Conditions</a></div>
            </section>
        </div>
    )
}

const mnemonicConfirm = function (context: any) {
    return (
        <div className="application" style={{backgroundImage: `url(${ApplicationBackground})`}}>
            <div className="title"><h1><img src={Logo} alt="ReMe Wallet" /></h1></div>
            <section className="wrapper mNemonic login code"><h2>Setting up your ReMe Wallet</h2>
                <div className="common-wrapper"><p className="already-login">Enter your unique 12 words mnemonic code
                    below. </p>
                    <form className="form-inline center">
                        <input size={30} placeholder='mnemonic code' type='text' className='form-control input' onChange={context.onMnemonicInput} />
                        <button type="button" className="btn primary" onClick={context.confirmSavedMnemonic}>Continue</button>
                        <a href={context.viewMnemonic} onClick={context.viewMnemonic} className="btn secondary green"> &lt; Go back to copy again</a>
                        <a href={'https://remelife.com/tokens/'} className="btn secondary green" onClick={() => { window.open('https://remelife.com/tokens/') }}>Do
                        you need help?</a>
                        </form>
                </div>
                <div className="terms-links"><a href="https://remelife.com/" target="_blank" rel="noreferrer">ReMeLife</a> | <a
                    href="https://remelife.com/terms-and-conditions/" target="_blank" rel="noreferrer">Terms & Conditions</a></div>
            </section>
        </div>
    )
}
