/**
 * The LayerSpecService class.
 *
 * @return LayerSpec instance.
 */
define(
  [
    'Class',
    'underscore',
    'moment',
    'map/services/MapLayerService',
    'map/models/LayerSpecModel'
  ],
  (Class, _, moment, mapLayerService, LayerSpecModel) => {
    const LayerSpecService = Class.extend({
      options: {
        forbidCombined: {
          forest_clearing: {
            except: [
              ['loss', 'forestgain', 'forest2000', 'forest2010'],
              ['imazon', 'forest2000', 'forest2010'],
              ['prodes', 'forest2000', 'forest2010'],
              ['terrailoss', 'forest2000', 'forest2010'],
              ['viirs_fires_alerts', 'forest2000', 'forest2010'],
              [
                'peru_forma_250',
                'brazil_forma_250',
                'laos_forma_250',
                'indonesia_forma_250',
                'drc_forma_250',
                'forma',
                'forma_coverage',
                'forma_activity',
                'forest2000',
                'forest2010'
              ],
              [
                'peru_forma_250',
                'brazil_forma_250',
                'laos_forma_250',
                'indonesia_forma_250',
                'drc_forma_250',
                'forma',
                'forma_coverage',
                'forma_month_3',
                'forest2000',
                'forest2010'
              ],
              [
                'umd_as_it_happens',
                'places_to_watch',
                'uncurated_places_to_watch',
                'forest2000',
                'forest2010'
              ],
              ['guyra', 'forest2000', 'forest2010'],
              ['forest2000', 'forest2000'],
              [
                'mangrove_watch',
                'umd_as_it_happens',
                'places_to_watch',
                'uncurated_places_to_watch'
              ]
            ]
          },
          geographic_coverage: {}
        }
      },

      init() {
        _.bindAll(this, '_getLayers', '_removeLayer');
        this.model = new LayerSpecModel();
      },

      /**
       * Call mapLayerService to get the requested layers, and
       * then call _toggleLayer to toggle them.
       *
       * @param  {array}    where   layer slugs and ids
       * @param  {function} success callback
       * @param  {function} error   callback
       */
      toggle(where, success, error) {
        mapLayerService.getLayers(
          where,
          layers => {
            _.each(layers, this._toggleLayer, this);
            success(this.model);
          },
          error
        );
      },

      _getLayers() {
        return this.model.getLayers();
      },

      _getAllLayers(filterFn, successCb, errorCb) {
        mapLayerService.getAllLayers(filterFn, successCb, errorCb);
      },

      /**
       * Add/delete a layer from the model.
       *
       * @param  {object} layer
       * @return {layer}  return layer or false.
       */
      _toggleLayer(layer) {
        const current = this.model.getLayer({ slug: layer.slug });
        const baselayers = this.model.getBaselayers();

        // At least one baselayer active.
        // if (current && current.category_slug === 'forest_clearing' &&
        //   _.keys(baselayers).length === 1) {
        //   return false;
        // }

        if (current) {
          this._removeLayer(current);
          return false;
        }
        if (!this._combinationIsValid(layer)) {
          _.each(this.model.get(layer.category_slug), l => {
            if (l.category_name === 'Forest change') {
              this._removeLayer(l);
            }
          });
        }
        this._addLayer(layer);
        return layer;
      },

      /**
       * Add a layer to the model.
       *
       * @param {object} layer
       */
      _addLayer(layer) {
        const category = this._getCategory(layer.category_slug);
        category[layer.slug] = this._standardizeAttrs(layer);
      },

      /**
       * Remove a layer and its sublayer.
       * If the category stays empty, it deletes it.
       *
       * @param  {object} layer The layer object
       */
      _removeLayer(layer) {
        // delete layer
        delete this.model.get(layer.category_slug)[layer.slug];

        // delete its sublayers
        if (layer.sublayer) {
          const sublayer = this.model.getLayer({ slug: layer.sublayer });
          sublayer && this._removeLayer(sublayer);
        }

        // delete category if empty
        if (_.isEmpty(this.model.get(layer.category_slug))) {
          this._removeCategory(layer.category_slug);
        }
      },

      /**
       * Remove all the active layers.
       * @param  {object} layer The layer object
       */
      _removeAllLayers() {
        this.model.clear();
      },

      /**
       * Set/get a layer category from the model.
       *
       * @param  {string} slug category slug
       * @return {object}      category
       */
      _getCategory(slug) {
        !this.model.get(slug) && this.model.set(slug, {});
        return this.model.get(slug);
      },

      /**
       * Remove a layer category from the model.
       *
       * @param  {string} slug category slug
       */
      _removeCategory(slug) {
        this.model.unset(slug);
      },

      /**
       * Validate is current layer combination is valid or not.
       *
       * @param  {object}  layer layer object
       * @return {boolean}       combination is valid
       */
      _combinationIsValid(layer) {
        const currentLayers = this.model.get(layer.category_slug);
        const forbidden = this.options.forbidCombined[layer.category_slug];
        if (!forbidden) {
          return true;
        }
        let validCombination = false;

        if (forbidden.except) {
          const combination = _.union(_.pluck(currentLayers, 'slug'), [
            layer.slug
          ]);
          combination.push(layer.slug);
          _.each(
            forbidden.except,
            exception => {
              if (_.difference(combination, exception).length < 1) {
                validCombination = true;
              }
            },
            this
          );
        }

        return validCombination;
      },

      /**
       * Standarize layer attributes.
       *
       * @param  {object} layer layer object
       * @return {object} layer
       */
      _standardizeAttrs(layer) {
        if (layer.mindate) {
          layer.mindate = layer.mindate;
        }

        if (layer.maxdate) {
          layer.maxdate = layer.maxdate;
        }

        return layer;
      },

      /**
       * Called by PlaceService. Returns place parameters representing the
       * state of the layers.
       *
       * @return {object} params
       */
      getPlaceParams() {
        const p = {};
        const sublayers = this.model.getSublayers();

        p.name = 'map';
        p.baselayers = _.map(_.keys(this.model.getBaselayers()), slug => ({
          slug
        }));
        p.sublayers = !_.isEmpty(sublayers) ? _.pluck(sublayers, 'id') : null;

        return p;
      }
    });

    const service = new LayerSpecService();

    return service;
  }
);
