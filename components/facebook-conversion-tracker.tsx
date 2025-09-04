'use client';

import { useEffect } from 'react';
import { sendConversion, FacebookEvents } from '@/lib/facebook-conversions';

interface FacebookConversionTrackerProps {
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  trackPageView?: boolean;
}

export function FacebookConversionTracker({ 
  userData = {}, 
  trackPageView = true 
}: FacebookConversionTrackerProps) {
  
  useEffect(() => {
    // Só executa se tiver dados do usuário e trackPageView for true
    if (trackPageView && Object.keys(userData).length > 0) {
      const trackPageViewConversion = async () => {
        try {
          const pageViewData = FacebookEvents.pageView(userData);
          await sendConversion(pageViewData);
        } catch (error) {
          console.error('Erro ao rastrear PageView:', error);
        }
      };
      
      trackPageViewConversion();
    }
  }, [userData, trackPageView]);

  // Este componente não renderiza nada visível
  return null;
}

// Hook personalizado para facilitar o uso em formulários
export function useFacebookConversion() {
  const trackLead = async (userData: FacebookConversionTrackerProps['userData'], value?: number) => {
    if (!userData || Object.keys(userData).length === 0) {
      console.warn('Dados do usuário não fornecidos para tracking de Lead');
      return;
    }
    
    try {
      const leadData = FacebookEvents.lead(userData, value);
      await sendConversion(leadData);
    } catch (error) {
      console.error('Erro ao rastrear Lead:', error);
    }
  };

  const trackPurchase = async (userData: FacebookConversionTrackerProps['userData'], value: number, currency = 'BRL') => {
    if (!userData || Object.keys(userData).length === 0) {
      console.warn('Dados do usuário não fornecidos para tracking de Purchase');
      return;
    }
    
    try {
      const purchaseData = FacebookEvents.purchase(userData, value, currency);
      await sendConversion(purchaseData);
    } catch (error) {
      console.error('Erro ao rastrear Purchase:', error);
    }
  };

  const trackInitiateCheckout = async (userData: FacebookConversionTrackerProps['userData'], value?: number) => {
    if (!userData || Object.keys(userData).length === 0) {
      console.warn('Dados do usuário não fornecidos para tracking de InitiateCheckout');
      return;
    }
    
    try {
      const checkoutData = FacebookEvents.initiateCheckout(userData, value);
      await sendConversion(checkoutData);
    } catch (error) {
      console.error('Erro ao rastrear InitiateCheckout:', error);
    }
  };

  return {
    trackLead,
    trackPurchase,
    trackInitiateCheckout
  };
}