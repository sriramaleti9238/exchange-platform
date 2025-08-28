import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateList } from './rate-list';
import {
  testComponentTranslation,
  testTranslations,
} from '../../../mocks/test-functions';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import Keycloak from 'keycloak-js';
import { MockKeycloak } from '../../../mocks/mock-keycloak';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import { MOCK_KEYCLOAK_EVENT_SIGNAL } from '../../../mocks/mock-keycloak-signal';
import { ActivatedRoute } from '@angular/router';
import { mockRoute } from '../../../mocks/mock-activated-route';
import { initialRateState } from '../state/rate.reducers';

describe('RateList', () => {
  let component: RateList;
  let fixture: ComponentFixture<RateList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateList, testTranslations()],
      providers: [
        FormBuilder,
        ReactiveFormsModule,
        provideMockStore({ initialState: initialRateState }),
        { provide: Keycloak, useClass: MockKeycloak },
        {
          provide: KEYCLOAK_EVENT_SIGNAL,
          useValue: MOCK_KEYCLOAK_EVENT_SIGNAL,
        },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page in english (default)', () => {
    testComponentTranslation(fixture, 'en', '#labelRateList', 'List rates');
  });

  it('should render page in proper language', () => {
    testComponentTranslation(fixture, 'pl', '#labelRateList', 'List kursów');
  });
});
