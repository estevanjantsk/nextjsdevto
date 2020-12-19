import axios from "axios";
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Blog({ posts }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Dev.to Blog :)
        </h1>

        <p className={styles.description}>
          This is my Dev.to content!
        </p>

        <div className={styles.grid}>
          {posts.map((post) => {
            return (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <a className={styles.card}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </a>
              </Link>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await axios.get('https://dev.to/api/articles', {
    params: {
      username: 'estevanjantsk'
    }
  }).then((res) => res.data)

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts
    },
  }
}

