const formatPrice = (amount) => {
    if (amount) {
        if (typeof amount === 'string') {
            amount = parseInt(amount, 10);
        }
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        return '0 ₫';
    }
};
const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date(date));
}
export { formatPrice, formatDate };