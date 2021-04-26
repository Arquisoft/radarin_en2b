
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginAndLogout extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_1 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_3 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_4 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_5 = Map(
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_6 = Map(
		"Accept" -> "image/webp,*/*",
		"If-Modified-Since" -> "Thu, 22 Apr 2021 20:21:19 GMT",
		"If-None-Match" -> """W/"a48-178fb3e7a18"""")

    val uri1 = "https://www.googleapis.com/geolocation/v1/geolocate"
    val uri3 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("LoginAndLogout")
		.exec(http("request_0")
			.options(uri3 + "/add")
			.headers(headers_0)
			.resources(http("request_1")
			.post(uri3 + "/add")
			.headers(headers_1)
			.body(RawFileBody("/loginandlogout/0001_request.json")),
            http("request_2")
			.options(uri3 + "/getById")
			.headers(headers_0),
            http("request_3")
			.post(uri3 + "/getById")
			.headers(headers_3)
			.body(RawFileBody("/loginandlogout/0003_request.json"))))
		.pause(1)
		.exec(http("request_4")
			.get("/?code=51f065caaa634fcf77f26bced0c4f26a&state=e25ecc914edf41a79450206202d01acc")
			.headers(headers_4))
		.pause(2)
		.exec(http("request_5")
			.post(uri1 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_5)
			.body(RawFileBody("/loginandlogout/0005_request.json")))
		.pause(2)
		.exec(http("request_6")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_6))

	setUp(scn.inject(rampUsersPerSec(1) to 5 during (20 seconds))).protocols(httpProtocol)
}