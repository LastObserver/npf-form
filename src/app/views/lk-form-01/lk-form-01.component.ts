import { Component, OnInit } from '@angular/core';
import { user } from './models/user';

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
  constructor() {

    this.user = user;

    this.data = {
      contracts: [],
      contractsTypes: {},
      address: {  },
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

    this.contractsTypes = Object.keys(user.contracts).filter(
      contractsType => {
        const contracts = user.contracts[contractsType];
        return contracts && contracts.length;
      }
    );
    this.contractsTypes.forEach(contractsType => this.contracts[contractsType] = user.contracts[contractsType].filter(
      ({ ContractStatus }) => {
        switch (ContractStatus) {
          case 'Действует':
          case 'На этапе накопления':
          case 'На этапе выплат':
            return true;
          default:
            return false;
        }
      },
    ).sort((a, b) => {
      const dateA = new Date(a.ContractRegDate);
      const dateB = new Date(b.ContractRegDate);
      return dateA === dateB ? 0 : dateA > dateB ? 1 : -1;
    })[0]);

    Object.keys(this.contracts).map(contractsType => {
      if (!this.contracts[contractsType]) {
        this.contractsTypes.splice(this.contractsTypes.indexOf(contractsType), 1);
      }
    });

  }

  ngOnInit() {
  }

}
