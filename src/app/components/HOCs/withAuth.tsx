import React from 'react'
import { Navigate } from "react-router-dom"

/*
    Redirect to component url in case the user has already been authenticated
    Route to the Auth component in case the user has not been authenticated
*/
export const withAuth = (componentUrl: string, AuthComponent: any, authUrl: string) => {
    const AuthRoute = () => {
        if (hasBeenAuthenticated()) {
            return <Navigate to={componentUrl} replace />
        }

        return React.createElement(AuthComponent)
    }

    return AuthRoute
}

/*
    Redirect to auth component in case the user has not been authenticated
    Route to the requested component in case the user has been authenticated
*/
export const withoutAuth = (authUrl: string, Component: any, componentUrl: string) => {
    const WithoutAuthRoute = () => {
        if (hasBeenAuthenticated()) {
            return React.createElement(Component)
        }

        return <Navigate to={authUrl} replace />
    }

    return WithoutAuthRoute
}

const hasBeenAuthenticated = () => {
    // // for post caps identical the refferal
    // if(window.location.pathname === '/refferal'){
    //     localStorage.setItem('refferal', 'true')
    // }
    
    return !!localStorage.getItem('token') && !!localStorage.getItem('allowed')
}
