
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginFirstTime extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen2bwebapp.herokuapp.com")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*detectportal\.firefox\.com.*"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0")

	val headers_0 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"Content-Type" -> "application/ocsp-request")

	val headers_2 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_3 = Map(
		"Content-Type" -> "application/json; charset=UTF-8",
		"Origin" -> "null")

	val headers_4 = Map("Accept" -> "image/webp,*/*")

    val uri1 = "http://r3.o.lencr.org"
    val uri2 = "https://www.googleapis.com/geolocation/v1/geolocate"

	val scn = scenario("LoginFirstTime")
		.exec(http("request_0")
			.post(uri1 + "/")
			.headers(headers_0)
			.body(RawFileBody("/loginfirsttime/0000_request.dat"))
			.resources(http("request_1")
			.post(uri1 + "/")
			.headers(headers_0)
			.body(RawFileBody("/loginfirsttime/0001_request.dat"))))
		.pause(32)
		.exec(http("request_2")
			.get("/?code=95b6494091b9485d6cf3f515321fc2a3&state=405276fd1a0246869c1427e9e96722d7")
			.headers(headers_2))
		.pause(4)
		.exec(http("request_3")
			.post(uri2 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_3)
			.body(RawFileBody("/loginfirsttime/0003_request.json")))
		.pause(22)
		.exec(http("request_4")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_4)
			.resources(http("request_5")
			.post(uri2 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_3)
			.body(RawFileBody("/loginfirsttime/0005_request.json"))))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}