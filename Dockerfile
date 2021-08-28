FROM 77tv/nginx:1.18.0

COPY dist/ /opt/platform-admin-vue/

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

WORKDIR /opt/platform-admin-vue
