export class DataStep1 {

    private last_name: string
    private name: string
    private second_name: string
    private is_no_second_name: boolean
    private gender: string
    private email: string
    private tel: string
    private tel_stat: string
    private personal_data: boolean
    private captcha: {
        sid: string
        word: string
    }
    
    constructor() {
        this.gender = 'M'
        this.is_no_second_name = false
        this.personal_data = false
        this.captcha = {
            sid: '',
            word: '',
        }
    }
}
