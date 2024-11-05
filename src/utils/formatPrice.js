const formatPrice = (amount) => {
    if (amount) {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    else
        return 0;
};
export default formatPrice