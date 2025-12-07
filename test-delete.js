const http = require('http');

async function testDelete() {
  const contentId = '3528c4ee-4ec0-48d2-b8a8-330c00501fac';
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/content/${contentId}`,
      method: 'DELETE',
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
        console.log('Response:', data);
        try {
          const parsed = JSON.parse(data);
          console.log('\n✅ Delete Result:');
          console.log(JSON.stringify(parsed, null, 2));
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

console.log('🧪 Testing DELETE /api/content/[id] endpoint...');
testDelete().catch(console.error);
