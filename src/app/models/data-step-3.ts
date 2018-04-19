export class DataStep3 {
  private amount: string;
  private autopay_set: boolean;
  private subscribe: boolean;

  constructor() {
    this.autopay_set = false;
    this.subscribe = false;
  }

/**
 * Returns current data values
 *
 * @readonly
 * @memberof DataStep1
 */
  get data() {
    return {
      amount: this.amount,
      autopay_set: this.autopay_set,
      subscribe: this.subscribe,
    };
  }

/**
 * Returns current data values transformed to send to api
 *
 * @readonly
 * @memberof DataStep1
 */
  get transformedData() {
    return {
      amount: this.amount,
      autopay_set: this.autopay_set ? 1 : '',
      subscribe: this.subscribe ? 1 : '',
    };
  }
}
