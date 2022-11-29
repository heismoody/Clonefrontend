import '../styles/globals.css'
import { Reqcontextprovider } from '../context/reqcontext'
import { UserContextProvider } from '../context/usercontext'
import { Listcontextprovider } from '../context/listcontext';
import Navigation from "../components/Navigation";

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Reqcontextprovider>
        <Listcontextprovider>
          <Navigation/>
            <Component {...pageProps} />
        </Listcontextprovider>
      </Reqcontextprovider>
    </UserContextProvider>
  )
}

export default MyApp
