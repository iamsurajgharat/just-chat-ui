FROM nginx:alpine
# copy built dist into the nginx directory
COPY dist/just-chat-ui /usr/share/nginx/html