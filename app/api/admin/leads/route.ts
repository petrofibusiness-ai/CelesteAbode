import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdminClient();
    
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const formType = searchParams.get('formType');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
    const offset = (page - 1) * limit;

    // Get filtered count
    let countQuery = supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    // Apply filters to count query
    if (status && status !== 'all') {
      countQuery = countQuery.eq('status', status);
    }
    if (formType && formType !== 'all') {
      countQuery = countQuery.eq('form_type', formType);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Error fetching lead count:', countError);
      return NextResponse.json(
        { error: 'Failed to fetch lead count' },
        { status: 500 }
      );
    }

    // Now fetch the actual data with pagination
    let dataQuery = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters to data query
    if (status && status !== 'all') {
      dataQuery = dataQuery.eq('status', status);
    }
    if (formType && formType !== 'all') {
      dataQuery = dataQuery.eq('form_type', formType);
    }

    // Apply pagination
    dataQuery = dataQuery.range(offset, offset + limit - 1);

    const { data, error: dataError } = await dataQuery;

    if (dataError) {
      console.error('[Leads API] Error fetching leads:', dataError);
      return NextResponse.json(
        { error: 'Failed to fetch leads', details: dataError.message },
        { status: 500 }
      );
    }

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      leads: data || [],
      total: totalCount,
      page,
      limit,
      totalPages,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Exception fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = getSupabaseAdminClient();
    const body = await request.json();
    
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const updateData: {
      status?: string;
      notes?: string;
      updated_at?: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    console.error('Exception updating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

