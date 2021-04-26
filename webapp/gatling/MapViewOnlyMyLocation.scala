
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MapViewOnlyMyLocation extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("image/webp,*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_2 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """W/"1b7c7b52d8d37ee2a29b408ea9b35f63"""")

	val headers_3 = Map(
		"Accept" -> "*/*",
		"Cache-Control" -> "no-cache",
		"Pragma" -> "no-cache")

	val headers_6 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_7 = Map(
		"Accept" -> "*/*",
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_8 = Map("Accept" -> "*/*")

	val headers_10 = Map(
		"Accept" -> "*/*",
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_12 = Map(
		"Accept" -> "*/*",
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_51 = Map("Accept" -> "text/css,*/*;q=0.1")

    val uri1 = "https://maps.googleapis.com/maps"
    val uri2 = "https://aus5.mozilla.org/update/3/SystemAddons/87.0/20210318103112/WINNT_x86_64-msvc-x64/es-ES/release/Windows_NT%2010.0.0.0.19042.928%20(x64)/default/default/update.xml"
    val uri3 = "https://services.addons.mozilla.org/api/v4/addons/search"
    val uri5 = "https://radarinen2brestapi.herokuapp.com/api/users"
    val uri6 = "https://fonts.googleapis.com/css"
    val uri7 = "https://versioncheck-bg.addons.mozilla.org/update/VersionCheck.php"
    val uri8 = "https://www.googleapis.com/geolocation/v1/geolocate"

	val scn = scenario("MapViewOnlyMyLocation")
		.exec(http("request_0")
			.post(uri8 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_0)
			.body(RawFileBody("/mapviewonlymylocation/0000_request.json")))
		.pause(1)
		.exec(http("request_1")
			.get("/?code=6311d33dbfec25866112927dfd2c6f02&state=5a0fce3603d347bfb3aabee63f6925dd")
			.headers(headers_1))
		.pause(2)
		.exec(http("request_2")
			.get(uri3 + "/?guid=%7Bc5f935cf-9b17-4b85-bed8-9277861b4116%7D%2Cgoogle%40search.mozilla.org%2Cbing%40search.mozilla.org%2Cdrae%40search.mozilla.org%2Cddg%40search.mozilla.org%2Cebay%40search.mozilla.org%2Cwikipedia%40search.mozilla.org%2Cfirefox-alpenglow%40mozilla.org%2Cdefault-theme%40mozilla.org%2Cfirefox-compact-light%40mozilla.org%2Cfirefox-compact-dark%40mozilla.org&lang=es-ES")
			.headers(headers_2)
			.resources(http("request_3")
			.get(uri7 + "?reqVersion=2&id={c5f935cf-9b17-4b85-bed8-9277861b4116}&version=0.1.6&maxAppVersion=*&status=userEnabled&appID={ec8030f7-c20a-464f-9b0e-13a3a9e97384}&appVersion=87.0&appOS=WINNT&appABI=x86_64-msvc&locale=es-ES&currentAppVersion=87.0&updateType=112&compatMode=normal")
			.headers(headers_3),
            http("request_4")
			.get(uri2)
			.headers(headers_3)))
		.pause(2)
		.exec(http("request_5")
			.get("/static/media/logo.6ce24c58.svg"))
		.pause(2)
		.exec(http("request_6")
			.options(uri5 + "/add")
			.headers(headers_6)
			.resources(http("request_7")
			.post(uri5 + "/add")
			.headers(headers_7)
			.body(RawFileBody("/mapviewonlymylocation/0007_request.json")),
            http("request_8")
			.get(uri1 + "/api/js?callback=__googleMapsCallback&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&libraries=places&v=weekly")
			.headers(headers_8),
            http("request_9")
			.options(uri5 + "/getById")
			.headers(headers_6),
            http("request_10")
			.post(uri5 + "/getById")
			.headers(headers_10)
			.body(RawFileBody("/mapviewonlymylocation/0010_request.json")),
            http("request_11")
			.options(uri5 + "/location/near")
			.headers(headers_6),
            http("request_12")
			.post(uri5 + "/location/near")
			.headers(headers_12)
			.body(RawFileBody("/mapviewonlymylocation/0012_request.json")),
            http("request_13")
			.get(uri1 + "/gen_204?target=api&ev=api_map_style&pb=!1i1619129551!2s3.44.11a!4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY!6m2!1i100!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ"),
            http("request_14")
			.get(uri1 + "/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.51019860539582&2d-5.7217486295359725&2m2&1d43.53858756306478&2d-5.632918665216992&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._k8hn3d&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=10072")
			.headers(headers_8),
            http("request_15")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31733!3i23950!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=8192"),
            http("request_16")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31733!3i23949!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=2639"),
            http("request_17")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31734!3i23950!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=36736"),
            http("request_18")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31735!3i23951!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=90964"),
            http("request_19")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31733!3i23951!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=33876"),
            http("request_20")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31734!3i23951!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=62420"),
            http("request_21")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31734!3i23949!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=31183"),
            http("request_22")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31735!3i23950!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=65280"),
            http("request_23")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31732!3i23948!4i256!2m3!1e0!2sm!3i554277160!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=107037"),
            http("request_24")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31732!3i23951!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=5332"),
            http("request_25")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31732!3i23950!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=110719"),
            http("request_26")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31732!3i23949!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=105166"),
            http("request_27")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31735!3i23949!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=59727"),
            http("request_28")
			.post(uri5 + "/location/near")
			.headers(headers_12)
			.body(RawFileBody("/mapviewonlymylocation/0028_request.json")),
            http("request_29")
			.get(uri1 + "/vt?pb=!1m4!1m3!1i16!2i31736!3i23951!1m4!1m3!1i16!2i31737!3i23950!1m4!1m3!1i16!2i31737!3i23951!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e3!12m1!5b1&callback=_xdc_._k4b4f&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=46303")
			.headers(headers_8),
            http("request_30")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31733!3i23948!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=108026"),
            http("request_31")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31734!3i23948!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=5499"),
            http("request_32")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31736!3i23948!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=62587"),
            http("request_33")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31735!3i23948!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=34043"),
            http("request_34")
			.get(uri1 + "/vt?pb=!1m4!1m3!1i16!2i31731!3i23948!1m4!1m3!1i16!2i31731!3i23949!1m4!1m3!1i16!2i31731!3i23950!1m4!1m3!1i16!2i31731!3i23951!1m4!1m3!1i16!2i31732!3i23948!1m4!1m3!1i16!2i31732!3i23949!1m4!1m3!1i16!2i31733!3i23948!1m4!1m3!1i16!2i31733!3i23949!1m4!1m3!1i16!2i31732!3i23950!1m4!1m3!1i16!2i31732!3i23951!1m4!1m3!1i16!2i31733!3i23950!1m4!1m3!1i16!2i31733!3i23951!1m4!1m3!1i16!2i31734!3i23948!1m4!1m3!1i16!2i31734!3i23949!1m4!1m3!1i16!2i31735!3i23948!1m4!1m3!1i16!2i31735!3i23949!1m4!1m3!1i16!2i31734!3i23950!1m4!1m3!1i16!2i31734!3i23951!1m4!1m3!1i16!2i31735!3i23950!1m4!1m3!1i16!2i31735!3i23951!1m4!1m3!1i16!2i31736!3i23948!1m4!1m3!1i16!2i31736!3i23949!1m4!1m3!1i16!2i31737!3i23948!1m4!1m3!1i16!2i31737!3i23949!1m4!1m3!1i16!2i31736!3i23950!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e3!12m1!5b1&callback=_xdc_._l8ncv9&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=104125")
			.headers(headers_8),
            http("request_35")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31731!3i23950!4i256!2m3!1e0!2sm!3i554277004!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=104530"),
            http("request_36")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31731!3i23951!4i256!2m3!1e0!2sm!3i554277004!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=130214"),
            http("request_37")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31731!3i23949!4i256!2m3!1e0!2sm!3i554277160!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=104177"),
            http("request_38")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31736!3i23950!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=93824"),
            http("request_39")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31736!3i23949!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=88271"),
            http("request_40")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31731!3i23948!4i256!2m3!1e0!2sm!3i554277160!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=78493"),
            http("request_41")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31736!3i23951!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=119508"),
            http("request_42")
			.get(uri1 + "/gen_204?target=api&ev=api_snap&cad=host:radarinen2bwebapp.herokuapp.com,v:44,r:100,key:AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY,t:0-598,Mm-p:1,Mm-h:1,Om-p:1,Om-h:1,Om-v:1,Om-vh:1,src:apiv3,token:3pnbgrr1xd,ts:tfxi99"),
            http("request_43")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31737!3i23950!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=122368"),
            http("request_44")
			.get(uri1 + "/gen_204?target=api&ev=api_mapft&cad=host:radarinen2bwebapp.herokuapp.com,v:44,r:100,key:AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY,Mm:1,Tm:1,Ts:1,Ramk:1,Om:1,hybrid:0,src:apiv3,token:3pnbgrr1xd,ts:tfxi9a"),
            http("request_45")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31737!3i23951!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=16981"),
            http("request_46")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31737!3i23948!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=91131"),
            http("request_47")
			.get(uri1 + "/vt?pb=!1m5!1m4!1i16!2i31737!3i23949!4i256!2m3!1e0!2sm!3i554277196!3m17!2ses-ES!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjZ8cC5zOjQzfHAubDotMTF8cC5oOiMwMDg4ZmYscy50OjN8cy5lOmcuZnxwLmg6I2ZmMDAwMHxwLnM6LTEwMHxwLmw6OTkscy50OjN8cy5lOmcuc3xwLmM6I2ZmODA4MDgwfHAubDo1NCxzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZWNlMmQ5LHMudDo0MHxzLmU6Zy5mfHAuYzojZmZjY2RjYTEscy50OjN8cy5lOmwudC5mfHAuYzojZmY3Njc2NzYscy50OjN8cy5lOmwudC5zfHAuYzojZmZmZmZmZmYscy50OjJ8cC52Om9mZixzLnQ6ODJ8cy5lOmcuZnxwLnY6b258cC5jOiNmZmI4Y2I5MyxzLnQ6NDB8cC52Om9uLHMudDozOXxwLnY6b24scy50OjM2fHAudjpvbixzLnQ6MzN8cC52OnNpbXBsaWZpZWQ!4e0&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=116815"),
            http("request_48")
			.get(uri1 + "/gen_204?target=api&ev=api_snap&cad=host:radarinen2bwebapp.herokuapp.com,v:44,r:100,key:AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY,t:1-1607,Mm-p:1,Mm-h:1,Om-p:1,Om-h:1,Om-v:1,Om-vh:1,src:apiv3,token:3pnbgrr1xd,ts:tfxj1c"),
            http("request_49")
			.get(uri1 + "/api/js/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2Fmap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._6jg7ln&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=25068")
			.headers(headers_8),
            http("request_50")
			.get(uri1 + "/api/js/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2Fmap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7stfxj70&10e1&callback=_xdc_._hx7a23&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=67652")
			.headers(headers_8),
            http("request_51")
			.get(uri6 + "?family=Roboto:300,400,500,700|Google+Sans:400,500,700|Google+Sans+Text:400")
			.headers(headers_51),
            http("request_52")
			.get(uri1 + "/gen_204?target=api&ev=api_mapft&cad=host:radarinen2bwebapp.herokuapp.com,v:44,r:100,key:AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY,Czn:1,Cpn:1,Crn:1,Cvn:1,Rs:1,Cmn:1,Cdn:1,hybrid:0,src:apiv3,token:3pnbgrr1xd,ts:tfxjp5")))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}