<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header>
<div class="container">
    <div class="area_logo_header">
        <a href="<?php echo home_url('/'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/logo/logo_shibuly.png" style="width: 100px; overflow: hidden; vertical-align: bottom;" alt="Logo"></a>
    </div>
    <nav class="nav_header">
        <ul class="list_nav_header">
            <li><a href="<?php echo home_url('/'); ?>">Home</a></li>
            <li><a href="<?php echo home_url('/items'); ?>">Items</a></li>
            <li><a href="<?php echo home_url('/brands'); ?>">Brands</a></li>
            <li><a href="<?php echo home_url('/news'); ?>">News</a></li>
            <li><a href="<?php echo home_url('/about-us'); ?>">About Us</a></li>
            <li><a href="<?php echo home_url('/customer'); ?>">Customer</a></li>
        </ul>
    </nav>
    <nav class="nav_icon_header">
        <ul class="list_nav_icon_header">
            <li><a href="<?php echo home_url('/search'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/icon/icon_search.svg" width="30" style="vertical-align: bottom;" alt="Search"></a></li>
            <li><a href="<?php echo home_url('/cart'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/icon/icon_cart.svg" width="30" style="vertical-align: bottom;" alt="Cart"></a></li>
			<li><a href="<?php echo home_url('/checkout'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/icon/icon_cart.svg" width="30" style="vertical-align: bottom;" alt="Checkout"></a></li>
            <li><a href="<?php echo home_url('/my-account'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/icon/icon_profile.svg" width="30" style="vertical-align: bottom;" alt="my-account"></a></li>
            <li><a href="<?php echo home_url('/favorites'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/icon/icon_favorites.svg" width="30" style="vertical-align: bottom;" alt="Favorites"></a></li>
            <li><a href="<?php echo home_url('/ranking'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/icon/icon_ranking.svg" width="30" style="vertical-align: bottom;" alt="Ranking"></a></li>
        </ul>
    </nav>
</div>
</header>
