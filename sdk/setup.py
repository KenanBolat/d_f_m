from setuptools import setup, find_packages

setup(
    name='dataconverter',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        'Flask>=3.0.0',
        'pika>=1.3.2',
        'requests>=2.31.0',
    ],
    # TMET Sofware Development Team
    author='TMET',
    # TMET software development kit SDK
)
