/my-project
│-- /public              # Chứa các tài nguyên tĩnh (CSS, JS, hình ảnh)
│   ├── /css             # Chứa file CSS
│   │    ├── main.css
│   │    ├── components.css
│   │    └── responsive.css
│   ├── /img             # Chứa hình ảnh
│   │    ├── logo.png
│   │    ├── banner.jpg
│   │    └── slider1.jpg
│   ├── /js              # Chứa file JavaScript
│   │    ├── app.js       # File JavaScript chính
│   │    ├── routes.js    # Định tuyến giao diện
│   │    ├── config.js    # Cấu hình chung
│   │    ├── /controller  # Chứa các controller xử lý logic
│   │    │    ├── productController.js
│   │    │    ├── userController.js
│   │    │    └── cartController.js
│   │    ├── /model       # Chứa các model dữ liệu
│   │    │    ├── productModel.js
│   │    │    ├── userModel.js
│   │    │    └── cartModel.js
│   │    └── /views       # Chứa các thao tác giao diện
│   │         ├── homeView.js
│   │         ├── productView.js
│   │         └── cartView.js
│-- /scss                # Chứa các file SCSS nếu dùng
│   ├── styles.scss
│   └── _variables.scss
│
│-- /views               # Chứa các trang HTML (Giao diện - View)
│   ├── home.html
│   ├── product.html
│   ├── about.html
│   ├── contact.html
│   ├── cart.html
│   └── layout.html       # Template chung cho toàn bộ trang
│
│-- /data                # Chứa dữ liệu JSON, API giả lập
│   ├── products.json
│   ├── users.json
│   └── cart.json
│
│-- /components          # Chứa các thành phần giao diện dùng chung (header, footer)
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
│
│-- index.html           # Trang chính của website
│-- README.md            # Tài liệu mô tả dự án
│-- .gitignore           # Các tệp cần bỏ qua khi push lên GitHub
│-- package.json         # Quản lý dependencies (nếu dùng npm/yarn)
│-- gulpfile.js          # Nếu sử dụng Gulp để build project
│-- webpack.config.js    # Nếu dùng Webpack
