import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    // Query to fetch image data and its content type
    const query = {
      text: 'SELECT data FROM userimages WHERE id = $1',
      values: [id], // No need to await `params.id`
    };

    // Execute the query
    const result = await sql.query(query);

    // Check if the image was found
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const image = result.rows[0];

    // Return the image with appropriate headers
    return new NextResponse(image.data, {
      headers: {
        // 'Content-Type': image.content_type,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve image' },
      { status: 500 }
    );
  }
}
