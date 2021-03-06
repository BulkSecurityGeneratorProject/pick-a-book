(function() {
    'use strict';

    angular
        .module('pickabookApp')
        .controller('BookDialogController', BookDialogController);

    BookDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Book', 'Author'];

    function BookDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Book, Author) {
        var vm = this;

        vm.book = entity;
        vm.book.author && Author.augment(vm.book.author);

        vm.clear = clear;
        vm.save = save;

        var authors = Author.query(function() {
            authors.forEach(function(author) {
                Author.augment(author);
            });
        });
        vm.authors = authors;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.book.id !== null) {
                Book.update(vm.book, onSaveSuccess, onSaveError);
            } else {
                Book.save(vm.book, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('pickabookApp:bookUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
