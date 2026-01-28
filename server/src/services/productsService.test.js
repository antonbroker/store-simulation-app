const productsRepo = require('../repositories/productsRepo')
const productsService = require('./productsService')

jest.mock('../repositories/productsRepo')

beforeEach(() => {
    jest.clearAllMocks()
})

describe('productsService', () => {
    describe('getAllProducts', () => {
        it('returns all products from repo', () => {
            const list = [{ name: 'milk' }, { name: 'eggs' }]
            productsRepo.getAllProducts.mockReturnValue(list)

            const result = productsService.getAllProducts()

            expect(productsRepo.getAllProducts).toHaveBeenCalledTimes(1)
            expect(result).toEqual(list)
        })
    })

    describe('addProduct', () => {
        it('adds product and returns list when name is valid and unique', () => {
            productsRepo.productExists.mockReturnValue(false)
            productsRepo.addProduct.mockReturnValue([{ name: 'milk' }, { name: 'new' }])

            const result = productsService.addProduct('new')

            expect(productsRepo.productExists).toHaveBeenCalledWith('new')
            expect(productsRepo.addProduct).toHaveBeenCalledWith('new')
            expect(result).toEqual([{ name: 'milk' }, { name: 'new' }])
        })

        it('trims name and passes trimmed name to repo', () => {
            productsRepo.productExists.mockReturnValue(false)
            productsRepo.addProduct.mockReturnValue([{ name: 'trimmed' }])

            productsService.addProduct('  trimmed  ')

            expect(productsRepo.addProduct).toHaveBeenCalledWith('trimmed')
        })

        it('throws 400 when name is missing', () => {
            expect(() => productsService.addProduct('')).toThrow('invalid product, name is missing')
            expect(() => productsService.addProduct('   ')).toThrow('invalid product, name is missing')
            expect(() => productsService.addProduct(null)).toThrow('invalid product, name is missing')
            expect(productsRepo.addProduct).not.toHaveBeenCalled()
        })

        it('throws 400 when product name already exists', () => {
            productsRepo.productExists.mockReturnValue(true)

            expect(() => productsService.addProduct('milk')).toThrow('product name already exists')
            expect(productsRepo.addProduct).not.toHaveBeenCalled()
        })
    })
})
