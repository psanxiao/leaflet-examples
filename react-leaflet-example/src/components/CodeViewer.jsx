import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-jsx.min'; // For JSX syntax
import 'prismjs/plugins/toolbar/prism-toolbar.css'; // Toolbar styles
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min';
import 'prismjs/plugins/toolbar/prism-toolbar.min';

function CodeViewer({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <pre>
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default CodeViewer;
