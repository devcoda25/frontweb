import axios from 'axios'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { GET_SETTINGS } from 'src/utils/api'
const Home = dynamic(() => import('src/components/home/Home'), { ssr: false })


// This is seo api
const fetchDataFromSeo = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_SETTINGS}`
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

const Index = ({ adsenseUrl }) => {

  // console.log(settingsData,"settingsDataaaaa")

  const adsenseURL = adsenseUrl;

  return (
    <>
      <Meta />
      <Home />
      {
        adsenseURL && adsenseURL !== null || adsenseURL && adsenseURL !== undefined || adsenseURL && adsenseURL?.length > 0 ?
          <script async src={adsenseURL}
            crossorigin="anonymous"></script> : null
      }
    </>
  )
}


let serverSidePropsFunction = null
if (process.env.NEXT_PUBLIC_SEO === 'true') {
  serverSidePropsFunction = async context => {
    // Retrieve the slug from the URL query parameters
    const { req } = context // Extract query and request object from context

    const currentURL = req[Symbol.for('NextInternalRequestMeta')].initURL

    const settingsData = await fetchDataFromSeo()

    // console.log(settingsData?.data, "Data")

    const adsenseUrl = settingsData?.data?.web_setting?.google_adsense ? settingsData?.data?.web_setting?.google_adsense : null

    // console.log(adsenseUrl, "adsenseUrl")

    // Pass the fetched data as props to the page component
    return {
      props: {
        adsenseUrl
      }
    }
  }
}

export const getServerSideProps = serverSidePropsFunction

export default Index
