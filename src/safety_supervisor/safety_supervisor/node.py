import rclpy
from rclpy.node import Node


class SafetySupervisor(Node):
    def __init__(self):
        super().__init__('safety_supervisor')
        self.get_logger().info('safety_supervisor started')


def main(args=None):
    rclpy.init(args=args)
    node = SafetySupervisor()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
