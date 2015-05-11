**THIS IS OLD STUFF NOW - NEEDS TO REVISED OR REMOVED**

(and most of this has been realized)


Author: [Just van den Broecke](http://www.justobjects.nl)

Below are some of my ideas as input for our meeting at Geodan on June 22, 2010.
Results from that meeting are in _italic font_.

# General #

In general my aim is to provide a highly configurable and extensible geo-webclient that can be used in a variety of projects. In particular there is interest within the Dutch Kadaster for web-based applications and for INSPIRE (e.g. ExM visualisation within ESDIN). My personal interest is to use this as a basis within specific tracking & tracing clients such as http://geoskating.com.

_In general we will aim first to provide features to support the ESDIN demo client since both Kadaster and Geodan participate in ESDIN. In the longer term we aim for a reusable web client for projects/NMCA's like/within INSPIRE, in general a client is able to deal with ISO Application Schemas. "_

# New Features #

  1. support WFS Vector layers
> > _already works: seethe esdin example (need proxy)_
  1. support for themes via multiple levels in Layerbrowser tree hierarchy
> > _see [issue 12](https://code.google.com/p/geoext-viewer/issues/detail?id=12)_
  1. user-interaction and visualisation for making a layer active
> > _see [issue 6](https://code.google.com/p/geoext-viewer/issues/detail?id=6)_
  1. zoom to layer extent
> > _see [issue 9](https://code.google.com/p/geoext-viewer/issues/detail?id=9)_
  1. active layer query interaction (GetFeatureInfo or WFS Query)
> > _see [issue 5](https://code.google.com/p/geoext-viewer/issues/detail?id=5)_
  1. WFS styling (with SLD within OpenLayers?
> > _OpenLayers has styling for vector layers (see esdin example)_
  1. Info panel: get info on theme
> > _see [issue 10](https://code.google.com/p/geoext-viewer/issues/detail?id=10) (tooltip with layerinfo)_
  1. variable Layer transparency e.g. with slider
> > _will be part of issue 12_
  1. printing (via MapFish PDF)
> > _see [issue 15](https://code.google.com/p/geoext-viewer/issues/detail?id=15)_
  1. configurable toolbar
> > _see [issue 13](https://code.google.com/p/geoext-viewer/issues/detail?id=13)_
  1. FeatureInfoPanel should support complex features (e.g. INSPIRE features)
  1. the "site" example should really become a new feature

# Examples #

  1. provide example with embedding in page

# Tasks #

  1. review overall architecture
  1. adding features to issue list
  1. release policy (release milestones with attached features)
  1. SVN branching/tagging policy
> > _we will start with version 0.1 working towards 1.0.0_
  1. documentation
  1. providing downloadable versions
  1. dealing with external libs (ExtJS, OpenLayers, GeoExt)
> > _these will for now be hosted on http://kademo.nl/lib_
  1. providing hosted versions (including external libs/resources)
> > _these will for now be hosted on http://kademo.nl/lib_
  1. hosting the examples
> > _these will for now be hosted on http://kademo.nl/lib/geoext-viewer/heron/examples_
  1. make others aware (e.g. Bart and GeoExt folks) of this project
> > _ok_
  1. investigate how to relate/contribute this to GeoExt project
> > _ok when we have useful components_
  1. invite others for this project ?

# Various #

  1. update/test to/with latest GeoExt version
> > _done, now at 0.7 hosted from http://kademo.nl/lib/geoext/0.7_
  1. is OpenLayers ready for GML 3.2.1 ? What is the issue ? Something we can do ?
> > _for now we will support GML 3.1.1_

