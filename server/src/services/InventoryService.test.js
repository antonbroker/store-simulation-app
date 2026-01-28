const inventoryRepo = require('../repositories/InventoryRepo')
const productsRepo = require('../repositories/productsRepo')
const inventoryService = require('./InventoryService')

jest.mock('../repositories/InventoryRepo')
jest.mock('../repositories/productsRepo')

beforeEach(() => {
    jest.clearAllMocks()
})

describe('InventoryService', () => {
    describe('getInventory', () => {
        it('returns inventory from repo', () => {
            const list = [{ name: 'milk', quantity: 2 }]
            inventoryRepo.getInventory.mockReturnValue(list)

            const result = inventoryService.getInventory()

            expect(inventoryRepo.getInventory).toHaveBeenCalledTimes(1)
            expect(result).toEqual(list)
        })
    })

    describe('resetInventory', () => {
        it('resets and returns empty array', () => {
            inventoryRepo.resetInventory.mockReturnValue([])

            const result = inventoryService.resetInventory()

            expect(inventoryRepo.resetInventory).toHaveBeenCalledTimes(1)
            expect(result).toEqual([])
        })
    })

    describe('saveInventory', () => {
        it('saves valid inventory when all names exist in products', () => {
            productsRepo.getAllProducts.mockReturnValue([{ name: 'milk' }, { name: 'eggs' }])
            const items = [{ name: 'milk', quantity: 2 }]
            inventoryRepo.setInventory.mockReturnValue(items)

            const result = inventoryService.saveInventory(items)

            expect(productsRepo.getAllProducts).toHaveBeenCalled()
            expect(inventoryRepo.setInventory).toHaveBeenCalledWith(items)
            expect(result).toEqual(items)
        })

        it('throws 400 with schema message when not an array', () => {
            expect(() => inventoryService.saveInventory(null)).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(() => inventoryService.saveInventory('not array')).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(inventoryRepo.setInventory).not.toHaveBeenCalled()
        })

        it('throws 400 with schema message when item missing name or quantity', () => {
            expect(() => inventoryService.saveInventory([{ name: 'milk' }])).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(() => inventoryService.saveInventory([{ quantity: 1 }])).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(() => inventoryService.saveInventory([{}])).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(inventoryRepo.setInventory).not.toHaveBeenCalled()
        })

        it('throws 400 with schema message when quantity is not a non-negative integer', () => {
            productsRepo.getAllProducts.mockReturnValue([{ name: 'milk' }])
            expect(() => inventoryService.saveInventory([{ name: 'milk', quantity: 2.5 }])).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(() => inventoryService.saveInventory([{ name: 'milk', quantity: -1 }])).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(() => inventoryService.saveInventory([{ name: 'milk', quantity: 'abc' }])).toThrow(
                'Some of the inventory items are missing attribute: "name" or "quantity"'
            )
            expect(inventoryRepo.setInventory).not.toHaveBeenCalled()
        })

        it('throws 400 when item name is not in products list', () => {
            productsRepo.getAllProducts.mockReturnValue([{ name: 'milk' }])
            const items = [{ name: 'milk', quantity: 1 }, { name: 'unknown', quantity: 2 }]

            expect(() => inventoryService.saveInventory(items)).toThrow(
                'Some of the inventory items are missing in the products list'
            )
            expect(inventoryRepo.setInventory).not.toHaveBeenCalled()
        })

        it('throws 400 when all items missing from products list', () => {
            productsRepo.getAllProducts.mockReturnValue([])
            const items = [{ name: 'milk', quantity: 1 }]

            expect(() => inventoryService.saveInventory(items)).toThrow(
                'Some of the inventory items are missing in the products list'
            )
            expect(inventoryRepo.setInventory).not.toHaveBeenCalled()
        })
    })
})
