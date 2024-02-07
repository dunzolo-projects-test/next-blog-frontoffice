import { getPostsByTag } from "@/api/strapi";
import { Tag } from "@/models/tag";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import PostPreview from "@/components/PostPreview";

type Props = {
    tag: Tag;
};

const TagPage = ({ tag }: Props) => {
    return (
        <div>
            <Head>
                <title>C Tech - {tag.name}</title>
                <meta name="description" content="C-Tech" />
            </Head>
            <main>
                <section className="jumbo">
                    <div className="container">
                        <h1>Tag: {tag.name}</h1>
                    </div>
                </section>
                <section className="posts">
                    <div className="container">
                        {
                            tag.posts.length > 0 ? tag.posts.map(post => {
                                return (
                                    <PostPreview key={post.id} post={post} />
                                )
                            }) : <h2>No posts found!</h2>
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}

export default TagPage;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const id = context.params?.id?.toString();

    try {
        return {
            props: {
                tag: id ? await getPostsByTag(id) : null,
            },
        };
    } catch (err) {
        return {
            notFound: true,
        };
    }
};