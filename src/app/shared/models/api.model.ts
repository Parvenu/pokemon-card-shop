import { RARITY, TYPES, SUBTYPES } from './card.model'

export class ApiResponse<T> {
    data!: T[]
    count!: number
    page!: number
    pageSize!: number
    totalCount!: number
}

export class CardFilters {
    search?: string
    rarity?: string
    types?: string
    subtypes?: string
}