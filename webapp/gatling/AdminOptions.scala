
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AdminOptions extends Simulation {

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
    val uri3 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("AdminOptions")
		.exec(http("request_0")
			.get("/?code=d041204dbab7910ccf97740f3da556a3&state=ec376ba246fb401aa5c1790661f66249")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri1 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/adminoptions/0001_request.json")))
		.pause(1)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(4)
		.exec(http("request_3")
			.options(uri3 + "/add")
			.headers(headers_3)
			.resources(http("request_4")
			.post(uri3 + "/add")
			.headers(headers_4)
			.body(RawFileBody("/adminoptions/0004_request.json")),
            http("request_5")
			.options(uri3 + "/getById")
			.headers(headers_3),
            http("request_6")
			.post(uri3 + "/getById")
			.headers(headers_6)
			.body(RawFileBody("/adminoptions/0006_request.json")),
            http("request_7")
			.options(uri3 + "/location/near")
			.headers(headers_3),
            http("request_8")
			.post(uri3 + "/location/near")
			.headers(headers_8)
			.body(RawFileBody("/adminoptions/0008_request.json"))))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}