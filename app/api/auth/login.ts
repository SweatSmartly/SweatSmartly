import type { NextApiRequest, NextApiResponse } from 'next';

type LoginRequestBody = {
  email: string;
  password: string;
};

type SuccessResponse = {
  message: string;
  user: unknown; // vervang met jouw echte usertype als je die hebt
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password }: LoginRequestBody = req.body;

    const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return res.status(backendResponse.status).json({
        message: data.message || 'Login failed',
      });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: data.user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
