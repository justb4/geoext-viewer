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

/**
 * Global Bookmarks object, defined as Singleton.
 *
 * See http://my.opera.com/Aux/blog/2010/07/22/proper-singleton-in-javascript
 **/
Heron.widgets.Bookmarks =

		(function () { // Creates and runs anonymous function, its result is assigned to Singleton

			// Any variable inside function becomes "private"

			/** Holds map contexts array. */
			var contexts = undefined;
			var map = undefined;
			var bookmarksPanel = undefined;

			/** Private functions. */


			/** This is a definition of our Singleton, it is also private, but we will share it below */
			var instance = {
				init: function (hroptions) {
					// Set the default content to show. Do this once only.
					// if (hroptions && !contexts) {
					// 	contexts = hroptions;
					// }
				},

				/**
				 * Set Map context, a combination of center, zoom and visible layers.
				 * @param contextid - a context component
				 * @param id - a context id defined in Geoviewer.context config
				 */
				setMapContext: function (contextid, id) {

					// get element id
					var elmm = Ext.getCmp(contextid);
					contexts = elmm.hropts;

					if (contexts) {

						var map = Heron.App.getMap();
						for (var i = 0; i < contexts.length; i++) {
							if (contexts[i].id == id) {

								// if x, y and zoom - then jump to the new position and zoom
								if (contexts[i].x && contexts[i].y && contexts[i].zoom) {
									map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), contexts[i].zoom, false, true);
								}
								// if x, y - then get zoom and jump to the new position
								else if (contexts[i].x && contexts[i].y && !contexts[i].zoom) {
									map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), map.getZoom(), false, true);
								}
								// if zoom - then get position and zoom
								else if (!(contexts[i].x && contexts[i].y) && contexts[i].zoom) {
									map.setCenter(new OpenLayers.LonLat(map.center.lon, map.center.lat), contexts[i].zoom, false, true);
								}

								if (contexts[i].layers) {

									var mapLayers = map.layers;
									var ctxLayers = contexts[i].layers;
									var ctxName = contexts[i].name;

									// If the layer array is not empty => change to a new layer view
									// or
									// If the layer array is empty and the name is not emty => delete all overlays
									// else
									// do nothing => empty line
									if ((ctxLayers.length) || (!ctxLayers.length && ctxName.length)) {

										// Check if layers only should be added
										if (!contexts[i].addLayers) {
											// Make all layers invisible (without baselayers)
											for (var n = 0; n < mapLayers.length; n++) {
												if (mapLayers[n].getVisibility()) {

													// Only invisible if not a baselayer
													if (!mapLayers[n].isBaseLayer) {
														mapLayers[n].setVisibility(false);
													}

												}
											}
										}

										// Make only the layers in the context visible
										for (var m = 0; m < ctxLayers.length; m++) {
											// TODO make lookup more efficient
											for (n = 0; n < mapLayers.length; n++) {
												if (mapLayers[n].name == ctxLayers[m]) {

													// Set new baselayer if it is a baselayer
													if (mapLayers[n].isBaseLayer) {
														map.setBaseLayer(mapLayers[n]);
													}
													mapLayers[n].setVisibility(true);

												}
											}
										}

										// Fix for displaying all changes in the legend panel
										// => set the actual baselayer
										if (map.baseLayer) {
											map.setBaseLayer(map.baseLayer);
										}

									}
								}
							}
						}
					}
				},
				removeBookmark: function (contextid, id) {
					// get element id
					var elmm = Ext.getCmp(contextid);
					elmm.removeBookmark(id);
				},

				setBookmarksPanel : function(abookmarksPanel) {
					bookmarksPanel = abookmarksPanel;
                },

				getBookmarksPanel : function() {
                    return bookmarksPanel;
                }
			};

			// Simple magic - global variable Singleton transforms into our singleton!
			return(instance);

		})();


/** api: (define)
 *  module = Heron.widgets
 *  class = BookmarksPanel
 *  base_link = `Heron.widgets.HTMLPanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.tree.TreePanel>`_
 */

/** api: constructor
 *  .. class:: BookmarksPanel(config)
 *
 *  A panel designed to hold link bookmarks to map contexts (layers/zoom/center).
 *  A map context is a set of layers to be activated, a zoomlevel to be zoomed into plus
 *  the point (x,y) where the map should be centered.
 *
 *  .. code-block:: javascript
 *
 *      {
 *      xtype: 'hr_bookmarkspanel',
 *      id: 'hr-bookmarks',
 *      // The contexts to create bookmarks for in the context browser.
 *      hropts: [
 *      {
 *      id: 'bookmark_XXX',
 *      name: 'Change layers - jump - zoom',
 *      desc: 'Bookmark XXX - change + jump + zoom',
 *      addLayers: false,
 *      layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
 *      , x: 3796558,	y: 5830315
 *      , zoom: 16
 *      },
 *      {
 *      id: 'bookmark_XXX add',
 *      name: 'Add layers - jump - zoom',
 *      desc: 'Bookmark XXX - add + jump + zoom',
 *      addLayers: true,
 *      layers: ['XXX_overlay1','XXX_overlay2']
 *      , x: 3796558,	y: 5830315
 *      , zoom: 16
 *      },
 *      {
 *      id: 'bookmark_XXX_delete',
 *      name: 'Delete all overlays',
 *      desc: '',
 *      layers: []
 *      },
 *      {
 *      id: 'bookmark_empty_1',
 *      name: '',
 *      desc: '',
 *      layers: []
 *      },
 *      {
 *      id: 'bookmark_change_jump',
 *      name: 'Change layers - jump',
 *      desc: 'Bookmark XXX - change + jump',
 *      layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
 *      , x: 3796558,	y: 5830315
 *      },
 *      {
 *      id: 'bookmark_change_zoom',
 *      name: 'Change layers - zoom',
 *      desc: 'Bookmark XXX - change + zoom',
 *      layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
 *      , zoom: 16
 *      },
 *      {
 *      id: 'bookmark_empty_2',
 *      name: '',
 *      desc: '',
 *      layers: []
 *      },
 *      {
 *      id: 'bookmark_only_jump',
 *      name: 'Only - jump',
 *      desc: 'Bookmark XXX - jump',
 *      layers: []
 *      , x: 3796558,	y: 5830315
 *      },
 *      {
 *      id: 'bookmark_only_zoom',
 *      name: 'Only - zoom',
 *      desc: 'Bookmark XXX - zoom',
 *      layers: []
 *      , zoom: 16
 *      }
 *      ]
 *      },
 *
 *
 */
Heron.widgets.BookmarksPanel = Ext.extend(Heron.widgets.HTMLPanel, {
	autoScroll: true,
	bodyStyle: {
		overflow: 'auto'
	},
	initComponent: function () {
		// this.id = 'hr-context-browser';
		// !!! id from panel definition must be unique for search !!!

		this.version = 1;
                
		Heron.widgets.BookmarksPanel.superclass.initComponent.call(this);
		if (!this.title) {
			// Default title, may be overriden
			this.title = __('Bookmarks');
		}

		if (!this.bookmarkTerm) {
			// Default bookmarkTerm, may be overriden
			this.bookmarkTerm = __('bookmark');
		}

		var contexts = undefined;

		var localStorageBookmarks = this.getlocalStorageBookmarks();
		if (localStorageBookmarks) {
			contexts = this.hropts.concat(localStorageBookmarks);
		}
		else {
			contexts = this.hropts;
		}

		this.hropts = contexts;

		Heron.widgets.Bookmarks.init(contexts);

		// Set the global GeoExt bookmarksPanel variable, some need it
		Heron.widgets.Bookmarks.setBookmarksPanel(this);

		//Already create the window.
		this.createAddBookmarkWindow();
		this.addListener("afterrender", this.afterrender);
	},
	afterrender: function () {
		this.updateHtml(this.getHtml());
	},
	getHtml: function () {
		var firstProjectContext = true;
		var firstUserContext = true;
		var htmllines = '<div class="hr-html-panel-body">';
		var divMargin = '3px 5px 3px 0px';
		var divToolMargin = '2px 0px 2px 0px';
		var your = __("Your");
		var remove = __("Remove");
		var removeTooltip = "";
		var divWidth = 210;
		if (this.el !== undefined) {
			//divWidth = this.getWidth() - 30;
			divWidth = this.getInnerWidth() - 50;
		}
		var contexts = this.hropts;
		if (typeof(contexts) !== "undefined") {
			for (var i = 0; i < contexts.length; i++) {
				// write link with panel id and context id
				if (contexts[i].id.substr(0, 11) == "hr_bookmark") {
					//This is a user bookmark
					//Positioning of link and tool floating. 
					if (firstUserContext) {
						htmllines += '<div style="clear: left;"><br></div>';
						htmllines += '<hr>';
						htmllines += '<div class="hr-legend-panel-header" style="margin-top: 5px;">' + your + ' ' + this.title.toLowerCase() + '</div>';
						firstUserContext = false;
						removeTooltip = remove + " " + this.bookmarkTerm;
					}
					if (this.isValidBookmark(contexts[i])) {
						htmllines += '<div style="margin: ' + divMargin + '; float: left; width: ' + divWidth + 'px;"><a href="#" id="' + contexts[i].id + '"title="' + contexts[i].desc + '" onclick="Heron.widgets.Bookmarks.setMapContext(\'' + this.id + "','" + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a></div>';
					}
					else {
						//If the bookmark is not valid, show in color gray
						htmllines += '<div style="margin: ' + divMargin + '; float: left; width: ' + divWidth + 'px;"><a href="#" id="' + contexts[i].id + '"title="' + contexts[i].desc + '" onclick="Heron.widgets.Bookmarks.setMapContext(\'' + this.id + "','" + contexts[i].id + '\'); return false;" style="color: gray">' + contexts[i].name + '</a></div>';
					}
					htmllines += '<div class="x-tool x-tool-close" title="' + removeTooltip + ' \'' + contexts[i].name + '\'" style="margin: ' + divToolMargin + '; float: left; width:15px;" onclick="Heron.widgets.Bookmarks.removeBookmark(\'' + this.id + "','" + contexts[i].id + '\')">&nbsp;</div>';
				}
				else {
					//This is a project bookmark
					if (firstProjectContext) {
						htmllines += '<div class="hr-legend-panel-header">Project ' + this.title.toLowerCase() + '</div>';
						firstProjectContext = false;
					}
					htmllines += '<div style="margin: ' + divMargin + '; float: left; width:100%;"><a href="#" id="' + contexts[i].id + '"title="' + contexts[i].desc + '" onclick="Heron.widgets.Bookmarks.setMapContext(\'' + this.id + "','" + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a></div>';
				}
			}
		}
		htmllines += '</div>';
		return htmllines
	},
	updateHtml: function () {
		this.update(this.getHtml());

	},
	onAddBookmark: function () {
		if (this.supportsHtml5Storage()) {
			this.AddBookmarkWindow.show();
		}
		else {
			alert("This browser does not support storing of local bookmarks.")
		}
	},
	addBookmark: function () {

		var strBookmarkMaxNr = localStorage.getItem("hr_bookmarkMax");
		if (strBookmarkMaxNr) {
			var bookmarkmaxNr = Number(strBookmarkMaxNr);
			if (bookmarkmaxNr !== NaN) {
				bookmarkmaxNr += 1;
			}
			else {
				bookmarkmaxNr = 1;
			}
		}
		else {
			bookmarkmaxNr = 1;
		}

		this.scId = 'hr_bookmark' + bookmarkmaxNr;
		this.scName = this.edName.getValue();
		this.scDesc = this.edDesc.getValue();

		this.getMapContent();

		var newbookmark = {
			id: this.scId,
			version: this.version,
			type: 'bookmark',
			name: this.scName,
			desc: this.scDesc,
			layers: this.scvisibleLayers,
			x: this.scX,
			y: this.scY,
			zoom: this.scZoom,
			units: this.scUnits,
			projection: this.scProjection
		}

		//Encode the new bookmark to JSON
		var newbookmarkJSON = Ext.encode(newbookmark);
		//Add the Heron-bookmark to localStorage
		localStorage.setItem(this.scId, newbookmarkJSON);
		//Increase number of Heron-bookmarks
		localStorage.setItem("hr_bookmarkMax", bookmarkmaxNr);

		//Add the Heron-bookmark to hropts
		this.hropts.push(newbookmark);
		this.updateHtml();
	},
	removeBookmark: function (id) {
		//Remove the bookmark from localStorage
		localStorage.removeItem(id);

		//If this is the last bookmark, decrease max. number of Heron-bookmarks
		var strBookmarkMaxNr = localStorage.getItem("hr_bookmarkMax")
		bookmarkmaxNr = Number(strBookmarkMaxNr)
		if (bookmarkmaxNr == Number(id.substr(4))) {
			bookmarkmaxNr -= 1
			localStorage.setItem("hr_bookmarkMax", bookmarkmaxNr)
		}

		//Remove the bookmark from hropts.
		var contexts = this.hropts;
		var newcontexts = new Array();
		for (var i = 0; i < contexts.length; i++) {
			if (contexts[i].id !== id) {
				newcontexts.push(contexts[i]);
			}
		}
		this.hropts = newcontexts;

		//Refresh the panel
		this.updateHtml();

	},
	getlocalStorageBookmarks: function () {
		if (!this.supportsHtml5Storage()) {
			return null;
		}
		var bookmarkmaxNr = localStorage.getItem("hr_bookmarkMax");
		if (bookmarkmaxNr) {
			var bookmarks = new Array();
			for (index = 1; index <= bookmarkmaxNr; index++) {
				var bookmarkJSON = localStorage.getItem("hr_bookmark" + index);
				if (bookmarkJSON) {
					try {

						//Decode from JSON to bookmark
						var bookmark = Ext.decode(bookmarkJSON)
						bookmarks.push(bookmark);
					} catch(err) {
						// ignore the bookmark, it's not valid
					}
				}
			}
			return bookmarks;
		}
		return null;
	},
	isValidBookmark: function (context) {
		var map = Heron.App.getMap();
		//Check for presents of contextlayers in map
		if (context.layers) {
			var mapLayers = map.layers;
			var ctxLayers = context.layers;
			for (var m = 0; m < ctxLayers.length; m++) {
				var layerPresent = false;
				for (var n = 0; n < mapLayers.length; n++) {
					if (mapLayers[n].name == ctxLayers[m]) {
						layerPresent = true;
						break;
					}
				}
				if (!layerPresent) {
					return false;
				}
			}
		}
		//Check for valid mapcenter
		//First check projection and mapunits
		if (context.projection !== map.projection) {
			return false;
		}
		if (context.units !== map.units) {
			return false;
		}

		//Then check if mapCenter is within maxExtent
		var maxExtent = map.maxExtent; //left, bottom, right, top

		//Is x between left and right of maxExtent?
		if (context.x < maxExtent.left && context.x > maxExtent.right) {
			return false;
		}

		//Is y between bottom and top of maxExtent?
		if (context.y < maxExtent.bottom && context.y > maxExtent.top) {
			return false;
		}

		//Check for valid zoomlevel
		if (context.zoom > map.numZoomLevels) {
			return false;
		}

		//Everything is alright. Valid bookmark
		return true;

	},
	getMapContent: function () {
		var map = Heron.App.getMap();
		var mapCenter = map.getCenter();
		this.scUnits = map.units;
		this.scProjection = map.projection;
		this.scX = mapCenter.lon;
		this.scY = mapCenter.lat;
		this.scZoom = map.getZoom();
		var mapLayers = map.layers;
		this.scvisibleLayers = new Array();
		for (var n = 0; n < mapLayers.length; n++) {
			if (mapLayers[n].getVisibility()) {
				this.scvisibleLayers.push(mapLayers[n].name);
			}
		}

	},
	createAddBookmarkWindow: function () {
		// Maak een formpanel.
		var labelWidth = 65;
		var fieldWidth = 300;

		var formPanel = new Ext.form.FormPanel({
			title: "",
			baseCls: 'x-plain',
			autoHeight: true,
			defaultType: "textfield",
			labelWidth: labelWidth,
			anchor: "100%",
			items: [
				{
					id: "ed_name",
					fieldLabel: __("Name"),
					displayField: "Name",
					width: fieldWidth,
					enableKeyEvents: true,
					listeners: {
						keyup: function (textfield, ev) {
							this.onNameKeyUp(textfield, ev);
						},
						scope: this
					}
				},
				{
					id: "ed_desc",
					fieldLabel: __("Description"),
					displayField: "Decription",
					width: fieldWidth
				}
			]
		});

		// Maak het formulier.
		this.AddBookmarkWindow = new Ext.Window({
			title: __("Add a bookmark"),
			width: 400,
			autoHeight: true,
			plain: true,
			statefull: true,
			stateId: "ZoomToWindow",
			bodyStyle: "padding: 5px;",
			buttonAlign: "center",
			resizable: false,
			closeAction: "hide",     // klik op X geeft hide.
			items: [formPanel],
			listeners: {
				show: function () {
					this.onShowWindow();
				},
				scope: this
			},
			buttons: [
				{
					id: "btn_add",
					text: "Add",
					disabled: true,
					handler: function () {
						this.AddBookmarkWindow.hide();
						this.addBookmark();
					},
					scope: this
				},
				{
					name: "btn_cancel",
					text: "Cancel",
					handler: function () {
						this.AddBookmarkWindow.hide();
					},
					scope: this
				}
			]
		});
		this.edName = Ext.getCmp("ed_name");
		this.edDesc = Ext.getCmp("ed_desc");
		this.btnAdd = Ext.getCmp("btn_add");

	},
	onNameKeyUp: function (textfield, ev) {
		var value = this.edName.getValue();
		if (value) {
			this.btnAdd.enable();
		}
		else {
			this.btnAdd.disable();
		}

	},
	onShowWindow: function () {
		this.edName.setValue('');
		this.edDesc.setValue('');
		this.edName.focus(false, 200);
	},
	supportsHtml5Storage: function () {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
});

/** api: xtype = hr_bookmarkspanel */
Ext.reg('hr_bookmarkspanel', Heron.widgets.BookmarksPanel);

// For compatibility with pre v0.73. Heron.widgets.ContextBrowserPanel was renamed to Heron.widgets.BookmarksPanel
Ext.reg('hr_contextbrowserpanel', Heron.widgets.BookmarksPanel);

