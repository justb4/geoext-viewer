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

Ext.namespace("Heron");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.DOTS_PER_INCH=25.4/0.28;


/** api: example[editorbasics]
 *  Feature Editor Basics
 *  ---------------------
 *  Show basic tools and operations using Geops OLE: https://github.com/geops/ole.
 */

/**
 * Defines the most minimal Heron app: just a Map with a zoomslider.
 *
 **/
Heron.layout = {
	xtype: 'hr_mappanel',

	/* Optional MapPanel ExtJS Panel properties here, see ExtJS API docs */

	/** Below are Heron-specific settings for the MapPanel (xtype: 'hr_mappanel') */
	hropts: {
		settings: {
			center: '545465.505, 6854552.133',
			zoom: 14
		},
		layers: [
			new OpenLayers.Layer.OSM()
		],
		toolbar: [
			{type: "zoomin"},
			{type: "zoomout"},
			{type: "-"},
			{
				/* Default options to be passed to create function below. */
				options: {
					tooltip: 'Draw Features',
					iconCls: "icon-mapedit",
					enableToggle: true,
					pressed: true,
					id: "mapeditor",
					toggleGroup: "toolGroup",

					// Options for OLE Editor
					activeControls: ['ExportFeature', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
					featureTypes: ['polygon', 'path', 'point'],
					language: 'en',
					ExportFeature: {
						url: Heron.globals.serviceUrl,
						// formatter: new OpenLayers.Format.GPX(),
						// formatter: new OpenLayers.Format.GML.v2(),
						formatter: new OpenLayers.Format.WKT(),
						// For custom projections use Proj4.js
						externalProjection: new OpenLayers.Projection('EPSG:4326'),
						internalProjection: new OpenLayers.Projection('EPSG:900913'),
						params: {
							action: 'download',
							mime: 'text/plain',
							filename: 'editor_wkt.txt',
							encoding: 'none'
						}
					}
					// save: function() {alert('saved')}
				},

				// Instead of an internal "type", or using the "any" type
				// provide a create factory function.
				// MapPanel and options (see below) are always passed
				create: function (mapPanel, options) {
					OpenLayers.Lang.setCode(options.language);
					var map = mapPanel.getMap();

					this.editor = new OpenLayers.Editor(map, options);

					this.startEditor = function (self) {
						self.editor.startEditMode();
					};

					this.stopEditor = function (self) {
						var editor = self.editor;
						if (!editor) {
							return;
						}
						if (editor.editLayer) {
							// map.removeLayer(editor.editLayer);
							// editor.editLayer.eraseFeatures();
						}
						editor.stopEditMode();
					};

					// A trivial handler
					var self = this;
					options.handler = function () {
						if (!self.editor.editMode) {
							self.startEditor(self);
						} else {
							self.stopEditor(self);
						}
					};

					if (options.pressed) {
						this.startEditor(self);
					}

					// Provide an ExtJS Action object
					// If you use an OpenLayers control, you need to provide a GeoExt Action object.
					return new Ext.Action(options);
				}
			},
			{type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992'
					, mapTitle: 'Editor - Direct Print'
					// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
					// , mapComment: 'My Comment - Direct Print'
					// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
					// , mapFooter: 'My Footer - Direct Print'
					// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
					// , mapPrintLayout: "A4"			// MapFish - 'name' entry of the 'layouts' array or Null (=> MapFish default)
					, mapPrintDPI: "127"				// MapFish - 'value' entry of the 'dpis' array or Null (=> MapFish default)
					// , mapPrintLegend: true
					// , legendDefaults: {
					//     useScaleParameter : false,
					//     baseParams: {FORMAT: "image/png"}
					//   }
				}}
		]
	}
};
