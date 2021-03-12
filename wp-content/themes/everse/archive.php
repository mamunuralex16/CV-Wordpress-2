<?php
/**
 * The template for displaying archive pages.
 *
 * @package Everse
 */

get_header();
?>

<?php
	// Page Title
	get_template_part( 'template-parts/page-title/page-title-archive' );
?>

<div class="archive-section pb-56">
	<div class="container">
		<div class="row">

			<?php everse_primary_content_top(); ?>

			<div id="primary" class="content blog__content mb-32 col-lg">
				<main class="site-main" role="main">

					<?php everse_primary_content_before(); ?>

					<?php everse_primary_content_query(); ?>

					<?php everse_post_pagination(); ?>

					<?php everse_primary_content_after(); ?>

				</main>
			</div> <!-- #primary -->

			<?php
				// Sidebar
				if ( 'fullwidth' !== everse_layout_type( 'archive', 'fullwidth' ) && is_active_sidebar( 'everse-blog-sidebar' ) ) {
					everse_sidebar();
				}
			?>	

		</div> <!-- .row -->
	</div> <!-- .container -->
</div>
<?php get_footer();  ?>