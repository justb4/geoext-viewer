/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.namespace("Heron.widgets");


/** api: (define)
 *  module = Heron.widgets
 *  class = LayerLegendPanel
 *  base_link = `GeoExt.LegendPanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=GeoExt.LegendPanel>`_
 */

/** api: constructor
 *  .. class:: LayerLegendPanel(config)
 *
 *  A panel designed to hold legends for Map Layers (WMS GetLegendGraphic results).
 */
Heron.widgets.LayerLegendPanel = Ext.extend(GeoExt.LegendPanel, {

	initComponent : function() {
		var options = {
			id: 'hr-layer-legend',
			title		: __('Legend'),

			/* This allows optional suppression of WMS GetLegendGraphic that may be erroneous (500 err) for a Layer, fixes issue 3  */
			filter : function(record) {
				return record && !record.get("layer").noLegend;
			},
			bodyStyle: 'padding:5px',
			autoScroll: true,
			defaults   : {
				useScaleParameter : false
			},
			dynamic: true
		};

		Ext.apply(this, options);

		Heron.widgets.LayerLegendPanel.superclass.initComponent.call(this);

		// this.addListener("afterrender", this.addLegends);

	},

	/** private: method[addLegend]
	 *  Add a legend for the layer.
	 *
	 *  :param record: ``Ext.data.Record`` The record object from the layer
	 *      store.
	 *  :param index: ``Integer`` The position at which to add the legend.
	 */
	addLegend: function(record, index) {
		// Sort of hack: somehow the record does not have a layerStore field
		// but needs it when it is created to register for updates with the layerStore
		record.store = this.layerStore;
		Heron.widgets.LayerLegendPanel.superclass.addLegend.apply(this, arguments);
	}
});

/** api: xtype = hr_layerlegendpanel */
Ext.reg('hr_layerlegendpanel', Heron.widgets.LayerLegendPanel);
