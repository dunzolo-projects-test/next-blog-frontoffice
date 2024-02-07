export interface CategoryResponse {
    data: CategoryDatum[];
    meta: Meta;
  }
  
  export interface Meta {
    pagination: Pagination;
  }
  
  export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  
  export interface CategoryDatum {
    id: number;
    attributes: Attributes;
  }
  
  export interface Attributes {
    name: string;
    description?: any;
    createdAt: string;
    updatedAt: string;
  }