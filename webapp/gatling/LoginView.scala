
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginView extends Simulation {

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

    val uri1 = "https://www.googleapis.com/geolocation/v1/geolocate"

	val scn = scenario("LoginView")
		.exec(http("request_0")
			.get("/?code=a7596988b259d1e3e3ad8b2fe5956f59&state=1d979af4af5e42258654e6fb0b140809")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri1 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/loginview/0001_request.json")))
		.pause(2)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))

	setUp(scn.inject(rampUsersPerSec(1) to 5 during (20 seconds))).protocols(httpProtocol)
}