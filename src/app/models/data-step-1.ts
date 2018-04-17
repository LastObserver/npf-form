export class DataStep1 {

    private last_name: string;
    private name: string;
    private second_name: string;
    private is_no_second_name: boolean;
    private gender: string;
    private email: string;
    private tel: string;
    private tel_stat: string;
    private personal_data: boolean;
    private captcha: {
        sid: string
        word: string
    };

    constructor() {
        this.gender = 'M';
        this.is_no_second_name = false;
        this.personal_data = false;
        this.captcha = {
            sid: '',
            word: '',
        };
    }

    get transformedData() {
        return {
            last_name: this.last_name,
            name: this.name,
            no_second_name: this.is_no_second_name ? 1 : null,
            second_name: this.second_name,
            gender: this.gender,
            tel: this.tel ? this.tel.replace(/[+ ()]/g, '') : '',
            tel_stat: this.tel_stat ? this.tel_stat.replace(/[+ ()]/g, '') : '',
            email: this.email,
            personal_data: this.personal_data ? 1 : '',
            captcha: this.captcha,
        };
    }
}
