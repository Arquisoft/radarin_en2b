
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class TagsMap extends Simulation {

	val httpProtocol = http
		.baseUrl("https://www.googleapis.com")
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

	val headers_4 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_6 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/add",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_9 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/getById",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

	val headers_10 = Map(
		"Access-Control-Allow-Origin" -> "http://localhost:5000/api/users/location/near",
		"Content-Type" -> "application/json",
		"Control-Allow-Methods" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://maps.googleapis.com/maps/api/js"
    val uri3 = "https://radarinen2bwebapp.herokuapp.com"
    val uri4 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("TagsMap")
		.exec(http("request_0")
			.get(uri3 + "/?code=bbd1e1c38731a3df76663eb3c7dc589a&state=127de71fce9644a09a6dd4846ae7c774")
			.headers(headers_0))
		.pause(5)
		.exec(http("request_1")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/tagsmap/0001_request.json")))
		.pause(4)
		.exec(http("request_2")
			.get(uri3 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(1)
		.exec(http("request_3")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/tagsmap/0003_request.json"))
			.resources(http("request_4")
			.options(uri4 + "/add")
			.headers(headers_4),
            http("request_5")
			.get(uri1 + "/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.510178338029945&2d-5.721745964303989&2m2&1d43.538567282475114&2d-5.632916041362649&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._mjn3yu&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=100296"),
            http("request_6")
			.post(uri4 + "/add")
			.headers(headers_6)
			.body(RawFileBody("/tagsmap/0006_request.json")),
            http("request_7")
			.options(uri4 + "/getById")
			.headers(headers_4),
            http("request_8")
			.options(uri4 + "/location/near")
			.headers(headers_4),
            http("request_9")
			.post(uri4 + "/getById")
			.headers(headers_9)
			.body(RawFileBody("/tagsmap/0009_request.json")),
            http("request_10")
			.post(uri4 + "/location/near")
			.headers(headers_10)
			.body(RawFileBody("/tagsmap/0010_request.json")),
            http("request_11")
			.get(uri1 + "/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._iwjf4g&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=72827"),
            http("request_12")
			.get(uri1 + "/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7stge1uq&10e1&callback=_xdc_._jsu0oc&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=92620")))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}