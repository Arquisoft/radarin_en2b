
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AboutUs extends Simulation {

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

	val headers_1 = Map("Accept" -> "image/webp,*/*")

	val headers_2 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_4 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_5 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_7 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri2 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("AboutUs")
		.exec(http("request_0")
			.get("/?code=c1d1d0c988ecf105de5f754bd5101c50&state=70cef7320819443ba232bb44ed51b534")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_1))
		.pause(2)
		.exec(http("request_2")
			.options(uri2 + "/add")
			.headers(headers_2)
			.resources(http("request_3")
			.options(uri2 + "/location/near")
			.headers(headers_2),
            http("request_4")
			.post(uri2 + "/location/near")
			.headers(headers_4)
			.body(RawFileBody("/aboutus/0004_request.json")),
            http("request_5")
			.post(uri2 + "/add")
			.headers(headers_5)
			.body(RawFileBody("/aboutus/0005_request.json")),
            http("request_6")
			.options(uri2 + "/getById")
			.headers(headers_2),
            http("request_7")
			.post(uri2 + "/getById")
			.headers(headers_7)
			.body(RawFileBody("/aboutus/0007_request.json"))))

	setUp(scn.inject(rampUsersPerSec(1) to 5 during (20 seconds))).protocols(httpProtocol)
}