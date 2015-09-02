# WeaselCMS

### Project Website: [http://weasel.moro.es](http://weasel.moro.es)

## Weasel. Lightweight flat file CMS written in PHP

<img src="http://weasel.moro.es/weasel.png" width="265" style="float: right; margin: 0 0 10px 20px;" />

Weasel CMS is an Open Source, very simple and lightweight Content Management System written in PHP and built specifically for small websites.

Easy to setup, Weasel CMS uses a flat file system (No database) so you just have to unzip and upload it to the server and you are all set to add content with its easy to use simplistic UI.

Weasel CMS is a very flexible CMS that can be easily used as a skeleton to build your small project up from.

- **Very Simple** : No clutter and confusion, a simplistic site editor and UI.
- **Mobile Friendly** : Weasel has a minimalist user interface that works nice on all devices.
- **No Database** : Weasel is a Flat file CMS, which means no database is behind it.
- **Open Source** : Weasel is free and open source, released under the MIT license.
- **Lightweight** : Full CMS weights like a JPG image and is built in a little bunch of files.
- **Easy Setup** : As straightforward as possible, just upload it and use it. No complicated configuration.
- **Markdown ready** : Easy editing of your page by using Markdown or HTML.
- **Custom theming** : Very easy to create new themes or modify the existing templates.


## Docs

### Requirements
To run Weasel CMS you only need `PHP >= 5.3` running on your server.
Apache `mod_rewrite` module enabled is recommended but not a requirement.


### Installation
1. Download the latest version of **Weasel CMS** from the GitHub repository : https://github.com/alterebro/WeaselCMS/releases/latest
2. Upload the files to your PHP Server
3. Change permissions to the following files to make them writable: `config.php`, `db.dat`
4. That's all, start using Weasel CMS.

Default installation user/pass pair is :

	user : weasel
	pass : weaselcms
	
You can change this login details on the `config.php` file


### Theming

Themes are located on the `/theme` folder and the main template file is the `ìndex.html` HTML file.
Variables are placed using the double curly bracket syntax `{{ $variable_name }}` i.e: in order to print the page title you'll put the folliwing code in the html template: `{{ $_CMS['page']['title'] }}`


#### Variables

All the elements that you can use when theming your website using Weasel CMS data are encapsulated in an array called `$_CMS`, this array has got the following variables within it.

- `$_CMS['site']` : 
	- `['site_language']` ISO 639-1 Language Code, usually the two letter identifier like: *EN*, *ES*, *FR* ... 
	- `['site_title']` : Returns the current weather in Beijing, China ... nah, it's actually the **Site Title**.
    - `['site_description']` : mainly for seo purposes
    - `['site_keywords']` : Same as above.
	- `['path]` : base directory ( `dirname($_SERVER['PHP_SELF'])` )

- `$_CMS['pages']` : Variable containing all the data of every page in case you want to loop over it. Each page contains the following properties described below on the `$_PAGE` variable.

- `$_CMS['page']` : 
	- `['title']` The page title
    - `['description']` Short description of the page
    - `['content']` This is stored as Markdown but it returns the parsed HTML code of the pages content
	- `['tags']` Comma separated tag values
    - `['timedate']` Returned by default in the form : YYYY.MM.DD HH:MM *( Date: Y.m.j H:i )*
	- `['link']` Returns the full url friendly link of the page in case `mod_rewite` exists on the Apache modules or the link with a url get variable in case it doesn't `?p=url-slug`
	- `['slug']` the slug defined on the admin area.

- `$_CMS['is_page']` : Boolean returns if it is a page or not ( *Useful to filter the index/home page* )
- `$_CMS['menu']` : Retuns an HTML unordered list with all the active pages linked to their pages. With an active class on the current element ( `class="active"` )


## Libraries used in Weasel CMS

- [PageDown Markdown Editor](https://github.com/timmyomahony/pagedown) The WMD Markdown Editor used in Stack Overflow.
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/) Awesome Icon Font
- [ParseDown](http://parsedown.org/) Markdown Parser in PHP


## Download
Get the latest release on the Weasel CMS GitHub repository : 
https://github.com/alterebro/WeaselCMS/releases/latest


## MIT Open Source License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


