const { readFile, writeFile } = require('fs/promises')

class FileHelper {
    static async readFile (filePath)  {
        const content = JSON.parse(
            await readFile(filePath)
        )
        return content
    }

    static async writeFile ({
        path,
        content
    }) {
        await writeFile(
            path,
            JSON.stringify(content)
        )
    }
}

module.exports = {
    FileHelper
}
