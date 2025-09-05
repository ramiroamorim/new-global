// lib/trackingUtils.ts
import Cookies from 'js-cookie';

export interface UserTrackingData {
  fbp?: string;        // Facebook browser ID
  fbc?: string;        // Facebook click ID  
  clientUserAgent?: string;
  clientIpAddress?: string;
}

// Gerar ID único do Facebook Browser
export function generateFbp(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `fb.1.${timestamp}.${random}`;
}

// Capturar dados de tracking
export function getTrackingData(): UserTrackingData {
  // Pegar ou criar Facebook Browser ID
  let fbp = Cookies.get('_fbp');
  if (!fbp) {
    fbp = generateFbp();
    Cookies.set('_fbp', fbp, { 
      expires: 90, // 90 dias
      domain: window.location.hostname.includes('localhost') ? undefined : `.${window.location.hostname}`,
      sameSite: 'lax'
    });
  }

  // Pegar Facebook Click ID (se veio de anúncio)
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  let fbc = Cookies.get('_fbc');
  
  if (fbclid && !fbc) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    Cookies.set('_fbc', fbc, { 
      expires: 90,
      domain: window.location.hostname.includes('localhost') ? undefined : `.${window.location.hostname}`,
      sameSite: 'lax'
    });
  }

  return {
    fbp,
    fbc,
    clientUserAgent: navigator.userAgent,
    clientIpAddress: undefined // Will be detected server-side
  };
}

// Hook para usar em componentes React
export function useTracking() {
  return {
    getTrackingData,
    generateFbp
  };
}

