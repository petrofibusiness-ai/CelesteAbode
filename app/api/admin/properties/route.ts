import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { Property } from "@/types/property";
import { supabaseToProperty, propertyToSupabase } from "@/lib/supabase-property-mapper";

// GET - List all properties
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Fetch properties from Supabase
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch properties" },
        { status: 500 }
      );
    }

    // Convert snake_case to camelCase
    const properties = (data || []).map(supabaseToProperty);

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new property
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Step 1: Validate required fields
    const requiredFields = ['slug', 'projectName', 'developer', 'location', 'status', 'sizes', 'description', 'heroImage'];
    const missingFields = requiredFields.filter(field => !body[field] || (typeof body[field] === 'string' && body[field].trim() === ''));
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Step 2: Validate and sanitize data
    const property: Omit<Property, "id" | "createdAt" | "updatedAt"> = {
      slug: body.slug.trim().toLowerCase(),
      projectName: body.projectName.trim(),
      developer: body.developer.trim(),
      location: body.location.trim(),
      reraId: body.reraId?.trim() || undefined,
      status: body.status.trim(),
      possessionDate: body.possessionDate?.trim() || undefined,
      unitTypes: Array.isArray(body.unitTypes) ? body.unitTypes : [],
      sizes: body.sizes.trim(),
      description: body.description.trim(),
      heroImage: body.heroImage.trim(), // Must be a valid URL
      brochureUrl: body.brochureUrl?.trim() || undefined,
      images: Array.isArray(body.images) ? body.images.filter((url: string) => url && url.trim()) : [],
      videos: Array.isArray(body.videos) ? body.videos : [],
      amenities: Array.isArray(body.amenities) ? body.amenities.filter((a: string) => a && typeof a === 'string' && a.trim() !== '') : [],
      price: body.price?.trim() || undefined,
      seo: body.seo && typeof body.seo === 'object' ? body.seo : {},
      isPublished: body.isPublished === true, // Explicitly set boolean
    };

    // Step 3: Validate hero image URL
    if (!property.heroImage || !property.heroImage.startsWith('http')) {
      return NextResponse.json(
        { error: "Hero image must be a valid URL" },
        { status: 400 }
      );
    }

    // Step 4: Convert camelCase to snake_case for Supabase
    const supabaseProperty = propertyToSupabase(property);

    // Step 5: Insert into Supabase with transaction-like behavior
    // (Supabase doesn't support transactions in the same way, but we ensure data integrity)
    const { data, error } = await supabaseAdmin
      .from("properties")
      .insert([supabaseProperty])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      
      // Handle specific Supabase errors
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: `A property with slug "${property.slug}" already exists` },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: error.message || "Failed to create property in database" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Property created but no data returned" },
        { status: 500 }
      );
    }

    // Step 6: Convert snake_case back to camelCase
    const createdProperty = supabaseToProperty(data);

    return NextResponse.json({ property: createdProperty }, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

