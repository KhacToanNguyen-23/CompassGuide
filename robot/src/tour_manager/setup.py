from setuptools import find_packages, setup

package_name = 'tour_manager'

setup(
    name=package_name,
    version='0.0.1',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='CompassGuide Team',
    maintainer_email='team@example.com',
    description='Quan ly tour: may trang thai, di toi tung diem',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            package_name + ' = ' + package_name + '.node:main',
        ],
    },
)
