<?php
if ( !defined('CMS_FOLDER') ) { header('Location: ../'); }

header('Content-Type: text/html; charset=utf-8');

function create_link($slug) {

	if (!$slug) { return dirname($_SERVER['PHP_SELF']); }

	// Detect rewrite module
	$rewrite_enabled = false;
	if (function_exists("apache_get_modules")) { $rewrite_enabled = ( in_array('mod_rewrite', apache_get_modules()) ); }
	else { $rewrite_enabled = ( isset($_SERVER['HTTP_MOD_REWRITE']) && $_SERVER['HTTP_MOD_REWRITE'] == 'on' ); }

	// Create the link
	$path_separator = (dirname($_SERVER['PHP_SELF']) == '/') ? '' : '/';
	$link = ($rewrite_enabled)
		? dirname($_SERVER['PHP_SELF']) . $path_separator . $slug . '.cms' // Match it with the .htaccess file
		: 'index.php?p=' . $slug;

	return $link;
}


function CMS_DATA() {

	$cms_folder = CMS_FOLDER;
	$cms_version = '0.3.5';
	require_once $cms_folder . 'lib/parsedown.php';

	$_DATA = [];
	$_DATA['version'] = $cms_version;
	$_DATA['site'] = include $cms_folder . 'config.php';
	$_DATA['site']['path'] = dirname($_SERVER['PHP_SELF']);

	$_DATA['site']['url'] = 'http://' . $_SERVER['HTTP_HOST'] . dirname( $_SERVER['PHP_SELF'] );
	$_DATA['site']['url'] .= (dirname($_SERVER['PHP_SELF']) == '/') ? '' : '/';

		unset($_DATA['site']['user']);
		unset($_DATA['site']['pass']);

	// Get all the existing data on to from the .dat file
	$db_data = file( $cms_folder . $_DATA['site']['db'], FILE_IGNORE_NEW_LINES);
	$_DATA['pages']= array();
	foreach ($db_data as $data_line) {
		$_DATA['pages'][] = json_decode($data_line, true);
	}

	// Order the data array by descending datetime, extract slugs and exclude inactive posts
	$db_slugs = array();
	$items_datetime = array();
	foreach ($_DATA['pages'] as $key => $row) {
		if ( empty($row['active']) ) {
			unset( $_DATA['pages'][$key] );
		} else {
		    $items_datetime[$key] = $row['timedate'];

			$_DATA['pages'][$key]['link'] = create_link($row['slug']);
			$_DATA['pages'][$key]['slug'] = $row['slug'];

			unset($_DATA['pages'][$key]['order']);
			unset($_DATA['pages'][$key]['active']);
			unset($_DATA['pages'][$key]['timestamp']);

			$td = $_DATA['pages'][$key]['timedate'];
			$_DATA['pages'][$key]['timedate'] = date('l jS \of F Y @ h:i A',$td);
			$_DATA['pages'][$key]['datetime'] = date('Y-m-d H:i:s',$td);

			$_DATA['pages'][$key]['tags'] = implode(', ', $_DATA['pages'][$key]['tags']);
			$_DATA['pages'][$key]['content'] = Parsedown::instance()->text( $_DATA['pages'][$key]['content'] );
		}
	}
	array_multisort($items_datetime, SORT_DESC, $_DATA['pages']);
	foreach ($_DATA['pages'] as $key => $value) {
		$db_slugs[] = $_DATA['pages'][$key]['slug'];
	}

	// Get the current page data
	$_DATA['page'] = $_DATA['pages'][0];
	$_DATA['is_page'] = false;

	$_page_iterator = 0;
	if ( !empty($_GET['p']) && in_array($_GET['p'], $db_slugs) ) {
		foreach ($_DATA['pages'] as $db_element) {
			if ( $_GET['p'] == $db_element['slug'] ) {
				$_DATA['page'] = $db_element;
				$_DATA['is_page'] = true;
				break;
			}
			$_page_iterator++;
		}
	}

	$_prev = ($_page_iterator == 0) ? false : $db_slugs[($_page_iterator-1)];
	$_next = ($_page_iterator == count($db_slugs)-1) ? false : $db_slugs[$_page_iterator+1];

	$_DATA['prev_page'] = create_link($_prev);
	$_DATA['next_page'] = create_link($_next);
	$_DATA['is_404'] = false;

	// Navigation Menu output
	$_DATA['menu'] = '<ul>';
	foreach ($_DATA['pages'] as $_PAGEITEM) {
		$current = ($_PAGEITEM['slug'] == $_DATA['page']['slug']) ? ' class="active"' : '';
		$_DATA['menu'] .= '<li'.$current.'>';
		$_DATA['menu'] .= '<a href="' . $_PAGEITEM['link'] .'" title="' . $_PAGEITEM['title'] . '">';
		$_DATA['menu'] .= $_PAGEITEM['title'] . '</a>';
		$_DATA['menu'] .= '</li>';
	}
	$_DATA['menu'] .= '</ul>';

	// Returns the parsed data
	return $_DATA;
}


function WeaselCMS($_CMS) {

	// Ugly and quick templating. Looking for a best way to implement this...
	$template = file_get_contents('theme/'.$_CMS['site']['theme'].'/index.html');
	$template = preg_replace('/{{ (.*?) }}/', '<?= $1; ?>', $template);

	// Minify output
	$minify_search = array('/\>[^\S ]+/s', '/[^\S ]+\</s', '/(\s)+/s');
	$minify_replace = array('>', '<', '\\1');
	$output = preg_replace($minify_search, $minify_replace, $template);
	eval("?> $output <?php ");

}


$xml_stuff = ['sitemap.xml', 'rss.xml'];
if ( !empty($_GET['e']) && in_array($_GET['e'], $xml_stuff) ) {

	$_CMS = CMS_DATA();
	include 'weasel-cms/' . $_GET['e'] . '.php';

} elseif ( !empty($_GET['e']) ) {

	header("HTTP/1.0 404 Not Found");
	$res = htmlspecialchars(filter_var($_GET['e'], FILTER_SANITIZE_URL), ENT_QUOTES, 'utf-8');
	$msg = "<pre><code>resource: <strong>".dirname($_SERVER['PHP_SELF'])."/".$res."</strong> not found :(</code></pre>";
	$msg .= "<ul>";
	$msg .= "<li>We are sorry but the page you are looking for has not been found.</li>";
	$msg .= "<li>That is probably because it doesn't exist anymore or maybe it has just moved somewhere else.</li>";
	$msg .= "<li>Try checking the URL for errors, or you can always go to the amazing <a href='".dirname($_SERVER['PHP_SELF'])."'>Homepage</a>!</li>";
	$msg .= "</ul>";

	$_CMS = CMS_DATA();

		unset( $_CMS['pages'] );
		$_CMS['page'] = array(
			'title' => 'Error 404. Not Found',
			'description' => 'The requested resource is not available',
			'content' => $msg,
			'slug' => false,
			'tags' => '404 Not Found',
			'timedate' => date('l jS \of F Y @ h:i A'),
			'datetime' => date('Y-m-d H:i:s'),
			'link' => dirname($_SERVER['PHP_SELF']),
		);
		$_CMS['prev_page'] = dirname($_SERVER['PHP_SELF']);
		$_CMS['next_page'] = dirname($_SERVER['PHP_SELF']);
		$_CMS['is_404'] = true;

	WeaselCMS($_CMS);
	die();

} else {

	$_CMS = CMS_DATA();
	WeaselCMS($_CMS);

}
