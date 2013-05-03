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

// Define App namespace.
Ext.namespace("App");

// Define App helpWindow variable.
//App.prototype.helpWindow = null;
App.helpWindow = null ;

//---------------------------------------------------------------------------
// Show Help window.
var btn_HelpClicked = function() {
  if (!App.helpWindow) {
    App.helpWindow = new App.HelpWindow(this);
  }
  App.helpWindow.show();
}

//---------------------------------------------------------------------------
Ext.define("App.HelpWindow", {

  extend: "Ext.Window",

  //---------------------------------------------------------------------------
  constructor: function() {

    this.form = new Ext.FormPanel({
      frame: false,
      bodyStyle: "padding:5px;",
      autoScroll: true,
      preventBodyReset: true
    });

    this.callParent([{
      title: "Help",
      modal: true,
      width: 600,
      height: 400,
      layout: "fit",
      plain: true,
      border: false,
      buttonAlign: "center",
      resizable: true,
      closeAction: "hide",
      buttons: [{
        text: "Sluiten",
        handler: function() {
          this.hide();
        },
        scope: this
      }],
      items: this.form
    }]);

    var s = "";
    s += "<h1>Help</h1>";
    s += "Dit is de help van de 'Fixed Panels Layout' applicatie.";
    s += "<ul>";
    s += "<li>Inhoud</li>";
    s += "<li>FAQ</li>";
    s += "</ul>";
    this.setHtml(s);

  },
  //---------------------------------------------------------------------------
	setHtml: function(s) {
    this.form.html = s;
	}
});
