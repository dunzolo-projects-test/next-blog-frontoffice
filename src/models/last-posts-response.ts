export interface LastPostResponse {
    data: LastPostDatum[];
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
  
  export interface LastPostDatum {
    id: number;
    attributes: Attributes;
  }
  
  export interface Attributes {
    title: string;
    excerpt: string;
    content: Content[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    date: string;
  }
  
  export interface Content {
    type: string;
    children: Child[];
  }
  
  export interface Child {
    type: string;
    text: string;
    bold?: boolean;
  }