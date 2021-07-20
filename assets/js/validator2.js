function Validator(formSelector) {
    var _this = this
    var formRules = {}

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        } 
    }

    /**
     * Quy uoc tao rules:
     * - Neu co loi thi return 'error message'
     * - Neu khong co loi thi return undefined
     */
    
    var validatorRules = { // (2)
        required: function(value) {
            return value ? undefined : 'Vui long nhap truong nay'
        },
        email: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : 'Truong nay phai la email'
        },
        confirm: function(value) {
            return value == document.getElementById('password').value ? undefined : 'password incorrect'
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui long nhap it nhat ${min} ki tu`
            }
        },
        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : `Vui long nhap toi da ${max} ki tu`
            }
        }
    }



    // Lay ra form element trong DOM theo form selector (1)
    var formElement = document.querySelector(formSelector)
    
    // Chi xi li khi co element trong DOM chuyen cac rule(f) vao formRules(obj) (3)
    if (formElement) {
        // (3.1)
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {
                
                var ruleInfo
                var isRulesHasValue = rule.includes(':')
 
                if (isRulesHasValue) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }

                var ruleFunc = validatorRules[rule]

                if (isRulesHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1])
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }
            }

            // Lang nghe su kien de validate (blur, change, ...)
            input.onblur = handleValidate

            // Lang nghe su kien de clear errorMessage
            input.oninput = handleClearError
        }
    }

    // Ham thuc hien validate (3.2)
    function handleValidate(event) {
        var rules = formRules[event.target.name]
        var errorMessage

        for (var rule of rules) {
            errorMessage = rule(event.target.value)
            if (errorMessage) break
        }

        // Neu co loi thi hien thi message loi
        if (errorMessage) {
            var formGroup = getParent(event.target, '.form-group')
            if (formGroup) {
                formGroup.classList.add('invalid')

                var formMessage = formGroup.querySelector('.form-message')
                if (formMessage) {
                    formMessage.innerHTML = errorMessage
                    
                }
            }
        }

        return errorMessage
    }

    // Ham thuc hien clear errorMessage (3.3)
    function handleClearError(event) {
        var formGroup = getParent(event.target, '.form-group')
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid')
        }

        var formMessage = formGroup.querySelector('.form-message')
        if (formMessage) {
            formMessage.innerHTML = ''
        }
    }

    // Xu li khi submit form (4)
    formElement.onsubmit = function(event) {
        event.preventDefault()

        var inputs = formElement.querySelectorAll('[name][rules]')
        var isValid = true
        
        // Kiem tra xem co loi hay khong
        for (var input of inputs) {
            if (handleValidate({ target: input })) {
                isValid = false
            }
        }

        // Khi khong co thi submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]')
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'checkbox':
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = []
                            }
                            if (!input.matches(':checked')) {
                                return values
                            }
                            values[input.name].push(input.value)
                            break
                        case 'radio':
                            if (input.matches(':checked')) {
                                values[input.name] = input.value
                            }
                            break
                        case 'file':
                            values[input.name] = input.files
                            break
                        default:
                            values[input.name] = input.value
                    }

                    return values
                }, {})

                // Goi lai ham onSubmit va tra ve gia tri cua register form
                _this.onSubmit(formValues)

            } else {
                formElement.submit()
            }
        }
    }
}

export default Validator