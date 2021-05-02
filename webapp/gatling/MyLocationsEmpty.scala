
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MyLocationsEmpty extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2brestapi.herokuapp.com")
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

	val headers_2 = Map(
		"Accept" -> "image/webp,*/*",
		"If-Modified-Since" -> "Sat, 01 May 2021 15:11:44 GMT",
		"If-None-Match" -> """W/"a48-179287c4780"""")

	val headers_3 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_4 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_6 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_8 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://www.googleapis.com/geolocation/v1/geolocate"
    val uri2 = "https://radarinen2bwebapp.herokuapp.com"

	val scn = scenario("MyLocationsEmpty")
		.exec(http("request_0")
			.get(uri2 + "/?code=53b32d410516ccc8d6f5e80a3c106d97&state=73ba983e9501456cba00c9962d8231fb")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri1 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/mylocationsempty/0001_request.json")))
		.pause(2)
		.exec(http("request_2")
			.get(uri2 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(3)
		.exec(http("request_3")
			.options("/api/users/add")
			.headers(headers_3)
			.resources(http("request_4")
			.post("/api/users/add")
			.headers(headers_4)
			.body(RawFileBody("/mylocationsempty/0004_request.json")),
            http("request_5")
			.options("/api/users/getById")
			.headers(headers_3),
            http("request_6")
			.post("/api/users/getById")
			.headers(headers_6)
			.body(RawFileBody("/mylocationsempty/0006_request.json")),
            http("request_7")
			.options("/api/users/location/near")
			.headers(headers_3),
            http("request_8")
			.post("/api/users/location/near")
			.headers(headers_8)
			.body(RawFileBody("/mylocationsempty/0008_request.json"))))
		.pause(5)
		.exec(http("request_9")
			.options("/api/users/location/near")
			.headers(headers_3)
			.resources(http("request_10")
			.post("/api/users/location/near")
			.headers(headers_8)
			.body(RawFileBody("/mylocationsempty/0010_request.json"))))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}