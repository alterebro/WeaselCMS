<?php 
header('Content-Type: text/html; charset=utf-8');

function CMS_DATA() {

	$cms_folder = 'weasel-cms/';
	require_once $cms_folder . 'parsedown.php';
	
	$_DATA = [];
	$_DATA['site'] = include $cms_folder . 'config.php';
	$_DATA['site']['path'] = dirname($_SERVER['PHP_SELF']);
	
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
			$db_slugs[] = $row['slug'];

			$_DATA['pages'][$key]['link'] = (in_array('mod_rewrite', apache_get_modules())) 
				? dirname($_SERVER['PHP_SELF']) .'/'. $row['slug'] . '.cms' // Match it with the .htaccess file
				: 'index.php?p=' . $row['slug'];

			unset($_DATA['pages'][$key]['order']);
			unset($_DATA['pages'][$key]['active']);
			unset($_DATA['pages'][$key]['timestamp']);

			$_DATA['pages'][$key]['timedate'] = date('Y.m.j H:i',$_DATA['pages'][$key]['timedate']);
			$_DATA['pages'][$key]['tags'] = implode(', ', $_DATA['pages'][$key]['tags']);
			$_DATA['pages'][$key]['content'] = Parsedown::instance()->text( $_DATA['pages'][$key]['content'] );
		}
	}
	array_multisort($items_datetime, SORT_DESC, $_DATA['pages']);

	// Get the current page data
	$_DATA['page'] = $_DATA['pages'][0];
	$_DATA['is_page'] = false;
	if ( !empty($_GET['p']) && in_array($_GET['p'], $db_slugs) ) {
		foreach ($_DATA['pages'] as $db_element) {
			if ( $_GET['p'] == $db_element['slug'] ) {
				$_DATA['page'] = $db_element;
				$_DATA['is_page'] = true;
				break;
			}
		}	
	}

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
	eval("?> $template <?php ");

}


$_CMS = CMS_DATA();
WeaselCMS($_CMS);


?>