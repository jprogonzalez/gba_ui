export function debounce(fn, delay) {
    var timeoutID = null;
    return function () {
        clearTimeout(timeoutID);
        var args = arguments;
        var that = this;
        timeoutID = setTimeout(function () {
            fn.apply(that, args);
        }, delay)
    }
}

export function randomString(len, an) {
    an = an && an.toLowerCase();
    var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = (Math.random() * (max - min) + min) << 0;
        str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    }
    return str.toUpperCase();
}

export const moneyFormat = {
    methods: {
        moneyFormat(total) {
            var formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
            });
            return formatter.format(total);
        }
    }
}

export const sum = {
    methods: {
        sum(items, key = null, startFrom = 0) {
            if (!items.length) {
                return 0;
            }
            var total = items.reduce((carry, item) => {
                var value = item;
                if (typeof item !== 'string' && typeof item !== 'number' && key) {
                    value = item[key];
                }
                return parseFloat(value) + parseFloat(carry);
            }, startFrom);

            return parseFloat(total);
        }
    }
}

export const numberFormat = {
    methods: {
        numberFormat(number, decimal = 2) {
            return new Intl.NumberFormat("en-US", {
                maximumFractionDigits: decimal,
                minimumFractionDigits: decimal,
            }).format(number);
        }
    }
}

export const formatDate = {
    methods: {
        formatDate(date, includeTime = false, useOnlyTime = false, format = "MM/DD/YYYY") {

            if (includeTime) {
                format = format + " HH:mm";
            }
            if (useOnlyTime) {
                format = "HH:mm";
            }
            return window.moment(date).format(format);
        }
    }
}

export const round2 = {
    methods: {
        round2(value) {
            return parseFloat(parseFloat(value).toFixed(2));
        }
    }
}

export const transformPercentage = {
    methods: {
        transformPercentage(value) {
            return (value / 100);
        }
    }
};

export const ucFirst = {
    methods: {
        ucFirst(text) {
            if (typeof text !== "string") return "";
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
}

export const lowerCase = {
    methods: {
        lowerCase(text) {
            if (typeof text !== 'string') return "";
            return text.toLowerCase();
        }
    }
}

export const getImageUrl = {
    methods: {
        getImageUrl(image, conversions) {
            var url = image.url;
            if (image.conversions) {
                conversions.forEach((conversion) => {
                    if (image.conversions[conversion]) {
                        url = image.conversions[conversion];
                        return false;
                    }
                });
            }
            return url;
        }
    }
}