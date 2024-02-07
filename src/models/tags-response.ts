export interface TagResponse {
    data: TagDatum[];
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
  
  export interface TagDatum {
    id: number;
    attributes: Attributes;
  }
  
  export interface Attributes {
    name: string;
    createdAt: string;
    updatedAt: string;
  }