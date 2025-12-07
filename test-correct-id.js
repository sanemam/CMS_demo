const http = require('http');

async function testWithCorrectId() {
  const contentId = 'd20c665f-386c-4917-9fe0-772ffe482eb4';
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/content/${contentId}`,
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
        console.log('Response:', data);
        try {
          const parsed = JSON.parse(data);
          console.log('\n✅ Individual Content Result:');
          console.log(JSON.stringify(parsed, null, 2));
          console.log('\n🔍 Field Analysis:');
          console.log('Has text field:', 'text' in parsed);
          console.log('Has description field:', 'description' in parsed);
          console.log('Text value:', parsed.text);
          console.log('Description value:', parsed.description);
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

console.log('🧪 Testing GET /api/content/[id] with CORRECT ID...');
testWithCorrectId().catch(console.error);
