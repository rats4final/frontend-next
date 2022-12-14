/* jshint esversion: 11 */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Books App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Books</h1>
      <Link 
      data-cy="link-to-books"
      href="/libros">Libros</Link>
    </div>
  )
}
