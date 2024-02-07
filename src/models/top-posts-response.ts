export interface TopPostsResponse {
    data: Datum3[];
    meta: Meta;
  }
  
  export interface Meta {
    pagination: Pagination;
  }
  
  export interface Pagination {
    start: number;
    limit: number;
    total: number;
  }
  
  export interface Datum3 {
    id: number;
    attributes: Attributes3;
  }
  
  export interface Attributes3 {
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    date: string;
    images: Images;
    categories: Categories;
  }
  
  export interface Categories {
    data: Datum2[];
  }
  
  export interface Datum2 {
    id: number;
    attributes: Attributes2;
  }
  
  export interface Attributes2 {
    name: string;
    description?: any;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Images {
    data: Datum[];
  }
  
  export interface Datum {
    id: number;
    attributes: Attributes;
  }
  
  export interface Attributes {
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Formats {
    thumbnail: Thumbnail;
    medium: Thumbnail;
    small: Thumbnail;
    large: Thumbnail;
  }
  
  export interface Thumbnail {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
  }