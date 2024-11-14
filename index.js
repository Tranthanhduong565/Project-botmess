const puppeteer = require('puppeteer');

(async () => {
    // Khởi tạo trình duyệt Puppeteer
    const browser = await puppeteer.launch({ headless: false }); // Đặt headless: false để thấy trình duyệt
    const page = await browser.newPage();

    // Thiết lập viewport (kích thước màn hình)
    await page.setViewport({ width: 1280, height: 800 });

    // Truy cập Facebook
    await page.goto('https://www.facebook.com');

    // Điền thông tin đăng nhập (thay 'your-email@example.com' và 'your-password' bằng thông tin của bạn)
    await page.type('#email', 'your-email@example.com');
    await page.type('#pass', 'your-password');
    await page.click('[type="submit"]');

    // Đợi sau khi đăng nhập xong và chuyển hướng
    await page.waitForNavigation();

    console.log('Đăng nhập thành công!');

    // Đóng trình duyệt
    await browser.close();
})();
