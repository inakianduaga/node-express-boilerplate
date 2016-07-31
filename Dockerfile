#
# Run/build server inside docker nodejs container
#

FROM node:5
MAINTAINER Inaki Anduaga <inaki@inakianduaga.com>

# Update npm to the latest version
#RUN npm install npm -g

# Install tsd typescript definitions manager
RUN npm install typings@1.3.2 -g

# Install pm2 globally
RUN npm install pm2@1.1.3 -g

WORKDIR /app
VOLUME /app

EXPOSE 3000

ENTRYPOINT ["node", "./node_modules/gulp/bin/gulp.js"]
CMD ["--help"]

# Disable gulp-notify notifications
ENV DISABLE_NOTIFIER=true

# enable color in terminal
ENV TERM=xterm-256color
