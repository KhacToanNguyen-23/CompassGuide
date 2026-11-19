import rclpy
from rclpy.node import Node


class TourManager(Node):
    def __init__(self):
        super().__init__('tour_manager')
        self.get_logger().info('tour_manager started')


def main(args=None):
    rclpy.init(args=args)
    node = TourManager()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
