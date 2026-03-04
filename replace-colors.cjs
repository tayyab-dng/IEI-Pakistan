const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/#FFD43B/ig, '#ffcc00');
            newContent = newContent.replace(/#FFC107/ig, '#ffcc00');
            newContent = newContent.replace(/rgba\(255,212,59/ig, 'rgba(255,204,0');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated color in ${fullPath}`);
            }
        }
    }
}

replaceInDir('./src');
console.log('Done replacing colors.');
