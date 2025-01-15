import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';

async function GetUser(){
  const session = await auth()
  console.log(session?.user)
  return session?.user
}

export async function POST(request: Request) {
  console.log('Called Self created POST')
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const User= await GetUser();
    const query = {
      text: 'INSERT INTO userimages (id,title, data,createdat) VALUES ($1, $2, $3, NOW()) RETURNING id',
      values: [User?.name,file.name, buffer],
    };

    const result = await sql.query(query);
     
    return NextResponse.json({ 
      success: true, 
      id: result.rows[0].id 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
