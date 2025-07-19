import React from 'react'

export const MnemonicRecoveryRender = function (context: any) {
    return (
        <div className='balance'>
            <p className='recovery-method-title'>Please enter your mnemonic phrase to recover you password. Mnemonic phrase is the 12 words on your first login.</p>
            <input size={30} placeholder='Mnemonic Phrase' type='text' className='form-control input' onChange={context.onMnemonic} />
        </div>
    )
}
