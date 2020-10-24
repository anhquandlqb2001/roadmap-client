import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import ReactMap from '../components/reactmap'
import UserAPI from '../lib/api/user'

const Home = () => {

  useEffect(() => {
    checkCurrentUser()
  }, [])

  const checkCurrentUser = async () => {
    const response: AxiosResponse = await UserAPI.current()
    console.log(response.data);
  }

  return (
    <div>
      <ReactMap />
    </div>
  )
}

export default Home

