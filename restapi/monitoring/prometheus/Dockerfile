FROM prom/prometheus
ADD ./heroku/prometheus.yml /etc/prometheus/
ADD heroku-run.sh /
ENTRYPOINT ["sh /heroku-run.sh"]