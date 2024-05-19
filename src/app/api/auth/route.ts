import { NextRequest, NextResponse } from 'next/server';

const MOCK_USERS = [
  {
    id: '001',
    name: 'John Doe',
    email: 'test@gmail.com',
    password: '1',
  },
];

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  if (!req.body || !requestBody?.email || !requestBody.password)
    return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 });

  try {
    const userData = MOCK_USERS.find((user) => user.email == requestBody.email);

    if (!userData) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (requestBody.password !== userData.password) {
      return NextResponse.json({ success: false, message: 'Wrong password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, data: { userData } }, { status: 200 });
  } catch (err) {
    console.log('Err at signing in: ', err);
    return NextResponse.json({ success: false, message: 'Could Not Found the user' }, { status: 500 });
  }
}
