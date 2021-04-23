
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class TagsMapInfo extends Simulation {

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
		"Accept" -> "application/json",
		"Content-Type" -> "application/json")

	val headers_2 = Map(
		"Accept" -> "image/webp,*/*",
		"If-Modified-Since" -> "Wed, 21 Apr 2021 21:28:47 GMT",
		"If-None-Match" -> """W/"a48-178f655e298"""")

    val uri1 = "https://maps.googleapis.com/maps/api/js"
    val uri2 = "https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/ms-language-packs/records/cfr-v1-es-ES"

	val scn = scenario("TagsMapInfo")
		.exec(http("request_0")
			.get("/?code=4c770ed32fb36301cdf6d02d85067170&state=acb9a05428d04bffab270e32d21899b8")
			.headers(headers_0)
			.resources(http("request_1")
			.get(uri2)
			.headers(headers_1)))
		.pause(5)
		.exec(http("request_2")
			.get("/static/media/logo.6ce24c58.svg")
			.headers(headers_2))
		.pause(1)
		.exec(http("request_3")
			.get(uri1 + "/ViewportInfoService.GetViewportInfo?1m6&1m2&1d43.510181006736886&2d-5.721746315248612&2m2&1d43.5385699529233&2d-5.632916386858869&2u16&4ses-ES&5e0&6sm%40554000000&7b0&8e0&12e2&callback=_xdc_._67vw39&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=36148")
			.resources(http("request_4")
			.get(uri1 + "/AuthenticationService.Authenticate?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&4sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&callback=_xdc_._iwjf4g&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=130216"),
            http("request_5")
			.get(uri1 + "/QuotaService.RecordEvent?1shttps%3A%2F%2Fradarinen2bwebapp.herokuapp.com%2FtagsMap&3sAIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&7ss0cxrj&10e1&callback=_xdc_._f2h16e&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY&token=29901")))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}