import { Component, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { ForgottenPasswordRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

type State = {
    email: string
    loading: boolean
}

// Wrapper component to provide router hooks
const ForgottenPasswordWrapper = () => {
    const navigate = useNavigate()
    return <ForgottenPassword navigate={navigate} />
}

export class ForgottenPassword extends Component<{ navigate: any }, State> {

    public constructor (props: any) {
        super(props)

        this.onEmail = this.onEmail.bind(this)
        this.submitResetRequest = this.submitResetRequest.bind(this)

        this.state = {
            email: '',
            loading: false
        }
    }

    public render (): ReactNode {
        return ForgottenPasswordRender(this)
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public async submitResetRequest () {
        try {
            this.setState({ loading: true })

            await UserService.forgotPassword(this.state.email)
            // That is an info
            ErrorPopUp.show('We have sent you an email, check your inbox')
            this.props.navigate('/')
        }
        catch (error) {
            this.setState({ loading: false })

            // console.log(error)
            ErrorPopUp.show('Resetting password failed')
        }
    }
}

export default ForgottenPasswordWrapper
