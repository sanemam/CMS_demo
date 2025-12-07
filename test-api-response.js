const http = require('http');

async function testAPI() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: '/api/content',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response Headers:', res.headers);
        try {
          const parsed = JSON.parse(data);
          console.log('Response Type:', Array.isArray(parsed) ? 'Array' : typeof parsed);
          console.log('Response Length:', Array.isArray(parsed) ? parsed.length : 'N/A');
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('First item keys:', Object.keys(parsed[0]));
            console.log('First item:', JSON.stringify(parsed[0], null, 2));
          } else if (parsed.error) {
            console.log('Error:', parsed.error);
          }
          resolve(parsed);
        } catch (e) {
          console.log('Raw Response:', data);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e.message);
      reject(e);
    });

    req.end();
  });
}

console.log('Testing /api/content endpoint...');
testAPI().catch(console.error);
