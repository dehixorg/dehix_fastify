export interface PutConsultantBody {
    status: string;
    description: string;
    price: number;
    experience: string;
    links: string[];
  }
  export interface PutconsultantPathParams {
    consultant_id: string;
  }
  