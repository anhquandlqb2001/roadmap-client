import '../styles/global.css'
import UserProvider from '../lib/util/userContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
