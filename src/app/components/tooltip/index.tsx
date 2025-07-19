import { Component, ReactNode } from 'react'
import { Tooltip } from './renderers'

export class TooltipComponent extends Component<{ msg: string }, {}> {

    public constructor (props: any) {
        super(props)
    }

    public render (): ReactNode {
        return (
            Tooltip(this)
        )
    }

}