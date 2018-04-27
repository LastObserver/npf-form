import { Component, OnInit, ViewChild } from '@angular/core';
import { user } from './models/user';
import { ApiService } from '../../services/api.service';
import { FormComponent } from '../../components/form/form.component';

export const contractTypeNames = {
  OPS: 'Договор об ОПС',
  NPO_PRIVATE: 'Договор ИПП',
  NPO_CORPORATE: 'Договор КПП',
};

@Component({
  selector: 'app-lk-form-01',
  templateUrl: './lk-form-01.component.html',
  styleUrls: ['./lk-form-01.component.styl']
})
export class LkForm01Component implements OnInit {

  private data: any;
  private user: any;
  private contracts: any;
  private contractsTypes: any;
  private contractTypeNames = contractTypeNames;
  private contractType: string;
  private isContractOnPayment: boolean;
  @ViewChild(FormComponent) form: FormComponent;

  constructor(
    private api: ApiService,
  ) {

    this.user = user;

    this.data = {
      contracts: [],
      contractsTypes: {},
      address: {},
      addressForCorrespondence: {},
      files: {},
      addressForCorrespondenceEquals: true,
      birthdate: '',
      firstname: '',
      lastname: '',
      secondname: '',
      email: '',
      sex: 'M',
      snils: '',
      birthplace: '',
      inn: '',
      nationality: '',
      phone: '',
      passport: '',
      passportIssueAgency: null,
      passportIssueDate: null,
      passportIssueCode: null,
      questionnaire: [],
      wantsChangeAccountData: false,
      wantsChangeAddress: false,
      wantsChangeAddressForCorrespondence: false,
      wantsChangeName: false,
      wantsChangeOtherData: false,
      wantsChangePassport: false,
      wantsChangePersonalData: false,
      wantsGetContractCopy: false,
      wantsGetContractDeclaration: false,
      wantsGetTaxDeduction: false,
      wantsSendDocumentsTo: 1,
      belongsTo1PreferCategory: false,
      belongsTo2PreferCategory: false,
      belongsToOtherPreferCategory: false,
      canChangeAccountData: false,
    };

    this.contracts = {};

    this.contractsTypes = Object.keys(this.user.contracts)
      .filter(
        type => {
          const contracts = user.contracts[type];
          return contracts && contracts.length;
        }
      );

    this.contractsTypes.forEach(type => {
      this.contracts[type] = user.contracts[type]
        .filter(({ ContractStatus }) => {
          switch (ContractStatus) {
            case 'Действует':
            case 'На этапе накопления':
            case 'На этапе выплат':
              return true;
            default:
              return false;
          }
        })
        .sort((a, b) => {
          const dateA = new Date(a.ContractRegDate);
          const dateB = new Date(b.ContractRegDate);
          return dateA === dateB ? 0 : dateA > dateB ? 1 : -1;
        })[0];
    });

    Object.keys(this.contracts).map(type => {
      if (!this.contracts[type]) {
        this.contractsTypes.splice(this.contractsTypes.indexOf(type), 1);
      }
    });

  }

  ngOnInit() {
  }

  onContractsTypeChange() {
    this.data.contracts[0] = this.contracts[this.contractType].ContractNumber;

    Object.assign(this.data.contractsTypes, {});
    this.data.contractsTypes[this.contractType] = true;

    this.isContractOnPayment = this.isOnPaymentCheck;
  }

  get isOnPaymentCheck() {
    const contract = this.contracts[this.contractType];
    switch (contract.ContractType) {
      case 1:
        return !!contract.AccountDetail.StageOfPaymentOPS;
      default:
        return contract.ContractStatus === 'На этапе выплат';
    }
  }

  get isNPOContract() {
    return this.contractType.toUpperCase().includes('NPO')
  }

  onSubmit() {
    this.api.sendRequest(this.data)
      .subscribe(() => this.form.goForward());
  }

}
