
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MyTagsList extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_2 = Map("Accept" -> "image/webp,*/*")

    val uri1 = "https://www.googleapis.com/geolocation/v1/geolocate"

	val scn = scenario("MyTagsList")
		.exec(http("request_0")
			.post(uri1 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_0)
			.body(RawFileBody("/mytagslist/0000_request.json")))
		.pause(1)
		.exec(http("request_1")
			.get("/?code=eb77211d4867b1aa301cc0d3e1c5325b&state=098f0b93b0804114b4725b5f2daa3f29")
			.headers(headers_1))
		.pause(5)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}