FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD 522123
ENV MYSQL_ROOT_HOST: '%'
ENV MYSQL_DATABASE notes
ENV MYSQL_USER fengjin
ENV MYSQL_PASSWORD 6674757

VOLUME ["./data","/var/lib/mysql"]


# COPY  ./init.sql /docker-entrypoint-initdb.d/

# 暴露端口
EXPOSE 3306
 
# 启动MySQL服务
CMD ["mysqld"]