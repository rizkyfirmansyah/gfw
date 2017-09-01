/**
 * The Landmark layer module (copied from DamHotspotsLayer)
 *  This is the first layer to use the sub-layers extension
 * layerspec_nuclear_hazard cartodb_id 952
 * @return
 */
define([
  'abstract/layer/CartoDBLayerClass',
  'text!map/cartocss/Landmark.cartocss'
], function(CartoDBLayerClass, landmark_css) {

  'use strict';

  var LandmarkLayer = CartoDBLayerClass.extend({

    options: {
      sql: 'SELECT the_geom_webmercator, name, \'{tableName}\' AS layer FROM {tableName}',
      infowindow: true,
      interactivity: ' name',
      analysis: false,
      cartocss: landmark_css,
      sublayers: [{
                    sql: 'SELECT the_geom_webmercator, name, landmark_point AS layer FROM landmark_point',
                    infowindow: true,
                    interactivity: ' name',
                    analysis: false,
                    cartocss: landmark_css,
      }]
    }

  });

  return LandmarkLayer;

});
