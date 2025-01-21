<?php
get_header(); ?>

<main class="single-news">
    <?php
    if (have_posts()) :
        while (have_posts()) : the_post(); ?>
            <h1><?php the_title(); ?></h1>
            <div class="news-content">
                <?php the_content(); ?>
            </div>
            <div class="news-meta">
                <p>Published on: <?php echo get_the_date(); ?></p>
            </div>
            <div class="news-image">
                <?php if (has_post_thumbnail()) {
                    the_post_thumbnail('large');
                } ?>
            </div>
        <?php endwhile;
    else : ?>
        <p>No news details available.</p>
    <?php endif; ?>
</main>

<?php
get_footer();
?>
