/**
 * The NavMobileView view.
 *
 * @return NavMobileView view (extends Backbone.View)
 */
define([
  'underscore',
  'handlebars',
  'enquire',
  'map/presenters/NavMobilePresenter',
  'text!map/templates/navmobile.handlebars'
], function(_, Handlebars, enquire, Presenter, tpl) {

  'use strict';

  var NavMobileModel = Backbone.Model.extend({
    defaults: {
      hidden: false,
    }
  });

  var NavMobileView = Backbone.View.extend({

    el: '#module-navmobile',

    events: {
      'click .toggleMobileViews' : 'showView',
      'click #country-navmobile-btn' : 'toggleCountriesTab'
    },

    template: Handlebars.compile(tpl),

    initialize: function() {
      this.presenter = new Presenter(this);

      enquire.register("screen and (max-width:"+window.gfw.config.GFW_MOBILE+"px)", {
        match: _.bind(function(){
          this.model = new NavMobileModel();
          this.render(true);
        },this)
      });
      enquire.register("screen and (min-width:"+window.gfw.config.GFW_MOBILE+"px)", {
        match: _.bind(function(){
          this.render(false);
        },this)
      });

    },

    render: function (bool) {
      if(bool){
        this.$el.html(this.template());
        this.cacheVars();
      } else {
        this.$el.html('');
      }
      this.$el.find('.timeline-mobile-call-to-action a').attr('href',location.href.replace('/embed',''));
    },

    cacheVars: function(){
      this.$toggleMobileViews = this.$el.find('.toggleMobileViews');
      this.$timelineBtn = $('#timeline-navmobile-btn');
      this.$layersBtn = $('#layers-navmobile-btn');
      this.$analysisBtn = $('#analysis-navmobile-btn');
      this.$countryBtn = $('#country-navmobile-btn');
      this.$hresBtn = $('#hres-navmobile-btn');
    },

    showView: function(e){
      e && e.preventDefault();
      if (!$(e.currentTarget).hasClass('disabled')) {
        if (!$(e.currentTarget).hasClass('active')) {
          this.resetBtns();
          $(e.currentTarget).addClass('active');
          this.presenter.toggleCurrentTab($(e.currentTarget).data('tab'), true);
        }else{
          this.resetBtns();
          this.presenter.toggleCurrentTab($(e.currentTarget).data('tab'), false);
        }
      }
    },

    // Reset buttons
    resetBtns: function () {
      this.$toggleMobileViews.removeClass('active');
    },

    // Timeline
    toggleTimelineBtn: function(toggle){
      this.$timelineBtn.toggleClass('disabled',toggle);
    },

    toogleAnalysisBtn: function(toggle){
      this.$analysisBtn.toggleClass('current',toggle);
    },
    
    toogleHresBtn: function(toggle){
      this.$hresBtn.toggleClass('current',toggle);
    },

    toggleVisibilityAnalysis: function(toggle){
      this.$analysisBtn.toggleClass('disabled',toggle);
    },

    toogleCountryBtn: function (name) {
      this.$countryBtn.toggleClass('active',!!name);
      this.$countryBtn.find('.name').text(name);
    },

    toggleCountriesTab: function(){
      this.presenter.openCountriesTab();
    },

    toogleTimelineClass: function(toggle){
      this.$countryBtn.toggleClass('timeline-open',toggle);
    }

  });

  return NavMobileView;

});
