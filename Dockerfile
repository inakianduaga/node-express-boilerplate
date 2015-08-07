#
# Run/build server inside docker nodejs container
#

FROM node:0.10.40
MAINTAINER Inaki Anduaga <inaki@inakianduaga.com>

# Update npm to the latest version
RUN npm install npm -g

# Install tsd typescript definitions manager
RUN npm install tsd -g

WORKDIR /app
VOLUME /app

EXPOSE 3000

ENTRYPOINT ["node", "./node_modules/gulp/bin/gulp.js"]
CMD ["--help"]

# Disable gulp-notify notifications
ENV DISABLE_NOTIFIER=true