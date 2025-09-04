import crypto from 'crypto';

// Tipos para os dados de conversão
export interface ConversionData {
  eventName: string;
  eventTime: number;
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    contentName?: string;
    contentCategory?: string;
    [key: string]: unknown; // ✅ Mudança aqui
  };
  eventSourceUrl?: string;
  actionSource: 'website' | 'email' | 'phone_call' | 'chat' | 'system_generated';
}

// Interface para dados hashados do usuário
interface HashedUserData {
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  ct?: string[];
  st?: string[];
  country?: string[];
  zp?: string[];
}

// Função para hash dos dados do usuário (required pelo Facebook)
function hashUserData(userData: ConversionData['userData']): HashedUserData {
  const hashedData: HashedUserData = {}; // ✅ Mudança aqui
  
  if (userData.email) {
    hashedData.em = [crypto.createHash('sha256').update(userData.email.toLowerCase().trim()).digest('hex')];
  }
  
  if (userData.phone) {
    // Remove todos os caracteres não numéricos
    const cleanPhone = userData.phone.replace(/\D/g, '');
    hashedData.ph = [crypto.createHash('sha256').update(cleanPhone).digest('hex')];
  }
  
  if (userData.firstName) {
    hashedData.fn = [crypto.createHash('sha256').update(userData.firstName.toLowerCase().trim()).digest('hex')];
  }
  
  if (userData.lastName) {
    hashedData.ln = [crypto.createHash('sha256').update(userData.lastName.toLowerCase().trim()).digest('hex')];
  }
  
  if (userData.city) {
    hashedData.ct = [crypto.createHash('sha256').update(userData.city.toLowerCase().trim()).digest('hex')];
  }
  
  if (userData.state) {
    hashedData.st = [crypto.createHash('sha256').update(userData.state.toLowerCase().trim()).digest('hex')];
  }
  
  if (userData.country) {
    hashedData.country = [crypto.createHash('sha256').update(userData.country.toLowerCase().trim()).digest('hex')];
  }
  
  if (userData.zipCode) {
    hashedData.zp = [crypto.createHash('sha256').update(userData.zipCode.trim()).digest('hex')];
  }
  
  return hashedData;
}

// Interface para resposta da API do Facebook
interface FacebookApiResponse {
  events_received?: number;
  messages?: string[];
  fbtrace_id?: string;
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

// Função principal para enviar conversões
export async function sendConversion(data: ConversionData): Promise<FacebookApiResponse> {
  try {
    const pixelId = process.env.FACEBOOK_PIXEL_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    
    if (!pixelId || !accessToken) {
      throw new Error('Facebook Pixel ID ou Access Token não configurados');
    }
    
    // Preparar os dados da conversão
    const conversionPayload = {
      data: [
        {
          event_name: data.eventName,
          event_time: data.eventTime,
          action_source: data.actionSource,
          event_source_url: data.eventSourceUrl,
          user_data: hashUserData(data.userData),
          custom_data: data.customData || {},
        }
      ]
    };
    
    // Enviar para Facebook Conversions API
    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversionPayload),
    });
    
    const result: FacebookApiResponse = await response.json(); // ✅ Mudança aqui
    
    if (!response.ok) {
      console.error('Erro ao enviar conversão:', result);
      throw new Error(`Erro na API: ${result.error?.message || 'Erro desconhecido'}`);
    }
    
    console.log('Conversão enviada com sucesso:', result);
    return result;
    
  } catch (error) {
    console.error('Erro ao enviar conversão para Facebook:', error);
    throw error;
  }
}

// Função helper para eventos comuns
export const FacebookEvents = {
  // Evento de visualização de página
  pageView: (userData: ConversionData['userData'], url?: string): Omit<ConversionData, 'eventTime'> & { eventTime: number } => ({
    eventName: 'PageView',
    eventTime: Math.floor(Date.now() / 1000),
    userData,
    actionSource: 'website' as const,
    eventSourceUrl: url || (typeof window !== 'undefined' ? window.location.href : ''),
  }),
  
  // Evento de lead (formulário preenchido)
  lead: (userData: ConversionData['userData'], value?: number): Omit<ConversionData, 'eventTime'> & { eventTime: number } => ({
    eventName: 'Lead',
    eventTime: Math.floor(Date.now() / 1000),
    userData,
    actionSource: 'website' as const,
    customData: value ? { value, currency: 'BRL' } : undefined,
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
  }),
  
  // Evento de compra
  purchase: (userData: ConversionData['userData'], value: number, currency = 'BRL'): Omit<ConversionData, 'eventTime'> & { eventTime: number } => ({
    eventName: 'Purchase',
    eventTime: Math.floor(Date.now() / 1000),
    userData,
    actionSource: 'website' as const,
    customData: { value, currency },
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
  }),
  
  // Evento de iniciar checkout
  initiateCheckout: (userData: ConversionData['userData'], value?: number): Omit<ConversionData, 'eventTime'> & { eventTime: number } => ({
    eventName: 'InitiateCheckout',
    eventTime: Math.floor(Date.now() / 1000),
    userData,
    actionSource: 'website' as const,
    customData: value ? { value, currency: 'BRL' } : undefined,
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
  })
};