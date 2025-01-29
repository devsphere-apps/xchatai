import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-chatui.helloWorld', () => {
      const panel = vscode.window.createWebviewPanel(
        'chatAssistant',
        'Chat Assistant',
        vscode.ViewColumn.Three,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'out', 'webview-ui'))
          ]
        }
      );

      // Get webview content
      const webviewPath = path.join(context.extensionPath, 'out', 'webview-ui');
      panel.webview.html = getWebviewContent(panel.webview, webviewPath);
    })
  );
}

function getWebviewContent(webview: vscode.Webview, webviewPath: string) {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(webviewPath, 'index.js'))
  );

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Chat Assistant</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="${scriptUri}"></script>
    </body>
  </html>`;
}
