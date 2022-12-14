import { ReactNode } from "react"
import Head from "next/head"
import Navbar from '../ui/Navbar';

interface Props {
    title?: string;
    children?: ReactNode
    // any props that come into the component
}

const Layout = ({ children, title }: Props) => {
  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Diego Andres Salas"/>
            <meta name="description" content={`Información sobre el pokémon ${title}`}/>
            <meta name="keywords" content={`${ title }, pokemon, pokedex`}/>
        </Head>
        <Navbar />
        <main style={{
            padding: '0px 20px' 
        }}>
            { children }
        </main>
    </>
  )
}

export default Layout