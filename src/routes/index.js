const { Router } = require('express')
const router = Router()

require("dotenv").config(".env");

router.get('/', (req, res) => {
    res.render('index')
})

router.post("/create-checkout-session", async (req, res) => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
        customer_email: req.body.mail,
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: req.body.name,
                    },
                    unit_amount: req.body.price*1000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:4040/success-checkout",
        cancel_url: "http://localhost:4040/",
    });

    res.json({ id: session.id });
});

router.get('/success-checkout', (req, res) => {
    res.json({
        msg: 'success checkout'
    })
})

module.exports = router