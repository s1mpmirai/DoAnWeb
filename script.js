document.addEventListener("DOMContentLoaded", function () {
    // Tính toán tổng giá trị
    function calculateTotal() {
        let subtotal = 0;
        document.querySelectorAll(".shopping-row").forEach(row => {
            const priceText = row.querySelector(".shopping-column:nth-child(4)").textContent;
            const quantity = parseInt(row.querySelector(".quantity").value);
            const price = parseFloat(priceText.replace(/[^\d]/g, "")); // Lấy giá trị số từ chuỗi
            subtotal += price * quantity;
        });

        // Hiển thị giá trị
        const subtotalElement = document.getElementById("subtotal");
        const totalElement = document.getElementById("total");

        const shippingFee = 50000; // Phí giao hàng cố định
        subtotalElement.textContent = formatCurrency(subtotal);
        totalElement.textContent = formatCurrency(subtotal + shippingFee);
    }

    // Định dạng tiền tệ
    function formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const row = e.target.closest('.shopping-row');
            row.remove();
    
            const productsContainer = document.querySelector('.shopping-products');
            if (productsContainer.children.length === 0) {
                productsContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
            }
        });
    });    

    // Cập nhật khi thay đổi số lượng
    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("change", function () {
            if (parseInt(input.value) < 1) input.value = 1; // Đảm bảo số lượng tối thiểu là 1
            calculateTotal();
        });
    });

    // Thêm sản phẩm mới
    document.querySelector(".checkout-btn").addEventListener("click", function () {
        alert("Thanh toán thành công!");
    });

    // Cập nhật tổng giá trị ban đầu
    calculateTotal();
});
// Khởi tạo giá trị ban đầu
updateSummary();