FROM prom/prometheus
ADD heroku/prometheus.yml /etc/prometheus/
ADD heroku/heroku-run.sh /
ENTRYPOINT ["/heroku-run.sh"]