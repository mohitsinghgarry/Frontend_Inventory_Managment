export const loadRazorpay = async (amount) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);

    return new Promise((resolve) => {
        script.onload = () => {
            const options = {
                key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay API Key
                amount: amount * 100, // Convert to paisa
                currency: 'INR',
                name: 'Your Company',
                description: 'Order Payment',
                handler: (response) => {
                    console.log('Payment Success:', response);
                    resolve(true);
                },
                modal: {
                    ondismiss: () => {
                        console.log('Payment modal closed');
                        resolve(false);
                    },
                },
            };
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        };
        script.onerror = () => resolve(false);
    });
};
