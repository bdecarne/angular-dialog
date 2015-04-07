angular.module('angular.dialog')
    .directive('modalAnimationClass', [
        function () {
            return {
                compile: function (tElement, tAttrs) {
                    if (tAttrs.modalAnimation) {
                        tElement.addClass(tAttrs.modalAnimationClass);
                    }
                }
            };
        }]);