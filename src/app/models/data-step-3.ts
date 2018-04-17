export class DataStep3 {
  private amount: string;
  private autopay_set: boolean;
  private subscribe: boolean;

  constructor() {
    this.autopay_set = false;
    this.subscribe = false;
  }

  get transformedData() {
    return {
      amount: this.amount,
      autopay_set: this.autopay_set ? 1 : '',
      subscribe: this.subscribe ? 1 : '',
    };
  }
}
