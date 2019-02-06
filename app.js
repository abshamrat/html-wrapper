const wrapper = require('./src/wrapper');
const path = require('path');
const pattern = `<code class=${process.env.ELEM_CLASS}> <%= html %> </code>`;
const lookElem = process.env.LOOK_ELEM;

console.log(process.env.STRICT_WRAP === 'false');

console.log(wrapper.wrapFilesBy(pattern, lookElem));
