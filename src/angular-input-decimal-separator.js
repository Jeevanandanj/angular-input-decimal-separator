/**
 * Decimal and thousand separator for the input box.
 * @version v1.2
 * @link https://github.com/Jeevanandanj/angular-input-decimal-separator
 * You are free to use/update/modify. No hidden terms and conditions.
 */

angular.module('ng-inputdecimalseparator', [])
    .directive('inputDecimalSeparator', [
    '$locale',
    function ($locale, undefined) {
        return {
            restrict: 'A',
            require: '?ngModel',
            compile: function (_element, tAttrs) {
                return function (scope, element, attrs, ctrl, undefined) {
                    if (!ctrl) {
                        return;
                    }
                    debugger  
                    var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
                           thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
                           defaultDelimiter = ".";
                    var decimalMax = isNaN(attrs.decimalMax) || attrs.decimalMax === "" ? null : parseFloat(attrs.decimalMax);
                    var decimalMin = isNaN(attrs.decimalMin) || attrs.decimalMin === "" ? null : parseFloat(attrs.decimalMin);
                    var noOfDecimal = 2, minus = "-", isMinusExists = false;

                    if (attrs.inputDecimalSeparator || attrs.inputDecimalSeparator != '') {
                        noOfDecimal = isNaN(attrs.inputDecimalSeparator) ? 2 : Number(attrs.inputDecimalSeparator);
                        noOfDecimal = Math.floor(noOfDecimal);
                    }
                    
                    if(attrs.applyThousandDelimiter==='false')
                    thousandsDelimiter="";

                    // Parser starts here...
                    ctrl.$parsers.push(function (value) {

                        if (!value || value === '') {
                            return null;
                        }

                        var isMinusExists = value.indexOf(minus) == 0;

                        var str = "[^0-9" + decimalDelimiter + "]";
                        var regularExpression = new RegExp(str, 'g');

                        var outputValue = value.replace(regularExpression, '');
                        if (!outputValue || outputValue === '') {
                            return null;
                        }
                        var tokens = outputValue.split(decimalDelimiter);
                        tokens.splice(2, tokens.length - 2);

                        if (noOfDecimal && tokens[1])
                            tokens[1] = tokens[1].substring(0, noOfDecimal);

                        var result = tokens.join(decimalDelimiter);
                        var actualNumber = tokens.join(defaultDelimiter);
                        if (isMinusExists) {

                            actualNumber = minus + actualNumber;
                        }
                        ctrl.$setValidity('max', true);
                        ctrl.$setValidity('min', true);

                        if (decimalMax && (actualNumber * 1) > decimalMax)
                            ctrl.$setValidity('max', false);

                        if (decimalMin && (actualNumber * 1) < decimalMin)
                            ctrl.$setValidity('min', false);

                        // apply thousand separator
                        if (result) {
                            tokens = result.split($locale.NUMBER_FORMATS.DECIMAL_SEP);
                            if (tokens[0])
                                tokens[0] = tokens[0].split(/(?=(?:...)*$)/).join(thousandsDelimiter);

                            result = tokens.join($locale.NUMBER_FORMATS.DECIMAL_SEP);
                        }
                        if (isMinusExists) {
                            result = minus + result;

                        }
                        if (result != value) {

                            ctrl.$setViewValue(result);
                            ctrl.$render();
                        }

                        return actualNumber;

                    }); // end Parser

                    // Formatter starts here
                    ctrl.$formatters.push(function (value) {

                        if (!value || value === '') {
                            return null;
                        }

                        var str = "[^0-9" + decimalDelimiter + "]";
                        var regularExpression = new RegExp(str, 'g');
                        value = value.toString();
                        var isMinusExists = value.indexOf(minus) == 0;
                        value = value.replace(regularExpression, '');
                        if (!value || value === '') {
                            value = "0";
                        }
                        var tokens = value.split(defaultDelimiter);
                        tokens.splice(2, tokens.length - 2);

                        if (noOfDecimal && tokens[1])
                            tokens[1] = tokens[1].substring(0, noOfDecimal);

                        var result = tokens.join(decimalDelimiter);
                        var actualNumber = Number(tokens.join(defaultDelimiter));

                        if (decimalMax && actualNumber > decimalMax)
                            ctrl.$setValidity('max', false);

                        if (decimalMin && actualNumber < decimalMin)
                            ctrl.$setValidity('min', false);

                        // apply thousand separator
                        if (result) {
                            tokens = result.split($locale.NUMBER_FORMATS.DECIMAL_SEP);
                            if (tokens[0])
                                tokens[0] = tokens[0].split(/(?=(?:...)*$)/).join(thousandsDelimiter);

                            result = tokens.join($locale.NUMBER_FORMATS.DECIMAL_SEP);

                            if (isMinusExists)
                                result = minus + result;
                        }
                        return result;
                    });
                };  // end link function
            } // end compile function
        };
    }
    ]);
