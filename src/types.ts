export interface Field {
    label: string;
    type: string;
    options?: string[];
  }
  
  export interface Form {
    id: string;
    name: string;
    fields: Field[];
  }
  
  export interface FormData {
    formId: string;
    data: { [key: string]: string };
  }
  