import rclpy
from rclpy.node import Node


class AudioPlayer(Node):
    def __init__(self):
        super().__init__('audio_player')
        self.get_logger().info('audio_player started')


def main(args=None):
    rclpy.init(args=args)
    node = AudioPlayer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
