import { TestBed, inject } from '@angular/core/testing';

import { IntroDisplayService } from './intro-display.service';

describe('IntroDisplayService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IntroDisplayService]
        });
    });

    it('should be created', inject([IntroDisplayService], (service: IntroDisplayService) => {
        expect(service).toBeTruthy();
    }));
});
