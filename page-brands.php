<?php
/**
 * Template Name: Brands
 */

get_header(); ?>

<main class="brands">
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search for brands...">
        <select id="genre-select">
            <option value="">All Genres</option>
            <?php
            // ブランドのジャンルを取得
            $genres = get_terms([
                'taxonomy' => 'brand_genre',
                'hide_empty' => true,
            ]);
            foreach ($genres as $genre) {
                echo '<option value="' . esc_attr($genre->slug) . '">' . esc_html($genre->name) . '</option>';
            }
            ?>
        </select>
        <button id="search-button">Search</button>
    </div>

    <div id="brands-list">
        <?php
        $brands = new WP_Query(['post_type' => 'brands', 'posts_per_page' => -1]);
        if ($brands->have_posts()) :
            while ($brands->have_posts()) : $brands->the_post(); ?>
                <div class="brand-item">
                    <h3><?php the_title(); ?></h3>
                    <p><?php the_excerpt(); ?></p>
                    <a href="<?php the_permalink(); ?>">View Details</a>
                </div>
            <?php endwhile;
            wp_reset_postdata();
        else :
            echo '<p>No brands found.</p>';
        endif;
        ?>
    </div>
</main>

<?php get_footer(); ?>
