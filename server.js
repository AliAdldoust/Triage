import http from 'http';
import fs from 'fs';
import path from 'path';
import { analyzeSymptoms } from './ai/symptomAnalyzer.js';
import { fileURLToPath } from 'url';



const server = http.createServer((req, res) => {

    if (req.method === "GET"){
    
        const url = new URL(req.url, `http://${req.headers.host}`);
        let requestedFile = decodeURIComponent(url.pathname);
    
        // Default file
        if (requestedFile === '/') {
            requestedFile = '/index.html';
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        // Build the file path
        const filePath = path.resolve(__dirname, '.' + requestedFile);
    
        // Prevent access outside the project directory
        if (!filePath.startsWith(__dirname + path.sep)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }
    
    
        const contentTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg'
        };
    
        const extname = path.extname(filePath);
    
    
        const contentType = contentTypes[extname] || 'application/octet-stream';
    
    
    
            fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading HTML file');
                return;
            }
    
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });

        return;

    }        






    if (req.method === 'POST' && req.url === '/api/selected-items'){

        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });



        req.on('end', async () => {

            const data = JSON.parse(body);
            const conversation = data.conversation;


            const analysis = await analyzeSymptoms(conversation);


            res.writeHead(200, {
                    'Content-Type': 'application/json'
            });
        
            res.end(JSON.stringify({ analysis }));

    })
          
            return; 
        
    }

    res.writeHead(404);
    res.end('Not Found');


});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});





