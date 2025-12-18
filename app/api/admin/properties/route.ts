import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { Property } from "@/types/property";

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

    return NextResponse.json({ properties: data || [] });
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
    const property: Omit<Property, "id" | "createdAt" | "updatedAt"> = {
      slug: body.slug,
      projectName: body.projectName,
      developer: body.developer,
      location: body.location,
      reraId: body.reraId,
      status: body.status,
      possessionDate: body.possessionDate,
      unitTypes: body.unitTypes || [],
      sizes: body.sizes,
      description: body.description,
      heroImage: body.heroImage,
      brochureUrl: body.brochureUrl,
      images: body.images || [],
      videos: body.videos || [],
      amenities: body.amenities || [],
      price: body.price,
      seo: body.seo || {},
      isPublished: body.isPublished || false,
    };

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("properties")
      .insert([property])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create property" },
        { status: 500 }
      );
    }

    return NextResponse.json({ property: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

