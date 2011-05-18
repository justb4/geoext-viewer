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

/* i18n function */

function __(string) {
	if (typeof(i18n) != 'undefined' && i18n[string]) {
		return i18n[string];
	}
	return string;
}

if (GeoExt.tree.LayerContainer) GeoExt.tree.LayerContainer.prototype.text = __("Layers");
if (GeoExt.tree.BaseLayerContainer) GeoExt.tree.BaseLayerContainer.prototype.text = __("Base Layers");
if (GeoExt.tree.OverlayLayerContainer) GeoExt.tree.OverlayLayerContainer.prototype.text = __("Overlays");

