FROM nginx:1.25-alpine

# Create a new user and group
RUN addgroup -S nginxuser && adduser -S nginxuser -G nginxuser

# Set the ownership of necessary directories to the new user
RUN chown -R nginxuser:nginxuser /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d

# Switch to the new user
USER nginxuser

# Remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the necessary files
COPY ./nginx/templates /etc/nginx/templates
COPY ./build/ /usr/share/nginx/html

# Set the environment variable
ENV TOGGLES=""

# Healthcheck command
HEALTHCHECK --interval=5s --timeout=30s --start-period=5s --retries=6 \
  CMD wget --no-check-certificate -O /dev/null https://${SERVER_NAME} || exit 1
