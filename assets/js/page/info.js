const salesData = {
    2015: 500,
    2016: 800,
    2017: 1200,
    2018: 1000,
    2019: 3000,
    2020: 5000,
    2021: 7000,
    2022: 4000,
    2023: 6000,
    2024: 10000,
    2025: 5000,
  };
  
  const canvas = document.getElementById("salesChart");
  const ctx = canvas.getContext("2d");
  
  // Vẽ trục x và y cho biểu đồ cột
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(20, 350); // Vẽ đường thẳng xuống dưới (trục Y)
  ctx.lineTo(500, 350); // Vẽ đường thẳng sang phải (trục X)
  ctx.stroke();
  
  const years = Object.keys(salesData);
  const sales = Object.values(salesData);
  
  // Kích thước cột và khoảng cách
  const barWidth = 50;
  const barSpacing = 20;
  const maxBarHeight = 250; // Độ cao tối đa của cột trên trục Y
  
  for (let i = 0; i < sales.length; i++) {
    const x = 50 + i * (barWidth + barSpacing); // Vị trí trên trục X
    const height = (sales[i] / 12000) * maxBarHeight; // Chiều cao đúng tỷ lệ
    const y = 350 - height; // Vị trí y để cột không bị lộn ngược
  
    // Vẽ cột
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, barWidth, height);
  
    // Thêm nhãn năm dưới cột
    ctx.fillStyle = "black";
    ctx.fillText(years[i], x + barWidth / 2 - 10, 370);
  }
  
  // Vẽ biểu đồ đường tăng trưởng với SVG
  const svg = document.getElementById("growthChart");
  
  // Tạo tỷ lệ cho đường (x, y)
  const xScale = (index) => 50 + index * (500 / (years.length - 1));
  const yScale = (value) => 350 - (value / 12000) * 250;
  
  // Tạo đường vẽ
  let pathData = "M " + xScale(0) + " " + yScale(sales[0]); // Điểm đầu tiên
  for (let i = 1; i < sales.length; i++) {
    pathData += " L " + xScale(i) + " " + yScale(sales[i]); // Các đường nối
  }
  
  // Tạo phần tử đường SVG
  // document.createElementNS(namespace, tagName)
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "green");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("fill", "none");
  svg.appendChild(path);
  
  // Vẽ các điểm dữ liệu dưới dạng các vòng tròn nhỏ trên biểu đồ đường
  for (let i = 0; i < sales.length; i++) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", xScale(i));
    circle.setAttribute("cy", yScale(sales[i]));
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "green");
    svg.appendChild(circle);
  
    // Thêm nhãn giá trị cho mỗi điểm
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", xScale(i));
    text.setAttribute("y", yScale(sales[i]) - 10);
    text.setAttribute("fill", "black");
    text.setAttribute("text-anchor", "middle");
    text.textContent = sales[i];
    svg.appendChild(text);
  }