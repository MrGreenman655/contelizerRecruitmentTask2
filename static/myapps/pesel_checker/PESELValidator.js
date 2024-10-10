const peselWeights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]

class PeselValidator {
    constructor(pesel) {
        this.pesel = pesel
    }

    validate() {
        const validators = [
            this.isLengthValid(),
            this.isDigitsOnly(),
            this.isChecksumValid(),
        ]
        this.isValid = validators.every(validator => validator.isValid === true);
        this.errors = validators
            .filter(validator => validator.errorMsg)
            .map(validator => validator.errorMsg)
        return this.isValid
    }

    isLengthValid() {
        const result = {
            isValid: this.pesel.length === 11,
        }
        if (!result.isValid) {
            result.errorMsg = 'Pesel must contains 11 characters.'
        }
        return result;
    }

    isDigitsOnly() {
        const result = {
            isValid: /^\d+$/.test(this.pesel),
        }
        if (!result.isValid) {
            result.errorMsg = 'Pesel can only consist of digits.'
        }
        return result;
    }

    isChecksumValid() {
        const checksum = this.getChecksum()
        const result = {
            isValid: checksum === parseInt(this.pesel[10]),
        }
        if (!result.isValid) {
            result.errorMsg = 'Checksum is incorrect.'
        }
        return result;
    }

    getBirthDate() {
        const year = parseInt(this.pesel.substring(0, 2), 10);
        let month = parseInt(this.pesel.substring(2, 4), 10);
        const day = parseInt(this.pesel.substring(4, 6), 10);

        let fullYear;
        if (month > 80) {
            fullYear = 1800 + year;
            month -= 80;
        } else if (month > 60) {
            fullYear = 2200 + year;
            month -= 60;
        } else if (month > 40) {
            fullYear = 2100 + year;
            month -= 40;
        } else if (month > 20) {
            fullYear = 2000 + year;
            month -= 20;
        } else {
            fullYear = 1900 + year;
        }

        return `${fullYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    getGender() {
        const genderDigit = parseInt(this.pesel[9], 10);
        return genderDigit % 2 === 0 ? 'Female' : 'Male';
    }

    getSerialNumber() {
        return this.pesel.substring(6, 10);
    }

    getChecksum() {
        let sum = 0;

        for (let i = 0; i < 10; i++) {
            sum += parseInt(this.pesel[i]) * peselWeights[i];
        }

        return (10 - (sum % 10)) % 10;
    }

}