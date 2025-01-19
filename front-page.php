<?php
// ヘッダーを呼び出す
get_header();
?>

<main>
    <div class="area_top_view">
        <div class="area_top_view_image">
            <img src="<?php echo get_template_directory_uri(); ?>/img/img/top_maccha.jpg" alt="Matcha">
            <img src="<?php echo get_template_directory_uri(); ?>/img/img/top_kimono.jpg" alt="Kimono">
            <img src="<?php echo get_template_directory_uri(); ?>/img/img/top_tojiki.jpg" alt="Tojiki">
        </div>
    </div>
    <div class="appeal">
        <ul class="list_appeal">
            <li class="layout_2_div">
                <div class="appeal_img">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icon/illust_uniqueness.png" alt="Uniqueness">
                </div>
                <div class="appeal_text">
                    <p class="ttl_1">Uniqueness</p>
                    <p class="description">
                        Our items have never been introduced to foreign countries though they are popular in Japan.
                    </p>
                </div>
            </li>
            <li class="layout_2_div">
                <div class="appeal_img">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icon/illust_uniqueness.png" alt="Uniqueness">
                </div>
                <div class="appeal_text">
                    <p class="ttl_1">Uniqueness</p>
                    <p class="description">
                        Our items have never been introduced to foreign countries though they are popular in Japan.
                    </p>
                </div>
            </li>
            <li class="layout_2_div">
                <div class="appeal_img">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/icon/illust_uniqueness.png" alt="Uniqueness">
                </div>
                <div class="appeal_text">
                    <p class="ttl_1">Uniqueness</p>
                    <p class="description">
                        Our items have never been introduced to foreign countries though they are popular in Japan.
                    </p>
                </div>
            </li>
        </ul>
    </div>
    <section class="area_home_trending">
        <div class="container horizontal_grid">
            <div class="head_home">
                <h2 class="ttl">Trending</h2>
            </div>
            <div class="body_home">
                <div class="img_scroll">
                    <div class="item_container">
                        <div class="img">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/img/trending_bento_box.jpg" width="257" alt="Bento Box">
                        </div>
                        <div class="item_description">
                            <p class="item_name">Bento box</p>
                            <p class="item_price">$20.00</p>
                        </div>
                    </div>
                    <div class="item_container">
                        <div class="img">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/img/trending_kimono.jpg" width="257" alt="Kimono">
                        </div>
                        <div class="item_description">
                            <p class="item_name">Rich Kimono</p>
                            <p class="item_price">$2000.00</p>
                        </div>
                    </div>
                    <div class="item_container">
                        <div class="img">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/img/trending_bento_box.jpg" width="257" alt="Bento Box">
                        </div>
                        <div class="item_description">
                            <p class="item_name">Bento box for everyone by Shiseido</p>
                            <p class="item_price">$20.00</p>
                        </div>
                    </div>
                    <div class="item_container">
                        <div class="img">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/img/treanding_glass.jpg" width="257" alt="Glass Cup">
                        </div>
                        <div class="item_description">
                            <p class="item_name">GLASS CUP</p>
                            <p class="item_price">$20.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="area_home_hot_brand bg_black">
        <div class="container layout_2_div">
            <div class="img">
                <img src="<?php echo get_template_directory_uri(); ?>/img/img/hotbrand_glass.jpg" width="627" alt="Kagami Crystal">
            </div>
            <div class="brands_description">
                <h3 class="header2">Hot Brands: Kagami Crystal</h3>
                <p class="hotbrand_description">
                     Kagami Crystal is a manufacturer of crystal glassware. It supplies glassware to the Imperial Household Agency for official receptions, and also makes traditional Japanese Edo Kiriko craftworks.
                </p>
                <div class="btn_hotbrands">
                    <a href="<?php echo home_url('/brand-detail1'); ?>">See the brand</a>
                </div>
            </div>
        </div>
    </section>
    <section class="area_home_all_items">
        <div class="container">
            <div class="head_home">
                <h2 class="ttl">All Items</h2>
            </div>
            <div class="container_all_items">
                <div class="item_container">
                    <div class="item_category_header">
                        <h3 class="item_category">Accessory</h3>
                    </div>
                    <div class="image_container">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/img/all_items_accesory.jpg" style="width: 254px;height: auto;" alt="Accessory">
                    </div>
                </div>
                <div class="item_container">
                    <div class="item_category_header">
                        <h3 class="item_category">Home Décor</h3>
                    </div>
                    <div class="image_container">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/img/all_items_home_decor.jpg" style="width: 254px;height: auto;" alt="Home Décor">
                    </div>
                </div>
                <div class="item_container">
                    <div class="item_category_header">
                        <h3 class="item_category">Tableware</h3>
                    </div>
                    <div class="image_container">
                        <img src="<?php echo get_template_directory_uri(); ?>/img/img/all_items_shikki.jpg" style="width: 254px;height: auto;" alt="Tableware">
                    </div>
                </div>
                <!-- その他のアイテムが続く -->
            </div>
            <div class="button_center">
                <a href="<?php echo home_url('/items'); ?>">See All Items</a>
            </div>
        </div>
        <hr class="hr_all_items">
    </section>
    <section class="area_home_all_brands">
        <div class="container">
            <div class="head_home">
                <h2 class="ttl">All Brands</h2>
            </div>
            <div class="container_all_brands">
                <ul class="list_all_brands">
                    <li class="single_brand">
                        <div class="brand_name">
                            <p class="brand_name_description">Ishikawa Gold</p>
                        </div>
                        <div class="brand_img">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/img/all_brands_gold.jpg" width="250" height="250" alt="Ishikawa Gold">
                        </div>
                        <div class="brand_tag">
                            <ul class="list_brand_tag">
                                <li class="tag1"></li>
                            </ul>
                        </div>
                    </li>
                    <!-- その他のブランド -->
                </ul>
            </div>
            <div class="button_center">
                <a href="<?php echo home_url('/brands'); ?>">See All Brands</a>
            </div>
        </div>
    </section>
    <section class="company-message">
        <div class="container">
            <p class="h1">
                Shibuly is looking for<br>
                delight future with <br>
                Japanese delicate <br>
                products.
            </p>
        </div>
    </section>
    <section class="area__home__news">
        <div class="container">
            <div class="head__news">
                <h2 class="ttl text__center">News</h2>
            </div>
            <div class="news__body">
                <div class="news__side">
                    <ul class="list__news__side">
                        <li class="news__category font__roboto">All Categories</li>
                        <li class="news__category font__roboto">About Items</li>
                        <li class="news__category font__roboto">About Brands</li>
                        <li class="news__category font__roboto">Others</li>
                    </ul>
                    <div class="news__side__more">
                        <div class="button_left">
                            <a href="<?php echo home_url('/news'); ?>">See All News</a>
                        </div>
                    </div>
                </div>
                <div class="news__main">
                    <ul class="list__news__main">
                        <li class="news__item">
                            <div class="news__img">
                                <img src="<?php echo get_template_directory_uri(); ?>/img/img/news_bento_box.jpg" alt="News Bento Box">
                            </div>
                            <div class="news__text">
                                <div class="item__meta">
                                    <p class="item__date">24 July 2024</p>
                                </div>
                                <p class="news__title">
                                    New Box was introduced by Ishikawa Gold
                                </p>
                            </div>
                        </li>
                        <!-- 他のニュース項目 -->
                    </ul>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
