/**
 * The AnalysisResultsPresenter class for the AnalysisResultsView.
 *
 * @return AnalysisResultsPresenter class.
 */
define([
  'map/presenters/PresenterClass',
  'underscore',
  'backbone',
  'moment',
  'mps',
  'map/services/RegionService',
], function(PresenterClass, _, Backbone, moment, mps, RegionService) {

  'use strict';

  var AnalysisResultsPresenter = PresenterClass.extend({

    status: new (Backbone.Model.extend()),

    init: function(view) {
      this.view = view;
      this._super();
      this.listeners();
    },

    listeners: function() {
      this.status.on('change:resource', this.changeResource.bind(this));
    },

    /**
     * Application subscriptions.
     */
    _subscriptions: [
      {
        'Place/go': function(place) {
          var params = place.params;
          this.status.set('baselayers_full', place.layerSpec.getBaselayers(), {silent: true});
        }
      },
      {
        'LayerNav/change': function(layerSpec) {
          this.status.set('baselayers_full', layerSpec.getBaselayers(), {silent: true});
        }
      },
      {
        'Analysis/results': function(status) {
          this.status.set(status, { silent: true });
          this.status.set({
            resource: _.clone(this.setAnalysisResource())
          },{
            silent: true
          });

          // Trigger change always
          this.changeResource();
        }
      }, {
        'Analysis/results-error': function(status) {
          this.status.set(status, { silent: true });
          this.view.renderError();
        }
      }
    ],


    changeResource: function() {
      var iso = this.status.get('iso');

      // Get regions if analysis has country
      (!!iso.country && iso.country != 'ALL') ? this.getRegions() : this.view.render();
    },

    getRegions: function() {
      var iso = this.status.get('iso');

      RegionService.get(iso.country)
        .then(function(results,status) {
          this.status.set({
            regions: results.rows
          });
          this.view.render();
        }.bind(this));
    },

    /**
     * Get analysis resource params which are going to be
     * pass to the html to render the analysis results.
     *
     * @param  {Object} results Results object form the AnalysisService
     * @return {Object}         Returns resource params
     */

    setAnalysisResource: function(status) {
      var p = {};
      /**
       * Define variable that we are going to use later
       */
      var type = this.status.get('type'),
          results = this.status.get('results'),
          dateRange = [moment(this.status.get('begin')),moment(this.status.get('end'))];

      // Layers
      p.slug = this.status.get('dataset');
      p.baselayers = this.status.get('baselayers_full');

      // Area
      p.areaHa = this.roundNumber(results.areaHa || 0);

      // Alerts
      p.alerts = {};
      p.alerts.totalAlerts = this.roundNumber(results.value || 0);

      // Options
      p.options = {};
      p.options.threshold = this.status.get('threshold');
      p.options.enabledSubscription = this.status.get('enabledSubscription');
      p.options.enabledDownload = !!results.downloadUrls;

      if (!!results.downloadUrls) {
        mps.publish('Analysis/downloads', [results.downloadUrls]);
      }


      // Dates
      p.dates = {};
      p.dates.dateRange = '{0} to {1}'.format(dateRange[0].format('MMM-YYYY'),dateRange[1].format('MMM-YYYY'));

      /**
       * Exceptions
       */
      if (p.slug === 'umd-loss-gain') {
        var results = (type == 'country') ? results.total : results;
        p.areaHa = this.roundNumber(results.areaHa || 0);

        p.alerts.totalAlerts = this.roundNumber(results.loss || 0);
        p.alerts.gainAlerts = this.roundNumber(results.gain || 0);
        p.alerts.treeExtent = this.roundNumber(results.treeExtent || 0);

        // Dates
        p.dates.lossDateRange = '{0}-{1}'.format(dateRange[0].year(), dateRange[1].year()-1);
      }

      if (p.slug === 'imazon-alerts') {
        p.alerts.degradAlerts = (!!results.value.length && results.value[0]) ? Math.round(results.value[0].value).toLocaleString() : 0;
        p.alerts.deforAlerts = (!!results.value.length && results.value[1]) ? Math.round(results.value[1].value).toLocaleString() : 0;
      }

      if (p.slug === 'prodes-loss') {
        p.dates.dateRange = '{0}-{1}'.format(dateRange[0].year(), dateRange[1].year()-1);
      }

      return p;
    },

    /**
     * PUBLISHERS
     * - publishRefreshAnalysis
     * - publishShowCanopy
     * - publishNotification
     */
    publishDeleteAnalysis: function() {
      mps.publish('Analysis/delete');
    },

    publishRefreshAnalysis: function() {
      mps.publish('Analysis/refresh');
    },

    publishShowCanopy: function(){
      mps.publish('ThresholdControls/show');
    },

    publishNotification: function(id){
      mps.publish('Notification/open', [id]);
    },


    /**
     * HELPER
     * - roundNumber
     */
    roundNumber: function(value){
      if (_.isNumber(value)) {
        return (value < 10) ? value.toFixed(2).toLocaleString() : Math.round(value).toLocaleString();
      }
      return 0;
    },


  });

  return AnalysisResultsPresenter;

});
