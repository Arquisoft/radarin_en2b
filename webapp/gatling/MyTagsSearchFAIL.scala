
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MyTagsSearchFAIL extends Simulation {

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
		"Access-Control-Request-Headers" -> "content-type",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_3 = Map(
		"Content-Type" -> "application/json",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_4 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_5 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri2 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("MyTagsSearchFAIL")
		.exec(http("request_0")
			.get("/?code=7870e1e785a11484004c7ec3383bb75c&state=98896926c499443fae519fbf0a5cb9c7")
			.headers(headers_0))
		.pause(3)
		.exec(http("request_1")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_1))
		.pause(3)
		.exec(http("request_2")
			.options(uri2 + "/add")
			.headers(headers_2)
			.resources(http("request_3")
			.post(uri2 + "/add")
			.headers(headers_3)
			.body(RawFileBody("/mytagssearchfail/0003_request.json")),
            http("request_4")
			.options(uri2 + "/getById")
			.headers(headers_4),
            http("request_5")
			.post(uri2 + "/getById")
			.headers(headers_5)
			.body(RawFileBody("/mytagssearchfail/0005_request.json")),
            http("request_6")
			.options(uri2 + "/location/near")
			.headers(headers_2),
            http("request_7")
			.post(uri2 + "/location/near")
			.headers(headers_3)
			.body(RawFileBody("/mytagssearchfail/0007_request.json"))))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}