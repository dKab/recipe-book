export function renderPage(appHtml) {
    return `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Recipy book</title>
        </head>
        <body>
        <div id="react-root">${appHtml}</div>
        <script type="text/javascript" src="/bundle.js"></script>
        </body>
        </html>
           `;
}