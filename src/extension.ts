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
            vscode.Uri.file(path.join(context.extensionPath, 'out/webview-ui')),
          ],
        }
      );

      const reactAppPath = path.join(
        context.extensionPath,
        'out',
        'webview-ui',
        'index.html'
      );

      panel.webview.html = getWebviewContent(panel.webview, reactAppPath);
    })
  );
}

function getWebviewContent(webview: vscode.Webview, reactAppPath: string) {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.file(reactAppPath.replace('index.html', 'index.js'))
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="${scriptUri}" defer></script>
  <title>Chat Assistant</title>
</head>
<body class="bg-gray-100">
  <div id="root"></div>
</body>
</html>`;
}
