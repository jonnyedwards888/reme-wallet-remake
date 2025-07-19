import { Component, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { RegistrationRender } from './renderers'
import { ErrorPopUp } from '../../errors'
import { UserService } from '../../../services'

type State = {
    email: string
    password: string
    repassword: string
    firstName: string
    lastName: string
    loading: boolean
    toggleShow: boolean
    reToggleShow: boolean
}

// Wrapper component to provide router hooks
const RegistrationWrapper = () => {
    const navigate = useNavigate()
    const params = useParams()
    return <Registration navigate={navigate} params={params} />
}

class Registration extends Component<{ navigate: any, params: any }, State> {

    public constructor (props: any) {
        super(props)

        this.register = this.register.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.onRePassword = this.onRePassword.bind(this)
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)
        this.setToggle = this.setToggle.bind(this)
        this.setReToggle = this.setReToggle.bind(this)

        this.state = {
            email: '',
            password: '',
            repassword: '',
            firstName: '',
            lastName: '',
            loading: false,
            toggleShow: false,
            reToggleShow: false
        }
    }

    public render (): ReactNode {
        return RegistrationRender(this)
    }

    public onEmail (event: any) {
        this.setState({ email: event.target.value })
    }

    public onPassword (event: any) {
        this.setState({ password: event.target.value })
    }

    public onRePassword (event: any) {
        this.setState({ repassword: event.target.value })
    }

    public onFirstName (event: any) {
        this.setState({ firstName: event.target.value })
    }

    public onLastName (event: any) {
        this.setState({ lastName: event.target.value })
    }

    public setToggle () {
        this.setState({ toggleShow: !this.state.toggleShow })
    }

    public setReToggle () {
        this.setState({ reToggleShow: !this.state.reToggleShow })
    }

    public async register () {
        if (this.state.password.length < Number(process.env.REACT_APP_PASSWORD_MIN_CHARACTERS || 1)) {
            ErrorPopUp.show(`Password minimum: At least ${process.env.REACT_APP_PASSWORD_MIN_CHARACTERS || 1} characters`)
            return void 0
        }

        if (this.state.password !== this.state.repassword) {
            ErrorPopUp.show('Passwords don\'t match')
            return void 0
        }

        try {
            this.setState({ loading: true })

            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }

            const result = await UserService.registerByReferral(user, this.props.params.referredBy)
            localStorage.setItem('token', result.tokenData.token)
            localStorage.setItem('encToken', result.tokenData.encToken)
            localStorage.setItem('allowed', 'true')

            this.props.navigate('/mnemonic', { 
                state: { mnemonic: result.mnemonic } 
            })
        }
        catch (error) {
            this.setState({ loading: false })

            // console.log(error)
            // ErrorPopUp.show(JSON.parse(error.message).message)
        }
    }

}

export default RegistrationWrapper
