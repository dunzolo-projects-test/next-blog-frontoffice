import axios from "axios";
import { CategoryResponse } from "@/models/category-response";
import { TagResponse } from "@/models/tags-response";
import { LastPostResponse } from "@/models/last-posts-response";
import { PostsResponse, PostDatum } from '@/models/posts-response';
import { SinglePostResponse } from "@/models/single-post-response";
import { PostsByCategoryResponse } from "@/models/post-category-response";
import { PostsByTagResponse } from "@/models/post-tag-response";
import { Content } from '../models/single-post-response';
import { TopPostsResponse } from "@/models/top-posts-response";

export const BASE_URL = "http://localhost:1337";
export const POSTS_ENDPOINT = "/api/posts";
export const CATEGORIES_ENDPOINT = "/api/categories";
export const TAGS_ENDPOINT = "/api/tags";

export const getTopCategories = async () => {
  const res = await axios.get<CategoryResponse>(
    `${BASE_URL}${CATEGORIES_ENDPOINT}?pagination[limit]=5&sort=createdAt:desc`
  );
  return res.data ? res.data.data : [];
}

export const getTopTags = async () => {
  const res = await axios.get<TagResponse>(
    `${BASE_URL}${TAGS_ENDPOINT}?pagination[limit]=5&sort=createdAt:desc`
  );
  return res.data ? res.data.data : [];
}

export const getTopPosts = async () => {
  const res = await axios.get<TopPostsResponse>(
    `${BASE_URL}${POSTS_ENDPOINT}?populate=images,categories&pagination[limit]=10&sort=date:desc`
  );
  const posts = res.data?.data.map((post) => {

    const {title, date, images, categories} = post.attributes;

    return{
      id: post.id,
      title,
      date,
      images: images.data.map((image) => {

        const {name, hash, url} = image.attributes;
        
        return{
          id: image.id,
          name,
          alt: hash,
          url: `${BASE_URL}${url}`
        }
      }),
      categories: categories.data.map((category) => {
        const {name, description} = category.attributes;

        return{
          id: category.id,
          name,
          description
        }
      })
    }
  })

  return posts;
}

export const getLastPosts = async (limit = 3) => {
  const res = await axios.get<LastPostResponse>(
    `${BASE_URL}${POSTS_ENDPOINT}?pagination[limit]=${limit}&sort=date:desc`
  );
  return res.data ? res.data.data : [];
}

export const getPosts = async () => {
  const res = await axios.get<PostsResponse>(
    `${BASE_URL}${POSTS_ENDPOINT}?populate=images,categories,tags&pagination[limit]=10&sort=date:desc`
  );

  const posts = res.data?.data.map((post: PostDatum) => {

    const {title, excerpt, content, date, images, categories, tags} = post.attributes;

    return{
      id: post.id,
      title,
      excerpt,
      content,
      date,
      images: images.data.map((image) => {

        const {name, hash, url} = image.attributes;
        
        return{
          id: image.id,
          name,
          alt: hash,
          url: `${BASE_URL}${url}`
        }
      }),
      categories: categories.data.map((category) => {
        const {name, description} = category.attributes;

        return{
          id: category.id,
          name,
          description
        }
      }),
      tags: tags.data.map((tag) => {
        const {name} = tag.attributes;

        return{
          id: tag.id,
          name,
        }
      })
    }
  })

  return posts;
}

export const getPost = async (id: string) => {
  const res = await axios.get<SinglePostResponse>(
    `${BASE_URL}${POSTS_ENDPOINT}/${id}?populate=images,categories,tags`
  );

  const { title, excerpt, content, date, images, categories, tags } = res.data?.data.attributes;
      
  const post = {
    id,
    title,
    excerpt,
    content,
    date,
    images: images.data.map((image) => {
      const { name, hash, url } = image.attributes;

      return {
        id: image.id,
        name,
        alt: hash,
        url: `${BASE_URL}${url}`,
      }
    }),
    categories: categories.data.map(category => {
      const { name, description } = category.attributes;

      return {
        id: category.id,
        name,
        description,
      }
    }),
    tags: tags.data.map(tag => {
      const { name } = tag.attributes;

      return {
        id: tag.id,
        name,
      }
    }),
  }

  return post;
}

export const getPostsByCategory = async(id: string) => {
  const res = await axios.get<PostsByCategoryResponse>(`${BASE_URL}${CATEGORIES_ENDPOINT}/${id}?populate=posts`)

  const { name, posts } = res.data.data.attributes;

  const catetory = {
    name,
    posts: posts.data.map(post => {
      const { title, excerpt, content, date } = post.attributes;
      return{
        id: post.id,
        title,
        excerpt,
        content,
        date
      }
    })
  }

  return catetory;
}

export const getPostsByTag = async(id: string) => {
  const res = await axios.get<PostsByTagResponse>(`${BASE_URL}${TAGS_ENDPOINT}/${id}?populate=posts`)

  const { name, posts } = res.data.data.attributes;

  const catetory = {
    name,
    posts: posts.data.map(post => {
      const { title, excerpt, content, date } = post.attributes;
      return{
        id: post.id,
        title,
        excerpt,
        content,
        date
      }
    })
  }

  return catetory;
}