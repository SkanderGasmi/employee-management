// Serve static files from frontend directory
const frontendPath = process.env.FRONTEND_PATH || path.join(__dirname, '../frontend');

if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    console.log(`📁 Serving frontend from: ${frontendPath}`);
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    console.log('⚠️  Frontend directory not found, only serving API');
    
    // If no frontend, at least serve a basic HTML
    app.get('*', (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head><title>Employee Management API</title></head>
            <body>
                <h1>Employee Management API</h1>
                <p>Frontend not found. Please build the frontend files.</p>
                <p>API is running at <a href="/api">/api</a></p>
            </body>
            </html>
        `);
    });
}