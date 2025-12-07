const http = require('http');

async function testUpdate() {
  const contentId = 'd20c665f-386c-4917-9fe0-772ffe482eb4';
  
  const updateData = {
    title: 'Updated Test Title',
    text: 'This is the updated description text',
    image: '/uploads/1765084648590-133982705341263424.jpg'
  };
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/content/${contentId}`,
      method: 'PUT',
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
          console.log('\n✅ Update Result:');
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

    req.write(JSON.stringify(updateData));
    req.end();
  });
}

console.log('🧪 Testing PUT /api/content/[id] endpoint...');
testUpdate().catch(console.error);
