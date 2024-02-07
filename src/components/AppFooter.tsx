import { useEffect, useState } from "react";
import { getTopCategories, getTopTags, getLastPosts } from "@/api/strapi";
import { CategoryDatum } from "@/models/category-response";
import Image from "next/image";
import Link from "next/link";
import { TagDatum } from "@/models/tags-response";
import { LastPostDatum } from "@/models/last-posts-response";
import { slug } from "@/utils/utils";

export default function AppFooter() {
  const [categories, setCategories] = useState<CategoryDatum[]>([]);
  const [tags, setTags] = useState<TagDatum[]>([]);
  const [lastPosts, setLastPosts] = useState<LastPostDatum[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getLastPosts();
      setLastPosts(data);
    };

    const getCategories = async () => {
      const data = await getTopCategories();
      setCategories(data);
    };

    const getTags = async () => {
      const data = await getTopTags();
      setTags(data);
    };

    getCategories();
    getTags();
    getPosts();
  }, []);

  return (
    <footer>
      <section className="footer-top">
        <div className="container">
          <div className="footer-tab footer-info">
            <div className="footer-logo">
              <Image src="/logo.png" alt="C Tech logo" width={80} height={80} />
            </div>
            <p>Miglio blog di tecnologia e gadget</p>
          </div>
          <div className="footer-tab footer-nav">
            <h3>Categorie</h3>
            <ul>
              {categories.length > 0 &&
                categories.map((category: CategoryDatum) => {
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.id}`}
                        legacyBehavior
                      >
                        <a className="btn btn-white">
                          {category.attributes.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="footer-tab footer-tags">
            <h3>Tags</h3>
            {tags.length > 0 &&
              tags.map((tag: TagDatum) => {
                return (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.id}`}
                    legacyBehavior
                  >
                    <a className="btn btn-white btn-full btn-full-white">
                      {tag.attributes.name}
                    </a>
                  </Link>
                );
              })}
          </div>
          <div className="footer-tab footer-recent-posts">
            <h3>Posts Recenti</h3>
            {lastPosts.length > 0 &&
              lastPosts.map((lastPost: LastPostDatum) => {
                return (
                  <div key={lastPost.id} className="recent-post">
                    <div className="recent-text">
                      <h4 className="recent-title">
                        <Link
                          href={slug(`/posts/${lastPost.id}`)}
                          legacyBehavior
                        >
                          <a className="btn btn-white">
                            {lastPost.attributes.title.slice(0, 30) + "..."}
                          </a>
                        </Link>
                      </h4>
                    </div>
                    <div className="recent-date">
                      {lastPost.attributes.date}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </footer>
  );
}
