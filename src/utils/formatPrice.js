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

export default formatPrice;