define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'apex_host', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'apex host',
      plural: 'apex hosts',
      possessive: 'apex host\'s'
    },
    columnList: {
      name: {
        title: 'Name'
      },
      host: {
        title: 'Hostname'
      },
      allocations: {
        title: 'Allocations'
      },
      apex_scan_count: {
        title: 'Apex Scans',
        type: 'number'
      },
      participant_count: {
        title: 'Participants',
        type: 'number'
      }
    },
    defaultOrder: {
      column: 'apex_host.name',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    name: {
      title: 'Name',
      type: 'string'
    },
    host: {
      title: 'Hostname',
      type: 'string'
    },
    apex_scan_count: {
      title: 'Apex Scans',
      type: 'string',
      isConstant: true
    },
    participant_count: {
      title: 'Participants',
      type: 'string',
      isConstant: true
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnApexHostList', [
    'CnApexHostModelFactory',
    function( CnApexHostModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnApexHostModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnApexHostView', [
    'CnApexHostModelFactory',
    function( CnApexHostModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnApexHostModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnApexHostListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnApexHostViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnApexHostModelFactory', [
    'CnBaseModelFactory',
    'CnApexHostListFactory', 'CnApexHostViewFactory',
    function( CnBaseModelFactory,
              CnApexHostListFactory, CnApexHostViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.listModel = CnApexHostListFactory.instance( this );
        this.viewModel = CnApexHostViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
