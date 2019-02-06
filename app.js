const {appendElementsTo, wrapFilesBy} = require('./src/wrapper');
const pattern = `<code class=${process.env.ELEM_CLASS}></code>`;
const lookElem = process.env.LOOK_ELEM;
const appendTo = process.env.APPEND_ELEM_TO;
const elementsToappend = `
    <link rel="stylesheet" href="../assets/css/vs2015.css"> 
    <script src="../assets/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script> `;

appendElementsTo(elementsToappend, appendTo);
// wrapFilesBy(pattern, lookElem);
