export interface PostImage{
    id: string;
    name: string;
    alt: string;
    url: string;
}

export interface PostCategory{
    id: string;
    name: string;
    description?: string;
}

export interface PostTag{
    id: string;
    name: string;
}


export interface Post{
    id: string,
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    date: string;
    images: PostImage[];
    categories?: PostCategory[];
    tags?: PostTag[];
}
