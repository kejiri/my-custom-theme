<?php
/**
 * Template Name: Customer Page
 * Description: A custom template for the customer page.
 */
// ヘッダーを呼び出す
get_header();
?>

<main class="customer">
    <div class="customer_container">
        <section class="welcome_message">
            <h2>Welcome to Our Customer Page</h2>
            <p>We are dedicated to providing you with the best shopping experience. Here, you'll find all the information you need to make your purchase smooth and enjoyable.</p>
        </section>
        <section class="faq">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-item">
                <h3>Do you offer international shipping?</h3>
                <p>Yes, we ship worldwide! Delivery times and fees vary depending on the destination.</p>
            </div>
            <div class="faq-item">
                <h3>What payment methods are accepted?</h3>
                <p>We accept major credit cards, PayPal, and other popular payment options.</p>
            </div>
            <div class="faq-item">
                <h3>Can I return or exchange my order?</h3>
                <p>Yes, we offer a return policy within 30 days of purchase. Conditions apply.</p>
            </div>
        </section>
        <section class="order">
            <h2>How to Order</h2>
            <p>
                1. Browse our items.<br>
                2. Add your favorite products to the cart.<br>
                3. Enter your shipping details.<br>
                4. Complete the payment.<br>
                5. Receive a confirmation email.
            </p>
        </section>
        <section class="support">
            <h2>Customer Support</h2>
            <p>If you have any questions, feel free to reach out to us through the contact information below:</p>
            <div class="contact">
                <div class="contact-item">
                    <h3>Email</h3>
                    <p>support@example.com</p>
                </div>
                <div class="contact-item">
                    <h3>Phone</h3>
                    <p>+1 (123) 456-7890</p>
                </div>
                <div class="contact-item">
                    <h3>Business Hours</h3>
                    <p>Mon-Fri: 9:00 AM - 6:00 PM (JST)</p>
                </div>
            </div>
        </section>
        <section class="customer_reviews">
            <h2>Customer Reviews</h2>
            <p>"I loved the product! The quality is exceptional, and the shipping was fast." - A happy customer</p>
        </section>
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
