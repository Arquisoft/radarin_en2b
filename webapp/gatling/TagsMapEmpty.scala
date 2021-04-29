
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class TagsMapEmpty extends Simulation {

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

	val headers_3 = Map("Accept" -> "image/webp,*/*")

	val headers_8 = Map(
		"Access-Control-Request-Headers" -> "access-control-allow-origin,content-type,control-allow-methods",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen2bwebapp.herokuapp.com")

    val uri1 = "https://maps.googleapis.com/maps/api/js"
    val uri3 = "https://radarinen2bwebapp.herokuapp.com"
    val uri4 = "https://radarinen2brestapi.herokuapp.com/api/users"

	val scn = scenario("TagsMapEmpty")
		.exec(http("request_0")
			.get(uri3 + "/?code=f6d652c06fca9382cd3e0d719775dca6&state=bf6b9fbbab0a4a74b2e6aa46092e450e")
			.headers(headers_0))
		.pause(4)
		.exec(http("request_1")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/tagsmapempty/0001_request.json"))
			.resources(http("request_2")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1),
            http("request_3")
			.get(uri3 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_3)))
		.pause(1)
		.exec(http("request_4")
			.get(uri1 + "/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.51018107877924&2d-5.721746324722443&2m2&1d43.53857002501266&2d-5.632916396185618&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._ci7sll&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=52530")
			.resources(http("request_5")
			.get(uri1 + "/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._iwjf4g&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=72827"),
            http("request_6")
			.get(uri1 + "/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7stggiz2&10e1&callback=_xdc_._mbxjs3&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=121391"),
            http("request_7")
			.post("/geolocation/v1/geolocate?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/tagsmapempty/0007_request.json")),
            http("request_8")
			.options(uri4 + "/add")
			.headers(headers_8),
            http("request_9")
			.options(uri4 + "/location/near")
			.headers(headers_8)))

	setUp(scn.inject(constantUsersPerSec(2).during(60 seconds).randomized)).protocols(httpProtocol)
}