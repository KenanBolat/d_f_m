from setuptools import setup, find_packages

setup(
    name='dataconverter',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        'linker>=1.7.0',
        'certifi>=2023.11.17',
        'charset-normalizer>=3.3.2',
        'click>=8.1.7',
        'Flask>=3.0.0',
        'idna>=3.6',
        'itsdangerous>=2.1.2',
        'Jinja2>=3.1.2',
        'MarkupSafe>=2.1.3',
        'pika>=1.3.2',
        'pytz>=2023.3.post1',
        'requests>=2.31.0',
        'six>=1.16.0',
        'tzlocal>=5.2',
        'urllib3>=2.1.0',
        'uWSGI>=2.0.23',
        'Werkzeug>=3.0.1',
    ],
    # TMET Sofware Development Team
    author='TMET',
    # TMET software development kit SDK
)
