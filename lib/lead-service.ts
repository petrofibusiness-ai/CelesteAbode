/**
 * Centralized Lead Service
 * Handles storing leads in the database
 */

import { getSupabaseAdminClient } from './supabase-server';
import { getClientIP } from './security';

export interface LeadData {
  // Contact Information
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  
  // Form Source Information
  formType: 'contact' | 'viewing' | 'location-contact' | 'advisory-session' | 'chatbot' | 'segmented-entry';
  formSource?: string;
  pageUrl?: string;
  
  // Property/Location Context
  propertyName?: string;
  propertyLocation?: string;
  propertySlug?: string;
  locationSlug?: string;
  
  // Form-Specific Data
  formData?: Record<string, any>;
  
  // Lead Metadata
  leadScore?: string;
  clientIP?: string;
}

export interface LeadResult {
  success: boolean;
  leadId?: string;
  error?: string;
}

/**
 * Store a lead in the database
 * This function is called by all form API endpoints
 */
export async function storeLead(leadData: LeadData): Promise<LeadResult> {
  try {
    const supabase = getSupabaseAdminClient();
    
    // Prepare the lead record
    const leadRecord = {
      first_name: leadData.firstName,
      last_name: leadData.lastName,
      email: leadData.email || null,
      phone: leadData.phone,
      form_type: leadData.formType,
      form_source: leadData.formSource || null,
      page_url: leadData.pageUrl || null,
      property_name: leadData.propertyName || null,
      property_location: leadData.propertyLocation || null,
      property_slug: leadData.propertySlug || null,
      location_slug: leadData.locationSlug || null,
      form_data: leadData.formData || {},
      lead_score: leadData.leadScore || null,
      client_ip: leadData.clientIP || null,
      status: 'new',
      email_sent: false,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(leadRecord)
      .select('id')
      .single();

    if (error) {
      console.error('Error storing lead in database:', {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        leadData: {
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          formType: leadData.formType,
        },
      });
      return {
        success: false,
        error: error.message || 'Failed to store lead',
      };
    }

    return {
      success: true,
      leadId: data?.id,
    };
  } catch (error) {
    console.error('Exception storing lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error storing lead',
    };
  }
}

/**
 * Update lead email status after email is sent
 */
export async function updateLeadEmailStatus(
  leadId: string,
  emailSent: boolean,
  error?: string
): Promise<void> {
  try {
    const supabase = getSupabaseAdminClient();
    
    const updateData: {
      email_sent: boolean;
      email_sent_at?: string;
      email_error?: string;
    } = {
      email_sent: emailSent,
    };

    if (emailSent) {
      updateData.email_sent_at = new Date().toISOString();
    } else if (error) {
      updateData.email_error = error.substring(0, 500); // Limit error length
    }

    await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId);
  } catch (error) {
    console.error('Error updating lead email status:', error);
    // Don't throw - this is a non-critical operation
  }
}

