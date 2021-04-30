FROM prom/prometheus
ADD ./heroku/prometheus.yml /etc/prometheus/
ADD heroku-run.sh /
ENTRYPOINT ["bash /heroku-run.sh"]