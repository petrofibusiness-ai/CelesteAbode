import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase-server';
import { getCurrentUser } from '@/lib/auth';
import { verifyCSRFToken } from '@/lib/csrf';
import {
  validateQueryParams,
  validateJSONBody,
  LeadFilterSchema,
  UpdateLeadSchema,
} from '@/lib/validation-schemas';
import { logSecurityEvent, getClientIP, getUserAgent } from '@/lib/security-events';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdminClient();

    // Parse and validate query parameters
    let filters;
    try {
      const rawParams = {
        status: request.nextUrl.searchParams.get('status'),
        formType: request.nextUrl.searchParams.get('formType'),
        page: request.nextUrl.searchParams.get('page'),
        limit: request.nextUrl.searchParams.get('limit'),
        t: request.nextUrl.searchParams.get('t'),
        _t: request.nextUrl.searchParams.get('_t'),
      };
      filters = validateQueryParams(LeadFilterSchema, rawParams);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/leads',
        metadata: {
          error: error instanceof Error ? error.message : 'Invalid parameters',
        },
      });

      return NextResponse.json(
        { error: 'Invalid query parameters' },
        { status: 400 }
      );
    }

    const { page, limit, status, formType } = filters;
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
    console.error('[INTERNAL] Exception fetching leads:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // CSRF token validation
    const csrfToken = request.headers.get('x-csrf-token');
    const isValidCSRF = await verifyCSRFToken(csrfToken);

    if (!isValidCSRF) {
      const ip = getClientIP(request.headers.get('x-forwarded-for'));
      await logSecurityEvent('CSRF_FAILED', {
        userId: user.id,
        userEmail: user.email,
        ip,
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/leads',
      });

      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    let updateData;
    try {
      const body = await request.json();
      updateData = validateJSONBody(UpdateLeadSchema, body);
    } catch (error) {
      await logSecurityEvent('INVALID_INPUT', {
        userId: user.id,
        userEmail: user.email,
        ip: getClientIP(request.headers.get('x-forwarded-for')),
        userAgent: getUserAgent(request.headers.get('user-agent')),
        endpoint: '/api/admin/leads',
        metadata: {
          error: error instanceof Error ? error.message : 'Invalid input',
        },
      });

      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    const { id, status, notes } = updateData;

    const dataToUpdate: {
      status?: string;
      notes?: string;
      updated_at?: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      dataToUpdate.status = status;
    }
    if (notes !== undefined) {
      dataToUpdate.notes = notes;
    }

    const { data, error } = await supabase
      .from('leads')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[INTERNAL] Error updating lead:', error);
      return NextResponse.json(
        { error: 'An error occurred while processing your request' },
        { status: 500 }
      );
    }

    // Log audit entry for lead update
    await logSecurityEvent('UNAUTHORIZED_ACCESS', {
      userId: user.id,
      userEmail: user.email,
      ip: getClientIP(request.headers.get('x-forwarded-for')),
      userAgent: getUserAgent(request.headers.get('user-agent')),
      endpoint: '/api/admin/leads',
      metadata: {
        operation: 'UPDATE',
        leadId: id,
        updates: Object.keys(dataToUpdate),
      },
    });

    return NextResponse.json({ lead: data });
  } catch (error) {
    console.error('[INTERNAL] Exception updating lead:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

