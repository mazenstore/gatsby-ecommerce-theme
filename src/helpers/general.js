/**
 * 🧮 Check if value is numeric
 */
function isNumeric(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * 📧 Validate email format
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 🔒 Validate strong password format
 * Must include: 
 * - at least 8 characters
 * - one lowercase letter
 * - one uppercase letter
 * - one number
 */
function validateStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

/**
 * 🕳️ Check if value is empty
 */
function isEmpty(input) {
  return input === '' || input === null || input === undefined;
}

/**
 * 🔑 Check if user is authenticated
 * (Looks for 'key' in localStorage)
 */
function isAuth() {
  if (typeof window === 'undefined') {
    return false; // غير true أثناء SSR
  }

  const token = window.localStorage?.getItem('key');
  return !!token;
}

/**
 * 🖼️ Optimize image URL (adds ?imgcdn=true)
 */
/**
 * 🖼️ Optimize image URL (adds ?imgcdn=true)
 */
function toOptimizedImage(imageUrl) {
  // إذا القيمة غير موجودة أو ليست string
  if (!imageUrl || typeof imageUrl !== 'string') return '';

  // نحمي ضد undefined أو مسارات خارجية
  if (imageUrl?.startsWith('/') === false || imageUrl?.includes('imgcdn=true')) {
    return imageUrl;
  }

  // نضيف imgcdn=true بشكل آمن
  return imageUrl + (imageUrl?.includes('?') ? '&' : '?') + 'imgcdn=true';
}

/**
 * 🧰 Export all helpers
 */
export {
  isNumeric,
  validateEmail,
  validateStrongPassword,
  isEmpty,
  isAuth,
  toOptimizedImage
};
