# Inkspire

Inkspire is a Book Rental Website. This guide will help you set up and run the project locally.

---

## **Getting Started**

To set up Inkspire locally:

Clone the repository and navigate to the project directory:


git clone https://github.com/InkSpireProject/InkSpire.git
cd Inkspire

## 1. Install the required dependencies:    
npm install    

## 2. Set up the environment variables. Create a file named env.local in the root directory and add the following content:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=    
CLERK_SECRET_KEY=    
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in    
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up     
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/auth/callback     
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/auth/callback     
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=    

## 3. Next, create a file named .env in the root directory and add the following content:  

MONGO_URL='mongodb://127.0.0.1:27017/SEProject'      
ADMIN_PASSWORD='admin123'      


## 4. Ensure MongoDB is installed and running locally before starting the project. Once the environment variables are set, start the development server:    

npm run dev    


Ensure MongoDB is installed and running locally.      
Make sure all required API keys are properly configured in the env.local and .env files.      
For troubleshooting, check the terminal output for error messages.    