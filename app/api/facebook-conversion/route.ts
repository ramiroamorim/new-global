import { NextRequest, NextResponse } from 'next/server';
import { sendConversion } from '@/lib/facebook-conversions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados obrigatórios
    if (!body.eventName || !body.userData) {
      return NextResponse.json(
        { error: 'eventName e userData são obrigatórios' },
        { status: 400 }
      );
    }

    // Preparar dados da conversão
    const conversionData = {
      eventName: body.eventName,
      eventTime: body.eventTime || Math.floor(Date.now() / 1000),
      userData: body.userData,
      customData: body.customData || {},
      eventSourceUrl: body.eventSourceUrl || request.headers.get('referer') || '',
      actionSource: body.actionSource || 'website' as const,
    };

    // Enviar conversão
    const result = await sendConversion(conversionData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Conversão enviada com sucesso',
      data: result 
    });

  } catch (error) {
    console.error('Erro na API de conversão:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}