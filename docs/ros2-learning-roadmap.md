# ROS 2 Learning Roadmap

Lộ trình đưa người học từ ROS 2 cơ bản đến robot tự hành hoàn chỉnh, ưu tiên thực hành: học một cụm kiến thức, làm project nhỏ, thử trong thực tế, sửa lỗi để hiểu hệ thống rồi tiếp tục.

## Cách học

- Mỗi cụm kiến thức đi cùng ít nhất một project nhỏ.
- Dùng project để kiểm tra kiến thức trong mô phỏng hoặc trên robot.
- Ưu tiên hiểu cách các thành phần kết nối và cùng hoạt động.

## 1. ROS 2 Core Basics

**Mục tiêu:** Hiểu “hệ thần kinh” của robot. Đây là nền tảng.

**Học:** Node, Topic, Service, Action, QoS, Launch, Package.

**Project: Pub/sub sensor giả**
Stack: `rclpy` và ROS 2 CLI.
Hoàn thành khi topic echo ra dữ liệu đúng và tần số ổn định.
Thời gian: 2–3 ngày.

**Project: Keyboard control và launch**
Stack: `teleop_twist_keyboard` và launch file.
Hoàn thành khi launch được từ 3 node cùng lúc và debug được lỗi QoS mismatch.
Thời gian: 2–3 ngày.

## 2. URDF, TF và RViz

**Mục tiêu:** Nắm hệ tọa độ trong robotics; đây là cụm kiến thức rất quan trọng.

**Học:** URDF/Xacro, TF tree, `base_link`, `robot_state_publisher`, RViz, quy ước tọa độ right-hand.

**Project: Differential drive robot model**
Stack: URDF/Xacro, `robot_state_publisher` và RViz.
Hoàn thành khi TF tree sạch, bánh xe quay đúng trục và `laser_link` ở đúng vị trí.
Thời gian: 4–6 ngày.

## 3. LiDAR, SLAM và Localization

**Mục tiêu:** Giúp robot bắt đầu “hiểu thế giới”.

**Học:** `LaserScan`, `slam_toolbox`, occupancy grid, AMCL, `rosbag2`.

**Project: Robot tự build map**
Stack: Gazebo, `slam_toolbox` và RViz.
Hoàn thành khi bản đồ bao phủ đủ phòng, TF tree sạch và lưu được bản đồ.
Thời gian: 3–5 ngày.

**Project: Save map và AMCL localization**
Stack: `map_server`, AMCL và `rosbag2`.
Hoàn thành khi robot vẫn định vị được sau khi khởi động lại và `PoseArray` hiển thị trong RViz.
Thời gian: 3–4 ngày.

## 3.5. Nav2 với odometry chính xác

**Mục tiêu:** Tách Nav2 khỏi AMCL để debug riêng odometry và điều hướng. Đây là giai đoạn cầu nối.

**Học:** Nav2 không AMCL, tune controller, cố định frame odometry.

**Project: Nav2 mượt trong Gazebo**
Stack: `nav2_bringup` (bỏ AMCL) và Gazebo.
Hoàn thành khi robot đi tới goal không rung, tránh obstacle và đã tune velocity.
Thời gian: 3–5 ngày.

## 4. Nav2, AMCL và Localization

**Mục tiêu:** Đặt goal để robot tự đi; đây là milestone lớn nhất.

**Học:** Planner, Controller, Costmap, BT Navigator, Recovery, Inflation layer.

**Project: Click goal để robot tự đi**
Stack: Nav2 đầy đủ, AMCL và Gazebo.
Hoàn thành khi robot tới goal chính xác và có thể recovery khi bị kẹt.
Thời gian: 4–6 ngày.

**Project: Navigate nhiều waypoint và né obstacle động**
Stack: Nav2 waypoint follower và costmap.
Hoàn thành khi robot né người đi ngang và hoàn thành route không bị fail.
Thời gian: 3–5 ngày.

## 4.5. `ros2_control` và Hardware Interface

**Mục tiêu:** Có thể học song song với Phase 4; phù hợp nếu muốn hướng tới vị trí thực tập.

**Học:** Controller manager, Hardware interface, `DiffDriveController`, encoder, odometry publishing.

**Project: Gazebo và `ros2_control` kết nối Nav2**
Stack: `ros2_control`, Gazebo plugin và Nav2.
Hoàn thành khi Nav2 chạy qua `ros2_control` và odometry được publish đúng.
Thời gian: 5–7 ngày.

**Project: Hardware interface thật với STM32/ESP32**
Stack: `ros2_control`, serial communication và motor driver.
Hoàn thành khi `cmd_vel` điều khiển được motor, đọc được encoder và odometry ổn định.
Thời gian: 1–2 tuần.

## 5. Robot thật hoàn chỉnh

**Mục tiêu:** Hoàn thiện full stack trên robot thật, nơi mô phỏng không còn thay thế được kiểm chứng thực tế.

**Học:** EKF sensor fusion, calibration, IMU, power management, `robot_localization`.

**Project: Full stack robot thật**
Stack: Nav2, AMCL, `ros2_control`, EKF và LiDAR.
Hoàn thành khi robot tự hành trên hardware, recovery hoạt động và localization không drift nghiêm trọng.
Thời gian: 2–4 tuần.

## 6. AI và Computer Vision (tùy chọn)

**Mục tiêu:** Chọn theo hướng nghề nghiệp mong muốn.

**Học:** OpenCV, YOLO, depth camera, Visual SLAM, semantic navigation.

**Project: Object detection và follow human**
Stack: YOLO, RealSense/ZED và ROS 2 bridge.
Hoàn thành khi robot phát hiện người và đi theo được trong môi trường thật.
Thời gian: 1–2 tuần.

## Phân bổ thời gian học

- **70% — Project:** xây dựng và thử nghiệm các project theo từng giai đoạn.
- **20% — Docs:** đọc tài liệu để hiểu API, cấu hình và cách dùng các package.
- **10% — Theory:** củng cố các khái niệm nền tảng về robotics và ROS 2.
