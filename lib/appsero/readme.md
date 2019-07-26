# Appsero - Client

- [Installation](#installation)
- [Insights](#insights)


## Installation

You can install AppSero Client in two ways, via composer and manually.

### 1. Composer Installation

Add dependency in your project (theme/plugin):

```
composer require appsero/client
```

Now add `autoload.php` in your file if you haven't done already.

```php
require __DIR__ . '/vendor/autoload.php';
```

### 2. Manual Installation

Clone the repository in your project.

```
cd /path/to/your/project/folder
git clone https://github.com/AppSero/client.git appsero
```

Now include the dependencies in your plugin/theme.

```php
require __DIR__ . '/appsero/src/Client.php';
```

## Insights

AppSero can be used in both themes and plugins.

The `Appsero\Client` class has *three* parameters:

```php
$client = new Appsero\Client( $hash, $name, $file );
```

- **hash** (*string*, *required*) - The unique identifier for a plugin or theme.
- **name** (*string*, *required*) - The name of the plugin or theme.
- **file** (*string*, *required*) - The **main file** path of the plugin. For theme, path to `functions.php`

### Usage Example

Please refer to the **installation** step before start using the class.

You can obtain the **hash** for your plugin for the [AppSero Dashboard](https://dashboard.appsero.com). The 3rd parameter **must** have to be the main file of the plugin.

```php
/**
 * Initialize the tracker
 *
 * @return void
 */
function appsero_init_tracker_appsero_test() {

    if ( ! class_exists( 'Appsero\Client' ) ) {
        require_once __DIR__ . '/appsero/src/Client.php';
    }

    $client = new Appsero\Client( 'a4a8da5b-b419-4656-98e9-4a42e9044891', 'Akismet', __FILE__ );

    // Active insights
    $client->insights()->init();

    // Active automatic updater
    $client->updater();

    // Active license page and checker
    $args = array(
        'type'       => 'options',
        'menu_title' => 'Akismet',
        'page_title' => 'Akismet License Settings',
        'menu_slug'  => 'akismet_settings',
    );
    $client->license()->add_settings_page( $args );
}

appsero_init_tracker_appsero_test();
```

> For plugins example code that needs to be used on your main plugin file.
> For themes example code that needs to be used on your themes `functions.php` file.

## More Usage

Sometimes you wouldn't want to show the notice, or want to customize the notice message. You can do that as well.

```php
$client = new Appsero\Client( 'a4a8da5b-b419-4656-98e9-4a42e9044892', 'Twenty Twelve', __FILE__ );
```

#### 1. Hiding the notice

```php
$client->insights()
       ->hide_notice()
       ->init();
```

#### 2. Customizing the notice message

```php
$client->insights()
       ->notice( 'My Custom Notice Message' )
       ->init();
```

#### 3. Adding extra data

You can add extra metadata from your theme or plugin. In that case, the **keys** has to be whitelisted from the AppSero dashboard.

```php
$metadata = array(
    'key'     => 'value',
    'another' => 'another_value'
);
$client->insights()
       ->add_extra( $metadata )
       ->init();
```

---

### Dynamic Usage

In some cases you wouldn't want to show the optin message, but forcefully opt-in the user and send tracking data.

```php
$client = new Appsero\Client( 'a4a8da5b-b419-4656-98e9-4a42e9044892', 'Twenty Twelve', __FILE__ );

$insights = $client->insights();
$insights->hide_notice()->init();

// somewhere in your code, opt-in the user forcefully
// execute this only once
$insights->optin();
```

Check your plugin/theme is using with valid license or not, First create a global variable of `License` object then use it anywhere in your code.
If you are using it outside of same function make sure you global the variable before using the condition.

```php
$client = new Appsero\Client( 'a4a8da5b-b419-4656-98e9-4a42e9044892', 'Twenty Twelve', __FILE__ );

$args = array(
    'type'        => 'submenu',
    'menu_title'  => 'Twenty Twelve License',
    'page_title'  => 'Twenty Twelve License Settings',
    'menu_slug'   => 'twenty_twelve_settings',
    'parent_slug' => 'themes.php',
);

global $twenty_twelve_license;
$twenty_twelve_license = $client->license();
$twenty_twelve_license->add_settings_page( $args );

if ( $twenty_twelve_license->is_valid()  ) {
    // Your special code here
}
```

## Credits

Created and maintained by [Appsero](https://appsero.com).
