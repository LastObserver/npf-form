import { Component, OnInit, ViewChild } from '@angular/core';
import { user, UserModel } from './models/user';
import { ApiService } from '../../services/api.service';
import { FormComponent } from '../../components/form/form.component';

export const contractTypeNames = {
  OPS: 'Договор об ОПС',
  NPO_PRIVATE: 'Договор ИПП',
  NPO_CORPORATE: 'Договор КПП',
};

export const questionnairies = [
  'Являетесь ли Вы иностранным публичным должностным лицом, должностным лицом публичных международных организаций, лицом, занимающим определенные государственные должности РФ, должности в государственных федеральных службах, корпорациях и иных организациях, назначение на которые и освобождение от которых осуществляются Президентом РФ или Правительством РФ (в случае положительного ответа указать должность)?',
  'Являетесь ли Вы супругом (супругой), близким родственником (родственником по прямой восходящей и нисходящей линии (родителем, ребенком, дедушкой, бабушкой, внуком), полнородным или неполнородным (имеет общего отца или мать) братом или сестрой, усыновителем, усыновленным) иностранного публичного должностного лица, должностного лица публичных международных организаций, российского должностного лица или действуете в его интересах (в случае положительного ответа указать ФИО иностранного публичного должностного лица и степень родства с ним)?',
  'Имеете ли Вы регистрацию, место жительства или место нахождения в государстве (на территории), которое (которая) не выполняет рекомендации ФАТФ (Иран, КНДР), либо используете счета в банке, зарегистрированном в таком государстве (на такой территории) (в случае положительного ответа указать страну)?',
  'Есть ли у Вас бенефициарный владелец (лицо, которое имеет возможность контролировать Ваши действия, в случае положительного ответа указать ФИО бенефициарного владельца)?',
];

@Component({
  selector: 'app-lk-form-01',
  templateUrl: './lk-form-01.component.html',
  styleUrls: ['./lk-form-01.component.styl']
})
export class LkForm01Component implements OnInit {

  private data: any;
  private user: UserModel;
  private contracts: any;
  private contractsTypes: string[];
  private contractTypeNames = contractTypeNames;
  private contractType: string;
  private isContractOnPayment: boolean;
  private questionnairies: string[];
  private form01Pdf: string;
  private statementNumber: string;
  @ViewChild(FormComponent) form: FormComponent;

  constructor(
    private api: ApiService,
  ) {

    this.user = new UserModel(user);

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
      quest_approved: [],
      quest_value: [],
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

    this.questionnairies = questionnairies;

    this.questionnairies.map(() => {
      this.data.quest_approved.push(null);
      this.data.quest_value.push(null);
    });

    this.contracts = {};

    // creating array of contract type names
    this.contractsTypes = Object.keys(this.user.contracts)
      .filter(
        type => {
          const contracts = this.user.contracts[type];
          return contracts && contracts.length;
        }
      );

    // filters active contracts
    this.contractsTypes.forEach(type => {
      this.contracts[type] = this.user.contracts[type]
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

  /**
   * Sets selected contract
   *
   * @memberof LkForm01Component
   */
  onContractsTypeChange() {
    this.data.contracts[0] = this.contracts[this.contractType].ContractNumber;

    Object.assign(this.data.contractsTypes, {});
    this.data.contractsTypes[this.contractType] = true;

    this.isContractOnPayment = this.isOnPaymentCheck;
  }

  /**
   * Check if contract is active
   *
   * @readonly
   * @memberof LkForm01Component
   */
  get isOnPaymentCheck() {
    const contract = this.contracts[this.contractType];
    switch (contract.ContractType) {
      case 1:
        return !!contract.AccountDetail.StageOfPaymentOPS;
      default:
        return contract.ContractStatus === 'На этапе выплат';
    }
  }

  /**
   * Check if contract is of NPO type
   *
   * @readonly
   * @memberof LkForm01Component
   */
  get isNPOContract() {
    return this.contractType.toUpperCase().includes('NPO');
  }

  onSubmit() {
    this.api.sendLKRequest(this.data)
      .subscribe((data) => {
        this.statementNumber = data['statementNumber'];
        this.form01Pdf = data['form01Pdf'];
        this.form.goForward();
      });
  }

}
