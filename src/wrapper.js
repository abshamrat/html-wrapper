const env = require('dotenv-loader');
const cheerio = require('cheerio');
const fs = require('fs');
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

module.exports = {
    getFileList: getFileList,
    wrapFilesBy: async (pattern) => {
        const fileList = await getFileList(process.env.SRC_DIR);
        fileList.map((fileName) => {
            const html  = fs.readFileSync(process.env.SRC_DIR+fileName, process.env.ENCODING);
            const $ = cheerio.load(html);
            console.log($('pre').html());

        });
    }

}