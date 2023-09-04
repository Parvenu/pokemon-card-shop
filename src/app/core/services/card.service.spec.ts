import { HttpClient } from '@angular/common/http'
import { CardService } from './card.service'
import { CardFilters } from 'src/app/shared/models/api.model'
import { of } from 'rxjs'

describe('CardService', () => {
    let cardService: CardService

	beforeEach(() => {
		cardService = new CardService({} as HttpClient)
	});

    it('should build a querry string', () => {  
        const page = 1
        const filters: CardFilters = {}

        const httpClient = {
            get: (url: string) => {
                expect(url.match(/(\?|&)[\w+\.\:*]+=[\w+\.\:*]+/g)?.length).toBe(3)
                return of({ data: [], page, pageSize: 21, totalCount: 1 })
            }
        }
        cardService = new CardService(httpClient as unknown as HttpClient)
        cardService.getCards(page, filters).subscribe((res) => expect(res.allLoaded).toBeTrue())
    })
})