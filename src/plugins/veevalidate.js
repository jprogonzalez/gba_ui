import Vue from 'vue';

import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import { extend } from 'vee-validate';
import { required, email, min, max, numeric, integer, digits, min_value, max_value, url, regex } from 'vee-validate/dist/rules';
extend('email', email);
extend('required', required);
extend('min', min);
extend('max', max);
extend('min_value', min_value);
extend('max_value', max_value);
extend('numeric', numeric);
extend('integer', integer);
extend('digits', digits);
extend("decimal", {
    validate: (value, { decimals = '*', separator = '.' } = {}) => {
        if (value === null || value === undefined || value === '') {
            return {
                valid: false
            };
        }
        if (Number(decimals) === 0) {
            return {
                valid: /^-?\d*$/.test(value),
            };
        }
        const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
        const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

        return {
            valid: regex.test(value),
        };
    }
})
extend("positive", {
    validate: (value) => {
        if (value === null || value === undefined || value === '') {
            return {
                valid: false
            };
        }
        if (value < 0) {
            return {
                valid: false
            };
        }
        return true
    }
})
extend("slug", {
    validate: (value) => {
        return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(value)
    }
})
extend("routePath", {
    validate: (value) => {
        return /^[A-Za-z0-9]+(?:[-\/]{1}[A-Za-z0-9]+)*$/.test(value)
    }
})
extend("priceDifference", {
    params: ["price"],
    validate: (value, { price }) => {
        if (value == 0 && price == 0) {
            return true;
        }
        return (value * 100) % (price * 100) === 0
    },
    message:
        "This combination of total price and units is not supported in finance, adjust one of them."
});
extend('url', {
    validate(value) {
        if (value) {
            return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value);
        }
        return false;
    },
    message: 'This value must be a valid URL',
})

import { localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
import en from 'vee-validate/dist/locale/en.json';

en.messages.decimal = 'The {_field_} field must contain only decimal values'
en.messages.positive = 'The {_field_} field must contain only positive values'

es.messages.decimal = 'El campo {_field_} debe contener solo valores decimales'
es.messages.positive = 'El campo {_field_} debe contener solo valores positivos'


localize({
    en,
    es
});
localize('es');
