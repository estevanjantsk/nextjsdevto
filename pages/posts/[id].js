import axios from "axios";
import styles from '../../styles/Home.module.css'

export default function Post({ post }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {post.title}
      </h1>
      <div className={styles.grid}>
        <p dangerouslySetInnerHTML={{ __html: post.body_html }}></p>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const post = await axios.get(`https://dev.to/api/articles/${id}`)
    .then((res) => res.data)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post
    },
  }
}