=== wePOS - Point Of Sale (POS) for WooCommerce ===
Contributors: tareq1988, wedevs, sabbir1991, nizamuddinbabu
Donate Link: http://tareq.co/donate/
Tags: WooCommerce POS, point of sale, free pos, pos plugin, woocommerce point of sale
Requires at least: 4.4
Tested up to: 5.3.2
WC requires at least: 3.0
WC tested up to: 3.8.1
Requires PHP: 5.6
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

WooCommerce point of sale WordPress plugin.

== Description ==

= WooCommerce Point of Sales (POS) =
wePOS is a fast and responsive( Tablets & Desktop ) WooCommerce Point of Sales plugin. It lets you take orders and track your inventory using your WooCommerce store. You can physically count your WooCommerce products by scanning Bar codes and add them directly to customer’s cart for processing the order.

= Based of REST API =
wePOS is a single page application that works super fast. We have used WooCommerce REST API and some custom API to develop the plugin. This has made the plugin to response fast and gets your work done in time. In a physical store, you get a lot of customers who wait to checkout their products. So, a fast system like wePoS can be your one-way ticket to manage your inventory easily.

= Attractive User Interface =
A good UI can sometimes makes a system even more attractive. wePOS has an intuitive design that allows navigating easily. With it, you can manage your inventory and orders in an organized way.

= Shortcut / Hotkey Support =
wePOS has shortcut key support that lets you use its features faster. This is very important for any physical store so that the sales executive can read the Barcodes and process the orders with pace.

= Privacy Policy =
wePOS uses [Appsero](https://appsero.com) SDK to collect some telemetry data upon user's confirmation. This helps us to troubleshoot problems faster & make product improvements.

Appsero SDK **does not gather any data by default.** The SDK only starts gathering basic telemetry data **when a user allows it via the admin notice**. We collect the data to ensure great user experience for all our users.

Integrating Appsero SDK **DOES NOT IMMEDIATELY** start gathering data, **without confirmation from users in any case.**

= Contribute =
This may have bugs and lack of many features. If you want to contribute on this project, you are more than welcome. Please fork the repository from [Github](https://github.com/weDevsOfficial/wepos).

= Author =
Brought to you by [weDevs](http://wedevs.com)

== Installation ==

Extract the zip file and just drop the contents in the wp-content/plugins/ directory of your WordPress installation and then activate the Plugin from Plugins page.

== Frequently Asked Questions ==
No FAQ

== Screenshots ==
1. Overview
2. Product Search and Barcode Scan
3. Product list view
4. Customer Search
5. Add New Customer
6. Add discount and fees
7. Payment Page
8. Payment Receipt Page
9. Admin Dashboard Settings

== Changelog ==

= v1.1.1 -> 23 December, 2019 =
----------------------------
- **Tweak**  Appser client updated

= v1.1.0 -> 09 December, 2019 =
----------------------------
- **Tweak**  Update some styling issues
- **Tweak**  Added appsero client
- **Fix**    Undefined customer_id error fixed

= v1.0.9 -> 25 September, 2019 =
----------------------------
- **Fix**   Tax calculation issue in pos cart
- **Fix**   Fee tax not calculated when manually added in pos cart

= v1.0.8 -> 22 August, 2019 =
----------------------------
- **Fix**   Variation REST api rendering issue
- **Fix**   Gateway class not loaded if WooCommerce deactivate

= v1.0.7 -> 26 July, 2019 =
----------------------------
- **Fix**   Category rendering issue fixed
- **Fix**   Thausand and decimal separetor issue fixed
- **Tweak** Add vuex support for better performance

= v1.0.6 -> 17 June, 2019 =
----------------------------
- **Fix**   Remove deleted product from saved cart items when product is already deleted
- **Fix**   Admin bar conflicted with dokan plugin fixed
- **Fix**   Translation issue fixed
- **Tweak** Added some filter and hooks for extends future functionalites

= v1.0.5 -> 17 May, 2019 =
----------------------------
- **Fix**   Customer not created if WooCommerce default `Automatic username and passowrd create` options is changed
- **Fix**   Customer creating and serching issue for Dokan vendors
- **Fix**   Stock level manage during cart and checkout process
- **Fix**   Tax not displaying when exclusive tax applied from WooCommerce settings
- **Tweak** Move product api endpoints to wepos custom endpoint
- **Tweak** Remove some unwanted code

= v1.0.4 -> 3 May, 2019 =
----------------------------
- **New**   Added extra column in order listing page for determining whether the order is POS order or not
- **Fix**   Cash gateway payment processing issues
- **Fix**   Customer not created if woocommerce default account creatation option is disabled
- **Tweak** Added updater class for changing some meta's
- **Tweak** Update some flaticons
- **Tweak** Added some core filters in js end for extending components

= v1.0.3 -> 8 April, 2019 =
----------------------------
- **Fix**   Undefined issue in admin settings page
- **Tweak** Remove some unwnated code
- **Tweak** Modal component load globally and add more customizable options
- **Tweak** Update some flaticons

= v1.0.2 -> 25 Mar, 2019 =
----------------------------
- **New**   Added billing address missing fields in customer create
- **New**   Added all category selection in category filter
- **New**   Add extra product info in product list view
- **New**   Add Dokan plugin support
- **Tweak** Change quick menu layout to popover
- **Tweak** Change routing and menu rendring system for future extends
- **Fix**   Case sensitive issue in product search
- **Fix**   Remove attributes for simple product in cart and payment page
- **Fix**   Cursor poiting issue in keypads and other buttons
- **Fix**   Fee and discount calculation issue large amount(Price) of products
- **Fix**   Tax and fee tax calculation problem for percentage fees
- **Fix**   Product thumbnail resolution issue
- **Fix**   Rounding problem in cash and change amount after payment

= v1.0.1 -> 4 Mar, 2019 =
----------------------------
- **Fix**    Product fetching issue when no products found
- **Fix**    Customer data not reset during empty cart or new sales
- **Fix**    Event bus not triggering properly
- **Fix**    Render only publishable product in pos system
- **Tweak**  Added wp hooks for load action and filters

= v1.0.0 -> 22 Feb, 2019 =
Initial version released

== Upgrade Notice ==
No upgrade notice