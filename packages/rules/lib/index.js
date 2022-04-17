export const PhoneRegExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
export const validatePhone = (rule, value, callback) => {
    const reg = PhoneRegExp;
    if (reg.test(value) || value.length == 0) {
        callback();
    }
    else {
        callback(new Error('请输入正确的手机号'));
    }
};
export const EmailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const validateEmail = (rule, value, callback) => {
    const reg = EmailRegExp;
    if (reg.test(value)) {
        callback();
    }
    else {
        callback(new Error('请输入正确的邮箱'));
    }
};
export const IdentifyRegExp = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
export const validateIdentityCard = (rule, value, callback) => {
    const reg = IdentifyRegExp;
    if (reg.test(value.toString())) {
        callback();
    }
    else {
        callback(new Error('请输入正确的身份证号'));
    }
};
export const validateNumber = (rule, value, callback) => {
    if (value && isNaN(Number(value))) {
        callback(new Error('该项需填入数字'));
    }
    else {
        callback();
    }
};
export const intRange = ({ min = 0, max = 100, message = '' }) => {
    function checkInt(rule, value, callback) {
        if ((!value && value !== 0) || typeof value == 'undefined') {
            callback();
        }
        if (value && isNaN(Number(value))) {
            callback(new Error('该项需填写数字'));
        }
        else if (value >= min && value <= max) {
            callback();
        }
        else {
            callback(new Error(message || `该项需填写${min}~${max}的数字`));
        }
    }
    return [{ validator: checkInt, trigger: 'change,blur' }];
};
export const PASSWORD_LEN_RANGE = {
    MIN: 6,
    MAX: 16,
};
export const validatePassword = (rule, value, callback) => {
    const reg = new RegExp(`^[\\d\\w]{${PASSWORD_LEN_RANGE.MIN},${PASSWORD_LEN_RANGE.MAX}}$`);
    if (value && reg.test(value.toString())) {
        callback();
    }
    else {
        callback(new Error(`密码长度${PASSWORD_LEN_RANGE.MIN}-${PASSWORD_LEN_RANGE.MAX}位`));
    }
};
export const ComplicatedPasswordRegExp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*()]+$)[\da-zA-Z!@#$%^&*()]{6,16}$/;
export const password = (rule, value, callback) => {
    const reg = ComplicatedPasswordRegExp;
    if (value && reg.test(value)) {
        callback();
    }
    else {
        callback(new Error(`密码长度${PASSWORD_LEN_RANGE.MIN}-${PASSWORD_LEN_RANGE.MAX}位，由字母、数字、符号，至少两种组合而成`));
    }
};
export const strictValidatePassword = (rule, value, callback) => {
    const reg = new RegExp(`^(?![A-z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{${PASSWORD_LEN_RANGE.MIN},${PASSWORD_LEN_RANGE.MAX}}$`);
    if (value && reg.test(value.toString())) {
        callback();
    }
    else {
        callback(new Error(`密码长度${PASSWORD_LEN_RANGE.MIN}-${PASSWORD_LEN_RANGE.MAX}位，且需包含数字、大写字母、小写字母以及特殊字符中的三种`));
    }
};
export const validatePort = (rule, value, callback) => {
    const portList = value.split(',');
    let result = true;
    portList.forEach((p) => {
        if (!(/^\d+$/.test(p) && 1 <= Number(p) && Number(p) <= 65535)) {
            result = false;
        }
    });
    if (result) {
        callback();
    }
    else {
        callback(new Error('端口格式不对'));
    }
};
export const FirstLetterUppercaseRegExp = /^[A-Z]{1}$/;
export const validateJhiInitial = (rule, value, callback) => {
    if (FirstLetterUppercaseRegExp.test(value)) {
        callback();
    }
    else {
        callback(new Error('首字母必须为大写且长度为1位!'));
    }
};
export const IPRegExp = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
export const validateIP = (rule, value, callback) => {
    if (IPRegExp.test(value)) {
        callback();
    }
    else {
        callback(new Error('IP格式不正确!'));
    }
};
export const floatPosition = (_) => {
    let decimal = _;
    if (isNaN(decimal)) {
        decimal = 2;
    }
    const reg = new RegExp(`^(([1-9][0-9]*)|(([0]\\.\\d{1,${decimal}}|[1-9][0-9]*\\.\\d{1,${decimal}})))$`);
    function validate(rule, value, callback) {
        if (!value || reg.test(value.toString())) {
            callback();
        }
        else {
            callback(new Error(`最多精确到${decimal}位小数`));
        }
    }
    return [{ validator: validate, trigger: 'change,blur' }];
};
export const LetterNumberRegExp = /^[a-zA-Z0-9]+$/g;
export const letterNumber = (rule, value, callback) => {
    if (!value || LetterNumberRegExp.test(value)) {
        callback();
    }
    else {
        callback(new Error('只能填写英文和数字'));
    }
};
export const lessThanOne = (rule, value, callback) => {
    if (value >= 0 && value <= 1) {
        callback();
    }
    else {
        callback(new Error('只能填写0~1的数值'));
    }
};
export const totpCode = (rule, value, callback) => {
    if (value && !isNaN(Number(value)) && value.toString().length == 6) {
        callback();
    }
    else {
        callback(new Error('口令码为 6 位数字'));
    }
};
const RULE_TRIGGER = ['blur', 'change'];
export default {
    COMMON_RULE: (opt) => {
        return [
            {
                message: '该项为必填项',
                type: 'string',
                required: true,
                trigger: RULE_TRIGGER,
                ...opt,
            },
        ];
    },
    DEEP_RULE: (opt) => {
        return { type: 'object', fields: {}, required: true, ...opt };
    },
    BLUR_RULE: (opt) => {
        return [
            {
                message: '该项为必填项',
                type: 'string',
                required: true,
                trigger: 'blur',
                ...opt,
            },
        ];
    },
    LENGTH_RULE: (min, max = 20, message) => [
        {
            min,
            max,
            message: message || `输入长度限制在${min == max ? min : [min, max].join('至')}个字符`,
            trigger: 'blur',
        },
    ],
    LETTER_NUM_RULE: [{ validator: letterNumber, trigger: 'blur' }],
    LESS_THAN_ONE: [{ validator: lessThanOne, trigger: 'blur' }],
    FLOAT_NUMBER_RULE: floatPosition,
    INT_RANGE: intRange,
    ARRAY_RULE: [
        {
            type: 'array',
            message: '该项是多项选择',
            trigger: RULE_TRIGGER,
        },
    ],
    NUMBER_RULE: [{ validator: validateNumber, trigger: RULE_TRIGGER }],
    PORT_RULE: [{ validator: validatePort, trigger: 'blur' }],
    EMAIL_RULE: [{ validator: validateEmail, trigger: 'blur' }],
    IP_RULE: [{ validator: validateIP, trigger: 'blur' }],
    PASSWORD_RULE: [
        {
            validator: validatePassword,
            trigger: 'blur',
        },
    ],
    STRICT_PASSWORD_RULE: [
        {
            validator: strictValidatePassword,
            trigger: 'blur',
        },
    ],
    ONE_CAPITAL_RULE: [{ validator: validateJhiInitial, trigger: RULE_TRIGGER }],
    PHONE_RULE: [{ validator: validatePhone, trigger: RULE_TRIGGER }],
    IDCARD_RULE: [{ validator: validateIdentityCard, trigger: RULE_TRIGGER }],
    TOTP_RULE: [{ validator: totpCode, trigger: 'blur' }],
};
//# sourceMappingURL=index.js.map