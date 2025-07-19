import React from 'react'
import { Navigate } from "react-router-dom"

export const requireStateOrRedirectTo = (internalStateProps: string[], componentToShow: any, componentLink: string, redirectLink: string) => {
    const RequireStateRedirectorRoute = (props: any) => {

        for (let i = 0; i < internalStateProps.length; i++) {
            if (!props.history?.location?.state || !props.history.location.state[internalStateProps[i]]) {
                return <Navigate to={redirectLink} replace />
            }
        }

        return React.createElement(componentToShow, props)
    }

    return RequireStateRedirectorRoute
}
