
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LocationsMap extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map(
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_2 = Map("Accept" -> "image/webp,*/*")

	val headers_4 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_5 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_8 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_9 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://maps.googleapis.com/maps/api/js/ViewportInfoService.GetViewportInfo"
    val uri2 = "https://www.googleapis.com/geolocation/v1/geolocate"
    val uri4 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("LocationsMap")
		.exec(http("request_0")
			.get("/?code=0f7a0e0f258061fd46c22d4eb0b6c943&state=3d66a657f73946f09edd596c1b5eb654")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri2 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/locationsmap/0001_request.json")))
		.pause(2)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(2)
		.exec(http("request_3")
			.get(uri1 + "?1m6&1m2&1d43.510205673818135&2d-5.721749559059094&2m2&1d43.538594636099&2d-5.632919580309298&2u16&4ses-ES&5e0&6sm%40555000000&7b0&8e0&12e2&callback=_xdc_._em11iz&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=24913"))
		.pause(1)
		.exec(http("request_4")
			.options(uri4 + "/add")
			.headers(headers_4)
			.resources(http("request_5")
			.post(uri4 + "/add")
			.headers(headers_5)
			.body(RawFileBody("/locationsmap/0005_request.json")),
            http("request_6")
			.options(uri4 + "/getById")
			.headers(headers_4),
            http("request_7")
			.options(uri4 + "/location/near")
			.headers(headers_4),
            http("request_8")
			.post(uri4 + "/getById")
			.headers(headers_8)
			.body(RawFileBody("/locationsmap/0008_request.json")),
            http("request_9")
			.post(uri4 + "/location/near")
			.headers(headers_9)
			.body(RawFileBody("/locationsmap/0009_request.json"))))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}