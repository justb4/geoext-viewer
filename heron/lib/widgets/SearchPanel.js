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
 *  class = SearchPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to use a Heron SearchPanel.
 *
 *  .. code-block:: javascript
 *
				{
					xtype: 'hr_searchpanel',
					id: 'hr-searchpanel',
					title: __('Search'),
					hropts: {
						protocol: new OpenLayers.Protocol.WFS({
									version: "1.1.0",
									url: "http://gis.kademo.nl/gs2/wfs?",
									srsName: "EPSG:28992",
									featureType: "hockeyclubs",
									featureNS: "http://innovatie.kadaster.nl"
								}),
						items: [
							{
								xtype: "textfield",
								name: "name",
								value: "Hurley",
								fieldLabel: "name"
							},
							{
								xtype: "textfield",
								name: "desc",
								value: "0206454468",
								fieldLabel: "desc"
							},
							{
								xtype: "label",
								id: "progresslabel"
							}
						],
						cols
								:
								[
									{name: 'name', type: 'string'},
									{name: 'cmt', type: 'string'},
									{name: 'desc', type: 'string'}
								],
						// Callback when search in progress.
						searchInProgress :
								function(searchPanel) {
									searchPanel.get('progresslabel').setText(__('Searching...'));
								},
						//Callback when search completed.
						searchComplete :
								function(searchPanel, action) {
									if (action && action.response && action.response.success()) {
										var features = action.response.features;
										searchPanel.get('progresslabel').setText(__('Search Completed: ') + (features ? features.length : 0) + ' '+ __('Feature(s)'));
										if (features[0] && features[0].geometry) {
											var point = features[0].geometry.getCentroid();
											Heron.App.getMap().setCenter(new OpenLayers.LonLat(point.x, point.y), 11);
										}
									} else {
										searchPanel.get('progresslabel').setText(__('Search Failed'));
									}
								}
					}
				}
 */

/** api: constructor
 *  .. class:: SearchPanel(config)
 *
 *  A panel designed to hold a (geo-)search form.
 */
Heron.widgets.SearchPanel = Ext.extend(GeoExt.form.FormPanel, {

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
	initComponent: function() {
		Ext.apply(this, this.hropts);
		Ext.apply(this.initialConfig, this.hropts);

		var self = this;

		this.listeners = {
			actioncomplete: function(form, action) {
				// this listener triggers when the search request
				// is complete, the OpenLayers.Protocol.Response
				// resulting from the request is available
				// in "action.response"
				self.action = action;

				if (self.searchComplete) {
					self.searchComplete(self, action);
				}
			}
		};

		Heron.widgets.SearchPanel.superclass.initComponent.call(this);

		this.addButton({
			text: __('Search'),
			handler: function() {
				self.action = null;
				self.search();
				if (self.searchInProgress) {
					self.searchInProgress(self);
				}
			},
			scope: self
		});
	}
});
/** api: xtype = hr_searchpanel */
Ext.reg('hr_searchpanel', Heron.widgets.SearchPanel);

