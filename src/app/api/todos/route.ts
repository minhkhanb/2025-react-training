import { NextResponse } from 'next/server';
import { get, create } from '@/src/config/axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  try {
    const data = await get('/todos', params);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Error fetching todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await create('/todos', body);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Error creating todo' },
      { status: 500 }
    );
  }
}
