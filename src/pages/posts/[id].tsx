import { getPost, getTopPosts } from "@/api/strapi";
import { Post } from "@/models/post";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Props = {
  post: Post;
  topPosts: Post[]
};

const PostPage = ({ post, topPosts }: Props) => {
  const { title, excerpt, content, date, categories, tags } = post;
  return (
    <div>
      <Head>
        <title>C Tech - {title}</title>
        <meta name="description" content="Miglior blog sulla tecnologia e i gadget" />
      </Head>

      <main>
        <section className="top-posts">
          <div className="container">
            {
              topPosts && topPosts.map(post => {
                const { title, date, images } = post;
                const image = images[0];
                return (
                  <div key={post.id} className="recent-post">
                    <div className="recent-img">
                      <Image src={image.url} alt={image.alt} width={75} height={75} />
                    </div>
                    <div className="recent-text">
                      <h4 className="recent-title">
                        <Link href={`/posts/${post.id}`} legacyBehavior>
                          <a className="btn btn-black">{title.substring(0, 60) + '...'}</a>
                        </Link>
                      </h4>
                      <div className="recent-date">{date}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>


        <section className="post-detail">
          <div className="container">
            <h1>{title}</h1>
            <small>{date}</small>
            <p>{excerpt}</p>
            <ReactMarkdown
              components={{
                img: (props) => (
                  <Image src={props.src ?? "/placeholder.png"} alt={props.alt ?? "hero image"} width={1920} height={1080} className="image-full-container" />
                ),
              }}>
              {content}
            </ReactMarkdown>
          </div>
        </section>

        <section className="post-category-tags">
          <div className="container">
            <div className="category">
              <h4>Categorie:</h4>
              {
                categories && categories.map(category => {
                  return (
                    <Link key={category.id} href={`/categories/${category.id}`} legacyBehavior>
                      <a className="btn btn-white btn-full btn-full-blue">{category.name}</a>
                    </Link>
                  )
                })
              }
            </div>
            <div className="tags">
              <h4>Tags:</h4>
              {
                tags && tags.map(tag => {
                  return (
                    <Link key={tag.id} href={`/tags/${tag.id}`} legacyBehavior>
                      <a className="btn btn-black btn-full btn-full-grey">{tag.name}</a>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </section>

        <section className="post-author">
          <div className="container">
            <div className="author-logo">
              <Image src="/avatar.jpg" alt="avatar" width={150} height={150} />
            </div>
            <div className="author-text">
              <h2><Link href="/" legacyBehavior><a className="btn btn-black">Davide Rossi</a></Link></h2>
              <div className="author-comment">Frontend Developer | Bla bla bla</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id?.toString();
  const topPosts = await getTopPosts();

  try {
    return {
      props: {
        post: id ? await getPost(id) : null,
        topPosts
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
