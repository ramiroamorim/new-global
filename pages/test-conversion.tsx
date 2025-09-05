import { useState } from 'react';
import { getTrackingData } from '../lib/trackingUtils';

export default function TestConversion() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConversion = async () => {
    setLoading(true);
    try {
      // Get tracking data (creates cookies if needed)
      const trackingData = getTrackingData();
      
      const response = await fetch('/api/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Purchase',
          email: 'test@example.com',
          value: 99.99,
          currency: 'BRL',
          productName: 'Test Product',
          // Include tracking data
          fbp: trackingData.fbp,
          fbc: trackingData.fbc,
          userAgent: trackingData.clientUserAgent
        })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Facebook Conversions API with Cookies</h1>
      
      <button onClick={testConversion} disabled={loading}>
        {loading ? 'Sending...' : 'Send Test Conversion'}
      </button>
      
      {result && (
        <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '20px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>This will create Facebook tracking cookies (_fbp) on your browser</p>
        <p>Check your browser dev tools → Application → Cookies to see them</p>
      </div>
    </div>
  );
}