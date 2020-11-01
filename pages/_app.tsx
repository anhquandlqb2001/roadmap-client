import '../styles/global.css'
import UserProvider from '../lib/util/userContext.tsx'
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
