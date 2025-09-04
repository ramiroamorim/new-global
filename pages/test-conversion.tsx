import { useState } from 'react';

export default function TestConversion() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConversion = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Purchase',
          email: 'test@example.com',
          value: 99.99,
          currency: 'BRL',
          productName: 'Test Product'
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
      <h1>bora ver se da bom a api</h1>
      
      <button onClick={testConversion} disabled={loading}>
        {loading ? 'Sending...' : 'Send Test Conversion'}
      </button>
      
      {result && (
        <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '20px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}