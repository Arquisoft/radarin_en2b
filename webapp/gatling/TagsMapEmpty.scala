
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class TagsMapEmpty extends Simulation {

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

    val uri1 = "https://maps.googleapis.com/maps/api/js"
    val uri2 = "https://www.googleapis.com/geolocation/v1/geolocate"

	val scn = scenario("TagsMapEmpty")
		.exec(http("request_0")
			.get("/?code=0c7bb07640b829fe06f28637bcc03393&state=7f213e5d960b47adad35bb63cff22ea5")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.post(uri2 + "?key=AIzaSyB2h2OuRcUgy5N-5hsZqiPW6sH3n_rptiQ")
			.headers(headers_1)
			.body(RawFileBody("/tagsmapempty/0001_request.json")))
		.pause(1)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(1)
		.exec(http("request_3")
			.get(uri1 + "/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.51020415913933&2d-5.721749359873349&2m2&1d43.53859312043192&2d-5.632919384215904&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._fck40r&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=122241")
			.resources(http("request_4")
			.get(uri1 + "/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._iwjf4g&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=130216"),
            http("request_5")
			.get(uri1 + "/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7ss0aiye&10e1&callback=_xdc_._8hti5r&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=117176")))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}