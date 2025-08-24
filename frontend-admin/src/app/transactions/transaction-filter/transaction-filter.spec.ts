import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionFilter} from './transaction-filter';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTransactionState} from '../state/transaction.reducers';
import Keycloak from 'keycloak-js';
import {MockKeycloak} from '../../../mocks/mock-keycloak';
import {KEYCLOAK_EVENT_SIGNAL} from 'keycloak-angular';
import {MOCK_KEYCLOAK_EVENT_SIGNAL} from '../../../mocks/mock-keycloak-signal';
import {ActivatedRoute} from '@angular/router';
import {mockRoute} from '../../../mocks/activated-route-mock';
import {testComponentTranslation, testTranslations} from '../../../mocks/test-functions';

describe('TransactionFilter', () => {
  let component: TransactionFilter;
  let fixture: ComponentFixture<TransactionFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFilter, testTranslations()],
      providers: [
        {provide: Keycloak, useClass: MockKeycloak},
        {
          provide: KEYCLOAK_EVENT_SIGNAL,
          useValue: MOCK_KEYCLOAK_EVENT_SIGNAL,
        },
        provideMockStore({initialState: initialTransactionState}),
        {provide: ActivatedRoute, useValue: mockRoute},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page in english (default)', () => {
    testComponentTranslation(fixture, 'en', '#currencyLabel', 'Currency');
  });

  it('should render page in proper language', () => {
    testComponentTranslation(fixture, 'pl', '#currencyLabel', 'Waluta');
  });
});
