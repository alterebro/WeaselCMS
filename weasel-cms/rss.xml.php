<?php
if ( !defined('CMS_FOLDER') ) { header('Location: ../'); }

header("Content-Type: application/xml; charset=utf-8");
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"; ?>
<rss version="2.0">
    <channel>
        <title><?php echo $_CMS['site']['site_title']; ?></title>
        <link><?php echo $_CMS['site']['url']; ?></link>
        <description><?php echo $_CMS['site']['site_description']; ?></description>
        <?php
            foreach ($_CMS['pages'] as $page) {
                echo "<item>";
                    echo "<title>".$page['title'] ."</title>";
                    echo "<link>".$_CMS['site']['url'].$page['slug'].'.cms'. "</link>";
                    echo "<description>".$page['description'] ."</description>";
                echo "</item>";
            }
        ?>
    </channel>
</rss>
