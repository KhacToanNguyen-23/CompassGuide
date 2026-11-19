from setuptools import find_packages, setup

package_name = 'safety_supervisor'

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
    description='Giam sat an toan: vat can, watchdog, dung khan cap',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            package_name + ' = ' + package_name + '.node:main',
        ],
    },
)
