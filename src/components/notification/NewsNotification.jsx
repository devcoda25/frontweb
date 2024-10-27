'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { translate, truncateText, NoDataFound } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { imgError } from '../../utils/index'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import ReactPaginate from 'react-paginate'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import { getNotificationsApi } from 'src/hooks/getNotificationApi'
import { getLanguage } from 'src/utils/api'
import Layout from '../layout/Layout'
import LoadMoreBtn from '../view/adSpaces/loadMoreBtn/LoadMoreBtn'
// import NoDataFound from '../noDataFound/NoDataFound'

const NewsNotification = () => {
  const currentLanguage = useSelector(selectCurrentLanguage)
  const [totalLength, setTotalLength] = useState(0)
  const [offsetdata, setOffsetdata] = useState(0)
  const dataPerPage = 6
  let { id: language_id } = getLanguage()


  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [notificationData, setNotificationData] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }

  const handlePageChange = selectedPage => {
    const newOffset = selectedPage?.selected * limit
    setOffsetdata(newOffset)
  }

  // api call
  const getNotifications = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await getNotificationsApi.getNotifications({
        offset: offset * dataPerPage,
        limit: dataPerPage,
        language_id: language_id
      })
      setTotalLength(data.total)
      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      return data.data
    } catch (error) {
      console.log(error)
      setNotificationData([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  const {
    data: Data,
  } = useQuery({
    queryKey: ['getNotification', currentLanguage, offset],
    queryFn: getNotifications,

  })

  useEffect(() => {
    if (Data && Data.data) {
      setNotificationData((prevData) => [...prevData, ...Data.data]);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])


  // Function to format the date as "day Month year"
  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
  }

  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('notificationLbl')} />
      <div className='new_noti-sec personal_Sec bg-white'>
        <div className='container new_notification'>
          <div className='d-flex bd-highlight mb-3'>
            <Link href='/personal-notification' id='btnNotification11' className='btn mx-1 bd-highlight'>
              {translate('personalLbl')}
            </Link>
            <Link href='/news-notification' id='btnNewsnoti1' className='btn mx-1 bd-highlight'>
              {translate('news')}
            </Link>
          </div>
          <div className='my-3'>
            {isLoading.loading ? (
              <div className='col-12 loading_data'>
                <Skeleton height={20} count={22} />
              </div>
            ) : notificationData && notificationData.length > 0 ? (
              notificationData.map((element, index) => (
                <div key={index} className={`card my-3${element.category_id === '0' ? ' disabled-link' : ''}`}>
                  {element.type === 'category' ? (
                    <Link
                      href={{ pathname: `/news/${element.news?.slug}`, query: { language_id: element.language_id } }}
                      as={`/news/${element.news?.slug}`}
                    >
                      <div className='card-body bd-highlight' id='card-noti'>
                        {/** Content inside the link */}
                        <img id='noti_profile' src={element.image} alt='notification' onError={imgError} />
                        <div className='Noti-text'>
                          <p className='bd-highlight bd-title'>{truncateText(element.title, 100)}</p>
                          <p className='bd-highlight bd-title message-title'>{truncateText(element.message, 550)}</p>
                          <p className='bd-highlight mb-0 text-dark'> {formatDate(element.date_sent)}</p>
                        </div>
                        <p className='redirect_arrow'>
                          <BsFillArrowRightCircleFill />
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className='card-body bd-highlight' id='card-noti'>
                      {/** Content without the link */}
                      <img id='noti_profile' src={element.image} alt='notification' onError={imgError} />
                      <div className='Noti-text'>
                        <p className='bd-highlight bd-title'>{truncateText(element.title, 100)}</p>
                        <p className='bd-highlight bd-title message-title'>{truncateText(element.message, 550)}</p>
                        <p className='bd-highlight mb-0'> {formatDate(element.date_sent)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='col-12 no_data mt-5'>
                <>
                  {NoDataFound()}

                </>
              </div>
            )}
          </div>
          {totalData > dataPerPage && totalData !== notificationData.length ? (
            <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default NewsNotification
