<footer>
    <div class="container">
        <ul class="accordion__list">
            <li class="accordion__item">
                <p class="accordion__title">Get Help</p>
                <div class="accordion__content">
                    <ul>
                        <li><a href="<?php echo home_url('/return-policy'); ?>">Return Policy</a></li>
                        <li><a href="<?php echo home_url('/shopping-policy'); ?>">Shopping Policy</a></li>
                        <li><a href="<?php echo home_url('/faqs'); ?>">FAQs</a></li>
                        <li><a href="<?php echo home_url('/privacy-policy'); ?>">Privacy Policy</a></li>
                        <li><a href="<?php echo home_url('/items'); ?>">Items</a></li>
                    </ul>
                </div>
            </li>
            <li class="accordion__item">
                <p class="accordion__title">About</p>
                <div class="accordion__content">
                    <ul>
                        <li><a href="<?php echo home_url('/about-us'); ?>">About us</a></li>
                        <li><a href="<?php echo home_url('/message'); ?>">Shibuly's Message</a></li>
                    </ul>
                </div>
            </li>
            <li class="accordion__item">
                <p class="accordion__title">Top Searches</p>
                <div class="accordion__content">
                    <ul>
                        <li><a href="<?php echo home_url('/product-detail1'); ?>">Product name 1</a></li>
                        <li><a href="<?php echo home_url('/product-detail2'); ?>">Product name 2</a></li>
                        <li><a href="<?php echo home_url('/product-detail3'); ?>">Product name 3</a></li>
                        <li><a href="<?php echo home_url('/product-detail4'); ?>">Product name 4</a></li>
                        <li><a href="<?php echo home_url('/product-detail5'); ?>">Product name 5</a></li>
                        <li><a href="<?php echo home_url('/product-detail6'); ?>">Product name 6</a></li>
                        <li><a href="<?php echo home_url('/product-detail7'); ?>">Product name 7</a></li>
                    </ul>
                </div>
            </li>
            <li class="accordion__item">
                <p class="accordion__title">Contact Us</p>
                <div class="accordion__content">
                    <ul>
                        <li><a href="https://www.instagram.com/shibuly_official/"><img src="<?php echo get_template_directory_uri(); ?>/img/logo/logo_insta.svg" alt="Instagram"></a></li>
                        <li><a href="https://x.com/shibuly_official"><img src="<?php echo get_template_directory_uri(); ?>/img/logo/logo_x.svg" alt="X (formerly Twitter)"></a></li>
                    </ul>
                </div>
            </li>
            <li class="accordion__item">
                <p class="accordion__title">Payment Methods</p>
                <div class="accordion__content">
                    <ul>
                        <li><a href="https://www.global.jcb/en/products/cards/index.html"><img src="<?php echo get_template_directory_uri(); ?>/img/logo/logo_jcb.svg" alt="JCB"></a></li>
                        <li><a href="https://www.mastercard.com/global/en.html"><img src="<?php echo get_template_directory_uri(); ?>/img/logo/logo_mastercard.svg" alt="MasterCard"></a></li>
                        <li><a href="https://usa.visa.com/pay-with-visa/cards/visa-credit-cards.html"><img src="<?php echo get_template_directory_uri(); ?>/img/logo/logo_visa.svg" alt="Visa"></a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <?php wp_footer(); ?>
</footer>

<?php wp_footer(); ?>
</body>
</html>
