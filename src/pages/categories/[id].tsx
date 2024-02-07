import { getPostsByCategory } from "@/api/strapi";
import PostPreview from "@/components/PostPreview";
import { Category } from "@/models/category";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

type Props = {
    category: Category;
};

const CategoryPage = ({ category }: Props) => {
    return (
        <div>
            <Head>
                <title>C Tech - {category.name}</title>
                <meta name="description" content="C-Tech" />
            </Head>
            <main>
                <section className="jumbo">
                    <div className="container">
                        <h1>Categoria: {category.name}</h1>
                    </div>
                </section>
                <section className="posts">
                    <div className="container">
                        {
                            category.posts.length > 0 ? category.posts.map(post => {
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

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const id = context.params?.id?.toString();

    try {
        return {
            props: {
                category: id ? await getPostsByCategory(id) : null,
            },
        };
    } catch (err) {
        return {
            notFound: true,
        };
    }
};