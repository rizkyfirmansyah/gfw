/**
 * Legend module.
 *
 * @return singleton instance of the legend class (extends Widget).
 */
define(
  [
    'mps',
    'underscore',
    'handlebars',
    'enquire',
    'map/presenters/LegendPresenter',
    'helpers/datasetsHelper',
    'text!map/templates/legend/legend.handlebars',
    'text!map/templates/legend/loss.handlebars',
    'text!map/templates/legend/imazon.handlebars',
    'text!map/templates/legend/fires.handlebars',
    'text!map/templates/legend/forest2000.handlebars',
    'text!map/templates/legend/forest2010.handlebars',
    'text!map/templates/legend/pantropical.handlebars',
    'text!map/templates/legend/idnPrimary.handlebars',
    'text!map/templates/legend/intact2013.handlebars',
    'text!map/templates/legend/grump.handlebars',
    'text!map/templates/legend/stories.handlebars',
    'text!map/templates/legend/terra_i.handlebars',
    'text!map/templates/legend/concesiones_forestales.handlebars',
    'text!map/templates/legend/concesiones_forestalesType.handlebars',
    'text!map/templates/legend/hondurasForest.handlebars',
    'text!map/templates/legend/colombiaForestChange.handlebars',
    'text!map/templates/legend/tigers.handlebars',
    'text!map/templates/legend/dam_hotspots.handlebars',
    'text!map/templates/legend/us_land_cover.handlebars',
    'text!map/templates/legend/global_land_cover.handlebars',
    'text!map/templates/legend/forma.handlebars',
    'text!map/templates/legend/forma_month.handlebars',
    'text!map/templates/legend/bra_mapBiomas.handlebars',
    'text!map/templates/legend/bra_biomes.handlebars',
    'text!map/templates/legend/plantations_by_type.handlebars',
    'text!map/templates/legend/plantations_by_species.handlebars',
    'text!map/templates/legend/oil_palm.handlebars',
    'text!map/templates/legend/gtm_forest_change.handlebars',
    'text!map/templates/legend/gtm_forest_cover.handlebars',
    'text!map/templates/legend/gtm_forest_density.handlebars',
    'text!map/templates/legend/khm_eco_land_conc.handlebars',
    'text!map/templates/legend/usa_forest_ownership.handlebars',
    'text!map/templates/legend/guyra_deforestation.handlebars',
    'text!map/templates/legend/logging_roads.handlebars',
    'text!map/templates/legend/rus_hrv.handlebars',
    'text!map/templates/legend/raisg_land_rights.handlebars',
    'text!map/templates/legend/mysPA.handlebars',
    'text!map/templates/legend/idn_peat.handlebars',
    'text!map/templates/legend/IdnForestArea.handlebars',
    'text!map/templates/legend/idnSuitability.handlebars',
    'text!map/templates/legend/mys_peat.handlebars',
    'text!map/templates/legend/raisg_mining.handlebars',
    'text!map/templates/legend/per_mining.handlebars',
    'text!map/templates/legend/glad.handlebars',
    'text!map/templates/legend/sentinel.handlebars',
    'text!map/templates/legend/mex_forest_cat.handlebars',
    'text!map/templates/legend/mex_forest_subcat.handlebars',
    'text!map/templates/legend/pa.handlebars',
    'text!map/templates/legend/mex_landrights.handlebars',
    'text!map/templates/legend/mexPA.handlebars',
    'text!map/templates/legend/perPA.handlebars',
    'text!map/templates/legend/mex_land_cover.handlebars',
    'text!map/templates/legend/mex_forest_conserv.handlebars',
    'text!map/templates/legend/mex_forest_prod.handlebars',
    'text!map/templates/legend/mex_forest_rest.handlebars',
    'text!map/templates/legend/bra_rtrs.handlebars',
    'text!map/templates/legend/pry_rtrs.handlebars',
    'text!map/templates/legend/lbr_mining.handlebars',
    'text!map/templates/legend/lbr_forest.handlebars',
    'text!map/templates/legend/lbr_community.handlebars',
    'text!map/templates/legend/mangrove_2.handlebars',
    'text!map/templates/legend/bol_user_fire_frequency.handlebars',
    'text!map/templates/legend/sentinel_tiles.handlebars'
  ],
  (
    mps,
    _,
    Handlebars,
    enquire,
    Presenter,
    datasetsHelper,
    tpl,
    lossTpl,
    imazonTpl,
    firesTpl,
    forest2000Tpl,
    forest2010Tpl,
    pantropicalTpl,
    idnPrimaryTpl,
    intact2013Tpl,
    grumpTpl,
    storiesTpl,
    terra_iTpl,
    concesionesTpl,
    concesionesTypeTpl,
    hondurasForestTPL,
    colombiaForestChangeTPL,
    tigersTPL,
    dam_hotspotsTPL,
    us_land_coverTPL,
    global_land_coverTPL,
    formaTPL,
    forma_month_TPL,
    bra_mapBiomasTpl,
    bra_biomesTPL,
    gfwPlantationByTypeTpl,
    gfwPlantationBySpeciesTpl,
    oil_palmTpl,
    gtm_forest_changeTpl,
    gtm_forest_coverTpl,
    gtm_forest_densityTpl,
    khm_eco_land_concTpl,
    usa_forest_ownershipTpl,
    guyra_deforestationTpl,
    logging_roadsTpl,
    rus_hrvTpl,
    raisg_land_rightsTpl,
    mysPATpl,
    idn_peatTpl,
    IdnForestAreaTpl,
    idnSuitabilityTpl,
    mys_peatTpl,
    raisg_miningTpl,
    per_miningTpl,
    gladTpl,
    highresTpl,
    mex_forest_catTpl,
    mex_forest_subcatTpl,
    paTpl,
    mex_landrightsTpl,
    mexPATpl,
    perPATpl,
    mex_land_coverTpl,
    mex_forest_conservTPL,
    mex_forest_prodTPL,
    mex_forest_restTPL,
    bra_rtrs,
    pry_rtrs,
    lbr_miningTPL,
    lbr_forestTpl,
    lbr_communityTpl,
    mangrove2Tpl,
    bol_user_fire_frequencyTpl,
    sentinel_tilesTpl
  ) => {
    const LegendView = Backbone.View.extend({
      el: '#module-legend',

      template: Handlebars.compile(tpl),

      model: new (Backbone.Model.extend({
        defaults: {
          hidden: true,
          categories_status: [],
          layers_status: []
        }
      }))(),

      /**
       * Optional layers detail templates.
       */
      detailsTemplates: {
        loss: Handlebars.compile(lossTpl),
        imazon: Handlebars.compile(imazonTpl),
        forest2000: Handlebars.compile(forest2000Tpl),
        forest2010: Handlebars.compile(forest2010Tpl),
        pantropical: Handlebars.compile(pantropicalTpl),
        idn_primary: Handlebars.compile(idnPrimaryTpl),
        ifl_2013_deg: Handlebars.compile(intact2013Tpl),
        can_ifl: Handlebars.compile(intact2013Tpl),
        grump2000: Handlebars.compile(grumpTpl),
        user_stories: Handlebars.compile(storiesTpl),
        terrailoss: Handlebars.compile(terra_iTpl),
        concesiones_forestales: Handlebars.compile(concesionesTpl),
        concesiones_forestalesNS: Handlebars.compile(concesionesTypeTpl),
        WMSLayer: Handlebars.compile(hondurasForestTPL),
        colombia_forest_change: Handlebars.compile(colombiaForestChangeTPL),
        tigers: Handlebars.compile(tigersTPL),
        dam_hotspots: Handlebars.compile(dam_hotspotsTPL),
        us_land_cover: Handlebars.compile(us_land_coverTPL),
        global_land_cover: Handlebars.compile(global_land_coverTPL),
        us_land_cover_change: Handlebars.compile(us_land_coverTPL),
        forma: Handlebars.compile(formaTPL),
        forma_month_3: Handlebars.compile(forma_month_TPL),
        forma_activity: Handlebars.compile(forma_month_TPL),
        map_biomas: Handlebars.compile(bra_mapBiomasTpl),
        bra_biomes: Handlebars.compile(bra_biomesTPL),
        plantations_by_type: Handlebars.compile(gfwPlantationByTypeTpl),
        bra_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        per_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        lbr_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        col_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        khm_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        idn_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        idn_forest_area: Handlebars.compile(IdnForestAreaTpl),
        idn_suitability: Handlebars.compile(idnSuitabilityTpl),
        mys_plantations_type: Handlebars.compile(gfwPlantationByTypeTpl),
        plantations_by_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        bra_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        per_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        lbr_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        col_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        khm_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        idn_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        mys_plantations_species: Handlebars.compile(gfwPlantationBySpeciesTpl),
        oil_palm: Handlebars.compile(oil_palmTpl),
        gtm_forest_change1: Handlebars.compile(gtm_forest_changeTpl),
        gtm_forest_change2: Handlebars.compile(gtm_forest_changeTpl),
        gtm_forest_cover: Handlebars.compile(gtm_forest_coverTpl),
        gtm_forest_density: Handlebars.compile(gtm_forest_densityTpl),
        khm_eco_land_conc: Handlebars.compile(khm_eco_land_concTpl),
        usa_forest_ownership: Handlebars.compile(usa_forest_ownershipTpl),
        guyra: Handlebars.compile(guyra_deforestationTpl),
        logging_roads: Handlebars.compile(logging_roadsTpl),
        rus_hcv: Handlebars.compile(rus_hrvTpl),
        raisg: Handlebars.compile(raisg_land_rightsTpl),
        mys_protected_areas: Handlebars.compile(mysPATpl),
        raisg_mining: Handlebars.compile(raisg_miningTpl),
        bra_mining: Handlebars.compile(raisg_miningTpl),
        per_mining: Handlebars.compile(per_miningTpl),
        umd_as_it_happens: Handlebars.compile(gladTpl),
        umd_as_it_happens_per: Handlebars.compile(gladTpl),
        umd_as_it_happens_cog: Handlebars.compile(gladTpl),
        umd_as_it_happens_idn: Handlebars.compile(gladTpl),
        viirs_fires_alerts: Handlebars.compile(firesTpl),
        mex_forest_zoning_cat: Handlebars.compile(mex_forest_catTpl),
        mex_forest_zoning_subcat: Handlebars.compile(mex_forest_subcatTpl),
        mex_forest_zoning_conserv: Handlebars.compile(mex_forest_conservTPL),
        mex_forest_zoning_prod: Handlebars.compile(mex_forest_prodTPL),
        mex_forest_zoning_rest: Handlebars.compile(mex_forest_restTPL),
        highres: Handlebars.compile(highresTpl),
        protected_areasCDB: Handlebars.compile(paTpl),
        mex_land_rights: Handlebars.compile(mex_landrightsTpl),
        mexican_pa: Handlebars.compile(mexPATpl),
        per_protected_areas: Handlebars.compile(perPATpl),
        mex_land_cover: Handlebars.compile(mex_land_coverTpl),
        bra_rtrs: Handlebars.compile(bra_rtrs),
        pry_rtrs: Handlebars.compile(pry_rtrs),
        lbr_logging: Handlebars.compile(lbr_forestTpl),
        lbr_mineral_exploration_license: Handlebars.compile(lbr_miningTPL),
        lbr_resource_rights: Handlebars.compile(lbr_communityTpl),
        mangrove_2: Handlebars.compile(mangrove2Tpl),
        bol_user_fire_frequency: Handlebars.compile(bol_user_fire_frequencyTpl),
        sentinel_tiles: Handlebars.compile(sentinel_tilesTpl)
      },

      events: {
        'click .js-toggle-category': 'toogleCategory',
        'click .js-toggle-country-category': 'toogleCountryCategory',
        'click .js-toggle-sublayer': 'toggleLayer',
        'click .js-toggle-layer-option': 'toggleLayerOption',
        'click .js-layer-close': 'removeLayer',
        'click .icon-eye': 'hiddenLayer',
        'mouseover .js-tooltip': 'showTooltip',
        'mouseleave .js-tooltip': 'hiddenTooltip',
        'click .js-tooltip': 'hiddenTooltip',
        'click .-js-show-layer': 'showLayer',
        'click .-js-hidden-layer': 'hiddenLayer',
        'click .js-toggle-threshold': 'toggleThreshold',
        'change .js-tree-cover-year': 'toggleTreeCoverYear',
        'change .js-tree-plantation': 'togglePlantation',
        'change .js-tree-plantation-country': 'togglePlantationCountry',
        'change .js-toggle-concessions': 'toggleConcessions',
        'change .js-map-biomas-year': 'toggleMapBiomasYear',
        'click .js-toggle-legend': 'toogleLegend',
        'click .js-toggle-embed-legend': 'toogleEmbedLegend',
        'click .js-select-layer': 'selectLayer',
        'click .js-refresh-tiles': 'refreshTiles'
      },

      initialize(map, countries) {
        this.presenter = new Presenter(this);

        this.map = map;
        this.countries = countries;
        this.iso = '';

        this.listeners();

        enquire.register(
          `screen and (min-width:${window.gfw.config.GFW_MOBILE}px)`,
          {
            match: function () {
              this.mobile = false;
            }.bind(this)
          }
        );
        enquire.register(
          `screen and (max-width:${window.gfw.config.GFW_MOBILE}px)`,
          {
            match: function () {
              this.mobile = true;
            }.bind(this)
          }
        );
      },

      listeners() {
        this.listenTo(this.model, 'change:hidden', this.toogleModule, this);
      },

      render(html) {
        this.$el.html(html);
        this.cache();
      },

      cache() {
        // elements
        this.$window = $(window);
        this.$titleDialog = $('#title-dialog-legend');
        this.$categories = this.$el.find('.categories');
        this.$buttonLegendBox = $('#button-box-embed-legend');
        this.$linkLegendBox = $('#link-embed-legend');

        this.$more = this.$el.find('#legend-country-more');

        // vars
        this.embed = $('body').hasClass('is-embed-action');
      },

      /**
       *
       * @param  {array}  categories layers ordered by category
       * @param  {object} options    legend options
       */
      updateLegend(categories, options, geographic, iso, more) {
        const layersGlobal = [];
        const layersIso = [];
        let categoriesGlobal = [];
        let categoriesIso = [];
        const layers = _.flatten(categories);

        // Append details template to layer.
        _.each(
          layers,
          function (layer) {
            layer.source =
              layer.slug === 'nothing' ? null : layer.source || layer.slug;
            if (this.detailsTemplates[layer.slug]) {
              if (
                layer.title === 'Tree plantations by type' ||
                layer.title === 'Tree plantations by species'
              ) {
                layer.title = 'Tree plantations';
              }

              layer.sublayers = layers.filter(
                l => l.parent_layer === layer.slug
              );

              const subLayers =
                layer.sublayers.length &&
                layer.sublayers.reduce(
                  (state, l) =>
                    Object.assign(state, {
                      [l.slug]: {
                        color: l.category_color,
                        checked: 'checked'
                      }
                    }),
                  {}
                );

              layer.detailsTpl = this.detailsTemplates[layer.slug](
                Object.assign(
                  {
                    threshold: options.threshold || 30,
                    hresolution: options.hresolution,
                    startYear: options.startYear,
                    layerTitle: layer.title,
                    layerSlug: layer.slug,
                    staging: window.gfw.config.FEATURE_ENV === 'staging'
                  },
                  subLayers
                )
              );
            }

            if (layer.iso) {
              this.iso = layer.iso;
              layersIso.push(layer);
              layer.category_status = `${layer.category_slug}-iso`;
            } else {
              layersGlobal.push(layer);
              layer.category_status = `${layer.category_slug}-global`;
            }

            layer.geographic = geographic ? 'checked' : '';
            layer.geographicTitle = 'Geographic coverage';
            layer.geographicNote = '';
          },
          this
        );

        categoriesGlobal = this.statusCategories(
          this.getLayersByCategory(layersGlobal)
        );
        categoriesIso = this.statusCategories(
          this.getLayersByCategory(layersIso)
        );

        // Render
        this.render(
          this.template({
            categories: _.isEmpty(categoriesGlobal) ? false : categoriesGlobal,
            categoriesIso: _.isEmpty(categoriesIso) ? false : categoriesIso,
            layersLength: layers.length,
            country: iso
              ? _.findWhere(this.countries, { iso: iso.country })
              : null,
            more,
            countryVisibility: !!more || !_.isEmpty(categoriesIso)
          })
        );

        // Change selector countries action name.
        if ($('.categories').filter('.-country')) {
          const accordionCountry = $('.categories').filter('.-country');
          if ($(accordionCountry).find('.js-tree-plantation')) {
            const selectOption = $(accordionCountry).find(
              '.js-tree-plantation'
            );
            $(selectOption).removeClass('js-tree-plantation');
            $(selectOption).addClass('js-tree-plantation-country');
          }
        }

        this.presenter.toggleSelected();
        this.presenter.toggleLayerOptions();
      },

      getLayersByCategory(layers) {
        const subscriptionsAllowed = datasetsHelper.getListSubscriptionsAllowed();
        const filteredLayers = _.filter(layers, layer => !layer.parent_layer);
        return _.groupBy(filteredLayers, layer => {
          layer.allowSubscription =
            layer && subscriptionsAllowed.indexOf(layer.slug) > -1;

          // Hack to keep the forest_clearing slug in layers which have to be analyzed but not grouped by the said slug in the legend
          if (
            layer.category_slug === 'forest_clearing' &&
            !layer.is_forest_clearing
          ) {
            return 'forest_cover';
          }
          return layer.category_slug;
        });
      },

      statusCategories(array) {
        // Search for layer 'nothing'
        const categories_status = this.model.get('categories_status');
        _.each(
          array,
          category => {
            for (let i = 0; i < category.length; i++) {
              // Mantain categories closed in rendering
              category.closed =
                categories_status.indexOf(category[i].category_status) != -1;
              // Get layer's length of each category
              category.layers_length = i + 1;
            }
          },
          this
        );

        return array;
      },

      /**
       * Set widget from layers object.
       *
       * @param  {array} categories, options, geographic
       */
      update(categories, options, geographic, iso, more) {
        if (categories.length === 0 && !more) {
          this.model.set({
            hidden: true
          });
        } else {
          this.model.set({
            hidden: false,
            boxClosed: false
          });
          this.updateLegend(categories, options, geographic, iso, more);
        }
      },

      /**
       *
       * UI EVENTS
       *
       */
      // category
      toogleCategory(e) {
        if (!this.mobile) {
          // Save category status in an array
          const categories_status = this.model.get('categories_status');
          const slug = $(e.currentTarget).data('category_slug');
          const index = categories_status.indexOf(slug);

          // Generate the status of the categories
          index != -1
            ? categories_status.splice(index, 1)
            : categories_status.push(slug);
          this.model.set('categories_status', categories_status);

          $(e.currentTarget)
            .parent()
            .toggleClass('closed');
          $(e.currentTarget)
            .parent()
            .children('.layers')
            .toggleClass('closed');
        }
      },

      toogleCountryCategory(e) {
        if (!this.mobile) {
          // Save category status in an array
          const categories_status = this.model.get('categories_status');
          const slug = $(e.currentTarget).data('category_slug');
          const index = categories_status.indexOf(slug);

          // Generate the status of the categories
          index != -1
            ? categories_status.splice(index, 1)
            : categories_status.push(slug);
          this.model.set('categories_status', categories_status);

          const parent = $(e.currentTarget).parent();

          if ($(parent).hasClass('-divided')) {
            $(parent)
              .children('.category')
              .toggleClass('-hidden-category');
            $(e.currentTarget)
              .parent()
              .toggleClass('closed');
          }
        }
      },

      toggleLayerOption(e) {
        if (
          !$(e.target).hasClass('source') &&
          !$(e.target)
            .parent()
            .hasClass('source')
        ) {
          const option = $(e.currentTarget).data('option');
          this.presenter.toggleLayerOption(option);
        }
      },

      toggleLayerOptions(layerOptions) {
        _.each(
          this.$el.find('.layer-option'),
          div => {
            const $div = $(div);
            const $toggle = $div.find('.onoffswitch');
            const optionSelected =
              layerOptions.indexOf($div.data('option')) > -1;
            const color = $toggle.data('color') || '#F69';

            if (optionSelected) {
              $toggle.addClass('checked').css('background', color);
              $toggle.next().removeClass('-hidden');
            } else {
              $toggle.removeClass('checked').css('background', '');
              $toggle.next().addClass('-hidden');
            }
          },
          this
        );
      },

      togglePlantation(e) {
        const layerSlug = $(e.currentTarget).val();
        const layerSlugRemove = '';
        this.presenter.toggleLayer('plantations_by_type');
        this.presenter.toggleLayer('plantations_by_species');
      },

      togglePlantationCountry(e) {
        const iso = this.iso.toLowerCase();
        const types = `${iso}_plantations_type`;
        const species = `${iso}_plantations_species`;
        this.presenter.toggleLayer(types);
        this.presenter.toggleLayer(species);
      },

      toggleConcessions(e) {
        this.presenter.toggleLayer('concesiones_forestales');
        this.presenter.toggleLayer('concesiones_forestalesNS');
      },

      // layers
      toggleLayer(e) {
        if (
          !$(e.target).hasClass('source') &&
          !$(e.target)
            .parent()
            .hasClass('source')
        ) {
          const layerSlug = $(e.currentTarget).data('sublayer');
          this.presenter.toggleLayer(layerSlug);
        }
      },

      removeLayer(e) {
        e && e.preventDefault();

        const layerSlug = $(e.currentTarget).data('slug');
        this.presenter.toggleLayer(layerSlug);
        this.removeSublayers(layerSlug);
      },

      showTooltip(e) {
        const position = $(e.target).offset();
        const top = position.top - 10;
        const left = position.left - 92;
        let text = $(e.target).attr('data-description');
        text = text.replace('(', '');
        text = text.replace(')', '');
        const dataSource = $(e.target).attr('data-source');
        if (text != '') {
          $('body').append(
            `<div class="tooltip-info-legend" id="tooltip-info-legend" style="top:${top}px; left:${left}px;"><div class="triangle"><span>${text}</span><p>Click to see more</p></div></div>`
          );
        }
        $('.tooltip-info-legend').css(
          'top',
          top - $('.tooltip-info-legend').height() - 20
        );
      },

      hiddenTooltip(e) {
        if ($('#tooltip-info-legend').length) {
          document.getElementById('tooltip-info-legend').remove();
        }
      },

      removeSublayers(layerSlug) {
        const $subLayers = this.$el.find(`[data-parent='${layerSlug}']`);

        if ($subLayers.length > 0) {
          const _this = this;
          $subLayers.each(function () {
            const $item = $(this);
            const isChecked = $item.find('.checked').length > 0;

            if (isChecked) {
              const slug = $(this).data('sublayer');
              _this.presenter.toggleLayer(slug);
            }
          });
        }
      },

      hiddenSublayers(layerSlug) {
        const $subLayers = this.$el.find(`[data-parent='${layerSlug}']`);

        if ($subLayers.length > 0) {
          const _this = this;
          $subLayers.each(function () {
            const $item = $(this);
            const isChecked = $item.find('.checked').length > 0;

            if (isChecked) {
              const slug = $(this).data('sublayer');
              _this.presenter.toggleLayer(slug);
            }
          });
        }
      },

      // threshold
      toggleThreshold(e) {
        e && e.preventDefault();
        this.presenter.toggleThreshold();
      },

      // tree cover year
      toggleTreeCoverYear(e) {
        const layerSlug = $(e.currentTarget).val();
        const layerSlugRemove = '';
        this.presenter.toggleLayer('forest2000');
        this.presenter.toggleLayer('forest2010');
      },

      // map biomas year
      toggleMapBiomasYear(e) {
        const year = $(e.currentTarget).val();
        mps.publish('Year/update', [year]);
      },

      // legend
      toogleLegend(bool) {
        const to = bool && bool.currentTarget ? false : bool;
        this.$el.toggleClass('active', to);
        this.presenter.toggleOverlay(to);
      },

      // Toggle sublayers if they are selected
      toggleSelected(layers) {
        _.each(
          this.$el.find('.layer-sublayer'),
          div => {
            const $div = $(div);
            const $toggle = $div.find('.onoffswitch');
            const layer = layers[$div.data('sublayer')];
            if (layer) {
              const color = layer.parent_layer
                ? layer.title_color
                : layer.category_color;
              $toggle.addClass('checked');
              $toggle.css('background', color);
              $toggle.next().removeClass('-hidden');
            } else {
              $toggle.removeClass('checked').css('background', '');
              $toggle.next().addClass('-hidden');
            }
          },
          this
        );
      },

      // Toggle visibility
      toogleModule() {
        this.$el.toggleClass('hide', this.model.get('hidden'));
        this.$el.toggleClass('hide-no-layers', this.model.get('hidden'));
      },

      // Embed UI events
      toogleEmbedLegend(e) {
        e && e.preventDefault();
        const active = this.$titleDialog.hasClass('active');
        this.$titleDialog.toggleClass('active', !active);
        this.$categories.toggleClass('active', !active);
        this.$buttonLegendBox.toggleClass('active', !active);
      },

      updateLinkToGFW() {
        if (this.embed && !!this.$linkLegendBox) {
          const href = window.location.href.replace('/embed', '');
          this.$linkLegendBox.attr('href', href);
        }
      },

      selectLayer(e) {
        const target = $(e.currentTarget);
        const radios = this.$el.find('.radioswitch');

        if (!target.hasClass('selected')) {
          const layerSlug = target.data('layer');
          radios.removeClass('selected');
          target.addClass('selected');
          this.presenter.toggleLayer(layerSlug);
        }
      },

      showLayer(e) {
        const layer = $(e.target).attr('data-slug-show');

        _.each(this.$el.find('.layer-info-container'), li => {
          if (layer === $(li).attr('data-slug')) {
            $(li).removeClass('-desactivate');
          }
        });

        _.each(this.$el.find('.-js-hidden-layer'), li => {
          if (layer === $(li).attr('data-slug-hidden')) {
            $(li).css('display', 'block');
          }
        });

        _.each(this.$el.find('.-js-show-layer'), li => {
          if (layer === $(li).attr('data-slug-show')) {
            $(li).css('display', 'none');
          }
        });
        e && e.preventDefault();
        const index = this._getOverlayIndex(layer);
        let iCount = 0;
        const layerP = this.map.overlayMapTypes.getAt(index);
        let hasOpacity = false;
        if (typeof layerP !== 'undefined' || layerP != null) {
          hasOpacity = layerP.opacity >= 0;
        }
        if (hasOpacity) {
          layerP.setOpacity(1);
        } else {
          const layerArray = this.model.get('layers_status');
          const mapLayer = this.map.overlayMapTypes.getAt(index);

          _.map(layerArray, (l, i) => {
            if (l.name === layer) {
              this.map.overlayMapTypes.setAt(l.index, l.layerInformation);
            }
            iCount += 1;
          });
        }
      },

      hiddenLayer(e) {
        const layer = $(e.target).attr('data-slug-hidden');

        _.each(this.$el.find('.layer-info-container'), li => {
          if (layer === $(li).attr('data-slug')) {
            $(li).addClass('-desactivate');
          }
        });

        _.each(this.$el.find('.-js-hidden-layer'), li => {
          if (layer === $(li).attr('data-slug-hidden')) {
            $(li).css('display', 'none');
          }
        });

        _.each(this.$el.find('.-js-show-layer'), li => {
          if (layer === $(li).attr('data-slug-show')) {
            $(li).css('display', 'block');
          }
        });

        e && e.preventDefault();
        const index = this._getOverlayIndex(layer);
        const layerP = this.map.overlayMapTypes.getAt(index);
        let hasOpacity = false;

        if (typeof layerP !== 'undefined' || layerP != null) {
          hasOpacity = layerP.opacity >= 0;
        }

        if (hasOpacity) {
          layerP.setOpacity(0);
        } else if (
          typeof this.map.overlayMapTypes.getAt(index) !== 'undefined' ||
          this.map.overlayMapTypes.getAt(index) != null
        ) {
          const layerArray = this.model.get('layers_status');
          const mapLayer = this.map.overlayMapTypes.getAt(index);
          layerArray.push({
            index,
            name: layer,
            layerInformation: this.map.overlayMapTypes.getAt(index)
          });
          this.model.set('layers_status', layerArray);
          this.map.overlayMapTypes.removeAt(index);
        }
      },

      _getOverlayIndex(name) {
        let index = -1;
        var name = name;
        _.each(
          this.map.overlayMapTypes.getArray(),
          (layer, i) => {
            if (layer) {
              const layerName = layer.name || layer.options.name;
              if (layerName === name) {
                index = i;
              }
            }
          },
          this
        );
        return index;
      },

      refreshTiles(e) {
        const layerSlug = $(e.currentTarget).data('sublayer');

        mps.publish('Layer/update', [layerSlug]);
      }
    });

    return LegendView;
  }
);
