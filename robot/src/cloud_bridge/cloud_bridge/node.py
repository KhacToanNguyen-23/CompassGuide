import rclpy
from rclpy.node import Node


class CloudBridge(Node):
    def __init__(self):
        super().__init__('cloud_bridge')
        self.get_logger().info('cloud_bridge started')


def main(args=None):
    rclpy.init(args=args)
    node = CloudBridge()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
