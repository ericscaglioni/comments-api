const { FileStrategy } = require('./file-strategy')
const { join } = require('path')
const { readFile, writeFile } = require('fs/promises')
const { NotImplementedException } = require('../../../../utils/errors')

const filePath = join(__dirname, './tests/file.json')

const makeSut = () => new FileStrategy(filePath)

const mockFakeObj = () => ({
    id: 1
})

describe('File Strategy suite tests', () => {
    beforeEach(async () => {
        await writeFile(filePath, '{}')
    })

   describe('readFile()', () => {
       it('Should return file content', async () => {
           const obj = mockFakeObj()
           await writeFile(filePath, JSON.stringify(obj))

           const sut = makeSut()
           const content = await sut.readFile()
           expect(content).toEqual(obj)
       })
   })

   describe('writeFile()', () => {
       it('Should write content to the file', async () => {
            const sut = makeSut()

            let fileContent = JSON.parse(
                await readFile(filePath)
            )
            expect(Object.keys(fileContent)).toHaveLength(0)
           
            const obj = mockFakeObj()
            await sut.writeFile(obj)
            fileContent = JSON.parse(
               await readFile(filePath)
            )
            expect(Object.keys(fileContent)).toHaveLength(1)
       })
   })

   describe('add()', () => {
       it('Should return a NotImplementedException', async () => {
           const sut = makeSut()
           const error = await sut.add({})
           expect(error).toEqual(new NotImplementedException())
       })
   })

   describe('connect()', () => {
       it('Should return a NotImplementedException', async () => {
           const sut = makeSut()
           const error = await sut.connect({})
           expect(error).toEqual(new NotImplementedException())
       })
   })
})
