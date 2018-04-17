export class DataStep2 {
  private birthdate: string;
  private birth_place: string;

  private passportseries: string;
  private passportnumber: string;
  private passport: string;
  private issue_date: string;
  private issue_org_code: string;
  private issue_org: string;

  private reg_index: string;
  private reg_federal: string;
  private reg_region: string;
  private reg_ctype: string;
  private reg_cname: string;
  private reg_street: string;
  private reg_no_street: boolean;
  private reg_house: string;
  private reg_build: string;
  private reg_apt: string;
  private reg_no_apt: boolean;

  private fact_is_same: boolean;
  private fact_reg: string;
  private fact_index: string;
  private fact_federal: string;
  private fact_region: string;
  private fact_ctype: string;
  private fact_cname: string;
  private fact_street: string;
  private fact_no_street: boolean;
  private fact_house: string;
  private fact_build: string;
  private fact_apt: string;
  private fact_no_apt: boolean;

  private inn: string;
  private snils: string;
  private is_approved: boolean;
  private confirm_my_data: boolean;

  private sms_code: string;

  constructor() {
    this.is_approved = false;
    this.reg_no_street = false;
    this.reg_no_apt = false;
    this.fact_no_street = false;
    this.fact_no_apt = false;
    this.fact_is_same = true;
  }

  get transformedData() {
    return {
      birthdate: this.birthdate,
      birth_place: this.birth_place,

      passportseries: this.passport.split(' ')[0],
      passportnumber: this.passport.split(' ')[1],
      issue_date: this.issue_date,
      issue_org_code: this.issue_org_code,
      issue_org: this.issue_org,

      reg_index: this.reg_index,
      reg_federal: this.reg_federal,
      reg_region: this.reg_region,
      reg_ctype: this.reg_ctype,
      reg_cname: this.reg_cname,
      reg_street: this.reg_street,
      reg_no_street: this.reg_no_street ? 1 : '',
      reg_house: this.reg_house,
      reg_build: this.reg_build,
      reg_apt: this.reg_apt,
      reg_no_apt: this.reg_no_apt ? 1 : '',

      fact_reg: this.fact_is_same ? 1 : '',
      fact_index: this.fact_index,
      fact_federal: this.fact_federal,
      fact_region: this.fact_region,
      fact_ctype: this.fact_ctype,
      fact_cname: this.fact_cname,
      fact_street: this.fact_street,
      fact_no_street: this.fact_no_street ? 1 : '',
      fact_house: this.fact_house,
      fact_build: this.fact_build,
      fact_apt: this.fact_apt,
      fact_no_apt: this.fact_no_apt ? 1 : '',

      inn: this.inn,
      snils: this.snils,
      confirm_my_data: this.is_approved ? 1 : '',

      sms_code: this.sms_code,
    };
  }

  setSameAddress() {
    if (this.fact_is_same) {
      this.fact_index = this.reg_index;
      this.fact_federal = this.reg_federal;
      this.fact_region = this.reg_region;
      this.fact_ctype = this.reg_ctype;
      this.fact_cname = this.reg_cname;
      this.fact_street = this.reg_street;
      this.fact_no_street = this.reg_no_street;
      this.fact_house = this.reg_house;
      this.fact_build = this.reg_build;
      this.fact_apt = this.reg_apt;
      this.fact_no_apt = this.reg_no_apt;
    }
  }

  clearAddress() {
    this.fact_index = '';
    this.fact_federal = '';
    this.fact_region = '';
    this.fact_ctype = '';

    this.fact_cname = '';
    this.fact_street = '';
    this.fact_no_street = false;
    this.fact_house = '';
    this.fact_build = '';
    this.fact_apt = '';
    this.fact_no_apt = false;
  }
}
