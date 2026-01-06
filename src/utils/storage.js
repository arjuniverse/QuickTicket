const STORAGE_KEY = 'quickticket_bookings';

export const getBookings = () => {
  try {
    const bookings = localStorage.getItem(STORAGE_KEY);
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
};

export const saveBooking = (booking) => {
  try {
    const bookings = getBookings();
    const newBooking = {
      ...booking,
      bookingId: generateBookingId(),
      bookingDate: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  } catch (error) {
    console.error('Error saving booking to localStorage:', error);
    throw error;
  }
};

export const cancelBooking = (bookingId) => {
  try {
    const bookings = getBookings();
    const filtered = bookings.filter(b => b.bookingId !== bookingId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error canceling booking:', error);
    return false;
  }
};

export const getBookingById = (bookingId) => {
  try {
    const bookings = getBookings();
    return bookings.find(b => b.bookingId === bookingId);
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
};

const generateBookingId = () => {
  return 'QT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

