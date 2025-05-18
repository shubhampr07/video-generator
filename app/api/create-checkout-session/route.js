// import { NextResponse } from 'next/server';

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(request) {
//   try {
//     const { priceId, email, credits } = await request.json();
    
//     if (!priceId || !email) {
//       return NextResponse.json(
//         { error: 'Missing required parameters' },
//         { status: 400 }
//       );
//     }

//     // Create a checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?canceled=true`,
//       customer_email: email,
//       metadata: {
//         email,
//         credits,
//       },
//     });

//     return NextResponse.json({ sessionId: session.url });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     return NextResponse.json(
//       { error: 'Error creating checkout session' },
//       { status: 500 }
//     );
//   }
// }