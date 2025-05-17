import axios from 'axios';

// API base URL from .env or default
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://hediyelebackend-production.up.railway.app';

// Admin credentials from .env
const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

// Premium API client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Admin login to get auth token
 * @returns {Promise<string|null>} - Auth token or null if failed
 */
const getAdminToken = async () => {
  try {
    // Check if credentials are available
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('Admin credentials not found in .env file');
      return null;
    }
    
    // Call login endpoint to get token
    const response = await apiClient.post('/api/login', {
      email: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    });
    
    if (response.data && response.data.token) {
      return response.data.token;
    }
    
    return null;
  } catch (error) {
    console.error('Admin login failed:', error);
    return null;
  }
};

/**
 * Set premium status for a user
 * @param {string} userId - User ID to set premium status for
 * @param {boolean} isPremium - Whether the user should be premium
 * @returns {Promise} - API response
 */
export const setPremiumStatus = async (userId, isPremium = true) => {
  try {
    // First get admin token
    const token = await getAdminToken();
    
    if (!token) {
      return { 
        success: false, 
        error: 'Admin authentication failed. Please check admin credentials in .env file.' 
      };
    }
    
    // Make authorized request to set-premium endpoint
    const response = await apiClient.post('/api/admin/set-premium', {
      user_id: userId,
      is_premium: isPremium
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error setting premium status:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to set premium status'
    };
  }
};

/**
 * Mock credit card validation
 * This will automatically reject known mock credit card values
 * unless valid admin credentials are present
 */
export const validateCreditCard = (cardNumber, cvv, expiryDate) => {
  // For demo purposes, only accept the test card
  if (
    cardNumber.replace(/\s/g, '') === '1111222233334444' &&
    cvv === '123' &&
    expiryDate === '11/29'
  ) {
    return { success: true };
  } else {
    return { success: false, error: 'Invalid card details. Please check and try again.' };
  }
}; 