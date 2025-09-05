// types para o facebook
export interface EventData {
    eventName?: 'Purchase' | 'Lead' | 'AddToCart' | 'ViewContent' | 'CompleteRegistration';
    email?: string;
    phone?: string;
    value?: number;
    currency?: string;
    productName?: string;
    category?: string;

    // new tracking field about the cookies 
    fbp?: string;
    fbc?: string;
    userAgent?: string;
    ipAddress?: string;
    
  }
  
  export interface ConversionResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: string;
  }