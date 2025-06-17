// app/api/todos/[id]/route.ts

import { NextResponse } from 'next/server';
import { update, remove } from '@/src/config/axios';

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const data = await update(`/todos/${params.id}`, body);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Error updating todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await remove('/todos', params.id);
    return NextResponse.json({ message: 'Todo deleted' });
  } catch {
    return NextResponse.json(
      { message: 'Error deleting todo' },
      { status: 500 }
    );
  }
}
