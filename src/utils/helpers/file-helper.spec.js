const { readFile, writeFile } = require('fs/promises')
const { join } = require('path')
const { FileHelper } = require('./file-helper')

const mockFakeObj = () => ({
    id: 1
})

const filePath = join(__dirname, './tests/file.json')

describe('File Helper suite tests', () => {
    beforeEach(async () => {
        await writeFile(filePath, '{}')
    })

    describe('readFile()', () => {
        it('Should return file content', async () => {
            const obj = mockFakeObj()
            await writeFile(filePath, JSON.stringify(obj))

            const content = await FileHelper.readFile(filePath)
            expect(content).toEqual(obj)
        })
    })

    describe('writeFile()', () => {
        it('Should write content to the file', async () => {
             let fileContent = JSON.parse(
                 await readFile(filePath)
             )
             expect(Object.keys(fileContent)).toHaveLength(0)
            
             const obj = mockFakeObj()
             await FileHelper.writeFile({
                 path: filePath,
                 content: obj
             })
             fileContent = JSON.parse(
                await readFile(filePath)
             )
             expect(Object.keys(fileContent)).toHaveLength(1)
        })
    })
})