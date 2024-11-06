// import React, { useState } from 'react'

// const Home = () => {

//     const itemName = "FIREING";
//     const itemPrice=500;
//     const [quantity,setquantity] = useState
//     const [finalAmount,setfinalAmount] = useState(itemPrice)

//     const decement = () =>{
//         if(quantity<=1){
//             setquantity(1)
//             setfinalAmount(itemPrice)
//         }
//         else if(quantity>1){
//             setquantity(quantity-1)
//             setfinalAmount(finalAmount-itemPrice)
//         }
//     }

//     const increment = ()=>{
//         setquantity(quantity+1)
//         setfinalAmount(finalAmount+itemPrice)
//     }

//     const checkout = async()=>{
//         try{
//             const res = await fetch("http://localhost:8000/checkout",{
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json",
//                 },
//                 mode:"cors",
//                 body:JSON.stringify({
//                     items:[
//                         {
//                             id:1,
//                             quantity:quantity,
//                             price:itemPrice,
//                             name:itemName
//                         },
//                     ]
//                 })
//             });
//             const data = await res.json();
//             window.location  = data.url;
//         }catch(error){
//             console.log(error)
//         }
//     }





//   return (
//     <div>
//       Home
//     </div>
//   )
// }

// export default Home


import React, { useState } from 'react';

const Home = () => {
  const itemName = "FIREING";
  const itemPrice = 500;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(itemPrice);
    } else {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
  };

//   const checkout = async () => {
//     try {
//       const res = await fetch('http://localhost:8000/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors',
//         body: JSON.stringify({
//           items: [
//             {
//               id: 1,
//               quantity: quantity,
//               price: itemPrice,
//               name: itemName,
//             },
//           ],
//         }),
//       });
//       const data = await res.json();
//       window.location = data.url;
//     } catch (error) {
//       console.log(error);
//     }
//   };

const checkout = async () => {
    try {
        const res = await fetch('http://localhost:8000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'user@example.com', // Replace this with actual user email
                items: [
                    {
                        id: 1,
                        quantity: quantity,
                        price: itemPrice,
                        name: itemName,
                    },
                ],
            }),
        });
        const data = await res.json();
        window.location = data.url;
    } catch (error) {
        console.log(error);
    }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{itemName}</h1>
      <p className="text-lg text-gray-600 mb-2">Price: ₹{itemPrice}</p>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          -
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          +
        </button>
      </div>

      <p className="text-xl font-semibold text-gray-700 mb-4">Total: ₹{finalAmount}</p>

      <button
        onClick={checkout}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default Home;
