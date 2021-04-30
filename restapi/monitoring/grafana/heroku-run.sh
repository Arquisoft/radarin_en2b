sed -i -e 's|<HTTP_PORT>|'$PORT'|' /etc/grafana/grafana.ini
sed -i -e 's|http://prometheus:9090|https://radarinen2bprometheus.heroku.com|' /etc/grafana/provisioning/datasources/datasource.yml
/run.sh