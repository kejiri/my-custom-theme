<?php
get_header(); ?>

<main class="single-brand">
    <?php
    if (have_posts()) :
        while (have_posts()) : the_post(); ?>
            <h1><?php the_title(); ?></h1>
            <div class="brand-content">
                <?php the_content(); ?>
            </div>
            <div class="brand-meta">
                <p>Brand Genre: 
                    <?php
                    $terms = get_the_terms(get_the_ID(), 'product_brand');
                    if ($terms && !is_wp_error($terms)) {
                        echo esc_html($terms[0]->name);
                    }
                    ?>
                </p>
            </div>
            <div class="brand-image">
                <?php if (has_post_thumbnail()) {
                    the_post_thumbnail('large');
                } ?>
            </div>
        <?php endwhile;
    else : ?>
        <p>No brand details available.</p>
    <?php endif; ?>
</main>

<?php
get_footer();
?>
