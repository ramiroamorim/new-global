import type { NextApiRequest, NextApiResponse } from 'next';
import { sendConversion } from '../../services/facebookConversions';
import { EventData, ConversionResponse } from '../../types/facebook';

// Function to get client IP
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded 
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
    : req.connection.remoteAddress || req.socket.remoteAddress || '';
  
  // Clean IPv6 localhost
  return ip === '::1' ? '127.0.0.1' : ip;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversionResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const eventData: EventData = req.body;
    
    // ADD IP ADDRESS from server
    eventData.ipAddress = getClientIP(req);
    
    if (!eventData.email && !eventData.phone) {
      return res.status(400).json({
        success: false,
        error: 'Email or phone is required'
      });
    }

    console.log('📨 Received conversion event:', {
      type: eventData.eventName,
      value: eventData.value,
      ip: eventData.ipAddress,
      fbp: eventData.fbp ? 'present' : 'missing',
      fbc: eventData.fbc ? 'present' : 'missing',
      timestamp: new Date().toISOString()
    });
    
    const result = await sendConversion(eventData);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
    
  } catch (error: any) {
    console.error('💥 API Error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}