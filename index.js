const puppeteer = require('puppeteer');

(async () => {
    // Khởi tạo trình duyệt Puppeteer
    const browser = await puppeteer.launch({ headless: false }); // Đặt headless: false để thấy trình duyệt
    const page = await browser.newPage();

    // Lấy User-Agent từ trình duyệt
    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log('User-Agent của thiết bị: ', userAgent);

    // Lấy vị trí địa lý (Geolocation) từ trình duyệt
    const geoLocation = await page.evaluate(async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => reject(error)
                );
            } else {
                reject(new Error('Geolocation không được hỗ trợ trên trình duyệt này.'));
            }
        });
    });

    console.log('Vị trí địa lý của thiết bị:', geoLocation);

    // Giả lập User-Agent như một người dùng thực tế
    await page.setUserAgent(userAgent);

    // Thiết lập viewport (kích thước màn hình)
    await page.setViewport({ width: 1280, height: 800 });

    // Giả lập vị trí người dùng (nếu có, sử dụng vị trí lấy được từ Geolocation)
    if (geoLocation) {
        await page.setGeolocation(geoLocation);
    }

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
