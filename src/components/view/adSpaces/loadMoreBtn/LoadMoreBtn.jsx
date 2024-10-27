import React, { useState } from 'react'
import LoadMoreSpinner from './LoadMoreSpinner'

const LoadMoreBtn = ({ handleLoadMore, loadMoreLoading }) => {

    return (
        <div>
            {
                loadMoreLoading ? <LoadMoreSpinner /> :
                    <button onClick={handleLoadMore} className='loadMoreBtn commonBtn'>Load More</button>
            }
        </div>
    )
}

export default LoadMoreBtn
