'use client'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage, selectCurrentLanguageLabels } from '../../store/reducers/languageReducer'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { formatDate, placeholderImage, translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { locationData, settingsData } from '../../store/reducers/settingsReducer'
import Link from 'next/link'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import { getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { loadCategoryCount, loadSubCategories, subCategories } from 'src/store/reducers/tempDataReducer'
import { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import NoDataFound from '../noDataFound/NoDataFound'
import { getNewsApi } from 'src/hooks/newsApi'
import { FiCalendar } from 'react-icons/fi'
import { FaAngleDown, FaAngleUp, FaChevronRight } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import Card from '../skeletons/Card'
import { loadNews, newsUpdateLanguage } from 'src/store/reducers/newsReducer'
import { categoriesCacheData } from 'src/store/reducers/CatNavReducers'


SwiperCore.use([Navigation, Pagination])

const CatNav = () => {

  const navigate = useRouter()
  const currentLanguage = useSelector(selectCurrentLanguage)
  const categoiresOnOff = useSelector(settingsData)

  const categories = useSelector(categoriesCacheData)

  const [catId, setCatId] = useState('')
  const [subCatSlug, setSubCatSlug] = useState('')
  const [subCatData, setSubCatData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [subLoading, setSubLoading] = useState(true)

  const dispatch = useDispatch();

  const handleCategoryChange = (categories) => {
    // console.log(categories.sub_categories)
    if (categories.slug) {
      // navigate.push(`/categories-news/${categories.slug}?category_id=${categories.id}`)
      navigate.push(`/categories-news/${categories.slug}`)
      setSubCatDrop(false)
    }
  }

  const handleSubCategoryChange = () => {
    // console.log(categories.sub_categories)
    if (subCatSlug) {
      navigate.push(`/categories-news/sub-category/${subCatSlug}`)
      setSubCatDrop(false)
    }
  }

  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 8 // number of posts per page

  const changelanguage = useSelector(selectCurrentLanguageLabels)
  const location = useSelector(locationData)

  let { id: language_id } = getLanguage()
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long

  // api call
  const getNewsByCategoryApi = async page => {
    setSubLoading(true)
    loadNews({
      offset: page * dataPerPage,
      limit: dataPerPage,
      get_user_news: '',
      search: '',
      language_id: language_id,
      category_id: catId,
      subcategory_slug: subCatSlug,
      tag_id: '',
      slug: '',
      latitude: storedLatitude,
      longitude: storedLongitude,
      onSuccess: response => {
        setSubCatData(response)
        setSubLoading(false)
        // console.log(currentLanguage.id,'langId-catnav')

        dispatch(newsUpdateLanguage(currentLanguage.id))

      },
      onError: error => {
        setSubLoading(false)
        console.log(error)
      }
    })
  }


  useEffect(() => {
    if (language_id) {
      getNewsByCategoryApi(currentPage)
    }

  }, [subCatSlug, currentPage, catId, currentLanguage])


  // slice the array to get the current posts
  const currentData = subCatData && subCatData.data && subCatData.data.slice(0, dataPerPage)

  const lengthdata = (subCatData && subCatData.total) || 0


  const [subCatDrop, setSubCatDrop] = useState(false)
  const [currentCategory, setCurrentCategory] = useState([])

  const handleSubCatDropdown = (category) => {
    setCurrentCategory(category)
    setCatId(category.id)
    setSubCatDrop(true)
    setSubCatSlug('')
  }

  useEffect(() => {

    // console.log(currentCategory, 'currCat')
    // console.log(currentCategory.sub_categories?.map((e) => {
    //   return e.subcategory_name
    // }), "subbbbcaaa")

  }, [currentCategory])

  return (
    <>
      {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
        <>
          {categories && categories.length > 0 ? (
            <div id='cn-main' expand='lg' className='catNavWrapper'>
              <div className='container py-2'>
                {isLoading ? (
                  <div>
                    <Skeleton height={200} count={3} />
                  </div>
                ) : (
                  <div className={`cn-main-div catSubCatWrapper flex-display`}>

                    {categories.map((element, index) => (
                      <div key={element.id} className='text-center'
                      >
                        {
                          element?.sub_categories?.length > 0 && categoiresOnOff && categoiresOnOff.subcategory_mode === '1' ?
                            <span
                              className={`catNav-links  ${subCatDrop && currentCategory && currentCategory.id === element.id ? 'activeSubDrop' : ''}`}
                              onClick={() => handleSubCatDropdown(element)}
                              // onMouseEnter={() => handleSubCatDropdown(element)}

                            >

                              <b>{element.category_name} </b> {subCatDrop && currentCategory && currentCategory.id === element.id ? <FaAngleUp /> : <FaAngleDown />}
                            </span> : <span
                              className={`catNav-links  ${subCatDrop && currentCategory && currentCategory.id === element.id ? 'activeSubDrop' : ''}`}
                              onClick={() => handleCategoryChange(element)}
                            >

                              <b>{element.category_name} </b>
                            </span>
                        }

                        {
                          categoiresOnOff && categoiresOnOff.subcategory_mode === '1' ?
                            subCatDrop && currentCategory && currentCategory.id === element.id ? <>
                              <div className='subCatDropdown' >
                                <div className="row"
                                  onMouseLeave={() => setSubCatDrop(false)}

                                >
                                  <div className="col-lg-3">
                                    <div className="subCatNamesWrapper">
                                      <div onClick={() => setSubCatSlug('')}>
                                        <span className={subCatSlug === '' ? 'subNavActive' : ''} >
                                          All
                                        </span>
                                        {subCatSlug === '' ? <FaChevronRight /> : null}
                                      </div>
                                      {
                                        currentCategory.sub_categories?.map((e) => {
                                          return <div onClick={() => setSubCatSlug(e?.slug)} key={e.slug}>
                                            <span className={subCatSlug === e.slug ? 'subNavActive' : ''} >
                                              {e.subcategory_name}
                                            </span>
                                            {subCatSlug === e.slug ? <FaChevronRight /> : null}
                                          </div>
                                        })
                                      }
                                    </div>
                                  </div>
                                  <div className="col-lg-9">
                                    <div className="subCatDataWrappper">
                                      {/* <span className='close' onClick={()=>setSubCatDrop(false)}><IoClose/></span> */}
                                      <div className='row'>
                                        {
                                          subLoading ? <>
                                            {[...Array(8)].map((_, index) => (
                                              <div className='col-md-3 col-12' key={index}>
                                                <Card catNav={true} />
                                              </div>
                                            ))}
                                          </> : <>
                                            {currentData && currentData.length > 0 ? (
                                              currentData.map(element => (
                                                <div className='col-lg-3 col-md-4 col-12 ' key={element.id}>
                                                  <Link
                                                    id='Link-all'
                                                    href={{ pathname: `/news/${element.slug}`, query: { language_id: element.language_id } }}
                                                    as={`/news/${element.slug}`}
                                                  >
                                                    <div id='cv-card' className='card'>
                                                      <img id='cv-card-image' src={element.image} className='card-img' alt={element.title} onError={placeholderImage} />
                                                      <div id='cv-card-body' className='card-body'>
                                                        <button id='cv-btnCatagory' className='btn btn-sm' type='button'>
                                                          {element.category.category_name}
                                                        </button>
                                                        <p id='cv-card-title' className='card-title'>
                                                          {element.title}
                                                        </p>
                                                        {/* <p id='cv-card-date'>
                                                    <FiCalendar size={18} id='cv-logoCalendar' />
                                                    {formatDate(element.date)}
                                                  </p> */}
                                                      </div>
                                                    </div>
                                                  </Link>
                                                </div>
                                              ))
                                            ) : (
                                              <NoDataFound />
                                            )}
                                          </>
                                        }
                                        {
                                          lengthdata > 1 ?
                                            <div className="col-12 viewAllWrapper">
                                              {
                                                subCatSlug === '' ?
                                                  <button className='viewAll commonBtn' onClick={() => handleCategoryChange(element)}>View All</button> :
                                                  <button className='viewAll commonBtn' onClick={() => handleSubCategoryChange()}>View All</button>
                                              }
                                            </div> : null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </> : null
                            : null
                        }
                      </div>
                    ))}

                    {categories?.length > 10 ? (
                      <button
                        id='catNav-more'
                        onClick={() => {
                          navigate.push('/all-categories')
                        }}
                      >
                        {translate('More >>')}
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default CatNav

