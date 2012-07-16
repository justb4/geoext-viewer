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

/** api: example[namesearch]
 *  Name Search
 *  -----------
 *  Name search ala google suggest and zoom via OpenStreetMap Nominatim search.
 */

/** This config assumes the DefaultOptions.js to be included first!! */

Heron.options.map.toolbar.push({type: "-"});

Heron.options.map.toolbar.push(
		{
			type: "namesearch",
			// Optional options, see NominatimSearchCombo.js
			options : {
				zoom: 11,
				xtype : 'hr_nominatimsearchcombo',
				tooltip: __('Search Nominatim'),
				id: "nominatimsearchcombo"
			}
		}
);

Heron.options.map.toolbar.push(
		{
			type: "namesearch",
			// Optional options, see OpenLSSearchCombo.js
			options : {
				xtype : 'hr_openlssearchcombo',
				id: "pdoksearchcombo",
				width: 280,
				listWidth: 400,
				minChars: 5,
				queryDelay: 400,
				zoom: 11,
				emptyText: __('Search PDOK'),
				tooltip: __('Search PDOK'),
				url: 'http://localhost:8081/geocoder/Geocoder?max=5'
			}
		}
);