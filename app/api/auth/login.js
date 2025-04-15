export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { email, password } = req.body;
  
      // Stuur de login request door naar je Azure backend
      const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      // Ontvang backend response
      const data = await backendResponse.json();
  
      if (!backendResponse.ok) {
        // Backend gaf een error (bijv. 401 Unauthorized)
        return res.status(backendResponse.status).json({ message: data.message || 'Login failed' });
      }
  
      // Login succesvol
      // (Hier kan je eventueel nog tokens/cookies zelf zetten als de backend dat niet doet)
      res.status(200).json({ message: 'Login successful', user: data.user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  