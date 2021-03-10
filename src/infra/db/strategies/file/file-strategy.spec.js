const { FileStrategy } = require('./file-strategy')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const filePath = join(__dirname, './tests/file.json')

const makeSut = () => new FileStrategy(filePath)

let commentsByPostId = {}

describe('File Strategy suite tests', () => {
   describe('readFile()', () => {
       it('Should return file content', async () => {
           const obj = { test: 1 }
           await writeFile(filePath, JSON.stringify(obj))

           const sut = makeSut()
           const content = await sut.readFile()
           expect(content).toEqual(obj)
       })
   })
})
