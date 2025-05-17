# Premium Subscription Portal

This is a React application for processing premium subscriptions. It mocks a payment flow for setting premium status for users in the system.

## Features

- URL parameter support for user ID (`uid`)
- Mock credit card validation
- Premium subscription activation simulation

## Mock Credit Card Details

The application only accepts the following test credit card:
- Card Number: 1111 2222 3333 4444
- CVV: 123
- Expiry Date: 11/29

## Setup

1. Install Node.js and npm (if not already installed)
2. Navigate to the project directory
3. Install dependencies:
```
npm install
```
4. Start the development server:
```
npm start
```

## Usage

1. Open the application in your browser
2. Add the user ID as a URL parameter: `http://localhost:3000?uid=USER_ID`
3. Log in with the admin credentials
4. Enter the mock credit card details to process the payment
5. Upon successful validation, the premium status will be simulated as activated

## Integration with Backend

In a production environment, this application would:
1. Make an API call to your backend after successful payment validation
2. The backend would then update the user's premium status in the database
3. The application can be integrated with your existing `set_premium.py` script

## Development

- This project was created with React
- The code structure is organized into components
- Styling is handled with CSS 