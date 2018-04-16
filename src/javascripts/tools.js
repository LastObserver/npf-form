import $ from 'jquery'
import './inputmask'

let tools = {}

// Маски ввода
tools.initMasks = function ($context) {
    var $context = $context || $(document);

    function is_touch_device() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    $('.npf-u-mask', $context).each(function () {
        var $input = $(this);
        var mask = $input.data('mask');
        var placeholder = $input.data('mask-placeholder') || ' ';

        var keyCodeRusToEng = { '81': 'q', '87': 'w', '69': 'e', '82': 'r', '84': 't', '89': 'y', '85': 'u', '73': 'i', '79': 'o', '80': 'p', '65': 'a', '83': 's', '68': 'd', '70': 'f', '71': 'g', '72': 'h', '74': 'j', '75': 'k', '76': 'l', '90': 'z', '88': 'x', '67': 'c', '86': 'v', '66': 'b', '78': 'n', '77': 'm', '219': '[', '221': ']', '188': ',', '190': '.', '50': '' };
        var keyCodeEngToRus = { '81': 'й', '87': 'ц', '69': 'у', '82': 'к', '84': 'е', '89': 'н', '85': 'г', '73': 'ш', '79': 'щ', '80': 'з', '219': 'х', '221': 'ъ', '65': 'ф', '83': 'ы', '68': 'в', '70': 'а', '71': 'п', '72': 'р', '74': 'о', '75': 'л', '76': 'д', '186': 'ж', '222': 'э', '90': 'я', '88': 'ч', '67': 'с', '86': 'м', '66': 'и', '78': 'т', '77': 'ь', '188': 'б', '190': 'ю', '191': '.' };

        if ($input.data('mask-initiated')) return;

        switch (mask) {
            case ('rusNameMask'):
                if (is_touch_device()) return;
                (function () {
                    var isNeedToBePrevent = false;

                    $input.on('keydown', function (e) {
                        var currValue = $(this).val();
                        var input = e.target;
                        var selectionEnd = input.selectionEnd;
                        var selectionStart = input.selectionStart;
                        var result = '';

                        if (keyCodeEngToRus[e.keyCode] !== undefined &&
                            keyCodeEngToRus[e.keyCode] != e.key && !e.ctrlKey) {
                            result = ((e.shiftKey || window.capsLockEnabled) ? keyCodeEngToRus[e.keyCode].toUpperCase() : keyCodeEngToRus[e.keyCode]);
                            result = currValue.slice(0, input.selectionStart) + result + currValue.slice(input.selectionStart + Math.abs(input.selectionEnd - input.selectionStart));

                            $(this)
                                .val(result)
                                .trigger('change');

                            input.selectionStart = selectionStart + 1;
                            input.selectionEnd = selectionStart + 1;

                            isNeedToBePrevent = true
                        } else { isNeedToBePrevent = false }
                    }).on('keypress', function (e) { if (isNeedToBePrevent) e.preventDefault(); });
                })();
                break;

            case ('engNameMask'):
                if (is_touch_device()) return;
                $input.on('keydown', function (e) {
                    var currValue = $(this).val();
                    var input = e.target;
                    var selectionEnd = input.selectionEnd;
                    var selectionStart = input.selectionStart;
                    var result = '';

                    if (keyCodeRusToEng[e.keyCode] !== undefined &&
                        keyCodeRusToEng[e.keyCode] != e.key && !e.ctrlKey) {

                        result = (e.shiftKey ? keyCodeRusToEng[e.keyCode].toUpperCase() : keyCodeRusToEng[e.keyCode]);

                        if (e.keyCode == 50) result = e.shiftKey ? '@' : e.key;
                        result = currValue.slice(0, input.selectionStart) + result + currValue.slice(input.selectionStart + Math.abs(input.selectionEnd - input.selectionStart));

                        $(this)
                            .val(result)
                            .trigger('change');

                        input.selectionEnd = selectionStart + 1;
                        input.selectionEnd = selectionStart + 1;

                        e.preventDefault();
                    }
                });
                break;

            case ('intMask'):
                $input.inputmask('Regex', {
                    showMaskOnHover: false,
                    regex: "^[0-9]*$"
                });
                break;

            case ('dateMask'):
                $input.inputmask('dd.mm.yyyy', {
                    showMaskOnHover: false,
                    placeholder: '__.__.____',
                    onincomplete: function () {
                        // $(this).val('');
                    }
                });
                break;

            case ('phone'):
                $input.inputmask('+7 (999) 999 99 99', {
                    showMaskOnHover: false,
                    placeholder: ' ',
                    onincomplete: function () {
                        $(this).val('');
                    }
                });
                break;

            default:
                $input.inputmask('' + mask, {
                    placeholder: placeholder,
                    showMaskOnHover: false,
                });
        }

        $input.data('mask-initiated', true);
    });

    $('.npf-u-mask-scope', $context).each(initMaskScope);
    if ($context.hasClass('.npf-u-mask-scope')) $context.each(initMaskScope);

    function initMaskScope() {
        var $scope = $(this);
        var $inputs;

        if ($scope.data('initiated')) return;

        $scope.on('submit validateScope', function (e, callback) {
            var result = true;
            var errorInputs = [];

            $inputs = $('input, textarea', $scope);

            $inputs.each(function () {
                var $input = $(this);
                var $field = $input.closest('.npf-u-mask-field');
                var type = $input.attr('type');
                var isRequired = $input.data('required') !== undefined || $input.attr('ngquired') !== undefined;

                if (!isRequired) return;

                switch (type) {
                    case 'checkbox':
                        if (!$input.prop('checked')) {
                            $field.addClass('_none');
                            result = false;
                            errorInputs.push($input);
                        } else {
                            $field.removeClass('_none');
                            result = true && result;
                        }
                        break;

                    default:
                        var val = $input.val();
                        if (val == '') {
                            $field.addClass('_none');
                            result = false;
                            errorInputs.push($input);
                        } else {
                            $field.removeClass('_none');
                            result = true && result;
                        }
                        break;
                }
            });

            e.stopPropagation();


            if (callback !== undefined) {
                callback(result, errorInputs);
            } else {
                return result;
            }
        });

        $scope.data('initiated', true);
    }
}

tools.serverFormValidation = function ($context) {
    var $context = $context || $(document);
    var targets = [
        '._js-server-form-validate',
        '.js-server-validation',
        'form[name="ASK"]',
        'form[name="ANKETA_KPP"]',
        'form[name="RECEIPTS_PFR"]'
    ];

    $(targets.join(',')).each(function () {
        var $form = $(this);

        $form.on('submit', function (e) {
            $.post($(this).attr('action'), $(this).serialize(), function (data) {
                var _field, _error;

                if (data.status == 'error') {
                    $form.find('.npf-u-mask-field').removeClass('_error');

                    for (var field in data.fields_validation) {
                        _field = $form.find('[name="' + field + '"]').closest('.npf-u-mask-field')
                        _error = _field.find('.npf-input-group__error-text');

                        if (_error.length == 0) {
                            _error = $('<div class="npf-input-group__error-text"></div>');
                            _field.append(_error);
                        }
                        _error.text(data.fields_validation[field])
                        _field.addClass('_error-text');
                    }

                    if (true || data.fields_validation.captcha_word === undefined) {
                        $form.find('[name="captcha_word"]')
                            .closest('.npf-captcha-group')
                            .find('.npf-captcha-group__update')
                            .trigger('click')
                    }

                } else {
                    $form.hide()
                    $('.form_success.hidden').removeClass('hidden');
                }
            })
            e.preventDefault();
        })

    })
}

tools.capsChecker = function () {
    window.capsLockEnabled = null;

    document.onkeypress = function (e) {
        var prevCapsLockState = window.capsLockEnabled
        var chrCode = (event.which == null) ? event.keyCode : event.which;
        var chr = String.fromCharCode(chrCode)
        var target = e.target
        var inputValue = target.value
        if (chrCode < 32 || chr.toLowerCase() == chr.toUpperCase()) return;

        window.capsLockEnabled = (chr.toLowerCase() == chr && e.shiftKey) || (chr.toUpperCase() == chr && !e.shiftKey);
        if ((prevCapsLockState !== window.capsLockEnabled) && window.capsLockEnabled) {
            let index = target.selectionStart - 1
            inputValue = inputValue.substring(0, index) + inputValue[index].toUpperCase() + inputValue.substring(index + 1)
            target.value = inputValue
        }
    }

    if (navigator.platform.substr(0, 3) != 'Mac') { // событие для CapsLock глючит под Mac
        document.onkeydown = function (e) {
            if (e.keyCode == 20 && window.capsLockEnabled !== null) {
                window.capsLockEnabled = !window.capsLockEnabled;
            }
        }
    }
}

if (!$(document).data('is-tools-initiated')) {
    $(function () {
        tools.capsChecker();
        tools.initMasks();
        tools.serverFormValidation();
    });
    $(document).data('is-tools-initiated', true);
}
