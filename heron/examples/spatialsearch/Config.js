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

/** api: example[spatialsearch]
 *  Get Features by Drawing
 *  -----------------------
 *  Get, select and download Features by drawing on Map.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 6;
Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
	xtype: 'hr_featselsearchpanel',
	id: 'hr-featselsearchpanel',
	title: __('Spatial Search'),
	height: 600,
	hropts: {
		searchPanel: {
			xtype: 'hr_spatialsearchpanel',
			id: 'hr-spatialsearchpanel',
			header: false,
			bodyStyle: 'padding: 6px',
			style: {
				fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
				fontSize: '12px'
			},
			hropts: {
				onSearchCompleteZoom: 10
			}
		},
		resultPanel: {
			xtype: 'hr_featselgridpanel',
			id: 'hr-featselgridpanel',
			title: __('Search'),
			header: false,
			autoConfig: true,
			hropts: {
				zoomOnRowDoubleClick: true,
				zoomOnFeatureSelect: false,
				zoomLevelPointSelect: 8,
				zoomToDataExtent: true
			}
		}
	}
};


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{
		type: "searchpanel",
		// Options for SearchPanel window
		options: {
			show: true,

			searchWindow: {
				title: undefined,
				x: 100,
				y: undefined,
				width: 320,
				height: 400,
				items: [
					Heron.examples.searchPanelConfig
				]
			}
		}
	}

];
