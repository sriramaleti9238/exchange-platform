import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMenu } from './ticket-menu';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { mockRoute } from '../../../mocks/mock-activated-route';
import { TranslateTestingModule } from 'ngx-translate-testing';
import assets_en from '../../../assets/i18n/en.json';
import assets_pl from '../../../assets/i18n/pl.json';
import { By } from '@angular/platform-browser';

describe('TicketMenu', () => {
  let component: TicketMenu;
  let fixture: ComponentFixture<TicketMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TicketMenu,
        TranslateTestingModule.withTranslations(
          'en',
          assets_en,
        ).withTranslations('pl', assets_pl),
      ],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render page in english (default)', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    const fixture = TestBed.createComponent(TicketMenu);

    fixture.detectChanges();
    const idElement: HTMLElement =
      fixture.nativeElement.querySelector('#labelTicketAdd');
    expect(idElement.innerText).toContain('Add Ticket');
  });

  it('should render page in proper language', () => {
    const fixture = TestBed.createComponent(TicketMenu);

    const translateService = TestBed.inject(TranslateService);
    translateService.use('pl');

    fixture.detectChanges();
    const idElement: HTMLElement =
      fixture.nativeElement.querySelector('#labelTicketAdd');
    expect(idElement.innerText).toContain('Dodaj Zlecenie');
  });
  [
    { id: 'ticketList', description: 'Ticket List' },
    { id: 'addTicket', description: 'Add ticket' },
  ].forEach(({ id, description }) => {
    it(`should check the menu option ${description} when clicked`, () => {
      const radioButton = fixture.debugElement.query(By.css(`#${id}`));
      radioButton.nativeElement.click();
      fixture.detectChanges();

      const isChecked = (document.getElementById(id) as HTMLInputElement)
        .checked;
      expect(isChecked).toBeTrue();
    });
  });
});
