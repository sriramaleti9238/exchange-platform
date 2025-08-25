import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MessageMenu} from '../message-menu/message-menu';
import {CheckedMenu} from '../../utils/checked-menu/checked-menu';
import {Store} from '@ngrx/store';
import {MessageState} from '../state/message.selectors';
import {MenuComponent} from '../../menu/menu.component';
import {MessagePriority} from '../../api/model/messagePriority';
import {DateRangePickerComponent} from '../../utils/date-range-picker/date-range-picker-component';
import {saveSystemMessageAction} from '../state/message.actions';
import {SystemMessage} from '../../api/model/systemMessage';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.html',
  imports: [
    TranslatePipe,
    MessageMenu,
    MenuComponent,
    ReactiveFormsModule,
    DateRangePickerComponent
  ],
  styleUrl: './message-add.css'
})
export class MessageAdd extends CheckedMenu {
  protected readonly formBuilder = inject(FormBuilder);
  protected formGroup: FormGroup;
  private readonly _storeMessages$: Store<MessageState> = inject(Store);
  protected priorities = Object.values(MessagePriority);
  protected minDateFrom: Date = new Date();
  protected minDateTo: Date | undefined = undefined;

  constructor() {
    super();
    this.formGroup = this.formBuilder.group({
      messageText: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      priority: new FormControl(null, [Validators.required]),
      active: new FormControl(true, []),
      dateFromUtc: new FormControl(true, []),
      dateToUtc: new FormControl(true, []),
    })
  }

  onDateRangeChange(dateRange: { dateFrom: Date | null; dateTo: Date | null }) {
    this.formGroup.patchValue({
      dateFromUtc: dateRange.dateFrom?.toISOString().substring(0, 10),
      dateToUtc: dateRange.dateTo?.toISOString().substring(0, 10),
    });
  }

  saveMessage() {
    const systemMessage: SystemMessage = {
      id: undefined,
      messageText: this.formGroup.get('messageText')?.value,
      priority: this.formGroup.get('priority')?.value,
      active: this.formGroup.get('active')?.value,
      dateToUtc: this.formGroup.get('dateToUtc')?.value,
      dateFromUtc: this.formGroup.get('dateFromUtc')?.value,
      version: 0
    }
    this._storeMessages$.dispatch(saveSystemMessageAction({systemMessage}));
  }
}
