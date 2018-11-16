# vuecid-nuxt

> Vuecid Nuxt Stack with Nuxt.js [vuecid-nuxt.lucid.build](https://vuecid-nuxt.lucid.build)

## Build Setup

``` bash
# Install dependencies
$ yarn

# Serve with hot reload at localhost:3000
$ yarn dev

# Build for production and launch server
$ yarn build
$ yarn start

# Generate static project
$ yarn generate

# Pretend we are Netlify (exept ./static/_redirects)
# Requires globally installed serve
$ yarn global add serve
$ yarn netlifyify

# Analyze bundle
$ yarn build --analyze
```

Search for TODO's inside the project to get everything setup nicely for your new website.
For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Content
The plugin «[API Fetcher](https://github.com/wearelucid/api-fetcher)» can fetch the data from WordPress
``` bash
# Fetch data
$ yarn fetch
```

## Scaffolding
Components and store modules can be scaffolded
``` bash
# scaffold component or store module
$ yarn scaffold
```

## Typography
By experience it is safe to say, that having a predefined typography specification before starting a project, will help you keeping your page consistent and makes it simpler to maintain scss typography mixins and rules.
Have a look at this example:
Typo-Specification Desktop:

<img src="/readme/typospecs.png" width="300">

Typo-Specification Mobile:

<img src="/readme/typospecs-mobile.png" width="300">

As a starting point you can use this [template sketch file](https://www.dropbox.com/s/ejcyy1i2ejpl9g0/Template%20Typospecs%20v1-0.sketch?dl=0).

### @fontface
When including font-files, there is a **known bug**:
We have to include the first fontfile twice, otherwise it will not be available for the webpage. 🤷‍♂️



## SCSS Guidelines
To write consistent scss-code `sass-lint` does the work for us and lints all our scss files. To get this to work it's best u use the [atom editor](https://atom.io/) and make sure your project includes the `sass-lint` npm package.

### Mixins/Functions
Mixins and functions should always be written in hyphenated lowercase. No uppercase characters, no underscores.

_Bad_
``` scss
@mixin myMixin ()
@mixin my_mixin ()
```
_Good_
``` scss
@mixin my-mixin ()
```

### Variables
Variables should always be written in hyphenated lowercase. No uppercase characters, no underscores.

_Bad_
``` scss
$myVar: xx;
$my_Var: xx;
$my_var: xx;
$Myvar: xx;
$myvar--double-dash: xx;
```
_Good_
``` scss
$c-my-component-var
$s-my-settingss-var
$from
$to
```

### Selectors
Most important is our selector naming convention. We follow the [BEM](http://getbem.com/) **B** lock **E** lement **M** odifier methodology.

Our _Block_ is always the vue components name, written in PascalCase.
`MyComponent`
An element is always written in hyphenated lowercase starting with two underscroes:
`__item-longer-name`
A modifier is always written in hyphenated lowercase starting with two dashes:
`--modifier-name`

### Nesting components > Classnames
When using a component inside another component which requires specific styling it would be best to add a modifier (like `--custom-styling` below) to the nested component and style it within the component. To indicate nested components, always add a class expressing this:
```
<MyWrappingComponent class="MyWrappingComponent">
  <div class="MyWrappingComponent__box"
    <MyNestedComponent class="MyWrappingComponent__MyNestedComponent MyNestedComponent--custom-styling"/>
  </div>
</MyWrappingComponent>
```

If this is not feasible use the added class `MyWrappingComponent__MyNestedComponent` to style it in the wrapping components scss:

``` scss
$c: 'MyWrappingComponent';

.#{$c} {
  &__wrapper {
    &.#{$c}__MyNestedComponent {
    // extra styling here
  }
}
```
This is necessary because of specificity. Sometimes styling `MyWrappingComponent__MyNestedComponent {}` would not override the `MyNestedComponent`s rules.


### Sass Linting
The linter tries to check these rules but unfortunately it cannot lint nested scss-rules.

Therefore
```
.Component {
  &__itemName {
  }
}
```
will evaluate correctly, although we don't allow camelCase in css-selectors except for the first part (component name). So please just make sure to follow the rules above.

#### Sass Linting rules
To change the sass linter rules edit the `scss-lint.yml` file (which has no effect) and after editing convert to a `sass-lint.yml` file using this [Sasstools-Converter](https://sasstools.github.io/make-sass-lint-config/).

### Important mixins

#### set-gutter()
It would be tempting to define page-gutter, max-width and padding on the layout or main content wrapper. But in most cases the page will include some full-width components (like a big header-image, or a full-width gallery). That's why we decided to set the gutter on the component itself.
For this use the mixin `set-gutter('size')`.
Check the [_tools.mixins.scss](https://github.com/wearelucid/vuecid-nuxt/blob/master/assets/css/_tools.mixins.scss) file for more information.
One size should be defined for texts (paragraph) to guarantee good typography. (We don't want more than 50-70 characters per line!) This size is calculated from the standard font-size and is currently use by `set-gutter('small')`.

#### Resets
There are a couple of useful reset-mixins.

#### ARIA Tab focus
To make your page tab accessible use the mixin `hocus-focus()`.

## Logging
This project makes use of a customized [bows](https://github.com/wearelucid/bows) logger. To use it via this.log('Hello Lucid') you must enable it in your browsers console: Type localStorage.debug = true in your browser's console to activate it. The big advantage of this is, that even on production level you can still access logs.
