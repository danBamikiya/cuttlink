# nginx as a reverse proxy to our server
FROM nginx:1.18-alpine as server-proxy
# remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]