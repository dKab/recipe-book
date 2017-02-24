export function renderPage(appHtml, initialState) {
    return `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Recipy book</title>
            <link rel="stylesheet" href="/styles.css"/>    
        </head>
        <body>
        <div id="react-root">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="/bundle.js"></script>
        </body>
        </html>
           `;
}