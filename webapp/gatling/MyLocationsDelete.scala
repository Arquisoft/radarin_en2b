
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class MyLocationsDelete extends Simulation {

	val httpProtocol = http
		.baseUrl("https://www.googleapis.com")
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

	val headers_3 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_4 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_7 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_8 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri2 = "https://radarinen2bwebapp.herokuapp.com"
    val uri3 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("MyLocationsDelete")
		.exec(http("request_0")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_0)
			.body(RawFileBody("/mylocationsdelete/0000_request.json"))
			.resources(http("request_1")
			.get(uri2 + "/?code=eabd99895dc0cb2e9e742362f8fb86fa&state=e80c22fee1214e139e2e3a5e78a34fc3")
			.headers(headers_1)))
		.pause(2)
		.exec(http("request_2")
			.get(uri2 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(3)
		.exec(http("request_3")
			.options(uri3 + "/add")
			.headers(headers_3)
			.resources(http("request_4")
			.post(uri3 + "/add")
			.headers(headers_4)
			.body(RawFileBody("/mylocationsdelete/0004_request.json")),
            http("request_5")
			.options(uri3 + "/getById")
			.headers(headers_3),
            http("request_6")
			.options(uri3 + "/location/near")
			.headers(headers_3),
            http("request_7")
			.post(uri3 + "/getById")
			.headers(headers_7)
			.body(RawFileBody("/mylocationsdelete/0007_request.json")),
            http("request_8")
			.post(uri3 + "/location/near")
			.headers(headers_8)
			.body(RawFileBody("/mylocationsdelete/0008_request.json"))))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}