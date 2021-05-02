
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AdminOptionGrafana extends Simulation {

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
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_8 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_10 = Map(
		"Accept" -> "application/json, text/plain, */*",
		"x-grafana-org-id" -> "1")

    val uri1 = "https://radarinen2bgrafana.herokuapp.com"
    val uri2 = "https://www.googleapis.com/geolocation/v1/geolocate"
    val uri4 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("AdminOptionGrafana")
		.exec(http("request_0")
			.get("/?code=c2f002c75c82c1d965fc14ef22020236&state=0b580649ab42449a81e15d47110dc6c5")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri2 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/adminoptiongrafana/0001_request.json")))
		.pause(2)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(3)
		.exec(http("request_3")
			.options(uri4 + "/add")
			.headers(headers_3)
			.resources(http("request_4")
			.post(uri4 + "/add")
			.headers(headers_4)
			.body(RawFileBody("/adminoptiongrafana/0004_request.json")),
            http("request_5")
			.options(uri4 + "/location/near")
			.headers(headers_3),
            http("request_6")
			.post(uri4 + "/location/near")
			.headers(headers_6)
			.body(RawFileBody("/adminoptiongrafana/0006_request.json")),
            http("request_7")
			.options(uri4 + "/getById")
			.headers(headers_3),
            http("request_8")
			.post(uri4 + "/getById")
			.headers(headers_8)
			.body(RawFileBody("/adminoptiongrafana/0008_request.json"))))
		.pause(1)
		.exec(http("request_9")
			.get(uri1 + "/")
			.headers(headers_0)
			.resources(http("request_10")
			.get(uri1 + "/api/dashboards/home")
			.headers(headers_10),
            http("request_11")
			.get(uri1 + "/api/search?limit=1")
			.headers(headers_10),
            http("request_12")
			.get(uri1 + "/api/plugins?embedded=0&core=0")
			.headers(headers_10),
            http("request_13")
			.get(uri1 + "/api/search?limit=30")
			.headers(headers_10),
            http("request_14")
			.get(uri1 + "/api/search?limit=30&starred=true")
			.headers(headers_10)))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}