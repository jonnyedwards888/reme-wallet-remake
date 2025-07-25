import React from 'react'
import Popup from 'reactjs-popup';


export const Tooltip = function (context: any) {
    return (
        <div className={'tooltip-popup'}>
            <Popup
                trigger={open => (
                    <svg className='one-flex-svg' xmlns="http://www.w3.org/2000/svg" fill="#1FA599" viewBox="0 0 24 24" width="18px" height="18px">    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"/></svg>
                )}
                on={['hover', 'focus']}
                position={["top center", "right center", "bottom center", "left center"]}
                closeOnDocumentClick
                mouseEnterDelay={200}
                mouseLeaveDelay={150}
            >
                <span className="tooltip-content">{ context.props.msg }</span>
            </Popup>
        </div>
    )
}
