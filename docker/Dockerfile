# Môi trường dev chung cho cả team: Ubuntu 22.04 + ROS 2 Humble + Nav2 + Gazebo.
# Ảnh khá nặng (vài GB) ở lần build đầu.
FROM osrf/ros:humble-desktop

ENV DEBIAN_FRONTEND=noninteractive \
    TURTLEBOT3_MODEL=burger

RUN apt-get update && apt-get install -y --no-install-recommends \
        ros-humble-navigation2 \
        ros-humble-nav2-bringup \
        ros-humble-slam-toolbox \
        ros-humble-turtlebot3-gazebo \
        ros-humble-turtlebot3-navigation2 \
        python3-colcon-common-extensions \
        python3-pip \
        mpg123 \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir paho-mqtt awsiotsdk

WORKDIR /ws

# Tự nạp môi trường ROS 2 (và workspace nếu đã build) mỗi khi mở shell
RUN echo "source /opt/ros/humble/setup.bash" >> /root/.bashrc \
 && echo "[ -f /ws/install/setup.bash ] && source /ws/install/setup.bash" >> /root/.bashrc

CMD ["bash"]
