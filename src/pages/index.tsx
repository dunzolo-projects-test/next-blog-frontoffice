import { getPosts, getTopPosts } from "@/api/strapi";
import PostPreview from "@/components/PostPreview";
import { Post } from "@/models/post";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: Post[];
  topPosts: Post[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await getPosts();
    const topPosts = await getTopPosts();

    return {
      props: {
        posts,
        topPosts,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Home({ posts, topPosts }: Props) {
  return (
    <div>
      <Head>
        <title>C Tech</title>
        <meta
          name="description"
          content="Miglior blog sulla tecnologia e gadget"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section id="slider">
          <div className="slides-container">
            {
              topPosts && topPosts.map(post => {
                const { title, date, images, categories } = post;
                const image = images[0];
                const category = categories ? categories[0] : null;
                return (
                  <div className="slide" key={post.id}>
                    <div className="layer"></div>
                    <div className="slide-img">
                      <Image src={image.url} width={384} height={320} alt={image.alt} />
                      <div className="slide-text">
                        <h3>
                          <Link href={`/posts/${post.id}`} legacyBehavior>
                            <a className="btn btn-white">{title}</a>
                          </Link>
                        </h3>
                        {
                          category && <span>
                            <Link href={`categories/${category.id}`} legacyBehavior>
                              <a className="btn btn-white">{category.name}</a>
                            </Link>
                          </span>
                        }
                        <span className="bar"></span>
                        <span>{date}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
        <section className="posts">
          <div className="container">
            {posts &&
              posts.map((post) => {
                return <PostPreview key={post.id} post={post} />;
              })}
          </div>
        </section>
      </main>
    </div>
  );
}
