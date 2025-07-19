import React from 'react'

export const LogoutRender = function (context: any) {
    return (
        <>
            <li><a onClick={context.logout} href={'logout'}>Logout</a></li>
        </>
    )
}
