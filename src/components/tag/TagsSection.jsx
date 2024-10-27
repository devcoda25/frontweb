'use client'
import Link from 'next/link'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { useSelector } from 'react-redux'
import { translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { getTagApi } from 'src/hooks/tagsApi'
import { getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import LoadMoreBtn from '../view/adSpaces/loadMoreBtn/LoadMoreBtn'
import { useEffect, useState } from 'react'

const TagsSection = () => {
  const currentLanguage = useSelector(selectCurrentLanguage)
  let { id: language_id } = getLanguage()

  const limit = 10;
  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [tagsData, setTagsData] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }

  // api call
  const getTag = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await getTagApi.getTag({
        offset: offset * limit,
        limit: limit,
        language_id: language_id
      })
      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      return data.data
    } catch (error) {
      console.log(error)
      setTagsData([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  const { data: Data } = useQuery({
    queryKey: ['getTagSection', currentLanguage, offset],
    queryFn: getTag
  })


  useEffect(() => {
    if (Data && Data) {
      setTagsData((prevData) => [...prevData, ...Data]);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])

  return (
    <div>
      {isLoading.loading ? (
        <div>
          <Skeleton height={200} count={3} />
        </div>
      ) : tagsData && tagsData.length > 0 ? (
        <div id='rns-tags-main' className='my-3'>
          <div id='tags-nav' className='navbar'>
            <h4 id='rns-nav-logo' className='mb-0'>
              <b>{translate('tagLbl')}</b>
            </h4>
          </div>
          <div id='tags-tag'>
            {tagsData &&
              tagsData?.map(element => (
                <Link id='btnTags' key={element.id} href={`/tag/${element.slug}`} className='btn btn-outline-dark'>
                  {/* {console.log(element.slug)} */}
                  {element.tag_name}
                </Link>
              ))}
          </div>
          {totalData > limit && totalData !== tagsData.length ? (
            <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default TagsSection
