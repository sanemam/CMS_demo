const http = require('http');

async function testApi() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
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
        console.log('Headers:', res.headers);
        console.log('Response:', data);
        try {
          const parsed = JSON.parse(data);
          console.log('\n✅ Parsed JSON:');
          console.log('Records found:', Array.isArray(parsed) ? parsed.length : 'Not an array');
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('First record:', JSON.stringify(parsed[0], null, 2));
          }
          resolve(parsed);
        } catch (e) {
          console.log('❌ JSON parse error:', e.message);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ Request error:', e.message);
      reject(e);
    });

    req.end();
  });
}

console.log('🧪 Testing /api/content endpoint...');
testApi().catch(console.error);
