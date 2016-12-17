# angular-webpack-seed
This is a seed project for Angular 1.5+ using Webpack and Bootstrap

So I have built many Angular apps using Bower, and I am fairly new to Webpack. I wanted to remove Bower Components and bundle my app using Webpack into a an app bundle and a vendor bundle. Bundling Angular was fairly simple, but bundling Bootstrap was much more complex. The only examples I found were using ES6, and my apps are still on ES5. I pieced together several examples until I made it work.

Application Stack:

* Angular 1.5+
* Javascript 5
* Webpack 2.x
* Bootstrap 3.x
* httpserver (for dev testing)

Scripts:

* build - creates the bundled JS/HTML/CSS for the application in the target directory
* start - starts the application for dev on localhost:8000

# How to Structure App for Webpack

It requires a few minor tweaks to support the Webpack build. Normally, a Webpack build 
starts from the top level source and traverses to find all the code. But with
an Angular application, the top level source is the application module with only Angular
specific text references to the feature modules. 

## Application Module

We make these modifications to the application module:

* Add require method calls to the feature modules to make Webpack traverse the next levels
of application code
* Add require method calls for the CSS to insert the styles

```
(function() {
  'use strict';

  angular.module('app', [
    'app.home',
    'app.layout'
  ]);

  require('bootstrap/dist/css/bootstrap.css');
  require('./app.css');

  require('./home/home.module.js');
  require('./layout/layout.module.js');

})();
```
## Feature Modules

The main application module required the feature module. Now the feature module must require
each component and supporting script of the module.

### Layout Feature Module

```
(function() {
  'use strict';

  angular
    .module('app.layout',[]);

  require('./layout.component.js');

})();
```

### Home Feature Module

```
(function() {
  'use strict';

  angular
    .module('app.home', []);

  require('./home.component.js');

})();
```

## Feature Components

The build is configured to load the view templates into the application javascript (app.js).
So instead of referencing the view templates, the component "requires" the template.

### Layout Feature Component

```
(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('layout', {
      template: require('./layout.view.html'),
      controller: LayoutController,
      controllerAs: 'vm'
    });

  function LayoutController() {
    var vm = this;

    vm.title = 'Der Samen';

  }

})();
```

### Home Feature Component

```
(function() {
  'use strict';

  angular
    .module('app.home')
    .component('home', {
      template: require('./home.view.html'),
      controller: HomeController,
      controllerAs: 'vm'
    });

  function HomeController() {
    var vm = this;

    vm.title = 'Home';

    vm.$onInit = function() {
      console.log('app.home.oninit');
    };

  }

})();
```
