import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListForm } from './transaction-list-form';
import Keycloak from 'keycloak-js';
import { MockKeycloak } from '../../../mocks/mock-keycloak';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import { MOCK_KEYCLOAK_EVENT_SIGNAL } from '../../../mocks/mock-keycloak-signal';
import { MenuComponent } from '../../menu/menu.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialTransactionState } from '../state/transaction.reducers';
import { TransactionList } from '../transaction-list/transaction-list';
import { ActivatedRoute } from '@angular/router';
import { mockRoute } from '../../../mocks/activated-route-mock';
import { TranslateService } from '@ngx-translate/core';
import { testTranslations } from '../../../mocks/test-functions';

describe('TransactionListForm', () => {
  let component: TransactionListForm;
  let fixture: ComponentFixture<TransactionListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionListForm,
        TransactionList,
        MenuComponent,
        testTranslations(),
      ],
      providers: [
        { provide: Keycloak, useClass: MockKeycloak },
        {
          provide: KEYCLOAK_EVENT_SIGNAL,
          useValue: MOCK_KEYCLOAK_EVENT_SIGNAL,
        },
        provideMockStore({ initialState: initialTransactionState }),
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render page in english (default)', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en');
    const fixture = TestBed.createComponent(TransactionListForm);

    fixture.detectChanges();
    const idElement: HTMLElement = fixture.nativeElement.querySelector(
      '#labelTransactionList',
    );
    expect(idElement.innerText).toContain('Transaction List');
  });

  it('should render page in proper language', () => {
    const fixture = TestBed.createComponent(TransactionListForm);

    const translateService = TestBed.inject(TranslateService);
    translateService.use('pl');

    fixture.detectChanges();
    const idElement: HTMLElement = fixture.nativeElement.querySelector(
      '#labelTransactionList',
    );
    expect(idElement.innerText).toContain('Lista transakcji');
  });
});
