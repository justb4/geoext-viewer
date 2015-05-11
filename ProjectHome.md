## About ##
**NOTICE: We haved moved the project to Github - https://github.com/heron-mc/heron-mc is the new home!! This repo will be closed shortly.**

The Heron Mapping Client or Heron MC provides an extensible browser-based mapping client.
The main goal of this project is to make it easy to create web mapping applications like viewers for maps and editors for geodata. Note: the project-name "geoext-viewer" is still here since the project started under that name. The official website for the Heron MC project is http://heron-mc.org. This Google Code site is related to all of the Heron MC project development.

## Download ##
Find all Heron release downloads at http://heron-mc.org/download

(Google Code no longer supports downloads).

<wiki:gadget url="http://google-code-feed-gadget.googlecode.com/svn/trunk/gadget.xml" up\_feeds="http://code.google.com/feeds/p/geoext-viewer/svnchanges/basic"  width="500" height="400" border="1"/>

See  introductory presentations of Heron MC at
http://www.slideshare.net/justb4/the-heron and
http://www.justobjects.nl/jo/assets/presentation/bolsena-2012-heron

| ![http://lib.heron-mc.org/heron/resources/images/nieuwsinkaart.nl-320.png](http://lib.heron-mc.org/heron/resources/images/nieuwsinkaart.nl-320.png) <br>PDOK (Dutch national SDI) <br><a href='http://nieuwsinkaart.nl/pdok'>http://nieuwsinkaart.nl/pdok</a> <table><thead><th> <img src='http://lib.heron-mc.org/heron/resources/images/kademo-screenshot-320.png' /> <br>Kadaster GEORZ Lab en Research <br><a href='http://kademo.nl'>http://kademo.nl</a> </th><th> <img src='http://lib.heron-mc.org/heron/resources/images/inspire-screenshot-320.png' /> <br>INSPIRE Data with FOSS<br><a href='http://inspire.kademo.nl'>http://inspire.kademo.nl</a></th></thead><tbody></tbody></table>

See many more application examples in the <a href='http://heron-mc.org/gallery.html'>Heron Gallery</a>

<h2>Features</h2>
<ul><li>Browser-based mapping client<br>
</li><li>Standards compliant, supporting <a href='http://opengeospatial.org'>Open Geospatial Consortium (OGC)</a> standards<br>
</li><li>Renders maps from Web Map Services (WMS), Web Feature Services (WFS), Google/Bing/Yahoo Maps<br>
</li><li>Easy to use<br>
</li><li>No browser plugins required<br>
</li><li>Built on proven Javascript frameworks: <a href='http://geoext.org'>GeoExt</a>, <a href='http://openlayers.org'>OpenLayers</a> and <a href='http://www.sencha.com/products/extjs/'>ExtJS</a>.<br>
</li><li>Works with most modern browsers<br>
</li><li>Advanced map components<br>
</li><li>Customizable and easy to extend<br>
</li><li>Internationalization (i18n)<br>
</li><li>Free and Open Source under the <a href='http://www.gnu.org/licenses/gpl.html'>GPL licence</a></li></ul>

<h2>Design Philosophy</h2>
Central to the design of the Heron MC<br>
is that a web mapping client application is defined through a<br>
configuration. The configuration defines the<br>
components and widgets to be instantiated, like<br>
map panels and toolbars. At the same time the configuration also defines<br>
how these components are parameterized and wired together in order to<br>
assemble the application and its behaviour.<br>
<br>
Configuration conventions to instantiate and link software components is a well-known software engineering principle with many variants like<br>
the <a href='http://en.wikipedia.org/wiki/Builder_pattern'>Builder Pattern</a>
and <a href='http://en.wikipedia.org/wiki/Dependency_Injection'>Dependency Injection</a> as found in <a href='http://www.springsource.org'>Spring</a>. Using a configuration to define<br>
a web mapping application was also one of the design principles<br>
of the first-ever web mapping client <a href='http://www.osgeo.org/mapbuilder'>Community MapBuilder</a>. Although <a href='http://www.osgeo.org/mapbuilder'>Community MapBuilder</a> is now EOL, possibly because it was ahead of its time, many of its design principles have inspired a range of web mapping clients that followed.<br>
<br>
In addition the combination of configuration and a rich set of widgets<br>
allows the creation of complete websites like a geoportal.<br>
<br>
<h2>Project</h2>
This project was originally initiated by<br>
the <a href='http://kademo.nl'>Dutch Kadaster GEORZ Lab and Research</a> and now sponsored jointly with the <a href='http://www.rvob.nl'>Dutch Rijksvastgoed- en ontwikkelingsbedrijf (RVOB)</a>.<br>
An article "RVOB en Het Kadaster in Open Samenwerking", about this collaboration appeared in the magazine <a href='http://www.geo-info.nl/kennisbank&collectionId=17670397'>Geo-Info</a> (nr 12, 2011, Dutch). The main technical contributor is currently the <a href='http://opengeogroep.nl'>Dutch OpenGeoGroep</a> (a.o. <a href='http://www.justobjects.nl'>Just van den Broecke</a> and <a href='http://dogodigi.nl'>Milo van der Linden</a>). Initial contributions were also from <a href='http://geodan.nl'>Geodan</a>.<br>
<br>
See the <a href='Roadmap.md'>Roadmap</a> for the release schedule. Some <a href='https://www.ohloh.net/p/heron-mc'>stats on Ohloh</a>.<br>
<br>
<h2>Get Started</h2>
Want to build your first application, but don't know where to start ? See the tutorial<br>
at <a href='http://heron-mc.org'>http://heron-mc.org</a>.<br>
<br>
<h2>Get Involved</h2>
This is an open source project, and its source code is hosted here, at Google Code, making contribution very easy. Besides contributing source code, getting involved with can also be effected by submitting a bug you’ve encountered or asking for a feature you’d like to have. You can start by signing up with our group at <a href='http://groups.google.com/group/geoext-viewer-devel'>http://groups.google.com/group/geoext-viewer-devel</a>. For coding we use the Airbnb JavaScript Style Guide: <a href='https://github.com/airbnb/javascript'>https://github.com/airbnb/javascript</a>, with the exception of 4-space indentation i.s.o. 2.<br>
<br>
See more details and ways to contribute in <a href='Contributing.md'>Contributing</a>.<br>
<br>
<h2>Goals</h2>
The main goal of this project is to make it easy to create web mapping clients like<br>
viewers for maps and geodata. In many cases this should only take you minutes.<br>
At the same time the aim is also to allow the creation of more<br>
advanced web map clients and even entire web applications.<br>
For example for <a href='http://esdin.eu'>the ESDIN project</a> a viewer has been developed that visualizes maps (via WMS) and <a href='http://en.wikipedia.org/wiki/GML_Application_Schemas'>ISO GML Application Schemas complex GML data</a> (via WFS) based on  <a href='http://inspire.jrc.ec.europa.eu'>INSPIRE specifications</a>.<br>
<h2>Examples</h2>
The <a href='http://heron-mc.org/examples.html'>online examples </a> show many of the features and may serve as a starting point for your application.<br>
<h2>Project Activity</h2>

<table><thead><th><wiki:gadget url="http://www.ohloh.net/p/584232/widgets/project_basic_stats.xml" height="220" width="400" border="0" /></th><th><wiki:gadget url="http://www.ohloh.net/p/heron-mc/widgets/project_languages.xml" height="220" width="400" border="0" /></th></thead><tbody>