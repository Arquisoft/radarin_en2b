
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AccessingRadarin extends Simulation {

	val httpProtocol = http
		.baseUrl("http://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en-US,en;q=0.5")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"If-Modified-Since" -> "Tue, 20 Apr 2021 08:27:18 GMT",
		"If-None-Match" -> """W/"c05-178ee640e70"""",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map(
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Tue, 20 Apr 2021 08:27:18 GMT",
		"If-None-Match" -> """W/"23f-178ee640e70"""")

	val headers_2 = Map(
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Tue, 20 Apr 2021 08:27:18 GMT",
		"If-None-Match" -> """W/"9b691-178ee640e70"""")

	val headers_3 = Map(
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Tue, 20 Apr 2021 08:27:18 GMT",
		"If-None-Match" -> """W/"13c75-178ee640e70"""")



	val scn = scenario("AccessingRadarin")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0)
			.resources(http("request_1")
			.get("/static/css/main.6dea0f05.chunk.css.map")
			.headers(headers_1),
            http("request_2")
			.get("/static/css/2.d5b8b7d2.chunk.css.map")
			.headers(headers_2),
            http("request_3")
			.get("/static/js/main.66404107.chunk.js.map")
			.headers(headers_3)))

	setUp(scn.inject(constantUsersPerSec(20) during (60 seconds) randomized).protocols(httpProtocol)
}