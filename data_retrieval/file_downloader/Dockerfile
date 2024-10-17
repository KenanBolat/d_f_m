# Stage 1: Build Dependencies
FROM python:3.11-slim-bullseye as builder

WORKDIR /build

# Install necessary build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends --no-install-suggests \
    git wget build-essential libhdf5-serial-dev netcdf-bin libnetcdf-dev

# Clone and install the first repository
RUN git clone https://github.com/KenanBolat/tmet_sdk.git && \
    cd tmet_sdk && \
    python setup.py install

# Clone and build the second repository
RUN git clone https://gitlab.eumetsat.int/open-source/PublicDecompWT.git && \
    cd PublicDecompWT/xRITDecompress && \
    make -f Makefile && \
    make install

# Install miniconda
ENV CONDA_DIR /opt/conda
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py39_23.5.2-0-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda

ENV PATH=$CONDA_DIR/bin:$PATH

# Install Python dependencies in builder
COPY ./requirements.txt /build/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install wheel && \
    pip install --no-cache-dir -r /build/requirements.txt

# Stage 2: Production Image
FROM python:3.11-slim-bullseye

WORKDIR /app

# Copy dependencies and tools from builder
COPY --from=builder /opt/conda /opt/conda
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /usr/lib /usr/lib


# Copy application files
COPY ./server.py ./server.py
COPY ./converter.py ./converter.py
COPY ./consumer.py ./consumer.py
COPY ./temp_remover.sh ./temp_remover.sh
COPY ./temp_remover.sh /etc/cron.d/temp_remover
COPY ./dataconverter/ ./dataconverter
COPY ./requirements.txt/ /app/requirements.txt

# Set environment variables
ENV CONDA_DIR /opt/conda
ENV PATH=$CONDA_DIR/bin:$PATH
ENV PYTHONUNBUFFERED=1


# Install runtime dependencies only
RUN apt-get update && apt-get install -y --no-install-recommends wget iputils-ping cron && \
    rm -rf /var/lib/apt/lists/*

# Install miniconda again for consistency
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py39_23.5.2-0-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -u -p /opt/conda

# Reinstall Python libraries in the final stage
RUN $CONDA_DIR/bin/pip install --no-cache-dir --upgrade pip && \
    $CONDA_DIR/bin/pip install wheel && \
    $CONDA_DIR/bin/pip install --no-cache-dir -r /app/requirements.txt

# Setup cron and permissions
RUN chmod +x /app/temp_remover.sh && \
    touch /var/log/cron.log && \
    (crontab -l 2>/dev/null; echo "*/10 * * * * /app/temp_remover.sh >> /var/log/cron.log 2>&1") | crontab -

# Expose the required port
EXPOSE 3003

# Set entrypoint
ENTRYPOINT ["bash", "-c", "python server.py & python consumer.py & cron && tail -f /dev/null"]
