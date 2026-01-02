import { NextResponse } from 'next/server';
import { storeLead } from '@/lib/lead-service';

/**
 * Test endpoint to verify lead storage is working
 * Visit: /api/test-lead
 */
export async function GET() {
  try {
    const result = await storeLead({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+919876543210',
      formType: 'contact',
      formSource: 'test-endpoint',
      formData: {
        test: true,
        timestamp: new Date().toISOString(),
      },
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Lead storage is working!',
        leadId: result.leadId,
        note: 'Check your Supabase leads table to see this test lead.',
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        message: 'Lead storage failed. Check the error above.',
        troubleshooting: 'See TROUBLESHOOTING_LEADS.md for help',
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Exception occurred while testing lead storage',
      troubleshooting: 'See TROUBLESHOOTING_LEADS.md for help',
    }, { status: 500 });
  }
}

