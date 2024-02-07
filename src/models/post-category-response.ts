export interface PostsByCategoryResponse {
    data: Data;
    meta: Meta;
  }
  
  export interface Meta {
  }
  
  export interface Data {
    id: number;
    attributes: Attributes2;
  }
  
  export interface Attributes2 {
    name: string;
    description?: any;
    createdAt: string;
    updatedAt: string;
    posts: Posts;
  }
  
  export interface Posts {
    data: Datum[];
  }
  
  export interface Datum {
    id: number;
    attributes: Attributes;
  }
  
  export interface Attributes {
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    date: string;
  }