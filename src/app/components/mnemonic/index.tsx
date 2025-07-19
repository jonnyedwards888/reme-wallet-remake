import { saveAs } from 'file-saver';
import copy from 'copy-to-clipboard';
import React, { Component, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { MnemonicRender } from './renderers'

import { ErrorPopUp } from '../../errors'

type State = {
    render: string
    copiedMnemonic: boolean
    originalMnemonic: string
    confirmedMnemonic: string
    copiedOrDownloaded: boolean
}

// Wrapper component to provide router hooks
const MnemonicWrapper = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <Mnemonic navigate={navigate} location={location} />
}

class Mnemonic extends Component<{ navigate: any, location: any }, State> {

    public constructor (props: any) {
        super(props)

        this.copyMnemonic = this.copyMnemonic.bind(this)
        this.downloadMnemonic = this.downloadMnemonic.bind(this)
        this.confirmMnemonic = this.confirmMnemonic.bind(this)
        this.viewMnemonic = this.viewMnemonic.bind(this)
        this.onMnemonicInput = this.onMnemonicInput.bind(this)
        this.confirmSavedMnemonic = this.confirmSavedMnemonic.bind(this)

        this.state = {
            render: 'mnemonic',
            copiedMnemonic: false,
            originalMnemonic: this.props.location.state.mnemonic.phrase,
            confirmedMnemonic: '',
            copiedOrDownloaded: false
        }

        localStorage.removeItem('allowed')
    }

    public render (): ReactNode {
        return (
            <div >
                {MnemonicRender(this)}
            </div>
        )
    }

    public copyMnemonic () {
        copy(this.state.originalMnemonic)
        this.setState({ copiedMnemonic: true, copiedOrDownloaded: true })
    }

    public downloadMnemonic () {
        const data = new Blob([this.state.originalMnemonic], { type: 'text/plain;charset=utf-8' });
        saveAs(data, 'mnemonic.txt');
        this.setState({ copiedOrDownloaded: true })
    }

    public confirmMnemonic () {
        this.setState({ render: 'confirm' })
    }

    public viewMnemonic () {
        this.setState({ render: 'mnemonic', copiedMnemonic: false })
    }

    public onMnemonicInput (event: any) {
        this.setState({ confirmedMnemonic: event.target.value })
    }

    public confirmSavedMnemonic () {
        if (this.state.confirmedMnemonic !== this.state.originalMnemonic) {
            return ErrorPopUp.show('Entered mnemonic mismatch the original one')
        }

        localStorage.setItem('allowed', 'true')
        this.props.navigate('/dashboard')
    }

}

export default MnemonicWrapper
