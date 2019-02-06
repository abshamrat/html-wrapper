const env = require('dotenv-loader');
const cheerio = require('cheerio');
const fs = require('fs');
const _ = require('lodash');
var isValid = require('is-valid-path');


env.load().on('error', (err) => {throw Error(err)});

async function getFileList (srcDir) {
    try {
        if (!isValid(srcDir)) {
            throw new Error('SRC_DIR is not valied');
        }
        const nameList = fs.readdirSync(srcDir);
        return nameList.filter((file) => { return file.split(/(.html|.htm)/)[1] || false });
    } catch (error) {
        console.error(error)
    }
    return false;
}

async function saveChange(fileName, content) {
    try {
        fs.writeFileSync(`${process.env.SRC_DIR+fileName}`, content, process.ENCODING);
    } catch (error) {
        
    }
}

module.exports = {
    getFileList: getFileList,
    wrapFilesBy: async (pattern, lookElem) => {
        const fileList = await getFileList(process.env.SRC_DIR);
        fileList.map(async (fileName) => {
            const html  = fs.readFileSync(process.env.SRC_DIR+fileName, process.env.ENCODING);
            const $ = await cheerio.load(html);
            if ($(lookElem).find('code').length < 1 || process.env.STRICT_WRAP === 'true') {
                const compiled = await _.template(pattern);
                $(lookElem).html(await compiled({html: `${$(lookElem).html()}`}));
                await saveChange(fileName, $.html());
            }
        });
    },
    appendElements: async (elements) => {
        const fileList = await getFileList(process.env.SRC_DIR);
        fileList.map(async (fileName) => {
            const html  = fs.readFileSync(process.env.SRC_DIR+fileName, process.env.ENCODING);
            const $ = await cheerio.load(html);
            if ($(lookElem).find('code').length < 1 || process.env.STRICT_WRAP === 'true') {
                const compiled = await _.template(pattern);
                $(lookElem).html(await compiled({html: `${$(lookElem).html()}`}));
                await saveChange(fileName, $.html());
            }
        });
    }

}