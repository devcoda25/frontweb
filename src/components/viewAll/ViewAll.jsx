'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { placeholderImage, translate, NoDataFound } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getLanguage, getUser } from 'src/utils/api'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'
import { locationData } from 'src/store/reducers/settingsReducer'
import { getFeatureSectionApi } from 'src/hooks/getFeatureSectionApi'
import LoadMoreBtn from '../view/adSpaces/loadMoreBtn/LoadMoreBtn'
// import NoDataFound from '../noDataFound/NoDataFound'

const ViewAll = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dataPerPage = 6 // number of posts per page
  const router = useRouter()
  const query = router.query
  const catid = query.slug
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  let user = getUser()
  let { id: language_id } = getLanguage()
  // handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const currentLanguage = useSelector(selectCurrentLanguage)

  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [viewAllData, setViewAllData] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setCurrentIndex(currentIndex + 1)
    setOffset(offset + 1)
  }


  const getFeatureSection = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await getFeatureSectionApi.getFeatureSection({
        language_id: language_id,
        offset: offset * dataPerPage,
        limit: dataPerPage,
        slug: catid,
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      setTotalData(data.data[0]?.news ? data.data[0].news_total : data.data[0]?.breaking_news_total)
      console.log(data.data[0].news_total, "totlaNewsss")
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      return data.data
    } catch (error) {
      console.log(error)
      setViewAllData([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  const { data: Data } = useQuery({
    queryKey: ['viewallFeaturebyslug', catid, currentLanguage, location, offset], // Include currentPage in the queryKey
    queryFn: () => getFeatureSection()
  })

  useEffect(() => {
    if (Data && Data) {
      Data[0].news ?
        setViewAllData((prevData) => [...prevData, ...Data[0]?.news]) : setViewAllData((prevData) => [...prevData, ...Data[0]?.breaking_news])
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading, currentIndex])

  // slice the array to get the current posts
  const currentData = viewAllData

  useEffect(() => {
    // console.log(viewAllData, 'currr@@@')
  }, [viewAllData,])


  const lengthdata = (Data && Data[0]?.news_total) || 0
  return (
    <Layout>
      {viewAllData && viewAllData ? (
        <>
          <BreadcrumbNav SecondElement={Data && Data[0]?.title} />
          <div id='BNV-main'>
            <div id='BNV-content' className='container'>
              {isLoading.loading ? (
                <div className='row'>
                  {[...Array(3)].map((_, index) => (
                    <div className='col-md-4 col-12' key={index}>
                      <Card isLoading={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='row'>
                  {viewAllData && viewAllData ? (
                    viewAllData && viewAllData.map(element => (
                      <div className='col-md-4 col-12' key={element.id}>
                        <Link
                          id='Link-all'
                          href={{ pathname: `/news/${element.slug}`, query: { language_id: element.language_id } }}
                          as={`/news/${element.slug}`}
                        >
                          <div id='BNV-card' className='card'>
                            <img
                              id='BNV-card-image'
                              src={element.image ? element.image : no_image}
                              className='card-img'
                              alt={element.title}
                              onError={placeholderImage}
                            />
                            <div id='BNV-card-body' className='card-body'>
                              {/* <button id='BNV-btnCatagory' className='btn btn-sm' type="button" >{element.category_name}</button> */}
                              <h5 id='BNV-card-title' className='card-title'>
                                {element.title}
                              </h5>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <>
                      {NoDataFound()}

                    </>
                  )}
                </div>
              )}
              {totalData > dataPerPage && totalData !== currentData?.length ? (
                // <ReactPaginate
                //   initialPage={currentPage}
                //   previousLabel={translate('previous')}
                //   nextLabel={translate('next')}
                //   pageCount={Math.ceil(lengthdata / dataPerPage)}
                //   onPageChange={handlePageChange}
                //   containerClassName={'pagination'}
                //   previousLinkClassName={'pagination__link'}
                //   nextLinkClassName={'pagination__link'}
                //   disabledClassName={'pagination__link--disabled'}
                //   activeClassName={'pagination__link--active'}
                // />
                <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      {viewAllData && viewAllData[0]?.breaking_news ? (
        <>
          <BreadcrumbNav SecondElement={Data[0].title} />
          <div id='BNV-main'>
            <div id='BNV-content' className='container'>
              {isLoading.loading ? (
                <div className='row'>
                  {[...Array(3)].map((_, index) => (
                    <div className='col-md-4 col-12' key={index}>
                      <Card isLoading={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='row'>
                  {currentData ? (
                    currentData.map(element => (
                      <div className='col-md-4 col-12' key={element.id}>
                        <Link
                          id='Link-all'
                          href={{ pathname: `/breaking-news/${element.slug}`, query: { language_id: element.language_id } }}
                          as={`/breaking-news/${element.slug}`}
                        >
                          <div id='BNV-card' className='card'>
                            <img
                              id='BNV-card-image'
                              src={element.image ? element.image : no_image}
                              className='card-img'
                              alt={element.title}
                            />
                            <div id='BNV-card-body' className='card-body'>
                              {/* <button id='BNV-btnCatagory' className='btn btn-sm' type="button" >{element.category_name}</button> */}
                              <h5 id='BNV-card-title' className='card-title'>
                                {element.title}
                              </h5>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <>
                      {NoDataFound()}

                    </>
                  )}
                </div>
              )}
              {totalData > dataPerPage && totalData !== currentData?.length ? (
                <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  )
}

export default ViewAll
