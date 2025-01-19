<?php
// ヘッダーを呼び出す
get_header();
?>

<main class="default">
    <div class="container">
        <?php if (is_home() || is_front_page()) : ?>
            <!-- ホームページのコンテンツ -->
            <section class="home-content">
                <h1>Welcome to Our Website</h1>
                <p>This is the default homepage content.</p>
            </section>
        <?php elseif (is_page()) : ?>
            <!-- 固定ページのコンテンツ -->
            <section class="page-content">
                <h1><?php the_title(); ?></h1>
                <div class="content">
                    <?php
                    // 固定ページの内容を表示
                    if (have_posts()) :
                        while (have_posts()) : the_post();
                            the_content();
                        endwhile;
                    endif;
                    ?>
                </div>
            </section>
        <?php elseif (is_single()) : ?>
            <!-- 投稿ページのコンテンツ -->
            <section class="single-content">
                <h1><?php the_title(); ?></h1>
                <div class="content">
                    <?php
                    if (have_posts()) :
                        while (have_posts()) : the_post();
                            the_content();
                        endwhile;
                    endif;
                    ?>
                </div>
            </section>
        <?php elseif (is_archive()) : ?>
            <!-- アーカイブページのコンテンツ -->
            <section class="archive-content">
                <h1><?php single_cat_title(); ?></h1>
                <ul>
                    <?php
                    // 投稿一覧を表示
                    if (have_posts()) :
                        while (have_posts()) : the_post(); ?>
                            <li>
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </li>
                        <?php endwhile;
                    else : ?>
                        <p>No posts found.</p>
                    <?php endif; ?>
                </ul>
            </section>
        <?php else : ?>
            <!-- その他のページのコンテンツ -->
            <section class="general-content">
                <h1>General Page</h1>
                <p>This is a general fallback template.</p>
            </section>
        <?php endif; ?>
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
