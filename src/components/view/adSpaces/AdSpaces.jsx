import React from 'react'
import { placeholderImage } from 'src/utils'

const AdSpaces = ({ ad_url, ad_img, style_web, }) => {

    const handleOpenAd = () => {
        // console.log('ad_url : -', ad_url.length)
        if (ad_url.length > 0 && ad_url !== undefined && ad_url !== '' && ad_url !== null) {
            window.open(ad_url, '_blank')
            // console.log('ad_url open',)
        }
    }

    return (
        <>
            <div className='ad_spaces'>
                <div className='container'>
                    <div target='_blank' onClick={handleOpenAd}>
                        {ad_img && (
                            <img
                                className='adimage'
                                src={ad_img}
                                alt={`style ${style_web} feature sponsored ads news image`}
                                onError={placeholderImage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdSpaces
