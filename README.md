# angular-input-decimal-separator
Decimal separtor for input with masking. 
This is working based on the current culture used in the application.

This module automatically will do decimal separtor based on the current culture while user typing. 

Include the following module in your app.
```
var app = angular.module('inputdecimalseparator', ['ng-inputdecimalseparator']);
```

How to use?
========================

```
<input class="form-controls" name="testModel" type="text" decimal-max="100" decimal-min="10" ng-model="testModel" input-decimal-separator="3">
```
1. decimal-max used to set the maximum validation for the input.
2. decimal-min used to set the manimum validation for the input.
3. input-decimal-separator="3" - 3 is the number of decimal separator. 3 is optional parameter.

Impressed by [https://github.com/assisrafael/angular-input-masks](https://github.com/assisrafael/angular-input-masks)



