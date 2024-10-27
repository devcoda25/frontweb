import Link from 'next/link'
import React from 'react'
import { translate } from 'src/utils'

const CommonViewMoreDiv = ({ title, desc, link, styleSix }) => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div id='hns-head-main'>
            <div className='left-sec'>
                <p id='hns-main-logo' className='mb-0'>
                    {title}
                </p>
                <div className='short_desc'>{desc}</div>
            </div>
            {
                !styleSix ?
                    <Link id='hns-Viewmore' href={link} onClick={() => scrollToTop()} className='commonBtn'>
                        {translate('viewMore')}
                    </Link> : null
            }
        </div>
    )
}

export default CommonViewMoreDiv
