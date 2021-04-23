
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MyTagsSearchOK extends Simulation {

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

	val headers_1 = Map("Accept" -> "image/webp,*/*")

	val headers_2 = Map(
		"Access-Control-Request-Headers" -> "content-type",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_3 = Map(
		"Content-Type" -> "application/json",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_5 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_6 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://radarinen2bwebapp.herokuapp.com"

	val scn = scenario("MyTagsSearchOK")
		.exec(http("request_0")
			.get(uri1 + "/?code=a1cf4344ccfc1f67b521a80db03f275b&state=a9384359c1274cfcb7e5389042ad9c19")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.get(uri1 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_1))
		.pause(2)
		.exec(http("request_2")
			.options("/api/users/add")
			.headers(headers_2)
			.resources(http("request_3")
			.post("/api/users/add")
			.headers(headers_3)
			.body(RawFileBody("/mytagssearchok/0003_request.json")),
            http("request_4")
			.options("/api/users/location/near")
			.headers(headers_2),
            http("request_5")
			.options("/api/users/getById")
			.headers(headers_5),
            http("request_6")
			.post("/api/users/getById")
			.headers(headers_6)
			.body(RawFileBody("/mytagssearchok/0006_request.json")),
            http("request_7")
			.post("/api/users/location/near")
			.headers(headers_3)
			.body(RawFileBody("/mytagssearchok/0007_request.json"))))
		.pause(6)
		.exec(http("request_8")
			.options("/api/users/location/near")
			.headers(headers_2))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}