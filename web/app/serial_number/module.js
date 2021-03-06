define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'serial_number', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'serial number',
      plural: 'serial numbers',
      possessive: 'serial number\'s'
    },
    columnList: {
      id: {
        title: 'Serial Number'
      },
      site: {
        column: 'site.name',
        title: 'Site'
      }
    },
    defaultOrder: {
      column: 'site.name',
      reverse: false
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnSerialNumberList', [
    'CnSerialNumberModelFactory',
    function( CnSerialNumberModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnSerialNumberModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnSerialNumberListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnSerialNumberModelFactory', [
    'CnBaseModelFactory', 'CnSerialNumberListFactory',
    function( CnBaseModelFactory, CnSerialNumberListFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.listModel = CnSerialNumberListFactory.instance( this );
        this.getViewEnabled = function() { return false; };
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
