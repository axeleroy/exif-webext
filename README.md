<img align="left" alt="Add-on logo" src="addon/icons/icon.svg">

**A Firefox add-on to display pictures' metadata**

## Features

Right-click on any picture to display its metadata in the sidebar.

Metadata can include information on the camera, its settings, the GPS location, its modification history and much more.

<img align="left" alt="Context menu" src="https://user-images.githubusercontent.com/3141536/80819363-20a1f000-8bd5-11ea-827b-4d88f96cdd7b.png">
<img alt="Sidebar" src="https://user-images.githubusercontent.com/3141536/80819721-d40ae480-8bd5-11ea-9e08-a59b54321247.png">

_(Pictures courtesy of [exif.org](http://www.exif.org/) via [ianare/exif-samples](https://github.com/ianare/exif-samples))_

## Installation / Download

Prefered way is through https://addons.mozilla.org/en-US/firefox/addon/display-picture-meta-data/

You can also install it manually from the [releases](https://github.com/axeleroy/exif-webext/releases).

## Building the add-on

Because [sidebar.js](sidebar/sidebar.js) depends on [exifr](https://github.com/MikeKovarik/exifr)
and [handlebars](https://handlebarsjs.com), Webpack is used to build part of the addon:

Run `npm install` to install dependencies, run `npm run build` to build.

Then you can package the content of the [addon](addon) folder or load [manifest.json](addon/manifest.json)
to [temporarily install the add-on](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

## License
MIT, Copyright (c) 2020 Axel Leroy
