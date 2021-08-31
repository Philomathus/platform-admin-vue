FROM 77tv/nginx:1.18.0

COPY dist/ /opt/platform-admin-vue/

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR /opt/platform-admin-vue
