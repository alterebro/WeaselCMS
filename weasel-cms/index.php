<?php
session_start();
header('Content-Type: text/html; charset=utf-8');

// ------------------
// Utils:
// -- Slugify (https://gist.github.com/craiga/2716157)
function slugify($s) {
	$s = iconv(mb_detect_encoding($s), "ascii//TRANSLIT//IGNORE", $s); // transliterate to ASCII
	$s = preg_replace("/['^]/", "", $s); // remove accents
	$s = preg_replace("/[^a-zA-Z0-9]/", "-", $s); // replace non-word characters
	$s = preg_replace("/\-+/", "-", $s); // remove double-hyphens
	$s = trim($s, "-"); // remove start and end hyphens
	$s = strtolower($s); // lowercase
	return $s;
}

// -- Simple Flash Message
function set_message($str, $warning = false) {
	$_SESSION['message'] = array(
		'string' => $str,
		'warning' => $warning
	);
}
function get_message() {
	$output = false;
	if ( isset($_SESSION['message']) ) {
		$output = $_SESSION['message'];
	}
	unset( $_SESSION['message'] );
	return $output;
}
// ------------------


// Get the config file.
$_c = include 'config.php';

// Get all the existing data on the db file.
$db_data = file($_c['db'], FILE_IGNORE_NEW_LINES);
$db = array();
foreach ($db_data as $data_line) {
	$db[] = json_decode($data_line, true);
}

// Order db by datetime descending and extract the slugs.
$db_slugs = array();
$items_datetime = array();
foreach ($db as $key => $row) {
    $items_datetime[$key] = $row['timedate'];
	$db_slugs[] = $row['slug'];
}
array_multisort($items_datetime, SORT_DESC, $db);


// Initialize and get the url variables.
$allowed_blocks = array('pages', 'files');
$allowed_actions = array('new', 'edit', 'logout', 'remove'); // actions on GET
$allowed_pages = $db_slugs;

$_v['block'] 	= ( isset($_GET['b']) && in_array($_GET['b'], $allowed_blocks) ) ? $_GET['b'] : false; 		// url for 'b' : pages | files | false
$_v['action'] 	= ( isset($_GET['a']) && in_array($_GET['a'], $allowed_actions) ) ? $_GET['a'] : false; 	// url for 'a' : new | edit | logout | remove | false
$_v['page'] 	= ( isset($_GET['p']) && in_array($_GET['p'], $allowed_pages) ) ? $_GET['p'] : false; 		// url for 'p' : slug | false
$_v['logged'] 	= ( isset($_SESSION['logged']) && $_SESSION['logged'] == true ) ? true : false;

// Auth check. Post login
if ( empty($_SESSION['logged']) ) {

	if (
		(isset($_POST['login-user']) && $_POST['login-user'] == $_c['user']) &&
		(isset($_POST['login-pass']) && $_POST['login-pass'] == $_c['pass'])
	) {
		$_SESSION['logged'] = true;
		header( 'Location: ' . $_SERVER['PHP_SELF'] );

	} elseif(isset($_POST['login-user']) || isset($_POST['login-pass'])) {

		set_message('Wrong user/pass', true);
	}
}

// Logout check.
if ( $_v['action'] == 'logout' ) {

	if ( isset($_SESSION['logged']) && $_SESSION['logged'] == true ) {

		$_SESSION['logged'] = false;
		unset($_SESSION['logged']);

		set_message('Logged out successfully');
		header( 'Location: ' . $_SERVER['PHP_SELF'] );
		exit();
	}
}

// Check for removing files.
if ( $_v['block'] == 'files' && $_v['action'] == 'remove' && isset($_GET['file']) ) {
	$the_file = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . $_c['files_folder']) . DIRECTORY_SEPARATOR . $_GET['file'];
	if ( file_exists($the_file) ) {
		unlink($the_file);
	}

	set_message('File removed successfully');
	header( 'Location: ' . $_SERVER['PHP_SELF'] . '?b=files' );
	exit();
}


// -----------------
// POST
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

	// -- Check for changes on the Settings.
	if ( isset($_POST['settings-submit']) ) {

		$_c['site_language'] = $_POST["site-language"];
		$_c['site_title'] = $_POST["site-title"];
		$_c['site_description'] = $_POST["site-description"];
		$_c['site_keywords'] = $_POST["site-keywords"];
		$_c['theme'] = $_POST["site-theme"];
		file_put_contents('config.php', '<?php return ' . var_export($_c, true) . ';');

		set_message('Settings Changed');
		header( 'Location: ' . $_SERVER['PHP_SELF'] );
		exit();

	} // --

	// -- Check for new page creation
	if ( isset($_POST['page-action']) && $_POST['page-action'] == 'create' ) {

		$error = array();
		$data = array();

		$data['title'] = $_POST['page-title'];
		$data['content'] = $_POST['page-content'];

		$data['timestamp'] = time();
		$data['timedate'] = strtotime( $_POST['page-date'] . ' ' . $_POST['page-time']);
		$data['order'] = count($db);
		$data['slug'] = slugify($_POST['page-slug']);
		$data['description'] = $_POST['page-description'];

		$tags = $_POST['page-tags'];
		$tags = explode(',', $tags);
		$tags = array_map('trim', $tags);

		$data['tags'] = $tags;
		$data['active'] = ( !empty($_POST['page-active']) ) ? true : false;

		// Error Check : check if slug already exists before storing the data.
		if ( in_array($data['slug'], $db_slugs) ) {	$error[] = 'Slug already exists'; }

		// Error check : check if slug is empty
		if ( empty($data['slug']) ) { $error[] = 'Empty slug'; }

		// -----------------
		// No error found?
		if ( empty($error) ) {

			$data = json_encode( $data );
			file_put_contents($_c['db'], $data . PHP_EOL , FILE_APPEND);

			set_message('Page Created');
			header( 'Location: ' . $_SERVER['PHP_SELF'] );
			exit();

		} else {

			// Notify error
			set_message('ERROR: Page NOT CREATED, ' . implode(', ', $error), true);
			header( 'Location: ' . $_SERVER['PHP_SELF'] );
			exit();
		}
	} // --

	// -- Check for edit page
	if ( isset($_POST['page-action']) && $_POST['page-action'] == 'edit' ) {

		$db_buffer = array();
		$db_buffer_slugs = array();
		foreach ($db as $db_item) {
			if ( $db_item['timestamp'] != $_POST['page-timestamp'] ) {
				$db_buffer[] = $db_item;
				$db_buffer_slugs[] = $db_item['slug'];
			} else {
				$editable_item = $db_item;
			}
		}

		$error = array();
		$data = array();

		$data['title'] = $_POST['page-title'];
		$data['content'] = $_POST['page-content'];

		$data['timestamp'] = $_POST['page-timestamp'];
		$data['timedate'] = strtotime( $_POST['page-date'] . ' ' . $_POST['page-time']);
		$data['order'] = count($db);
		$data['slug'] = slugify($_POST['page-slug']);
		$data['description'] = $_POST['page-description'];

		$tags = $_POST['page-tags'];
		$tags = explode(',', $tags);
		$tags = array_map('trim', $tags);

		$data['tags'] = $tags;
		$data['active'] = ( !empty($_POST['page-active']) ) ? true : false;

		// Error Check : check if slug already exists before storing the data.
		if ( in_array($data['slug'], $db_buffer_slugs) ) { 	$error[] = 'Slug already exists'; }

		// check if slug is empty
		if ( empty($data['slug']) ) { $error[] = 'Empty slug'; }

		// -----------------
		// No error?
		if ( empty($error) ) {

			$output = '';
			foreach ($db_buffer as $db_buffer_item) {
				$output .= json_encode( $db_buffer_item ) . PHP_EOL;
			}
			$output .= json_encode( $data ) . PHP_EOL;
			file_put_contents($_c['db'], $output , LOCK_EX);

			set_message('Page edited successfully');
			header( 'Location: ' . $_SERVER['PHP_SELF'] );
			exit();

		} else {

			// Notify error
			set_message('ERROR: Page NOT EDITED, ' . implode(', ', $error), true);
			header( 'Location: ' . $_SERVER['PHP_SELF'] );
			exit();
		}
	} // --

	// -- Check for remove page
	if ( isset($_POST['page-action']) && $_POST['page-action'] == 'remove' ) {

		$output = '';
		foreach ($db as $db_item) {
			if ( $db_item['timestamp'] != $_POST['page-timestamp'] ) {
				$output .= json_encode( $db_item ) . PHP_EOL;
			}
		}
		file_put_contents($_c['db'], $output , LOCK_EX);

		set_message('Page Removed');
		header( 'Location: ' . $_SERVER['PHP_SELF'] );
		exit();
	} // --


	// -- Check for new fileupload.
	if ( isset($_POST['fileupload-submit'])
			&& isset($_FILES['fileupload-file'])
			&& $_FILES['fileupload-file']['error'] == 0
		) {

		require_once 'lib/upload.php';
		$root_folder = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . $_c['files_folder']);
		$upload = Upload::factory( '', $root_folder );
		$upload->file($_FILES['fileupload-file']);
		$upload->set_max_file_size(2);
		$upload->set_allowed_mime_types(array("image/jpeg", "image/png", "image/gif", 
                                          "application/msword", "application/pdf", "application/rtf",
                                          "application/x-rar-compressed", "application/zip"
                                          ));
		$upload->set_filename($_FILES['fileupload-file']['name']);
		$upload_output = $upload->upload();
		$upload_error = $upload->get_errors();

		if ( empty($upload_error) ) {
			set_message('File uploaded');
		} else {
			set_message('Error uploading file: <br /> &bull; ' . implode('<br /> &bull; ', $upload_error), true);
		}
		header( 'Location: ' . $_SERVER['PHP_SELF'] . '?b=files' );
		exit();

	} // --

}
?><!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>Weasel CMS</title>
	<meta name="author" content="Jorge Moreno aka Moro (@alterebro). http://moro.es" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />
	<meta name="HandheldFriendly" content="True" />
	<meta name="MobileOptimized" content="320" />
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Merriweather+Sans:700|Muli:300,400|Inconsolata:400" />
	<link rel="stylesheet" type="text/css" href="styles/weasel-cms.css" />
</head>
<body>

<header>
	<h1>Weasel CMS</h1>
	<?php if ( $_v['logged'] ) : ?>
	<nav>
		<ul>
			<li><a href="<?php echo $_SERVER['PHP_SELF']; ?>"><i class="fa fa-bars fa-fw"></i> <span>Dashboard</span></a></li>
			<li><a href="<?php echo $_SERVER['PHP_SELF']; ?>?b=pages&amp;a=new"><i class="fa fa-file-text-o fa-fw"></i> <span>Create a new page</span></a></li>
			<li><a href="<?php echo $_SERVER['PHP_SELF']; ?>?b=files"><i class="fa fa-upload fa-fw"></i> <span>Files</span></a></li>
			<li><a href="?a=logout"><i class="fa fa-sign-out fa-fw"></i> <span>Log out</span></a></li>
		</ul>
	</nav>
	<?php endif; ?>
	<hr />
</header>

<main>

<?php $msg = get_message(); if ( !empty($msg) ) : ?>
	<div id="message" class="<?php echo ($msg['warning']) ? 'warning' : 'notice' ?>">
		<?php echo ($msg['warning']) ? '<i class="fa fa-exclamation-triangle fa-fw"></i>' : '<i class="fa fa-check fa-fw"></i>' ?>
		<?php echo $msg['string']; ?>
	</div>
<?php endif; ?>


<?php if ( !$_v['logged'] ) : ?>
<?php // LOGIN -------------- ?>


	<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="row">
		<div class="column-one-third shift-one-third">
			<h2><i class="fa fa-sign-in fa-fw"></i> Log in</h2>
			<p>
				<label for="login-user">
					<span><i class="fa fa-user fa-fw"></i> Username</span>
					<input type="text" name="login-user" id="login-user" placeholder="Your Username" />
				</label>
			</p>
			<p>
				<label for="login-pass">
					<span><i class="fa fa-unlock-alt fa-fw"></i> Password</span>
					<input type="password" name="login-pass" id="login-pass" placeholder="Your Password" />
				</label>
			</p>
			<p>
				<input type="submit" value="Log In" name="login-submit" class="button-main" id="login-submit" />
			</p>
		</div>
	</form>

<?php else : ?>
<?php // CMS ---------------- ?>

	<?php if ( ($_v['block']) == 'pages' ) : ?>
	<?php // PAGES ------------------------- ?>
	<?php
		// Default values when creating a new page.
		$the_action = 'create';
		$the_title = '';
		$the_content = '';
		$the_date = date("Y-m-d");
		$the_time = date("H:i");
		$the_slug = '';
		$the_tags = '';
		$the_description = '';
		$the_status = 'checked="checked" ';
		$the_timestamp = false;
		$the_label = 'Create New Page';


		// Get current item when editing
		if ( ($_v['action'] == 'edit') && !empty($_v['page']) ) {

			foreach ($db as $db_item) {
				if ( $db_item['slug'] == $_v['page'] ) {
					$db_current = $db_item;
				}
			}

			$the_action = 'edit';
			$the_title = $db_current['title'];
			$the_content = $db_current['content'];
			$the_date = date("Y-m-d", $db_current['timedate']);
			$the_time = date("H:i", $db_current['timedate']);
			$the_slug = $db_current['slug'];
			$the_tags = implode(', ', $db_current['tags']);
			$the_description = $db_current['description'];
			$the_status = ($db_current['active']) ? 'checked="checked" ' : '';
			$the_timestamp = $db_current['timestamp'];
			$the_label = 'Edit Page';
		}
	?>

		<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="row">

			<section class="column-two-thirds">
				<h2><i class="fa fa-files-o fa-fw"></i> <?php echo $the_label; ?></h2>

				<input type="hidden" name="page-action" value="<?php echo $the_action; ?>" >
				<?php if (!empty($the_timestamp)) : ?>
				<input type="hidden" name="page-timestamp" value="<?php echo $the_timestamp ?>" />
				<?php endif; ?>
				<p>
					<label for="page-title">
						<span><i class="fa fa-font fa-fw"></i> Title</span>
						<input type="text" name="page-title" id="page-title" value="<?php echo $the_title; ?>" required="required" class="full-width max-full-width" placeholder="The title of your page." />
					</label>
				</p>

				<p class="no-margin">
					<label for="page-content" class="no-margin">
						<span><i class="fa fa-file-code-o fa-fw"></i> Page Content <small>( MarkDown / HTML Code )</small></span>

						<div class="wmd-panel">
				            <div id="wmd-button-bar"></div>
				            <textarea name="page-content" id="wmd-input" rows="10" cols="80" class="full-width max-full-width page-content"><?php echo $the_content; ?></textarea>
				        </div>
					</label>
				</p>

				<p class="no-margin">
			        <label class="no-margin">
			        	<span><i class="fa fa-file-text-o fa-fw"></i> Page Content Preview</span>
				        <div id="wmd-preview" class="wmd-panel wmd-preview markdown-body"></div>
			        </label>
				</p>
			</section>

			<section class="column-one-third sidebar">
				<h2><i class="fa fa-wrench fa-fw"></i> Page Properties</h2>
				<p>
					<label for="page-date">
						<span><i class="fa fa-calendar-o fa-fw"></i> Date</span>
						<input type="date" name="page-date" id="page-date" value="<?php echo $the_date; ?>" required="required" />
					</label>
				</p>
				<p>
					<label for="page-time">
						<span><i class="fa fa-clock-o fa-fw"></i> Time</span>
						<input type="time" name="page-time" id="page-time" value="<?php echo $the_time; ?>" required="required" />
					</label>
				</p>

				<p>
					<label for="page-slug">
						<span><i class="fa fa-link fa-fw"></i> Slug <small>( URL friendly name of your page )</small></span>
						<input type="text" name="page-slug" id="page-slug" value="<?php echo $the_slug; ?>" required="required" placeholder="url-friendly-page-name" />
					</label>
				</p>
				<p>
					<label for="page-tags">
						<span><i class="fa fa-tags fa-fw"></i> Tags <small>( Comma separated values )</small></span>
						<input type="text" name="page-tags" id="page-tags" value="<?php echo $the_tags; ?>" placeholder="tag-1, tag-2, tag-3" />
					</label>
				</p>
				<p>
					<label for="page-description">
						<span><i class="fa fa-align-left fa-fw"></i> Short Description</span>
						<textarea name="page-description" id="page-description" rows="10" cols="40" placeholder="Small description of your page"><?php echo $the_description; ?></textarea>
					</label>
				</p>
				<p>
					<label for="page-active">
						<input type="checkbox" name="page-active" id="page-active" <?php echo $the_status; ?>/>
						Status (Published)
					</label>
				</p>

				<p>
					<input type="submit" name="page-submit" class="button-main" value="<?php echo $the_label; ?>" />
				</p>
			</section>
		</form>

		<?php if (!empty($the_timestamp)) : ?>

			<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>" id="page-remove-form" class="column-one-third shift-two-thirds sidebar">
				<input type="hidden" name="page-action" value="remove" />
				<input type="hidden" name="page-timestamp" value="<?php echo $the_timestamp ?>" />
				<input type="submit" name="page-remove" id="page-remove" class="remove-button" value="Remove Page" />
			</form>

		<?php endif; ?>

	<?php elseif ( ($_v['block']) == 'files' ) : ?>
	<?php // FILES ------------------------- ?>
	<?php
		$uploaded_files = glob($_c['files_folder'] . '/*');
		usort($uploaded_files, function($a, $b) {
		    return filemtime($a) < filemtime($b);
		});
		$files_dir = $uploaded_files;
		// $files_dir = array_diff(scandir($_c['files_folder']), array('..', '.', '.DS_Store'));
	?>

		<div class="row">

			<section class="column-two-thirds">
				<h2><i class="fa fa-file-image-o fa-fw"></i> Uploaded Files</h2>
				<?php if(empty($files_dir)) : ?>
					<p><i class="fa fa-exclamation-triangle"></i> No files uploaded.</p>
				<?php else : ?>
					<table>
						<thead>
							<tr>
								<th><i class="fa fa-file-o fa-fw"></i> File Name</th>
								<th class="align-right"><i class="fa fa-calendar fa-fw"></i> Created on</th>
								<th class="align-right"><i class="fa fa-trash fa-fw"></i> Remove File</th>
							</tr>
						</thead>
						<tbody>
							<?php foreach($files_dir as $file) : ?>
							<tr>
								<td><i class="fa fa-image fa-fw"></i> <a href="<?php echo $_c['files_folder'] . DIRECTORY_SEPARATOR . $file; ?>"><?php echo basename($file); ?></td>
								<td class="align-right"><i class="fa fa-clock-o fa-fw"></i> <?php echo date ("y-m-d @H:i:s", filemtime($_c['files_folder'] . DIRECTORY_SEPARATOR . $file)); ?></td>
								<td class="align-right"><a href="<?php echo $_SERVER['PHP_SELF'] . '?b=files&a=remove&file=' . basename($file); ?>" class="remove-file-button"><i class="fa fa-trash fa-fw"></i> Delete</a></td>
							</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
				<?php endif; ?>
			</section>

			<section class="column-one-third sidebar">
				<h2><i class="fa fa-upload fa-fw"></i> Upload new File</h2>
				<p>
					Only .jpg, .gif and .png image files are allowed.
          <br/>Only .doc, .docx, .rtf and .pdf document files are allowed.
          <br/>Only .zip and .rar archive files are allowed.
					<br />Maximum file size is 2Mb.
				</p>

				<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data">
					<p><input type="file" name="fileupload-file" /></p>
					<p><input type="submit" name="fileupload-submit" class="button-main" value="Upload!" /></p>
				</form>
			</section>

		</div>

	<?php else : ?>
	<?php // SETTINGS & DASHBOARD ---------- ?>

		<div class="row">

			<section class="column-two-thirds">
				<h2><i class="fa fa-file fa-fw"></i> Pages</h2>
				<table>
					<thead>
						<tr>
							<th><i class="fa fa-file-o fa-fw"></i> Page Name</th>
							<th class="align-right"><i class="fa fa-clock-o fa-fw"></i> Date/Time</th>
							<th class="align-right td-status-row"><i class="fa fa-info-circle fa-fw"></i> Status</th>
						</tr>
					</thead>
					<tbody>
					<?php foreach ($db as $item) : ?>
						<tr>
							<td>
								<i class="fa fa-file-text-o fa-fw"></i>&nbsp;
								<a href="<?php echo $_SERVER['PHP_SELF']; ?>?b=pages&amp;a=edit&amp;p=<?php echo $item['slug'] ?>"><?php echo $item['title'] ?></a>
							</td>
							<td class="align-right">
								<small><i class="fa fa-calendar fa-fw"></i> <?php echo date("Y.m.d", $item['timedate']); ?>&nbsp; <i class="fa fa-clock-o fa-fw"></i> <?php echo date("H:i", $item['timedate']); ?></small>
							</td>
							<td class="align-center td-status-row"><?php echo ($item['active']) ? '<i class="fa fa-check"></i>' : '<i class="fa fa-times"></i>' ; ?></td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
				<p><a href="<?php echo $_SERVER['PHP_SELF']; ?>?b=pages&amp;a=new" class="button button-main">Create a new page <i class="fa fa-plus"></i></a></p>
			</section>

			<section class="column-one-third sidebar">
				<h2><i class="fa fa-cog fa-fw"></i> Settings</h2>
				<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">

					<p>
						<label for="site-language">
							<span><i class="fa fa-globe fa-fw"></i> Site Language <small>( 2 letter i.e: ES, EN )</small></span>
							<input type="text" name="site-language" id="site-language" value="<?php echo $_c['site_language']; ?>" />
						</label>
					</p>
					<p>
						<label for="site-title">
							<span><i class="fa fa-font fa-fw"></i> Site Title</span>
							<input type="text" name="site-title" id="site-title" value="<?php echo $_c['site_title']; ?>" />
						</label>
					</p>
					<p>
						<label for="site-description">
							<span><i class="fa fa-align-left fa-fw"></i> Site Description</span>
							<input type="text" name="site-description" id="site-description" value="<?php echo $_c['site_description']; ?>" />
						</label>
					</p>
					<p>
						<label for="site-keywords">
							<span><i class="fa fa-tags fa-fw"></i> Site Keywords <small>( Comma separated values )</small></span>
							<input type="text" name="site-keywords" id="site-keywords" value="<?php echo $_c['site_keywords']; ?>" />
						</label>
					</p>
					<p>
						<label for="site-theme">
						 	<span><i class="fa fa-paint-brush fa-fw"></i> Theme</span>
						 	<select name="site-theme" id="site-theme">
		 						<?php
									$themes = scandir('../theme');
									foreach ($themes as $theme) {
										if ( (substr($theme, 0, 1) != '.') && is_dir('../theme/' . $theme) ) {
											echo '<option value="'.$theme.'"' . (($_c['theme'] == $theme) ? " selected=selected" : "") . '>'.$theme.'</option>';
										}
									}
							 	?>
						 	</select>
						 </label>
					</p>
					<p>
						<input type="submit" name="settings-submit" id="settings-submit" class="button-main" value="Save Settings" />
					</p>
				</form>
			</section>



		</div>
	<?php endif; ?>

<?php endif; ?>
</main>
<footer>
	<hr />
	<p>
		<a href="http://weasel.moro.es" title="Weasel CMS"><strong>Weasel CMS</strong></a>
		&mdash; MIT Licensed Supersimple Flat file PHP Content Management System.
		<br />
		Designed and developed by <a href="http://moro.es">Jorge Moreno</a> (<a href="https://twitter.com/alterebro">@alterebro</a>)
	</p>
</footer>

<script src="scripts/weasel-cms.min.js"></script>
</body>
</html>
