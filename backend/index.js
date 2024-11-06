// const express = require('express');
// const app = express();

// // Correcting the dotenv config statement
// require('dotenv').config();

// const cors = require('cors');
// const stripe = require('stripe')(process.env.SECRETE_STRIPE_KEY); // Corrected how the secret key is accessed

// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));

// app.post('/checkout', async (req, res) => {
//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: "payment",
//             line_items: req.body.items.map(item => {
//                 return {
//                     price_data: {
//                         currency: 'inr',
//                         product_data: {
//                             name: item.name,
//                         },
//                         unit_amount: item.price * 100, // Corrected from "item.price * 100"
//                     },
//                     quantity: item.quantity
//                 };
//             }),
//             success_url: "http://localhost:5173/success",
//             cancel_url: "http://localhost:5173/cancel"
//         });

//         res.json({ url: session.url });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(8000, () => {
//     console.log('Server is running on http://localhost:8000');
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRETE_STRIPE_KEY); 


const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Create a Mongoose schema and model
const checkoutSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    email: String,
    timestamp: { type: Date, default: Date.now },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

// Route for checkout session creation
app.post('/checkout', async (req, res) => {
    try {
        const { email, items } = req.body;

        // Save checkout details to MongoDB
        const checkoutDetails = new Checkout({
            name: items[0].name,
            price: items[0].price,
            quantity: items[0].quantity,
            email: email,
        });

        await checkoutDetails.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: items.map(item => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start server on port 8000
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
